import Vue from 'vue'
import App from './App.vue'
import moment from 'moment'
import axios from 'axios'
import qs from 'qs'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './assets/css/layout.css'
import './assets/css/style.css'

import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
Vue.config.productionTip = false

//引入路由
import router from './router.js'//import router的router一定要小写，不要写成Router，否则会报can't match的错误

Vue.filter('dateFmt', function(input, fmtString) {
	return moment(input).format(fmtString)
})

axios.defaults.baseURL = location.hostname + ':3000'//'http://192.168.43.174:3000'
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs

Vue.use(iView)

new Vue({
	router: router,//注入到根实例
	render: h => h(App),
}).$mount('#app')