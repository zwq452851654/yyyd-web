<template>
<!--radioactive.vue-->
<!--放射源活动种类和范围-->
<div id="enterprise" class="col-md-12">
    <div class="buttons mar">
        <a class="btn btn-primary btn-middle mlr" data-toggle="modal" data-target="#Overview" @click="radioactiveAdd"> 新建 </a>
        <a class="btn btn-danger" @click="radioactiveDeleteAll(select)">批量删除</a>
    </div>
    <!--排序表格-->
    <el-table :data="romance" border :default-sort="{prop:'Name', order: 'descending'}"  align="center" @selection-change="handleSelectionChange" @select-all="selectAll" @select="selectAll">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="65">
        </el-table-column>
        <el-table-column prop="Nuclide" label="核素" sortable>
        </el-table-column>
        <el-table-column label="种类和范围" sortable >
            <template scope="props">
                 <el-tag type="gray">{{props.row.Type}}</el-tag>
                 <el-tag type="gray">{{props.row.Scope}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="辐射许可证编号" sortable >
            <template scope="props">
                 <el-tag type="gray">{{props.row.LicenseCode.split(",")[0]}}</el-tag>
                 <el-tag type="gray">环辐证 [ {{props.row.LicenseCode.split(",")[1]}} ]</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="EndTime" label="有效期至" sortable >
        </el-table-column>
        <el-table-column label="附件" sortable >
            <!--渲染以及下载附件-->
            <template scope="props">
                <el-tag  v-for="tag in props.row.FileInfo" type="primary" class="FileInfo" >
                <a v-bind:href="'/api/fu?path='+tag.Path+'/'+tag.TrueName">{{tag.FileName}}</a>
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
            <template scope="scope">
              <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#Overview" @click="radioactiveLook(scope.$index, scope.row)">查看</button>
              <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#Overview" @click="radioactiveUpdata(scope.$index, scope.row)">修改</button>
              <button  class="btn btn-danger btn-sm" @click="radioactiveDelete(scope.$index, scope.row)">删除</button>
            </template>
        </el-table-column>
    </el-table>

    <!--模态窗-->
    <div class="modal fade" id="Overview" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" v-if="isAdd">放射源活动种类和范围(新增页面)</h4>
                    <h4 class="modal-title" v-if="isLook">放射源活动种类和范围(查看页面)</h4>
                    <h4 class="modal-title" v-if="isUpdata">放射源活动种类和范围(修改页面)</h4>
                </div>
                <form class="form-inline clearfix" @submit.prevent="radioactiveSubmit">
                    <div class="modal-body singleRow ml0">
                        <table border="1" bordercolor="#ccc" width="100%"> 
                            <tbody>
                                <tr> 
                                    <td width="20% "  colspan="2"> <label><span class="pk">*</span>核素:</label> </td> 
                                    <td width="73% " > <input type="text" class="form-control" :disabled="isLook" v-model="radioactiveList.Nuclide" required="required" /> </td> 
                                </tr> 
                                <tr> 
                                    <td width="20% "  colspan="2"> <label><span class="pk">*</span>总活度(贝可):</label> </td> 
                                    <td width="73% " > 
                                      <input type="text" class="form-control" :disabled="isLook" v-model="radioactiveSelect.Enumber" required="required"  style="width:40px;"/><span> E +</span>
                                      <input type="text" class="form-control" :disabled="isLook" v-model="radioactiveSelect.bknumber" required="required"  style="width:40px;"/><span> (贝可)</span>
                                       </td> 
                                </tr> 
                                <tr> 
                                    <td width="20% "  colspan="2"> <label><span class="pk">*</span>种类与范围:</label> </td> 
                                    <td width="73% " > 
                                        <div class="elselect" id="elselect"> 
                                            <el-select v-model="radioactiveSelect.Type" placeholder="请选择种类" :disabled="isLook" required="required" @change="selectType"> 
                                                <el-option v-for="item in options" :key="item.value" :label="item.value" :value="item.value"> 
                                                </el-option> 
                                            </el-select> 
                                            <el-select v-model="radioactiveSelect.Scope" placeholder="请选择范围" :disabled="isLook" required="required"> 
                                                <el-option v-for="item in options1" :key="item.value" :label="item.value" :value="item.value"> 
                                                </el-option> 
                                            </el-select> 
                                        </div>
                                    </td> 
                                </tr> 
                                <tr> 
                                    <td width="7%"  rowspan="5">
                                        <div class="tdiv">辐射安全许可证</div>
                                    </td> 
                                    <td width="20% " > <label><span class="pk">*</span>发证机关:</label> </td> 
                                    <td width="73% " > <input type="text" class="form-control" :disabled="isLook" v-model="radioactiveList.IssuingAuthority" required="required" /> </td> 
                                </tr> 
                                <tr> 
                                    <td width="20%"> <label><span class="pk">*</span>证书编号:</label> </td> 
                                    <td width="73%" class="special">
                                        <el-select v-model="radioactiveSelect.LicenseWord" placeholder="无" :disabled="isLook" required="required" style="width:55px;height:35px;" @change="elselect"> 
                                            <el-option v-for="item in options2" :key="item.Name" :label="item.Name" :value="item.Name"> 
                                            </el-option> 
                                        </el-select> 
                                        环辐证[ <input type="text" class="form-control specialInput" :disabled="isLook" v-model="radioactiveSelect.LicenseNumber" required="required" /> ] 
                                    </td> 
                                </tr> 
                                <tr> 
                                    <td width="20%"> <label><span class="pk">*</span>发证日期:</label> </td> 
                                    <td width="73%">
                                        <el-date-picker v-model="radioactiveList.StartTime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions1"  :disabled="isLook" required>
                                        </el-date-picker>
                                    </td> 
                                </tr> 
                                <tr> 
                                    <td width="20%"> <label><span class="pk">*</span>有效期至:</label> </td> 
                                    <td width="73%">
                                        <el-date-picker v-model="radioactiveList.EndTime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions2"  :disabled="isLook" required>
                                        </el-date-picker>
                                    </td> 
                                </tr> 
                                <tr> 
                                    <td width="20%"> <label>附&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;件：</label> </td> 
                                    <td width="73%"> 
                                        <!--新增修改-->
                                        <div v-show="(isAdd||isUpdata)" style="margin-top:10px;">
                                            <uploadFile ref="upload" @end="drawing" @listenState="listenstatus" :childUrl="fileurl" :codenum="codeNumber"></uploadFile>
                                            <ul v-if ="isUpdata" class="filesUrl">
                                                <li v-for="item in files" :id="item.RecordCode" ><span class="toadded">{{item.FileName}}</span><span class="deltate"  @click="deltaed(item.Path,item.FileName,item.RecordCode)">删除</span></li>
                                            </ul>
                                        </div>
                                        <!--查看-->
                                        <div v-if="isLook">
                                                <ul><li v-for="item in files">{{item.FileName}}</li></ul>
                                        </div>                                    
                                    </td> 
                                </tr> 
                            </tbody>
                        </table>                                     
                        <div class="annotation">注释:<span class="pk">*</span>为必填项</div>
                    </div>
                    <div class="modal-footer" v-if="!isLook">
                        <button type="submit" class="btn btn-primary submit" style="margin-right:50px;" >确定</button>
                        <button id="close" type="button" class="btn btn-default" data-dismiss="modal"  @click="radioactiveclose">关闭</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

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
        see:true,
         ///////////////////////文件上传需要////////////////////////////////////////
        isChecked:false,//子组件点击上传按钮之后的状态
        indexNum:"", //点击修改的索引值
        fileItems:[], //附件上传列表
        downadress:'', //下载地址
        datalist:[],
        fileurl:[],
        codeNumber:"", //code
        state:'F001',  //企业编号
        coded:"",  //文件编号
        files:"", //修改循环列表
        ///////////////////////////////////////////////////////////////
        multipleSelection: [],
        radioactiveList:{
          Nuclide:"",
          Type:"",
          TotalActivity:"",
          Scope:"",
          IssuingAuthority:"",
          LicenseConditions:"",
          LicenseCode:[],
          StartTime:"",
          EndTime:""
        },
        radioactiveSelect:{
          Enumber:"",
          bknumber:"",
          Type:"",
          Scope:"",
          LicenseWord:"",
          LicenseNumber:"",
        },   
        options: [],
        options1: [],
        options2: [],
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
    components:{
        page,
        uploadFile,
    },
    beforeCreate(){},beforeMount(){},mounted(){},
    created(){
        Bus.$on('getTarget', ccc => {
          this.ccc()
        });
        this.codeDictionary();
        this.radioactiveNew(this.id);
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
          this.radioactiveNew(val);
        },
       'items':function(arr){
          this.items = arr;
       },
       'codenum':function(val){
        this.codenum=val;
        this.radioactiveNew(val);
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
        this.radioactiveNew(id);
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
      radioactiveAdd:function(){
        this.isAdd = true;
        this.isLook = false;
        this.isUpdata =false;
        this.$refs.upload.clearFiles();
        this.radioactiveList = {
          Nuclide:"",
          Type:"",
          TotalActivity:"",
          Scope:"",
          IssuingAuthority:"",
          LicenseConditions:"",
          LicenseCode:"",
          StartTime:"",
          EndTime:""
        },
        this.radioactiveSelect={
          Enumber:"",
          bknumber:"",
          Scope:"",
          Type:"",
          LicenseWord:"",
          LicenseNumber:"",
        }
       },
       /********
        * [1.查看按钮点击事件
        * @param  {[Number]} index [当前点击行的index]
        * @param  {[row]} row [当前点击行的所有信息]
        * @return 
      *********/
      radioactiveLook:function(index, row){
        this.isAdd = false;
        this.isLook = true;
        this.isUpdata =false;
        this.LookAndUpdate(row);
      },
        /********
        * [1.修改按钮点击事件
        * @param  {[Number]} index [当前点击行的index]
        * @param  {[row]} row [当前点击行的所有信息]
        * @return 
      *********/
      radioactiveUpdata:function(index, row){
        this.isAdd = false;
        this.isLook = false;
        this.isUpdata =true;
        this.$refs.upload.clearFiles();
        this.indexNum=row.RecordCode;
        this.LookAndUpdate(row); 
       },
        /********
        * [查看和更新共同执行的方法
        * @return 
      *********/
       LookAndUpdate:function(row){
          this.radioactiveList  = row;
          this.radioactiveSelect.LicenseWord =row.LicenseCode.split(",")[0];
          this.radioactiveSelect.LicenseNumber =row.LicenseCode.split(",")[1];
          this.radioactiveSelect.Type = row.Type;
          this.radioactiveSelect.Scope = row.Scope;
          this.radioactiveSelect.Enumber = row.TotalActivity.split(",")[0];
          this.radioactiveSelect.bknumber = row.TotalActivity.split(",")[1];
          this.files=row.FileInfo;
       },
        /**********
        * [1.页面渲染请求
        * @param  {[string]} id [企业id]
        * @return 
      ************/
       radioactiveNew: function (id){
          this.fileurl=[this.$route.path,id,this.state];
          this.$http.get('/api/psf?TableCode=F001&COCode='+id).then(function(res){
              if(res.body.success===true){
                this.items = res.body.data;
                this.romance = this.items;
              }
              else{
                  this.$message({showClose: true,message:"信息查询失败",type: 'error'});
              }
          },function(err){})
      },
      /**********
      * [1.字典编码请求
      * @param  {[string]} id [企业id]
      * @return 
    ************/
      codeDictionary:function(){
          this.$http.get('/api/ps?TableCode=O001').then(function(res){
              if(res.body.success===true){
                  this.options2 = res.body.data;
              }
              else{
                this.$message({showClose: true,message:"数据字典请求失败",type: 'error'});
              }
          },function(err){})
          this.$http.get('/api/ps?TableCode=O002').then(function(res){
              if(res.body.success===true){
                   var arr = [];
                   for(var k in res.body.data){
                      arr.push(res.body.data[k].TypeName);
                   }
                   var data = this.unique(arr);
                   var Newarr = [];
                   for(var n in data){
                       var obj = {};
                       obj.value = data[n];
                       Newarr.push(obj);
                   }
                  this.options = Newarr;
              }
              else{
                this.$message({showClose: true,message:"数据字典请求失败",type: 'error'});
              }
          },function(err){})
      },
      /********
        * [1.新增请求以及修改请求
        * @param  {[number]} event [Code值]
        * @return 
      *********/ 
      radioactiveSubmit:function(val){
        this.datechange(this.radioactiveList.StartTime,'StartTime');
        this.datechange(this.radioactiveList.EndTime,'EndTime');
        this.radioactiveList["COCode"] = this.id;
        this.radioactiveList["TableCode"] = 'F001';
        this.radioactiveList["LicenseCode"] = this.radioactiveSelect.LicenseWord+","+this.radioactiveSelect.LicenseNumber;
        this.radioactiveList["Type"] = this.radioactiveSelect.Type;
        this.radioactiveList["Scope"] = this.radioactiveSelect.Scope;
        this.radioactiveList["TotalActivity"] = this.radioactiveSelect.Enumber+','+this.radioactiveSelect.bknumber
        var a = '/api/pi';
        var b = '/api/pu';
        var url = '';
        if (this.isAdd) {
          url = a;
        }
        if(this.isUpdata){
          url = b;
          delete this.radioactiveList.FileInfo;
        }
        var formData = JSON.stringify(this.radioactiveList);
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
                  this.radioactiveclose();
                  this.radioactiveNew(this.id);
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
         this.radioactiveclose();
         this.radioactiveNew(this.id);
         this.isChecked=false;
      },
       /********
        * [1.点击close关闭时
        * @param 
        * @return 
      *********/
      radioactiveclose:function(){
         document.getElementById("close").click();
      },
        /********
        * [1.单行删除
        * @param  {[Number]} index [当前点击行的index]
        * @param  {[row]} row [当前点击行的所有信息]
        * @return 
      *********/
      radioactiveDelete:function(index, row){
          var delId = row.RecordCode;
          this.$http.post('/api/pd', {TableCode: 'F001',COCode: this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
          if (res.body.message === "successful") {
             //独立的删除附件方法 如果有附件
             if(row.FileInfo.length>0){
                 this.del(row.FileInfo[0].RecordCode);
             }
             this.radioactiveNew(this.id);
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
      radioactiveDeleteAll(arr){
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
          this.$http.post('/api/pd',{TableCode:'F001',COCode:this.id,RecordCode:delId},{emulateJSON:true}).then((res) => {
              if( res.body.message==="successful"){
                    if(delIdAll.length>0){
                        this.del(delIdAll);
                    }
                    this.radioactiveNew(this.id);
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
            this.radioactiveList[n] = str2.join("-");
          }
      },
      /********
        * [1.验证手机手机号
        * @param  {[number]} event [手机号值]
        * @return 
      *********/
      checkPhone:function(n){
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
        * [1.拿到下拉框当前选的值
        * @param  
        * @return 
      *********/
      elselect:function(val){
          this.radioactiveSelect["Licenseword"] = val;
      },
      unique : function(arr){
          var res = [];
          var json = {};
          for(var i = 0; i < arr.length; i++){
              if(!json[arr[i]]){
                res.push(arr[i]);
                json[arr[i]] = 1;
              }
          }
        return res;
      },
      selectType:function(val){
          this.$http.get('/api/ps?TableCode=O002&TypeName='+val).then(function(res){
              if(res.body.success===true){
                  var arr = [];
                  for(var k in res.body.data){
                       var obj = {};
                       obj.value = res.body.data[k].ScopeName;
                       arr.push(obj);
                  }
                  this.options1 = arr;
              }
              else{
                this.$message({showClose: true,message:"数据字典请求失败",type: 'error'});
              }
          },function(err){})
      }
    } 
}


  
</script>
<style scoped>
#elselect .el-input__inner{
    padding: 0px;
}
.singleRow .form-group .elselect input {
   width: 120px;
}
.elselect{
  display: inline-block;
}
.el-input__icon+.el-input__inner{
    padding-right: 0px!important;
}
.modal-body td{
    padding-left: 20px;
    font-size: 14px;
    height: 50px;
}
.modal-body td .tdiv{
    width: 20px;
    font-weight: 700;
    font-size: 14px;
    margin-left: -9px;
}
.modal-body td .special .el-select{
    float: left;
    margin-right: 20px;
}
.modal-body td .special .specialInput{
    float: left;
}
.annotation{
    height: 30px;
    line-height: 30px;
}
</style>
