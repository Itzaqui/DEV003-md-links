# Markdown Links

## Índice

* [1. Librería md-links](#1-Librería-md-links)
* [2. Diagrama de flujo](#2-Diagrama-de-flujo)
* [3. Instalación](#3-Instalación)
* [4. Guía de uso](#4-Guía-de-uso)

***

## 1. Librería md-links

Markdown Links es una librería que extrae, analiza y valida los links que se encuentran en los archivos con formato .md.

## 2. Diagrama de flujo

Este proyecto se realizó siguiendo los pasos del siguiente diagrama:

![Diagrama](https://raw.githubusercontent.com/Itzaqui/DEV003-md-links/main/images/diagrama-mdlinks.png)

## 3. Instalación

Para dar comienzo a la instalación de la librería , deberas contar con Node.js previamente instalado. Despues deberas copiar y ejecutar el siguiente comando en la terminal.

```sh
npm i itzaqui-md-links
```

## 4. Guía de uso
Para tener acceso al menú principal debe escribir md-links en la terminal.

```sh
md-links
```

![Menú](https://raw.githubusercontent.com/Itzaqui/DEV003-md-links/main/images/menu.png)

Después debe escribir en la terminal el comando junto con el directorio que desea analizar. Al pasar la opción --validate, el módulo debe hacer una petición HTTP para averiguar si el link funciona(ok) o no(fail).

```sh
md-links directorio o archivo.md --validate
```

![Validate](https://raw.githubusercontent.com/Itzaqui/DEV003-md-links/main/images/validate.png)

Si pasamos la opción --stats el output (salida) será un texto con estadísticas básicas sobre los links.

```sh
md-links directorio o archivo.md --stats
```

![Stats](https://raw.githubusercontent.com/Itzaqui/DEV003-md-links/main/images/stats.png)

También podemos combinar --stats y --validate para obtener estadísticas que necesiten de los resultados de la validación.

```sh
md-links directorio o archivo.md --stats --validate
```

![Stats-Validate](https://raw.githubusercontent.com/Itzaqui/DEV003-md-links/main/images/stats-validate.png)
