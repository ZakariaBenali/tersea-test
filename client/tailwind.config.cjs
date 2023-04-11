/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{ts,tsx}', './src/**/*.svg'],

	theme: {
		fontFamily: {
			sans: ['Inter', 'sans-serif'],
		},
		container: {
			center: true,
		},
		extend: {
			colors: {
				bgColor: 'rgb(var(--color-bg) / <alpha-value>)',
				gray: 'rgb(var(--color-gray) / <alpha-value>)',
				error: 'rgb(var(--color-error) / <alpha-value>)',
				success: 'rgb(var(--color-success) / <alpha-value>)',
				primary: {
					500: 'rgb(var(--color-primary-500) / <alpha-value>)',
					800: 'rgb(var(--color-primary-800) / <alpha-value>)',
				},
			},
		},
	},
	plugins: [],
};
