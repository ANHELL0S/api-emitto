import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'
import { NestFactory } from '@nestjs/core'
import { Request, Response } from 'express'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'
import { Sequelize } from 'sequelize-typescript'
import { docViewers } from '@/shared/constants/docViews'
import { morganLogger } from '@/shared/utils/morganLogger.util'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { createBullBoard } from '@bull-board/api'
import { ExpressAdapter } from '@bull-board/express'
import { BullAdapter } from '@bull-board/api/bullAdapter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  })

  const configService = app.get(ConfigService)

  // Global Configuration
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  app.use(morganLogger)

  const isProduction = configService.get<string>('NODE_ENV') === 'production'

  // MANAGER COOKIES
  app.use(cookieParser())

  const corsOrigins = configService.get<string>('CORS_ORIGIN')?.split(',') || []
  app.enableCors({
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ) => {
      if (!origin || corsOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error(`CORS policy does not allow origin: ${origin}`))
      }
    },
    allowedHeaders: ['Content-Type', 'Authorization', 'x-key-emitto'],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
  })

  // Swagger Configuration
  const swaggerConfig = new DocumentBuilder()
    .setTitle('EMiTTO API')
    .setDescription(
      'EMITTO API es una plataforma para el envío de correos electrónicos basada en autenticación mediante Bearer Token y una clave secreta única generada para cada usuario que desee utilizar la API.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)

  // API JSON endpoint
  app.use('/api-json', (req: Request, res: Response) => {
    res.setHeader('Cache-Control', 'no-store')
    res.json(document)
  })

  // Minimal Swagger UI
  SwaggerModule.setup('swagger', app, document, {
    customSiteTitle: 'EMITTO API - SWAGGER',
    customCss: `
      .swagger-ui .topbar { display: none }
      .information-container { padding: 10px !important }
      .opblock-tag { font-size: 14px !important }
    `,
  })

  // Register documentation viewers
  docViewers.forEach(({ path, html }) => {
    app.use(path, (req: Request, res: Response) => {
      res.send(html)
    })
  })

  // ======= CONFIGURACIÓN DE BULL BOARD =======

  // Configura Bull Board
  const serverAdapter = new ExpressAdapter()
  serverAdapter.setBasePath('/admin/queues')

  // Obtén la instancia de la cola correctamente
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const emailQueue = app.get('BullQueue_emailQueue', { strict: false })

  createBullBoard({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    queues: [new BullAdapter(emailQueue)],
    serverAdapter: serverAdapter,
  })

  app.use('/admin/queues', serverAdapter.getRouter())

  // Start server
  const port = configService.get<number>('PORT', 4000)
  await app.listen(port)

  // Startup message
  const baseUrl = `http://localhost:${port}`
  console.log(`
███████╗███╗   ███╗██╗████████╗████████╗ ██████╗ 
██╔════╝████╗ ████║██║╚══██╔══╝╚══██╔══╝██╔═══██╗
█████╗  ██╔████╔██║██║   ██║      ██║   ██║   ██║
██╔══╝  ██║╚██╔╝██║██║   ██║      ██║   ██║   ██║
███████╗██║ ╚═╝ ██║██║   ██║      ██║   ╚██████╔╝
╚══════╝╚═╝     ╚═╝╚═╝   ╚═╝      ╚═╝    ╚═════╝
\n`)
  console.log(
    `💻 Environment: ${configService.get('NODE_ENV') || 'development'}\n`,
  )

  console.log('CORS', corsOrigins)

  // Database sync (development only) - MOVIDO DESPUÉS DE app.listen()
  if (!isProduction) {
    try {
      const sequelize = app.get(Sequelize)
      // Verifica la conexión primero
      await sequelize.authenticate()
      console.log('✅ Database connection established')

      // Luego sincroniza
      await sequelize.sync({ alter: true })
      console.log(`✅ Database synchronized\n`)
    } catch (error) {
      console.error('❌ Database error:', error)
      // No salgas del proceso, solo registra el error
    }
  }

  console.log(`🚀 API run : ${baseUrl}\n`)
  console.log(`🎯 Bull run: ${baseUrl}/admin/queues'\n`)
  console.log(`📚 API Documentation:`)
  docViewers.forEach(({ path, title }) => {
    console.log(`   - ${title} -> ${baseUrl}${path}`)
  })
  console.log(`   - Swagger UI -> ${baseUrl}/swagger\n`)
}

bootstrap().catch((err) => {
  console.error('Bootstrap failed:', err)
  process.exit(1)
})
