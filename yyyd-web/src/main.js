//这里import会默认去node_modules里面找vue包里面的vue.js
//注意点 Vue v必须大写
import Vue from 'vue';
//入口组件
import App from './App.vue';
//路由
import router from './router'
import vueResource from 'vue-resource';
// require("../static/js/jquery.min.js");
require("../static/js/bootstrap.min.js");
require("../static/js/elementUi.js");
import iview from 'iview';

import 'iview/dist/styles/iview.css';
//引入element-ui
import Element from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
Vue.use(Element);
Vue.use(vueResource);
import Vuex from 'vuex'
Vue.use(Vuex);
Vue.use(iview);

new Vue({
    //render:function(create){ return create(App)}
    render: c => c(App),
    router: router
}).$mount('#app')