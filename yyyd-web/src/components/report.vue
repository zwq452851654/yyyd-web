<template>
	<!-- PollutionCharge界面 -->
	<!--排污申报-->
	<div id="enterprise" class="col-md-12" >
        <div class="buttons mar">
                <a class="btn btn-primary btn-middle mlr" data-toggle="modal" data-target="#Overview" @click="reportAdd()"> 新建 </a>
                <a class="btn btn-danger" @click="reportAll(select)">批量删除</a>
        </div>
        <!--排序表格-->
         <el-table :data="romance" border :default-sort="{prop: 'Year', order: 'descending'}" @selection-change="handleSelectionChange" @select-all="selectAll" @select="selectAll" align="center">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" label="序号" width="70">
            </el-table-column>
            <el-table-column prop="Year" label="申报年份" sortable width="180">
            </el-table-column>
            <el-table-column prop="Name" label="申报企业" sortable width="180">
            </el-table-column>
            <el-table-column label="附件">
                    <!--渲染以及下载附件-->
                <template scope="props">
                        <el-tag  v-for="tag in props.row.FileInfo" type="primary" class="FileInfo">
                            <a v-bind:href="'/api/fu?path='+tag.Path+'/'+tag.TrueName">{{tag.FileName}}</a>
                        </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                  <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#Overview" @click="handleLook(scope.$index, scope.row)">查看</button>
                  <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#Overview" @click="handleUpdata(scope.$index, scope.row)">修改</button>
                  <button  class="btn btn-danger btn-sm" @click="handleDelete(scope.$index, scope.row)">删除</button>
                  <!--@handleDelete(scope.$index, scope.row)-->
                </template>
            </el-table-column>
        </el-table>
         <!--模态窗-->
         <div class="modal fade" id="Overview" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" v-if="isAdd">排污申报(新增页面)</h4>
                            <h4 class="modal-title" v-if="isLook">排污申报(查看页面)</h4>
                            <h4 class="modal-title" v-if="isUpdata">排污申报(修改页面)</h4>
                        </div>
                        <form class="form-inline clearfix" @submit.prevent="reportSubmit">
                          <div class="modal-body singleRow ml0">
                                  <div class="form-group">
                                      <label ><span class="pk">*</span>申报年份：</label>
                                      <el-date-picker v-model="reportdata.Year" align="right"  type="year" placeholder="选择年份" :disabled="isLook"></el-date-picker  required="required">
                                  </div>
                                  <div class="form-group">
                                      <label >上传附件：</label>
                                      <!--新增修改-->
                                      <div v-show="(isAdd||isUpdata)">
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
                          <!--查看时不提供按钮操作-->
                          <div class="modal-footer" v-if="!isLook">
                              <button type="submit" class="btn btn-primary submit" style="margin-right:50px;" >确定</button>
                              <button id ="addclose" type="button" class="btn btn-default" data-dismiss="modal" @click="reportclose()">关闭</button>
                          </div>
                       </form>
                    </div>
                </div>
        </div>
         <!--分页-->
        <page :number="number" :totalLength="items.length" :getDatas="items" v-on:listenToChildEvent="showMsgFromChild" />
    </div>

</template>
<script>
import Bus from '../vuex/bus.js';
import page from '../common/page';
import uploadFile from '../common/uploadFile';
export default {
    data() {
      return {
        isshow:true,
        id:"",
        Name:"",
        romance:[],
        isAdd:true,
        isLook:true,
        isUpdata:true,
        number:10,
        items:[],
        select:[],
        reportdata:{
          Year:"",
          Name:""
        },
        currentPages:1,
        ///////////////////////文件上传需要////////////////////////////////////////
        isChecked:false,//子组件点击上传按钮之后的状态
        indexNum:"", //点击修改的索引值
        fileItems:[], //附件上传列表
        downadress:'', //下载地址
        datalist:[],
        fileurl:"",
        codeNumber:"", //code
        state:'K001',  //企业编号
        coded:"",  //文件编号
        files:"", //修改循环列表
        ///////////////////////////////////////////////////////////////
        multipleSelection: [],
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
      }
    },
    components:{
        uploadFile,
        page
    },
    beforeCreate(){},
    beforeMount(){},
    mounted(){
    },
    created(){
        Bus.$on('getTarget', ccc => {
          this.ccc()
        });
        this.getSewageDeclareNew(this.id);
      
    },
    beforeUpdate(){
        this.id=sessionStorage.getItem("ID");
        this.reportdata.Name = sessionStorage.getItem("name");
    },
    update(){},
    activated(){},
    deactivated(){},
    beforeDestroy(){},
    destroyed(){},
    watch:{
        id(val){
              this.getSewageDeclareNew(val);
        },
       'items':function(arr){
          this.items = arr;
       },
       'codenum':function(val){
        this.codenum=val;
        this.reportSubmit(val);
       },
       'currentPages':function(val){
          this.select = [];
       }
    },
    methods: {
       /**********
        * [导航切换时更新id]
        * @param 选择的数组
      ************/
       ccc(){
        var id = this.id;
        this.getSewageDeclareNew(id);
       },
       //新增
       reportAdd(){
           this.isAdd = true;
           this.isLook =  false;
           this.isUpdata = false;
           this.$refs.upload.clearFiles();
           this.reportdata ={
              Year:"",
              Name:""
           }
       },
       //查看
       handleLook(index, row){
           this.isAdd = false;
           this.isLook =  true;
           this.isUpdata = false;
           this.reportdata = row;
           this.files=row.FileInfo;
           
       },
       //更新
       handleUpdata(index, row){
           this.isAdd = false;
           this.isLook = false;
           this.isUpdata = true;
           this.$refs.upload.clearFiles();
           this.reportdata = row;
           this.files=row.FileInfo;
           this.indexNum=row.RecordCode;
       },
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
      selectAll(selection){
         this.select = selection;
      },
      reportAll(arr){
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
           console.log(delId);
           this.$http.post('/api/pd',{TableCode:'K001',COCode:this.id,RecordCode:delId},{emulateJSON:true}).then((res) => {
              console.log(res.body.message)
               if( res.body.message==="successful"){
                    if(delIdAll.length>0){
                        this.del(delIdAll);
                    }
                     this.getSewageDeclareNew(this.id);
               }
               if(res.body.success ===false){
                    console.log(res.body.message);
                    this.$message({showClose: true,message:res.body.message,type: 'error'});
               }
            }, (req) => {
                console.log("删除失败")
          });
      },
      handleDelete(index, row) {
         var delId = row.RecordCode;
         this.$http.post('/api/pd',{TableCode:'K001',COCode:this.id,RecordCode:delId},{emulateJSON:true}).then((res) => {
              console.log(res.body.message)
               if( res.body.message==="successful"){
                     //独立的删除附件方法 如果有附件
                    if(row.FileInfo.length>0){
                        this.del(row.FileInfo[0].RecordCode);
                    }
                     this.getSewageDeclareNew(this.id);
               }
               if(res.body.success ===false){
                    console.log(res.body.message);
                    this.$message({showClose: true,message:res.body.message,type: 'error'});
                }
            }, (req) => {
                console.log("删除失败")
          });
      },
      //删除附件功能
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
      showMsgFromChild(msg,pages){
          this.romance = msg;
          this.currentPages = pages;
      },
      //查询数据
      getSewageDeclareNew(id){
        // this.fileurl数组第0项为路由，第1项为id，第2项为类型,第四项为标识RecordCode
        this.fileurl=[this.$route.path,id,this.state];

        this.$http.get('/api/psf?TableCode=K001&COCode='+id).then(function(res){
            if(res.body.message==="successful"){
                   this.items = res.body.data;
                   this.romance = this.items;
            }
            else{
                    this.$message({showClose: true,message:res.body.message,type: 'error'});
                }
        },function(err){})
      },
      //新增修改
      reportSubmit(val,row){
          
            //单独处理只传年份的问题别的页面不需要
            var Year = JSON.stringify(this.reportdata["Year"]).slice(1,5);
            this.reportdata["Year"] = Year;
            this.reportdata["COCode"] =this.id;
            this.reportdata["TableCode"] ='K001';
              var a = '/api/pi';
              var b = '/api/pu';
              var url = '';
              if(this.isAdd){
                  url = a;
              }
              if(this.isUpdata){
                  url = b;
                  delete this.reportdata.FileInfo;
              }
              var formData = JSON.stringify(this.reportdata);
            this.$http.post(url,formData,{emulateJSON:true}).then(function(res){
        	    //文件上传
                ////////////////////////////////////////////////////
                 if (res.body.message === "successful") {
                    if(this.isAdd){
                        console.log(res.body.data[0].RecordCode);
                        this.codeNumber=res.body.data[0].RecordCode;
                    }
                    if(this.isUpdata){
                        this.codeNumber=this.indexNum;
                    }
                    if(val&&this.isChecked==true){
                        this.$refs.upload.filePost();
                    }
                    if(val&&this.isChecked==false){
                        this.reportclose();
        		        this.getSewageDeclareNew(this.id)
                    }
                }
                ////////////////////////////////////////////////////
                if(res.body.success ===false){
                    this.$message({showClose: true,message:res.body.message,type: 'error'});
                }
        	},function(err){
        		console.log(err)
        	})
      },
       // 子组件异步完成，并完成列表渲染和关闭
      drawing(){
         this.reportclose();
         this.getSewageDeclareNew(this.id)
         this.isChecked=false;
      },
      // 子组件点击按成状态改变
      listenstatus(val){
        this.isChecked=val;
      },
      //关闭
      reportclose(){
        document.getElementById("addclose").click();
      }
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