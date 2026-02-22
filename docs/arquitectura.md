# Arquitectura del proyecto - WIP

<a id="readme-top"></a>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Tabla de Contenidos</summary>
  <ol>
    <li><a href="#general">Visión General</a></li>
    <li><a href="#tech-stack">Stack Tecnológico</a></li>
    <li><a href="#project-structure">Estructura de Carpetas</a></li>
    <li><a href="#api-integrations">Integraciones con APIs</a></li>
    <li><a href="#navigation">Navegación</a></li>
    <li>
      <a href="#general">Consideraciones y decisiones</a>
      <ul>
        <li><a href="#performance">Rendimiento</a></li>
        <li><a href="#seo">SEO</a></li>
      </ul>
    </li>
  </ol>
</details>

<!-- Overview -->

## 1. Visión General

<p align="justify">LosPaises es un proyecto de desarrollo web en el que busco aprender y asimilar conocimientos de desarrollo Front-end. Y más en concreto, el uso del framework Angular, con el objetivo de aprender a construir aplicaciones modernas de manera profesional.
</p>

<p align="justify">Me propusieron hacer un proyecto Angular en 2 semanas que demostrara el uso básico del framework(componentes, servicios, rutas, etc.). Y por este motivo la idea y desarrollo del proyecto se mantendrá simple en lineas generales. También por ello he elegido desarrollar un proyecto que consuma una API de datos de países para entregar datos básicos(nombre, capital, población, etc.) de todos los países del mundo a los usuarios, y que los usuarios puedan explorar una lista, elegir uno de los países y dejar una reseña con valoración de 1 a 5 estrellas.

Un proyecto simple, pero que me permitirá aprender y entender elementos básicos del desarrollo de una aplicación moderna, y además, poder explorar un poco más en profundidad detalles de problemas típicos, o entender mejor opciones de arquitectura basadas en consideraciones de, por ejemplo, experiencia de usuario, rendimiento, SEO o Accesibilidad.

</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Stack Tecnológico -->

<a id="tech-stack"></a>

## 2. Stack Tecnológico

- [![Angular](https://img.shields.io/badge/Angular-%23DD0031.svg?logo=angular&logoColor=white)](#) [Angular 21](https://angular.dev/overview)
  - [Modulo A11y (accesibilidad) - Angular Material CDK ](https://material.angular.dev/cdk/a11y/overview)
  - [Librería RxJS (peticiones http asíncronas)](https://rxjs.dev/guide/overview)
  - [LucideAngularModule (iconos)](https://lucide.dev/guide/packages/lucide-angular)
- [![HTML](https://img.shields.io/badge/HTML-%23E34F26.svg?logo=html5&logoColor=white)](#) [HTML5](https://www.w3schools.com/html/html_intro.asp)
- [![CSS](https://img.shields.io/badge/CSS-639?logo=css&logoColor=fff)](#) [CSS3](https://lenguajecss.com/)
- [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](#) [TypeScript](https://www.typescriptlang.org/docs/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Estructura de Carpetas -->

## 3. Estructura de Carpetas

```text
.
├── docs/ - Documentación técnica
├── public/ - Archivos públicos estáticos
│   └── assets/ - Recursos (imágenes, logos, etc.)
├── src
│   ├── app
│   │   ├── core/ - Lógica central y reutilizable de la App
│   │   │   ├── guards
│   │   │   ├── models
│   │   │   └── services
│   │   ├── environments/ - Configuraciones de entorno
│   │   ├── pages/ - Páginas o vistas (algunas contienen componentes anidados)
│   │   │   ├── countries
│   │   │   ├── country-detail
│   │   │   ├── landing
│   │   │   ├── profile
│   │   │   ├── sign-in
│   │   │   └── sign-up
│   │   └── shared/ - Componentes(UI) y utiles globales
│   │       ├── components
│   │       └── utils
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>
