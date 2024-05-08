const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],

	plugins: [require('flowbite/plugin')],

	darkMode: 'class',

	theme: {
		extend: {
			colors: {
				// flowbite-svelte
				primary: {
					50: '#f1f9fe',
					100: '#e3f0fb',
					200: '#c0e2f7',
					300: '#88ccf1',
					400: '#3dade6',
					500: '#2199d6',
					600: '#137ab6',
					700: '#116193',
					800: '#12537a',
					900: '#144666',
					950: '#0e2c43'
				}
			}
		}
	}
};

module.exports = config;
