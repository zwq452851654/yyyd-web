<template>
    <div class="container">
        <h1 class="login-title">
          {{ruleForm2.msg}}
        </h1>
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" class="demo-ruleForm">
            <el-form-item　prop="name">
                <el-input v-model.name="ruleForm2.name"　 size="large">
                    <template slot="prepend">用 户 名 :</template>
                </el-input>
            </el-form-item>
            <el-form-item  prop="pass" >
                <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" size="large">
                  <template slot="prepend">密　　码 :</template>
                </el-input>
            </el-form-item>
            <el-form-item prop="checkPass" >
                <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" size="large">
                   <template slot="prepend">确认密码 :</template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="large" @click="submitForm('ruleForm2')"><router-link to="/home" class="btnlogin">登录</router-link></el-button>
                <el-button size="large" @click="resetForm('ruleForm2')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          pass: '',
          checkPass: '',
          name: '',
          msg:"中卫环保局一企一档管理系统"
        },
        rules2: {
          pass: [
            {required: true, validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            {required: true, validator: validatePass2, trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style scoped>

.container{
   width:1000px;
   border:1px solid #000;
   padding:30px;
   position: absolute;
   top:200px;
   left: 50%;
   margin-left:-500px;
}
.login-title{
  margin-bottom:50px;
}
.demo-ruleForm .el-form-item{
  width:50%;
  height: 60px;
  margin:20px auto;
}
.el-input{
  height: 30px;
}
.el-input-group__prepend{
  color:#666;
}
.demo-ruleForm .btnlogin {
  color: #666
}
.demo-ruleForm .btnlogin:hover{
  color: #39f;
}
</style>
