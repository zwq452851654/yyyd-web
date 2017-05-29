<!-- 工艺流程图 -->
<!-- Technological -->
<template>
	<div id="enterprise" class="col-md-12" >
		  <div class="buttons mar btn-middle">
	      <a class="btn btn-primary" data-toggle="modal" data-target="#myModal"
	         @click="TechnologicalDateClear"> 新建 </a>
	      <!-- <a class=" btn btn-danger" @click="TechnologicalDelAll(select)">批量删除</a> -->
    	</div>
    	<!--带排序的表格-->
	    <el-table :data="list" border :default-sort="{prop:'ProjectName', order: 'descending'}"  align="center" @selection-change="handleSelectionChange" @select-all="selectAll" @select="selectAll">
	      <el-table-column type="selection" width="55"></el-table-column>
	      <el-table-column type="index" label="序号" width="80">
	      </el-table-column>
	      <el-table-column  label="公司详细名称">
	     	<template  scope="props">
	     		<span>{{companyName}}</span>
	     	</template>
	      </el-table-column>

	      <el-table-column label="主要污染治理工艺示意图">
	            <template scope="props">
								 <div v-if="props.row['主要污染治理工艺示意图']">
								 		<el-tag v-for="tag in props.row['主要污染治理工艺示意图'].FileInfo" type="primary" class="FileInfo">
		                  <a v-bind:href="'/api/fu?path='+tag.Path+'/'+tag.TrueName">{{tag.FileName}}</a>
	            		  </el-tag>
								  </div>

	            	
	            </template>
	      </el-table-column>
          <el-table-column label="生产工艺示意图">
	            <template scope="props">
        	
		                <div v-if="props.row['生产工艺示意图']">
		                	<el-tag  v-for="tag in props.row['生产工艺示意图'].FileInfo" type="primary" class="FileInfo">
			                  <a v-bind:href="'/api/fu?path='+tag.Path+'/'+tag.TrueName">{{tag.FileName}}</a>
			                </el-tag>
		                </div>	 
	            </template>
	      </el-table-column>
	        <el-table-column label="操作" width="200">
	          <template scope="scope">
	            <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal"
	                    @click="TechnologicalUpdata(scope.$index, scope.row)">修改
	            </button>
	            <button class="btn btn-danger btn-sm" @click="TechnologicalDel(scope.$index, scope.row)">删除</button>
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
		            <h4 class="modal-title" v-if="isadd">工艺流程图(新增页面)</h4>
		            <h4 class="modal-title" v-if="isLook">工艺流程图(查看页面)</h4>
		            <h4 class="modal-title" v-if="isupdata">工艺流程图(修改页面)</h4>
	          	</div>
	        	<div class="modal-body ml0">
		            <form class="form-inline clearfix TheTwoColumn" @submit.prevent="TechnologicalSubmit" >
		   				<div class="table-responsive">
						  <table class="table">
							<tr>
							  	<td>
							  		<label><span class="pk">*</span></label>
					                <template>
									  <el-select v-model="value" @change="valueChange" placeholder="请选择示意图类型" required="required" no-data-text="主要污染治理工艺示意图">
									    <el-option
									      v-for="item in options"
									      :key="item.value"
									      :label="item.label"
									      :value="item.value">
									    </el-option>
									  </el-select>
									</template>
							  	</td>
							    <td>
									<div v-show="isadd ||isupdata">
					                  <uploadFile ref="upload" @end="drawing"   @listenState="listenstatus"  :childUrl="fileurl" :codenum="codeNumber" ></uploadFile>
					                   <ul v-if ="isupdata" class="filesUrl">
					                    <li v-for="item in files" :id="item.RecordCode" ><span class="toadded">{{item.FileName}}</span><span class="deltate"  @click="deltaed(item.Path,item.FileName,item.RecordCode)">删除</span></li>
					                  </ul>
					                </div>
							    </td>
							</tr>
						  </table>
						</div>
		              	注释:<span class="pk">*</span>为必填项
		              	<div class="modal-footer">
		                  <button type="submit" class="btn btn-primary">确定</button>
		                  <button type="button" class="btn btn-default" data-dismiss="modal" id="buttonClose" @click="close">关闭
		                  </button>
				      	</div>
		            </form>
	          </div>
	        </div>
	      </div>
	    </div>
	     <!--分页-->
	    <!-- <page :number="10" :totalLength="items.length" :getDatas="items" v-on:listenToChildEvent="showMsgFromChild" /> -->
	</div>
</template>
<script>
	import Bus from '../vuex/bus.js';
  	import uploadFile from '../common/uploadFile';
 	// import page from '../common/page';
 	export default{
 		components:{
	      uploadFile,
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
		        items: [],
		        selectValueTrue1:false,
		        selectValueTrue2:false,
		        selectValue:"主要污染治理工艺示意图",
		        ///////////////////////文件上传需要////////////////////////////////////////
		        isChecked:false,//子组件点击上传按钮之后的状态
		        indexNum:"", //点击修改的索引值
		        fileItems:[], //附件上传列表
		        downadress:'', //下载地址
		        datalist:[],
		        fileurl:[],
		        codeNumber:"", //code
		        state:'C005',  //企业编号
		        files:"", //修改循环列表
		        ///////////////////////////////////////////////////////////////
		        multipleSelection: [],
		        Dategory:"工艺流程图",
		        Technological:{
		        	Name:""
		        },
		        value: '',
		        options: [{
		          value: '主要污染治理工艺示意图',
		          label: '主要污染治理工艺示意图'
		        }, {
		          value: '生产工艺示意图',
		          label: '生产工艺示意图'
		        }]
 			}
 		},
 		beforeCreate(){},
	    beforeMount(){},
	    mounted(){},
	    created(){
	      Bus.$on('getTarget', ccc => {
	        this.ccc()
	      });
	      this.TechnologicalNew(this.id);
	    },
	    beforeUpdate(){
	      this.id = sessionStorage.getItem("ID");
	      this.companyName=sessionStorage.getItem("name");
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
	          this.TechnologicalNew(val);
	        },
		    //分页有用 监听变化
		    'items':function(arr){
		        this.items = arr;
		    },
	      	'codenum':function(val){
		        this.codenum=val;
		        this.TechnologicalSubmit(val);
	      	 }
	    }, 
	    methods:{
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
		    handleSelectionChange(val) {
		        this.multipleSelection = val;
		    },
		    ccc(){
		        var id = this.id;
		        this.TechnologicalNew(id);
		    },
			/**********
	        * [1.点击新建时清空所有数据
	        * @param 
	        * @return 
		      ************/
		    TechnologicalDateClear: function () {
		        this.isadd = true;
		        this.isLook = false;
		        this.isupdata = false;
		        this.$refs.upload.clearFiles();
		        this.Technological = {
		         	Name:""
		        }
		    },
		    /**********
            * [1.页面渲染请求
            * @param  {[string]} id [企业id]
            * @return 
  			************/

				TechnologicalNew:function(id) {
						// this.fileurl数组第0项为路由，第1项为id，第2项为类型,第四项为标识RecordCode
						this.fileurl=[this.$route.path,id,this.state];
						this.$http.get('/api/psf?TableCode=C005&COCode='+id)
							.then(function (res) {
								if(res.body.success===true){
										var data = res.body.data;
										var obj = {};
										var arr = [];
										console.log(data);
										if(res.body.data.length==0){
												this.list=[];
												return;
										}
										for(var k in data){
												obj[data[k].Name] = data[k];
										}
										arr.push(obj);
										this.list = arr;
										console.log(this.list);
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
		    TechnologicalSubmit: function (val) {
		        //在点击更新之前修改时间格式；
		        var a = '/api/pi';
		        var b = '/api/pu';
		        var url = '';
		        if(this.isadd){
		        	this.Technological["COCode"] = this.id;
			        this.Technological["TableCode"] = "C005";
			        this.Technological["Name"]=this.value;
		          	url = a;
		          	var formData = JSON.stringify(this.Technological);
	        		this.$http.post(url, formData, {emulateJSON: true}).then((res) => {
			            if(res.body.message === "successful") {
			                this.codeNumber=res.body.data[0].RecordCode;
			                if(val&&this.isChecked==true){
			                  	this.$refs.upload.filePost();
			                }
			                if(val&&this.isChecked==false){
			                  this.close();
			                  this.TechnologicalNew(this.id);
			                }
			             }
			            if(res.body.success===false){
			                this.$message({showClose: true,message:res.body.message,type: 'error'});
			            }
		        	})
		        }
		        if(this.isupdata){
		          url = b;
		          if(this.selectValue==="主要污染治理工艺示意图"){
						this.codeNumber=this.Technological['主要污染治理工艺示意图'].RecordCode;
	            	}else if(this.selectValue==="生产工艺示意图"){
	            		this.codeNumber=this.Technological['生产工艺示意图'].RecordCode;	
	            	}
	            	if(val&&this.isChecked==true){
			            this.$refs.upload.filePost();
			        }
			        if(val&&this.isChecked==false){
			           this.close();
			           this.TechnologicalNew(this.id);
			        }
		        }
		    },
		    /********
	        * [1.子组件异步完成，并完成列表渲染和关闭
	        * @param 
	        * @return 
	      	*********/
		    drawing(){
		        this.close();
		        this.TechnologicalNew(this.id);
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
	        * [1.修改按钮点击事件
	        * @param  {[Number]} index [当前点击行的index]
	        * @param  {[row]} row [当前点击行的所有信息]
	        * @return 
	      	*********/
	     	TechnologicalUpdata: function (index, row) {
		        this.isadd = false;
		        this.isLook = false;
		        this.isupdata = true;
		        this.Technological = row;
		        this.$refs.upload.clearFiles();
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
	            * [1.单行删除
	            * @param  {[Number]} index [当前点击行的index]
	            * @param  {[row]} row [当前点击行的所有信息]
	            * @return 
	        *********/  
	    	TechnologicalDel: function (index, row) {
            var delId1 =[];
						var delFile = []
						for(var k in row){
								delId1.push(row[k].RecordCode)
								delFile.push(row[k].FileInfo[0].RecordCode)
						}
						if(delId1.length === 0){
								return;
						}
						this.$http.post('/api/pd', {TableCode: 'C005',COCode: this.id,RecordCode:delId1}, {emulateJSON: true}).then((res) => {
			        if(res.body.message === "successful") {
			             //独立的删除附件方法 如果有附件
			            if(delFile.length>0){
			                this.del(delFile);
			            }
			            this.TechnologicalNew(this.id);

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
	        * [1.操作栏删除按钮
	        * @param  {[String]} adressed [附件的地址]
	        * @param  {[String]} named [附件的名字]
	        * @param  {[String]} recorded [附件的RecordCode]
	        * @return 
	      *********/
	      	del:function(recorded){
	      		for(var i=0;i<recorded.length;i++){
	      			this.$http.post("/api/pd",{TableCode:'M001',COCode:this.id,RecordCode:recorded[i]}).then(function(res){
		            if(res.body.success === true){
		                  this.$message({showClose: true,message:"数据删除成功",type: 'success'});
		            }
		            else{
		                 this.$message({showClose: true,message:"数据删除失败",type: 'error'});
		            }
	       			},function(err){console.log(err);})
	      		}
	         	
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
		        * [1.下拉框点击事件
		        * @param  {[string]} val [点击的值]
		        * @return 
		    *********/
		    valueChange(val){
		    	this.selectValue=val;
		    	if(this.selectValue==="主要污染治理工艺示意图"){
				       if(this.list[0]['主要污染治理工艺示意图']){
								 	this.files=this.list[0]['主要污染治理工艺示意图'].FileInfo
							 }
							 else{
								 this.files = [];
							 }
							console.log(this.files);
						
	        }
					 else if(this.selectValue==="生产工艺示意图"){
								if(this.list[0]['生产工艺示意图']){
										this.files=this.list[0]['生产工艺示意图'].FileInfo;
								}else{
								 this.files = [];
							 }
	            	console.log(9876,this.files)
	            }
		    }
	    } 
 	}
</script>
<style scoped>
	.table-responsive .table tr td {
		border:1px solid #E5E5E5;
		padding:10px;
	}
	.el-select {
	    display: inline-block;
	    position: relative;
	    width: 216px;
	}
	.table {
	    width: 100%;
	    max-width: 100%;
	    margin-bottom: 20px;
	    height: 150px;
	}
</style>