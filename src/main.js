// import Vue from 'vue'
// import App from './App.vue'

// Vue.config.productionTip = false

// new Vue({
//   render: h => h(App),
// }).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import moment from 'moment'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../public/css/layout.css'
import '../public/css/style.css'

import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
Vue.config.productionTip = false

//引入路由
import router from './router.js'//import router的router一定要小写，不要写成Router，否则会报can't match的错误

Vue.filter('dataFmt', function(input, fmtString) {
	return moment(input).format(fmtString)
})

new Vue({
	router: router,//注入到根实例
	render: h => h(App),
}).$mount('#app')