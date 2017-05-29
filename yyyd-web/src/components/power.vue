<template>
<!--权限划分-->
    <div id="enterprise" class="col-md-12">
         <div class="buttons" v-if="isUpdate">
            <el-button @click="resetCheckedAll">全选</el-button>
            <el-button @click="resetChecked">清空</el-button>
            <el-button @click="postpower(items[0])">确定</el-button>
            <el-button @click="getCheckedKeys">修改</el-button>
        </div>
        <el-tree class="clearfix"
            :data="data2"
            :disabled = "isUpdate"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            highlight-current
            :props="defaultProps">
        </el-tree>
    </div>
</template>

<script>
import Hub from '../vuex/hub.js'
import $ from  'jquery'
    export default {
   data() {
      return {
        items:[],
        primaryData:["BasicInfo", "Picture", "Port", "Product", "EnvSupervisor", "ProjectInfo", "Approval", "down", "SupervisoryMonitor", "AutoMonitor", "VoluntarilyMonitor", "EmissionSituation", "EIAInfo", "LicenseApproval", "TotalEmissionReduction", "TreatmentFacilities", "FlowChart", "EquipOff", "EquipRepair", "WasteTransfer", "AnnualDeclaration", "RadioactiveSources", "LedgerRegistration", "YearProtect", "RadiationSafetyManage", "EnvMonitor", "EnvEmergencyPlan", "Complaint", "AdministrativeSanction", "PollutionDeclaration", "PollutionCharge", "PollutionPermit", "SiteEnforcement", "PermissionConfiguration"
        ],
        UserID:1,
        codeNumber:"",
        UserName:"",
        isUpdate:true,
        data2: [
            {
              id:0,
              label: '企业档案',
              children: [
                {
                    id:"BasicInfo",
                    label: '基本信息',
                },
                {
                    id:"Picture",
                    label: '厂区平面图',
                },
                {
                    id:"Port",
                    label: '排口信息',
                },
                {
                    id:"Product",
                    label: '生产概况',
                },
                {
                    id:"EnvSupervisor",
                    label: '建设期环境监理',
                },
                {
                    id:"ProjectInfo  ",
                    label: '项目信息',
                },
                {
                    id:"Approval",
                    label: '项目建设信息',
                },
                {
                    id:"down",
                    label: '关停并转',
                },
             ]
          }, 
          {
          id:1,
          label: '污染源监测',
          children: [
              {
                id:"SupervisoryMonitor",
                label: '监督监测性数据'
              }, 
              {
                id: "AutoMonitor",
                label: '自动监测数据'
              },
              {
                id: "VoluntarilyMonitor",
                label: '自行监测数据'
              }, 
              {
                id:"EmissionSituation",
                label: '排放情况'
              }
          ]
          },
          {
          id:3,
          label: '污染源监管',
          children: [
              {
                id: "EIAInfo",
                label: '环评及验收审批'
              }, 
              {
                id:"LicenseApproval",
                label: '许可证审批'
              },
              {
                id: "TotalEmissionReduction",
                label: '总量减排指标'
              }
          ]
          },
          {
          id:4,
          label: '污染源基础信息',
          children: [
              {
                id: "TreatmentFacilities",
                label: '治理设施情况'
              }, 
              {
                id: "FlowChart",
                label: '工艺流程图'
              },
              {
                id:"EquipOff",
                label: '设备停运记录'
              },
              {
                id: "EquipRepair",
                label: '设备维修记录'
              }
          ]
          },
          {
            id:6,
            label: '核与辐射',
            children: [
                {
                  id: "RadioactiveSources",
                  label: '放射源活动种类和范围'
                }, 
                {
                  id: "LedgerRegistration",
                  label: '台账明细登记'
                },
                {
                  id: "YearProtect",
                  label: '年度防护监测'
                },
                {
                  id:"RadiationSafetyManage",
                  label: '辐射安全管理机构'
                }
            ]
          },
           {
            id:5,
            label: '固废管理',
            children: [
                {
                  id:"WasteTransfer ",
                  label: '危废转移'
                }, 
                {
                  id:"AnnualDeclaration",
                  label: '年度审批'
                }
            ]
          },
          {
          id:"EnvMonitor",
          label: '环境监察',
          },
          {
           id: "EnvEmergencyPlan",
          label: '环境应急预案',
          },
          {
           id:"Complaint",
          label: '信访投诉',
          },
          {
            id:7,
            label: '排污收费',
            children: [
                {
                  id:"PollutionDeclaration",
                  label: '排污申报'
                }, 
                {
                  id: "PollutionCharge",
                  label: '排污收费'
                },
                {
                  id: "PollutionPermit",
                  label: '排污许可证'
                }
            ]
          },
         {
          id:"AdministrativeSanction",
          label: '行政处罚',
          },
          {
          id:"SiteEnforcement",
          label: '现场执法',
          },
         {
          id:"PermissionConfiguration",
          label: '权限配置',
          },
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    mounted(){
      $(".el-tree>div").css({
        "width":"50%",
        "float":"left"
      }) 
      this.list = this.items[0];
    },
    created() {
      Hub.$on('change', (arr) => { //Hub接收事件
          console.log(arr);
          this.getpower(arr[0]);
          this.isUpdate = arr[1];
          console.log(this.isUpdate)
      });
    
    },
    watch:{
      
    },
    methods: {
      getCheckedNodes() {
        console.log(this.$refs.tree.getCheckedNodes());
      },
      getCheckedKeys() {
          var Arr = this.$refs.tree.getCheckedKeys();
          for(var i=0;i<Arr.length;i++){
              if(typeof Arr[i] === 'number'){
                  Arr.splice(i,1);
                  i--;
              }  
          }
          console.log(Arr);
          var postObj = {};
          for(var j = 0;j<this.primaryData.length;j++){
              for(var n =0;n<Arr.length;n++){
                  if(this.primaryData[j] == Arr[n]){
                    postObj[this.primaryData[j]]=true;
                    continue;
                  }
              }
              if(postObj[this.primaryData[j]] != true){
                postObj[this.primaryData[j]] = false;
              }
          }
          console.log(postObj,1111);
          postObj["TableCode"] = 'N001';
          postObj["UserID"] = this.UserID;
          postObj["UserName"] = this.UserName;
          postObj["RecordCode"] = this.codeNumber;
          this.$http.post('/api/pu',postObj,{emulateJSON:true}).then((res) => {
              console.log(res.body.message)
            if(res.body.message==="successful"){
                this.$router.push({path:'powerConfig'})
            }
          }, (req) => {
            console.log("提交失败")
          }); 
      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      },
      resetCheckedAll(){
         this.$refs.tree.setCheckedKeys([0, "BasicInfo", "Picture", "Port", "Product", "EnvSupervisor", "ProjectInfo  ", "Approval", "down",1, "SupervisoryMonitor", "AutoMonitor", "VoluntarilyMonitor", "EmissionSituation", 3, "EIAInfo", "LicenseApproval", "TotalEmissionReduction",4, "TreatmentFacilities", "FlowChart", "EquipOff", "EquipRepair",5, "WasteTransfer ", "AnnualDeclaration",6, "RadioactiveSources", "LedgerRegistration", "YearProtect", "RadiationSafetyManage", "EnvMonitor", "EnvEmergencyPlan", "Complaint", "AdministrativeSanction",7, "PollutionDeclaration", "PollutionCharge", "PollutionPermit", "SiteEnforcement", "PermissionConfiguration"]);
      },
      getpower(uname){
          this.$http.get('/api/ps?TableCode=N001&UserID='+uname)
          .then(function(res){
            if(res.body.success === true){
               var arr = [];
               this.items= res.body.data;
               if(this.items.length>0){
                  this.UserID = res.body.data[0]["UserID"];
                  this.UserName = res.body.data[0]["UserName"];
                  this.codeNumber = res.body.data[0]["RecordCode"];
                  console.log(this.UserID,this.UserName,22222);
                  for( var a in this.items[0]){
                    if(this.items[0][a] === true){
                        arr.push(a);
                    }
                  }
               }
               this.$refs.tree.setCheckedKeys(arr,true);
           } 
          },function(err){
            console.log(err)
          })
      },
      postpower(obj){
        Hub.$emit('powerlist',obj);
      }
    }  
  };
</script>
<style scoped>
.buttons{
    margin-bottom: 20px;
}
.el-tree>div{
  width: 50%;
}
</style>
