import App from './App'
import Vue from 'vue'
import * as Utils from '@/common/utils.js'



import store from './store'
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$utils = Utils

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})

require('./config/request.js')(app)

app.$mount()
