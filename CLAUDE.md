# Instrucciones del Proyecto

## Formato de Commits (Conventional Commits)

Usar el siguiente formato para todos los mensajes de commit:

```
tipo(alcance): descripcion corta

Descripcion detallada (opcional)

BREAKING CHANGE: descripcion (si aplica)
```

### Tipos disponibles

| Tipo | Descripcion |
|------|-------------|
| `feat` | Nueva funcionalidad |
| `fix` | Correccion de bug |
| `docs` | Documentacion |
| `style` | Formato, espacios |
| `refactor` | Refactorizacion |
| `test` | Agregar tests |
| `chore` | Mantenimiento |
| `perf` | Mejoras rendimiento |
| `ci` | CI/CD |
| `build` | Build/dependencias |
| `revert` | Revertir commit |

### Ejemplos

```bash
# Feature nueva
feat(aboutme): add skills section component

# Bug fix
fix(auth): resolve token refresh loop

# Refactor
refactor(store): simplify redux selectors

# Estilos
style(splash): adjust mobile responsive breakpoints
```

### Alcances comunes (scope)

- `splash` - Modulo Splash/Home
- `aboutme` - Modulo About Me
- `projects` - Modulo Projects
- `blog` - Modulo Blog
- `tutorials` - Modulo Tutorials
- `auth` - Autenticacion y middleware
- `store` - Redux store y state management
- `api` - Capa de API (Axios, repositorios)
- `ui` - Componentes de UI compartidos
- `layout` - Layouts y navegacion
- `theme` - Tema y estilos globales
- `config` - Configuracion (Next.js, env)
- `deps` - Dependencias
- `seo` - SEO y sitemap

## Package Manager

Este proyecto usa **npm**. No usar `yarn` ni `pnpm`.

```bash
npm install              # Instalar dependencias
npm install <package>    # Agregar dependencia
npm install -D <package> # Agregar dependencia de desarrollo
```

## Arquitectura

Proyecto basado en **Next.js 13** (Pages Router) con separacion de capas Domain/Infrastructure:

```
src/
├── pages/                          # Paginas Next.js (SSR con getServerSideProps)
│   ├── index.tsx                   # Splash/Home
│   ├── aboutme/                    # About Me
│   ├── projects/                   # Projects
│   ├── blog/                       # Blog
│   ├── tutorials/                  # Tutorials
│   ├── _app.tsx                    # App wrapper (Redux Provider, Layout)
│   ├── _document.tsx               # Document (fonts, meta)
│   ├── 404.tsx                     # Pagina 404
│   ├── _error.tsx                  # Pagina de error
│   └── [...all].tsx                # Catch-all route
├── domain/                         # Capa de dominio (logica de negocio)
│   ├── models/                     # Interfaces y tipos TypeScript
│   │   ├── config/                 # Modelos de configuracion
│   │   ├── content/                # Modelos de contenido
│   │   └── enums/                  # Enums (Countries, etc.)
│   ├── store/                      # Redux store
│   │   ├── store.ts                # Configuracion del store
│   │   ├── rootReducers.ts         # Reducers combinados
│   │   ├── rootPersistConfig.ts    # Configuracion de persistencia
│   │   ├── homeUseCase/            # Estado de Home (menu, education, profile, services, tools, specialties)
│   │   ├── contentUseCase/         # Estado de contenido (tabsMenu)
│   │   └── uiUseCase/             # Estado de UI (theme, modals)
│   ├── services/                   # Servicios de logica de negocio
│   ├── dto/                        # Data Transfer Objects
│   └── middleware.ts               # Next.js middleware (auth, cache)
├── infrastructure/                 # Capa de infraestructura (UI y API)
│   ├── api/                        # Cliente HTTP (Axios con retry)
│   ├── repository/                 # Repositorios de datos (aboutMe, content)
│   └── ui/                         # Capa de presentacion
│       ├── components/             # Componentes reutilizables
│       │   ├── layouts/            # Wrappers de layout
│       │   ├── ui/                 # Componentes basicos
│       │   └── inc/                # Componentes MUI envueltos
│       ├── modules/                # Modulos de pagina
│       │   ├── SplashModule/       # Vista Splash
│       │   ├── AboutMeModule/      # Vista About Me
│       │   ├── ProjectsModule/     # Vista Projects
│       │   ├── BlogModule/         # Vista Blog
│       │   └── TutorialsModule/    # Vista Tutorials
│       ├── styles/                 # Tema y estilos globales
│       ├── hooks/                  # Custom React hooks
│       └── utils/                  # Utilidades e iconos
├── lib/                            # Utilidades compartidas
│   ├── utils/                      # Helpers HTTP, modelos de respuesta
│   └── layout/                     # Utilidades de layout
└── typings/                        # Definiciones de tipos
    ├── styled.d.ts                 # Tipos styled-components
    ├── twin.d.ts                   # Tipos twin.macro
    └── global.d.ts                 # Tipos globales
```

### Path Aliases (tsconfig.json)

```typescript
@/*              → ./src/*
@domain/*        → ./src/domain/*
@infrastructure/* → ./src/infrastructure/*
@pages/*         → ./src/pages/*
```

### Reglas de importacion

- Siempre importar `styled-components` desde `styled-components/macro` (enforced por ESLint)
- Usar path aliases (`@domain/`, `@infrastructure/`) en lugar de rutas relativas profundas

## Stack Tecnologico

| Categoria | Tecnologia |
|-----------|------------|
| Framework | Next.js 13.4 (Pages Router) |
| Lenguaje | TypeScript 5.1 |
| UI Library | React 18.2 |
| Componentes | Material-UI (MUI) 5 |
| Estilos | Tailwind CSS 3 + twin.macro + styled-components |
| Estado | Redux Toolkit + redux-persist (encriptado) |
| HTTP | Axios con axios-retry |
| Utilidades | Ramda, usehooks-ts, reselect |
| SEO | next-sitemap |
| Imagenes | sharp (optimizacion) |

## Estilos y Formato de Codigo

### Prettier

- `printWidth`: 100
- `singleQuote`: true (JS/TS), `jsxSingleQuote`: false (JSX)
- `semi`: false (sin punto y coma)
- `tabWidth`: 4
- Parser: TypeScript

### ESLint

- Extends: `next/core-web-vitals`, `@typescript-eslint/recommended`
- `explicit-function-return-type`: **requerido** en archivos `.ts` y `.tsx`
- `no-console`: warn (solo `console.error` permitido)
- `no-empty-function`: error (arrow functions permitidas)
- `react-hooks/rules-of-hooks`: error
- `react-hooks/exhaustive-deps`: warn

## Autenticacion

- Login via API backend (NestJS) con email/password
- JWT tokens: access (1h) + refresh (7 dias)
- Tokens almacenados en cookies HTTP-only (via Next.js middleware)
- Auto-refresh de tokens en middleware de Next.js
- Middleware activo en rutas: `/`, `/aboutme`, `/projects`, `/blog`, `/tutorials`

## Estado (Redux)

- **homeUseCase**: Datos de la pagina principal (menu, education, profile, services, tools, specialties)
- **contentUseCase**: Contenido dinamico (tabsMenu)
- **uiUseCase**: Estado de UI (theme, modals)
- Persistencia con `redux-persist` + encriptacion en produccion
- Selectores memoizados con `reselect`

## Multi-entorno

| Entorno | Archivo ENV | Comando build | Comando start |
|---------|-------------|---------------|---------------|
| dev | `.env` | - | `npm run dev` |
| stg | `.env.stg` | `npm run build:stg` | `npm run start:stg` |
| uat | `.env.uat` | `npm run build:uat` | `npm run start:uat` |
| prod | `.env.prod` | `npm run build` | `npm run start` |

## Variables de Entorno Principales

- `NEXT_PUBLIC_STRAPI_IDENTIFIER` - Email de autenticacion
- `NEXT_PUBLIC_STRAPI_PASSWORD` - Password de autenticacion
- `NEXT_PUBLIC_STRAPI_TIMEOUT` - Timeout de sesion (ms)
- `NEXT_PUBLIC_API_URL` - URL base del API backend

## Next.js Configuration

- **Output**: `standalone` (optimizado para deploy)
- **Strict Mode**: Deshabilitado
- **Styled Components**: Habilitado en compiler
- **Remote Images**: Firebase Storage, AWS S3, Cloudflare R2
- **ESM Externals**: Habilitado (experimental)

## Comandos Utiles

```bash
npm run dev          # Desarrollo (hot-reload)
npm run build        # Build produccion (genera sitemap automaticamente)
npm run start        # Iniciar en produccion
npm run start:prod   # Iniciar standalone server
npm run lint         # Linter
```
