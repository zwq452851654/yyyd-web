<template>
  <!--设备维修记录-->
  <div id="enterprise" class="col-md-12">
    <div class="buttons mar">
      <a class="btn btn-primary col-md-offset-11" data-toggle="modal" data-target="#myModal" @click="psAdd">新建</a>
      <a class="btn btn-danger" @click="OverviewDelAll(select)">批量删除</a>
    </div>

    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" v-if="isAdd">设备维修记录(新增页面)</h4>
            <h4 class="modal-title" v-if="isUpdata">设备维修记录(修改页面)</h4>
          </div>
          <div class="modal-body ml0">
            <form class="form-inline clearfix" @submit.prevent="addsubmit">
              <div class="form-group">
                <label><span class="pk">*</span>设备名称：</label>
                <input type="text" required="required" class="form-control" v-model="user.EquipmentName" />
                注释：<span class="pk">*</span>为必填项
              </div>
              <div class="form-group">
                <label>监测点位名称：</label>
                <input type="text" class="form-control" v-model="user.MonitorName"/>
              </div>
              <div class="form-group">
                <label><span class="pk">*</span>故障时间：</label>

                  <el-date-picker
                    v-model="user.FaultTime"
                    type="date"
                    placeholder="选择日期时间"
                    :picker-options="pickerOptions1"
                    align="right">
                  </el-date-picker>
                注释：<span class="pk">*</span>为必填项
              </div>
              <div class="form-group">
                <label>报修时间：</label>
                <el-date-picker
                  v-model="user.RepairTime"
                  type="date"
                  placeholder="选择日期时间"
                  :picker-options="pickerOptions2"
                  align="right">
                </el-date-picker>
              </div>
              <div class="form-group">
                <tabel>附&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;件：</tabel>
                <!-- 新增以及修改 -->
                <div v-if="isAdd ||isUpdata">
                  <uploadFile ref="upload" @end="drawing" @listenState="listenstatus" :childUrl="fileurl" :codenum="codeNumber"></uploadFile>
                  <ul v-if ="isUpdata" class="filesUrl">
                    <li v-for="item in files" :id="item.RecordCode" ><span class="toadded">{{item.FileName}}</span><span class="deltate" @click="deltaed(item.Path,item.FileName,item.RecordCode)">删除</span></li>
                  </ul>
                </div>
              </div>

              <div class="form-group" style="width:100%" >
                <button id ="buttonClose" type="button" class="btn btn-default" data-dismiss="modal" style="float:right" @click="close">关闭</button>
                <button type="submit"  class="btn btn-primary" style="float:right;margin-right:10px;">确定</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <el-table @selection-change="handleSelectionChange" :data="list" border style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}" @select-all="selectAll" @select="selectAll" >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="EquipmentName" label="设备名称" sortable width="160">
      </el-table-column>
      <el-table-column prop="MonitorName" label="监测点位名称" sortable width="160">
      </el-table-column>
      <el-table-column prop="FaultTime" label="故障时间" sortable width="130">
      </el-table-column>
      <el-table-column prop="RepairTime" label="报修时间" sortable width="130">
      </el-table-column>
      <el-table-column label="附件">
        <!--渲染以及下载附件-->
        <template scope="props">
          <el-tag  v-for="tag in props.row.FileInfo" type="primary" class="FileInfo" >
            <a v-bind:href="'/api/fu?path='+tag.Path+'/'+tag.TrueName">{{tag.FileName}}</a>
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="135">
        <template scope="scope">
          <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal" @click="psUpdata(scope.$index, scope.row)">修改</button>
          <button  class="btn btn-danger btn-sm" @click="OverviewDel(scope.$index, scope.row)">删除</button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <page :number="10" :totalLength="items.length" :getDatas="items" v-on:listenToChildEvent="showMsgFromChild" />
  </div>
</template>

<script>
  import Bus from '../vuex/bus.js';
  import uploadFile from '../common/uploadFile';
  import page from '../common/page';
  export default {
    components:{
      uploadFile,
      page // 注册分页组件
    },
    data () {
      return {
        currentPages:1,
        isChecked:false,//子组件点击上传按钮之后的状态
        indexNum:"", //点击修改的索引值
        fileItems:[], //附件上传列表
        downadress:'', //下载地址
        codeNumber:"", //code
        datalist:[],
        fileurl:[],
        files:"", //修改循环列表
        list:[], // 获取到数据之后 再执行一句 this.list = this.items  数据绑定 传list  传给分页 传items
        select:[], // 获取所有选中的数据
        state:'D005',
        code:"",
        multipleSelection: [],
        isAdd:true,
        isUpdata:true,
        items :[],
        id:"",
        checkedNames:[],//checkbox 数组
        checkAll: false,//全选
        user: {
          EquipmentName:"",
          MonitorName:"",
          FaultTime:"",
          RepairTime:""
        },
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
        }
      }

    },
    beforeCreate(){},
    beforeMount(){},
    mounted(){},
    created(){
      Bus.$on('getTarget', ccc => {
        this.ccc()
      });
      this.getOverview(this.id);
    },
    beforeUpdate(){
      this.id=sessionStorage.getItem("ID");
    },
    updated(){},
    activated(){},
    deactivated(){},
    beforeDestroy(){},
    destroyed(){},
    watch:{
      id(val){
        this.getOverview(val);
      },
      //分页有用 监听变化
      'items':function(arr){
        this.items = arr;
      },
      'codenum':function(val){
        this.codenum=val;
        this.addsubmit(val);
      },
      'currentPages':function(val){
        this.select = [];
      }
    },
    methods:{
      btnClick(){
        this.$refs.upload.childdd()
      },
      handleSelectionChange(val) {
        val.forEach(item => {
          this.checkedNames.push(item.RecordCode);
        })
        this.multipleSelection = this.checkedNames.toString();
      },
      ccc(){
        this.id=sessionStorage.getItem("ID");
        this.getOverview(this.id);
      },
      psAdd:function(){
        this.isAdd =true;
        this.isUpdata= false;
        this.user = {
          EquipmentName:"",
          MonitorName:"",
          FaultTime:"",
          RepairTime:""
        }
      },
      psUpdata:function(index, row){
        this.isAdd =false;
        this.isUpdata=true;
        this.user = row;
        this.files=row.FileInfo;
        this.indexNum=row.RecordCode;
        this.$refs.upload.filePost();
      },
      getOverview:function(id){
        this.fileurl=[this.$route.path,id,this.state,this.RecordCode];
        //局部发送ajax
        this.$http.get('/api/psf?TableCode=D005&COCode='+id)
          .then(function(res){
            if (res.body.success===true){
              this.items = res.body.data;
              this.list = this.items;
            }
          },function(err){
            console.log(err)
          })
      },
      addsubmit:function(val){

        /*this.datechange(this.user.FaultTime,'FaultTime');
        this.datechange(this.user.RepairTime,'RepairTime');*/
        this.user["COCode"] =this.id;
        this.user["TableCode"] ='D005';
        this.datechange(this.user.FaultTime,'FaultTime');
        this.datechange(this.user.RepairTime,'RepairTime');
        var a = '/api/pi';
        var b = '/api/pu';
        var url = '';
        if(this.isAdd){
          url = a;
        }
        if(this.isUpdata){
          url = b;
          delete this.user.FileInfo;
        }
        var formData = JSON.stringify(this.user);
        this.$http.post(url,formData,{emulateJSON:true}).then(function(res){
          if(res.body.message==="successful"){
            if(this.isAdd){
              this.codeNumber=res.body.data[0].RecordCode;
            }
            if(this.isUpdata){
              this.codeNumber=this.indexNum;
            }
            if(val&&this.isChecked==true){
              this.$refs.upload.filePost();
            }
            if(val&&this.isChecked==false){
              this.close();
              this.getOverview(this.id);
            }
          }
          if(res.body.success ===false){
            this.$message({showClose: true,message:res.body.message,type: 'error'});
          }
        },(req) =>{
          console.log("提交失败")
        })
      },
      drawing(){
        this.close();
        this.getOverview(this.id);
        this.isChecked = false;
      },
      selectAll(selection){
        this.select = selection;
      },
      // 子组件点击按成状态改变
      listenstatus(val){
        this.isChecked=val;
      },
      OverviewDelAll:function(arr){
        console.log('aaaa',arr);
        var delId = [];
        var delIdAll = [];
          for(var key in arr){
            delId.push(arr[key].RecordCode);
            if(!(arr[key].FileInfo.length === 0)){
              delIdAll.push(arr[key].FileInfo[0].RecordCode);
            }else {
              continue;
            }
        }

        if(delId.length === 0){
          this.$message({showClose: true,message:"没有选中数据或者页签发生改变",type: 'error'});
          return false;
        }
          this.$http.post('/api/pd', {TableCode: 'D005',COCode:this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
            console.log('vvvvvv',delId);
            if (res.body.message === "successful") {
              console.log('走了')
              if(delIdAll.length > 0){
                this.del(delIdAll);
              }
              this.getOverview(this.id);
            }}, (req) => {
            this.$message({showClose: true,message:'删除失败',type: 'error'});
          });
      },
      //查看
      OverviewLook:function (index, row) {
        this.user = row;
        this.isAdd = false;
        this.isUpdata = false;
        this.files=row.FileInfo;
        this.Overview = row;
      },
      //删除
      OverviewDel: function (index, row) {
        var delId = row.RecordCode;
        this.$http.post('/api/pd', {TableCode: 'D005',COCode: this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
          if (res.body.message === "successful") {
            //独立的删除附件方法 如果有附件
            if(row.FileInfo.length>0){

              this.del(row.FileInfo[0].RecordCode);
            }
            this.getOverview(this.id);
          }}, (req) => {
          this.$message({showClose: true,message:'删除失败',type: 'error'});
        });
      },
      //修改页面删除功能
      deltaed:function(adressed,named,recorded){
        document.getElementById(recorded).style.display="none";
        this.$http.post("/api/pd",{TableCode:'M001',COCode:this.id,RecordCode:recorded}).then(function(res){
          if(res.body.success===true){
            this.$message({showClose: true,message:'文件删除成功',type: 'success'});
          }
        },function(err){

        })
      },
      //删除功能
      del:function(recorded){
        this.$http.post("/api/pd",{TableCode:'M001',COCode:this.id,RecordCode:recorded}).then(function(res){
          if(res.body.success === true){
            this.$message({showClose: true,message:"数据删除成功",type: 'success'});
          }
          else{
            this.$message({showClose: true,message:"数据删除失败",type: 'error'});
          }
        },function(err){console.log(err);})
      },
      //点击close 关闭时
      close: function () {
        document.getElementById("buttonClose").click();
      },
      //分页

      showMsgFromChild(msg,pages){
        this.list = msg;
        this.currentPages = pages;
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
    }
  }
</script>
<style scoped>
  .buttons{
    text-align: right;
  }
  .buttons a{
    margin:0px;
  }

  .modal-body .form-group {
    width: 100%;
    margin-bottom: 10px;
  }
  .modal-body .form-group label{
    width:150px;
  }
  .modal-body .form-group input{
    width:300px;
  }
  .ml0 .form-group{
    margin-left:0px;
  }

  .deltate {
    border:1px solid #000;
    padding:3px;
    border-radius:4px;
    margin-left:8px;
    background:#74A82C;
    color: #fff;
    float: right;
    cursor:pointer;
  }
  .form-group .el-input{
    width: 300px;
  }
</style>
