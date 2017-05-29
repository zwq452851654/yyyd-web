<template>
     <div class="col-md-12 header">
         <div class="headercon">
           <ul class="mechanismName">
             <li><a>{{msg}}</a></li>
             <li><span>2017年5月3日 星期三 下午 14:30</span></li>
           </ul >
           <ul class="mechanismUser">
             <li><span class="homeNews"></span>消息</li>
             <li><span class="homeNotice"></span>公告</li>
             <li><div></div>个人中心<span class="homeCore"></span></li>
           </ul>
         </div>
        <el-breadcrumb separator="/" v-show="dip" class="Crumbs">
            <em></em>
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>


    </div>
</template>
<script>
  import store from '../main.js'
  import Bus from '../vuex/bus.js'
export default {
    data(){
        return{
          msg:"中卫环保局一企一档管理系统",
          dip:false

        }
    },
  created(){
    Bus.$on('OK', ddd => {
      this.dip = ddd;
    });
  },
  methods:{
  }
}
</script>
<style scoped>
.headercon h1{
    height: 100px;
    line-height: 100px;
    font-size:3em
}
</style>

