# tfg-front

Frontend del Trabajo Fin de Grado desarrollado con Vue 3.

## Requisitos previos

Instalar Node.js con una versión 18.3 o superior.

Visual Studio Code con la extensión: Vue - Official.

## Configuración del proyecto

Una vez clonamos el proyecto, se ejecuta:
```sh
npm install
```

para instalar las dependencias.

## Comando para compilar el proyecto en desarrollo

```sh
npm run dev
```

## Comando para compilar el proyecto para producción

```sh
npm run build
```

## Comando para compilar todas las pruebas del proyecto

```sh
npm run test
```

## Variables de entorno

Para el correcto funcionamiento del proyecto en local, se requieren las claves suministradas por Supabase. Estas claves, por motivos de seguridad, no se han publicado en el repositorio. Se ha creado en la raíz del proyecto un archivo .env.ejemplo con las claves que se necesitan. Para asegurar que el proyecto se ejecuta y funciona en local, se deberá, de la entrega realizada al tutor del TFG, extraer el archivo "tfg_front.zip". Una vez se obtiene la carpeta, la abrimos con Visual Studio Code y procemos a ejecutar:


```sh
npm install
```

para instalar las dependencias,


```sh
npm run dev
```

para compilar el proyecto. 

Cabe destacar que este proyecto si contiene un archivo .env con las claves de la API.