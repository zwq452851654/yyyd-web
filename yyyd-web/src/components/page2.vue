<template>
  <div class="container">
   <div class="col-md-12 nopadding">
    <div class="col-md-6" v-for="item in getdata" >
     <h3>企业档案<small class="col-xs-offset-7">
       <router-link :to="{ path: '/company/basicInformation'}">
        详细信息&gt;&gt;
       </router-link></small></h3>
     <table class="table page2table" >
      <tbody>
       <tr>
        <td> 企业名称：{{item.compayname}} </td>
        <td></td>
       </tr>
       <tr>
        <td>企业地址：{{item.detail}}</td>
        <td>邮政编码：{{item.postalcode}}</td>
       </tr>
       <tr>
        <td>法定代表人：{{item.representative}}</td>
        <td>联系电话：{{item.telphone}}</td>
       </tr>
       <tr>
        <td>所属行业：</td>
        <td>行政区：{{item.code}}</td>
       </tr>
      </tbody>
      <tfoot>
       <tr>
        <td>企业属性：{{item.property}}</td>
        <td></td>
       </tr>
      </tfoot>
     </table>
    </div>
    <div class="col-md-5">
     <h3>企业图片</h3>
     <div class="block">
      <el-carousel trigger="click" height="200px">
       <el-carousel-item>
            <img src="../assets/u106.jpg" width="100%" height="100%">
       </el-carousel-item>
       <el-carousel-item>
            <img src="../assets/1.jpg" width="100%" height="100%">
       </el-carousel-item>
       <el-carousel-item>
            <img src="../assets/timg.jpg" width="100%" height="100%">
       </el-carousel-item>
       <el-carousel-item>
            <img src="../assets/u106.jpg" width="100%" height="100%">
       </el-carousel-item>
      </el-carousel>
     </div>
    </div>
   </div>
   <div class="col-md-12">
    <h3 class="mar">流程动态管理</h3>
    <h4>建设审批与排污费申报</h4>
   </div>
   <ul class="col-md-12 process">
    <li> <i></i> <span>建设项目审批</span> </li>
    <li> <em> <img src="../assets/20170329095001.png" class="img-responsive" /> </em> </li>
    <li> <i></i> <span>试生产审批</span> </li>
    <li> <em> <img src="../assets/20170329095001.png" class="img-responsive" /> </em> </li>
    <li> <i></i> <span>竣工验收审批</span> </li>
    <li> <em> <img src="../assets/20170329095001.png" class="img-responsive" /> </em> </li>
    <li> <i></i> <span>竣工验收审批</span> </li>
    <li> <em> <img src="../assets/20170329095001.png" class="img-responsive" /> </em> </li>
    <li> <i></i> <span>排污申报</span> </li>
    <li> <em> <img src="../assets/20170329095001.png" class="img-responsive" /> </em> </li>
    <li> <i></i> <span>排污收费</span> </li>
   </ul>
   <div class="Supervision col-md-12">
    <div class="col-md-5">
     <h4>监察执法</h4>
     <ul class="process1">
      <li> <i></i> <span>建设项目审批</span> </li>
      <li> <i></i> </li>
      <li> <i></i> <span>建设项目审批</span> </li>
      <li> <i></i> </li>
      <li> <i></i> <span>建设项目审批</span> </li>
     </ul>
    </div>
    <div class="col-md-4">
     <h4>污染源检测</h4>
     <ul class="process2">
      <li> <i></i> <span>建设项目审批</span> </li>
      <li> <i></i> <span>建设项目审批</span> </li>
      <li> <i></i> <span>建设项目审批</span> </li>
      <li> <i></i> <span>建设项目审批</span> </li>
     </ul>
    </div>
    <div class="col-md-3">
     <h4>危废管理</h4>
     <ul class="process3">
      <li> <i></i> <span>经营许可证</span> </li>
      <li> <i></i> <span>转移联单</span> </li>
      <li> <i></i> <span>固废危废</span> </li>
     </ul>
    </div>
   </div>
   <div class="col-md-12">
    <h4 class="mar">自动检测数据<small class="col-xs-offset-10">详细信息&gt;&gt;</small></h4>
    <div class="col-xs-offset-1">
     <label class="radio-inline"> <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" /> 1 </label>
     <label class="radio-inline"> <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" /> 2 </label>
     <label class="radio-inline"> <input type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" /> 3 </label>
     <label class="col-xs-offset-1"> <select class="Discharge"> <option>请选择排口</option> <option>111</option> <option>22</option> <option>333</option> </select> </label>
     <a href="##" class="col-xs-offset-4">化学需氧量</a>
     <a href="##" class="col-xs-offset-1">氮气（NH3-N）</a>
    </div>
   </div>
   <div class="col-md-12 Diagram">
    <h3>30日内XXX排口化学需氧量排放曲线图</h3>
   </div>
   <div class="col-md-12">
    <div class="Supervision col-md-5">
     <h3>监督性检测<small class="col-xs-offset-6">详细信息&gt;&gt;</small></h3>
     <div class="btn-group col-md-12 mar Supervision">
      <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 年份 <span class="caret"></span> </button>
      <ul class="dropdown-menu">
       <li><a href="#">年份</a></li>
       <li><a href="#">Another action</a></li>
       <li><a href="#">Something else here</a></li>
       <li role="separator" class="divider"></li>
       <li><a href="#">Separated link</a></li>
      </ul>
      <button type="button" class="btn btn-default dropdown-toggle col-xs-offset-1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 季度 <span class="caret"></span> </button>
      <ul class="dropdown-menu">
       <li><a href="#">季度</a></li>
       <li><a href="#">Another action</a></li>
       <li><a href="#">Something else here</a></li>
       <li role="separator" class="divider"></li>
       <li><a href="#">Separated link</a></li>
      </ul>
     </div>
     <table class="table table-bordered">
      <thead>
       <tr>
        <th>监测日期</th>
        <th>监测点名称</th>
        <th>监测项目名称</th>
        <th>污染物浓度</th>
        <th>污染物折算浓度</th>
        <th>是否达标</th>
       </tr>
      </thead>
      <tbody>
       <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
       </tr>
       <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
        <td>6</td>
       </tr>
      </tbody>
     </table>
    </div>
    <div class="Supervision col-md-5">
     <h3>污染排放<small class="col-xs-offset-6">详细信息&gt;&gt;</small></h3>
     <div class="btn-group col-md-12 mar">
      <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 污染排放指标 <span class="caret"></span> </button>
      <ul class="dropdown-menu">
       <li><a href="#">污染排放指标</a></li>
       <li><a href="#">Another action</a></li>
       <li><a href="#">Something else here</a></li>
       <li role="separator" class="divider"></li>
       <li><a href="#">Separated link</a></li>
      </ul>
     </div>
    </div>
   </div>

  </div>
</template>

<script>
  export default {
    name: 'page',
    data () {
      return {
        msg: '中卫环保局一企一档管理系统',
        items: [],
        getdata: [],
        id: ""
      }
    },
    beforeCreate(){

    },
    beforeMount(){

    },
    mounted(){

    },
    created(){
      this.getImg(this.id);
      this.getID(this.id);
    },
    beforeUpdate(){
      this.id = sessionStorage.getItem("ID");
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
    watch: {
      id(val){
        this.getImg(val);
        this.getID(val);
      }
    },
    methods: {
      getImg: function (id) {
        //局部发送ajax
        this.$http.get('/api/entp/img?id=' + id)
          .then(function (res) {
            this.items = res.body.data;
          }, function (err) {
            console.log(err)
          })
      },
      getID: function (id) {
        this.$http.get('/api/entp/info?id=' + id)
          .then(function (res) {
            this.getdata = res.body.data;
          }, function (err) {
            console.log(err)
          })
      }
    }

  }
</script>
<style scoped>
  body {
    font-size: 14px;
  }

  span {
    font-size: 14px;
  }

  a {
    font-size: 14px;
    color: #657180;
  }

  .nopadding {
    padding: 15px 0px;
  }

  .container .page2table tr {
    border-top: 1px solid #ddd;
  }

  .container tfoot tr {
    border-bottom: 1px solid #ddd;
  }

  .container .page2table td {
    text-align: left;
    border-top: none;
  }

  h3 {
    height: 40px;
    line-height: 30px;
  }

  h4 {
    height: 30px;
    line-height: 30px;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
