// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'], // 필수

	theme: {
		extend: {
			colors: {
				kiosk: {
					bg: '#1a1a2e',
					surface: '#16213e',
					gold: '#c8a96e',
					text: '#e8e0d4',
					muted: '#8b8b9e'
				},
				// 또는 flat하게
				'custom-gold': '#c8a96e'
			},
			fontFamily: {
				display: ['Playfair Display', 'serif']
			}
		}
	},

	plugins: []
};
