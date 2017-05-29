<template>
<!--总量减排指标-->
<!-- totalReduction -->
<div id="enterprise" class="col-md-12">
    <div class="buttons mar btn-middle">
      <a class="btn btn-primary" data-toggle="modal" data-target="#myModal"
         @click="totalReductionDateClear">新建 </a>
      <a class=" btn btn-danger" @click="totalReductionDelAll(select)">批量删除</a>
    </div>
	<!--带排序的表格-->
    <el-table @selection-change="handleSelectionChange" :data="list" border style="width:100%;" :default-sort="{prop: 'Year', order: 'descending'}" @select-all="selectAll" @select="selectAll" >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="序号">
      </el-table-column>
      <el-table-column prop="Year" label="年度" sortable>
      </el-table-column>
      <el-table-column prop="TotalCount" label="排放总量" sortable>
      </el-table-column>
      <el-table-column prop="Source" label="数据来源" sortable>
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
                    @click="totalReductionLook(scope.$index, scope.row)">查看
            </button>
            <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal"
                    @click="totalReductionUpdata(scope.$index, scope.row)">修改
            </button>
            <button class="btn btn-danger btn-sm" @click="totalReductionDel(scope.$index, scope.row)">删除</button>
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
            <h4 class="modal-title" v-if="isadd">总量减排指标(新增页面)</h4>
            <h4 class="modal-title" v-if="isLook">总量减排指标(查看页面)</h4>
            <h4 class="modal-title" v-if="isupdata">总量减排指标(修改页面)</h4>
          </div>
          <div class="modal-body ml0">
            <form class="form-inline clearfix singleRow" @submit.prevent="totalReductionSubmit" >
              <div class="form-group">
                <label><span class="pk">*</span>年度：</label>
               <!--  <el-date-picker v-model="totalReduction.Year" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions1"  :disabled="isLook" required="required">
                </el-date-picker> -->
                <el-date-picker required="required" v-model="totalReduction.Year" align="right"  type="year" placeholder="选择年份" :disabled="isLook"></el-date-picker>
               </div>
              <div class="form-group">
                <label>排污收费的核定量：</label>
                <input type="text" class="form-control mar_r15" :disabled="isLook"
                       v-model="totalReduction.Count">
              </div>
              <div class="form-group">
                <label>在线监控的日数据：</label>
                <input type="text" class="form-control mar_r15" :disabled="isLook"
                       v-model="totalReduction.DayData">
              </div>
              <div class="form-group">
                <label>排放总量：</label>
                <input type="text" class="form-control mar_r15" :disabled="isLook"
                       v-model="totalReduction.TotalCount">
              </div>
              <div class="form-group">
                <label>数据来源：</label>
                <input type="text" class="form-control mar_r15" :disabled="isLook"
                       v-model="totalReduction.Source">
              </div>
              <div class="form-group">
                <label>减排类型：</label>
                <input type="text" class="form-control mar_r15" :disabled="isLook"
                       v-model="totalReduction.Type">
              </div>
              <div class="form-group">
                <label>减排类型：</label>
                <input type="text" class="form-control mar_r15" :disabled="isLook"
                       v-model="totalReduction.ReduceCount">
              </div> 
              注释:<span class="pk">*</span>为必填项
              <div class="form-group">
                <label>附&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;件：</label>
                <!-- 新增以及修改 -->
                <div v-if="isadd ||isupdata">
                  <uploadFile ref="upload" @end="drawing" @listenState="listenstatus" :childUrl="fileurl" :codenum="codeNumber"></uploadFile>
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
    data (){
    	return {
          currentPages:1,
    		  list:[], // 获取到数据之后 再执行一句 this.list = this.items  数据绑定 传list  传给分页 传items
	        select:"", // 获取所有选中的数据
	        isadd: true,//是否是新增
	        isLook: true,//是否是查看
	        isupdata: true,//是否是更新
	        items :[],
	        id:"",
	         ///////////////////////文件上传需要////////////////////////////////////////
	        isChecked:false,//子组件点击上传按钮之后的状态
	        indexNum:"", //点击修改的索引值
	        codeNumber:"", //code
	        coded:"",  //文件编号
	        files:"", //修改循环列表
	        ///////////////////////////////////////////////////////////////
	        checkAll: false,//全选
	        fileItems:[], //附件上传列表
	        downadress:'', //下载地址
	        datalist:[],
	        fileurl:[], //路由子组件数组
	        state:'C006',
	        code:"",
	        multipleSelection: [],
	        totalReduction:{
	        	Year:"",
	        	Count:"",
	        	DayData:"",
	        	TotalCount:"",
	        	Source:"",
	        	Type:"",
	        	ReduceCount:""
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
      this.totalReductionNew(this.id);
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
          this.totalReductionNew(val);
        },
      //分页有用 监听变化
      'items':function(arr){
          this.items = arr;
       },
      'codenum':function(val){
        this.codenum=val;
        this.totalReductionSubmit(val);   
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
	        this.totalReductionNew(id);
	    },
	     /**********
		        * [1.点击新建时清空所有数据
		        * @param 
		        * @return 
		 ************/
		totalReductionDateClear(){
		 	this.isadd = true;
	        this.isLook = false;
	        this.isupdata = false;
	        this.$refs.upload.clearFiles();
	        this.totalReduction={
	        	Year:"",
	        	Count:"",
	        	DayData:"",
	        	TotalCount:"",
	        	Source:"",
	        	Type:"",
	        	ReduceCount:""
	        }
		},
		/**********
		   * [1.页面渲染请求
		   * @param  {[string]} id [企业id]
		   * @return 
		************/
		totalReductionNew(id){
			// this.fileurl数组第0项为路由，第1项为id，第2项为类型,第3项为标识RecordCode
      this.fileurl=[this.$route.path,id,this.state];
			this.$http.get('/api/psf?TableCode=C006&COCode='+id)
		        .then(function (res) {
		            if(res.body.success===true){
		              this.items = res.body.data;
		              this.list = this.items;
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
		totalReductionSubmit(val){
			//在点击更新之前修改时间格式；
			// this.datechange(this.totalReduction.Year,'Year');
      var Year = JSON.stringify(this.totalReduction["Year"]).slice(1,5); 
			console.log(this.id,9696)
			this.totalReduction["COCode"] = this.id;
      this.totalReduction["Year"] = Year;
	        this.totalReduction["TableCode"] = 'C006';
	        var a = '/api/pi';
	        var b = '/api/pu';
	        var url = '';
	        if (this.isadd) {
	          url = a;
	        }
	        if(this.isupdata){
	          url = b;
	          delete this.totalReduction.FileInfo;
	        }
	        var formData = JSON.stringify(this.totalReduction);
	        this.$http.post(url, formData, {emulateJSON: true}).then((res) => {
	             if (res.body.message === "successful") {
	                if(this.isadd){
	                   this.codeNumber=res.body.data[0].RecordCode;
	                }
	                if(this.isupdata){
	                   this.codeNumber=this.indexNum;
	                }
	                if(val&&this.isChecked==true){
	                  this.$refs.upload.filePost();
	                }
	                if(val&&this.isChecked==false){
	                  this.close();
	                  this.totalReductionNew(this.id);
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
	        this.totalReductionNew(this.id);
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
      	totalReductionLook:function(index,row){
      		this.isadd = false;
	        this.isLook = true;
	        this.isupdata = false;
	        this.files=row.FileInfo;
	        this.totalReduction = row;
      	},
      	/********
        * [1.修改按钮点击事件
        * @param  {[Number]} index [当前点击行的index]
        * @param  {[row]} row [当前点击行的所有信息]
        * @return 
      	*********/
      	totalReductionUpdata:function(index,row){
      		this.isadd = false;
	        this.isLook = false;
	        this.isupdata = true;
	        this.totalReduction = row;
	        this.files=row.FileInfo;
	        this.$refs.upload.clearFiles();
	        this.indexNum=row.RecordCode;
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
      	totalReductionDelAll:function(arr){
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
	        this.$http.post('/api/pd', {TableCode: 'C006',COCode:this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
	           if(res.body.message === "successful") {
                if(delIdAll.length>0){
                  this.del(delIdAll);
                }
	              this.totalReductionNew(this.id);
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
      	totalReductionDel: function (index, row) {
        var delId = row.RecordCode;
        this.$http.post('/api/pd', {TableCode: 'C006',COCode: this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
          if (res.body.message === "successful") {
             //独立的删除附件方法 如果有附件
             if(row.FileInfo.length>0){
                 this.del(row.FileInfo[0].RecordCode);
             }
             this.totalReductionNew(this.id);
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
	          // console.log("删除成功！");
	          if(res.body.success===true){
	            // console.log(123456789);
	            // this.(this.id);
	          } 
	        },function(err){

	        })
	     },
	        //点击close 关闭时
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
            this.totalReduction[n] = str2.join("-");
          }
      	}
    }
}
</script>
<style scoped>

</style>
