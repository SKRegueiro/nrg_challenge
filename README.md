## Prueba técnica: Aplicación de gestión de contratos

### Objetivo

Crear una aplicación web que permita al equipo de negocio la gestión de contratos para las distintas commodities
existentes en la plataforma. El equipo de negocio debe poder realizar las siguientes acciones dentro de la aplicación web.

- Autenticarse
- Cambiar contraseña
- Visualizar los contratos del sistema
- Filtrar los contratos del sistema
- Visualizar los detalles de un contrato seleccionado
- Visualizar los counterparties del sistema

Además de los usuarios de negocio, existe un segundo tipo de usuario denominado, _administrador_, que debe poder acceder a una ruta/s protegida/s única/s para este rol y que le proporcione las siguientes funciones:

- Visualizar todos los usuarios del sistema
- Visualizar todos los principals del sistema

La aplicación web esta orientada a ser usada únicamente en dispositivos de equipos personales, no es necesario
implementar la plataforma para dispositivos de móviles o tablets.

### Requisitos

Las especificaciones del desarrollo de esta aplicación web para el frontend debe estar desarrollado mediante Next.JS
y su ecosistema de paquetes. La API REST es proporcionada por el equipo y se facilitará información acerca de la misma para explicar como acceder a sus datos y las opciones que proporciona.

Las especificaciones técnicas que deben ser tenidas en cuenta para su desarrollo son las siguientes:

- Configuración y estructura del proyecto, es necesario el uso del _app router_.
- Typescript + SASS, se puede integrar _tailwind_ o librerías de componentes (Shacdn, Radix, MUI, Mantine, etc.).
- Sistema de autenticación basado por _Token_, esta capa debe ser integrada mediante _NextAuth_
- Existen tres tipos de roles en la aplicación web
  - _Admin_: Solamente puede acceder a las pantallas y funciones indicadas previamente
  - _User_: Solamente puede acceder a las pantallas y funciones indicadas previamente
  - _No autenticado_: Debe ser redirigido a la pantalla de login cuando intenta acceder a una ruta protegida

Otros aspectos que serán valorados de manera positiva son:

- Arquitectura de estilos utilizada
- Arquitectura del proyecto
- Multilenguaje usando i18n
- Legibilidad y uso de variables
- Uso de componentes
- Alguna animación simple

### API

Esta API de prueba ha sido montada sobre _Python_ usando _DRF 3.15.2_ y dispone de documentación relacionada a cada acción
tanto en formato [_swagger_](http://178.33.249.178:8002/api/schema/swagger-ui/) como [_redoc_](http://178.33.249.178:8002/api/schema/redoc/).

En la carpeta `api_collection` puede encontrar todos los endpoints de la API en formato JSON para importar en
Postman, Bruno u otra herramienta que acepte este estándar.

A continuación se detallan un diagrama del modelo E/R
![ER](resources/ER.png)

### Auth

Para poder realizar la autenticación en la API, se debe realizar una petición POST a la ruta `/api/login/` con los
siguientes datos:

```json
{
  "username": "admin",
  "password": "admin"
}
```

Los usuarios definidos son los siguientes:

```json
{
  "username": "kelsier_admin",
  "password": "nrg"
}
```

```json
{
  "username": "elend_standard",
  "password": "user"
}
```

```json
{
  "username": "vin_secret_key",
  "password": "user"
}
```

Si no dispone de tiempo para implementar la autenticación, puede usar el siguiente token para realizar las peticiones:

```json
{
  "SECRET-KEY": "35952d18-bd45-4099-8a76-d987315b094e"
}
```
