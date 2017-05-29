<template>
  <div class="block">
    <el-pagination
      @current-change="handleCurrentChange"
      :page-size="pageSize"
      layout="total,prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        currentPage:1,
        pageSize:0,
        total:0,
        list:[]
      }
    },
    props:['number','getDatas','totalLength'],
    mounted(){
      this.pageSize = parseInt(this.number);
      this.total = parseInt(this.totalLength);
      this.list = this.getDatas;
      this.handleCurrentChange(1);
    },
    watch:{
      'getDatas':function(val){
        this.list = val;
        this.handleCurrentChange(this.currentPage);
      },
      'totalLength':function(val){
        this.total  = val;
        this.handleCurrentChange(this.currentPage);
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.currentPage = val;
        var start =( this.currentPage-1)*this.pageSize;
        var end  = (this.currentPage*this.pageSize);
        var items = this.list.slice(start,end);
        this.senditems(items,val);
      },
      senditems(val,pages){
        this.$emit('listenToChildEvent',val,pages);
      }
    }
  }
</script>
<style>
  .block{
    text-align: right;
  }


</style>

