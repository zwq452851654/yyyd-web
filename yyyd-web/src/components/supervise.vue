<template>
   <!-- 监督性监测 -->
   <!-- Supervision -->
   <div id="enterprise" class="col-md-12" >
        <div class="buttons mar btn-middle">
          <a class="btn btn-primary" data-toggle="modal" data-target="#myModal"
             @click="SupervisionDateClear"> 新建 </a>
          <a class=" btn btn-danger" @click="SupervisionDelAll(select)">批量删除</a>
        </div>
         <!--带排序的表格-->
        <el-table :data="list" border :default-sort="{prop:'ReportID', order: 'descending'}"  align="center" @selection-change="handleSelectionChange" @select-all="selectAll" @select="selectAll">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" label="序号" width="60">
          </el-table-column>
          <el-table-column prop="ReportID" label="报告编号" sortable>
          </el-table-column>
          <el-table-column prop="SamplingTime" label="采样时间" sortable>
          </el-table-column>
          <el-table-column prop="SamplingUnit" label="采样单位" sortable>
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
                        @click="SupervisionUpdata(scope.$index, scope.row)">修改
                </button>
                <button class="btn btn-danger btn-sm" @click="SupervisionDel(scope.$index, scope.row)">删除</button>
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
                    <h4 class="modal-title" v-if="isadd">监督性监测(新增页面)</h4>
                    <h4 class="modal-title" v-if="isLook">监督性监测(查看页面)</h4>
                    <h4 class="modal-title" v-if="isupdata">监督性监测(修改页面)</h4>
                </div>
              <div class="modal-body ml0">
                <form class="form-inline clearfix singleRow" @submit.prevent="SupervisionSubmit" >
                  <div class="form-group">
                        <label><span class="pk">*</span>报告编号：</label>
                        <input type="text" class="form-control mar_r15" required="required" :disabled="isLook" v-model="Supervision.ReportID">
                   </div>
                   <div class="form-group">
                        <label><span class="pk">*</span>采样时间：</label>
                        <el-date-picker v-model="Supervision.SamplingTime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions1" required="required"  :disabled="isLook">
                        </el-date-picker>
                   </div>
                   <div class="form-group">
                        <label><span class="pk">*</span>采样单位：</label>
                        <input type="text" class="form-control mar_r15" required="required" :disabled="isLook" v-model="Supervision.SamplingUnit">
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
        data() {
            return {
                currentPages:1,
                admincommand:[], //行政命令
                list:[], // 获取到数据之后 再执行一句 this.list = this.items  数据绑定 传list  传给分页 传items
                select:"", // 获取所有选中的数据
                isadd: true,//是否是新增
                isLook: true,//是否是查看
                isupdata: true,//是否是更新
                id: "",
                items: [], 
                 ///////////////////////文件上传需要////////////////////////////////////////
                isChecked:false,//子组件点击上传按钮之后的状态
                indexNum:"", //点击修改的索引值
                fileItems:[], //附件上传列表
                downadress:'', //下载地址
                datalist:[],
                fileurl:[],
                codeNumber:"", //code
                state:'B001',  //企业编号
                coded:"",  //文件编号
                files:"", //修改循环列表
               
                ///////////////////////////////////////////////////////////////
                multipleSelection: [],
                Supervision:{
                    ReportID:"",
                    SamplingTime:"",
                    SamplingUnit:""
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
          this.SupervisionNew(this.id);
        },
        beforeUpdate(){
          this.id = sessionStorage.getItem("ID");
        },
        updated(){},
        activated(){},
        deactivated(){},
        beforeDestroy(){},
        destroyed(){},
        watch:{
            id(val){
                this.SupervisionNew(val);
            },
            //分页有用 监听变化
            'items':function(arr){
                this.items = arr;
            },
            'codenum':function(val){
                this.codenum=val;
                this.SupervisionSubmit(val);
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
            this.SupervisionNew(id);
        },
       /**********
        * [1.点击新建时清空所有数据
        * @param 
        * @return 
      ************/
        SupervisionDateClear: function () {
            this.isadd = true;
            this.isLook = false;
            this.isupdata = false;
            this.$refs.upload.clearFiles();
            this.Supervision = {
                ReportID:"",
                SamplingTime:"",
                SamplingUnit:""
            }
        },
        /**********
            * [1.页面渲染请求
            * @param  {[string]} id [企业id]
            * @return 
        ************/
        SupervisionNew: function (id) {
            // this.fileurl数组第0项为路由，第1项为id，第2项为类型,第四项为标识RecordCode
            this.fileurl=[this.$route.path,id,this.state];
            this.$http.get('/api/psf?TableCode=B001&COCode='+id)
              .then(function (res) {
                if(res.body.success===true){
                  this.items = res.body.data;
                  this.list = this.items;
                  // 
                }
              }, function (err) {
                console.log(err)
              })
        },
            /********
            * [1.新增请求以及修改请求
            * @param  {[number]} event [Code值]
            * @return 
          *********/ 
        SupervisionSubmit: function (val) {
        //在点击更新之前修改时间格式；
        this.datechange(this.Supervision.SamplingTime,'SamplingTime');
        this.Supervision["COCode"] = this.id;
        this.Supervision["TableCode"] = 'B001';
        var a = '/api/pi';
        var b = '/api/pu';
        var url = '';
        if (this.isadd) {
          url = a;
        }
        if(this.isupdata){
          url = b;
          delete this.Supervision.FileInfo;
        }
        var formData = JSON.stringify(this.Supervision);
        this.$http.post(url, formData, {emulateJSON: true}).then((res) => {
             if (res.body.message === "successful") {
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
                  this.SupervisionNew(this.id);
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
             this.SupervisionNew(this.id);
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
        * [1.修改按钮点击事件
        * @param  {[Number]} index [当前点击行的index]
        * @param  {[row]} row [当前点击行的所有信息]
        * @return 
        *********/
        SupervisionUpdata: function (index, row) {
            this.isadd = false;
            this.isLook = false;
            this.isupdata = true;
            this.Supervision = row;
            this.files=row.FileInfo;
            this.indexNum=row.RecordCode;
            this.$refs.upload.clearFiles();
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
        SupervisionDelAll(arr){
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
            this.$http.post('/api/pd', {TableCode: 'B001',COCode:this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
                if(res.body.message === "successful") {
                  if(delIdAll.length>0){
                      this.del(delIdAll);
                  }
                  this.SupervisionNew(this.id);
                }
                if(res.body.success===false){
                  this.$message({showClose: true,message:"没有选中数据或者页签发生改变,删除失败",type: 'error'});
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
        SupervisionDel: function (index, row) {
            // console.log(789,row);
            var delId = row.RecordCode;
            this.$http.post('/api/pd', {TableCode: 'B001',COCode: this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
              if (res.body.message === "successful") {
                 //独立的删除附件方法 如果有附件
                 if(row.FileInfo.length>0){
                     this.del(row.FileInfo[0].RecordCode);
                 }
                 this.SupervisionNew(this.id);
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
        * @param  {[String]} n [格式化时间对应的值]
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
            this.Supervision[n] = str2.join("-");
          }
        }
    }
}
</script>
<style scoped>
 
</style>
