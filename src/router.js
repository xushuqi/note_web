import Vue from 'vue'
import VueRouter from 'vue-router'

//引入组件
import SignUp from './components/SignUp.vue'
import SignIn from './components/SignIn.vue'
import Admin from './components/Admin.vue'
import List from './components/List.vue'

Vue.use(VueRouter)

const routes = [
	{path: '/', redirect: '/signUp'},//重定向，设置默认首页
	{name: 'signIn', path: '/signIn', component: SignIn},
	{name: 'signUp', path: '/signUp', component: SignUp},
	{name: 'admin', path: '/admin/:userName', component: Admin},
	{name: 'list', path: '/list/:userName', component: List}
];

var router = new VueRouter({
	routes//routes: routes简写
})

export default router;