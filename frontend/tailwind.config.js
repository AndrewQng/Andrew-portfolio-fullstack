/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Bật chế độ dark mode bằng class
  theme: {
    extend: {
      colors: {
        // Có thể thêm màu thương hiệu riêng của ông ở đây
        primary: {
          500: 'var(--color-primary)',
          600: 'var(--color-secondary)',
        },
        dark: {
          900: '#0f172a', // Nền tối
          800: '#1e293b', // Card tối
        }
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}