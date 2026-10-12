/** @type {import('tailwindcss').Config} */
// Centralizo aqui los tokens del sistema: tinta (fondos), hueso (texto),
// hairline (bordes de 1px) y un unico acento. Si un valor no esta en esta
// lista, no existe dentro del diseno; asi el mantenimiento queda controlado.
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Escala de tinta: el lienzo casi negro y su version elevada para placas.
        ink: { DEFAULT: '#0c0c0b', 2: '#141412' },
        // Escala de hueso: texto principal, secundario y terciario.
        bone: { DEFAULT: '#edeae3', dim: '#a6a299', faint: '#6e6a62' },
        // Hairlines editoriales: sustituyen a las tarjetas y sombras.
        line: '#262521',
        // Acento unico: se usa para enlaces activos, marcas y estados de foco.
        accent: { DEFAULT: '#38bdf8', soft: '#7dd3fc' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        // Anton: grotesco condensado de un solo peso; la jerarquia la marca
        // el tamano, como en un cartel impreso.
        display: ['Anton', 'Impact', 'system-ui', 'sans-serif'],
        // JetBrains Mono: etiquetas, cifras, anotaciones y datos tecnicos.
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
