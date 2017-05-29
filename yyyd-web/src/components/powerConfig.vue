<template>
  <div class="table-responsive">
    <table class="table table-bordered table-hover">
        <thead style="background:#f1f1f1">
            <tr>
                <td>序号</td>
                <td>姓名</td>
                <td>UUID</td>
                <td>所属部门</td>
                <td>排放标准</td>
                <td>职位</td>
                <td>操作</td>
            </tr>
        </thead>
        <tbody :page-size="10">
             <tr v-for="(item,index) in items" >
                <td>{{(currentPage-1)*10+index}}</td>
                <td>{{item.firstName}}</td>
                <td>{{item.id}}</td>
                <td>所属部门</td>
                <td>排放标准</td>
                <td>职位</td>
                <td>
                     <button type="button" class="btn btn-success btn-sm btnadd" @click="eve([item.id,false])"><router-link to="/power" >查看</router-link></button>
                     <button type="button" class="btn btn-sm" @click="eve([item.id,true])"><router-link to="/power" >修改</router-link></button>
                </td>
            </tr>
        </tbody>
    </table>
    <!--分页-->
     <div class="block">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="24">
        </el-pagination>
   </div>
</div>
</template>

<script>
import Hub from '../vuex/hub.js'
export default {
     data() {
      return {
        currentPage:1,//分页当前页码
        items:[],
        list:[
                    {
                    "firstName": "liuyong",          
                    "id":"A001"
                    },
                    {          
                    "firstName":"Jason",
                    "id":"002"
                    },
                    {
                    "firstName": "Brett",          
                    "id":"001"
                    },
                    {          
                    "firstName":"Jason",
                    "id":"002"
                    },
                    {
                    "firstName": "Brett",          
                    "id":"001"
                    },
                    {          
                    "firstName":"Jason",
                    "id":"002"
                    },{
                    "firstName": "Brett",          
                    "id":"001"
                    },
                    {          
                    "firstName":"Jason",
                    "id":"002"
                    },
                    {
                    "firstName": "Brett",          
                    "id":"001"
                    },
                    {          
                    "firstName":"Jason",
                    "id":"002"
                    },
                     {
                    "firstName": "Brett",          
                    "id":"001"
                    },
                    {          
                    "firstName":"Jason",
                    "id":"002"
                },
                {
                    "firstName": "Brett",          
                    "id":"001"
                    },
                    {          
                    "firstName":"Jason",
                    "id":"002"
                    },
                    {
                    "firstName": "Brett",          
                    "id":"001"
                    },
                    {          
                    "firstName":"Jason",
                    "id":"002"
                    },
                    {
                    "firstName": "Brett",          
                    "id":"001"
                    },
                    {          
                    "firstName":"Jason",
                    "id":"002"
                    },{
                    "firstName": "Brett",          
                    "id":"001"
                    },
                    {          
                    "firstName":"Jason",
                    "id":"002"
                    },
                    {
                    "firstName": "Brett",          
                    "id":"001"
                    },
                    {          
                    "firstName":"Jason",
                    "id":"002"
                    },
                     {
                    "firstName": "Brett",          
                    "id":"001"
                    },
                    {          
                    "firstName":"Jason",
                    "id":"002"
                    }
        ]
      }
    },
    mounted(){
        this.getList(10);
    },
    watch:{
       'items' :function(arr){
            this.items = arr;
       }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
        var start =( this.currentPage-1)*10;
        var end  =  this.currentPage*10 
        this.items = this.list.slice(start,end);
      },
      getList(n){
          this.items = this.list.slice(0,n);
      },
      eve(id) {
            Hub.$emit('change',id); //Hub触发事件
      }
    } 
  }
</script>
<style scoped>
.block{
    text-align: right;
}
.btnadd a{
    color:#fff;
}
</style>
