<template>
	<!-- enforcement界面 -->
	<!--现场执法-->
	<div id="enterprise" class="col-md-12" >
         <div class="buttons mar">
                <a class="btn btn-primary btn-middle mlr" data-toggle="modal" data-target="#Overview" @click="enforcementAdd"> 新建 </a>
                <a class="btn btn-danger" @click="enforcementDeleteAll(select)">批量删除</a>
         </div>
           <!--排序表格-->
        <el-table :data="romance" border :default-sort="{prop:'Name', order: 'descending'}"  align="center" @selection-change="handleSelectionChange" @select-all="selectAll" @select="selectAll">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" label="序号" width="65">
            </el-table-column>
            <el-table-column prop="Time" label="时间">
            </el-table-column>
            <el-table-column prop="Source" label="检查来源">
            </el-table-column>
            <el-table-column label="(现场检查)附件" sortable>
                <!--渲染以及下载附件-->
                <template scope="props">
                    <el-tag  v-for="tag in props.row.FileInfo" type="primary" class="FileInfo" >
                    <a v-bind:href="'/api/fu?path='+tag.Path+'/'+tag.TrueName">{{tag.FileName}}</a>
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="190">
                <template scope="scope">
                  <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#Overview" @click="enforcementLook(scope.$index, scope.row)">查看</button>
                  <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#Overview" @click="enforcementUpdata(scope.$index, scope.row)">修改</button>
                  <button  class="btn btn-danger btn-sm" @click="enforcementDelete(scope.$index, scope.row)">删除</button>
                </template>
            </el-table-column>
        </el-table>
         <!--模态窗-->
        <div class="modal fade" id="Overview" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" v-if="isAdd">现场执法(新增页面)</h4>
                        <h4 class="modal-title" v-if="isLook">现场执法(查看页面)</h4>
                        <h4 class="modal-title" v-if="isUpdata">现场执法(修改页面)</h4>
                    </div>
                    <form class="form-inline clearfix" @submit.prevent="enforcementSubmit">
                        <div class="modal-body singleRow ml0">
                                <div class="form-group">
                                    <label ><span class="pk">*</span>时间：</label>
                                     <el-date-picker v-model="enforcementList.Time" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions3" :disabled="isLook"></el-date-picker>
                                </div>
                                <div class="form-group">
                                    <label >检查来源：</label>
                                    <input type="text" class="form-control" :disabled="isLook" v-model="enforcementList.Source"/>
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
                            <button id="close" type="button" class="btn btn-default" data-dismiss="modal"  @click="enforcementclose">关闭</button>
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
        currentPages:1,
        ///////////////////////文件上传需要////////////////////////////////////////
        isChecked:false,//子组件点击上传按钮之后的状态
        indexNum:"", //点击修改的索引值
        fileItems:[], //附件上传列表
        downadress:'', //下载地址
        datalist:[],
        fileurl:[],
        codeNumber:"", //code
        state:'L001',  //企业编号
        coded:"",  //文件编号
        files:"", //修改循环列表
        ///////////////////////////////////////////////////////////////
        multipleSelection: [],
        enforcementList:{
         Time:"",
         Source:""
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
        this.enforcementNew(this.id);
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
          this.enforcementNew(val);
        },
       'items':function(arr){
          this.items = arr;
       },
       'codenum':function(val){
        this.codenum=val;
        this.enforcementNew(val);
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
        this.enforcementNew(id);
       },
      //多选需要
      handleSelectionChange(val) {
        val.forEach(item => {
          this.checkedNames.push(item.RecordCode);
        })
        this.multipleSelection = this.checkedNames.toString();
      },
      //排序表格
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 新增按钮点击
      enforcementAdd:function(){
        this.isAdd = true;
        this.isLook = false;
        this.isUpdata =false;
        this.$refs.upload.clearFiles();
        this.enforcementList = {
            Time:"",
            Source:""
        }
       },
      //查看按钮点击
      enforcementLook:function(index, row){
        this.isAdd = false;
        this.isLook = true;
        this.isUpdata =false;
        this.files=row.FileInfo;
        this.enforcementList = row;
        console.log(this.enforcementList);
      },
      //更新按钮点击
      enforcementUpdata:function(index, row){
        this.isAdd = false;
        this.isLook = false;
        this.isUpdata =true;
        this.$refs.upload.clearFiles();
        this.enforcementList  = row;
        this.files=row.FileInfo;
        this.indexNum=row.RecordCode;
      },
      //查询
       enforcementNew: function (id){
        this.fileurl=[this.$route.path,id,this.state];
        this.$http.get('/api/psf?TableCode=L001&COCode='+id).then(function(res){
            if(res.body.success===true){
              this.items = res.body.data;
              this.romance = this.items;
            }
        },function(err){
        })
      },
      enforcementSubmit:function(val){
        this.datechange(this.enforcementList.Time,'Time');
        this.enforcementList["COCode"] = this.id;
        this.enforcementList["TableCode"] = 'L001';
        var a = '/api/pi';
        var b = '/api/pu';
        var url = '';
        if (this.isAdd) {
          url = a;
        }
        if(this.isUpdata){
          url = b;
          delete this.enforcementList.FileInfo;
        }
        var formData = JSON.stringify(this.enforcementList);
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
                  this.enforcementclose();
                  this.enforcementNew(this.id);
                }
             }
            if(res.body.success===false){
                this.$message({showClose: true,message:res.body.message,type: 'error'});
            }
        },(req) => {
          console.log("提交失败")
        });
      },
      // 子组件点击按成状态改变
      listenstatus(val){
        this.isChecked=val;
      },
      // 子组件异步完成，并完成列表渲染和关闭
      drawing(){
         this.enforcementclose();
         this.enforcementNew(this.id);
         this.isChecked=false;
      },
      enforcementclose:function(){
         document.getElementById("close").click();
      },
      enforcementDelete:function(index, row){
          var delId = row.RecordCode;
          this.$http.post('/api/pd', {TableCode: 'L001',COCode: this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
          if (res.body.message === "successful") {
             //独立的删除附件方法 如果有附件
             if(row.FileInfo.length>0){
                 this.del(row.FileInfo[0].RecordCode);
             }
             this.enforcementNew(this.id);
        }}, (req) => {
          console.log("删除失败")
        });
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
      //修改页面删除功能
      deltaed:function(adressed,named,recorded){
        document.getElementById(recorded).style.display="none";
        this.$http.post("/api/pd",{TableCode:'M001',COCode:this.id,RecordCode:recorded}).then(function(res){
          if(res.body.success===true){
          } 
        },function(err){

        })

      },
      selectAll(selection){
         this.select = selection;
      },
      //批量删除
      enforcementDeleteAll(arr){
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
           console.log(delIdAll);
           this.$http.post('/api/pd',{TableCode:'L001',COCode:this.id,RecordCode:delId},{emulateJSON:true}).then((res) => {
              console.log(res.body.message)
               if( res.body.message==="successful"){
                    if(delIdAll.length>0){
                       this.del(delIdAll);
                    }
                    this.enforcementNew(this.id)
               }
               if(res.body.success ===false){
                    console.log(res.body.message);
                    this.$message({showClose: true,message:res.body.message,type: 'error'});
                }
            }, (err) => {
          });
      },
       //分页
      showMsgFromChild(msg,pages){
          this.romance = msg;
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
            this.enforcementList[n] = str2.join("-");
          }
      },
      
    }
  }


  
</script>
<style scope>
.form-inline .form-group{
  width: 100%;
  margin-bottom: 20px;
  display: block;
}
.groupbtn{
  text-align: center;
}
.modal .el-date-editor.el-input{
    width: 300px;
}
</style>