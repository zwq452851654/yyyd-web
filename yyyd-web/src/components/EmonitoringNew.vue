<template>
	<!-- EmonitoringNew -->
	<!-- 环境监察新建 -->
    <div id="enterprise" class="col-md-12">
      <form class="form-inline clearfix" @submit.prevent="submit">
        <table id="newAdd" class="table table-bordered text-center">
            <thead>
            <tr>
                <th colspan="5">新增环境监察信息</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>来源：</td>
              <td colspan="4">
                <input type="text" class="form-control" placeholder="Text input" v-model="user.source">
              </td>
            </tr>
            <tr>
                <td>检查人：</td>
                <td colspan="4">
                    <input type="text" class="form-control" placeholder="Text input" v-model="user.person">
                </td>
            </tr>
            <tr>
                <td>检察人员单位：</td>
                <td colspan="4">
                    <input type="text" class="form-control" placeholder="Text input" v-model="user.unit">
                </td>
            </tr>
            <tr>
                <td>监察时间：</td>
                <td colspan="4">
                    <input type="date" class="form-control" placeholder="Text input" v-model="user.time">
                </td>
            </tr>
            <tr>
              <td>环境监察现场检查记录：</td>
              <td colspan="4">
                <input type="text" class="form-control" placeholder="Text input" v-model="user.envRecord">
              </td>
            </tr>
            <tr>
              <td>检查记录：</td>
              <td colspan="4">
                <input type="text" class="form-control" placeholder="Text input" v-model="user.checkRecord">
              </td>
            </tr>
            <tr>
              <td>监察意见书：</td>
              <td colspan="4">
                <input type="text" class="form-control" placeholder="Text input" v-model="user.suggestion">

              </td>
            </tr>
            <tr style="text-align: left;">
              <td class="text-center">附件</td>
              <td colspan="4">
                <Upload
                  multiple
                  data='{"path":"img"}'
                  :format="['jpg','jpeg','png','gif','doc','docx','xls','xlsx','mp3','mp4']"
                  :max-size="2048"
                  :before-upload="handleBeforeUpload"
                  :on-exceeded-size="handleMaxSize"
                  :on-format-error="handleFormatError"
                  :on-success="handleSuccess"
                  action="http://10.192.33.77:4022/file">
                  <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
                </Upload>
                <small class="text-danger"><b>提示：单个附件最大为20MB</b></small>
              </td>
            </tr>

            <tr>
                <td>附件区</td>
                <td colspan="4"></td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
                <td colspan="5" style="text-align: right">
                    <button type="submit" class="btn btn-primary">保存</button>
                    <button type="button" class="btn btn-primary"><router-link @click="click" :to="{ path: 'Emonitoring'}">取消
       </router-link></button>
                </td>
            </tr>
            </tfoot>
        </table>
      </form>




    </div>
</template>
<script>
  export default {
    data() {
      return {
        items:[],
        uploadList: [],
        formData:{},
        user: {
          source: '',
          person: '',
          unit:"",
          time:"",
          envRecord:"",
          checkRecord:"",
          suggestion:"",
          attachment:""
        },
        id:""
      }
    },
    beforeCreate(){

    },
    beforeMount(){

    },
    mounted(){

    },
    created(){
      this.wscx(this.id);
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
        this.wscx(val);
      }
    },
    methods: {
      submit: function(event) {
        this.user["companyID"]=this.id;
        var formData = JSON.stringify(this.user);
        this.$http.post('/api/entp/envMonitor',formData,{emulateJSON:true}).then((res) => {
            console.log(res.body.message)
          if(res.body.message==="successful"){
            this.click();
            this.wscx(this.id);
            this.$router.push({path:'Emonitoring'})
          }
        }, (req) => {
          console.log("提交失败")
        });

      },
      click:function(){

      },
      wscx:function(id){
        //局部发送ajax
        this.$http.get('/api/entp/envMonitor?id='+id)
          .then(function(res){
            this.items = res.body.data;
          },function(err){
            console.log(err)
          })
      },
      handleBeforeUpload () {
        const check = this.uploadList.length < 4;
        if (!check) {
          this.$Notice.warning({
            title: '最多只能上传 4 张图片。'
          });
        }
        return check;
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: '超出文件大小限制',
          desc: '文件 ' + file.name + ' 太大，不能超过 20M'
        });
      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件 ' + file.name + ' 格式不正确，请上传正确的格式。'
        });
      },
      handleSuccess (res, file) {
        console.log('上传成功');
        console.log(res);
        console.log(file);
        var imgName = file.name;
      }

    },
    mounted () {
      this.uploadList = this.$refs.upload.fileList;
    }

  }
</script>
