<template>
<!--厂区平面区-->
    <div id="enterprise" class="col-md-12 bg">
        <div class="buttons mar btn-middle">
            <a class="btn btn-primary" data-toggle="modal" data-target="#myModal"
              @click="plantFloorPlanAdd"> 新增 </a>
            <!-- <a class=" btn btn-danger" @click="plantFloorPlanDelAll(select)">批量删除</a> -->
        </div>

        <div class="col-lg-12" v-for="item in items">
            <div class="PlantPlan PlantEnterprise clearfix"  v-if="item.企业照片">
              <h4 class="pull-left">{{item.企业照片.Name}}</h4>
              <button class="btn pull-right" @click="plantFloorPlanMore('picone')">更多</button>
              <button class="btn pull-right" @click="plantFloorPlanDel(item.企业照片)">删除</button>
              <button class="btn pull-right" @click="plantFloorPlanUpdata(item.企业照片)" data-toggle="modal" data-target="#myModal">编辑</button>
              <ul class="col-md-12 picul" v-bind:class="{ picone: picone }">
                  <li class="col-md-4 text-center liheight" v-for="tag in item.企业照片.FileInfo">
                      <img class="col-md-12" v-bind:src="'/api/fv?path='+tag.Path+'/'+tag.TrueName">
                      <div><span class="col-md-12">{{tag.FileName}}</span></div>
                  </li>
              </ul>
           </div>
           <div class="PlantPlan PlantEnterprise clearfix" v-if="item.所在地行政区域位置">
              <h4 class="pull-left">{{item.所在地行政区域位置.Name}}</h4>
              <button class="btn pull-right" @click="plantFloorPlanMore('pictwo')">更多</button>
              <button class="btn pull-right" @click="plantFloorPlanDel(item.所在地行政区域位置)">删除</button>
              <button class="btn pull-right" @click="plantFloorPlanUpdata(item.所在地行政区域位置)" data-toggle="modal" data-target="#myModal"> 编辑</button>
              <ul class="col-md-12 picul" id="pictwo">
                  <li class="col-md-4 text-center liheight" v-for="tag in item.所在地行政区域位置.FileInfo">
                      <img class="col-md-12" v-bind:src="'/api/fv?path='+tag.Path+'/'+tag.TrueName">
                      <div><span class="col-md-12">{{tag.FileName}}</span></div>
                  </li>
              </ul>
           </div>
           <div class="PlantPlan PlantEnterprise clearfix" v-if="item.排污单位总平面布置图">
              <h4 class="pull-left">{{item.排污单位总平面布置图.Name}}</h4>
              <button class="btn pull-right" @click="plantFloorPlanMore('picthree')">更多</button>
              <button class="btn pull-right" @click="plantFloorPlanDel(item.排污单位总平面布置图)">删除</button>
              <button class="btn pull-right" @click="plantFloorPlanUpdata(item.排污单位总平面布置图)" data-toggle="modal" data-target="#myModal"> 编辑</button>
              <ul class="col-md-12 picul" id="picthree">
                  <li class="col-md-4 text-center liheight" v-for="tag in item.排污单位总平面布置图.FileInfo">
                      <img class="col-md-12" v-bind:src="'/api/fv?path='+tag.Path+'/'+tag.TrueName">
                      <div><span class="col-md-12">{{tag.FileName}}</span></div>
                  </li>
              </ul>
           </div>

        </div>

        <!--新建 查看 修改-->
	     <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	      <div class="modal-dialog" role="document">
	        <div class="modal-content">
	          <div class="modal-header">
	            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
	              aria-hidden="true">&times;</span></button>
	            <h4 class="modal-title" v-if="isadd">厂区平面区(新增页面)</h4>
	            <h4 class="modal-title" v-if="isLook">厂区平面区(查看页面)</h4>
	            <h4 class="modal-title" v-if="isupdata">厂区平面区(修改页面)</h4>
	          </div>
	        	<div class="modal-body ml0">
		            <form class="form-inline clearfix TheTwoColumn" @submit.prevent="plantFloorPlanSubmit" >
		   				<div class="table-responsive">
						  <table class="table">
							<tr>
							  	<td>
							  		<label><span class="pk">*</span></label>
                      <select class="form-control" v-model="selectValue" @click="selectCheck(selectValue)">
                          <option v-for="option in options" v-bind:value="option.value">
                            {{ option.text }}
                          </option>
                      </select>
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

  </div>
</template>

<script>
import Bus from '../vuex/bus.js';
import uploadFile from '../common/uploadFile';
import $ from '../../node_modules/jquery/dist/jquery.min.js'
export default {
    components:{
      uploadFile,
    },
    data () {
      return {
        items :[],
        id:"",
        show:true,
        isadd: true,//是否是新增
		isLook: true,//是否是查看
		isupdata: true,//是否是更新
        selectValue:"",
        value:"",
        picone:false,
        pictwo:false,
        picthree:false,
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
        options: [
            {
		          value: '企业照片',
		          text: '企业照片'
		        }, {
		          value: '所在地行政区域位置',
		          text: '所在地行政区域位置'
		        },
            {
		          value: '排污单位总平面布置图',
		          text: '排污单位总平面布置图'
		        },
          ],
        plantFloorPlan:{
          Name:"",
        },
      }
    },
    beforeCreate(){

    },
    beforeMount(){

    },
    mounted(){

    },
    created(){
      Bus.$on('getTarget', ccc => {
        this.ccc()
    });
       Bus.$emit('OK', false);
       this.plantFloorPlanNews(this.id);
    },
    beforeUpdate(){
      this.id=sessionStorage.getItem("ID");
    },
    updated(){

    },
    activated(){

    },
    deactivated(){

    },
    beforeDestroy(){

    },
    destroyed(){

    },
    watch:{

        id(val){
              this.plantFloorPlanNews(val);
        },
        'codenum':function(val){
		        this.codenum=val;
		        this.plantFloorPlanSubmit(val);
	      },
    },
   methods:{
     ccc(){
       var id = this.id;
       this.plantFloorPlanNews(id);
     },
     plantFloorPlanAdd: function(){
        this.isadd =  true;
		    this.isLook =  false;
		    this.isupdata =  false;
        this.$refs.upload.clearFiles();
        this.plantFloorPlan = {
          Name:""
        }
     },
     plantFloorPlanUpdata:function(val) {
        this.selectValue = val.Name;
        this.isadd =  false;
		this.isLook =  false;
		this.isupdata =  true;
        this.plantFloorPlan = val
        this.$refs.upload.clearFiles();
        if(this.items[0][this.selectValue]){
              this.files=this.items[0][this.selectValue].FileInfo
        }
        else{
            this.files = [];
        }
     },
     plantFloorPlanNews:function(id){
        this.fileurl=[this.$route.path,id,this.state];
        this.$http.get('/api/psf?TableCode=C005&COCode='+id).then(function(res){
            if(res.body.success===true){
               	var data = res.body.data;
                var obj = {};
                var arr = [];
                console.log(data);
                if(res.body.data.length==0){
                    this.items=[];
                    return;
                }
                for(var k in data){
                    obj[data[k].Name] = data[k];
                }
                arr.push(obj);
                this.items = arr;
                console.log(this.items);
            }
        },function(err){})
     },
    /********
        * [1.新增请求以及修改请求
        * @param  {[number]} event [Code值]
        * @return
      *********/
    plantFloorPlanSubmit: function (val) {
        //在点击更新之前修改时间格式；
        var a = '/api/pi';
        var b = '/api/pu';
        var url = '';
        if(this.isadd){
          this.plantFloorPlan["COCode"] = this.id;
          this.plantFloorPlan["TableCode"] = "C005";
          this.plantFloorPlan["Name"]=this.selectValue;
            url = a;
            var formData = JSON.stringify(this.plantFloorPlan);
            this.$http.post(url, formData, {emulateJSON: true}).then((res) => {
              if(res.body.message === "successful") {
                  this.codeNumber=res.body.data[0].RecordCode;
                  if(val&&this.isChecked==true){
                      this.$refs.upload.filePost();
                  }
                  if(val&&this.isChecked==false){
                    this.close();
                    this.plantFloorPlanNews(this.id);
                  }
                }
              if(res.body.success===false){
                console.log(3);
                  this.$message({showClose: true,message:res.body.message,type: 'error'});
              }
          })
        }
        if(this.isupdata){
            url = b;
            console.log(this.plantFloorPlan)
          if(this.selectValue==="企业照片"){
                this.codeNumber=this.plantFloorPlan.RecordCode;
          }
          if(this.selectValue==="所在地行政区域位置"){
              this.codeNumber=this.plantFloorPlan.RecordCode;
          }
          if(this.selectValue==="排污单位总平面布置图"){
              this.codeNumber=this.plantFloorPlan.RecordCode;
          }
          if(val&&this.isChecked==true){
              this.$refs.upload.filePost();
          }
          if(val&&this.isChecked==false){
              this.close();
              this.plantFloorPlanNews(this.id);
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
        this.plantFloorPlanNews(this.id);
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
      * [1.点击close关闭时
      * @param
      * @param
      * @return
    *********/
    close: function () {
        document.getElementById("buttonClose").click();
    },
    /********
        * [1.单行删除
        * @param  {[Number]} index [当前点击行的index]
        * @param  {[row]} row [当前点击行的所有信息]
        * @return
    *********/
    plantFloorPlanDel: function (row) {
        var delId1 =[];
        delId1.push(row.RecordCode);
        var delFile = []
        for(var i in row.FileInfo){
            delFile.push(row.FileInfo[i].RecordCode)
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
              this.plantFloorPlanNews(this.id);
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
          if(res.body.success === true){}
          else{
                this.$message({showClose: true,message:"数据删除失败",type: 'error'});
          }
        },function(err){

        })
     },
      plantFloorPlanMore:function(params) {
          this[params] = !this[params];
      },
      selectCheck:function(params) {
         if(this.items[0][params]){
              this.files=this.items[0][params].FileInfo
        }
        else{
            this.files = [];
        }
      }
   }
}
</script>
<style scoped>
.form-inline .form-group{
  width: 100%;
  margin-bottom: 20px;
  display: block;
}
.groupbtn{
  text-align: center;
}
.modal .el-date-editor.el-input{
    width: 300px;
}
 .liheight{
    overflow: hidden;
    height: 234.36px;
 }
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
  .PlantPlan button {
    margin-top: 15px;
    margin-left: 10px;
}

.bg {
    padding: 0;
    background: #fff;
    padding-bottom: 50px;
}
.bg .PlantEnterprise {
    padding: 0 45px;
    margin-bottom: 25px;
}

.bg .More {
    clear: both;
    font-size: 16px;
    text-align: right;
    padding-right: 45px;
}

.bg .PlantEnterprise button {
    background: #73a82b;
    color: #fff;
}

.bg .More a {
    color: #ccc;
}
.bg .picul{
   height:264px;
   overflow: hidden;
}
.bg .picul li {
    position: relative;
    margin: 15px 0;
    padding: 0 15px;
}

.bg .picul li img {
    padding: 0;
}

.bg .picul li div {
    position: absolute;
    padding: 0 15px;
    width: 100%;
    height: 35px;
    left: 0;
    bottom: 0;
}

.bg .picul li div span {
    display: block;
    height: 35px;
    line-height: 35px;
    color: #fff;
    background: rgba(0, 0, 0, 0.54);
}
.bg .picone{
    height: auto;
}
</style>
