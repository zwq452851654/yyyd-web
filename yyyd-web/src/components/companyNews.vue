<!-- complaint -->
<!-- 信访投诉新建页面 -->
<template>
	<div id="enterprise" class="col-md-12" >
		 <div class="buttons mar btn-middle">
	      <a class="btn btn-primary" data-toggle="modal" data-target="#myModal"
	         @click="companyNewsDateClear"> 新建 </a>
	      <a class=" btn btn-danger" @click="companyNewsDelAll(select)">批量删除</a>
    	</div>
    	<!--带排序的表格-->
	    <el-table :data="list" border :default-sort="{prop:'ProjectName', order: 'descending'}"  align="center" @selection-change="handleSelectionChange" @select-all="selectAll" @select="selectAll">
	      <el-table-column type="selection" width="55"></el-table-column>
	      <el-table-column type="index" label="序号" width="60">
	      </el-table-column>
	      <el-table-column prop="ProjectName" label="项目名称" width="120" sortable>
	      </el-table-column>
	     <!--  <el-table-column prop="LandUsePermit" label="建设用地规划许可证编号" sortable>
	      </el-table-column>
	      <el-table-column prop="BuildingPermit" label="建设工程规划许可证编号" sortable>
	      </el-table-column> -->
	      <el-table-column label="建设用地规划许可证">	
	            <template scope="props">		 
					<div v-if="props.row['ProjectName']">
							<!-- <el-tag v-for="tag in props.row['ProjectName'].FileInfo" type="primary" class="FileInfo">
								<div v-if="tag.FileType=='建设用地规划许可证'">
									 <a v-bind:href="'/api/fu?path='+tag.Path+'/'+tag.TrueName">{{tag.FileName}}</a>
								</div>
		            		</el-tag> -->
		            		<div v-for="tag in props.row.FileInfo" type="primary" class="FileInfo">
		                 		<el-tag v-if="tag.FileType=='建设用地规划许可证'">
									<a v-bind:href="'/api/fu?path='+tag.Path+'/'+tag.TrueName">{{tag.FileName}}</a>
								</el-tag>
	            			</div>
					</div>
	            </template>
	      </el-table-column>
	        <el-table-column label="建设工程规划许可证">	
	            <template scope="props">
	            	<!-- <span>{{props.row.FileInfo}}</span>		  -->
					<!-- <div v-if="props.row['ProjectName']">
						<el-tag v-for="tag in props.row['ProjectName'].FileInfo" type="primary" class="FileInfo">
	                 		<div v-if="tag.FileType=='建设工程规划许可证'">
								<a v-bind:href="'/api/fu?path='+tag.Path+'/'+tag.TrueName">{{tag.FileName}}</a>
							</div>
	            		</el-tag>
					</div> -->
					<div v-if="props.row['ProjectName']">
						<div v-for="tag in props.row.FileInfo" type="primary" class="FileInfo">
	                 		<el-tag v-if="tag.FileType=='建设工程规划许可证'">
								<a v-bind:href="'/api/fu?path='+tag.Path+'/'+tag.TrueName">{{tag.FileName}}</a>
							</el-tag>
	            		</div>
					</div>
	            </template>
	      	</el-table-column>
	        <el-table-column label="建设项目选址意见书">	
	            <template scope="props">		 
					<div v-if="props.row['ProjectName']">
						<!-- <el-tag v-for="tag in props.row['ProjectName'].FileInfo" type="primary" class="FileInfo">
		                  	<div v-if="tag.FileType=='建设项目选址意见书'">
								<a v-bind:href="'/api/fu?path='+tag.Path+'/'+tag.TrueName">{{tag.FileName}}</a>
							</div>
	            		</el-tag> -->
	            		<div v-for="tag in props.row.FileInfo" type="primary" class="FileInfo">
	                 		<el-tag v-if="tag.FileType=='建设项目选址意见书'">
								<a v-bind:href="'/api/fu?path='+tag.Path+'/'+tag.TrueName">{{tag.FileName}}</a>
							</el-tag>
	            		</div>
					</div>
	            </template>
	      	</el-table-column>
	        <el-table-column label="三同时核查表">	
	            <template scope="props">		 
					<div v-if="props.row['ProjectName']">
						<!-- <el-tag v-for="tag in props.row['ProjectName'].FileInfo" type="primary" class="FileInfo">
		                  	<div v-if="tag.FileType=='三同时核查表'">
								<a v-bind:href="'/api/fu?path='+tag.Path+'/'+tag.TrueName">{{tag.FileName}}</a>
							</div>
	            		</el-tag> -->
	            		<div v-for="tag in props.row.FileInfo" type="primary" class="FileInfo">
	                 		<el-tag v-if="tag.FileType=='三同时核查表'">
								<a v-bind:href="'/api/fu?path='+tag.Path+'/'+tag.TrueName">{{tag.FileName}}</a>
							</el-tag>
	            		</div>
					</div>
	            </template>
	      	</el-table-column>
	        <el-table-column label="操作" width="150">
	          <template scope="scope">
	            <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal"
	                    @click="companyNewsUpdata(scope.$index, scope.row)">修改
	            </button>
	            <button class="btn btn-danger btn-sm" @click="companyNewsDel(scope.$index, scope.row)">删除</button>
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
	            <h4 class="modal-title" v-if="isadd">项目信息(新增页面)</h4>
	            <h4 class="modal-title" v-if="isLook">项目信息(查看页面)</h4>
	            <h4 class="modal-title" v-if="isupdata">项目信息(修改页面)</h4>
	          </div>
	          <div class="modal-body ml0">
	            <form class="form-inline clearfix singleRow" @submit.prevent="companyNewsSubmit" >
	              	<div class="form-group">
		                <label><span class="pk">*</span>项目名称：</label>
		                <input type="text" class="form-control mar_r15" required="required" :disabled="isLook" v-model="companyNews.ProjectName">
	               	</div>
	               	<!-- <div class="form-group">
		                <label><span class="pk">*</span>建设用地规划许可证：</label>
		                <input type="text" class="form-control mar_r15" required="required" :disabled="isLook" v-model="companyNews.LandUsePermit">
	               	</div>
	               	<div class="form-group">
		                <label><span class="pk">*</span>建设工程规划许可证：</label>
		                <input type="text" class="form-control mar_r15" required="required" :disabled="isLook" v-model="companyNews.BuildingPermit">
	               	</div> -->
	              	
	             	<div class="form-group">
	                	<label>附件类型：</label>
	                	<template>
						  <el-select v-model="value" @change="valueChange" placeholder="请选择附件类型">
						    <el-option
						      v-for="item in options"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						  </el-select>
						</template>
	                	<!-- 新增以及修改 -->
		                <div v-show="isadd ||isupdata">
		                  <uploadFile ref="upload" @end="drawing"   @listenState="listenstatus" :selValue="selectValue" :childUrl="fileurl" :codenum="codeNumber" ></uploadFile>
		                   <ul v-if="isupdata" class="filesUrl">
		                    <li v-for="item in filesList" :id="item.RecordCode"><span class="toadded">{{item.FileName}}</span><span class="deltate"  @click="deltaed(item.Path,item.FileName,item.RecordCode)">删除</span></li>
		                  </ul>
		                  
		                </div>
	              	</div>
	              	注释:<span class="pk">*</span>为必填项
	              	<div class="modal-footer">
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
  	import uploadFile from '../common/uploadFile';
 	import page from '../common/page';
 	export default{
 		components:{
	      uploadFile,
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
		        items: [],
		        selectList:[],
		        selectValue:"",
		        ///////////////////////文件上传需要////////////////////////////////////////
		        isChecked:false,//子组件点击上传按钮之后的状态
		        indexNum:"", //点击修改的索引值
		        fileItems:[], //附件上传列表
		        downadress:'', //下载地址
		        datalist:[],
		        fileurl:[],
		        codeNumber:"", //code
		        state:'A008',  //企业编号
		        coded:"",  //文件编号
		        filesList:[], //修改循环列表
		        ///////////////////////////////////////////////////////////////
		        multipleSelection: [],
		        companyNews:{
		        	ProjectName:""
		        },
		        value: '',
		        options: [{
		          value: '建设用地规划许可证',
		          label: '建设用地规划许可证'
		        }, {
		          value: '建设工程规划许可证',
		          label: '建设工程规划许可证'
		        },
		         {
		          value: '建设项目选址意见书',
		          label: '建设项目选址意见书'
		        },
		         {
		          value: '三同时核查表',
		          label: '三同时核查表'
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
	      this.companyNewsNew(this.id);
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
	          this.companyNewsNew(val);
	        },
		    //分页有用 监听变化
		    'items':function(arr){
		        this.items = arr;
		    },
	      	'codenum':function(val){
		        this.codenum=val;
		        this.companyNewsSubmit(val);
	      	 },
	      	'currentPages':function(val){
	          this.select = [];
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
		        this.companyNewsNew(id);
		    },
			/**********
	        * [1.点击新建时清空所有数据
	        * @param 
	        * @return 
		      ************/
		    companyNewsDateClear: function () {
		        this.isadd = true;
		        this.isLook = false;
		        this.isupdata = false;
		        this.$refs.upload.clearFiles();
		        this.value=[];
		        this.companyNews = {
		         	ProjectName:""
		        }
		    },
		    /**********
            * [1.页面渲染请求
            * @param  {[string]} id [企业id]
            * @return 
  			************/
          	companyNewsNew: function (id) {
                // this.fileurl数组第0项为路由，第1项为id，第2项为类型,第四项为标识RecordCode
                this.fileurl=[this.$route.path,id,this.state];
                this.$http.get('/api/psf?TableCode=A008&COCode='+id)
                  .then(function (res) {
                    if(res.body.success===true){
                      	this.items = res.body.data;
                      	var data = res.body.data;
						var arr = [];
						var obj = {};
						if(res.body.data.length==0){
							this.list=[];
							return;
						}
						for(var k in data){
							obj[data[k].ProjectName] = data[k];
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
		    companyNewsSubmit: function (val) {
		        //在点击更新之前修改时间格式；
		        var a = '/api/pi';
		        var b = '/api/pu';
		        var url = '';
		        if(this.isadd) {
			        url = a;
			        this.companyNews["COCode"] = this.id;
				    this.companyNews["TableCode"] = 'A008';
				    var formData = JSON.stringify(this.companyNews);
		        	this.$http.post(url, formData, {emulateJSON: true}).then((res) => {
			            if(res.body.message === "successful") {
			                this.codeNumber=res.body.data[0].RecordCode;
			                if(val&&this.isChecked==true){
			                  this.$refs.upload.filePost();
				            }
				            if(val&&this.isChecked==false){
				                this.close();
				               	this.companyNewsNew(this.id);
				            }
			                
		             	}
			            if(res.body.success===false){
			                this.$message({showClose: true,message:res.body.message,type: 'error'});
			            }
			        },(req) => {
			          console.log("提交失败")
			        })
		        }
		        if(this.isupdata){
		          	url = b;
	    			this.codeNumber=this.companyNews.RecordCode;
	            	if(val&&this.isChecked==true){
			            this.$refs.upload.filePost();
			        }
			        if(val&&this.isChecked==false){
			           this.close();
			           this.companyNewsNew(this.id);
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
		        this.companyNewsNew(this.id);
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
	     	companyNewsUpdata: function (index, row) {
	     		console.log(row,789)
		        this.isadd = false;
		        this.isLook = false;
		        this.isupdata = true;
		        this.companyNews = row;
		        this.value=[];
		        this.selectList=row.FileInfo;
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
	        * [1.批量删除
	        * @param  {[Array]} arr [RecordCode的值]
	        * @return 
	     	 *********/
	      	companyNewsDelAll(arr){
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
		        this.$http.post('/api/pd', {TableCode: 'A008',COCode:this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
		          	if(res.body.message === "successful") {
		              if(delIdAll.length>0){
		                this.del(delIdAll);
		              }
		              this.companyNewsNew(this.id);
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
	    	companyNewsDel: function (index, row) {
	    		// console.log(99999,row)
		       	var delId1 =row.RecordCode;
				var delFile =row.FileInfo[0].RecordCode;
				// for(var k in row){
				// 	delId1.push(row[k].RecordCode);
				// 	delFile.push(row[k].FileInfo);
				// }
				if(delId1.length === 0){
					return;
				}
		        this.$http.post('/api/pd', {TableCode: 'A008',COCode:this.id,RecordCode:delId1}, {emulateJSON: true}).then((res) => {
		          if (res.body.message === "successful") {
		             //独立的删除附件方法 如果有附件
		            if(delFile.length>0){
			           this.del(delFile);
			        }
		            this.companyNewsNew(this.id);
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
			                  this.$message({showClose: true,message:"数据删除成功",type:'success'});
			            }
			            else{
			                 this.$message({showClose: true,message:"数据删除失败",type:'error'});
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
		        * [1.分页
		        * @param  {[Array]} msg [页数]
		        * @return 
		    *********/
		    showMsgFromChild(msg,pages){
		        this.list = msg;
		        this.currentPages = pages;
		    },
		    valueChange(val){
		    	this.selectValue=val;
		    	// console.log(996)
		    	// console.log(this.selectValue,966666)
		    	if(this.selectValue=="建设用地规划许可证"){
				    for(var i=0;i<this.selectList.length;i++){
				    	if(this.selectList[i].FileType==this.selectValue){
				    		this.filesList=[];
				    		this.filesList.push(this.selectList[i]);
				    	}
				    }
	       		}else if(this.selectValue=="建设工程规划许可证"){	
					for(var i=0;i<this.selectList.length;i++){
						
				    	if(this.selectList[i].FileType==this.selectValue){
				    		this.filesList=[];
				    		this.filesList.push(this.selectList[i]);
				    	}
				    }
	            }else if(this.selectValue=="建设项目选址意见书"){	
					for(var i=0;i<this.selectList.length;i++){	
				    	if(this.selectList[i].FileType==this.selectValue){
				    		this.filesList=[];
				    		this.filesList.push(this.selectList[i]);
				    	}
				    }
	            }else if(this.selectValue=="三同时核查表"){
					for(var i=0;i<this.selectList.length;i++){
				    	if(this.selectList[i].FileType==this.selectValue){
				    		this.filesList=[];
				    		this.filesList.push(this.selectList[i]);
				    	}
				    }
	            }
		    }
	    } 
 	}
</script>
<style scoped>
	.el-tag {
		background: #E9F6FF;
	}
</style>

