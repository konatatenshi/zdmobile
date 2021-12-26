import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		themeColor: {
			title: '草灰',
			name: 'gray',
			color: '#aaaaaa'
		}
	},
	mutations: {
		setThemeColor(state, val) {
			state.themeColor = val
		}
	}
})

export default store
