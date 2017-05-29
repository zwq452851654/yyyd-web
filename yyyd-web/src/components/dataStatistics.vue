<template>
<!--数据统计-->
<!--dataStatistics-->
<!--<router-view></router-view>-->
<div id="enterprise" class="col-md-12" >
    <el-tabs id="acceptanceTotal" v-model="dataStatisticsTotal" type="card">
      <el-tab-pane label="信访投诉" name="first">
        
      </el-tab-pane>
      <el-tab-pane label="行政处罚" name="second">
         
      </el-tab-pane>
      <el-tab-pane label="排污收费" name="three">
         
      </el-tab-pane>
    </el-tabs>
</div>
</template>

<script>
import Bus from '../vuex/bus.js';
import page from '../common/page';
export default {
    data() {
      return {
        dataStatisticsTotal:'first',
        id:"",
        codeNumber:"", //code
        tabfirst:true,
        tabsecond:false,
        tabthree:false,  
      }
    },
    components:{
        page,
    },
    beforeCreate(){},beforeMount(){},mounted(){},
    created(){
        Bus.$on('getTarget', ccc => {
          this.ccc()
        });
    },
    beforeUpdate(){
        this.id=sessionStorage.getItem("ID");
    },
    update(){},
    activated(){},
    deactivated(){},
    beforeDestroy(){},
    destroyed(){},
    watch:{
        id(val){
          console.log(val);
        }
    },
    methods:{
    }
  }
</script>
<style scoped>

</style>
