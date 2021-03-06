// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import {
	getRequest
} from './utils/api'
import {
	postRequest
} from './utils/api'
import {
	deleteRequest
} from './utils/api'
import {
	putRequest
} from './utils/api'
import {
	initMenu
} from './utils/utils'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.apiServer = 'http://47.102.197.172:8080';
Vue.prototype.$http = axios;


router.beforeEach((to, from, next) => {
	if (to.name == 'Login') {
		next();
		return;
	}
	var name = store.state.user.name;
	if (name == '未登录') {
		if (to.meta.requireAuth || to.name == null) {
			next({
				path: '/',
				query: {
					redirect: to.path
				}
			})
		} else {
			next();
		}
	} else {
		initMenu(router, store);
		if (to.path == '/chat')
			store.commit("updateMsgList", []);
		next();
	}
})
router.beforeEach((to, from, next)=> {
    if (to.name == 'Login') {
      next();
      return;
    }
    var name = store.state.user.name;
    if (name == '未登录') {
      if (to.meta.requireAuth || to.name == null) {
        next({path: '/', query: {redirect: to.path}})
      } else {
        next();
      }
    } else {
      initMenu(router, store);
      if(to.path=='/chat')
        store.commit("updateMsgList", []);
      next();
    }
  }
)
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>'
})
