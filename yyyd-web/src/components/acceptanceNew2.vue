<template>
<!--新建环评-->
    <div id="enterprise" class="col-md-12">
        <table id="Environmental" class="table table-bordered text-center">
            <thead>
                <tr>
                    <th colspan="5">新增建设项目竣工环境保护验收审批信息</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td rowspan="8">基本信息</td>
                </tr>
                <tr>
                    <td>建设项目名称（验收申请）：</td>
                    <td>
                        <form class="form-inline">
                            <input type="text" style="width:65%;" class="form-control" >
                            <button type="submit" class="btn btn-success">选择</button>
                        </form>
                    </td>
                    <td>
                        建设项目名称（环评批复）：
                    </td>
                    <td>
                        <input type="text" class="form-control" >
                    </td>
                </tr>
                <tr>
                    <td>建设性质：</td>
                    <td>
                        <label class="radio-inline">
                                <input type="radio" name="inlineRadioOptions" value="option1">新建
                            </label>
                        <label class="radio-inline">
                                <input type="radio" name="inlineRadioOptions" value="option2">改扩建
                            </label>
                        <label class="radio-inline">
                                <input type="radio" name="inlineRadioOptions" value="option3">技术
                            </label>
                    </td>
                    <td>
                        建设地点：
                    </td>
                    <td>
                        <input type="text" class="form-control" >
                    </td>
                </tr>
                <tr>
                    <td>行业类别：</td>
                    <td>
                        <form class="form-inline">
                            <input type="text" style="width:65%;" class="form-control" >
                            <button type="submit" class="btn btn-success">选择</button>
                        </form>
                    </td>
                    <td>行政区</td>
                    <td>
                        <form class="form-inline">
                            <input type="text" style="width:65%;" class="form-control" >
                            <button type="submit" class="btn btn-success">选择</button>
                        </form>
                    </td>
                </tr>
                <tr>
                    <td>环评批复单位：</td>
                    <td>
                        <input type="text" class="form-control" ></td>
                    <td>环评批复文号：</td>
                    <td>
                        <input type="text" class="form-control" ></td>
                </tr>
                <tr>
                    <td>环评批复时间：</td>
                    <td>
                        <input type="date" class="form-control"></td>
                    
                    <td colspan="2"></td>
                </tr>
                <tr>
                    <td>竣工验收单位：</td>
                    <td>
                        <input type="text" class="form-control" ></td>
                    
                    <td>
                        竣工验收时间：
                    </td>
                    <td>
                        <input type="date" class="form-control">
                    </td>
                </tr>
                <tr>
                    <td>实际总投资（万元）：</td>
                    <td>
                        <input type="text" class="form-control" ></td>
                    <td>实际环保投资（万元）：</td>
                    <td>
                        <input type="text" class="form-control" ></td>
                </tr>
                <tr>
                    <td rowspan="3">建设单位</td>
                    <td>建设单位：</td>
                    <td>
                        <input type="text" class="form-control" ></td>
                    <td>邮政编码：</td>
                    <td>
                        <input type="text" class="form-control" ></td>
                </tr>
                <tr>
                    <td>法人代表：</td>
                    <td>
                        <input type="text" class="form-control" ></td>
                    <td>联系人：</td>
                    <td>
                        <input type="text" class="form-control" ></td>
                </tr>
                <tr>
                    <td>联系电话：</td>
                    <td>
                        <input type="text" class="form-control" ></td>
                    <td>通讯地址：</td>
                    <td>
                        <input type="text" class="form-control" ></td>
                </tr>
                <tr>
                    <td rowspan="3">审批结果</td>
                    <td>批复时间：</td>
                    <td><input type="date" class="form-control"></td>
                    <td>验收批复文号：</td>
                    <td><input type="text" class="form-control" ></td>
                </tr>
                <tr>
                    <td>审批部门：</td>
                    <td>
                        <form class="form-inline">
                            <input type="text" style="width:65%;" class="form-control" >
                            <button type="submit" class="btn btn-success">选择</button>
                        </form>
                    </td>
                    <td>是否许可：</td>
                    <td>
                        <label class="radio-inline">
                                <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"> 是
                            </label>
                        <label class="radio-inline">
                                <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"> 否
                            </label>
                    </td>
                </tr>
                <tr>
                    <td>批复意见：</td>
                    <td colspan="3"><textarea class="form-control" rows="3"></textarea></td>
                </tr>
                <tr style="text-align: left;">
                    <td class="text-center">附件</td>
                    <td colspan="4">
                        <button type="submit" class="btn btn-success">选择</button>
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
                        <button type="submit" class="btn btn-primary col-md-offset-1">取消</button>
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>

<script>

</script>
<style scoped>

</style>
