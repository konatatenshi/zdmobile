let i18nConfig = {
  locale: uni.getLocale(),
  messages
}

import Vue from 'vue'
import App from './App'
import store from './store'
import messages from './locale/index'
import VueI18n from 'vue-i18n'


import basics from './pages/basics/home.vue'
Vue.component('basics',basics)

import components from './pages/component/home.vue'
Vue.component('components',components)

import plugin from './pages/plugin/home.vue'
Vue.component('plugin',plugin)

import about from './pages/about/home.vue'
Vue.component('about',about)

import login from './components/ay-login/login-password.vue'
Vue.component('login',login)

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

Vue.use(VueI18n)
const i18n = new VueI18n(i18nConfig)

Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$store = store

Vue.mixin({
	computed: {
		themeColor() {
			return this.$store.state.themeColor
		}
	}
})

const app = new Vue({
	i18n,
	store,
    ...App
})
app.$mount()

 



