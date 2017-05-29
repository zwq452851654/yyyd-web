<template>
<!--台账明细登记-->
<!--ledgerReg  -->
    <div id="enterprise" class="col-md-12">
        <div class="buttons mar btn-middle">
          <a class="btn btn-primary" data-toggle="modal" data-target="#myModal"
           @click="ledgerRegDateClear"> 新建 </a>
          <a class=" btn btn-danger" @click="ledgerRegDelAll(select)">批量删除</a>
        </div>
        <!--带排序的表格-->
        <el-table @selection-change="handleSelectionChange" :data="list" border style="width: 100%" :default-sort="{prop: 'Time', order: 'descending'}" @select-all="selectAll" @select="selectAll" >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="Scope" label="范围" sortable>
          </el-table-column>
          <el-table-column prop="Name" label="装置名称" sortable>
          </el-table-column>
          <el-table-column prop="Model" label="规格型号" sortable>
          </el-table-column>
          <el-table-column prop="Person" label="审核人" sortable>
          </el-table-column>
          <el-table-column prop="Time" label="审核日期" sortable>
          </el-table-column>

            <el-table-column label="操作" width="190">

              <template scope="scope">
                <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal"
                        @click="aledgerRegLook(scope.$index, scope.row)">查看
                </button>
                <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal"
                        @click="ledgerRegUpdata(scope.$index, scope.row)">修改
                </button>
                <button class="btn btn-danger btn-sm" @click="ledgerRegDel(scope.$index, scope.row)">删除</button>
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
                  <h4 class="modal-title" v-if="isadd">台账明细登记(新增页面)</h4>
                  <h4 class="modal-title" v-if="isLook">台账明细登记(查看页面)</h4>
                  <h4 class="modal-title" v-if="isupdata">台账明细登记(修改页面)</h4>
              </div>
              <div class="modal-body ml0">
                <form class="form-inline clearfix TheTwoColumn" @submit.prevent="ledgerRegSubmit" >
                    <div class="form-group">
                      <label><span class="pk">*</span>范围：</label>
                      <select class="form-control" :disabled="isLook" v-model="ledgerReg.Scope">
                        <option v-for="item in ledgerDictionaries">{{item.Name}}</option>
                      </select>
                      <label class="proname"><span class="pk">*</span>装置名称：</label>
                      <input type="text" class="form-control " :disabled="isLook" required="required"
                           v-model="ledgerReg.Name">
                    </div>
                    <div class="form-group">
                        <label><span class="pk">*</span>规格型号：</label>
                        <input type="text" class="form-control " :disabled="isLook" required="required"
                               v-model="ledgerReg.Model">
                        <label><span class="pk">*</span>类别：</label>
                        <input type="text" class="form-control " :disabled="isLook" required="required"
                               v-model="ledgerReg.Type">
                    </div>
                    <div class="form-group">
                      <label><span class="pk">*</span>用途：</label>
                      <input type="text" class="form-control " :disabled="isLook" required="required"
                             v-model="ledgerReg.Purpose">
                      <label><span class="pk">*</span>场所：</label>
                      <input type="text" class="form-control " :disabled="isLook" required="required"
                             v-model="ledgerReg.Place">
                    </div>
                    <div class="form-group">
                      <label><span class="pk">*</span>来源：</label>
                      <input type="text" class="form-control " :disabled="isLook" required="required"
                             v-model="ledgerReg.Source">
                      <label><span class="pk">*</span>去向：</label>
                      <input type="text" class="form-control " :disabled="isLook" required="required"
                             v-model="ledgerReg.Arrive">
                    </div>
                    <div class="form-group">
                      <label>审核人：</label>
                      <input type="text" class="form-control " :disabled="isLook" 
                             v-model="ledgerReg.Person">
                      <label>审核日期：</label>
                       <el-date-picker v-model="ledgerReg.Time" align="right" type="date" placeholder="选择日期"  :picker-options="pickerOptions1"  :disabled="isLook">
                      </el-date-picker>
                    </div>
                     注释:<span class="pk">*</span>为必填项
                    <div class="modal-footer" v-if="isadd || isupdata">
                      <button type="submit" class="btn btn-primary" >确定</button>
                      <button type="button" class="btn btn-default" data-dismiss="modal" id="buttonClose" @click="close">关闭
                      </button>
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
  import page from '../common/page';
  export default {
    components:{
        page // 注册分页组件
      },
      data () {
      return {
        currentPages:1,
        ledgerDictionaries:[],
        list:[], // 获取到数据之后 再执行一句 this.list = this.items  数据绑定 传list  传给分页 传items
        select:"", // 获取所有选中的数据
        isadd:true,//是否是新增
        isLook:true,//是否是查看
        isupdata:true,//是否是更新
        items :[],
        id:"",
        ledgerReg: {
          Scope: '',
          Name: '',
          Model:"",
          Type:"",
          Purpose:"",
          Place:"",
          Source:"",
          Arrive:"",
          Person:"",
          Time:""
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
      this.ledgerRegNew(this.id);
      this.ledgergetSelect();
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
      /**********
          * [1.企业id监听变化
          * @param  {[Number]} val [企业id的值]
          * @return 
        ************/
      id(val){
        this.ledgerRegNew(val);
      },
      /**********
          * [1.分页有用 监听变化
          * @param  {[Aray]} arr [分页数据的值]
          * @return 
        ************/
        'items':function(arr){
            this.items = arr;
         },
        'currentPages':function(val){
          this.select = [];
        }
    },
    methods:{
       /**********
            * [控件自带方法]
            * @param 排序表格
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
          this.ledgerRegNew(id);
        },

     /**********
            * [1.点击新建时清空所有数据
            * @param 
            * @return 
          ************/
      ledgerRegDateClear:function(){
        this.isadd = true;
        this.isLook = false;
        this.isupdata = false;
        this.ledgerReg = {
          Scope: '',
          Name: '',
          Model:"",
          Type:"",
          Purpose:"",
          Place:"",
          Source:"",
          Arrive:"",
          Person:"",
          Time:""
        }
      },
      /**********
            * [1.页面渲染请求
            * @param  {[string]} id [企业id]
            * @return 
          ************/
      ledgerRegNew:function(id){
        this.$http.get('/api/ps?TableCode=F002&COCode='+id)
              .then(function (res) {
                if(res.body.success===true){
                  this.items = res.body.data;
                  this.list = this.items;
                }
              }, function (err) {
                console.log(err)
          })
      },
      /**********
        * [1.下拉框请求
        * @param
        * @return 
      ************/
      ledgergetSelect:function(){
        this.$http.get('/api/ps?TableCode=O032').then(function(res){
          if(res.body.success===true){
            this.ledgerDictionaries=res.body.data;
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
      ledgerRegSubmit: function() {
         //在点击更新之前修改时间格式；
            this.datechange(this.ledgerReg.Time,'Time');
            this.ledgerReg["COCode"] = this.id;
            this.ledgerReg["TableCode"] = 'F002';
            var a = '/api/pi';
            var b = '/api/pu';
            var url = '';
            if (this.isadd) {
              url = a;
            }
            if(this.isupdata){
              url = b;
            }
            var formData = JSON.stringify(this.ledgerReg);
            this.$http.post(url, formData, {emulateJSON: true}).then((res) => {
                if (res.body.message === "successful") {
                      this.close();
                      this.ledgerRegNew(this.id);
                    }
                if(res.body.success===false){
                    this.$message({showClose: true,message:res.body.message,type: 'error'});
                }
            },(req) => {
              console.log("提交失败")
            });
      },
      /********
            * [1.查看按钮点击事件
            * @param  {[Number]} index [当前点击行的index]
            * @param  {[row]} row [当前点击行的所有信息]
            * @return 
          *********/
      ledgerRegLook:function(index,row){
        this.isadd = false;
        this.isLook = true;
        this.isupdata = false;
        this.ledgerReg =row;
      },
         /********
            * [1.修改按钮点击事件
            * @param  {[Number]} index [当前点击行的index]
            * @param  {[row]} row [当前点击行的所有信息]
            * @return 
          *********/
      ledgerRegUpdata:function(index,row){
        this.isadd = false;
        this.isLook = false;
        this.isupdata = true;
        this.ledgerReg =row;
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
      ledgerRegDelAll:function(arr){
        var delId = [];
        for(var key in arr){
          delId.push(arr[key].RecordCode);
        }
        this.$http.post('/api/pd', {TableCode:'F002',COCode:this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
            if (res.body.message === "successful") {
              this.$message({showClose: true,message:"数据删除成功",type: 'success'});
              this.ledgerRegNew(this.id);
            }
            if(res.body.success ===false ) {
              this.$message({showClose: true,message:"数据删除失败",type: 'error'});
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
       ledgerRegDel: function (index, row) {
            var delId = row.RecordCode;
            this.$http.post('/api/pd', {TableCode: 'F002',COCode: this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
              if(res.body.success===false){
                this.$message({showClose: true,message:"数据删除失败",type: 'error'});
              }
              if(res.body.message === "successful") {
                this.$message({showClose: true,message:"数据删除成功",type: 'success'});
                this.ledgerRegNew(this.id);
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
      close:function(){
        document.getElementById("buttonClose").click();
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
               this. ledgerReg[n] = str2.join("-");
            }
        }
      
    }

  }

</script>
<style scoped>
  .form-inline .form-control {
    display: inline-block;
    vertical-align: middle;
  }
    /*日期控件的宽度*/
  .el-date-editor.el-input{
    width: 148px;
  }
  .modal .el-date-editor.el-input{
    width: 148px;
  }
  .proname{
   
  }
  .modal-content .modal-body .TheTwoColumn .form-group label{
    width:80px;
  }
</style>
