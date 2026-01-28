# 🚀 Landing Page Reutilizable con Carrito & WhatsApp

Una solución de landing page minimalista, intuitiva y "mobile-first" diseñada para comercios y emprendedores. Permite gestionar productos, categorías y un carrito de compras con pedido directo a WhatsApp.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## ✨ Características

- 📱 **Diseño Híbrido:** Interfaz tipo tarjeta para escritorio y experiencia de App nativa para móviles.
- 🛒 **Carrito de Compras:** Sistema dinámico para agregar, quitar y editar cantidades de productos.
- 💬 **Pedido vía WhatsApp:** Generación automática de mensajes formateados con el detalle del pedido y total calculado.
- ⚙️ **Altamente Reutilizable:** Toda la información del comercio se gestiona desde un único archivo de configuración (`data.js`).
- ⚡ **Performance:** Construido con Vite y Tailwind CSS v4 para una carga ultra rápida.

## 🛠️ Tecnologías Utilizadas

* [React](https://reactjs.org/) - Biblioteca de UI.
* [Tailwind CSS v4](https://tailwindcss.com/) - Framework de estilos.
* [Vite](https://vitejs.dev/) - Herramienta de construcción (Build tool).

## 🚀 Instalación y Uso Local

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/TU_USUARIO/TU_REPOSITOIRO.git](https://github.com/TU_USUARIO/TU_REPOSITOIRO.git)
    cd TU_REPOSITOIRO
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Iniciar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    Visita `http://localhost:5173` en tu navegador.

## ⚙️ Personalización

Para adaptar esta landing a cualquier comercio, simplemente edita el archivo `src/data.js`. Allí podrás modificar:
* Nombre y Logo de la empresa.
* Color de marca (Theme Color).
* Número de WhatsApp de recepción.
* Categorías (Tabs) y Productos (Items).

## 📦 Despliegue (Deploy)

Para generar la versión de producción:
```bash
npm run build