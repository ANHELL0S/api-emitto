export const docViewers = [
  {
    path: '/rapi',
    title: 'Rapi',
    html: `<!DOCTYPE html>
      <html>
      <head>
        <title>EMITTO API - RAPI</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script type="module" src="https://unpkg.com/rapidoc/dist/rapidoc-min.js"></script>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
        <style>
          :root {
            --primary: #6366f1;
            --primary-hover: #4f46e5;
            --bg: #f9fafb;
            --card: #ffffff;
            --text: #111827;
            --text-light: #6b7280;
          }
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Inter', -apple-system, sans-serif;
            background: var(--bg);
            color: var(--text);
            line-height: 1.5;
          }
          
          .studio-header {
            background: var(--card);
            padding: 16px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
            border-bottom: 1px solid rgba(0,0,0,0.05);
          }
          
          .logo {
            display: flex;
            align-items: center;
            gap: 12px;
            font-weight: 600;
            font-size: 18px;
            color: var(--text);
          }
          
          .logo-icon {
            width: 24px;
            height: 24px;
            background: var(--primary);
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
          }
          
          .studio-container {
            display: flex;
            height: calc(100vh - 65px);
          }
          
          rapi-doc {
            --nav-active-text-color: var(--primary);
            --nav-hover-bg-color: rgba(99, 102, 241, 0.1);
            --nav-bg-color: var(--card);
            --nav-accent-color: var(--primary);
            --bg-color: var(--bg);
            --text-color: var(--text);
            --border-color: rgba(0,0,0,0.05);
            --btn-primary-bg: var(--primary);
            --btn-primary-hover: var(--primary-hover);
            --btn-primary-color: white;
            --font-regular: 'Inter', sans-serif;
            --font-monospace: 'SF Mono', monospace;
            flex: 1;
          }

          .toolbar {
            display: flex;
            gap: 8px;
            align-items: center;
          }
          
          .badge {
            background: var(--primary);
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 500;
          }
        </style>
      </head>
      <body>
        <div class="studio-header">
          <div class="logo">
            <div class="logo-icon">E</div>
            <span>EMITTO API Studio</span>
          </div>
          <div class="toolbar">
            <div class="badge">v1.0</div>
          </div>
        </div>
        
        <div class="studio-container">
          <rapi-doc
            spec-url="/api-json"
            layout="column"
            render-style="view"
            theme="light"
            allow-try="true"
            allow-server-selection="true"
            show-info="false"
            show-header="false"
            regular-font="Inter, -apple-system, sans-serif"
            mono-font="'SF Mono', monospace"
            fill-request-fields-with-example="true"
          >
            <div slot="nav-logo">
              <div style="padding: 12px 16px; color: var(--text-light); font-size: 13px;">
                EXPLORER
              </div>
            </div>
          </rapi-doc>
        </div>
      </body>
      </html>`,
  },
  {
    path: '/openapi',
    title: 'OpenApi',
    html: `<!DOCTYPE html>
        <html>
         <head>
          <meta charset="UTF-8" />
          <title>EMITTO API - OPENAPI</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body>
          <script
            id="api-reference"
            data-url="/api-json"></script>
          <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
        </body>
      </html>`,
  },
  {
    path: '/elements',
    title: 'Stoplight',
    html: `<!DOCTYPE html>
        <html>
         <head>
          <meta charset="UTF-8" />
          <title>EMITTO API - STOPLIGHT</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <!-- Stoplight Elements -->
          <script src="https://unpkg.com/@stoplight/elements/web-components.min.js"></script>
          <link rel="stylesheet" href="https://unpkg.com/@stoplight/elements/styles.min.css" />
        </head>
      
        <body>
          <elements-api
            apiDescriptionUrl="/api-json"
            router="hash"
            layout="responsive"
            tryItCredentialsPolicy="same-origin"
          />
        </body>
        </html>`,
  },
]
