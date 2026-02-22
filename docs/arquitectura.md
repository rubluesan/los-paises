# Arquitectura del proyecto - WIP

<p align="right"><a href="../README.md">Volver al README general</a></p>

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

<p align="justify">LosPaises es un proyecto de desarrollo web en el que busco aprender y asimilar conocimientos de desarrollo Front-end. Y más en concreto, el uso del framework Angular, con el objetivo de aprender a construir aplicaciones modernas de manera profesional. Me propusieron hacer un proyecto Angular en 2 semanas que demostrara el domino de los pilares del framework: componentes, servicios, rutas, etc.

He elegido desarrollar una aplicación que consuma la API <a href="https://restcountries.com/">REST Countries</a>, de datos de países, que permita a los usuarios visualizar una lista de países, elegir uno de ellos y dejar una reseña con valoración de 1 a 5 estrellas.

Adicionalmente, tengo pensado integrar el proyecto con <a href="https://supabase.com/">Supabase</a> para agregar gestión de usuarios, permisos, perfil de usuario y guardar los comentarios y valoraciones de la app.

</p>

```mermaid
graph TD
    %% Estilos
    classDef client fill:#E3F2FD,stroke:#1565C0,stroke-width:2px,color:#1565C0;
    classDef angular fill:#1A237E,stroke:#0D47A1,stroke-width:2px,color:#FFFFFF;
    classDef external fill:#F5F5F5,stroke:#616161,stroke-width:2px,color:#212121;

    %% Nodos
    User((Usuario)):::client

    subgraph AngularApp [Angular Application]
        Components[Componentes / Vistas]:::angular
        Services[Servicios / Logic]:::angular
    end

    API_Countries[REST Countries API]:::external
    Supabase[Supabase / PostgreSQL]:::external

    %% Conexiones
    User -->|Interactúa| Components
    Components <-->|Solicita datos| Services

    Services -->|HTTP GET| API_Countries
    Services <-->|Auth / CRUD Reseñas| Supabase

    %% Notas opcionales para contexto
    style AngularApp fill:#f4f4f4,stroke:#333
```

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

<a id="project-structure"></a>

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

<!-- Integraciones con APIs -->

<a id="api-integrations"></a>

## 4. Integraciones con APIs

### 4.1. REST Countries

WIP

### 4.2. Supabase

<p align="right">(<a href="#readme-top">back to top</a>)</p>
