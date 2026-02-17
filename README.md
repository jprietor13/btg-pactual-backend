# Reto Técnico -- Backend

![Node](https://img.shields.io/badge/node-v20-green)
![NestJS](https://img.shields.io/badge/nestjs-framework-red)
![MongoDB](https://img.shields.io/badge/mongodb-database-green)
![PostgreSQL](https://img.shields.io/badge/postgresql-relational-blue)
![Docker](https://img.shields.io/badge/docker-containerized-blue)
![Jest](https://img.shields.io/badge/jest-unit--tested-success)

------------------------------------------------------------------------

## Descripción General

Este proyecto corresponde a la implementación del backend para el reto
técnico.

Incluye:

-   API REST desarrollada con NestJS
-   Modelado de datos NoSQL con MongoDB
-   Autenticación JWT
-   Validaciones de reglas de negocio
-   Pruebas unitarias con Jest
-   Documentación con Swagger
-   Entorno Dockerizado
-   Modelado relacional en PostgreSQL (Parte 2)
-   Implementación de consulta SQL avanzada

La solución sigue principios de arquitectura limpia y buenas prácticas
de producción.

------------------------------------------------------------------------

# Arquitectura

La arquitectura sigue un enfoque modular basado en separación de responsabilidades, facilitando escalabilidad y mantenibilidad.

Estructura modular:

```
src/
│
├── auth/              → Registro, login y estrategia JWT
├── users/             → Gestión de usuarios y persistencia
├── funds/             → Lógica principal de fondos (suscripción y cancelación)
├── transactions/      → Historial de transacciones financieras
├── notifications/     → Servicio de notificaciones (Email / SMS según preferencia)
├── common/            → Guards, decorators y utilidades compartidas
│
├── database/
│   └── schemas/       → Esquemas de Mongoose (User, Fund, Transaction)
│
├── app.module.ts      → Configuración global de módulos
└── main.ts            → Punto de arranque y configuración de Swagger
```

### Principios aplicados

-   Separación de responsabilidades
-   Inyección de dependencias
-   Lógica de negocio en capa de servicio
-   Manejo adecuado de errores
-   Pruebas unitarias sobre lógica crítica
-   Configuración Docker-first

------------------------------------------------------------------------

# Decisiones Técnicas

## Elección de MongoDB (Parte 1)

Se utilizó MongoDB debido a que el enunciado solicitaba un modelo
NoSQL.\
Permite modelar transacciones y relaciones flexibles sin necesidad de
joins complejos, manteniendo alta escalabilidad horizontal.

## Elección de PostgreSQL (Parte 2)

Para la parte relacional se implementó PostgreSQL con:

-   Integridad referencial completa (FK)
-   Claves primarias compuestas
-   Índices para optimización
-   Restricciones CHECK

## Prevención de doble suscripción

La lógica valida la última transacción registrada del usuario para
determinar el estado actual del fondo, evitando inconsistencias
financieras.

## Uso de NOT EXISTS en SQL

La consulta requerida utiliza una subconsulta correlacionada con NOT
EXISTS para garantizar que no exista ninguna sucursal donde el producto
esté disponible y el cliente no la haya visitado.

Esta aproximación asegura precisión lógica y evita falsos positivos que
podrían generarse con JOIN simples.

## Testing estratégico

Las pruebas unitarias cubren la lógica crítica financiera:

-   Validación de saldo
-   Bloqueo de doble suscripción
-   Restauración correcta de saldo
-   Registro de transacciones

Se mockean dependencias externas para garantizar aislamiento real de la
capa de servicio.

------------------------------------------------------------------------

# Autenticación

Autenticación basada en JWT.

Endpoints:

-   POST /auth/register
-   POST /auth/login

Los endpoints protegidos requieren:

Authorization: Bearer `<token>`{=html}

------------------------------------------------------------------------

# Lógica de Negocio -- Módulo Funds

### Suscripción a fondo

-   Valida existencia del fondo
-   Previene doble suscripción
-   Valida saldo disponible
-   Descuenta saldo
-   Crea transacción
-   Genera notificación

### Cancelación

-   Devuelve saldo
-   Registra transacción de cancelación


### Notificaciones

Las notificaciónes está implementadas mediante un servicio desacoplado 
listo para integrarse con proveedores como SendGrid o Twilio.

------------------------------------------------------------------------

# Pruebas Unitarias

Ejecutar:

npm run test

------------------------------------------------------------------------

# Swagger

Disponible en:

http://localhost:3000/docs

------------------------------------------------------------------------

# Docker

Levantar servicios:

docker compose up --build

Incluye:

-   MongoDB
-   PostgreSQL
-   API

------------------------------------------------------------------------

# Despliegue

El proyecto está dockerizado y listo para ser desplegado en cualquier 
entorno compatible con contenedores (Docker, ECS, EKS, EC2, etc.).

Dado que el cliente realizará el despliegue, se entrega el repositorio 
preparado para integración en infraestructura AWS o cualquier plataforma compatible.

------------------------------------------------------------------------

## Colección Postman

La colección de Postman se encuentra en:

postman/btg-pactual.postman_collection.json

Para utilizarla:

1. Importar la colección en Postman.
2. Definir la variable `base_url` (por defecto http://localhost:3000).
3. Ejecutar login y guardar el token en la variable `token`.
4. Probar los endpoints protegidos.

------------------------------------------------------------------------

# Modelo Relacional (PostgreSQL)

Ubicado en:

database/

Archivos:

-   01_schema.sql
-   02_tables.sql
-   03_constraints_indexes.sql
-   04_query.sql
-   05_insert_data.sql

------------------------------------------------------------------------

# Consulta SQL Implementada

Obtener los nombres de los clientes que tienen inscrito algún producto
disponible solo en las sucursales que visitan.

Implementada con NOT EXISTS para garantizar coherencia lógica.

------------------------------------------------------------------------

# Calidad Técnica

-   Arquitectura modular limpia
-   Lógica financiera consistente
-   Integridad referencial en SQL
-   Entorno completamente dockerizado
-   Testing estratégico sobre reglas críticas

------------------------------------------------------------------------

# Autor

Juan Prieto
Full Stack Developer
jp1739@gmail.com
