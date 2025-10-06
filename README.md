# FlexSystem Frontend

Front-end para el sistema FlexSystem desarrollado con React, TypeScript y Vite.

## 🚀 Características

- **React 19** con **TypeScript** para desarrollo type-safe
- **Vite** como bundler para desarrollo rápido
- **React Router** para navegación SPA
- **ESLint** configurado para calidad de código
- Interfaz moderna y responsive
- Estructura de componentes modular

## 📋 Requisitos

- Node.js 16+ 
- npm 8+

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/LauBlake/flexSystem-front-end.git
cd flexSystem-front-end
```

2. Instala las dependencias:
```bash
npm install
```

## 🎯 Scripts Disponibles

```bash
# Desarrollo - inicia servidor en http://localhost:5173
npm run dev

# Producción - construye la aplicación optimizada
npm run build

# Linting - verifica calidad del código
npm run lint

# Preview - previsualiza la build de producción
npm run preview
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Layout.tsx      # Layout principal con navegación
│   └── Layout.css      # Estilos del layout
├── pages/              # Páginas de la aplicación
│   ├── Home.tsx        # Página de inicio
│   ├── Dashboard.tsx   # Panel de control
│   └── Settings.tsx    # Configuración
├── App.tsx             # Componente principal con rutas
├── main.tsx           # Punto de entrada
└── index.css          # Estilos globales
```

## 🖼️ Capturas de Pantalla

### Página de Inicio
![Página de Inicio](https://github.com/user-attachments/assets/ca4c1adb-1dda-4980-83ce-c1d0a7a2fc4a)

### Dashboard
![Dashboard](https://github.com/user-attachments/assets/50d32199-102c-437e-b22c-27f3c41d1b7e)

### Configuración
![Configuración](https://github.com/user-attachments/assets/58d6464e-a31d-4dff-8db6-e65def0e246d)

## 🔧 Tecnologías Utilizadas

- **React 19** - Biblioteca para interfaces de usuario
- **TypeScript** - Superset tipado de JavaScript
- **Vite** - Build tool y dev server
- **React Router** - Enrutamiento para SPA
- **ESLint** - Linter para JavaScript/TypeScript

## 🚀 Desarrollo

Para empezar a desarrollar:

1. Ejecuta `npm run dev` para iniciar el servidor de desarrollo
2. Abre [http://localhost:5173](http://localhost:5173) en tu navegador
3. Los cambios se actualizan automáticamente (Hot Module Replacement)

## 📦 Build para Producción

```bash
npm run build
```

Los archivos optimizados se generan en la carpeta `dist/`.

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
