<template>
  <!--基本信息-->
  <!--<router-view></router-view>-->
  <div id="enterprise" class="col-md-12 mar basicInformation">
    <form @submit.prevent="basicSubmit">
      <table class="table">
        <tbody>
        <tr>
          <td><span class="pk">*</span>企业名称</td>
          <td>
            <input type="text" required="required" v-model="item.COName" placeholder="请输入内容" :disabled="readonly">
          </td>
          <td>邮政编码</td>
          <td colspan="2">
            <input type="text" v-model="item.PostalCode" :disabled="readonly">
          </td>
        </tr>
        <tr>
          <td><span class="pk">*</span>企业详细地址</td>
          <td>
            <input type="text" required="required" v-model="item.COAddress" placeholder="请输入内容" :disabled="readonly">
          </td>
          <td>电子邮箱</td>
          <td>
            <input type="text" v-model="item.Email" :disabled="readonly">
          </td>
        </tr>
        <tr>
          <td>法定代表人</td>
          <td>
            <input type="text" v-model="item.CorporationName" :disabled="readonly">
          </td>
          <td>联系电话</td>
          <td>
            <input type="text" v-model="item.CorporationPhone" :disabled="readonly">
          </td>
        </tr>
        <tr>
          <td>填报联系人</td>
          <td>
            <input type="text" v-model="item.FillName" :disabled="readonly">
          </td>
          <td>联系电话</td>
          <td colspan="2">
            <input type="text" v-model="item.MobilePhone" :disabled="readonly">
          </td>
        </tr>
        <tr>
          <td>传真</td>
          <td>
            <input type="text" v-model="item.Fax" :disabled="readonly">
          </td>
          <td><span class="pk">*</span>组织机构代码</td>
          <td>
            <input type="text" required="required" v-model="item.ZZJGDM" :disabled="readonly">
          </td>
        </tr>
        <tr>
          <td data-toggle="modal" data-target="#myModal">营业执照注册号</td>
          <td>
            <input type="text" style="color: #13ce66" v-model="item.BusinessLicenceNo" :disabled="readonly" icon="search">
          </td>
          <td>经营场所地址</td>
          <td>
            <input type="text" v-model="item.BusinessAddress" :disabled="readonly">
          </td>
        </tr>
        <tr>
          <td>经营范围</td>
          <td colspan="3">
            <input type="text" v-model="item.BusinessScope" :disabled="readonly">
          </td>
        </tr>
        <tr>
          <td>排污单位环保监控类别</td>
          <td colspan="3">
            <!--<input type="text" v-model="item.AttentionDegreeName" :disabled="readonly">-->
            <select required="required" class="form-control" v-model="item.AttentionDegreeName" :disabled="readonly">
              <option value="请选择">请选择</option>
              <option v-for="co in CompanyData">{{co.Name}}</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>污染类型</td>
          <td colspan="3">
              <el-checkbox v-model="item.InvolveWater" true-label="涉水企业" :disabled="readonly">涉水企业</el-checkbox>
              <el-checkbox v-model="item.InvolveAir" true-label="涉气企业" :disabled="readonly">涉气企业</el-checkbox>
              <el-checkbox v-model="item.InvolveSolidWastes" true-label="固废企业" :disabled="readonly">固废企业</el-checkbox>
              <el-checkbox v-model="item.InvolveRadiation" true-label="辐射企业" :disabled="readonly">辐射企业</el-checkbox>
              <el-checkbox v-model="item.InvolveOther" true-label="其他企业" :disabled="readonly">其他企业</el-checkbox>
          </td>
        </tr>
        <tr>
          <td><span class="pk">*</span>行业名称与代码</td>
          <td>
            <input type="text" required="required" v-model="item.IndustryTypeName" :disabled="readonly">
          </td>
          <td>企业规模</td>
          <td>
            <!--<input type="text" v-model="item.PSScaleName" :disabled="readonly">-->
            <select class="form-control" v-model="item.PSScaleName">
              <option value="请选择">请选择</option>
              <option v-for="en in enterpriseData">{{en.Name}}</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>总投资</td>
          <td>
            <input type="text" v-model="item.TotalInvestment" :disabled="readonly">
          </td>
          <td>环保投资</td>
          <td>
            <input type="text" v-model="item.EPInvestment" :disabled="readonly">
          </td>
        </tr>
        <tr>
          <td>排污单位开工建设日期</td>
          <td>
            <!--<input type="text" v-model="item.ConstructionDate" :disabled="readonly">-->
            <el-date-picker
              :disabled="readonly"
              :picker-options="pickerOptions1"
              v-model="item.ConstructionDate"
              type="date"
              placeholder="选择日期"
              align="right">
            </el-date-picker>
          </td>
          <td>排污单位投运日期</td>
          <td>
            <!--<input type="text" v-model="item.RunDate" :disabled="readonly">-->
            <el-date-picker
              :disabled="readonly"
              :picker-options="pickerOptions2"
              v-model="item.RunDate"
              type="date"
              placeholder="选择日期"
              align="right">
            </el-date-picker>
          </td>
        </tr>
        <tr>
          <td>运营情况</td>
          <td colspan="3">
            <input type="text" v-model="item.Operating" :disabled="readonly">
          </td>
        </tr>
        <tr>
          <td>排污单位坐标</td>
          <td colspan="3">
            <input type="text" :disabled="readonly">
          </td>
        </tr>
        <tr>
          <td>历史变迁</td>
          <td colspan="3">
            <div class="buttons" style="margin-bottom: 10px;">
              <a class="btn btn-primary btn-middle" data-toggle="modal" data-target="#myModal04" >添加企业名称变更记录</a>
              <a class="btn btn-primary btn-middle" data-toggle="modal" data-target="#myModal05" >添加企业地址变更记录</a>
            </div>
            <table class="table table-bordered" v-if="item.History !== null && this.item.History.name.length > 0">
              <thead style="background: #eef1f6">
              <tr>
                <th>旧的企业名称</th>
                <th>新的企业名称</th>
                <th>名称更改时间</th>
              </tr>
              </thead>
              <tbody v-for="cc in item.History.name">
              <tr>
                <td>{{cc.old}}</td>
                <td>{{cc.new}}</td>
                <td>{{cc.time}}</td>
              </tr>
              </tbody>
            </table>

            <table class="table table-bordered" v-if="item.History !== null && this.item.History.address.length > 0">
              <thead style="background: #eef1f6">
              <tr>
                <th>旧的企业地址</th>
                <th>新的企业地址</th>
                <th>地址变迁时间</th>
              </tr>
              </thead>
              <tbody v-for="aa in item.History.address">
              <tr>
                <td>{{aa.old}}</td>
                <td>{{aa.new}}</td>
                <td>{{aa.time}}</td>
              </tr>
              </tbody>
            </table>
          </td>

        </tr>
        <tr>
          <td><span class="pk">*</span>行政区域所在地</td>
          <td>
            <input type="text" required="required" v-model="item.RegionName" :disabled="readonly">
          </td>
          <td>行政区域性质</td>
          <td>
            <input type="text" v-model="item.CantonProperties" :disabled="readonly">
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
                  <select class="form-control" v-model="item.AirLevel" :disabled="readonly">
                    <option value="请选择">请选择</option>
                    <option v-for="at in atmosphereData">{{at.Name}}</option>
                  </select>
                </td>
                <td>地表水</td>
                <td>
                  <select class="form-control" v-model="item.SurfaceWaterLevel" :disabled="readonly">
                    <option value="请选择">请选择</option>
                    <option v-for="su in surfaceWaterData">{{su.Name}}</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>地下水</td>
                <td>
                  <select class="form-control" v-model="item.Groundwater" :disabled="readonly">
                    <option value="请选择">请选择</option>
                    <option v-for="gr in groundwaterData">{{gr.Name}}</option>
                  </select>
                </td>
                <td>声环境</td>
                <td>
                  <select class="form-control" v-model="item.Soundlevel" :disabled="readonly">
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
        注释：<span class="pk">*</span>为必填项
        <input class="btn btn-default col-md-offset-9" type="button" value="编辑" @click="basicUpdata()">
        <input class="btn btn-default" type="submit" value="保存">
      </div>
    </form>
    <!--营业执照弹出框-->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h3 class="modal-title text-center">宁夏明巨电石有限公司-营业执照</h3>
          </div>
          <div class="modal-body ml0">

            <div class="z_left">
              <ul>
                <li><span>向上</span></li>
                <li>
                  <i class="el-icon-circle-close" v-if="close"></i>
                  <img src="../assets/yyzz_img_u576.jpg" alt="">
                </li>
                <li>
                  <i class="el-icon-circle-close" v-if="close"></i>
                  <img src="../assets/yyzz_img_u576.jpg" alt=""></li>
                <li>
                  <i class="el-icon-circle-close" v-if="close"></i>
                  <img src="../assets/yyzz_img_u576.jpg" alt=""></li>
                <li><span>向下</span></li>
              </ul>
            </div>

            <div class="z_center">
              <img src="../assets/yyzz_img_u576.jpg" alt="">
            </div>

            <div class="z_right">
              <el-button @click="show3 = !show3">查看详细</el-button>

              <div style="margin-top: 20px; height: 200px;">
                <div v-show="show3">
                  <table class="table table-bordered">
                    <tbody>
                    <tr>
                      <td>档案名称</td>
                      <td>宁夏明巨电石有限公司-营业执照</td>
                    </tr>
                    <tr>
                      <td>上传时间</td>
                      <td>2017-04-01</td>
                    </tr>
                    <tr>
                      <td>上传人</td>
                      <td>Admin</td>
                    </tr>
                    <tr>
                      <td>实体档案编码</td>
                      <td>1298-1029976</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <form class="form-inline clearfix TheTwoColumn" @submit.prevent="plantFloorPlanSubmit" >
                  <div class="table-responsive">
                    <table class="table">
                      <tr>
                        <td>
                          <div>
                            <uploadFile ref="upload" @end="drawing"   @listenState="listenstatus"  :childUrl="fileurl"></uploadFile>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <button type="submit" class="btn btn-primary">确定</button>
                </form>
              </div>

              <div class="z_right_btn">
                <input class="btn btn-default" type="button" value="编辑" @click="licenseUpdata">
                <input class="btn btn-default" type="submit" value="保存">
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>

    <!--名称更改-->
    <div class="modal fade" id="myModal04" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content" id="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">企业名称更改</h4>
          </div>
          <div class="modal-body ml0 TheTwoColumn">
            <form class="form-inline clearfix" @submit.prevent="basicSubmit">
              <div class="form-group">
                <label >企业旧名称：</label>
                <input type="text" class="form-control" required="required" v-model="oldData"/>
              </div>
              <div class="form-group">
                <label >企业新名称：</label>
                <input type="text"  class="form-control" required="required" v-model="newData"/>
              </div>
              <div class="form-group">
                <div>
                  <button type="button" class="btn btn-default buttonClose" data-dismiss="modal" @click="cancel">关闭</button>
                  <button type="submit" class="btn btn-primary">确定</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!--地址更改-->
    <div class="modal fade" id="myModal05" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content" id="modal-content1">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">企业地址更改</h4>
          </div>
          <div class="modal-body ml0 TheTwoColumn">
            <form class="form-inline clearfix" @submit.prevent="basicSubmit">
              <div class="form-group">
                <label >企业旧地址：</label>
                <input type="text" class="form-control" required="required" v-model="oldAddress"/>
              </div>
              <div class="form-group">
                <label >企业旧地址：</label>
                <input type="text"  class="form-control" required="required" v-model="newAddress"/>
              </div>
              <div class="form-group">
                <div>
                  <button type="button" class="btn btn-default buttonClose" data-dismiss="modal" @click="cancel">关闭</button>
                  <button type="submit" class="btn btn-primary">确定</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>
<script>
  import Bus from '../vuex/bus.js'
  import uploadFile from '../common/uploadFile';
  import $ from '../../node_modules/jquery/dist/jquery.min.js'
  export default {
    components:{
      uploadFile,
    },
    data () {
      return {
        plantFloorPlan:{
          Name:"",
        },
        state:'A001',
        isChecked:false,
        fileurl:[],
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        pickerOptions2: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        CompanyData:[],
        atmosphereData:[],
        surfaceWaterData:[],
        groundwaterData:[],
        soundData:[],
        enterpriseData:[],
        companyAdress:'',
        oldData:'',
        newData:'',
        oldAddress:'',
        newAddress:'',
        close:false,
        items: [],
        item:'',
        id: "",
        readonly:true,
        show3: true,
        obj:{
          name:[],
          address:[]
        },
        EnterpriseName:{},
        EnterpriseAddress:{}
      }
    },
    created(){
      Bus.$on('getTarget', ccc => {
        this.ccc()
      });
      this.getNews(this.id);
      this.plantFloorPlanNews(this.id);
    },
    beforeUpdate(){
      this.id = sessionStorage.getItem("ID");
      this.companyAdress = this.id + this.$route.path;
    },
    watch: {
      id: function(val){
        this.getNews(val);
        this.plantFloorPlanNews(this.id);
        this.companyAdress = this.id + this.$route.path;
      }
    },
    methods: {
      listenstatus(val){
        this.isChecked=val;
      },
      drawing(){
        this.plantFloorPlanNews(this.id);
        this.isChecked=false;
      },
      beforeUploadFile(file){
          this.$refs.upload.submit();
      },
      plantFloorPlanSubmit: function (val) {
          this.plantFloorPlan["COCode"] = this.id;
          this.plantFloorPlan["TableCode"] = "C005";
          this.plantFloorPlan["RecordCode"] = "2005";
          this.plantFloorPlan["Name"]=this.selectValue;
          var formData = JSON.stringify(this.plantFloorPlan);
          this.$http.post('/api/pu', formData, {emulateJSON: true}).then((res) => {
            if(res.body.message === "successful") {
              if(val&&this.isChecked==true){
                this.$refs.upload.filePost();
              }
              if(val&&this.isChecked==false){
                this.plantFloorPlanNews(this.id);
              }
            }
            if(res.body.success===false){
              console.log(3);
              this.$message({showClose: true,message:res.body.message,type: 'error'});
            }
          })
      },
      plantFloorPlanNews:function(id){
          console.log('id',id)
        //this.fileurl=[this.$route.path,id,this.state];
        this.$http.get('/api/psf?TableCode=C005&COCode='+id).then(function(res){
          if(res.body.success===true){
            var data = res.body.data;
            var obj = {};
            var arr = [];
            console.log('zhizhi',res.body.data);
            if(res.body.data.length==0){
              this.items=[];
              return;
            }
            for(var k in data){
              obj[data[k].Name] = data[k];
            }
            arr.push(obj);
            this.items = arr;
            console.log('items',this.items);
          }
        },function(err){})
      },
      licenseUpdata(){
        this.close = true;
      },
      Preservation(){
          //console.log('aaaaaaaaaa',this.item.History.name.length)
        if(this.item.History !== null){
            if(this.item.History.name.length > 0){
              this.item.History.name.forEach( (item) => {
                this.EnterpriseName.old = item.old;
                this.EnterpriseName.new = item.new;
                this.EnterpriseName.time = item.time;
                this.obj.name.push(this.EnterpriseName);
                this.EnterpriseName = {};
              });
            }
          }
        if (this.oldData !== '' && this.newData !== ''){
          this.EnterpriseName.old = this.oldData;
          this.EnterpriseName.new = this.newData;
          this.EnterpriseName.time = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
          this.obj.name.push(this.EnterpriseName);
          //this.item.History = JSON.stringify(this.obj)
          console.log('发送给后台的数据',this.item.History);
        }
        if(this.item.History !== null){
          if(this.item.History.address.length > 0){
            this.item.History.address.forEach( (item) => {
              this.EnterpriseAddress.old = item.old;
              this.EnterpriseAddress.new = item.new;
              this.EnterpriseAddress.time = item.time;
              this.obj.address.push(this.EnterpriseAddress);
              this.EnterpriseAddress = {};
            });
          }
        }
        if (this.oldAddress !== '' && this.newAddress !== ''){
          this.EnterpriseAddress.old = this.oldAddress;
          this.EnterpriseAddress.new = this.newAddress;
          this.EnterpriseAddress.time = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
          this.obj.address.push(this.EnterpriseAddress);
          this.item.History = JSON.stringify(this.obj);
          console.log('发送给后台的数据',this.item.History);
        }
        this.item.History = JSON.stringify(this.obj);
      },
      ccc(){
        var id = this.id;
        this.getNews(id);
      },
      basicUpdata(){
        this.readonly = false;
        this.$message({
          showClose: true,
          message: '提示: 可编辑状态'
        });
      },
      basicSubmit:function(event){
        this.Preservation();
        this.datechange(this.item.ConstructionDate,'ConstructionDate');
        this.datechange(this.item.RunDate,'RunDate');
        this.item.TableCode ='A001';
        this.item.COCode = this.id;
        this.item.RecordCode = this.item.RecordCode;
        let formData = JSON.stringify(this.item);
        console.log('提交上去得值:',formData)
        this.$http.post('/api/pu',formData,{emulateJSON:true}).then(function(res){
          if(res.body.message==="successful"){
            this.$message({showClose: true,message:'修改成功'.message,type: 'success'});
            this.readonly = true;
            this.cancel();
            this.getNews(this.id);
            this.obj = {
              name : [],
              address:[]
            }
            this.oldData = '';
            this.newData = '';
            this.oldAddress = '';
            this.newAddress = '';
          }
          if(res.body.success ===false){
            this.$message({showClose: true,message:res.body.message,type: 'error'});
          }
        },function(err){
          console.log(err)
        })
      },
      getNews: function (id) {
        //局部发送ajax
        console.log('dada',id)
        this.$http.get('/api/ps?TableCode=A001&COCode='+id).then(function (res) {
          if (res.body.success===true){
            this.item = res.body.data[0];
            console.log('请求回来得',this.item);
            this.getSelectDate('O028');
            this.getSelectDate('O008');
            this.getSelectDate('O029');
            this.getSelectDate('O023');
            this.getSelectDate('O026');
            this.getSelectDate('O027');
          }
        }, function (err) {
          console.log(err)
        })

      },
      cancel:function(){
        var btn = document.getElementsByClassName("buttonClose");
        for (var i=0;i<btn.length;i++){
          btn[i].click();
        }
        this.oldData = '';
        this.newData = '';
        this.oldAddress = '';
        this.newAddress = '';
      },
      getSelectDate(code){
        this.$http.get('/api/ps?TableCode='+code).then(function(res){
          console.log('code',code)
          if (res.body.success===true){
            switch (code){
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
              case 'O027':
                this.CompanyData = res.body.data;
                break;
            }

          }
        })
      },
      //日期
      datechange(val,n){
        if(val){
          var str1 = val.toLocaleString().slice(0,10).toString().replace(/\//g,"-");
          var str2 = str1.split(" ",1)[0].split("-");
          if(str2[1].length<2){
            str2[1] = "0"+str2[1];
          }
          if(str2[2].length<2){
            str2[2] = "0"+str2[2];
          }
          this.item[n] = str2.join("-");
        }
      }
    }
  }
</script>
<style scoped>
  .basicInformation .blod {
    font-size: 14px;
  }

  #edit{
    color: #fff;
    background: #73a82b;
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
