<template>
  <!--生产概况-->
  <div id="enterprise" class="col-md-12">
    <div class="mar">
      <div class="buttons mar">
        <a class="btn btn-primary btn-middle" data-toggle="modal" data-target="#Overview" @click="psAdd"> 新建 </a>
        <a class="btn btn-danger" @click="OverviewDelAll(select)">批量删除</a>
      </div>

      <div class="modal fade" id="Overview" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title" v-if="isAdd">生产概况(新增页面)</h4>
              <h4 class="modal-title" v-if="isLook">生产概况(查看页面)</h4>
              <h4 class="modal-title" v-if="isUpdata">生产概况(修改页面)</h4>
            </div>
            <div class="modal-body ml0">
              <form class="form-inline clearfix" @submit.prevent="addsubmit">
                <div class="form-group">
                  <label><span class="pk">*</span>主要产品：</label>
                  <input type="text" :disabled="isLook" required="required" class="form-control" v-model="Overview.Product" require="require"/>
                </div>

                <div class="form-group">
                  <label >设计产量/年产规模：</label>
                  <input type="text" :disabled="isLook" class="form-control" v-model="Overview.AnnualScale" />
                </div>
                <div class="form-group">
                  <label>主要原辅料名称：</label>
                  <input type="text" :disabled="isLook" class="form-control"  v-model="Overview.RawMaterialName" />
                </div>
                <div class="form-group">
                  <label>年耗量：</label>
                  <input type="text" :disabled="isLook" class="form-control"  v-model="Overview.YearlyConsumption"/>
                </div>
                <div class="form-group">
                  <label >消耗水：</label>
                  <input type="text" :disabled="isLook" class="form-control"  v-model="Overview.Water"/>
                </div>
                <div class="form-group">
                  <label >消耗电：</label>
                  <input type="text" :disabled="isLook" class="form-control"  v-model="Overview.Electricity"/>
                </div>
                <div class="form-group">
                  <label >消耗煤：</label>
                  <input type="text" :disabled="isLook" class="form-control"  v-model="Overview.Coal"/>
                </div>
                <div class="form-group">
                  <label >消耗气：</label>
                  <input type="text" :disabled="isLook" class="form-control"  v-model="Overview.Gas"/>
                </div>

                <div class="modal-footer" v-if="!isLook">
                  注释:<span class="pk">*</span>为必填项
                  <button type="submit" class="btn btn-primary" @click="btnClick">确定</button>
                  <button type="button" class="btn btn-default" data-dismiss="modal" id="buttonClose" @click="close">关闭
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!--带排序的表格-->
      <el-table @selection-change="handleSelectionChange" :data="list" border style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}" @select-all="selectAll" @select="selectAll" >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="Product" label="主要产品" sortable width="180">
        </el-table-column>
        <el-table-column prop="AnnualScale" label="设计产量/年产规模" sortable width="180">
        </el-table-column>
        <el-table-column prop="RawMaterialName" label="主要原辅料名称">
        </el-table-column>
        <el-table-column prop="YearlyConsumption" label="年耗量" sortable width="160">
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template scope="scope">
            <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#Overview"
                    @click="OverviewLook(scope.$index, scope.row)">查看
            </button>
            <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#Overview" @click="psUpdata(scope.$index, scope.row)">修改</button>
            <button  class="btn btn-danger btn-sm" @click="OverviewDel(scope.$index, scope.row)">删除</button>
          </template>
        </el-table-column>
      </el-table>

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
        list:[], // 获取到数据之后 再执行一句 this.list = this.items  数据绑定 传list  传给分页 传items
        select:"", // 获取所有选中的数据
        datalist:[],
        fileurl:[],
        code:"",
        isChecked:false,
        multipleSelection: [],
        isAdd:true,
        isLook:true,
        isUpdata:true,
        items :[],
        id:"",
        checkedNames:[],//checkbox 数组
        checkAll: false,//全选
        Overview: {
          Product:"",
          AnnualScale:"",
          RawMaterialName:"",
          YearlyConsumption:"",
          Water:"",
          Electricity:"",
          Coal:"",
          Gas:""
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
      'currentPages':function(val){
        this.select = [];
      }
    },
    methods:{
      btnClick(){

        this.$refs.upload.clearFiles();
      },
      handleSelectionChange(val) {
        val.forEach(item => {
          this.checkedNames.push(item.RecordCode);
        })
        this.multipleSelection = this.checkedNames.toString();
      },
      ccc(){
        var id = this.id;
        this.getOverview(id);
      },
      psAdd:function(){
        this.isAdd =true;
        this.isLook = false;
        this.isUpdata= false;
        this.Overview = {
          Product:"",
          AnnualScale:"",
          RawMaterialName:"",
          YearlyConsumption:"",
          Water:"",
          Electricity:"",
          Coal:"",
          Gas:""
        }
      },
      psUpdata:function(index, row){
        this.isAdd =false;
        this.isLook = false;
        this.isUpdata=true;
        this.Overview = row;
      },
      getOverview:function(id){
        //局部发送ajax
        this.$http.get('/api/ps?TableCode=A007&COCode='+id)
          .then(function(res){
            this.items = res.body.data;
            this.list = this.items;
          },function(err){
            console.log(err)
          })
      },
      addsubmit:function(event){
        this.Overview["COCode"] =this.id;
        this.Overview["TableCode"] ='A007';
        var formData = JSON.stringify(this.Overview);
        var a = '/api/pi';
        var b = '/api/pu';
        var url = '';
        if(this.isAdd){
          url = a;
        }
        if(this.isUpdata){
          url = b;
        }
        this.$http.post(url,formData,{emulateJSON:true}).then(function(res){
          if(res.body.message==="successful"){
            this.close();
            this.getOverview(this.id);
          }
          if(res.body.success ===false){
            console.log(res.body.message);
            this.$message({showClose: true,message:res.body.message,type: 'error'});
          }
        },function(err){
          console.log(err)
        })
      },
      selectAll(selection){
        this.select = selection;
      },
      OverviewDelAll:function(arr){
        var delId = [];
        for(var key in arr){
          delId.push(arr[key].RecordCode);
        }

        if(delId.length === 0){
          this.$message({showClose: true,message:"没有选中数据或者页签发生改变",type: 'error'});
          return false;
        }

        this.$http.post('/api/pd', {TableCode: 'A007',COCode:this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
          if (res.body.message === "successful") {
            this.getOverview(this.id);
          }}, (req) => {
          console.log("删除失败")
        });
      },
      //查看
      OverviewLook:function (index, row) {
        this.isAdd = false;
        this.isLook = true;
        this.isUpdata = false;
        this.Overview = row;
      },
      //删除
      OverviewDel: function (index, row) {
        var delId = row.RecordCode;
        this.$http.post('/api/pd', {TableCode: 'A007',COCode: this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
          if (res.body.message === "successful") {
            this.getOverview(this.id);
          }}, (req) => {
          console.log("删除失败")
        });
      },
      //点击close 关闭时
      close: function () {
        document.getElementById("buttonClose").click();
      },
      //分页
      showMsgFromChild(msg,pages){
        this.list = msg;
        this.currentPages = pages;
      }
    }
  }
</script>
<style scoped>
  .modal-body .form-group label{
    width:115px;
  }
  .modal-body .form-group{
    display: block;
  }
  .modal-body .form-group input{
    width: 300px;
    margin-bottom: 10px;
  }
  .modal-body .groupbtn{
    margin-top: 20px;
    text-align: center;
  }
  .mar .table>tbody>tr>td{
    padding: 0px;
    line-height: 40px;
    height: 40px;
  }
  .mar .buttons{
    text-align: right;
  }
</style>
