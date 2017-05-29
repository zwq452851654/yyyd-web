<!-- complaint -->
<!-- 信访投诉新建页面 -->
<template>
        <div id="enterprise" class="col-md-12">
            <div>
              <form class="form-inline clearfix" @submit.prevent="submit">
                <table id="prison" class="table table-bordered text-center">
                  <thead>
                    <tr>
                      <th colspan="4">新增信访投诉信息</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>信访时间：</td>
                      <td colspan="3">
                        <input type="date" v-model="user.time">
                      </td>
                    </tr>
                    <tr>
                      <td>来访人姓名：</td>
                      <td colspan="3">
                        <input type="text" v-model="user.name">
                      </td>
                    </tr>
                    <tr>
                      <td>来访人联系电话：</td>
                      <td colspan="3">
                        <input type="text" v-model="user.telephone">
                      </td>
                    </tr>
                    <tr>
                      <td>登记人：</td>
                      <td colspan="3">
                        <input type="text" v-model="user.regName">
                      </td>
                    </tr>
                    <tr>
                      <td>信访概要：</td>
                      <td colspan="3">
                        <input type="date" v-model="user.content">
                      </td>
                    </tr>
                    <tr>
                      <td>调查处理情况：</td>
                      <td colspan="3">
                        <input type="date" v-model="user.result">
                      </td>
                    </tr>
                    <tr style="text-align: left;">
                      <td class="text-center">附件</td>
                      <td colspan="4">
                        <!-- <Upload
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
                        <small class="text-danger"><b>提示：单个附件最大为20MB</b></small> -->
                        <uploadFile></uploadFile>
                      </td>
                    </tr>
                    <tr>
                      <td>附件区</td>
                      <td colspan="4"></td>
                    </tr>
                  </tbody>
                  <tfoot>
                  <tr>
                    <td colspan="5">
                      <button type="submit" class="btn btn-primary">保存</button>
                      <button type="button" class="btn btn-primary col-md-offset-1">取消</button>
                    </td>
                  </tr>
                  </tfoot>
                </table>
              </form>
            </div>
        </div>
</template>
<script>
  import uploadFile from '../common/uploadFile';
  export default {
    components:{
      uploadFile
    },
    data () {
      return {
        items :[],
        // uploadList: [],
        formData:{},
        activeName2: 'first',
        user: {
          time: '',
          name: '',
          telephone:"",
          regName:"",
          content:"",
          result:"",
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
      // this.getImg(this.id);
      this.getID(this.id);
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
        // this.getImg(val);
        this.getID(val);
      }
    },
    methods:{
      submit: function(event) {
        this.user["companyID"]=this.id;
        var formData = JSON.stringify(this.user);
        this.$http.post('/api/entp/complain',formData,{emulateJSON:true}).then((res) => {
            console.log(res.body.message)
          if(res.body.message==="successful"){
          this.wscx(this.id);
            this.$router.push({path:'complaint'})
        }
      }, (req) => {
          console.log("提交失败")
        });

      },
      wscx:function(id){
        //局部发送ajax
        this.$http.get('/api/entp/complain?id='+id)
          .then(function(res){
            this.items = res.body.data;
          },function(err){
            console.log(err)
          })
      },
      // handleBeforeUpload () {
      //   const check = this.uploadList.length < 4;
      //   if (!check) {
      //     this.$Notice.warning({
      //       title: '最多只能上传 4 张图片。'
      //     });
      //   }
      //   return check;
      // },
      // handleMaxSize (file) {
      //   this.$Notice.warning({
      //     title: '超出文件大小限制',
      //     desc: '文件 ' + file.name + ' 太大，不能超过 20M'
      //   });
      // },
      // handleFormatError (file) {
      //   this.$Notice.warning({
      //     title: '文件格式不正确',
      //     desc: '文件 ' + file.name + ' 格式不正确，请上传正确的格式。'
      //   });
      // },
      // handleSuccess (res, file) {
      //   console.log('上传成功');
      //   console.log(res);
      //   console.log(file);
      //   var imgName = file.name;
      // }

    },
    // mounted () {
    //   this.uploadList = this.$refs.upload.fileList;
    // }

  }
</script>
