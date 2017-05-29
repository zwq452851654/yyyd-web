<template>
<!-- radiation	 -->
<!-- 辐射安全管理机构 -->
    <div id="enterprise" class="col-md-12">
       <div class="buttons mar">
          <a class="btn btn-primary btn-middle mlr" data-toggle="modal" data-target="#Overview" @click="radiationAdd"> 新建 </a>
          <a class="btn btn-danger" @click="radiationDeleteAll(select)">批量删除</a>
       </div>

      <el-table :data="romance" border :default-sort="{prop:'Name', order: 'descending'}"  align="center" @selection-change="handleSelectionChange" @select-all="selectAll" @select="selectAll">
        项目名称
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" label="序号" width="65">
            </el-table-column>
            <el-table-column prop="ProjectName" label="项目名称" sortable>
            </el-table-column>
            <el-table-column prop="OrgName" label="机构名称" sortable>
            </el-table-column>
            <el-table-column prop="Name" label="联系人姓名" sortable>
            </el-table-column>
            <el-table-column prop="Telephone" label="电话" sortable>
            </el-table-column>
            <el-table-column prop="Mobilephone" label="手机" sortable>
            </el-table-column>
            <el-table-column prop="Fax" label="传真" sortable >
            </el-table-column>
            <el-table-column prop="Email" label="邮箱" sortable >
            </el-table-column>
            <el-table-column label="操作" width="200">
                <template scope="scope">
                  <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#Overview" @click="radiationLook(scope.$index, scope.row)">查看</button>
                  <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#Overview" @click="radiationUpdata(scope.$index, scope.row)">修改</button>
                  <button  class="btn btn-danger btn-sm" @click="radiationDelete(scope.$index, scope.row)">删除</button>
                </template>
            </el-table-column>
      </el-table>
      
      <!--新建 修改-->
      <div class="modal fade" id="Overview" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" v-if="isAdd">辐射安全管理机构(新增页面)</h4>
                        <h4 class="modal-title" v-if="isLook">辐射安全管理机构(查看页面)</h4>
                        <h4 class="modal-title" v-if="isUpdata">辐射安全管理机构(修改页面)</h4>
                    </div>
                    <form class="form-inline clearfix" @submit.prevent="radiationSubmit">
                        <div class="modal-body singleRow ml0">
                                <div class="form-group">
                                    <label ><span class="pk">*</span>项目名称：</label>
                                    <input type="text" class="form-control" :disabled="isLook" v-model="radiationList.ProjectName"/>
                                </div>
                                <div class="form-group">
                                    <label >机构名称：</label>
                                    <input type="text" class="form-control" :disabled="isLook" v-model="radiationList.OrgName"/>
                                </div>
                                <div class="form-group">
                                    <label >联系人姓名：</label>
                                    <input type="text" class="form-control" :disabled="isLook" v-model="radiationList.Name"/>
                                </div>
                                <div class="form-group">
                                    <label >电话：</label>
                                    <input type="text" class="form-control" :disabled="isLook" v-model="radiationList.Telephone"/>
                                </div>
                                <div class="form-group">
                                    <label >手机：</label>
                                    <input type="text" class="form-control" :disabled="isLook" v-model="radiationList.Mobilephone"/>
                                </div>
                                <div class="form-group">
                                    <label >邮箱：</label>
                                    <input type="text" class="form-control" :disabled="isLook" v-model="radiationList.Email"/>
                                </div>
                                 <div class="form-group">
                                    <label >传真：</label>
                                    <input type="text" class="form-control" :disabled="isLook" v-model="radiationList.Fax"/>
                                </div>
                                注释:<span class="pk">*</span>为必填项
                        
                        </div>
                        <div class="modal-footer" v-if="!isLook">
                            <button type="submit" class="btn btn-primary submit" style="margin-right:50px;" >确定</button>
                            <button id="close" type="button" class="btn btn-default" data-dismiss="modal"  @click="radiationclose">关闭</button>
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
import Bus from '../vuex/bus.js';
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
        state:'F004',  //企业编号
        coded:"",  //文件编号
        files:"", //修改循环列表
        ///////////////////////////////////////////////////////////////
        multipleSelection: [],
        radiationList: {
          ProjectName:"",
          OrgName:"",
          Name:"",
          Telephone:"",
          Mobilephone:"",
          Fax:"",
          Email:""
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
        this.radiationNew(this.id);
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
          this.radiationNew(val);
        },
       'items':function(arr){
          this.items = arr;
       },
       'codenum':function(val){
        this.codenum=val;
        this.radiationNew(val);
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
        this.radiationNew(id);
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
      radiationAdd:function(){
        this.isAdd = true;
        this.isLook = false;
        this.isUpdata =false
        this.radiationList = {
          ProjectName:"",
          OrgName:"",
          Name:"",
          Telephone:"",
          Mobilephone:"",
          Fax:"",
          Email:""
        }
       },
       /********
        * [1.查看按钮点击事件
        * @param  {[Number]} index [当前点击行的index]
        * @param  {[row]} row [当前点击行的所有信息]
        * @return 
      *********/
      radiationLook:function(index, row){
        this.isAdd = false;
        this.isLook = true;
        this.isUpdata =false;
        this.radiationList  = row;   
      },
        /********
        * [1.修改按钮点击事件
        * @param  {[Number]} index [当前点击行的index]
        * @param  {[row]} row [当前点击行的所有信息]
        * @return 
      *********/
      radiationUpdata:function(index, row){
        this.isAdd = false;
        this.isLook = false;
        this.isUpdata =true;
        this.radiationList  = row;    
      },
        /**********
        * [1.页面渲染请求
        * @param  {[string]} id [企业id]
        * @return 
      ************/
       radiationNew: function (id){
        this.fileurl=[this.$route.path,id,this.state];
        this.$http.get('/api/ps?TableCode=F004&COCode='+id).then(function(res){
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
      radiationSubmit:function(val){
        var n = this.radiationList.Telephone;
        if(!this.checkPhone(n)){
          this.radiationList.Telephone ="";
          return false; 
        }
        var m = this.radiationList.Mobilephone;
         if(!this.checktelPhone(m)){
          this.radiationList.Mobilephone ="";
          return false; 
        }
        var v = this.radiationList.Fax;
        if(!this.checkPhone(v)){
          this.radiationList.Fax ="";
          return false; 
        }
        var email = this.radiationList.Email;
        if(!this.checkEmail(email)){
          this.radiationList.Email ="";
          return false; 
        }
        this.radiationList["COCode"] = this.id;
        this.radiationList["TableCode"] = 'F004';
        var a = '/api/pi';
        var b = '/api/pu';
        var url = '';
        if (this.isAdd) {
          url = a;
        }
        if(this.isUpdata){
          url = b;
        }
        var formData = JSON.stringify(this.radiationList);
        this.$http.post(url, formData, {emulateJSON: true}).then((res) => {
             if (res.body.message === "successful") {
                  this.radiationclose();
                  this.radiationNew(this.id);
                }
             if(res.body.success===false){
                this.$message({showClose: true,message:res.body.message,type: 'error'});
             }
        },(req) => {
          console.log("提交失败")
        });
      },
       /********
        * [1.点击close关闭时
        * @param 
        * @return 
      *********/
      radiationclose:function(){
         document.getElementById("close").click();
      },
        /********
        * [1.单行删除
        * @param  {[Number]} index [当前点击行的index]
        * @param  {[row]} row [当前点击行的所有信息]
        * @return 
      *********/
      radiationDelete:function(index, row){
          var delId = row.RecordCode;
          this.$http.post('/api/pd', {TableCode: 'F004',COCode: this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
          if (res.body.message === "successful") {
              this.radiationNew(this.id);
          }}, (req) => {
          console.log("删除失败")
        });
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
      radiationDeleteAll(arr){
           var delId = [];
           for(var key in arr){
               delId.push(arr[key].RecordCode);
           }         
           this.$http.post('/api/pd',{TableCode:'F004',COCode:this.id,RecordCode:delId},{emulateJSON:true}).then((res) => {             
               if( res.body.message==="successful"){
                     this.radiationNew(this.id);
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
            var str1 = val.toLocaleString().slice(0,10).toString().replace(/\//g,"-")
            var str2 = str1.split(" ",1)[0].split("-");
            if(str2[1].length<2){
                  str2[1] = "0"+str2[1];
            }
            if(str2[2].length<2){
                  str2[2] = "0"+str2[2];
            }
            this.radiationList[n] = str2.join("-");
          }
      },
      /********
        * [1.验证手机手机号
        * @param  {[number]} event [手机号值]
        * @return 
      *********/
      checktelPhone:function(n){
        if((n.toString().length>0)&&(n != 0)){
            if(!(/^1(3|4|5|7|8)\d{9}$/.test(n))){
                this.$message({showClose: true,message:"手机号码有误,请重填",type: 'error'});
                return false; 
            }else{
              return n;
            }
         }
         else{
            return true; 
         }  
      },
       /********
        * [1.固定电话验证
        * @param  {[number]} event [固定电话]
        * @return 
      *********/
      checkPhone:function(n){
        if((n.toString().length>0)&&(n != 0)){
            if(!(/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(n))){
                this.$message({showClose: true,message:"固定电话或者传真有误,请重填",type: 'error'});
                return false; 
            }else{
              return n;
            }
         }
         else{
            return true; 
         }  
      },
      //  /********
      //   * [1.邮箱验证
      //   * @param  {[number]} event [邮箱验证]
      //   * @return 
      // *********/
     checkEmail:function(n){
        if((n.length>0)&&(n != 0)){
            if(!(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(n))){
                this.$message({showClose: true,message:"邮箱格式填写错误,请重填",type: 'error'});
                return false; 
            }else{return n;}
         }else{return true;} 
    }
  }
}
</script>

