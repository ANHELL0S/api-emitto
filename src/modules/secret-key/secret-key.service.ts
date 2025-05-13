import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { SecretKey } from '@/database/models/secret-key.model'
import { Op } from 'sequelize'
import { randomBytes } from 'crypto'

@Injectable()
export class SecretKeyService {
  constructor(
    @InjectModel(SecretKey)
    private readonly secretKeyModel: typeof SecretKey,
  ) {}

  /**
   * Valida si el `secret_key` proporcionado existe en la base de datos y está activo.
   * @param apiKey La clave API enviada en la cabecera.
   * @returns true si la clave es válida y activa, de lo contrario, false.
   */
  async validateApiKey(apiKey: string): Promise<boolean> {
    const secretKeyRecord = await this.secretKeyModel.findOne({
      where: { secret_key: apiKey, isActive: true },
    })

    // Si existe el registro y es activo, retornamos true. Si no, retornamos false.
    return !!secretKeyRecord // `!!` convierte el valor a un booleano.
  }

  async findById(id: string): Promise<SecretKey | null> {
    return await this.secretKeyModel.findByPk(id)
  }

  async findByField(
    field: keyof SecretKey,
    value: string | number | boolean,
  ): Promise<SecretKey | null> {
    return this.secretKeyModel.findOne({
      where: {
        [field]: value,
      },
    })
  }

  async isFieldTakenByAnotherUser(
    field: keyof SecretKey,
    value: string | number | boolean,
    currentUserId: string,
  ): Promise<boolean> {
    const existingRecord = await this.secretKeyModel.findOne({
      where: {
        [field]: value,
        _id: {
          [Op.ne]: currentUserId, // Op.ne = not equal
        },
      },
    })

    return !!existingRecord
  }

  generateSecretKey() {
    return randomBytes(32).toString('hex')
  }
}
