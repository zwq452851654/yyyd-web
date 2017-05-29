<template>
  <div id="enterprise" class="col-md-12">
    <el-tabs id="Tab1758" v-model="activeName2" type="card" >
      <el-tab-pane label="污水排口" name="first">

        <div class="buttons mar">
          <a class="btn btn-primary btn-middle" data-toggle="modal" data-target="#myModal" @click="SewageAdd"> 新建 </a>
          <a class="btn btn-danger" @click="SewageDelAll(select)">批量删除</a>
        </div>

        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" v-if="isSewageAdd">污水(新增页面)</h4>
                <h4 class="modal-title" v-if="isSewageLook">污水(查看页面)</h4>
                <h4 class="modal-title" v-if="isSewageUpdata">污水(修改页面)</h4>
              </div>
              <div class="modal-body ml0">
                <form class="form-inline clearfix TheTwoColumn" @submit.prevent="submit">
                  <div class="form-group">
                    <label>排口名称：</label>
                    <input type="text" class="form-control" :disabled="isSewageLook" v-model="user.OutputName"/>
                    <label><span class="pk">*</span>排口编号：</label>
                    <input type="text" required="required" :disabled="isSewageLook" class="form-control" v-model="user.OutputCode" />
                  </div>
                  <div class="form-group">
                    <label>排放去向：</label>
                    <el-select v-model="user.OutPutWhitherCode" placeholder="请选择" :disabled="isSewageLook">
                      <el-option
                        v-for="item in WhereaboutsDate"
                        :key="item.Name"
                        :label="item.Name"
                        :value="item.Name">
                      </el-option>
                    </el-select>
                    <label>污水处理厂：</label>
                    <input type="text" class="form-control" :disabled="isSewageLook" v-model="user.Dispose"/>
                  </div>
                  <div class="form-group">
                    <label>流域：</label>
                    <!--<input type="text" class="form-control" :disabled="isSewageLook" v-model="user.ValleyCode"/>-->
                    <el-cascader
                      :props="props"
                      :options="options2"
                      :show-all-levels="false"
                      v-model="selectedOptions1"
                      :disabled="isSewageLook"
                      @change="handleChange1"
                    ></el-cascader>
                    <label>水域功能类别：</label>
                    <el-select v-model="user.FunctionAreaCode" placeholder="请选择" :disabled="isSewageLook">
                      <el-option
                        v-for="item in funDate"
                        :key="item.Name"
                        :label="item.Name"
                        :value="item.Name">
                      </el-option>
                    </el-select>
                  </div>
                  <div class="form-group">
                    <label>经度：</label>
                    <input type="text" class="form-control" :disabled="isSewageLook" v-model="user.Longitude" />
                    <label>纬度：</label>
                    <input type="text" class="form-control" :disabled="isSewageLook" v-model="user.Latitude" />
                  </div>
                  <div class="form-group">
                    <label>排放口位置：</label>
                    <input type="text" class="form-control" :disabled="isSewageLook" v-model="user.OutputPosition"/>
                    <label>状态：</label>
                    <input type="text" class="form-control" :disabled="isSewageLook" v-model="user.Status"/>
                  </div>
                  <div class="form-group" style="width:100%" v-if="!isSewageLook">
                    注释：<span class="pk">*</span>为必填项
                    <button id ="buttonClose" type="button" class="btn btn-default" data-dismiss="modal" style="float:right" @click="close">关闭</button>
                    <button type="submit"  class="btn btn-primary" style="float:right;margin-right:10px;">确定</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane">
          <div class="table-responsive mt15">
            <el-table :data="SewageList" border style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}" @select-all="selectAll" @select="selectAll" >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="OutputName" label="排口名称" sortable>
              </el-table-column>
              <el-table-column prop="OutputCode" label="排口编号" sortable width="150">
              </el-table-column>
              <el-table-column prop="OutPutWhitherCode" label="排放去向" sortable width="150">
              </el-table-column>
              <el-table-column prop="OutputPosition" label="排口位置" sortable width="150">
              </el-table-column>
              <el-table-column prop="Status" label="状态" sortable width="100">
              </el-table-column>
              <el-table-column label="操作" width="200">
                <template scope="scope">
                  <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal"
                          @click="SewageLook(scope.$index, scope.row)">查看
                  </button>
                  <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal" @click="SewageUpdata(scope.$index, scope.row)">修改</button>
                  <button  class="btn btn-danger btn-sm" @click="SewageDel(scope.$index, scope.row)">删除</button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!--污水分页-->
          <page :number="10" :totalLength="items.length" :getDatas="items" v-on:listenToChildEvent="showMsgFromChild" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="废气排口" name="second">

        <div class="buttons">
          <a class="btn btn-primary btn-middle" data-toggle="modal" data-target="#myModal01" @click="YExhaustAdd"> 新建 </a>
          <a class="btn btn-danger" @click="YExhaustDelAll(select)">批量删除</a>
        </div>

        <div class="modal fade" id="myModal01" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" v-if="isYExhaustAdd">废气排口(新增页面)</h4>
                <h4 class="modal-title" v-if="isYExhaustLook">废气排口(查看页面)</h4>
                <h4 class="modal-title" v-if="isYExhaustUpdata">废气排口(修改页面)</h4>
              </div>
              <div class="modal-body ml0 TheTwoColumn">
                <form class="form-inline clearfix TheTwoColumn" @submit.prevent="yzfSubmit">
                  <div class="form-group">
                    <label>排放口名称：</label>
                    <input type="text" class="form-control" :disabled="isYExhaustLook" v-model="fs.OutputName"/>
                    <label><span class="pk">*</span>排放口编码：</label>
                    <input type="text" required="required" :disabled="isYExhaustLook" class="form-control" v-model="fs.OutputCode"/>
                  </div>
                  <div class="form-group">
                    <label>气域功能区类别编码：</label>
                    <input type="text" class="form-control" :disabled="isYExhaustLook"  v-model="fs.FunctionAreaCode" />
                    <label>排放口编号：</label>
                    <input type="text" class="form-control" :disabled="isYExhaustLook" v-model="fs.OutputNumber" />
                  </div>
                  <div class="form-group">
                    <label>排放口位置：</label>
                    <input type="text" class="form-control" :disabled="isYExhaustLook" v-model="fs.OutputPosition"/>
                    <label>排放口高度：</label>
                    <input type="text" class="form-control" :disabled="isYExhaustLook" v-model="fs.OutputHigh" />
                  </div>
                  <div class="form-group">
                    <label>出口内经：</label>
                    <input type="text" class="form-control" :disabled="isYExhaustLook"  v-model="fs.OutputDiameter" />
                    <label>经度：</label>
                    <input type="text" class="form-control" :disabled="isYExhaustLook"  v-model="fs.Longitude" />
                  </div>
                  <div class="form-group">
                    <label>纬度：</label>
                    <input type="text" class="form-control" :disabled="isYExhaustLook"  v-model="fs.Latitude" />
                    <label>状态：</label>
                    <input type="text" class="form-control" :disabled="isYExhaustLook" v-model="fs.Status"/>
                  </div>
                  <div class="form-group" style="width:100%" v-if="!isYExhaustLook">
                    注释：<span class="pk">*</span>为必填项
                    <button id ="fsclose" type="button" class="btn btn-default" data-dismiss="modal" style="float:right" @click="fsclose">关闭</button>
                    <button type="submit" class="btn btn-primary" style="float:right;margin-right:10px;">确定</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane">
          <div class="table-responsive mt15">
            <el-table :data="YeList" border style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}" @select-all="selectAll" @select="selectAll" >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="OutputCode" label="排放口编码" sortable width="180">
              </el-table-column>
              <el-table-column prop="OutputName" label="排放口名称" sortable>
              </el-table-column>
              <el-table-column prop="OutputPosition" label="排放口位置" sortable width="180">
              </el-table-column>
              <el-table-column prop="Status" label="状态" sortable width="150">
              </el-table-column>
              <el-table-column label="操作" width="200">
                <template scope="scope">
                  <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal01"
                          @click="YExhaustLook(scope.$index, scope.row)">查看
                  </button>
                  <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal01" @click="YExhaustUpdata(scope.$index, scope.row)">修改</button>
                  <button  class="btn btn-danger btn-sm" @click="YExhaustDel(scope.$index, scope.row)">删除</button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <page :number="10" :totalLength="yzfqitems.length" :getDatas="yzfqitems" v-on:listenToChildEvent="YEShowMsgFromChild" />
        </div>
      </el-tab-pane>
      <!--<el-tab-pane label="无组织废气排口" name="three">
        <button type="button" class="btn btn-primary btn-middle mlr" data-toggle="modal" data-target="#myModal02" @click="WExhaustAdd"> 新建 </button>
        <div class="modal fade" id="myModal02" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" v-if="isWExhaustAdd">无组织废气排口(新增页面)</h4>
                <h4 class="modal-title" v-if="isWExhaustUpdata">无组织废气排口(修改页面)</h4>
              </div>
              <div class="modal-body ml0">
                <form class="form-inline clearfix" @submit.prevent="wzhfSubmit">
                  <div class="form-group">
                    <label for="shuru1">排放口名称：</label>
                    <input type="text" required="required" class="form-control" v-model="wzhfs.name"/>
                  </div>
                  <div class="form-group">
                    <label for="shuru2">排放口编号：</label>
                    <input type="text" required="required" class="form-control" v-model="wzhfs.code" />
                  </div>
                  <div class="form-group">
                    <label>经度：</label>
                    <input type="text" required="required" class="form-control"  v-model="wzhfs.longitude" />
                  </div>
                  <div class="form-group">
                    <label>纬度：</label>
                    <input type="text" required="required" class="form-control"  v-model="wzhfs.latitude" />
                  </div>
                  <div class="form-group">
                    <label for="shuru7">排放口位置：</label>
                    <input type="text" required="required" class="form-control" id="shuru7" v-model="wzhfs.position"/>
                  </div>
                  <div class="form-group">
                    <label for="shuru7">状态：</label>
                    <input type="text" required="required" class="form-control" id="shuru7" v-model="wzhfs.status"/>
                  </div>
                  <div class="form-group" style="width:100%">
                    <button id ="wzhfsclose" type="button" class="btn btn-default" data-dismiss="modal" style="float:right" @click="wzhfsclose">关闭</button>
                    <button type="submit" class="btn btn-primary" style="float:right;margin-right:10px;">确定</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane">
          <div class="table-responsive mt15">
            <table class="table table-bordered table-hover">
              <thead>
              <tr>
                <td>排放口编号</td>
                <td>排放口名称</td>
                <td>排放口位置</td>
                <td>状态</td>
                <td>操作</td>
              </tr>
              </thead>
              <tbody v-for="item in wzfqitems">
              <tr class="talign-center">
                <td>{{item.code}}</td>
                <td>{{item.name}}</td>
                <td>{{item.position}}</td>
                <td>{{item.status}}</td>
                <td>
                  <button type="button" class="btn btn-primary btn-xs" data-toggle="modal" data-target="#myModal02" @click="WExhaustUpdata(item)">修改</button>
                  <button type="button" class="btn btn-default btn-xs">停用</button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </el-tab-pane>-->
      <el-tab-pane label="固废排放" name="fourth">

        <div class="buttons">
          <a class="btn btn-primary btn-middle" data-toggle="modal" data-target="#myModal03" @click="SwAdd"> 新建 </a>
          <a class="btn btn-danger" @click="SwDelAll(select)">批量删除</a>
        </div>

        <div class="modal fade" id="myModal03" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" v-if="isSwAdd">固废(新增页面)</h4>
                <h4 class="modal-title" v-if="isSwLook">固废(查看页面)</h4>
                <h4 class="modal-title" v-if="isSwUpdata">固废(修改页面)</h4>
              </div>
              <div class="modal-body ml0 TheTwoColumn">
                <form class="form-inline clearfix TheTwoColumn" @submit.prevent="gfcxSubmit">
                  <div class="form-group">
                    <label >固废名称：</label>
                    <input type="text" :disabled="isSwLook" class="form-control" v-model="gfcx.SolidWastesName"/>
                    <label ><span class="pk">*</span>固废编码：</label>
                    <input type="text" required="required" :disabled="isSwLook" class="form-control" v-model="gfcx.SolidWastesCode"/>
                  </div>
                  <div class="form-group">
                    <label >固废类别：</label>
                    <input type="text" :disabled="isSwLook"  class="form-control" v-model="gfcx.SolidWastesClass" />
                    <label>产生量：</label>
                    <input type="text" :disabled="isSwLook"  class="form-control"  v-model="gfcx.Productivity" />
                  </div>
                  <div class="form-group">
                    <label >利用处置量：</label>
                    <input type="text" :disabled="isSwLook"  class="form-control" v-model="gfcx.UseWaste"/>
                    <label >贮存量：</label>
                    <input type="text" :disabled="isSwLook"  class="form-control"  v-model="gfcx.StockOf"/>
                  </div>
                  <div class="form-group">
                    <label >处置情况：</label>
                    <input type="text" :disabled="isSwLook"  class="form-control"  v-model="gfcx.UseWasteInfo"/>
                  </div>
                  <div class="form-group" style="width:100%" v-if="!isSwLook">
                    注释：<span class="pk">*</span>为必填项
                    <button id ="gfcxclose" type="button" class="btn btn-default" data-dismiss="modal" style="float:right" @click="gfcxclose">关闭</button>
                    <button type="submit" class="btn btn-primary" style="float:right;margin-right:10px;">确定</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane">
          <div class="table-responsive mt15">
            <el-table :data="SwList" border style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}" @select-all="selectAll" @select="selectAll" >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="SolidWastesCode" label="固废编码" sortable width="150">
              </el-table-column>
              <el-table-column prop="SolidWastesName" label="固废名称" sortable>
              </el-table-column>
              <el-table-column prop="SolidWastesClass" label="固废类别" sortable width="140">
              </el-table-column>
              <el-table-column prop="Productivity" label="产生量" sortable width="120">
              </el-table-column>
              <el-table-column prop="UseWaste" label="利用处置量" sortable width="130">
              </el-table-column>
              <el-table-column label="操作" width="200">
                <template scope="scope">
                  <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal03"
                          @click="SwLook(scope.$index, scope.row)">查看
                  </button>
                  <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal03" @click="SwUpdata(scope.$index, scope.row)">修改</button>
                  <button  class="btn btn-danger btn-sm" @click="SwDel(scope.$index, scope.row)">删除</button>
                </template>
              </el-table-column>

            </el-table>
            <!--固废分页-->

          </div>
          <page :number="10" :totalLength="gfcxitems.length" :getDatas="gfcxitems" v-on:listenToChildEvent="SwShowMsgFromChild" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="噪声排放" name="five">
        <div class="buttons">
          <a class="btn btn-primary btn-middle" data-toggle="modal" data-target="#myModal04" @click="noiseAdd"> 新建 </a>
          <a class="btn btn-danger" @click="noiseDelAll(select)">批量删除</a>
        </div>

        <div class="modal fade" id="myModal04" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" v-if="isNoiseAdd">噪声(新增页面)</h4>
                <h4 class="modal-title" v-if="isNoiseLook">噪声(查看页面)</h4>
                <h4 class="modal-title" v-if="isNoiseUpdata">噪声(修改页面)</h4>
              </div>
              <div class="modal-body ml0">
                <form class="form-inline clearfix TheTwoColumn" @submit.prevent="zscxSubmit">
                  <div class="form-group">
                    <label >噪声源名称：</label>
                    <input type="text" :disabled="isNoiseLook" class="form-control" v-model="zscx.NoiseSourceName"/>
                    <label ><span class="pk">*</span>噪声编码：</label>
                    <input type="text" :disabled="isNoiseLook" required="required" class="form-control" v-model="zscx.NoiseSourceCode"/>
                  </div>
                  <div class="form-group">
                    <label for="zscx01">噪声源类型：</label>
                    <el-select v-model="zscx.NoiseSourceType" placeholder="请选择" :disabled="isNoiseLook">
                      <el-option
                        v-for="item in noiseSourceDate"
                        :key="item.Name"
                        :label="item.Name"
                        :value="item.Name">
                      </el-option>
                    </el-select>
                    <label>监测点位置：</label>
                    <input type="text"  :disabled="isNoiseLook" class="form-control"  v-model="zscx.Locations" />
                  </div>
                  <div class="form-group">
                    <label >排放标准：</label>
                    <el-select v-model="zscx.EmissionsStandards" placeholder="请选择" :disabled="isNoiseLook">
                      <el-option
                        v-for="item in standardDate"
                        :key="item.Name"
                        :label="item.Name"
                        :value="item.Name">
                      </el-option>
                    </el-select>
                    <label >监测频次：</label>
                    <input type="text"  :disabled="isNoiseLook" class="form-control"  v-model="zscx.MonitoringFrequency" />
                  </div>
                  <div class="form-group">
                    <label >功能区类别：</label>
                    <el-select v-model="zscx.FunctionAreaCode" placeholder="请选择" :disabled="isNoiseLook">
                      <el-option
                        v-for="item in categoryDate"
                        :key="item.Name"
                        :label="item.Name"
                        :value="item.Name">
                      </el-option>
                    </el-select>
                    <label >房间类型：</label>
                    <el-select v-model="zscx.RoomType" placeholder="请选择" :disabled="isNoiseLook">
                      <el-option
                        v-for="item in RoomDate"
                        :key="item.Name"
                        :label="item.Name"
                        :value="item.Name">
                      </el-option>
                    </el-select>
                  </div>
                  <div class="form-group">
                    <label >倍频带中心频率/Ｈｚ：</label>
                    <el-select v-model="zscx.OctaveBand" placeholder="请选择" :disabled="isNoiseLook">
                      <el-option
                        v-for="item in frequencyDate"
                        :key="item.Name"
                        :label="item.Name"
                        :value="item.Name">
                      </el-option>
                    </el-select>
                    <label >昼间标准值：</label>
                    <input type="text" :disabled="isNoiseLook"  class="form-control"  v-model="zscx.DaytimeStandard"/>
                  </div>
                  <div class="form-group">
                    <label >夜间标准值：</label>
                    <input type="text" :disabled="isNoiseLook" class="form-control"  v-model="zscx.NightStandard"/>
                  </div>
                  <div class="form-group" style="width:100%" v-if="!isNoiseLook">
                    注释：<span class="pk">*</span>为必填项
                    <button id ="zscxclose" type="button" class="btn btn-default" data-dismiss="modal" style="float:right" @click="zscxclose">关闭</button>
                    <button type="submit" class="btn btn-primary" style="float:right;margin-right:10px;">确定</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane">
          <div class="table-responsive mt15">
            <el-table :data="ZsList" border style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}" @select-all="selectAll" @select="selectAll" >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="NoiseSourceCode" label="噪声源编码" sortable width="170">
              </el-table-column>
              <el-table-column prop="NoiseSourceName" label="噪声源名称" width="170">
              </el-table-column>
              <el-table-column prop="NoiseSourceType" label="噪声源类型" width="170">
              </el-table-column>
              <el-table-column prop="Locations" label="监测点位置">
              </el-table-column>
              <el-table-column label="操作" width="200">
                <template scope="scope">
                  <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal04"
                          @click="noiseLook(scope.$index, scope.row)">查看
                  </button>
                  <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal04" @click="noiseUpdata(scope.$index, scope.row)">修改</button>
                  <button  class="btn btn-danger btn-sm" @click="noiseDel(scope.$index, scope.row)">删除</button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!--污水分页-->
          <page :number="10" :totalLength="zscxitems.length" :getDatas="zscxitems" v-on:listenToChildEvent="noiseShowMsgFromChild" />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import Bus from '../vuex/bus.js'
  import page from '../common/page';
  export default {
    components:{
      page // 注册分页组件
    },
    data() {
      return {
        options2:[],
        selectedOptions1: [],
        eiaDictionary:{},
        props: {
          value: 'label',
          children: 'children'
        },
        currentPages:1,
        SwCurrentPages:1,
        YeCurrentPages:1,
        ZsCurrentPages:1,
        SewageList:[],
        SwList:[],
        YeList:[],
        ZsList:[],
        items:[],
        WhereaboutsDate:[],
        basinDate:[],
        funDate:[],
        noiseSourceDate:[],
        standardDate:[],
        categoryDate:[],
        frequencyDate:[],
        RoomDate:[],
        isSewageAdd:true,
        isSewageLook:true,
        isSewageUpdata:true,
        isYExhaustAdd:true,
        isYExhaustLook:true,
        isYExhaustUpdata:true,
        isWExhaustAdd:true,
        isWExhaustUpdata:true,
        isSwAdd:true,
        isSwLook:true,
        isSwUpdata:true,
        isNoiseAdd:true,
        isNoiseLook:true,
        isNoiseUpdata:true,
        zscxitems:[],
        yzfqitems:[],
        wzfqitems:[],
        gfcxitems:[],
        activeName2: 'first',
        user: {
          OutputName: '',
          OutputCode: '',
          OutPutWhitherCode:"",
          Dispose:"",
          OutputPosition:"",
          Longitude:"",
          Latitude:"",
          ValleyCode:"",
          FunctionAreaCode:"",
          Status:""
        },
        fs: {
          OutputCode: '',
          OutputName: '',
          FunctionAreaCode:"",
          OutputNumber:"",
          OutputPosition:"",
          OutputHigh:"",
          OutputDiameter:"",
          Longitude:"",
          Latitude:"",
          Status:""
        },
        wzhfs: {
          name: '',
          code: '',
          longitude:"",
          latitude:"",
          position:"",
          status:""
        },
        gfcx:{
          SolidWastesCode:"",
          SolidWastesName:"",
          SolidWastesClass:"",
          Productivity:"",
          UseWaste:"",
          StockOf:"",
          UseWasteInfo:""
        },
        zscx:{
          RoomType:"",
          OctaveBand:"",
          NoiseSourceCode:"",
          NoiseSourceName:"",
          NoiseSourceType:"",
          Locations:"",
          EmissionsStandards:"",
          MonitoringFrequency:"",
          FunctionAreaCode:"",
          DaytimeStandard:"",
          NightStandard:""
        },
        id:""
      }
    },
    beforeCreate(){},
    beforeMount(){},
    mounted(){},
    created(){
      Bus.$on('getTarget', ccc => {
        this.ccc()
      });
      this.wscx(this.id);
      this.yzfscx(this.id);
      //this.wzhfscx(this.id);
      this.getgfcx(this.id);
      this.getzscx(this.id);
    },
    beforeUpdate(){
      this.id=sessionStorage.getItem("ID");
    },
    updated(){  },
    activated(){  },
    deactivated(){   },
    beforeDestroy(){},
    destroyed(){  },
    watch:{
      id(val){
        this.wscx(val);
        this.yzfscx(val);
        //this.wzhfscx(val);
        this.getgfcx(val);
        this.getzscx(val);
      },
      //分页有用 监听变化
      'items':function(arr){
        this.items = arr;
      },
      'currentPages':function(val){
        this.select = [];
      },
      'SwCurrentPages':function(val){
        this.select = [];
      },
      'YeCurrentPages':function(val){
        this.select = [];
      },
      'ZsCurrentPages':function(val){
        this.select = [];
      }
    },
    methods: {
      ccc(){
        this.id=sessionStorage.getItem("ID");
        this.wscx(this.id);
      },
      //排口
      SewageAdd:function(){
        this.isSewageAdd = true;
        this.isSewageLook = false;
        this.isSewageUpdata = false;
        this.selectedOptions1 = [];
        this.user =  {
          OutputName: '',
          OutputCode: '',
          OutPutWhitherCode:"",
          Dispose:"",
          OutputPosition:"",
          Longitude:"",
          Latitude:"",
          ValleyCode:"",
          FunctionAreaCode:"",
          Status:""
        }
      },
      SewageUpdata:function(index, row){
        this.isSewageAdd = false;
        this.isSewageLook = false;
        this.isSewageUpdata = true;
        this.user = row;
        this.selectedOptions1 = this.user["ValleyCode"].split(",");
      },
      submit: function(event) {
        this.user["COCode"]=this.id;
        this.user["TableCode"]='A003';
        var formData = JSON.stringify(this.user);
        var url = "";
        var a = '/api/pi';
        var b = '/api/pu';
        if(this.isSewageAdd){
          url = a;
        }
        if(this.isSewageUpdata){
          url = b;
        }
        this.$http.post(url,formData,{emulateJSON:true}).then((res) => {
          if(res.body.message==="successful"){
            this.close();
            this.wscx(this.id);
          }
          if(res.body.success ===false){
            this.$message({showClose: true,message:res.body.message,type: 'error'});
          }
        }, (req) => {
          console.log("提交失败")
        });
      },
      selectAll(selection){
        this.select = selection;
      },
      SewageDelAll:function(arr){
        var delId = [];
        var delIdAll = [];
        for(var key in arr){
          delId.push(arr[key].RecordCode);
          if(!arr[key].FileInfo == []){
            delIdAll.push(arr[key].FileInfo[0].RecordCode);
          }
        }

        if(delId.length === 0){
          this.$message({showClose: true,message:"没有选中数据或者页签发生改变",type: 'error'});
          return false;
        }
        this.$http.post('/api/pd', {TableCode: 'A003',COCode:this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
          if (res.body.message === "successful") {
            this.wscx(this.id);
          }}, (req) => {
          console.log("删除失败")
        });
      },
      //查看
      SewageLook:function (index, row) {
        this.isSewageAdd = false;
        this.isSewageLook = true;
        this.isSewageUpdata = false;
        this.user = row;
        this.selectedOptions1 = this.user["ValleyCode"].split(",");
      },
      //删除
      SewageDel: function (index, row) {
        var delId = row.RecordCode;
        this.$http.post('/api/pd', {TableCode: 'A003',COCode: this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
          if (res.body.message === "successful") {
            this.wscx(this.id);
          }}, (req) => {
          console.log("删除失败")
        });
      },
      close:function(){
        document.getElementById("buttonClose").click();
      },
      wscx:function(id){
        this.$http.get('/api/ps?TableCode=A003&COCode='+id).then(function(res){
          this.items = res.body.data;
          this.SewageList = this.items;
          this.getSelectDate('O006');
          this.getSelectDate('O008');
        },function(err){
          console.log(err)
        });

        this.$http.get('/api/ps?UseOrNot=1&TableCode=O007').then(function(res){
          if(res.body.success===true){
            let Award = res.body.data;
            for(let k in Award){
              if(this.eiaDictionary[Award[k].ParentNode] === undefined ){
                this.eiaDictionary[Award[k].ParentNode] = [];
              }
              this.eiaDictionary[Award[k].ParentNode].push(Award[k])
            }
            this.init('root');
          }
          else{
            this.$message({showClose: true,message:"数据字典请求失败",type: 'error'});
          }
        },function(err){})
      },
      /*下来菜单*/
      getSelectDate(code){
        this.$http.get('/api/ps?TableCode='+code).then(function(res){
          if (res.body.success===true){
            switch (code){
              case 'O006':
                this.WhereaboutsDate = res.body.data;
                break;
              case 'O008':
                this.funDate = res.body.data;
                break;
              case 'O022':
                this.standardDate = res.body.data;
                break;
              case 'O023':
                this.categoryDate = res.body.data;
                break;
              case 'O024':
                this.frequencyDate = res.body.data;
                break;
              case 'O025':
                this.RoomDate = res.body.data;
                break;
              case 'O035':
                this.noiseSourceDate = res.body.data;
                break;
            }

          }
        })
      },
      //分页
      showMsgFromChild(msg,pages){
        this.SewageList = msg;
        this.currentPages = pages;
      },
      //多级下拉
      init:function(node){
        var data = this.eiaDictionary[node];
        if(data === undefined){
          return '';
        }
        var arr = [];
        for(let k=0; k<data.length; k++){
          let obj = {};
          obj.label = data[k].ValleyName;
          var s = this.init(data[k].ValleyCode);
          if(s!==''){
            obj.children= s;
          }
          if(node === 'root'){
            this.options2.push(obj)
          }
          else{
            arr.push(obj)
          }
        }
        if(node !== 'root'){
          return arr;
        }
      },
      handleChange1(value) {
        this.user["ValleyCode"] = value.join(",");
      },


      //废气查询
      YExhaustAdd:function(){
        this.isYExhaustAdd = true;
        this.isYExhaustLook = false;
        this.isYExhaustUpdata = false;
        this.fs = {
          OutputCode: '',
          OutputName: '',
          FunctionAreaCode:"",
          OutputNumber:"",
          OutputPosition:"",
          OutputHigh:"",
          OutputDiameter:"",
          Longitude:"",
          Latitude:"",
          Status:""
        }
      },
      YExhaustLook:function (index, row) {
        this.isYExhaustAdd = false;
        this.isYExhaustLook = true;
        this.isYExhaustUpdata = false;
        this.fs = row;
      },
      //删除
      YExhaustDel: function (index, row) {
        var delId = row.RecordCode;
        this.$http.post('/api/pd', {TableCode: 'A004',COCode: this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
          if (res.body.message === "successful") {
            this.yzfscx(this.id);
          }}, (req) => {
          console.log("删除失败")
        });
      },
      YExhaustDelAll:function(arr){
        var delId = [];
        for(var key in arr){
          delId.push(arr[key].RecordCode);
        }

        if(delId.length === 0){
          this.$message({showClose: true,message:"没有选中数据或者页签发生改变",type: 'error'});
          return false;
        }
        this.$http.post('/api/pd', {TableCode: 'A004',COCode:this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
          if (res.body.message === "successful") {
            this.yzfscx(this.id);
          }}, (req) => {
          console.log("删除失败")
        });
      },
      YExhaustUpdata:function(index,row){
        this.isYExhaustAdd = false;
        this.isYExhaustLook = false;
        this.isYExhaustUpdata = true;
        this.fs  = row;
      },
      yzfSubmit: function(event) {
        this.fs["COCode"]=this.id;
        this.fs["TableCode"]='A004';
        var formData = JSON.stringify(this.fs);
        var url = "";
        var a = '/api/pi';
        var b = '/api/pu';
        if(this.isYExhaustAdd){
          url = a;
        }
        if(this.isYExhaustUpdata){
          url = b;
        }
        this.$http.post(url,formData,{emulateJSON:true}).then((res) => {
          if(res.body.message==="successful"){
            this.fsclose();
            this.yzfscx(this.id);
          }
        }, (req) => {
          console.log("提交失败")
        });
      },
      fsclose:function(){
        document.getElementById("fsclose").click();
      },
      yzfscx:function(id){
        this.$http.get('/api/ps?TableCode=A004&COCode='+id)
          .then(function(res){
            this.yzfqitems = res.body.data;
          },function(err){
            console.log(err)
          })
      },
      YEShowMsgFromChild(msg,pages){
        this.YeList = msg;
        this.YeCurrentPages = pages;
      },

      //固废查询
      SwAdd:function(){
        this.isSwAdd = true;
        this.isSwLook = false;
        this.isSwUpdata = false;
        this.gfcx = {
          SolidWastesCode:"",
          SolidWastesName:"",
          SolidWastesClass:"",
          Productivity:"",
          UseWaste:"",
          StockOf:"",
          UseWasteInfo:""
        }
      },
      SwUpdata:function(index,row){
        this.isSwAdd = false;
        this.isSwLook = false;
        this.isSwUpdata = true;
        this.gfcx  = row;
      },
      gfcxSubmit: function(event) {
        this.gfcx["COCode"]=this.id;
        this.gfcx["TableCode"]='A005';
        var formData = JSON.stringify(this.gfcx);
        var url = "";
        var a = '/api/pi';
        var b = '/api/pu';
        if(this.isSwAdd){
          url  = a;
        }
        if(this.isSwUpdata){
          url = b;
        }
        this.$http.post(url,formData,{emulateJSON:true}).then((res) => {
          if(res.body.message==="successful"){
            this.gfcxclose();
            this.getgfcx(this.id);
          }
        }, (req) => {
          console.log("提交失败")
        });
      },
      SwLook:function (index, row) {
        this.isSwAdd = false;
        this.isSwLook = true;
        this.isSwUpdata = false;
        this.gfcx = row;
      },
      //删除
      SwDel: function (index, row) {
        var delId = row.RecordCode;
        this.$http.post('/api/pd', {TableCode: 'A005',COCode: this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
          if (res.body.message === "successful") {
            this.getgfcx(this.id);
          }}, (req) => {
          console.log("删除失败")
        });
      },
      SwDelAll:function(arr){
        var delId = [];
        for(var key in arr){
          delId.push(arr[key].RecordCode);
        }

        if(delId.length === 0){
          this.$message({showClose: true,message:"没有选中数据或者页签发生改变",type: 'error'});
          return false;
        }

        this.$http.post('/api/pd', {TableCode: 'A005',COCode:this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
          if (res.body.message === "successful") {
            this.getgfcx(this.id);
          }}, (req) => {
          console.log("删除失败")
        });
      },
      SwLook:function (index, row) {
        this.isSwAdd = false;
        this.isSwLook = true;
        this.isSwUpdata = false;
        this.gfcx = row;
      },
      //删除
      SwDel: function (index, row) {
        var delId = row.RecordCode;
        this.$http.post('/api/pd', {TableCode: 'A005',COCode: this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
          if (res.body.message === "successful") {
            this.getgfcx(this.id);
          }}, (req) => {
          console.log("删除失败")
        });
      },
      gfcxclose:function(){
        document.getElementById("gfcxclose").click();
      },
      getgfcx:function(id){
        this.$http.get('/api/ps?TableCode=A005&COCode='+id)
          .then(function(res){
            this.gfcxitems = res.body.data;
          },function(err){
            console.log(err)
          })
      },
      SwShowMsgFromChild(msg,pages){
        this.SwList = msg;
        this.SwCurrentPages = pages;
      },

      //噪声查询
      noiseAdd:function(){
        this.isNoiseAdd = true;
        this.isNoiseLook = false;
        this.isNoiseUpdata = false;
        this.zscx = {
          RoomType:"",
          OctaveBand:"",
          NoiseSourceCode:"",
          NoiseSourceName:"",
          NoiseSourceType:"",
          Locations:"",
          EmissionsStandards:"",
          MonitoringFrequency:"",
          FunctionAreaCode:"",
          DaytimeStandard:"",
          NightStandard:""
        }
      },
      noiseUpdata:function(index,row){
        this.isNoiseAdd = false;
        this.isNoiseLook = false;
        this.isNoiseUpdata = true;
        this.zscx = row;
      },
      zscxSubmit: function(event) {
        this.zscx["COCode"]=this.id;
        this.zscx["TableCode"]='A006';
        var formData = JSON.stringify(this.zscx);
        var url = "";
        var a = '/api/pi';
        var b = '/api/pu';
        if(this.isNoiseAdd){
          url  = a;
        }
        if(this.isNoiseUpdata){
          url = b;
        }
        this.$http.post(url,formData,{emulateJSON:true}).then((res) => {
          if(res.body.message==="successful"){
            this.zscxclose();
            this.getzscx(this.id);
          }
        }, (req) => {
          console.log("提交失败")
        });
      },
      noiseLook:function (index, row) {
        this.isNoiseAdd = false;
        this.isNoiseLook = true;
        this.isNoiseUpdata = false;
        this.zscx = row;
      },
      //删除
      noiseDel: function (index, row) {
        var delId = row.RecordCode;
        this.$http.post('/api/pd', {TableCode: 'A006',COCode: this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
          if (res.body.message === "successful") {
            this.getzscx(this.id);
          }}, (req) => {
          console.log("删除失败")
        });
      },
      noiseDelAll:function(arr){
        var delId = [];
        for(var key in arr){
          delId.push(arr[key].RecordCode);
        }

        if(delId.length === 0){
          this.$message({showClose: true,message:"没有选中数据或者页签发生改变",type: 'error'});
          return false;
        }

        this.$http.post('/api/pd', {TableCode: 'A006',COCode:this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
          if (res.body.message === "successful") {
            this.getzscx(this.id);
          }}, (req) => {
          console.log("删除失败")
        });
      },
      noiseLook:function (index, row) {
        this.isNoiseAdd = false;
        this.isNoiseLook = true;
        this.isNoiseUpdata = false;
        this.zscx = row;
      },
      //删除
      noiseDel: function (index, row) {
        var delId = row.RecordCode;
        this.$http.post('/api/pd', {TableCode: 'A006',COCode: this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
          if (res.body.message === "successful") {
            this.getzscx(this.id);
          }}, (req) => {
          console.log("删除失败")
        });
      },
      zscxclose:function(){
        document.getElementById("zscxclose").click();
      },
      getzscx:function(id){
        this.$http.get('/api/ps?TableCode=A006&COCode='+id)
          .then(function(res){
            this.zscxitems = res.body.data;
            this.getSelectDate('O022');
            this.getSelectDate('O023');
            this.getSelectDate('O024');
            this.getSelectDate('O035');
          },function(err){
            console.log(err)
          })
      },
      noiseShowMsgFromChild(msg,pages){
        this.ZsList = msg;
        this.ZsCurrentPages = pages;
      },
    }
  }
</script>
<style scoped>
  ul,ol{
    list-style: none
  }
  .mr458{
    margin-left: 454px;
  }
  .mb10{
    margin-bottom: 10px;
  }
  .modal-content .modal-body .TheTwoColumn .form-group label{
    width: 105px;
  }


</style>
