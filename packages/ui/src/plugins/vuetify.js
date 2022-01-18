import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
	icons: {
		iconfont: 'mdi'
	},
	theme: {
		themes: {
			light:   {
				primary: "#f44336",
				secondary: "#FFFFFF",
				accent: "#2196f3",
				error: "#ff5722",
				warning: "#ffeb3b",
				info: "#cddc39",
				success: "#4caf50"
				},
			dark: {
				primary: "#f44336",
				secondary: "#3D0000",
				accent: "#3D0000",
				error: "#FF0000",
				warning: "#cc0000",
				info: "#cc8888",
				success: "#DA0037"
			}
		}
	}
})
