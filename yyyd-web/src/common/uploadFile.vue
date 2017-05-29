<!-- 文件上传组件 -->
<!--   @fileSuccess="UploadSuccess" -->
<template>
	<div>
	    <el-upload
		  class="upload-demo"
		  ref="upload"
		  :data="companyAdress"
		  action="/api/fu"
		  :file-list="fileList"
		  :on-success="handleSuccess"
		  :before-upload="handleBeforeUpload"
		  :auto-upload="false">
		  <el-button slot="trigger" size="small" type="primary" @click="changeState">选取文件</el-button>
		</el-upload>
	    <small class="text-danger"><b>提示：单个附件最大为20MB</b></small>
	    <!-- <span>companyAdress={{companyAdress}}</span> -->
	</div>
</template>
<script>
	export default {
		data (){
			return {
				uploadList: [],
				companyAdress:{},
				fileName:[],
				codeval:"" ,//code的值
				// newFilename:[]
			 	resName:"" ,  //真的名字truename字段,
			 	checked:false, //选取附件的点击状态
			 	fileList:[],
			 	childSelectValue:""
			}
		},
		created(){
    },
    mounted(){
      	this.fileList=[];
      	this.uploadList = this.$refs.upload.fileList;
    },
    watch:{
	     	'childUrl':function(val){
				this.childUrl=val;
	       		this.implement()
	      	},
		    codenum(val){
		      this.codeval=val;
		    },
		    selValue(val){
		    	this.childSelectValue=val;
		    }
    	},
    	props:["childUrl","codenum","selValue"],
		  methods:{
			implement:function() {
    			this.companyAdress = {'path':this.childUrl[1]+this.childUrl[0]};
			},
			handleBeforeUpload (file) {
				if(file.size>20971520){
					this.$notify.warning({
			            title: '文件最大为20M，请检查文件大小'
			        })
			        return false;
				}

		      },
		    handleSuccess (response, file,fileList) {
		    	// 文件上传失败
		    	if(response.success === false){
					this.$message({showClose: true,message:response.message,type: 'error'});
					this.$Notice.warning({
		            title: '文件上传失败！请重新上传'
		        });
     		 	this.delateCompanyMessage();
				  return;

			   	}
		    	this.$Notice.success({
		            title: '上传文件成功'
		        });
				this.fileName = file.name;
		    	this.resName=response.TrueName;
		    	this.$http.post("/api/pi",{COCode:this.childUrl[1],Path:this.childUrl[1]+this.childUrl[0],Dategory:this.childUrl[2],FileName:this.fileName,TrueName:this.resName,TableCode:'M001',Code:this.codeval,FileType:this.childSelectValue}).then(function(res){
			       		if(res.body.success===true){
			        			console.log("上传写入数据库成功");
			    				this.$emit("end","1");
			         		}
			       		if(res.body.success===false){
			       			this.$message({showClose: true,message:res.body.message,type: 'error'});
			      		}
				       },function(err){
				        console.log(err);
				       	console.log("上传写入数据库失败");
				       })
		    },
     		filePost(){
     		 	this.$refs.upload.submit();
			},
			//点击按钮之后状态改变
			changeState(){
				this.checked=true;
				// this.companyAdress="";
				this.companyAdress = {'path':this.childUrl[1]+this.childUrl[0]};
				this.$emit("listenState",this.checked);
			},
			 /**********
	        * [1.企业基本信息删除方法
	        * @param
	        * @return
	      	************/
	      	delateCompanyMessage(){
	      		this.$http.post("/api/pd",{TableCode:this.childUrl[2],COCode:this.childUrl[1],RecordCode:this.codeval}).then(function(res){
		            if(response.success===true){
		            	console.log("文件基本数据删除成功");
		            }
		          	},function(err){
		            console.log(err);
		        	})
	      	},
			// 清空方法
			clearFiles(){
        		this.$refs.upload.clearFiles();
			}
		}
  }
</script>
<style scoped>

</style>

