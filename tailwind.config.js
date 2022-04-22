module.exports = {
	mode: "jit",
	content: ["./dist/*.{html, js}", "./src/*.js"],
	theme: {
		extend: {
			backgroundImage: {
				"sea-view": "url('assets/sea.jpg')",
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
}
