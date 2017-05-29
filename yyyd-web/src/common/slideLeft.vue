<template>
  <el-tabs v-model="activeName2" type="card" id="slideLeft" >

    <el-tab-pane label="导航信息" name="first">
      <el-row class="tac">
        <el-col :span="24">
          <el-menu default-active="2" class="el-menu-vertical-demo heightUl" id ="heightUl" @open="handleOpen" @close="handleClose" @select="handleSelect"  :unique-opened="uniqueOpened">
            <el-submenu index="1" v-if="(list.BasicInfo||list.Picture||list.Port||list.Product||list.ProjectInfo||list.Approval||list.down)">
              <template slot="title">企业档案</template>
              <el-menu-item index="1-1" v-if="list.BasicInfo"><router-link to="/company/basicInformation">基本信息</router-link></el-menu-item>
              <el-menu-item index="1-2" v-if="list.Picture"><router-link to="/company/plantFloorPlan">厂区平面图</router-link></el-menu-item>
              <el-menu-item index="1-3" v-if="list.Port"><router-link to="/company/portsInformation">排口信息</router-link></el-menu-item>
              <el-menu-item index="1-5" v-if="list.Product"><router-link to="/company/productionOverview">生产概况</router-link></el-menu-item>
              <el-menu-item index="1-7" v-if="list.ProjectInfo"><router-link to="/company/companyNews">项目信息</router-link></el-menu-item>
              <el-menu-item index="1-8" v-if="list.Approval"><router-link to="/company/Information">项目建设审批</router-link></el-menu-item>
              <el-menu-item index="1-4" v-if="list.down"><router-link to="/company/Down">关停并转</router-link></el-menu-item>
            </el-submenu>
            <el-submenu index="2" class="open" v-if="(list.SupervisoryMonitor||list.AutoMonitor||list.VoluntarilyMonitor||list.EmissionSituation)">
              <template slot="title">污染源监测</template>
              <el-menu-item index="2-1" v-if="list.SupervisoryMonitor"><router-link to="/pollute/supervise">监督监测性数据</router-link></el-menu-item>
              <el-menu-item index="2-2" v-if="list.AutoMonitor"><router-link to="/pollute/automatic">自动监测数据</router-link></el-menu-item>
              <el-menu-item index="2-3" v-if="list.VoluntarilyMonitor"><router-link to="/pollute/voluntarily">自行监测数据</router-link></el-menu-item>
              <el-menu-item index="2-4" v-if="list.EmissionSituation"><router-link to="/pollute/situation">排放情况</router-link></el-menu-item>
            </el-submenu>
            <el-submenu index="3" v-if="(list.EIAInfo||list.LicenseApproval||list.TotalEmissionReduction)">
              <template slot="title">污染源监管</template>
              <el-menu-item index="3-1" v-if="list.EIAInfo"><router-link to="/survey/acceptance">环评及验收审批</router-link></el-menu-item>
              <el-menu-item index="3-2" v-if="list.LicenseApproval"><router-link to="/survey/license">许可证审批</router-link></el-menu-item>
              <el-menu-item index="3-3" v-if="list.TotalEmissionReduction"><router-link to="/survey/totalReduction">总量减排指标</router-link></el-menu-item>
            </el-submenu>
            <el-submenu index="4" v-if="(list.TreatmentFacilities||list.FlowChart||list.EquipOff||list.EquipRepair)">
              <template slot="title">污染源基础信息</template>
              <el-menu-item index="4-1" v-if="list.TreatmentFacilities"><router-link to="/base/govern">治理设施情况</router-link></el-menu-item>
              <el-menu-item index="4-2" v-if="list.FlowChart"><router-link to="/base/technics">工艺流程图</router-link></el-menu-item>
              <el-menu-item index="4-3" v-if="list.EquipOff"><router-link to="/base/offstream">设备停运记录</router-link></el-menu-item>
              <el-menu-item index="4-4" v-if="list.EquipRepair"><router-link to="/base/maintenance">设备维修记录</router-link></el-menu-item>
            </el-submenu>
            <el-submenu index="5" v-if="(list.WasteTransfer||list.AnnualDeclaration)">
              <template slot="title">固废管理</template>
              <el-menu-item index="5-1" v-if="list.WasteTransfer"><router-link to="/solidwaste/transfer">危废转移</router-link></el-menu-item>
              <el-menu-item index="5-2" v-if="list.AnnualDeclaration"><router-link to="/solidwaste/annual">年度审批</router-link></el-menu-item>
            </el-submenu>
            <el-submenu index="6" v-if="(list.RadioactiveSources||list.LedgerRegistration||list.YearProtect||list.RadiationSafetyManage)">
              <template slot="title">核与辐射</template>
              <el-menu-item index="6-1" v-if="list.RadioactiveSources"><router-link to="/exposure/radioactive">放射源活动种类和范围</router-link></el-menu-item>
              <el-menu-item index="6-2" v-if="list.LedgerRegistration"><router-link to="/exposure/ledger">台账明细登记</router-link></el-menu-item>
              <el-menu-item index="6-3" v-if="list.YearProtect"><router-link to="/exposure/monitor">年度防护监测</router-link></el-menu-item>
              <el-menu-item index="6-4" v-if="list.RadiationSafetyManage"><router-link to="/exposure/radiation">辐射安全管理机构</router-link></el-menu-item>
            </el-submenu>
            <el-menu-item index="7" v-if="list.EnvMonitor"><router-link to="/Emonitoring">环境监察</router-link></el-menu-item>
            <el-menu-item index="8" v-if="list.EnvEmergencyPlan"><router-link to="/emergencyPlan">环境应急预案</router-link></el-menu-item>
            <el-menu-item index="9" v-if="list.Complaint"><router-link to="/complaint">信访投诉</router-link></el-menu-item>
            <el-menu-item index="10" v-if="list.AdministrativeSanction"><router-link to='/administrative'>行政处罚</router-link></el-menu-item>
            <el-submenu index="11" v-if="(list.PollutionPermit||list.PollutionCharge||list.PollutionPermit)">
              <template slot="title">排污收费</template>
              <el-menu-item index="11-1" v-if="list.PollutionPermit"><router-link to="/pcharge/report">排污申报</router-link></el-menu-item>
              <el-menu-item index="11-2" v-if="list.PollutionCharge"><router-link to="/pcharge/pollutionCharge">排污收费</router-link></el-menu-item>
              <el-menu-item index="11-3" v-if="list.PollutionPermit"><router-link to="/pcharge/permit">排污许可证</router-link></el-menu-item>
            </el-submenu>
            <el-menu-item index="12" v-if="list.SiteEnforcement"><router-link to='/enforcement'>现场执法</router-link></el-menu-item>
            <el-menu-item index="13" v-if="list.PermissionConfiguration"><router-link to='/powerConfig'>权限配置</router-link></el-menu-item>
            <el-menu-item index="14" v-if="list.batchImport"><router-link to='/batchImport'>批量导入</router-link></el-menu-item>
            <el-menu-item index="14" v-if="list.dataStatistics"><router-link to='/dataStatistics'>数据统计</router-link></el-menu-item>

          </el-menu>
        </el-col>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="企业导航" name="second">
      <ul class="enterprise_list heightUl" id="enterprise_list">
        <li v-for="item in items" @click="aaa('ID',item.COCode,item.COName,$event)"><a :style="{color:'black'}">{{item.COName}}</a>
        </li>
      </ul>
    </el-tab-pane>
  </el-tabs>
</template>
<script>

  import Hub from '../vuex/hub.js'
  import Bus from '../vuex/bus.js'
  //  import $ from 'jquery'
  export default {
      data(){
          return {
            uniqueOpened:true,
            activeName2: 'first',
            items :[],
            uniqueOpened:true,
            id:'',
            a: false,
            ccc:[],
            list:{
              "BasicInfo": true,
              "Picture": true,
              "Port": true,
              "Product": true,
              "EnvSupervisor":true,
              "ProjectInfo": true,
              "Approval": true,
              "down": true,
              "SupervisoryMonitor": true,
              "AutoMonitor": true,
              "VoluntarilyMonitor": true,
              "EmissionSituation": true,
              "EIAInfo": true,
              "LicenseApproval": true,
              "TotalEmissionReduction": true,
              "TreatmentFacilities": true,
              "FlowChart": true,
              "EquipOff": true,
              "EquipRepair": true,
              "WasteTransfer": true,
              "AnnualDeclaration": true,
              "RadioactiveSources": true,
              "LedgerRegistration": true,
              "YearProtect": true,
              "RadiationSafetyManage": true,
              "EnvMonitor": true,
              "EnvEmergencyPlan": true,
              "Complaint": true,
              "AdministrativeSanction": true,
              "PollutionCharge": true,
              "PollutionDeclaration": true,
              "PollutionPermit": true,
              "SiteEnforcement": true,
              "PermissionConfiguration":true,
              "dataStatistics":true,
              "batchImport":true
            }
          }
      },
    created(){
      this.getNews();
      Hub.$on('powerlist', (obj) => { //Hub接收事件
          console.log(obj);
          this.list = obj;
      });
    },
    mounted() {
      this.getheigth();
      $(".router-link-active").parent().parent().css("display","block");
      $("a").on('click',function(){
        $(this).parent().parent().parent().siblings(".el-submenu").find(".el-menu").css("display","none")
        $(this).parent().parent().css("display","block");
      })
    },
    methods: {
      selectValueHandle: function (item) {
        this.$emit("receive", item);
      },
      handleOpen(key, keyPath) {

      },
      handleClose(key, keyPath) {

      },
      handleSelect(key, keyPath) {
        //console.log(key, keyPath);
      },
      aaa(ID, value, name,e){
        sessionStorage.setItem(ID, value);
        sessionStorage.setItem("name",name);
        /*this.$router.go(0)*/    //页面刷新
        Bus.$emit('getTarget', 'ccc');
        $('#enterprise_list li a').css({"color": "black"});
        e.srcElement.style.color = 'red';
        this.activeName2 = 'first';  //点击完回到导航信息栏
      },
      getNews: function () {
        //局部发送ajax
        var _this = this;
        this.$http.get('/api/ps?TableCode=A001').then(function (res) {
          _this.items = res.body.data;
        }, function (err) {
          console.log(err)
        })
      },
      getheigth:function(){
         document.getElementById("heightUl").style.height= document.documentElement.clientHeight-175+"px";
         document.getElementById("enterprise_list").style.height= document.documentElement.clientHeight-175+"px";
      }
    }
  }
</script>

<style scoped>
  ul li a{
    color: #48576a;
  }
  .router-link-active{
    font-weight: bold;
  }
  .col1 {
    color: #ccc;
  }

  .col2 {
    color: red;
  }
  .el-menu-item a{
    font-size:15px;
  }
  .heightUl{
    overflow: auto;
  }
</style>

