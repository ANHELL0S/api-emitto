# Manual de Uso - API Emitto

## Índice

1. [Introducción](#introducción)
2. [Monitorización](#monitorización)
3. [Solución de Problemas](#solución-de-problemas)
4. [Soporte](#soporte)

---

## Introducción

API RESTful para envío masivo de correos electrónicos con:

- Autenticación JWT
- Colas asíncronas (Bull + Redis)
- Panel de monitorización integrado

---

# 🔐 Acceso como Super Administrador

## ¿Qué es un Super Admin?

El rol con **máximos privilegios** para gestionar toda la plataforma Emitto, incluyendo:

- Creación/eliminación de claves
- Acceso a monitoreo de colas

---

## Pasos para Iniciar Sesión

1. **Ve al portal de administración**  
   Ingresa a: `https://emitto.softecsa.com/sign-in`

2. **Credenciales especiales**  
    Usa las credenciales generadas por el desarollador:

   [![Screenshot-2025-05-19-16-12-00-2390x768.png](https://i.postimg.cc/HnbGGkHN/Screenshot-2025-05-19-16-12-00-2390x768.png)](https://postimg.cc/q6BDy0Nc)

## Gestión de Claves API

[![Panel de Gestión de Claves](https://i.postimg.cc/6Q5s396g/Screenshot-2025-05-19-15-40-00-2390x768.png)](https://postimg.cc/tsfvvGxN)

### 1. Creación de Claves

**¿Para qué sirve?**  
Generar nuevas credenciales para que tus aplicaciones puedan enviar correos a través del uso de la API - Emitto.

**Pasos para crear una clave:**

1. Ve a la sección "Claves" en el panel de control
2. Haz clic en `+ Crear nueva`
3. Completa los datos:
   - _Nombre_: Ej: "Sistema de Facturación"
4. Haz clic en `Crear clave`

---

### 3. Eliminación de Claves

**Úsalo cuando:**

- El cliente ya no usa la clave
- Quieras bloquear accesos inmediatamente

**Proceso simple:**

1. Localiza la clave en tu panel
2. Haz clic en el icono 🗑️
3. Confirma con `🗑️ Eliminar`

🚨 **Atención:**

- Esta acción **no se puede deshacer**
- Todos los sistemas usando esa clave dejarán de funcionar al instante

---

## Monitorización

Acceso al panel de colas, tienes dos proveedores `QueueDash` o `Bull Board`

[![Screenshot-2025-05-19-15-41-53-2390x768.png](https://i.postimg.cc/MKv4QMq7/Screenshot-2025-05-19-15-41-53-2390x768.png)](https://postimg.cc/xcVtrdk8)

### 1. QueueDash

Este panel compacto, sorprendente y elegante para colas basadas en Redis hace que agregar, reintentar, eliminar y administrar sus trabajos sea más fácil que nunca.

**Métricas disponibles**

- Envíos completados
- Envíos fallidos
- Tiempo promedio de procesamiento

[![Screenshot-2025-05-19-15-51-01-2390x768.png](https://i.postimg.cc/DZw4zKLz/Screenshot-2025-05-19-15-51-01-2390x768.png)](https://postimg.cc/kVLgjzjr)

### 2. Detalles de Cola

Panel principal que muestra el estado en tiempo real de los trabajos de envío:

[![Screenshot-2025-05-19-15-58-58-2390x768.png](https://i.postimg.cc/zvvy5m41/Screenshot-2025-05-19-15-58-58-2390x768.png)](https://postimg.cc/Mfk6bLWs)

**Elementos clave:**

- 🟢 **Completados**: Envíos exitosos (verde)
- 🟡 **Activos**: Procesándose actualmente (amarillo)
- 🔴 **Fallidos**: Intentos con error (rojo)
- ⏳ **Espera**: Pendientes por procesar (gris)

---

### 3. Opciones de Colas

Menú de gestión avanzada para administración de trabajos:

[![Opciones de administración](https://i.postimg.cc/zvsGrmq3/Screenshot-2025-05-19-15-56-28-2390x768.png)](https://postimg.cc/tnzj3MZH)

**Funcionalidades disponibles:**

1. 🔄 **Reintar fallidos**: Reprocesa trabajos con errores
2. 🗑️ **Limpiar completados**: Elimina registros
3. 📊 **Estadísticas**: Tiempos promedio y ratios de éxito

## Uso de la Api en tu aplicación

Ejemplo prácico uando JS:

```js
fetch('https://api-emitto.softecsa.com/email/send', {
  method: 'POST',
  headers: {
    'X-Key-Emitto': 'TU_CLAVE',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    from: 'noreply@example.com',
    subjectEmail: 'Asunto del correo',
    sendTo: ['destinatario1@example.com', 'destinatario2@example.com'],
    message: '<p>Contenido HTML del correo</p>',
    attachments: [
      {
        filename: 'documento.pdf',
        path: '/ruta/documento.pdf',
      },
    ],
  }),
})
```
