<template>
  <!--治理设施情况-->
  <div id="enterprise" class="col-md-12">
    <el-tabs id="Tab1758" v-model="activeName2" type="card" >
      <el-tab-pane label="治理设施情况污水" name="first">
        <div class="buttons mar">
          <a class="btn btn-primary btn-middle" data-toggle="modal" data-target="#myModal" @click="SewageAdd"> 新建 </a>
          <a class="btn btn-danger" @click="SewageDelAll(select)">批量删除</a>

        </div>
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" v-if="isSewageAdd">治理设施情况废水(新增页面)</h4>
                <h4 class="modal-title" v-if="isSewageUpdata">治理设施情况废水(修改页面)</h4>
              </div>
              <div class="modal-body ml0">
                <form class="form-inline clearfix singleRow" @submit.prevent="submit">
                  <div class="form-group">
                    <label><span class="pk">*</span>污染治理设施名称：</label>
                    <input type="text" required="required" class="form-control" v-model="user.EquipmentName"/>
                  </div>
                  <div class="form-group">
                    <label>处理方法：</label>
                    <input type="text" class="form-control" v-model="user.Method" />
                  </div>
                  <div class="form-group">
                    <label>投入使用时间：</label>
                    <el-date-picker
                      v-model="user.Time"
                      type="date"
                      placeholder="选择日期时间"
                      align="right">
                    </el-date-picker>

                  </div>
                  <div class="form-group">
                    <label>设计处理能力（吨/日）：</label>
                    <input type="text"  class="form-control" v-model="user.Ability" />
                  </div>
                  注释：<span class="pk">*</span>为必填项
                  <div class="form-group" style="width:100%">
                    <button id ="buttonClose" type="button" class="btn btn-default" data-dismiss="modal" style="float:right" @click="close">关闭</button>
                    <button type="submit"  class="btn btn-primary" style="float:right;margin-right:10px;">确定</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane">
          <div class="table-responsive mt15">
            <el-table :data="SewageList" border style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}" @select-all="selectAll" @select="selectAll" >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="EquipmentName" label="污染治理设施名称" sortable>
              </el-table-column>
              <el-table-column prop="Method" label="处理方法" sortable>
              </el-table-column>

              <el-table-column prop="Time" label="投入使用时间" sortable width="170">
              </el-table-column>
              <el-table-column prop="Ability" label="设计处理能力（吨/日）" sortable width="210">
              </el-table-column>
              <el-table-column label="操作" width="135">
                <template scope="scope">
                  <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal" @click="SewageUpdata(scope.$index, scope.row)">修改</button>
                  <button  class="btn btn-danger btn-sm" @click="SewageDel(scope.$index, scope.row)">删除</button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!--污水分页-->
          <page :number="10" :totalLength="items.length" :getDatas="items" v-on:listenToChildEvent="SeShowMsgFromChild" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="治理设施情况废气" name="second">
        <div class="buttons mar">
          <a class="btn btn-primary btn-middle" data-toggle="modal" data-target="#myModal01" @click="YExhaustAdd"> 新建 </a>
          <a class="btn btn-danger" @click="YExhaustDelAll(select)">批量删除</a>
        </div>

        <div class="modal fade" id="myModal01" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" v-if="isYExhaustAdd">治理设施情况废气(新增页面)</h4>
                <h4 class="modal-title" v-if="isYExhaustLook">治理设施情况废气(查看页面)</h4>
                <h4 class="modal-title" v-if="isYExhaustUpdata">治理设施情况废气(修改页面)</h4>
              </div>

              <div class="modal-body ml0 singleRow">

                <form class="form-inline clearfix" @submit.prevent="yzfSubmit">
                  <div class="form-group">
                    <label><span class="pk">*</span>污染治理设施名称：</label>
                    <input type="text" required="required" :disabled="isYExhaustLook" class="form-control" v-model="fs.EquipmentName"/>
                  </div>
                  <div class="form-group">
                    <label>类型：</label>
                    <input type="text" class="form-control" :disabled="isYExhaustLook" v-model="fs.Type"/>
                  </div>
                  <div class="form-group">
                    <label>处理方法：</label>
                    <input type="text" class="form-control" :disabled="isYExhaustLook"  v-model="fs.Method" />
                  </div>
                  <div class="form-group">
                    <label>投入使用时间：</label>
                    <!--<input type="text" class="form-control" :disabled="isYExhaustLook" v-model="fs.Time" />-->
                    <el-date-picker
                      :disabled="isYExhaustLook"
                      v-model="fs.Time"
                      type="date"
                      placeholder="选择日期时间"
                      align="right">
                    </el-date-picker>
                  </div>
                  <div class="form-group">
                    <label>设计处理能力（标立方米/小时）：</label>
                    <input type="text" class="form-control" :disabled="isYExhaustLook" v-model="fs.Ability"/>
                  </div>
                  <div class="form-group" style="width:100%" v-if="!isYExhaustLook">
                    <button id ="fsclose" type="button" class="btn btn-default" data-dismiss="modal" style="float:right" @click="fsclose">关闭</button>
                    <button type="submit" class="btn btn-primary" style="float:right;margin-right:10px;">确定</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane">
          <div class="table-responsive mt15">
            <el-table :data="YeList" border style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}" @select-all="selectAll" @select="selectAll" >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="EquipmentName" label="污染治理设施名称" sortable width="180">
              </el-table-column>
              <el-table-column prop="Type" label="类型" sortable width="160">
              </el-table-column>
              <el-table-column prop="Method" label="处理方法" sortable width="180">
              </el-table-column>
              <el-table-column prop="Time" label="投入使用时间" sortable width="170">
              </el-table-column>
              <el-table-column label="操作">
                <template scope="scope">
                  <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal01"
                          @click="YExhaustLook(scope.$index, scope.row)">查看
                  </button>
                  <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal01" @click="YExhaustUpdata(scope.$index, scope.row)">修改</button>
                  <button  class="btn btn-danger btn-sm" @click="YExhaustDel(scope.$index, scope.row)">删除</button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <page :number="10" :totalLength="yzfqitems.length" :getDatas="yzfqitems" v-on:listenToChildEvent="YEShowMsgFromChild" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="治理设施情况固废" name="fourth">
        <div class="buttons mar">
          <a class="btn btn-primary btn-middle" data-toggle="modal" data-target="#myModal03" @click="SwAdd"> 新建 </a>
          <a class="btn btn-danger" @click="SwDelAll(select)">批量删除</a>
        </div>

        <div class="modal fade" id="myModal03" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" v-if="isSwAdd">治理设施情况固废(新增页面)</h4>
                <h4 class="modal-title" v-if="isSwLook">治理设施情况固废(查看页面)</h4>
                <h4 class="modal-title" v-if="isSwUpdata">治理设施情况固废(修改页面)</h4>
              </div>

              <div class="modal-body ml0 singleRow">
                <form class="form-inline clearfix" @submit.prevent="gfcxSubmit">
                  <div class="form-group">
                    <label ><span class="pk">*</span>污染治理设施名称：</label>
                    <input type="text" required="required" :disabled="isSwLook" class="form-control" v-model="gfcx.EquipmentName"/>
                  </div>
                  <div class="form-group">
                    <label >类型：</label>
                    <input type="text" :disabled="isSwLook" class="form-control" v-model="gfcx.Type"/>
                  </div>
                  <div class="form-group">
                    <label >处理方法：</label>
                    <input type="text" :disabled="isSwLook"  class="form-control" v-model="gfcx.Method" />
                  </div>
                  <div class="form-group">
                    <label>投入使用时间：</label>
                    <!--<input type="text" :disabled="isSwLook"  class="form-control"  v-model="gfcx.Time" />-->
                    <el-date-picker
                      :disabled="isSwLook"
                      v-model="gfcx.Time"
                      type="date"
                      placeholder="选择日期时间"
                      align="right">
                    </el-date-picker>
                  </div>
                  <div class="form-group">
                    <label >设计处理能力（吨/日）：</label>
                    <input type="text" :disabled="isSwLook"  class="form-control" v-model="gfcx.Ability"/>
                  </div>
                  <div class="form-group" style="width:100%" v-if="!isSwLook">
                    注释：<span class="pk">*</span>为必填项
                    <button id ="gfcxclose" type="button" class="btn btn-default" data-dismiss="modal" style="float:right" @click="gfcxclose">关闭</button>
                    <button type="submit" class="btn btn-primary" style="float:right;margin-right:10px;">确定</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane">
          <div class="table-responsive mt15">
            <el-table :data="SwList" border style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}" @select-all="selectAll" @select="selectAll" >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="EquipmentName" label="污染治理设施名称" sortable>
              </el-table-column>
              <el-table-column prop="Type" label="类型" sortable width="150">
              </el-table-column>
              <el-table-column prop="Method" label="处理方法" sortable>
              </el-table-column>
              <el-table-column prop="Time" label="投入使用时间" sortable width="180">
              </el-table-column>
              <el-table-column label="操作" width="200">
                <template scope="scope">
                  <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal03"
                          @click="SwLook(scope.$index, scope.row)">查看
                  </button>
                  <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal03" @click="SwUpdata(scope.$index, scope.row)">修改</button>
                  <button  class="btn btn-danger btn-sm" @click="SwDel(scope.$index, scope.row)">删除</button>
                </template>
              </el-table-column>

            </el-table>
            <!--固废分页-->

          </div>
          <page :number="10" :totalLength="gfcxitems.length" :getDatas="gfcxitems" v-on:listenToChildEvent="SwShowMsgFromChild" />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import Bus from '../vuex/bus.js'
  import page from '../common/page';
  export default {
    components:{
      page // 注册分页组件
    },
    data() {
      return {
        SeCurrentPages:1,
        YeCurrentPages:1,
        SwCurrentPages:1,
        SewageList:[],
        SwList:[],
        YeList:[],
        items:[],
        isSewageAdd:true,
        isSewageUpdata:true,
        isYExhaustAdd:true,
        isYExhaustLook:true,
        isYExhaustUpdata:true,
        isSwAdd:true,
        isSwLook:true,
        isSwUpdata:true,
        zscxitems:[],
        yzfqitems:[],
        gfcxitems:[],
        activeName2: 'first',
        user: {
          EquipmentName:"",
          Method:"",
          Time:"",
          Ability:""
        },
        fs: {
          EquipmentName:"",
          Type:"",
          Method:"",
          Time:"",
          Ability:""
        },
        gfcx:{
          EquipmentName:"",
          Type:"",
          Method:"",
          Time:"",
          Ability:""
        },
        id:""
      }
    },
    beforeCreate(){},
    beforeMount(){},
    mounted(){},
    created(){
      Bus.$on('getTarget', ccc => {
        this.ccc()
      });
      this.wscx(this.id);
      this.yzfscx(this.id);
      this.getgfcx(this.id);
    },
    beforeUpdate(){
      this.id=sessionStorage.getItem("ID");
    },
    updated(){  },
    activated(){  },
    deactivated(){   },
    beforeDestroy(){},
    destroyed(){  },
    watch:{
      id(val){
        this.wscx(val);
        this.yzfscx(val);
        this.getgfcx(val);
      },
      //分页有用 监听变化
      'items':function(arr){
        this.items = arr;
      },
      'SeCurrentPages':function(val){
        this.select = [];
      },
      'YeCurrentPages':function(val){
        this.select = [];
      },
      'SwCurrentPages':function(val){
        this.select = [];
      }
    },
    methods: {
      ccc(){
        this.id=sessionStorage.getItem("ID");
        this.wscx(this.id);
      },
      //治理设施情况污水
      SewageAdd:function(){
        this.isSewageAdd = true;
        this.isSewageUpdata = false;
        this.user =  {
          EquipmentName:"",
          Method:"",
          Time:"",
          Ability:""
        }
      },
      SewageUpdata:function(index, row){
        this.isSewageAdd = false;
        this.isSewageUpdata = true;
        this.user = row;
      },
      submit: function(event) {
        this.user["COCode"] = this.id;
        this.user["TableCode"] = 'D001';
        this.datechange(this.user.Time,'Time');
        var formData = JSON.stringify(this.user);
        var url = "";
        var a = '/api/pi';
        var b = '/api/pu';
        if(this.isSewageAdd){
          url = a;
        }
        if(this.isSewageUpdata){
          url = b;
        }
        this.$http.post(url,formData,{emulateJSON:true}).then((res) => {
          if(res.body.message==="successful"){
            this.close();
            this.wscx(this.id);
          }
          if(res.body.success ===false){
            this.$message({showClose: true,message:res.body.message,type: 'error'});
          }
        }, (req) => {
          console.log("提交失败")
        });

      },
      selectAll(selection){
        this.select = selection;
      },
      SewageDelAll:function(arr){

        console.log(arr);

        var delId = [];
        for(var key in arr){
          delId.push(arr[key].RecordCode);
        }
        if(delId.length === 0){
          this.$message({showClose: true,message:"没有选中数据或者页签发生改变",type: 'error'});
          return false;
        }
        this.$http.post('/api/pd', {TableCode: 'D001',COCode:this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
          if (res.body.message === "successful") {
            this.wscx(this.id);
          }}, (req) => {
          console.log("删除失败")
        });
      },
      //查看
      SewageLook:function (index, row) {
        this.isSewageAdd = false;
        this.isSewageUpdata = false;
        this.user = row;
      },
      //删除
      SewageDel: function (index, row) {
        var delId = row.RecordCode;
        this.$http.post('/api/pd', {TableCode: 'D001',COCode: this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
          if (res.body.message === "successful") {
            this.wscx(this.id);
          }}, (req) => {
          console.log("删除失败")
        });
      },
      close:function(){
        document.getElementById("buttonClose").click();
      },
      wscx:function(id){
        this.$http.get('/api/ps?TableCode=D001&COCode='+id).then(function(res){
          this.items = res.body.data;
          this.list = this.items;
        },function(err){
          console.log(err)
        })
      },
      //分页
      SeShowMsgFromChild(msg,pages){
        this.SewageList = msg;
        this.SeCurrentPages = pages;
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
          this.user[n] = str2.join("-");
        }
      },

      //治理设施情况废气
      YExhaustAdd:function(){
        this.isYExhaustAdd = true;
        this.isYExhaustLook = false;
        this.isYExhaustUpdata = false;
        this.fs = {
          EquipmentName:"",
          Type:"",
          Method:"",
          Time:"",
          Ability:""
        }
      },
      YExhaustLook:function (index, row) {
        this.isYExhaustAdd = false;
        this.isYExhaustLook = true;
        this.isYExhaustUpdata = false;
        this.fs = row;
      },
      //删除
      YExhaustDel: function (index, row) {
        var delId = row.RecordCode;
        this.$http.post('/api/pd', {TableCode: 'D002',COCode: this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
          if (res.body.message === "successful") {
            this.yzfscx(this.id);
          }}, (req) => {
          console.log("删除失败")
        });
      },
      YExhaustDelAll:function(arr){
        var delId = [];
        for(var key in arr){
          delId.push(arr[key].RecordCode);
        }

        if(delId.length === 0){
          this.$message({showClose: true,message:"没有选中数据或者页签发生改变",type: 'error'});
          return false;
        }
        this.$http.post('/api/pd', {TableCode: 'D002',COCode:this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
          if (res.body.message === "successful") {
            this.yzfscx(this.id);
          }}, (req) => {
          console.log("删除失败")
        });
      },
      YExhaustUpdata:function(index,row){
        this.isYExhaustAdd = false;
        this.isYExhaustLook = false;
        this.isYExhaustUpdata = true;
        this.fs  = row;
      },
      yzfSubmit: function(event) {
        this.fs["COCode"]=this.id;
        this.fs["TableCode"]='D002';
        this.YE_datechange(this.fs.Time,'Time');

        this.fs["Time"] = this.fs.Time.toLocaleString();
        var formData = JSON.stringify(this.fs);
        var url = "";
        var a = '/api/pi';
        var b = '/api/pu';
        if(this.isYExhaustAdd){
          url = a;
        }
        if(this.isYExhaustUpdata){
          url = b;
        }
        this.$http.post(url,formData,{emulateJSON:true}).then((res) => {
          if(res.body.message==="successful"){
            this.fsclose();
            this.yzfscx(this.id);
          }
          if(res.body.success ===false){
            this.$message({showClose: true,message:res.body.message,type: 'error'});
          }
        }, (req) => {
          console.log("提交失败")
        });
      },
      fsclose:function(){
        document.getElementById("fsclose").click();
      },
      yzfscx:function(id){
        this.$http.get('/api/ps?TableCode=D002&COCode='+id)
          .then(function(res){
            this.yzfqitems = res.body.data;
          },function(err){
            console.log(err)
          })
      },
      //日期
      YE_datechange(val,n){
        if(val){
          var str1 = val.toLocaleString().slice(0,10).toString().replace(/\//g,"-");
          var str2 = str1.split(" ",1)[0].split("-");
          if(str2[1].length<2){
            str2[1] = "0"+str2[1];
          }
          if(str2[2].length<2){
            str2[2] = "0"+str2[2];
          }
          this.fs[n] = str2.join("-");
        }
      },

      YEShowMsgFromChild(msg,pages){
        this.YeList = msg;
        this.YeCurrentPages = pages;
      },
      //治理设施情况固废
      SwAdd:function(){
        this.isSwAdd = true;
        this.isSwLook = false;
        this.isSwUpdata = false;
        this.gfcx = {
          EquipmentName:"",
          Type:"",
          Method:"",
          Time:"",
          Ability:""
        }
      },
      SwUpdata:function(index,row){
        this.isSwAdd = false;
        this.isSwLook = false;
        this.isSwUpdata = true;
        this.gfcx  = row;
      },
      gfcxSubmit: function(event) {
        this.gfcx["COCode"]=this.id;
        this.gfcx["TableCode"]='D003';
        this.Sw_datechange(this.gfcx.Time,'Time');
        var formData = JSON.stringify(this.gfcx);
        var url = "";
        var a = '/api/pi';
        var b = '/api/pu';
        if(this.isSwAdd){
          url  = a;
        }
        if(this.isSwUpdata){
          url = b;
        }
        this.$http.post(url,formData,{emulateJSON:true}).then((res) => {
          if(res.body.message==="successful"){
            this.gfcxclose();
            this.getgfcx(this.id);
          }
          if(res.body.success ===false){
            this.$message({showClose: true,message:res.body.message,type: 'error'});
          }
        }, (req) => {
          console.log("提交失败")
        });
      },
      SwLook:function (index, row) {
        this.isSwAdd = false;
        this.isSwLook = true;
        this.isSwUpdata = false;
        this.gfcx = row;
      },
      //删除
      SwDel: function (index, row) {
        var delId = row.RecordCode;
        this.$http.post('/api/pd', {TableCode: 'D003',COCode: this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
          if (res.body.message === "successful") {
            this.getgfcx(this.id);
          }}, (req) => {
          console.log("删除失败")
        });
      },
      SwDelAll:function(arr){
        var delId = [];
        for(var key in arr){
          delId.push(arr[key].RecordCode);
        }
        if(delId.length === 0){
          this.$message({showClose: true,message:"没有选中数据或者页签发生改变",type: 'error'});
          return false;
        }
        this.$http.post('/api/pd', {TableCode: 'D003',COCode:this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
          if (res.body.message === "successful") {
            this.getgfcx(this.id);
          }}, (req) => {
          console.log("删除失败")
        });
      },
      gfcxclose:function(){
        document.getElementById("gfcxclose").click();
      },
      getgfcx:function(id){
        this.$http.get('/api/ps?TableCode=D003&COCode='+id)
          .then(function(res){
            this.gfcxitems = res.body.data;
          },function(err){
            console.log(err)
          })
      },
      //日期
      Sw_datechange(val,n){
        if(val){
          var str1 = val.toLocaleString().slice(0,10).toString().replace(/\//g,"-");
          var str2 = str1.split(" ",1)[0].split("-");
          if(str2[1].length<2){
            str2[1] = "0"+str2[1];
          }
          if(str2[2].length<2){
            str2[2] = "0"+str2[2];
          }
          this.gfcx[n] = str2.join("-");
        }
      },

      SwShowMsgFromChild(msg,pages){
        this.SwList = msg;
        this.SwCurrentPages = pages;
      },
    }
  }
</script>
<style scoped>
  ul,ol{
    list-style: none
  }
  .mr458{
    margin-left: 454px;
  }
  .mb10{
    margin-bottom: 10px;
  }

  .singleRow .form-group label{
    width: 165px;
  }
  .modal-body .form-group input{
    width:300px;
  }
  .ml0 .form-group{
    margin-left:0px;
  }

</style>
