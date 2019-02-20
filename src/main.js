// import Vue from 'vue'
// import App from './App.vue'

// Vue.config.productionTip = false

// new Vue({
//   render: h => h(App),
// }).$mount('#app')

import Vue from 'vue'
import VueRouter from 'vue-router'
import SignUp from './view/SignUp.vue'
import SignIn from './view/SignIn.vue'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../public/css/layout.css'
import '../public/css/style.css'

import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
Vue.config.productionTip = false

const routes = [
	{path: '#/signIn', component: SignIn},
	{path: '#/signUp', component: SignUp}
]
const router = new VueRouter({
	routes: routes
})
Vue.use(VueRouter)
new Vue({
	router: router,
	render: h => h(SignUp),
}).$mount('#app')