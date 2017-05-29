<template>
  <div class="yyyd" id="app">
    <!--page2页面-->
     <div v-if="$route.path==='/page2'">
        <div class="">
          <div class="col-md-12">
                <Headtop />
                <router-view></router-view>
          </div>
         </div>
       <router-view></router-view>
     </div>
      <!--home页面-->
     <div v-else-if="$route.path==='/home'">
        <div class="">
              <Headtop />
              <router-view></router-view>
        </div>
     </div>
     <!--/页面-->
     <div v-else-if="$route.path==='/'">
        <div class="">
               <Headtop />
               <router-view></router-view>
        </div>
     </div>
      <!--其他有左侧导航页面-->
    <div v-else>
      <div class="">
            <Headtop />
            <div class="col-md-12" style="padding: 25px 0px;">
                <div class="col-md-3 minh">
                    <sildeLeft />
                </div>
                <div class="col-md-9 public" id="public">
                    <router-view></router-view>
                </div>
            </div>
       </div>

    </div>
</div>
</template>
<script>
import sildeLeft from './common/slideLeft.vue'
import Headtop from './common/Headtop.vue'
  export default {
    //和前面学的定义组件使用方式一样，必须返回一个对象
    data() {
      return {
         msg: '中卫环保局一企一档管理系统',
         activeName:'first'
      }
    },
    components:{
      sildeLeft,
      Headtop
    },
    mounted() {
        this.getheigth();
    },
    methods: {
         getheigth:function(){
         document.getElementById("public").style.height= document.documentElement.clientHeight-120+"px";
      }
    }
  }

</script>
<style scoped>
  @import '/static/css/login.css';
  @import '/static/css/reset.css';
  @import '/static/css/style.css';
</style>

