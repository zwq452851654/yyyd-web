<template>
	<!-- Emonitoring -->
	<!-- 环境监察 -->
<div id="enterprise" class="col-md-12">
    <div>
       <span class="changedate">时间</span><span class="changedate">:</span>
       <el-date-picker v-model="EmonitoringDate.Validity" type="daterange" align="right" :placeholder="EmonitoringDate.Validity" :picker-options="pickerOptions3" @change ="datechangeTwo(EmonitoringDate.Validity,'Validity')"> </el-date-picker>
    </div>
    <div class="buttons mar">
        <a class="btn btn-primary btn-middle mlr" data-toggle="modal" data-target="#Overview" @click="EmonitoringAdd"> 新建 </a>
        <a class="btn btn-danger" @click="EmonitoringDeleteAll(select)">批量删除</a>
    </div>
     <!--排序表格-->
    <el-table :data="romance" border :default-sort="{prop:'Name', order: 'descending'}"  align="center" @selection-change="handleSelectionChange" @select-all="selectAll" @select="selectAll">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="65">
        </el-table-column>
        <el-table-column prop="Name" label="企业名称" sortable>
        </el-table-column>
        <el-table-column prop="Time" label="时间" sortable >
        </el-table-column>
        <el-table-column label="环境监察附件" sortable width="200">
            <!--渲染以及下载附件-->
            <template scope="props">
                <el-tag  v-for="tag in props.row.FileInfo" type="primary" class="FileInfo" >
                <a v-bind:href="'/api/fu?path='+tag.Path+'/'+tag.TrueName">{{tag.FileName}}</a>
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
            <template scope="scope">
              <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#Overview" @click="EmonitoringLook(scope.$index, scope.row)">查看</button>
              <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#Overview" @click="EmonitoringUpdata(scope.$index, scope.row)">修改</button>
              <button  class="btn btn-danger btn-sm" @click="EmonitoringDelete(scope.$index, scope.row)">删除</button>
            </template>
        </el-table-column>
    </el-table>

     <!--模态窗-->
    <div class="modal fade" id="Overview" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" v-if="isAdd">环境监察(新增页面)</h4>
                    <h4 class="modal-title" v-if="isLook">环境监察(查看页面)</h4>
                    <h4 class="modal-title" v-if="isUpdata">环境监察(修改页面)</h4>
                </div>
                <form class="form-inline clearfix" @submit.prevent="EmonitoringSubmit">
                    <div class="modal-body singleRow ml0">
                              <div class="form-group">
                                <label ><span class="pk">*</span>日期：</label>
                                <el-date-picker v-model="EmonitoringList.Time" type="date" align="right" placeholder="请选择时间" :picker-options="pickerOptions2" :disabled="isLook" required="required"> </el-date-picker>
                            </div>
                              <div class="form-group">
                                <label>附&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;件：</label>
                                <!--新增以及修改 -->
                                <div v-show="isAdd ||isUpdata">
                                    <uploadFile ref="upload" @end="drawing" @listenState="listenstatus" :childUrl="fileurl" :codenum="codeNumber"></uploadFile>
                                    <ul v-if ="isUpdata" class="filesUrl">
                                      <li v-for="item in files" :id="item.RecordCode" ><span class="toadded">{{item.FileName}}</span><span class="deltate"  @click="deltaed(item.Path,item.FileName,item.RecordCode)">删除</span></li>
                                    </ul>
                                </div>
                                <!--查看-->
                                <div v-if="isLook">
                                  <ul><li v-for="item in files">{{item.FileName}}</li></ul>
                                </div>
                            </div>
                            注释:<span class="pk">*</span>为必填项
                    
                    </div>
                    <div class="modal-footer" v-if="!isLook">
                        <button type="submit" class="btn btn-primary submit" style="margin-right:50px;" >确定</button>
                        <button id="close" type="button" class="btn btn-default" data-dismiss="modal"  @click="Emonitoringclose">关闭</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
     <!--分页-->
    <page :number="10" :totalLength="items.length" :getDatas="items" v-on:listenToChildEvent="showMsgFromChild" />
</div>
</template>
<script>
import Bus from '../vuex/bus.js'
import page from '../common/page';
import uploadFile from '../common/uploadFile';
  export default {
    data() {
      return {
        id:"",
        items:[],
        romance:[],
        select:"", // 获取所有选中的数据
        isAdd: true,//是否是新增
        isLook:false,//是否是查看
        isUpdata:false,//是否是更新
        Arr:['',''],
        currentPages:1,
         ///////////////////////文件上传需要////////////////////////////////////////
        isChecked:false,//子组件点击上传按钮之后的状态
        indexNum:"", //点击修改的索引值
        fileItems:[], //附件上传列表
        downadress:'', //下载地址
        datalist:[],
        fileurl:[],
        codeNumber:"", //code
        state:'G001',  //企业编号
        coded:"",  //文件编号
        files:"", //修改循环列表
        ///////////////////////////////////////////////////////////////
        multipleSelection: [],
        EmonitoringList:{
          Name:"",
          Time:""
        },
        EmonitoringDate:{
            Validity:"请选择时间段"
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
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        }
      }
    },
    components:{
        page,
        uploadFile,
    },
    beforeCreate(){},beforeMount(){},mounted(){},
    created(){
       Bus.$on('getTarget', ccc => {
          this.ccc()
       });
        this.EmonitoringNew(this.id);
    },
    beforeUpdate(){
        this.id=sessionStorage.getItem("ID");
        this.EmonitoringList["Name"]=sessionStorage.getItem("name");
    },
    update(){},
    activated(){},
    deactivated(){},
    beforeDestroy(){},
    destroyed(){},
    watch:{
        id(val){
          this.EmonitoringNew(val);
        },
       'items':function(arr){
          this.items = arr;
       },
       'codenum':function(val){
        this.codenum=val;
        this.EmonitoringNew(val);
       },
       'currentPages':function(val){
          this.select = [];
       }
    },
    methods:{
      /**********
        * [导航切换时更新id]
        * @param 选择的数组
      ************/
       ccc(){
        var id = this.id;
        this.EmonitoringNew(id);
       },
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
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
       /**********
        * [控件自带方法]
        * @param 排序表格
      ************/
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
       /**********
        * [点击新增时清空数据]
        * @param 
      ************/
      EmonitoringAdd:function(){
        this.isAdd = true;
        this.isLook = false;
        this.isUpdata =false;
        this.$refs.upload.clearFiles();
        this.Arr =['',''];
        this.EmonitoringDate = {
            Validity:"请选择时间段"
        }
        this.EmonitoringList = {
            Name:"",
            Time:""
        }
       },
       /********
        * [1.查看按钮点击事件
        * @param  {[Number]} index [当前点击行的index]
        * @param  {[row]} row [当前点击行的所有信息]
        * @return 
      *********/
      EmonitoringLook:function(index, row){
        this.isAdd = false;
        this.isLook = true;
        this.isUpdata =false;
        this.files=row.FileInfo;
        this.EmonitoringList = row;
       
      },
        /********
        * [1.修改按钮点击事件
        * @param  {[Number]} index [当前点击行的index]
        * @param  {[row]} row [当前点击行的所有信息]
        * @return 
      *********/
      EmonitoringUpdata:function(index, row){
        this.isAdd = false;
        this.isLook = false;
        this.isUpdata =true;
        this.$refs.upload.clearFiles();
        this.Arr =['',''];
        this.EmonitoringDate = {
            Validity:"请选择时间段"
        }
        this.EmonitoringList  = row;
        this.files=row.FileInfo;
        this.indexNum=row.RecordCode;
      },
        /**********
        * [1.页面渲染请求
        * @param  {[string]} id [企业id]
        * @return 
      ************/
       EmonitoringNew: function (id){
        this.fileurl=[this.$route.path,id,this.state];
        this.$http.get('/api/psf?TableCode=G001&COCode='+id+'&StartTime='+this.Arr[0]+'&EndTime='+this.Arr[1]).then(function(res){
            if(res.body.success===true){
              this.items = res.body.data;
              this.romance = this.items;
            }
        },function(err){
        })
      },
      /********
        * [1.新增请求以及修改请求
        * @param  {[number]} event [Code值]
        * @return 
      *********/ 
      EmonitoringSubmit:function(val){
        this.datechange(this.EmonitoringList.Time,'Time');
        this.EmonitoringList["COCode"] = this.id;
        this.EmonitoringList["TableCode"] = 'G001';
        var a = '/api/pi';
        var b = '/api/pu';
        var url = '';
        if (this.isAdd) {
          url = a;
        }
        if(this.isUpdata){
          url = b;
          delete this.EmonitoringList.FileInfo;
        }
        var formData = JSON.stringify(this.EmonitoringList);
        this.$http.post(url, formData, {emulateJSON: true}).then((res) => {
             if (res.body.message === "successful") {
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
                   this.Emonitoringclose();
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
        * [1.子组件点击按成状态改变
        * @param  {[Boolen]} val [值为true]
        * @return 
      *********/ 
        listenstatus(val){
          this.isChecked=val;
        },
     /********
        * [1.子组件异步完成，并完成列表渲染和关闭
        * @param 
        * @return 
      *********/ 
      drawing(){
         this.Emonitoringclose();
         this.isChecked=false;
      },
       /********
        * [1.点击close关闭时
        * @param 
        * @return 
      *********/
      Emonitoringclose:function(){
         document.getElementById("close").click();
         this.EmonitoringNew(this.id);
      },
        /********
        * [1.单行删除
        * @param  {[Number]} index [当前点击行的index]
        * @param  {[row]} row [当前点击行的所有信息]
        * @return 
      *********/
      EmonitoringDelete:function(index, row){
          var delId = row.RecordCode;
          this.$http.post('/api/pd', {TableCode: 'G001',COCode: this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
          if (res.body.message === "successful") {
             //独立的删除附件方法 如果有附件
             if(row.FileInfo.length>0){
                 this.del(row.FileInfo[0].RecordCode);
             }
             this.EmonitoringNew(this.id);
        }}, (req) => {
          console.log("删除失败")
        });
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
      EmonitoringDeleteAll(arr){
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
           
           this.$http.post('/api/pd',{TableCode:'G001',COCode:this.id,RecordCode:delId},{emulateJSON:true}).then((res) => {
             
               if( res.body.message==="successful"){
                     if(delIdAll.length>0){
                         this.del(delIdAll);
                     }
                     this.EmonitoringNew(this.id);
               }
               if(res.body.success ===false){
                  
                    this.$message({showClose: true,message:res.body.message,type: 'error'});
               }
            }, (req) => {
                console.log("删除失败")
          });
      },
      /********
        * [1.分页
        * @param  {[Array]} msg [页数]
        * @return 
      *********/
      showMsgFromChild(msg,pages){
          this.romance = msg;
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
            var str1 = val.toLocaleString().slice(0,10).toString().replace(/\//g,"-");
            var str2 = str1.split(" ",1)[0].split("-");
            if(str2[1].length<2){
                  str2[1] = "0"+str2[1];
            }
            if(str2[2].length<2){
                  str2[2] = "0"+str2[2];
            }
            this.EmonitoringList[n] = str2.join("-");
          }
      },
      /********
        * [1.日期格式化
        * @param  {[String]} val [事件的值]
        * @param  {[String]} n [格式化时间administrativePenalty对应的值]
        * @return 
      *********/
      datechangeTwo(val,n){
          if(val === '请选择时间段'|| val ==''||val === undefined){
              return;
          }
          if(val){
            var str1 = val[0].toLocaleString().slice(0,10).toString().replace(/\//g,"-");
            var str2 = str1.split(" ",1)[0].split("-");
            var str3 = val[1].toLocaleString().slice(0,10).toString().replace(/\//g,"-");
            var str4 = str3.split(" ",1)[0].split("-");
            if(str2[1].length<2){
                  str2[1] = "0"+str2[1];
            }
            if(str2[2].length<2){
                  str2[2] = "0"+str2[2];
            }
            if(str4[1].length<2){
                  str4[1] = "0"+str4[1];
            }
            if(str4[2].length<2){
                  str4[2] = "0"+str4[2];
            }
            this.Arr = [str2.join("-"),str4.join("-")];
            this.EmonitoringNew(this.id);
          }
      }
    }
  }


  
</script>
<style scope>
.changedate{
  font-size:16px;
  margin-right: 10px;
}
</style>

