<!-- administrative的界面 -->
<!-- 行政处罚 -->
<template>
  <div id="enterprise" class="col-md-12" >

    <div class="buttons mar btn-middle">
      <a class="btn btn-primary" data-toggle="modal" data-target="#myModal"
         @click="administrativePenaltyDateClear"> 新建 </a>
      <a class=" btn btn-danger" @click="administrativeDelAll(select)">批量删除</a>
    </div>
    <!--带排序的表格-->
    <el-table :data="list" border :default-sort="{prop:'Name', order: 'descending'}"  align="center" @selection-change="handleSelectionChange" @select-all="selectAll" @select="selectAll">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column prop="Name" label="案件名称" sortable>
      </el-table-column>
      <el-table-column prop="BookCode" label="决定文书号" sortable>
      </el-table-column>
      <el-table-column prop="Reason" label="案由" sortable>
      </el-table-column>
      <el-table-column label="附件">
        <!--渲染以及下载附件-->
            <template scope="props">
                <el-tag  v-for="tag in props.row.FileInfo" type="primary" class="FileInfo">
                  <a v-bind:href="'/api/fu?path='+tag.Path+'/'+tag.TrueName">{{tag.FileName}}</a>
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template scope="scope">
            <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal"
                    @click="administrativePenaltyLook(scope.$index, scope.row)">查看
            </button>
            <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal"
                    @click="administrativePenaltyupdata(scope.$index, scope.row)">修改
            </button>
            <button class="btn btn-danger btn-sm" @click="administrativePenaltyDel(scope.$index, scope.row)">删除</button>
          </template>
        </el-table-column>
    </el-table>
    <!--新建 查看 修改-->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" v-if="isadd">行政处罚(新增页面)</h4>
            <h4 class="modal-title" v-if="isLook">行政处罚(查看页面)</h4>
            <h4 class="modal-title" v-if="isupdata">行政处罚(修改页面)</h4>
          </div>
          <div class="modal-body ml0">
            <form class="form-inline clearfix TheTwoColumn" @submit.prevent="administrativePenaltySubmit" >
              <div class="form-group">
                <label><span class="pk">*</span>案件名称：</label>
                <input type="text" class="form-control mar_r15" required="required" :disabled="isLook" v-model="administrativePenalty.Name">
                <label><span class="pk">*</span>立案时间：</label>
                <el-date-picker v-model="administrativePenalty.FilingStartTime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions1" required="required"  :disabled="isLook">
                </el-date-picker>
               </div>

              <div class="form-group">
                <label><span class="pk">*</span>决定文书号：</label>
                <input type="text" class="form-control mar_r15" :disabled="isLook"
                       v-model="administrativePenalty.BookCode" required="required">
                <label><span class="pk">*</span>案件类型：</label>
                <select class="form-control" required="required" :disabled="isLook" v-model="administrativePenalty.Type">
                  <option v-for="item in admincommand">{{item.Name}}</option>
                </select>
              </div>
              <div class="form-group">
                <label>处罚金额：</label>
                <input type="text" class="form-control mar_r15" :disabled="isLook" v-model="administrativePenalty.Sum">
                <!-- <label>行政命令类型：</label>
                <select class="form-control mar_r15" :disabled="isLook" v-model="administrativePenalty.CommandType">
                  <option>责令停止建设</option>
                  <option>责令停止试生产</option>
                  <option>责令停止生产</option>
                  <option>责令限期建设配套设施</option>
                  <option>责令重新安装使用</option>
                  <option>责令限期拆除</option>
                  <option>责令停止违法行为</option>
                  <option>责令限期治理</option>
                  <option>其他</option>
                </select> -->
                <label>立案号：</label>
                <input type="text" class="form-control mar_r15" :disabled="isLook" v-model="administrativePenalty.Code">
              </div>
              <div class="form-group">
                <label>案由：</label>
                <input type="text" class="form-control mar_r15" :disabled="isLook"
                       v-model="administrativePenalty.Reason">
                <!-- <label>行政处罚类型：</label>
                <select class="form-control mar_r15" :disabled="isLook" v-model="administrativePenalty.PunishType">
                  <option>警告</option>
                  <option>罚款</option>
                  <option>责令停产整顿</option>
                  <option>责令停产</option>
                  <option>停业</option>
                  <option>关闭</option>
                  <option>吊销许可证</option>
                  <option>行政拘留</option>
                  <option>其它</option>
                </select> -->
                <label>处罚开始时间：</label>
                 <el-date-picker v-model="administrativePenalty.PunishStartTime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions2"  :disabled="isLook">

                </el-date-picker>
              </div>
              <div class="form-group">
                <label>处罚结束时间：</label>
                 <el-date-picker v-model="administrativePenalty.PunishEndTime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions3"  :disabled="isLook" class="mar_r15">
                </el-date-picker>
                <label>结案日期：</label>
                 <el-date-picker v-model="administrativePenalty.FilingEndTime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions4"  :disabled="isLook">
                </el-date-picker>
              </div>
              <div class="form-group">
                <label>经办人：</label>
                <input type="text" class="form-control mar_r15" :disabled="isLook"
                       v-model="administrativePenalty.Person">
                <label>执行情况：</label>
                <input type="text" class="form-control" :disabled="isLook" v-model="administrativePenalty.Execution">
              </div>
              <div class="form-group danger">
                  <label>行政命令类型：</label>
                  <template>
                    <el-select v-model="checkList" multiple placeholder="请选择"  :disabled="isLook">
                      <el-option
                        :disabled="isLook"
                        v-for="item in checkarr"
                        :key="item.Name"
                        :label="item.Name"
                        :value="item.Name">
                      </el-option>
                    </el-select>
                  </template> 
                  <label>行政处罚类型：</label>
                  <template>
                    <el-select v-model="value5" multiple placeholder="请选择"  :disabled="isLook">
                      <el-option
                        :disabled="isLook"
                        v-for="item in administrativePenaltiesList"
                        :key="item.Name"
                        :label="item.Name"
                        :value="item.Name">
                      </el-option>
                    </el-select>
                  </template> 

              </div>
              <div class="form-group">
                <label>决定书处罚内容：</label>
                <textarea class="form-control mar_r15" :disabled="isLook" v-model="administrativePenalty.Content"
                          cols="50" rows="2"></textarea>
              </div>
              注释:<span class="pk">*</span>为必填项
              <div class="form-group">
                <label>附&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;件：</label>
                <!-- 新增以及修改 -->
                <div v-show="isadd ||isupdata">
                  <uploadFile ref="upload" @end="drawing"   @listenState="listenstatus"  :childUrl="fileurl" :codenum="codeNumber" ></uploadFile>
                   <ul v-if ="isupdata" class="filesUrl">
                    <li v-for="item in files" :id="item.RecordCode" ><span class="toadded">{{item.FileName}}</span><span class="deltate"  @click="deltaed(item.Path,item.FileName,item.RecordCode)">删除</span></li>
                  </ul>
                  <div class="modal-footer">
                      <button type="submit" class="btn btn-primary" >确定</button>
                      <button type="button" class="btn btn-default" data-dismiss="modal" id="buttonClose" @click="close">关闭
                      </button>
                  </div>
                </div>
                <!--查看-->
                 <div v-if="isLook">
                   <ul><li v-for="item in files">{{item.FileName}}</li></ul>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div> 
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
        checkList:[], //多选框数组
        checkarr:[], //多选循环数组
        administrativePenaltiesList:[], //行政处罚循环数组
        admincommand:[], //下拉循环数据
        list:[], // 获取到数据之后 再执行一句 this.list = this.items  数据绑定 传list  传给分页 传items
        select:"", // 获取所有选中的数据
        isadd: true,//是否是新增
        isLook: true,//是否是查看
        isupdata: true,//是否是更新
        id: "",
        items: [],
        value5: [],
        ///////////////////////文件上传需要////////////////////////////////////////
        isChecked:false,//子组件点击上传按钮之后的状态
        indexNum:"", //点击修改的索引值
        fileItems:[], //附件上传列表
        downadress:'', //下载地址
        datalist:[],
        fileurl:[],
        codeNumber:"", //code
        state:'J001',  //企业编号
        coded:"",  //文件编号
        files:"", //修改循环列表
        ///////////////////////////////////////////////////////////////
        multipleSelection: [],
        administrativePenalty: {
          Name: "",
          BookCode: "",
          Reason: "",
          FilingStartTime: "",
          CommandType:"",
          Code: "",
          PunishType: "",
          PunishStartTime: "",
          PunishEndTime: "",
          FilingEndTime: "",
          Person: "",
          Execution: "",
          Content: "",
          Sum: "",
          Type: ""
        },
        //时间控件
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
        pickerOptions3: {
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
        pickerOptions4: {
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
      }
    },
    beforeCreate(){},
    beforeMount(){},
    mounted(){},
    created(){
      Bus.$on('getTarget', ccc => {
        this.ccc()
      });
      this.administrativePenaltyNew(this.id);
      this.administrativeOrder();
      this.administrativeGetselect();
      this.administrativePenalties();
    },
    beforeUpdate(){
      this.id = sessionStorage.getItem("ID");
    },
    updated(){},
    activated(){},
    deactivated(){},
    beforeDestroy(){},
    destroyed(){},
    watch: {
      /**********
        * [1.企业id监听变化
        * @param  {[Number]} val [企业id的值]
        * @return 
      ************/
      id(val){
        this.administrativePenaltyNew(val);
      },
      //分页有用 监听变化
      'items':function(arr){
          this.items = arr;
       },
      'codenum':function(val){
        this.codenum=val;
        this.administrativePenaltySubmit(val);
        
       },
      'currentPages':function(val){
          this.select = [];
      }     

    },
    methods: {
      /**********
        * [控件自带方法]
        * @param 选择的数组
      ************/
      handleSelectionChange(val) {
        val.forEach(item => {
          this.checkedNames.push(item.RecordCode);
        })
        this.multipleSelection = this.checkedNames.toString();
      },
        /**********
        * [控件自带方法]
        * @param 排序表格
      ************/
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      ccc(){
        var id = this.id;
        this.administrativePenaltyNew(id);
      },
      /**********
        * [1.点击新建时清空所有数据
        * @param 
        * @return 
      ************/
      administrativePenaltyDateClear: function () {
        this.isadd = true;
        this.isLook = false;
        this.isupdata = false;
        this.checkList=[];
        this.value5=[];
        this.$refs.upload.clearFiles();
        this.administrativePenalty = {
          Name: "",
          BookCode: "",
          Reason: "",
          FilingStartTime: "",
          CommandType:"",
          Code: "",
          PunishType: "",
          PunishStartTime: "",
          PunishEndTime: "",
          FilingEndTime: "",
          Person: "",
          Execution: "",
          Content: "",
          Sum: "",
          Type: ""
        }
      },
      /**********
            * [1.页面渲染请求
            * @param  {[string]} id [企业id]
            * @return 
      ************/
      administrativePenaltyNew: function (id) {
        // this.fileurl数组第0项为路由，第1项为id，第2项为类型,第四项为标识RecordCode
        this.fileurl=[this.$route.path,id,this.state];
        this.$http.get('/api/psf?TableCode=J001&COCode='+id)
          .then(function (res) {
            if(res.body.success===true){
              this.items = res.body.data;
              this.list = this.items;
              for(var i=0;i<this.items.length;i++){
                this.checkList=res.body.data[i].CommandType.split(",");
                this.value5=res.body.data[i].PunishType.split(",");
              }
            }
          }, function (err) {
            console.log(err)
          })
      },
      /**********
        * [1.行政命令请求
        * @param 
        * @return 
      ************/
      administrativeOrder(){
        this.$http.get('/api/ps?TableCode=O011').then(function(res){
          if(res.body.success===true){
              this.checkarr=res.body.data;
          }
        },function(err){
          console.log(err);
        })
      },
      /**********
        * [1.下拉框请求
        * @param
        * @return 
      ************/
      administrativeGetselect(){
        this.$http.get('/api/ps?TableCode=O033').then(function(res){
          if(res.body.success===true){
            this.admincommand=res.body.data;
          }
        },function(err){
          console.log(err);
        })
      },
      /**********
        * [1.下拉框请求
        * @param
        * @return 
      ************/
      administrativePenalties(){
        this.$http.get('/api/ps?TableCode=O012').then(function(res){
          if(res.body.success===true){
            this.administrativePenaltiesList=res.body.data;
          }
        },function(err){
          console.log(err);
        })
      },
      /********
        * [1.新增请求以及修改请求
        * @param  {[number]} event [Code值]
        * @return 
      *********/ 
      administrativePenaltySubmit: function (val) {
        //在点击更新之前修改时间格式；
        this.datechange(this.administrativePenalty.FilingStartTime,'FilingStartTime');
        this.datechange(this.administrativePenalty.PunishStartTime,'PunishStartTime');
        this.datechange(this.administrativePenalty.PunishEndTime,'PunishEndTime');
        this.datechange(this.administrativePenalty.FilingEndTime,'FilingEndTime');
        this.administrativePenalty["COCode"] = this.id;
        this.administrativePenalty["TableCode"] = 'J001';
        this.administrativePenalty["CommandType"]=this.checkList;
        this.administrativePenalty["PunishType"]=this.value5;
        var a = '/api/pi';
        var b = '/api/pu';
        var url = '';
        if (this.isadd) {
          url = a;
        }
        if(this.isupdata){
          url = b;
          delete this.administrativePenalty.FileInfo;
        }
        var formData = JSON.stringify(this.administrativePenalty);
        this.$http.post(url, formData, {emulateJSON: true}).then((res) => {
             if (res.body.message === "successful") {
                 // console.log(6666666,this.recordCodeNumber,111111);
                if(this.isadd){
                  this.codeNumber=res.body.data[0].RecordCode;
                  // this.recordCodeNumber=res.body.data[0].RecordCode;
                }
                if(this.isupdata){
                   this.codeNumber=this.indexNum;
                }
                if(val&&this.isChecked==true){
                  this.$refs.upload.filePost();
                }
                if(val&&this.isChecked==false){
                  this.close();
                  this.administrativePenaltyNew(this.id);
                }
             }
            if(res.body.success===false){
                this.$message({showClose: true,message:res.body.message,type: 'error'});
            }
        },(req) => {
          console.log("提交失败")
        });

      },

      /********
        * [1.子组件异步完成，并完成列表渲染和关闭
        * @param 
        * @return 
      *********/
      drawing(){
         this.close();
         this.administrativePenaltyNew(this.id);
         this.isChecked=false;
      },
      /********
        * [1.子组件点击按成状态改变
        * @param  {[Boolen]} val [值为true]
        * @return 
      *********/ 
      listenstatus(val){
        this.isChecked=val;
      },
      /********
        * [1.查看按钮点击事件
        * @param  {[Number]} index [当前点击行的index]
        * @param  {[row]} row [当前点击行的所有信息]
        * @return 
      *********/
      administrativePenaltyLook: function (index, row) {
        this.isadd = false;
        this.isLook = true;
        this.isupdata = false;
        this.files=row.FileInfo;
        this.administrativePenalty = row;
        if(row.PunishType==""){
          this.value5=[];
        }
        if(row.CommandType==""){
          this.checkList=[];
        }
      },
      /********
        * [1.修改按钮点击事件
        * @param  {[Number]} index [当前点击行的index]
        * @param  {[row]} row [当前点击行的所有信息]
        * @return 
      *********/
      administrativePenaltyupdata: function (index, row) {
        this.isadd = false;
        this.isLook = false;
        this.isupdata = true;
        this.$refs.upload.clearFiles();
        this.administrativePenalty = row;
        this.files=row.FileInfo;
        this.indexNum=row.RecordCode;
        if(row.PunishType==""){
          this.value5=[];
        }
        if(row.CommandType==""){
          this.checkList=[];
        }
      },
      /********
        * [1.批量删除  给表格绑定一个事件  事件执行这个方法目的是获取 所有勾选的数据
        * @param  {[Array]} selection [全选数组]
        * @return 
      *********/
      selectAll(selection){
        this.select = selection;
      },
       /********
        * [1.批量删除
        * @param  {[Array]} arr [RecordCode的值]
        * @return 
      *********/
      administrativeDelAll(arr){
           var delId = [];
           var delIdAll = [];
           for(var key in arr){
               delId.push(arr[key].RecordCode);
               if(!(arr[key].FileInfo.length === 0)){
                  delIdAll.push(arr[key].FileInfo[0].RecordCode);
               }
               else{
                 continue;
               }            
           }
           if(delId.length === 0){
                this.$message({showClose: true,message:"没有选中数据或者页签发生改变",type: 'error'});
                return false;
           }
        this.$http.post('/api/pd', {TableCode: 'J001',COCode:this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
          if (res.body.message === "successful") {
                 if(delIdAll.length>0){
                     this.del(delIdAll);
                  }
                this.administrativePenaltyNew(this.id);
           }
      }, (req) => {
          console.log("删除失败")
        });
      },
      /********
            * [1.单行删除
            * @param  {[Number]} index [当前点击行的index]
            * @param  {[row]} row [当前点击行的所有信息]
            * @return 
          *********/  
      administrativePenaltyDel: function (index, row) {
        // console.log(row);
        var delId = row.RecordCode;
        this.$http.post('/api/pd', {TableCode: 'J001',COCode: this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
          if (res.body.message === "successful") {
             //独立的删除附件方法 如果有附件
             if(row.FileInfo.length>0){
                 this.del(row.FileInfo[0].RecordCode);
             }
             this.administrativePenaltyNew(this.id);
        }}, (req) => {
          console.log("删除失败")
        });
      },
      /********
        * [1.点击close关闭时
        * @param 
        * @param  
        * @return 
      *********/
      close: function () {
        document.getElementById("buttonClose").click();
      },
      /********
        * [1.操作栏删除按钮
        * @param  {[String]} adressed [附件的地址]
        * @param  {[String]} named [附件的名字]
        * @param  {[String]} recorded [附件的RecordCode]
        * @return 
      *********/
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
      /********
        * [1.修改页附件删除功能
        * @param  {[String]} adressed [附件的地址]
        * @param  {[String]} named [附件的名字]
        * @param  {[String]} recorded [附件的RecordCode]
        * @return 
      *********/
      deltaed:function(adressed,named,recorded){
        document.getElementById(recorded).style.display="none";
        this.$http.post("/api/pd",{TableCode:'M001',COCode:this.id,RecordCode:recorded}).then(function(res){
          if(res.body.success===true){
          } 
        },function(err){

        })

      },
      /********
        * [1.分页
        * @param  {[Array]} msg [页数]
        * @return 
      *********/
      showMsgFromChild(msg,pages){
          this.list = msg;
          this.currentPages = pages;
      },
      /********
        * [1.日期格式化
        * @param  {[String]} val [事件的值]
        * @param  {[String]} n [格式化时间administrativePenalty对应的值]
        * @return 
      *********/
      datechange(val,n){
          if(val){
            var str1 = val.toLocaleString().slice(0,10).toString().replace(/\//g,"-")
            var str2 = str1.split(" ",1)[0].split("-");
            if(str2[1].length<2){
                  str2[1] = "0"+str2[1];
            }
            if(str2[2].length<2){
                  str2[2] = "0"+str2[2];
            }
            this.administrativePenalty[n] = str2.join("-");
          }
      }
    }
  }
</script>
<style scoped>
  .modal-body .form-group {
      margin-left: 15px;
      margin-bottom: 10px;
    }
  .filesUrl li{
    width:200px;
    height: 30px;
  }
  /*日期控件的宽度*/
  .modal .el-date-editor.el-input{
      width: 170px;
    }

</style>
