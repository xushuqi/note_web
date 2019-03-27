
export default {
	install(Vue, options) {
		Vue.prototype.global = {
			serverIp: '192.168.43.174'
		}
	}
}