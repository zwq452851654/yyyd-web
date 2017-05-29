<template>
  <!--action="http://localhost:8080/api/fuExcel?TableCode=E002&COCode=640500000069"-->
  <form v-bind:action="url" method='post' target="_blank" enctype="multipart/form-data">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th colspan="4">批量导入</th>
        </tr>
      </thead>
      <tbody>
      <tr>
        <td>导入类型</td>
        <td>
          <select class="form-control" v-model="user">
            <option value="请选择">请选择</option>
            <option v-for="ty in typeData">{{ty.Name}}</option>
          </select>
        </td>
        <td>附件</td>
        <td>
          <div class="EnclosureBtn">
            <button data-v-062d0d47="" type="button" id="btn" class="el-button el-button--primary el-button--small"><span>选取文件</span></button>
            <span>请选择需要上传的文件</span>
            <input type='file' name='file' id="fileBtn" @click='click'>
            <input type="submit" id="uploadBtn" value="上传">
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </form>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        id:'',
        user:'',
        TableCode:'',
        typeData:[],
        url:'http://localhost:8080/api/fuExcel?TableCode='
        /*E002&COCode=640500000069*/
      }
    },
    created(){
      this.getSelectDate('O031');
    },
    beforeUpdate(){
      this.id = sessionStorage.getItem("ID");
    },
    watch:{
      'user':function () {
        switch (this.user){
          case '年度申报':
            this.TableCode = 'E002';
            break;
          case '行政处罚':
            this.TableCode = 'J001';
            break;
          case '信访投诉':
            this.TableCode = 'I001';
            break;
        }
        this.url = 'http://localhost:8080/api/fuExcel?TableCode='+this.TableCode+'&COCode='+this.id;
        console.log('vvvv',this.url);
        console.log('id',this.id);
      }
    },
    methods:{
      click(){
        if(this.user == ''){
          alert('选择完文件之后，请选择导入类型');
        }
      },
      getSelectDate(code){
        this.$http.get('/api/ps?TableCode='+code).then(function(res){
          console.log('code',code);
          if (res.body.success===true){
            switch (code){
              case 'O031':
                this.typeData = res.body.data;
                console.log('下拉',this.typeData);
                break;
            }

          }
        })
      },
    }
  }
</script>

<style scoped>
  form input {
    display:block;
  }

  .EnclosureBtn{
    position: relative;
  }

  .EnclosureBtn #btn{
    position: absolute;
    top:0;
    left:0;
    cursor: pointer;
  }

  .EnclosureBtn #fileBtn{
    position: absolute;
    top:0;
    left:0;
    opacity: 0;
  }

  .EnclosureBtn #uploadBtn{
    position: absolute;
    right: 0;
    top: 0;
    width: 75px;
    height: 28px;
    background: rgb(66, 245, 10);
    border: none;
    border-radius: 5px;
    color: #fff;
  }

  .table thead tr th{
    height: 50px;
    font-size: 15px;
    text-align: left;
    background: #74a82c;
    color: #fff;
    border-bottom: none;
  }

  .table tbody{
    font-weight: 700;
  }
</style>
