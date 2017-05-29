<template>
<div>
    <div class="col-md-12 homeChoice" style="margin-top: 20px">
        <h4>请选择企业</h4>
        <form class="form-horizontal" style="margin-top: 10px">
            <div class="form-group">
                <label for="inputEmail3" class="col-sm-1 control-label">企业名称</label>
                <div class="col-sm-3">
                    <input type="text" v-model="inputName" class="form-control" id="inputEmail3" placeholder="可输入名称查询">
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-1 control-label">行政区域</label>
                <div class="col-sm-3">
                  <select class="form-control" v-model="division">
                    <option value="请选择">请选择</option>
                    <option v-for="di in divisionData">{{di.Name}}</option>
                  </select>
                </div>
            </div>

            <div class="form-group">
                <label class="col-sm-1 control-label">污染种类</label>
                <el-checkbox v-model="Wading" true-label="涉水企业">涉水企业</el-checkbox>
                <el-checkbox v-model="InvolvingGas" true-label="涉气企业">涉气企业</el-checkbox>
                <el-checkbox v-model="solid" true-label="固废企业">固废企业</el-checkbox>
                <el-checkbox v-model="eradiate" true-label="辐射企业">辐射企业</el-checkbox>
                <el-checkbox v-model="other" true-label="其他企业">其他企业</el-checkbox>
            </div>

            <div class="form-group">
                <label  class="col-sm-1 control-label">管理类型</label>
                <div class="col-sm-3">
                  <select class="form-control" v-model="Type">
                    <option value="请选择">请选择</option>
                    <option v-for="ty in TypeData">{{ty.Name}}</option>
                  </select>
                </div>
            </div>

          <div class="form-group">
            <label class="col-sm-1 control-label">企业状况</label>
            <div class="col-sm-3">
              <select class="form-control">
                <option value="请选择">请选择</option>
                <option>省辖区</option>
                <option>市辖区</option>
              </select>
            </div>
           </div>
        </form>
     </div>

    <div class="bs-example">
      <div class="buttons mar">
        <a class="btn btn-primary btn-middle"  data-toggle="modal" data-target="#myModal"> 新建企业信息 </a>
      </div>
            <el-table :data="items" height="550" border style="width: 100%">
                <el-table-column prop="COName" label="企业名称" width="500"> </el-table-column>
                <el-table-column prop="AreaCode" label="所属县区"> </el-table-column>
                <el-table-column prop="CorporationName" label="法人代表"> </el-table-column>
                <el-table-column label="操作">
                    <template scope="props">
                        <router-link :id=props.row.companyid :to="{path: 'company/basicInformation'}" class="btnlogin" @click.native="aaa('ID',props.row.COCode,props.row.COName)">查看详情</router-link>
                    </template>
                </el-table-column>
            </el-table>
    </div>

  <!--新建企业弹出层-->
  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h3 class="modal-title text-center">新建页面信息表</h3>
        </div>
        <div class="modal-body ml0" id="enterprise">

          <form @submit.prevent="Submit">
            <table class="table">
              <tbody>
              <tr>
                <td>企业名称</td>
                <td>
                  <input type="text" v-model="item.COName" placeholder="请输入内容" >
                </td>
                <td>邮政编码</td>
                <td colspan="2">
                  <input type="text" v-model="item.PostalCode">
                </td>
              </tr>
              <tr>
                <td>企业详细地址</td>
                <td>
                  <input type="text" v-model="item.COAddress" placeholder="请输入内容">
                </td>
                <td>联系电话（？？？）</td>
                <td colspan="2">
                  <input type="text" v-model="item.CorporationPhone">
                </td>
              </tr>
              <tr>
                <td>法定代表人</td>
                <td>
                  <input type="text" v-model="item.CorporationName">
                </td>
                <td>联系电话（？？？）</td>
                <td>
                  <input type="text" v-model="item.FillPhone">
                </td>
              </tr>
              <tr>
                <td>填报联系人</td>
                <td>
                  <input type="text" v-model="item.FillName">
                </td>
                <td>电子邮箱</td>
                <td>
                  <input type="text" v-model="item.Email">
                </td>
              </tr>
              <tr>
                <td>传真</td>
                <td>
                  <input type="text" v-model="item.Fax">
                </td>
                <td>组织机构代码</td>
                <td>
                  <input type="text" v-model="item.ZZJGDM" >
                </td>
              </tr>
              <tr>
                <td data-toggle="modal" data-target="#myModal">营业执照注册号</td>
                <td>
                  <input type="text" v-model="item.BusinessLicenceNo" icon="search">
                </td>
                <td>经营场所地址</td>
                <td>
                  <input type="text" v-model="item.BusinessAddress" >
                </td>
              </tr>
              <tr>
                <td>经营范围</td>
                <td colspan="3">
                  <input type="text" v-model="item.BusinessScope" >
                </td>
              </tr>
              <tr>
                <td>排污单位环保监控类别</td>
                <td colspan="3">
                  <input type="text" v-model="item.AttentionDegreeName" >
                </td>
              </tr>
              <tr>
                <td>行业名称与代码</td>
                <td>
                  <input type="text" v-model="item.IndustryTypeName" >
                </td>
                <td>企业规模</td>
                <td>
                  <!--<input type="text" v-model="item.PSScaleName" >-->
                  <select class="form-control" v-model="item.PSScaleName">
                    <option value="请选择">请选择</option>
                    <option v-for="en in enterpriseData">{{en.Name}}</option>
                  </select>                </td>
              </tr>
              <tr>
                <td>总投资</td>
                <td>
                  <input type="text" v-model="item.TotalInvestment" >
                </td>
                <td>环保投资</td>
                <td>
                  <input type="text" v-model="item.EPInvestment" >
                </td>
              </tr>
              <tr>
                <td>排污单位开工建设日期</td>
                <td>
                  <input type="text" v-model="item.ConstructionDate" >
                </td>
                <td>排污单位投运日期</td>
                <td>
                  <input type="text" v-model="item.RunDate" >
                </td>
              </tr>
              <tr>
                <td>运营情况</td>
                <td colspan="3">
                  <input type="text" v-model="item.Operating" >
                </td>
              </tr>
              <tr>
                <td>排污单位坐标：</td>
                <td colspan="3">
                  <table style="width: 100%">
                    <tbody>
                    <tr>
                      <td>中心经度</td>
                      <td>
                        <input type="text" v-model="item.Longitude">
                      </td>
                      <td>中心纬度</td>
                      <td>
                        <input type="text" v-model="item.Latitude" >
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>污染类型</td>
                <td colspan="3">
                  <div class="form-group">
                    <el-checkbox v-model="item.InvolveWater" true-label="涉水企业">涉水企业</el-checkbox>
                    <el-checkbox v-model="item.InvolveAir" true-label="涉气企业">涉气企业</el-checkbox>
                    <el-checkbox v-model="item.InvolveSolidWastes" true-label="固废企业">固废企业</el-checkbox>
                    <el-checkbox v-model="item.InvolveRadiation" true-label="辐射企业">辐射企业</el-checkbox>
                    <el-checkbox v-model="item.InvolveOther" true-label="其他企业">其他企业</el-checkbox>
                  </div>
                </td>
              </tr>
              <tr>
                <td>行政区域所在地</td>
                <td>
                  <input type="text" v-model="item.RegionName" >
                </td>
                <td>行政区域性质</td>
                <td>
                  <input type="text" v-model="item.CantonProperties">
                </td>
              </tr>
              <tr>
                <td>区域环境功能区</td>
                <td colspan="3">
                  <table style="width: 100%">
                    <tbody>
                    <tr>
                      <td>环境空气</td>
                      <td>
                          <select class="form-control" v-model="item.AirLevel">
                            <option value="请选择">请选择</option>
                            <option v-for="at in atmosphereData">{{at.Name}}</option>
                          </select>
                      </td>
                      <td>地表水</td>
                      <td>
                          <select class="form-control" v-model="item.SurfaceWaterLevel">
                            <option value="请选择">请选择</option>
                            <option v-for="su in surfaceWaterData">{{su.Name}}</option>
                          </select>
                      </td>
                    </tr>
                    <tr>
                      <td>地下水</td>
                      <td>
                          <select class="form-control" v-model="item.Groundwater">
                            <option value="请选择">请选择</option>
                            <option v-for="gr in groundwaterData">{{gr.Name}}</option>
                          </select>
                      </td>
                      <td>声环境</td>
                      <td>
                          <select class="form-control" v-model="item.Soundlevel">
                            <option value="请选择">请选择</option>
                            <option v-for="so in soundData">{{so.Name}}</option>
                          </select>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              </tbody>
            </table>
            <div class="col-md-12">
              <input class="btn btn-default col-md-offset-10" id="buttonClose" data-dismiss="modal" type="button" value="关闭" @click="cancel">
              <input class="btn btn-default" type="submit" value="保存">
            </div>
          </form>

        </div>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import store from '../main.js'
import Bus from '../vuex/bus.js'
export default {
    data () {
        return {
          division:'请选择',
          Type:'请选择',
          Wading:'',   //涉水
          InvolvingGas:'',   //涉气
          solid:'',   //固废
          eradiate:'',   //辐射
          other:'',   //其他
          inputName:'', //输入名称查询
          /*下拉名称*/
          divisionData:[],
          TypeData:[],
          atmosphereData:[],
          surfaceWaterData:[],
          groundwaterData:[],
          soundData:[],
          enterpriseData:[],
          data:[],
          msg: '中卫环保局一企一档管理系统',
          items :[],
          itemid:"",
          item:{
            COName:'',
            PostalCode:'',
            COAddress:'',
            CorporationPhone:'',
            CorporationName:'',
            FillPhone:'',
            FillName:'',
            Email:'',
            Fax:'',
            ZZJGDM:'',
            BusinessLicenceNo:'',
            BusinessAddress:'',
            BusinessScope:'',
            AttentionDegreeName:'',
            IndustryTypeName:'',
            PSScaleName:'',
            TotalInvestment:'',
            EPInvestment:'',
            ConstructionDate:'',
            RunDate:'',
            Operating:'',
            RegionName:'',
            CantonProperties:'',
            AirLevel:'',
            SurfaceWaterLevel:'',
            Groundwater:'',
            Soundlevel:'',
            Longitude:'',
            Latitude:'',
            InvolveWater:'',
            InvolveAir:'',
            InvolveSolidWastes:'',
            InvolveRadiation:'',
            InvolveOther:''
          },
        }
    },
    created(){
        this.getNews();
        Bus.$emit('OK', false);
    },
    watch:{
      'inputName':function(){
        this.getNews(this.id);
      },
      'division':function(){
          this.getNews(this.id);
      },
      'Type':function(){
        this.getNews(this.id);
      },
      'Wading':function(){
        this.getNews(this.id);
      },
      'InvolvingGas':function(){
        this.getNews(this.id);
      },
      'solid':function(){
        this.getNews(this.id);
      },
      'eradiate':function(){
        this.getNews(this.id);
      },
      'other':function(){
        this.getNews(this.id);
      }
  },
    methods:{
      aaa(item,value,name){
        sessionStorage.setItem(item, value);
        sessionStorage.setItem("name",name);
      },
      getNews:function(){
      //局部发送ajax
       var _this = this;
       var path = '/api/ps?TableCode=A001';
       if(_this.inputName !== '' && _this.inputName !== '请选择'){
         path += '&COName='+_this.inputName
       }
       if(_this.division !== '' && _this.division !== '请选择'){
         path += '&RegionName='+_this.division
       }
       if(_this.Type !== '' && _this.Type !== '请选择'){
           path += '&AttentionDegreeName='+_this.Type
       }
       if(_this.Wading){
         path += '&InvolveWater=涉水企业'
       }
       if(_this.InvolvingGas){
         path += '&InvolveAir=涉气企业'
       }
       if(_this.solid){
         path += '&InvolveSolidWastes=固废企业'
       }
       if(_this.eradiate){
         path += '&InvolveRadiation=辐射企业'
       }
       if(_this.other){
         path += '&InvolveOther=其他企业'
       }

       var url = '/api/ps?TableCode=A001';
       console.log('路径:'+path);
       this.$http.get(path).then(function(res){
         console.log('aaaa', res.body.data)
         _this.items = res.body.data;
         _this.getSelectDate('O014');
         _this.getSelectDate('O027');
         _this.getSelectDate('O028');
         _this.getSelectDate('O008');
         _this.getSelectDate('O029');
         _this.getSelectDate('O023');
         _this.getSelectDate('O026');
      },function(err){
        console.log(err)
      })
    },
      Submit: function(event) {
      this.item["COCode"] = new Date().getTime();
      this.item["TableCode"]='A001';
      var formData = JSON.stringify(this.item);
      console.log('提交的信息:',formData)
      this.$http.post('/api/pi',formData,{emulateJSON:true}).then((res) => {
        if(res.body.message==="successful"){
          this.cancel();
          this.getNews(this.id);
        }
        if(res.body.success ===false){
          this.$message({showClose: true,message:res.body.message,type: 'error'});
        }
      }, (req) => {
        console.log("提交失败")
      });
    },
      cancel:function(){
        document.getElementById("buttonClose").click();
      },
      /*下来菜单*/
      getSelectDate(code){
        this.$http.get('/api/ps?TableCode='+code).then(function(res){
          console.log('code',code)
          if (res.body.success===true){
            switch (code){
              case 'O014':
                this.divisionData = res.body.data;
                break;
              case 'O027':
                this.TypeData = res.body.data;
                break;
              case 'O028':
                this.atmosphereData = res.body.data;
                break;
              case 'O008':
                this.surfaceWaterData = res.body.data;
                break;
              case 'O029':
                this.groundwaterData = res.body.data;
                break;
              case 'O023':
                this.soundData = res.body.data;
                break;
              case 'O026':
                this.enterpriseData = res.body.data;
                break;
            }

          }
        })
      },
    }
}
</script>
<style scoped>
.form-horizontal .form-group{
    margin-left: 0px;
    margin-right: 0px;
}
table tr th{
    font-size: 16px;
    font-weight: 500;
    color:#333;
    height: 44px;
}
table tr td{
   font-size: 14px;
   height: 44px;
}
.bs-example table tr td a{
    color: #666;
}
.checkbox{
    font-size: 16px;
}
@media (min-width: 768px){
    .form-horizontal .control-label{
        text-align: center;
    }
}

.homeChoice h4{
margin-left: 25px;
font-weight: bold;
}
.table-border{
    border:1px solid #ddd;
}
.bs-example .View-details{
    width: 76px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    color:#fff;
    background: #73a82b;
    display: inline-block;
    border-radius: 3px;
}

#enterprise table tr td{
  font-weight: 700;
}

#enterprise table input{
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #bfcbd9;
  box-sizing: border-box;
  color: #1f2d3d;
  display: block;
  font-size: inherit;
  height: 36px;
  line-height: 1;
  outline: 0;
  padding: 3px 10px;
  transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
  width: 100%;
  font-weight: normal;
}


.modal-dialog{
  width:100%;
  margin: 30px auto;
}

.modal-content{
  width: 960px;
  margin: 30px auto;
  padding-bottom: 15px;
}

#modal-content,#modal-content1{
  width: 460px;
  margin: 100px auto;
}

#modal-content .modal-body .form-group input,#modal-content1 .modal-body .form-group input{
  width: 300px;
}

#modal-content .modal-body .form-group div,#modal-content1 .modal-body .form-group div{
  text-align: right;
  padding-right: 25px;
}

</style>
