<template>
	<!-- PollutionCharge界面 -->
	<!--排污收费-->
        <!--<router-view></router-view>-->
	<div id="enterprise" class="col-md-12">
        <!--按钮-->
         <div class="buttons mar">
                <a class="btn btn-primary btn-middle mlr" data-toggle="modal" data-target="#Overview" @click="PollutionChargeAdd()"> 新建 </a>
                <a class="btn btn-danger" @click="PollutionChargeAll(select)">批量删除</a>
         </div>
        <!--排序表格-->
         <el-table :data="romance" border :default-sort="{prop:'Name', order: 'descending'}" @selection-change="handleSelectionChange" @select-all="selectAll" @select="selectAll" align="center">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" label="序号" width="65">
            </el-table-column>
            <el-table-column prop="Name" label="企业名称" sortable>
            </el-table-column>
            <el-table-column prop="City" label="行政区" sortable width="100">
            </el-table-column>
            <el-table-column prop="Year" label="申报时间" sortable>
            </el-table-column>
            <el-table-column prop="FirstQuarterCount" label="一季度(元)" sortable >
            </el-table-column>
            <el-table-column prop="SecondQuarterCount" label="二季度(元)" sortable >
            </el-table-column>
            <el-table-column prop="ThreeQuarterCount" label="三季度(元)" sortable >
            </el-table-column>
            <el-table-column prop="FourQuarterCount" label="四季度(元)" sortable >
            </el-table-column>
            <el-table-column label="排污收费总计(元)" sortable>
                <template scope="scope">
                    {{ Number(scope.row.FirstQuarterCount)+Number(scope.row.SecondQuarterCount)+Number(scope.row.ThreeQuarterCount)+Number(scope.row.FourQuarterCount) }}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="190">
                <template scope="scope">
                  <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#Overview" @click="PollutionChargeLook(scope.$index, scope.row)">查看</button>
                  <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#Overview" @click="PollutionChargeUpdata(scope.$index, scope.row)">修改</button>
                  <button  class="btn btn-danger btn-sm" @click="PollutionChargeDelete(scope.$index, scope.row)">删除</button>
                </template>
            </el-table-column>
        </el-table>
        
         <!--模态窗-->
        <div class="modal fade" id="Overview" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" v-if="isAdd">排污收费(新增页面)</h4>
                        <h4 class="modal-title" v-if="isLook">排污收费(查看页面)</h4>
                        <h4 class="modal-title" v-if="isUpdata">排污收费(修改页面)</h4>
                    </div>
                    <form class="form-inline clearfix" @submit.prevent="PollutionChargeSubmit">
                        <div class="modal-body singleRow ml0">
                                <div class="form-group" >
                                    <label >行政区：</label>
                                    <input type="text" class="form-control" :disabled="isLook" v-model="PollutionChargeList.City"/>
                                </div>
                                <div class="form-group">
                                    <label ><span class="pk">*</span>申报时间：</label>
                                     <el-date-picker v-model="PollutionChargeList.Year" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions1"  :disabled="isLook" required="required">
                                     </el-date-picker>
                                </div>
                                <div class="form-group">
                                    <label >一季度(元)：</label>
                                    <input type="number" class="form-control" :disabled="isLook" v-model.number="PollutionChargeList.FirstQuarterCount"/>
                                </div>
                                <div class="form-group">
                                    <label >二季度(元)：</label>
                                    <input type="number" class="form-control" :disabled="isLook" v-model.number="PollutionChargeList.SecondQuarterCount"/>
                                </div>
                                <div class="form-group">
                                    <label >三季度(元)：</label>
                                    <input type="number" class="form-control" :disabled="isLook" v-model.number="PollutionChargeList.ThreeQuarterCount"/>
                                </div>
                                <div class="form-group">
                                    <label >四季度(元)：</label>
                                    <input type="number" class="form-control" :disabled="isLook" v-model.number="PollutionChargeList.FourQuarterCount"/>
                                </div>
                                注释:<span class="pk">*</span>为必填项
                        
                        </div>
                        <div class="modal-footer" v-if="!isLook">
                            <button type="submit" class="btn btn-primary submit" style="margin-right:50px;" >确定</button>
                            <button id ="addclose" type="button" class="btn btn-default" data-dismiss="modal" @click="reportclose()">关闭</button>
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
export default {
    data(){
        return {
            id:"",
            items:[],
            select:"",
            romance:[],
            isAdd:true,
            isLook:false,
            isUpdata:false,
            currentPages:1,
            PollutionChargeList:{
                Name:"",
                City:"",
                Year:"",
                FirstQuarterCount:"",
                SecondQuarterCount:"",
                ThreeQuarterCount:"",
                FourQuarterCount:""
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
        }
    },
    components:{
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
        this.getPollutionChargeNews(this.id);
      
    },
    beforeUpdate(){
        this.id=sessionStorage.getItem("ID");
        this.PollutionChargeList.Name = sessionStorage.getItem("name");
    },
    update(){},
    activated(){},
    deactivated(){},
    beforeDestroy(){},
    destroyed(){},
    watch:{
        id(val){
            this.getPollutionChargeNews(val);
        },
       'items':function(arr){
          this.items = arr;
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
        this.getPollutionChargeNews(id);
       },
      //表格的方法
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
      //新增
       PollutionChargeAdd(){
        this.isAdd = true;
        this.isLook =  false;
        this.isUpdata = false;
        this.PollutionChargeList ={
            Name:"",
            City:"",
            Year:"",
            FirstQuarterCount:"",
            SecondQuarterCount:"",
            ThreeQuarterCount:"",
            FourQuarterCount:""
        }
       },
       //查看
       PollutionChargeLook(index, row){
           this.isAdd = false;
           this.isLook =  true;
           this.isUpdata = false;
           this.PollutionChargeList = row;
       },
       //更新
       PollutionChargeUpdata(index, row){
           this.isAdd = false;
           this.isLook = false;
           this.isUpdata = true;
           this.PollutionChargeList = row;
       },
       //信息的变化
       showMsgFromChild(msg,pages){
          this.romance = msg;
          this.currentPages = pages;
       },
       //查询
       getPollutionChargeNews(id){
            this.$http.get('/api/ps?TableCode=K002&COCode='+id).then(function(res){
            this.items = res.body.data;
            this.romance = this.items;
            },function(err){
            })
       },
       //全选获取选择的信息
       selectAll(select){
         this.select = select;
       },
       //新建以及更新
       PollutionChargeSubmit(){
        this.datechange(this.PollutionChargeList.Year,'Year');
        this.PollutionChargeList["COCode"] =this.id;
        this.PollutionChargeList["TableCode"] ='K002';
           
            var a = '/api/pi';
            var b = '/api/pu';
            var url = '';
            if(this.isAdd){
                url = a;
            }
            if(this.isUpdata){
                url = b;
                delete this.PollutionChargeList.FileInfo;
            }
        var formData = JSON.stringify(this.PollutionChargeList);
        this.$http.post(url,formData,{emulateJSON:true}).then(function(res){
                if(res.body.message==="successful"){
                        this.PollutionChargeclose();
                        this.getPollutionChargeNews(this.id)
                }
                if(res.body.success ===false){
                    this.$message({showClose: true,message:res.body.message,type: 'error'});
                }
            },function(err){
            })
       },
       //自动关闭设置
       PollutionChargeclose(){
           document.getElementById("addclose").click();
       },
       //批量删除
       PollutionChargeAll(arr){
           var delId = [];
           for(var key in arr){
               delId.push(arr[key].RecordCode);
           }
           if(delId.length === 0){
                this.$message({showClose: true,message:"没有选中数据或者页签发生改变",type: 'error'});
                return false;
           }
           this.$http.post('/api/pd',{TableCode:'K002',COCode:this.id,RecordCode:delId},{emulateJSON:true}).then((res) => {
               if( res.body.message==="successful"){
                    this.getPollutionChargeNews(this.id)
               }
               if(res.body.success ===false){
                    this.$message({showClose: true,message:res.body.message,type: 'error'});
                }
            }, (err) => {
          });
      },
      //删除
      PollutionChargeDelete(index, row) {
         var delId = row.RecordCode;
         this.$http.post('/api/pd',{TableCode:'K002',COCode:this.id,RecordCode:delId},{emulateJSON:true}).then((res) => {
               if( res.body.message==="successful"){
                    this.getPollutionChargeNews(this.id)
               }
               if(res.body.success ===false){
                    this.$message({showClose: true,message:res.body.message,type: 'error'});
               }
            }, (err) => {
          });
      },
       //日期格式化
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
            this.PollutionChargeList[n] = str2.join("-");
          }
      },
    }
 }
</script>