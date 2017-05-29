<template>
  <!-- emergencyPlanNew -->
  <!-- 环境应急预案新建-->
  <div id="enterprise" class="col-md-12">
    <div class="col-md-12">
      <form class="form-inline" @submit.prevent="submit">
        <table id="newAdd" class="table table-bordered text-center mar">
          <thead>
          <tr>
            <th colspan="5">
              <h4>新增环境应急预案信息</h4>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>排污单位名称：</td>
            <td colspan="4">
              <input type="text" class="form-control" v-model="user.name" placeholder="Text input">
            </td>
          </tr>
          <tr>
            <td>备案编号：</td>
            <td colspan="4">
              <input type="text" class="form-control" v-model="user.code" placeholder="Text input">
            </td>
          </tr>
          <tr>
            <td>受理机关：</td>
            <td colspan="4">
              <input type="text" class="form-control" v-model="user.department" placeholder="Text input">
            </td>
          </tr>
          <tr>
            <td>备案日期：</td>
            <td colspan="4">
              <input type="date" class="form-control" v-model="user.time" placeholder="Text input">
            </td>
          </tr>
          <tr>
            <td>负责人：</td>
            <td colspan="4">
              <input type="text" class="form-control" v-model="user.person" placeholder="Text input">
            </td>
          </tr>
          <tr>
            <td>经办人</td>
            <td colspan="4">
              <input type="text" class="form-control" v-model="user.manager" placeholder="Text input">
            </td>
          </tr>
          <tr>
            <td>环境应急预案演练记录</td>
            <td colspan="4">
              <input type="text" class="form-control" v-model="user.record" placeholder="Text input">
            </td>
          </tr>
          <tr>
            <td>环境预案管理制度</td>
            <td colspan="4">
              <input type="text" class="form-control" v-model="user.manageSystem" placeholder="Text input">
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
  export default {
    data () {
      return {
        uploadList: [],
        formData:{},
        user: {
          name: "",
          code: "",
          department: "",
          time: "",
          person: "",
          manager: "",
          attachment: "",
          record: "",
          manageSystem: ""
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
    methods: {
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
      },
      getID: function (id) {
        //局部发送ajax
        this.$http.get('/api/entp/emergency?id=' + id)
          .then(function (res) {
            this.items = res.body.data;
          }, function (err) {
            // console.log(err)
          })
      },
      submit: function (event) {
        this.user["companyID"] = this.id;
        var formData = JSON.stringify(this.user);
        this.$http.post("/api/entp/emergency", formData).then(function (res) {
          if (res.body.message === "successful") {
            this.getID(this.id);
            this.$router.push({path:'emergencyPlan'})
          }
        }, function (err) {
          console.log(err)
        })
      }

    },
    mounted () {
      this.uploadList = this.$refs.upload.fileList;
    }

  }
</script>
<style scoped>
  input[type=file] {
    display: none;
  }
</style>

