import Vue from 'vue'
import VueRouter from 'vue-router'

//引入组件
import SignUp from './components/SignUp.vue'
import SignIn from './components/SignIn.vue'
import Admin from './components/Admin.vue'
import List from './components/List.vue'
import UserMng from './components/UserMng.vue'

Vue.use(VueRouter)

const routes = [
	{path: '/', redirect: '/signUp'},//重定向，设置默认首页
	{name: 'signIn', path: '/signIn', component: SignIn, alias: '/foo'},
	{name: 'signUp', path: '/signUp', component: SignUp, alias: '/bar'},
	{name: 'admin', path: '/admin/:userName', component: Admin, alias: '/baz'},
	{name: 'list', path: '/list/:userName', component: List, alias: '/foobar'},
	{name: 'userMng', path: '/UserMng/:id', component: UserMng, alias: '/foobaz'}
];

var router = new VueRouter({
	routes,//routes: routes简写
	mode: 'history'//history 模式，去掉地址中的hash
})

export default router;