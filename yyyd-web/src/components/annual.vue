<!-- 年度审批 -->
<!-- Examination 审批 -->
<template>
	<div id="enterprise" class="col-md-12" >
		<div class="buttons mar btn-middle">
	      	<a class="btn btn-primary" data-toggle="modal" data-target="#myModal"
	         @click="ExaminationDateClear"> 新建 </a>
      		<a class=" btn btn-danger" @click="ExaminationDelAll(select)">批量删除</a>
    	</div>
		  <!--带排序的表格-->
		 <el-table @selection-change="handleSelectionChange" :data="list" border style="width: 100%" :default-sort="{prop: 'Year', order: 'descending'}" @select-all="selectAll" @select="selectAll" >
		      <el-table-column type="selection" width="55"></el-table-column>
		      <el-table-column type="index" label="序号" width="80">
		      </el-table-column>
		      <el-table-column prop="Year" label="申报年度" sortable>
		      </el-table-column>
		      <el-table-column prop="Code" label="申报登记代码" sortable>
		      </el-table-column>
		      <el-table-column prop="Name" label="危险废物名称" sortable>
		      </el-table-column>    
		      <el-table-column label="操作" width="190">

		          <template scope="scope">
		            <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal"
		                    @click="ExaminationLook(scope.$index, scope.row)">查看
		            </button>
		            <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal"
		                    @click="ExaminationUpdata(scope.$index, scope.row)">修改
		            </button>
		            <button class="btn btn-danger btn-sm" @click="ExaminationDel(scope.$index, scope.row)">删除</button>
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
	            	<h4 class="modal-title" v-if="isadd">年度申报(新增页面)</h4>
	            	<h4 class="modal-title" v-if="isLook">年度申报(查看页面)</h4>
	            	<h4 class="modal-title" v-if="isupdata">年度申报(修改页面)</h4>
	          </div>
	          <div class="modal-body ml0">
	            <form class="form-inline clearfix .singleRow" @submit.prevent="ExaminationSubmit" >
	              	<div class="form-group">
		              	<label><span class="pk">*</span>申报年度：</label>
		                <!-- <el-date-picker v-model="Examination.Year" align="right" type="date" placeholder="选择日期" required="required" :picker-options="pickerOptions1"  :disabled="isLook">
		                 </el-date-picker> -->
		                 <el-date-picker required="required" v-model="Examination.Year" align="right"  type="year" placeholder="选择年份" :disabled="isLook"></el-date-picker>
	               </div>
	               <div class="form-group">
	                <label><span class="pk">*</span>申报登记代码：</label>
	                <input type="text" required="required" class="form-control" :disabled="isLook" v-model="Examination.Code">
	               </div>
	              <div class="form-group">
	                <label><span class="pk">*</span>危险废物名称：</label>
	                <input type="text" class="form-control " :disabled="isLook" required="required" 
	                       v-model="Examination.Name">
	              </div>
	              <div class="form-group">
	                <label><span class="pk">*</span>危险废物类别：</label>

	                <input type="text" class="form-control " :disabled="isLook" required="required" 
	                       v-model="Examination.Type">
	              </div>
	              <div class="form-group">
	                <label><span class="pk">*</span>产生工序：</label>
	                <input type="text" class="form-control " :disabled="isLook"  required="required"
	                       v-model="Examination.Procedure">
	              </div>
	               <div class="form-group">
	                <label><span class="pk">*</span>年产量（吨）：</label>
	                <input type="text" class="form-control" :disabled="isLook" required="required" v-model="Examination.Count">
	              </div>
	              <div class="form-group danger">
	                <label>危险物有害性：</label>
	                <!-- <div class="moveing">
	                	<span v-for="item in checkarr">
	                		<input type="checkbox" :value="item.Name" @click="getChecked" v-model="item.checked">{{item.Name}}
	                	</span>
	                </div> -->
	                <template>
					  <el-checkbox-group v-model="checkList" class="checkboxlist">
							<span v-for="item in checkarr">
								<el-checkbox :label="item" :disabled="isLook"  @change="handleCheckedCitiesChange"></el-checkbox>
							</span>
					  </el-checkbox-group>
					</template>
	              </div>
	               <div class="form-group">
	                <label><span class="pk">*</span>存储能力（吨）：</label>
	                <input type="text" class="form-control" :disabled="isLook" required="required"
	                       v-model="Examination.Ability">
	              </div>
	               <div class="form-group">
	                <label><span class="pk">*</span>危险物储存地点：</label>
	                <input type="text" class="form-control" :disabled="isLook"  required="required"
	                       v-model="Examination.Place">
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
	export default{
		components:{
	      page // 注册分页组件
	    },
	    data(){
	    	return{
	    		currentPages:1,
	    		list:[], // 获取到数据之后 再执行一句 this.list = this.items  数据绑定 传list  传给分页 传items
			    select:"", // 获取所有选中的数据
			    isadd: true,//是否是新增
			    isLook: true,//是否是查看
			    isupdata: true,//是否是更新
			    id: "",
			    checkarr:"", //多选框数组对象
			    checkList:[], //多选框数组
			    items: [],
			    multipleSelection: [],
			    Examination:{
			    	Year:"",
			    	Code:"",
			    	Type:"",
			    	Name:"",
			    	Procedure:"",
			    	Count:"",
			    	Nature:[],
			    	Ability:"",
			    	Place:""
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
	      this.ExaminationNew(this.id);
	      this.getCheckBox();
	    },
	    beforeUpdate(){
	      this.id = sessionStorage.getItem("ID");
	      // this.Examination.companyname=sessionStorage.getItem("name");
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
	        this.ExaminationNew(val);
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
		        * [1.单选框点击事件
		        * @param 
		        * @return 
		      ************/
	 		// getChecked(){
	 		// 	// return this.checkarr.filter(item => item.checked).map(item => item.value)
	 		// 	return  this.checkarr.filter(item => item.checked).map(item => item.value)
	 		// 	// console.log(this.checkarr);
	 			

	 		// },
	 		/**********
	 			@param 多选框事件
		        * event 多选框参数
		        * @param 
		      ************/
	 		handleCheckedCitiesChange(event){
	 			// console.log(event.target._value);
	 			// let checkarrListName=event.target._value;
	 			// console.log(checkarrListName);
	 			// console.log(this.checkList,44444)s
	 			
	 		},
	 		
	 		/**********
		        * @param [控件自带方法]
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
		        this.ExaminationNew(id);
		    },
		     /**********
		        * [1.点击新建时清空所有数据
		        * @param 
		        * @return 
		      ************/
	    	ExaminationDateClear: function () {
		        this.isadd = true;
		        this.isLook = false;
		        this.isupdata = false;
		        this.checkList=[];
		        this.Examination = {
		         	Year:"",
			    	Code:"",
			    	Type:"",
			    	Name:"",
			    	Procedure:"",
			    	Count:"",
			    	Nature:[],
			    	Ability:"",
			    	Place:""
		        }
	      	},
	      	/**********
		        * [1.下拉框渲染请求
		        * @param
		        * @return 
		      ************/
	      	getCheckBox:function(){
	      		this.$http.get('/api/ps?TableCode=O004').then(function(res){
	      			if(res.body.success===true){
	      				var arr=[];
	      				for(var i=0;i<res.body.data.length;i++){
	      					arr.push(res.body.data[i]["Name"])
	      				}
	      				this.checkarr=arr;
	      			}
	      		},function(err){
	      			console.log(err);
	      		})

	      	},
	      	/**********
		        * [1.页面渲染请求
		        * @param  {[string]} id [企业id]
		        * @return 
		      ************/
		    ExaminationNew: function (id) {
		        this.$http.get('/api/ps?TableCode=E002&COCode='+id)
		          .then(function (res) {
		            if(res.body.success===true){
		              this.items = res.body.data;
		              this.list = this.items;
		              for(var i=0;i<this.items.length;i++){
		              	this.checkList=res.body.data[i].Nature.split(",");
		              }
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
		    ExaminationSubmit: function () {
		        //在点击更新之前修改时间格式；
		        // this.datechange(this.Examination.Year,'Year');
		        var Year = JSON.stringify(this.Examination["Year"]).slice(1,5);
		        this.Examination["Year"] = Year;
		        this.Examination["COCode"] = this.id;
		        this.Examination["TableCode"] = 'E002';
		        this.Examination["Nature"]=this.checkList;
		        var a = '/api/pi';
		        var b = '/api/pu';
		        var url = '';
		        if (this.isadd) {
		          url = a;
		        }
		        if(this.isupdata){
		          url = b;
		        }
		        var formData = JSON.stringify(this.Examination);
		        this.$http.post(url, formData, {emulateJSON: true}).then((res) => {
		            if (res.body.message === "successful") {
		               		this.close();
		                  	this.ExaminationNew(this.id);
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
		    ExaminationLook: function (index, row) {
		        this.isadd = false;
		        this.isLook = true;
		        this.isupdata = false;
		        this.Examination = row;
		    },
		    /********
		        * [1.修改按钮点击事件
		        * @param  {[Number]} index [当前点击行的index]
		        * @param  {[row]} row [当前点击行的所有信息]
		        * @return 
		      *********/
		     ExaminationUpdata: function (index, row) {
		        this.isadd = false;
		        this.isLook = false;
		        this.isupdata = true;
		        this.Examination = row;
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
		   ExaminationDelAll(arr){
		       var delId = [];
	           for(var key in arr){
	               delId.push(arr[key].RecordCode);
	           }
		       this.$http.post('/api/pd', {TableCode: 'E002',COCode:this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
		          if(res.body.message === "successful") {
		          	this.$message({showClose: true,message:"数据删除成功",type: 'success'});
		            this.ExaminationNew(this.id);
		           }
		          if(res.body.success===false){
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
		    ExaminationDel: function (index, row) {
		        var delId = row.RecordCode;
		        this.$http.post('/api/pd', {TableCode: 'E002',COCode: this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
		        	if(res.body.success===false){
		        		this.$message({showClose: true,message:"数据删除失败",type: 'error'});
		        	}
		          	if(res.body.message === "successful"){
		          		this.$message({showClose: true,message:"数据删除成功",type: 'success'});
		             	this.ExaminationNew(this.id);
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
		            this.Examination[n] = str2.join("-");
		        }
		    }

	   }
	}
</script>
<style scoped> 
	.TheTwoColumn .form-group label {
    	width: 110px;
	}
	.form-inline .form-control {
	    display: inline-block;
	    vertical-align: middle;
	    width: 60%;
	}
	/*日期控件的宽度*/
  .el-date-editor.el-input{
    width: 340px;
  }
  .modal .el-date-editor.el-input{
    width: 340px;
  }
  .moveing{
  	margin-right:50px;
  	position: absolute;
	left: 108px;
    top: -1px;
  }
  .danger{
  	position:relative;
  }
  label {
	 display: inline-block;
	 max-width: 100%;
	 margin-bottom: 5px;
	 font-weight: 700;
	 width: 102px;
	}
	.checkboxlist{
		position: absolute;
		left:106px;
		top:2px;
		font-size: 12px;
		color:#657183;
	}
	.el-checkbox{
		width:68px;
	}
</style>