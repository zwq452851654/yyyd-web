<template>
  <div id="enterprise" class="col-md-12"><!-- @tab-click="wen($event)"-->

    <el-tabs id="Tab1758" v-model="activeName2" type="card" @tab-click="wen($event)">
      <el-tab-pane id="first" label="污水排口" name="first" >

        <div class="buttons mar">
          <a class="btn btn-primary btn-middle mlr" data-toggle="modal" data-target="#myModal" @click="SewageAdd"> 新建 </a>
          <a class="btn btn-danger" @click="SewageDelAll(select)">批量删除</a>

        </div>

        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"  v-if="sewage">
          <div class="modal-dialog" role="document" style="width: 640px;">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" v-if="isSewageAdd">污水(新增页面)</h4>
                <h4 class="modal-title" v-if="isSewageLook">污水(查看页面)</h4>
                <h4 class="modal-title" v-if="isSewageUpdata">污水(修改页面)</h4>
              </div>
              <div class="modal-body ml0">
                <form class="form-inline clearfix" @submit.prevent="submit">
                  <div class="form-group">
                    <label><span class="pk">*</span>项目名称：</label>
                    <input type="text" required="required" class="form-control" :disabled="isSewageLook" v-model="user.ProjectName"/>
                  </div>
                  <div class="form-group">
                    <label>污水排口数量(个)：</label>
                    <input type="text" :disabled="isSewageLook" class="form-control" v-model="user.OutputNumber" />
                  </div>
                  <div class="form-group">
                    <label>污水排放量(万吨)：</label>
                    <input type="text" class="form-control" :disabled="isSewageLook" v-model="user.Flow"/>
                  </div>
                  <div class="form-group">
                    <label>污水排放去向：</label>
                    <input type="text"  class="form-control" :disabled="isSewageLook" v-model="user.OutPutWhitherCode" />
                  </div>
                  <div class="form-group">
                    <label>污水治理设施(套)：</label>
                    <input type="text" class="form-control" :disabled="isSewageLook" v-model="user.Facilities" />
                  </div>
                  <div class="form-group">
                    <label>处理能力(吨/日)：</label>
                    <input type="text" class="form-control" :disabled="isSewageLook" v-model="user.ProcessingCapacity" />
                  </div>
                  <div class="form-group">
                  <label>是否能力不足：</label>
                  <select class="form-control" :disabled="isSewageLook" v-model="user.IsACK">
                  <option value="-------请选择-------">-------请选择-------</option>

                  <option value="是">是</option>
                  <option value="否">否</option>
                  </select>
                  </div>
                  <div class="form-group">
                    <label>COD排放量：</label>
                    <input type="text" class="form-control" :disabled="isSewageLook" v-model="user.CODFlow"/>
                  </div>
                  <div class="form-group">
                    <label>NH3排放量(吨)：</label>
                    <input type="text" class="form-control" :disabled="isSewageLook" v-model="user.NH3Flow"/>
                  </div>
                  <div class="form-group">
                    <label>石油类排放量(吨)：</label>
                    <input type="text" class="form-control" :disabled="isSewageLook" v-model="user.OilFlow"/>
                  </div>

                  <div class="form-group">
                    <tabel>附&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;件：</tabel>
                    <div v-if="isSewageAdd ||isSewageUpdata">
                      <uploadFile ref="upload" @end="drawing" @listenState="listenstatus" :childUrl="fileurl" :codenum="codeNumber"></uploadFile>
                      <ul v-if ="isSewageUpdata" class="filesUrl">
                        <li v-for="item in files" :id="item.RecordCode"><span class="toadded">{{item.FileName}}</span><span class="deltate" @click="deltaed(item.Path,item.FileName,item.RecordCode)">删除</span></li>
                      </ul>
                    </div>
                    <div v-if="isSewageLook">
                      <ul>
                        <li v-for="item in files">{{item.FileName}}</li>
                      </ul>
                    </div>
                  </div>

                  <div class="form-group" style="width:100%" v-if="!isSewageLook">
                    <button id ="buttonClose" type="button" class="btn btn-default" data-dismiss="modal" style="float:right" @click="close">关闭</button>
                    <button type="submit"  class="btn btn-primary" style="float:right;margin-right:10px;">确定</button>
                    注释：<span class="pk">*</span>为必填项
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div class="tab-pane" v-if="sewage">
          <div class="table-responsive mt15">
            <el-table @selection-change="handleSelectionChange" :data="SewageList" border style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}" @select-all="selectAll" @select="selectAll">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="ProjectName" label="项目名称" width="180">
              </el-table-column>
              <el-table-column prop="OutputNumber" label="污水排口数量" sortable width="140">
              </el-table-column>
              <el-table-column prop="Flow" label="污水排放量" sortable width="130">
              </el-table-column>
              <el-table-column prop="IsACK" label="是否能力不足" width="130">
              </el-table-column>

              <el-table-column label="附件">
                <!--渲染以及下载附件-->
                <template scope="props">
                  <el-tag  v-for="tag in props.row.FileInfo" type="primary" class="FileInfo" >
                    <a v-bind:href="'/api/fu?path='+tag.Path+'/'+tag.TrueName">{{tag.FileName}}</a>
                  </el-tag>
                </template>
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
      <el-tab-pane id="second" label="废气排口" name="second">
        <div class="buttons mar">
          <a class="btn btn-primary btn-middle" data-toggle="modal" data-target="#myModal01" @click="YExhaustAdd"> 新建 </a>
          <a class="btn btn-danger" @click="YExhaustDelAll(select)">批量删除</a>
        </div>

        <div class="modal fade" id="myModal01" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" v-if="wasteGas">
          <div class="modal-dialog" role="document" style="width: 640px">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" v-if="isYExhaustAdd">废气排口(新增页面)</h4>
                <h4 class="modal-title" v-if="isYExhaustLook">废气排口(查看页面)</h4>
                <h4 class="modal-title" v-if="isYExhaustUpdata">废气排口(修改页面)</h4>
              </div>
              <div class="modal-body ml0">
                <form class="form-inline clearfix" @submit.prevent="yzfSubmit">
                  <div class="form-group">
                    <label><span class="pk">*</span>项目名称：</label>
                    <input type="text" required="required" :disabled="isYExhaustLook" class="form-control" v-model="fs.ProjectName"/>
                  </div>
                  <div class="form-group">
                    <label>排放口名称：</label>
                    <input type="text" class="form-control" :disabled="isYExhaustLook" v-model="fs.OutputName"/>
                  </div>
                  <div class="form-group">
                    <label>废气排口数量(个)：</label>
                    <input type="text" class="form-control" :disabled="isYExhaustLook"  v-model="fs.OutputNumber" />
                  </div>
                  <div class="form-group">
                    <label>废气排放量(万标立米)：</label>
                    <input type="text" class="form-control" :disabled="isYExhaustLook" v-model="fs.Flow" />
                  </div>
                  <div class="form-group">
                    <label>废气治理设施(套)：</label>
                    <input type="text" class="form-control" :disabled="isYExhaustLook" v-model="fs.Facilities"/>
                  </div>
                  <div class="form-group">
                    <label>锅炉数(台)：</label>
                    <input type="text" class="form-control" :disabled="isYExhaustLook" v-model="fs.BoilerSize" />
                  </div>
                  <div class="form-group">
                    <label>工业炉数(座)：</label>

                    <input type="text" class="form-control" :disabled="isYExhaustLook"  v-model="fs.IndustrialSize" />
                  </div>
                  <div class="form-group">
                    <label>SO2排放量(吨)：</label>
                    <input type="text" class="form-control" :disabled="isYExhaustLook"  v-model="fs.So2Flow" />
                  </div>
                  <div class="form-group">
                    <label>NOX排放量(吨)：</label>
                    <input type="text" class="form-control" :disabled="isYExhaustLook"  v-model="fs.NoxFlow" />
                  </div>
                  <div class="form-group">
                    <label>粉尘排放量：</label>
                    <input type="text" class="form-control" :disabled="isYExhaustLook" v-model="fs.DustFlow"/>
                  </div>
                  <div class="form-group">
                    <label>烟尘排放量(吨)：</label>
                    <input type="text" class="form-control" :disabled="isYExhaustLook" v-model="fs.SmokeFlow"/>
                  </div>
                  <div class="form-group" style="clear: both">
                    <tabel>附&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;件：</tabel>
                    <div v-if="isYExhaustAdd ||isYExhaustUpdata">
                      <uploadFile ref="upload" @end="YE_drawing" @listenState="YE_listenstatus" :childUrl="fileurl" :codenum="codeNumber"></uploadFile>
                      <ul v-if ="isYExhaustUpdata" class="filesUrl">
                        <li v-for="item in files" :id="item.RecordCode" ><span class="toadded">{{item.FileName}}</span><span class="deltate" @click="YE_deltaed(item.Path,item.FileName,item.RecordCode)">删除</span></li>
                      </ul>
                    </div>
                    <div v-if="isYExhaustLook">
                      <ul>
                        <li v-for="item in files">{{item.FileName}}</li>
                      </ul>
                    </div>
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
        <div class="tab-pane" v-if="wasteGas">
          <div class="table-responsive mt15">
            <el-table @selection-change="YE_handleSelectionChange" :data="YeList" border style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}" @select-all="selectAll" @select="selectAll">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="ProjectName" label="项目名称" sortable width="180">
              </el-table-column>
              <el-table-column prop="OutputNumber" label="废气排口数量" sortable width="160">
              </el-table-column>
              <el-table-column prop="Flow" label="废气排放量" sortable width="160">
              </el-table-column>
              <el-table-column label="附件">
              <!--渲染以及下载附件-->
              <template scope="props">
                <el-tag  v-for="tag in props.row.FileInfo" type="primary" class="FileInfo" >
                  <a v-bind:href="'/api/fu?path='+tag.Path+'/'+tag.TrueName">{{tag.FileName}}</a>
                </el-tag>
              </template>
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
      <el-tab-pane id="fourth" label="固废排放" name="fourth">
      <div class="buttons mar">
        <a class="btn btn-primary btn-middle" data-toggle="modal" data-target="#myModal03" @click="SwAdd"> 新建 </a>
        <a class="btn btn-danger" @click="SwDelAll(select)">批量删除</a>
      </div>

      <div class="modal fade" id="myModal03" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" v-if="solidWaste">
        <div class="modal-dialog" role="document" style="width: 640px;">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 class="modal-title" v-if="isSwAdd">固废(新增页面)</h4>
              <h4 class="modal-title" v-if="isSwLook">固废(查看页面)</h4>
              <h4 class="modal-title" v-if="isSwUpdata">固废(修改页面)</h4>
            </div>
            <div class="modal-body ml0" v-if="solidWaste">
              <form class="form-inline clearfix" @submit.prevent="gfcxSubmit" id="NoFloat">
                <div class="form-group">
                  <label ><span class="pk">*</span>项目名称：</label>
                  <input type="text" required="required" :disabled="isSwLook" class="form-control" v-model="gfcx.ProjectName"/>
                  注释：<span class="pk">*</span>为必填项
                </div>
                <div class="form-group">
                  <label >危废产生量(吨/年)：</label>
                  <input type="text" :disabled="isSwLook" class="form-control" v-model="gfcx.ProductFlow"/>
                </div>
                <div class="form-group">
                  <label >危废储存量(吨)：</label>
                  <input type="text" :disabled="isSwLook"  class="form-control" v-model="gfcx.StorageFlow" />

                </div>
                <div class="form-group">
                  <label>危废处置去向：</label>
                  <input type="text" :disabled="isSwLook"  class="form-control"  v-model="gfcx.Arrive" />
                </div>
                <div class="form-group">
                  <label >是否办理转移联单：</label>
                  <input type="text" :disabled="isSwLook"  class="form-control" v-model="gfcx.IsAck"/>
                </div>
                <div class="form-group">
                  <label >一般固废产生量(吨)：</label>
                  <input type="text" :disabled="isSwLook"  class="form-control"  v-model="gfcx.SimpleFlow"/>
                </div>

                <div class="form-group">
                  <tabel>附&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;件：</tabel>
                  <div v-if="isSwAdd ||isSwUpdata">
                    <uploadFile ref="upload" @end="Sw_drawing" @listenState="Sw_listenstatus" :childUrl="fileurl" :codenum="codeNumber"></uploadFile>
                    <ul v-if ="isSwUpdata" class="filesUrl">
                      <li v-for="item in files" :id="item.RecordCode" ><span class="toadded">{{item.FileName}}</span><span class="deltate" @click="Sw_deltaed(item.Path,item.FileName,item.RecordCode)">删除</span></li>
                    </ul>
                  </div>
                  <div v-if="isSwLook">
                    <ul>
                      <li v-for="item in files">{{item.FileName}}</li>
                    </ul>
                  </div>
                </div>

                <div class="form-group" style="width:100%" v-if="!isSwLook">
                  <button id ="gfcxclose" type="button" class="btn btn-default" data-dismiss="modal" style="float:right" @click="gfcxclose">关闭</button>
                  <button type="submit" class="btn btn-primary" style="float:right;margin-right:10px;">确定</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-pane" v-if="solidWaste">
        <div class="table-responsive mt15">
          <el-table @selection-change="Sw_handleSelectionChange" :data="SwList" border style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}" @select-all="selectAll" @select="selectAll" v-if="solidWaste">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="ProjectName" label="项目名称" sortable width="150">
            </el-table-column>
            <el-table-column prop="ProductFlow" label="危废产生量" sortable width="150">
            </el-table-column>
            <el-table-column prop="StorageFlow" label="危废储存量（吨/年）" sortable width="200">
            </el-table-column>
            <el-table-column label="附件">
              <!--渲染以及下载附件-->
              <template scope="props">
                <el-tag  v-for="tag in props.row.FileInfo" type="primary" class="FileInfo" >
                  <a v-bind:href="'/api/fu?path='+tag.Path+'/'+tag.TrueName">{{tag.FileName}}</a>
                </el-tag>
              </template>
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
      <el-tab-pane id="five" label="噪声排放" name="five">
        <div class="buttons mar">
          <a class="btn btn-primary btn-middle" data-toggle="modal" data-target="#myModal04" @click="noiseAdd"> 新建 </a>
          <a class="btn btn-danger" @click="noiseDelAll(select)">批量删除</a>
        </div>

        <div class="modal fade" id="myModal04" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog" role="document" style="width: 680px">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" v-if="isNoiseAdd">噪声(新增页面)</h4>
                <h4 class="modal-title" v-if="isNoiseLook">噪声(查看页面)</h4>
                <h4 class="modal-title" v-if="isNoiseUpdata">噪声(修改页面)</h4>
              </div>
              <div class="modal-body ml0" v-if="Noise">
                <form class="form-inline clearfix" @submit.prevent="zscxSubmit">
                  <div class="form-group">
                    <label ><span class="pk">*</span>项目名称：</label>
                    <input type="text" :disabled="isNoiseLook" required="required" class="form-control" v-model="zscx.ProjectName"/>
                  </div>
                  <div class="form-group">
                    <label ><span class="pk">*</span>噪声测点编码：</label>
                    <input type="text" required="required" :disabled="isNoiseLook" class="form-control" v-model="zscx.NoiseCode"/>
                  </div>
                  <div class="form-group">
                    <label>检测点：</label>
                    <input type="text"  :disabled="isNoiseLook" class="form-control"  v-model="zscx.Place" />
                  </div>

                  <div class="form-group">
                    <label >位置：</label>
                    <input type="text" :disabled="isNoiseLook"  class="form-control"  v-model="zscx.Position"/>
                  </div>
                  <div class="form-group">
                    <label >噪声源：</label>
                    <input type="text" :disabled="isNoiseLook" class="form-control"  v-model="zscx.Source"/>
                  </div>
                  <div class="form-group">
                    <label >噪声性质：</label>
                    <input type="text" :disabled="isNoiseLook" class="form-control"  v-model="zscx.Property"/>
                  </div>

                  <div class="form-group">
                    <label >功能区：</label>
                    <input type="text" :disabled="isNoiseLook" class="form-control"  v-model="zscx.Function"/>
                  </div>

                  <div class="form-group" style="width:100%">
                    <tabel>附&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;件：</tabel>
                    <div v-if="isNoiseAdd ||isNoiseUpdata">
                      <uploadFile ref="upload" @end="noise_drawing" @listenState="noise_listenstatus" :childUrl="fileurl" :codenum="codeNumber"></uploadFile>
                      <ul v-if ="isNoiseUpdata" class="filesUrl">
                        <li v-for="item in files" :id="item.RecordCode" ><span class="toadded">{{item.FileName}}</span><span class="deltate" @click="noise_deltaed(item.Path,item.FileName,item.RecordCode)">删除</span></li>
                      </ul>
                    </div>
                    <div v-if="isNoiseLook">
                      <ul>
                        <li v-for="item in files">{{item.FileName}}</li>
                      </ul>
                    </div>
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
            <el-table @selection-change="noise_handleSelectionChange" :data="ZsList" border style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}" @select-all="selectAll" @select="selectAll" v-if="Noise">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="ProjectName" label="项目名称" sortable width="170">
              </el-table-column>
              <el-table-column prop="NoiseCode" label="噪声编码" sortable width="170">
              </el-table-column>
              <el-table-column prop="NoiseSourceType" label="噪声源类型" sortable width="170">
              </el-table-column>
              <el-table-column label="附件">
                <!--渲染以及下载附件-->
                <template scope="props">
                  <el-tag  v-for="tag in props.row.FileInfo" type="primary" class="FileInfo" >
                    <a v-bind:href="'/api/fu?path='+tag.Path+'/'+tag.TrueName">{{tag.FileName}}</a>
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作">
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
  import uploadFile from '../common/uploadFile';
  export default {
    components:{
      uploadFile,
      page // 注册分页组件
    },
    data() {
      return {
        SewageCurrentPages:1,
        YECurrentPages:1,
        SwCurrentPages:1,
        ZsCurrentPages:1,
        sewage:true,  //污水的页面展示切换
        wasteGas:false, //废气的页面展示切换
        solidWaste:false, //固废的页面展示切换
        Noise:false, //噪声的页面展示切换
          /*文件上传所用开始*/
        isChecked:false,//子组件点击上传按钮之后的状态
        indexNum:"", //点击修改的索引值
        fileItems:[], //附件上传列表
        downadress:'', //下载地址
        codeNumber:"", //code
        codeNumber1:"", //code
        datalist:[],
        fileurl:[],
        files:"", //修改循环列表
        list:[], // 获取到数据之后 再执行一句 this.list = this.items  数据绑定 传list  传给分页 传items
        select:"", // 获取所有选中的数据
        state:'B002',
          /*文件上传所用结束*/
          /*全选开始*/
        checkedNames:[],//checkbox 数组
        checkAll: false,//全选
          /*全选结束*/
        SewageList:[],
        SwList:[],
        YeList:[],
        ZsList:[],
        items:[],
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
          ProjectName:"",
          OutputNumber:"",
          Flow:"",
          OutPutWhitherCode:"",
          Facilities:"",
          ProcessingCapacity:"",
          IsACK:"",
          CODFlow:"",
          NH3Flow:"",
          OilFlow:""
        },
        fs: {
          ProjectName:"",
          OutputNumber:"",
          Flow:"",
          Facilities:"",
          BoilerSize:"",
          IndustrialSize:"",
          So2Flow:"",
          NoxFlow:"",
          DustFlow:"",
          SmokeFlow:""
        },
        gfcx:{
          ProjectName:"",
          ProductFlow:"",
          StorageFlow:"",
          Arrive:"",
          IsAck:"",
          SimpleFlow:""
        },
        zscx:{
          ProjectName:"",
          NoiseCode:"",
          Place:"",
          Position:"",
          Source:"",
          Property:"",
          Function:""
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
        this.getgfcx(val);
        this.getzscx(val);
      },
      //分页有用 监听变化
      'items':function(arr){
        this.items = arr;
      },
      'codenum':function(val){
        this.codenum=val;
        this.submit(val);
      },
      'SewageCurrentPages':function(val){
        this.select = [];
      },
      'YECurrentPages':function(val){
        this.select = [];
      },
      'SwCurrentPages':function(val){
        this.select = [];
      },
      'ZsCurrentPages':function(val){
        this.select = [];
      }
    },
    methods: {
        wen(e){
            let idName = e.$el.id;
            if(idName == 'first'){
              this.state = 'B002';

              this.sewage = true;
              this.wasteGas = false;
              this.solidWaste = false;
              this.Noise = false;
              this.wscx(this.id);
            }else if(idName == 'second'){
              this.state = 'B003';

              this.wasteGas = true;
              this.sewage = false;
              this.solidWaste = false;
              this.Noise = false;

              this.yzfscx(this.id);
            }else if(idName === 'fourth'){
              this.state = 'B005';

              this.solidWaste = true;
              this.sewage = false;
              this.wasteGas = false;
              this.Noise = false;

              this.getgfcx(this.id);
            }else if(idName === 'five'){
              this.state = 'B004';

              this.Noise = true;
              this.sewage = false;
              this.wasteGas = false;
              this.solidWaste = false;

              this.getzscx(this.id)
            }
        },

      btnClick(){
        this.$refs.upload.childdd()
      },
      ccc(){
        this.id=sessionStorage.getItem("ID");
        this.wscx(this.id);
      },
      //排口
      handleSelectionChange(val) {
        val.forEach(item => {
          this.checkedNames.push(item.RecordCode);
        })
        this.multipleSelection = this.checkedNames.toString();
      },
      SewageAdd:function(){
        this.isSewageAdd = true;
        this.isSewageLook = false;
        this.isSewageUpdata = false;
        this.$refs.upload.clearFiles();
        this.user =  {
          ProjectName:"",
          OutputNumber:"",
          Flow:"",
          OutPutWhitherCode:"",
          Facilities:"",
          ProcessingCapacity:"",
          IsACK:"",
          CODFlow:"",
          NH3Flow:"",
          OilFlow:""
        }
      },
      SewageUpdata:function(index, row){
        this.isSewageAdd = false;
        this.isSewageLook = false;
        this.isSewageUpdata = true;
        this.$refs.upload.clearFiles();
        this.user = row;
        this.files=row.FileInfo;
        this.indexNum=row.RecordCode;
        this.$refs.upload.filePost();
      },
      submit: function(val) {
            this.user["COCode"]=this.id;
            this.user["TableCode"]='B002';
            var url = "";
            var a = '/api/pi';
            var b = '/api/pu';
            if(this.isSewageAdd){
              url = a;
            }
            if(this.isSewageUpdata){
              url = b;
              delete this.user.FileInfo;
            }
            var formData = JSON.stringify(this.user);
            this.$http.post(url,formData,{emulateJSON:true}).then((res) => {
              if(res.body.message==="successful"){
                if(this.isSewageAdd){
                  this.codeNumber=res.body.data[0].RecordCode;
                }
                if(this.isSewageUpdata){
                  this.codeNumber=this.indexNum;
                }
                if(val&&this.isChecked==true){
                  this.$refs.upload.filePost();
                }
                if(val&&this.isChecked==false){
                  this.close();
                  this.wscx(this.id);
                }
              }
              if(res.body.success ===false){
                this.$message({showClose: true,message:res.body.message,type: 'error'});
              }
            }, (req) => {
              console.log("提交失败")
            });

      },
      drawing(){
        this.close();
        this.wscx(this.id);
        this.isChecked = false;
      },
      // 子组件点击按成状态改变
      listenstatus(val){
        this.isChecked=val;
      },
      selectAll(selection){
        this.select = selection;
      },
      SewageDelAll:function(arr){
        var delId = [];
        var delIdAll = [];
        for(var key in arr){
          delId.push(arr[key].RecordCode);
          if(!(arr[key].FileInfo.length === 0)){
            delIdAll.push(arr[key].FileInfo[0].RecordCode);
          }else {
            continue;
          }
        }

        if(delId.length === 0){
          this.$message({showClose: true,message:"没有选中数据或者页签发生改变",type: 'error'});
          return false;
        }

        this.$http.post('/api/pd', {TableCode: 'B002',COCode:this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
          if (res.body.message === "successful") {
            if(delIdAll.length > 0){
              this.del(delIdAll);
            }
            this.wscx(this.id);
          }
        }, (req) => {

          this.$message({showClose: true,message:'删除失败',type: 'error'});
        });
      },
      //查看
      SewageLook:function (index, row) {
        this.isSewageAdd = false;
        this.isSewageLook = true;
        this.isSewageUpdata = false;
        this.files = row.FileInfo;
        this.user = row;
        console.log(row)
      },
      //删除
      SewageDel: function (index, row) {
        var delId = row.RecordCode;
        this.$http.post('/api/pd', {TableCode: 'B002',COCode: this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
          if (res.body.message === "successful") {
          //独立的删除附件方法 如果有附件
          if(row.FileInfo.length>0){

            this.del(row.FileInfo[0].RecordCode);

          }
            this.wscx(this.id);
          }}, (req) => {
          this.$message({showClose: true,message:'删除失败',type: 'error'});
        });
      },
      //修改页面删除功能
      deltaed:function(adressed,named,recorded){
        document.getElementById(recorded).style.display="none";
        this.$http.post("/api/pd",{TableCode:'M001',COCode:this.id,RecordCode:recorded}).then(function(res){
          if(res.body.success===true){
            this.$message({showClose: true,message:'文件删除成功',type: 'success'});
          }
        },function(err){

        })
      },
      //删除功能
      del:function(recorded){
        this.$http.post("/api/pd",{TableCode:'M001',COCode:this.id,RecordCode:recorded}).then(function(res){
          if(res.body.success === true){
            this.$message({showClose: true,message:"数据删除成功",type: 'success'});
          }
          else{
            this.$message({showClose: true,message:"数据删除失败",type: 'error'});
          }
        },function(err){console.log(err);})
      },

      close:function(){
        document.getElementById("buttonClose").click();
      },
      wscx:function(id){

        //this.state = 'B002';
        console.log('排口',this.state);
        this.fileurl=[this.$route.path,id,this.state,this.RecordCode];
        this.$http.get('/api/psf?TableCode=B002&COCode='+id).then(function(res){
          this.items = res.body.data;
          this.list = this.items;
        },function(err){
          console.log(err)
        })
      },
      //分页
      showMsgFromChild(msg,pages){
        this.SewageList = msg;
        this.SewageCurrentPages = pages;
      },
      //废气查询
      YE_handleSelectionChange(val) {
        val.forEach(item => {
          this.checkedNames.push(item.RecordCode);
        })
        this.multipleSelection = this.checkedNames.toString();
      },
      // 子组件点击按成状态改变
      YE_listenstatus(val){
        this.isChecked=val;
      },
      YExhaustAdd:function(){
        this.isYExhaustAdd = true;
        this.isYExhaustLook = false;
        this.isYExhaustUpdata = false;
        this.$refs.upload.clearFiles();
        this.fs = {
          ProjectName:"",
          OutputNumber:"",
          Flow:"",
          Facilities:"",
          BoilerSize:"",
          IndustrialSize:"",
          So2Flow:"",
          NoxFlow:"",
          DustFlow:"",
          SmokeFlow:""
        }
      },
      YExhaustLook:function (index, row) {
        this.isYExhaustAdd = false;
        this.isYExhaustLook = true;
        this.isYExhaustUpdata = false;
        this.files=row.FileInfo;
        this.fs = row;
        console.log('bbbbbbbbbbb',row)
      },
      //删除
      YExhaustDel: function (index, row) {
        var delId = row.RecordCode;
        this.$http.post('/api/pd', {TableCode: 'B003',COCode: this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
          if (res.body.message === "successful") {
            //独立的删除附件方法 如果有附件
            if(row.FileInfo.length>0){

              this.del(row.FileInfo[0].RecordCode);

            }
            this.yzfscx(this.id);
          }}, (req) => {
          this.$message({showClose: true,message:'删除失败',type: 'error'})
        });
      },
      YExhaustDelAll:function(arr){
        var delId = [];
        var delIdAll = [];
        for(var key in arr){
          delId.push(arr[key].RecordCode);
          if(!(arr[key].FileInfo.length === 0)){
            delIdAll.push(arr[key].FileInfo[0].RecordCode);
          }else {
            continue;
          }
        }

        if(delId.length === 0){
          this.$message({showClose: true,message:"没有选中数据或者页签发生改变",type: 'error'});
          return false;
        }

        this.$http.post('/api/pd', {TableCode: 'B003',COCode:this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
          if (res.body.message === "successful") {
            if(delIdAll.length > 0){
              this.YE_del(delIdAll);
            }

            this.yzfscx(this.id);
          }}, (req) => {
          this.$message({showClose: true,message:'删除失败',type: 'error'});
        });
      },
      YExhaustUpdata:function(index,row){
        this.isYExhaustAdd = false;
        this.isYExhaustLook = false;
        this.isYExhaustUpdata = true;
        this.$refs.upload.clearFiles();
        this.fs  = row;
        this.files=row.FileInfo;
        this.indexNum=row.RecordCode;
        this.$refs.upload.filePost();
      },
      yzfSubmit: function(val) {
        this.fs["COCode"]=this.id;
        this.fs["TableCode"]='B003';
        var url = "";
        var a = '/api/pi';
        var b = '/api/pu';
        if(this.isYExhaustAdd){
          url = a;
        }
        if(this.isYExhaustUpdata){
          url = b;
          delete this.fs.FileInfo;
        }
        var formData = JSON.stringify(this.fs);
        this.$http.post(url,formData,{emulateJSON:true}).then((res) => {
          if(res.body.message==="successful"){
            if(this.isYExhaustAdd){
              this.codeNumber = res.body.data[0].RecordCode;
            }
            if(this.isYExhaustUpdata){
              this.codeNumber = this.indexNum;
            }
            if(val&&this.isChecked==true){
              console.log('aaaaaaaaaaaaa')
              this.$refs.upload.filePost();
            }
            if(val&&this.isChecked==false){
              this.fsclose();
              this.yzfscx(this.id);
            }
          }
        if(res.body.success ===false){
          this.$message({showClose: true,message:res.body.message,type: 'error'});
        }
        }, (req) => {
          console.log("提交失败")
        });
      },
      YE_drawing(){
        this.fsclose();
        this.yzfscx(this.id);
        this.isChecked = false;
      },
      //修改页面删除功能
      YE_deltaed:function(adressed,named,recorded){
        document.getElementById(recorded).style.display="none";
        this.$http.post("/api/pd",{TableCode:'M001',COCode:this.id,RecordCode:recorded}).then(function(res){
          if(res.body.success===true){
            this.$message({showClose: true,message:'文件删除成功',type: 'success'});
          }
        },function(err){

        })
      },
      //删除功能

      YE_del:function(recorded){
        this.$http.post("/api/pd",{TableCode:'M001',COCode:this.id,RecordCode:recorded}).then(function(res){
          if(res.body.success === true){
            this.$message({showClose: true,message:"数据删除成功",type: 'success'});
          }
          else{
            this.$message({showClose: true,message:"数据删除失败",type: 'error'});

          }
        },function(err){console.log(err);})
      },
      fsclose:function(){
        document.getElementById("fsclose").click();
      },
      yzfscx:function(id){

        //this.state = 'B003';
        console.log('废气',this.state)

        this.fileurl=[this.$route.path,id,this.state,this.RecordCode];
        this.$http.get('/api/psf?TableCode=B003&COCode='+id)
          .then(function(res){
            this.yzfqitems = res.body.data;
            this.YeList = this.items;
          },function(err){
            console.log(err)
          })
      },
      YEShowMsgFromChild(msg,pages){
        this.YeList = msg;
        this.YECurrentPages = pages;
      },
      //固废查询
      Sw_handleSelectionChange(val) {
        val.forEach(item => {
          this.checkedNames.push(item.RecordCode);
        })
        this.multipleSelection = this.checkedNames.toString();
      },
      // 子组件点击按成状态改变
      Sw_listenstatus(val){
        this.isChecked=val;
      },
      //修改页面删除功能
      Sw_deltaed:function(adressed,named,recorded){
        document.getElementById(recorded).style.display="none";
        this.$http.post("/api/pd",{TableCode:'M001',COCode:this.id,RecordCode:recorded}).then(function(res){
          if(res.body.success===true){
            this.$message({showClose: true,message:'文件删除成功',type: 'success'});
          }
        },function(err){

        })
      },
      //删除功能
      Sw_del:function(recorded){
        this.$http.post("/api/pd",{TableCode:'M001',COCode:this.id,RecordCode:recorded}).then(function(res){
          if(res.body.success === true){
            this.$message({showClose: true,message:"数据删除成功",type: 'success'});
          }
          else{
            this.$message({showClose: true,message:"数据删除失败",type: 'error'});
          }
        },function(err){console.log(err);})
      },
      Sw_drawing(){
        this.gfcxclose();
        this.getgfcx(this.id);
        this.isChecked = false;
      },
      SwAdd:function(){
        this.isSwAdd = true;
        this.isSwLook = false;
        this.isSwUpdata = false;
        this.$refs.upload.clearFiles();
        this.gfcx = {
          ProjectName:"",
          ProductFlow:"",
          StorageFlow:"",
          Arrive:"",
          IsAck:"",
          SimpleFlow:""
        }
      },
      SwUpdata:function(index,row){
        this.isSwAdd = false;
        this.isSwLook = false;
        this.isSwUpdata = true;
        this.$refs.upload.clearFiles();
        this.gfcx  = row;
        this.files=row.FileInfo;
        this.indexNum=row.RecordCode;
        this.$refs.upload.filePost();
      },
      gfcxSubmit: function(val) {
        this.gfcx["COCode"]=this.id;
        this.gfcx["TableCode"]='B005';
        var url = "";
        var a = '/api/pi';
        var b = '/api/pu';
        if(this.isSwAdd){
          url  = a;
        }
        if(this.isSwUpdata){
          url = b;
          delete this.gfcx.FileInfo;
        }
        var formData = JSON.stringify(this.gfcx);
        this.$http.post(url,formData,{emulateJSON:true}).then((res) => {
          if(res.body.message==="successful"){
            if(this.isSwAdd){
              this.codeNumber=res.body.data[0].RecordCode;
            }
            if(this.isSwUpdata){
              this.codeNumber=this.indexNum;
            }
            if(val&&this.isChecked==true){
              this.$refs.upload.filePost();
            }
            if(val&&this.isChecked==false){
              this.gfcxclose();
              this.getgfcx(this.id);
            }
          }
        if(res.body.success ===false){
          this.$message({showClose: true,message:res.body.message,type: 'error'});
        }
        }, (req) => {
          console.log("提交失败")
        });
      },
      SwLook:function (index, row) {
        this.isSwAdd = false;
        this.isSwLook = true;
        this.isSwUpdata = false;
        this.files=row.FileInfo;
        this.gfcx = row;
        console.log(row)
      },
      //删除
      SwDel: function (index, row) {
        var delId = row.RecordCode;
        this.$http.post('/api/pd', {TableCode: 'B005',COCode: this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
          if (res.body.message === "successful") {
            //独立的删除附件方法 如果有附件

            if(row.FileInfo.length > 0){
              this.Sw_del(row.FileInfo[0].RecordCode);
            }
            this.getgfcx(this.id);
          }}, (req) => {
          this.$message({showClose: true,message:'删除失败',type: 'error'});
        });
      },
      SwDelAll:function(arr){
        var delId = [];

        var delIdAll = [];
        for(var key in arr){
          delId.push(arr[key].RecordCode);
          if(!(arr[key].FileInfo.length === 0)){
            delIdAll.push(arr[key].FileInfo[0].RecordCode);
          }else {
            continue;
          }
        }

        if(delId.length === 0){
          this.$message({showClose: true,message:"没有选中数据或者页签发生改变",type: 'error'});
          return false;
        }

        this.$http.post('/api/pd', {TableCode: 'B005',COCode:this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
            console.log('删',delId)
          if (res.body.message === "successful") {
            if(delIdAll.length > 0){
              this.Sw_del(delIdAll);
            }
            this.getgfcx(this.id);
          }}, (req) => {
          this.$message({showClose: true,message:'删除失败',type: 'error'});
        });
      },
      gfcxclose:function(){
        document.getElementById("gfcxclose").click();
      },
      getgfcx:function(id){
        //this.state = 'B005';
        console.log('固废',this.state)
        this.fileurl=[this.$route.path,id,this.state,this.RecordCode];
        this.$http.get('/api/psf?TableCode=B005&COCode='+id)
          .then(function(res){
            this.gfcxitems = res.body.data;
            this.SwList = this.gfcxitems;
          },function(err){
            console.log(err)
          })
      },

      SwShowMsgFromChild(msg,pages){
        this.SwList = msg;
        this.SwCurrentPages = pages;
      },


      //噪声查询
      noise_handleSelectionChange(val) {
        val.forEach(item => {
          this.checkedNames.push(item.RecordCode);
        })
        this.multipleSelection = this.checkedNames.toString();
      },
      // 子组件点击按成状态改变
      noise_listenstatus(val){
        this.isChecked=val;
      },
      //修改页面删除功能
      noise_deltaed:function(adressed,named,recorded){
        document.getElementById(recorded).style.display="none";
        this.$http.post("/api/pd",{TableCode:'M001',COCode:this.id,RecordCode:recorded}).then(function(res){
          if(res.body.success===true){
            this.$message({showClose: true,message:'文件删除成功',type: 'success'});
          }
        },function(err){

        })
      },
      //删除功能
      noise_del:function(recorded){
        this.$http.post("/api/pd",{TableCode:'M001',COCode:this.id,RecordCode:recorded}).then(function(res){
          if(res.body.success === true){
            this.$message({showClose: true,message:"数据删除成功",type: 'success'});
          }
          else{
            this.$message({showClose: true,message:"数据删除失败",type: 'error'});
          }
        },function(err){console.log(err);})
      },
      noise_drawing(){
        this.zscxclose();
        this.getzscx(this.id);
        this.isChecked = false;
      },
      noise_drawing(){
        this.zscxclose();
        this.getzscx(this.id);
        this.isChecked = false;
      },
      noiseAdd:function(){
        this.isNoiseAdd = true;
        this.isNoiseLook = false;
        this.isNoiseUpdata = false;
        this.$refs.upload.clearFiles();
        this.zscx = {
          ProjectName:"",
          NoiseCode:"",
          Place:"",
          Position:"",
          Source:"",
          Property:"",
          Function:""
        }
      },
      noiseUpdata:function(index,row){
        this.isNoiseAdd = false;
        this.isNoiseLook = false;
        this.isNoiseUpdata = true;
        this.$refs.upload.clearFiles();
        this.zscx = row;
        this.files=row.FileInfo;
        this.indexNum=row.RecordCode;
        this.$refs.upload.filePost();
      },
      zscxSubmit: function(val) {
        this.zscx["COCode"]=this.id;
        this.zscx["TableCode"]='B004';
        var a = '/api/pi';
        var b = '/api/pu';
        var url = '';
        if(this.isNoiseAdd){
          url = a;
        }
        if(this.isNoiseUpdata){
          url = b;
          delete this.zscx.FileInfo;
        }
        var formData = JSON.stringify(this.zscx);
        this.$http.post(url,formData,{emulateJSON:true}).then((res) => {
          if(res.body.message==="successful"){
            if(this.isNoiseAdd){
              this.codeNumber=res.body.data[0].RecordCode;
            }
            if(this.isNoiseUpdata){
              this.codeNumber=this.indexNum;
            }
            if(val&&this.isChecked==true){
              this.$refs.upload.filePost();
            }
            if(val&&this.isChecked==false){
              this.zscxclose();
              this.getzscx(this.id);
            }
          }
        if(res.body.success ===false){
          this.$message({showClose: true,message:res.body.message,type: 'error'});
        }
        }, (req) => {
          console.log("提交失败")
        });
      },
      noiseLook:function (index, row) {
        this.isNoiseAdd = false;
        this.isNoiseLook = true;
        this.isNoiseUpdata = false;
        this.files=row.FileInfo;
        this.zscx = row;
      },
      //删除
      selectAll(selection){
        this.select = selection;
      },
      noiseDel: function (index, row) {
        var delId = row.RecordCode;
        this.$http.post('/api/pd', {TableCode: 'B004',COCode: this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
          if (res.body.message === "successful") {
            //独立的删除附件方法 如果有附件
            if(row.FileInfo.length>0){

              this.noise_del(row.FileInfo[0].RecordCode);
            }
            this.getzscx(this.id);
          }}, (req) => {
          this.$message({showClose: true,message:'删除失败',type: 'error'});
        });
      },
      noiseDelAll:function(arr){
        var delId = [];
        var delIdAll = [];
        for(var key in arr){
          delId.push(arr[key].RecordCode);
          if(!(arr[key].FileInfo.length === 0)){
            delIdAll.push(arr[key].FileInfo[0].RecordCode);
          }else {
            continue;
          }
        }

        if(delId.length === 0){
          this.$message({showClose: true,message:"没有选中数据或者页签发生改变",type: 'error'});
          return false;
        }

        this.$http.post('/api/pd', {TableCode: 'B004',COCode:this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
            console.log('删',delId)
          if (res.body.message === "successful") {
            if(delIdAll.length > 0){
              this.del(delIdAll);
            }
            this.getzscx(this.id);
          }}, (req) => {
          this.$message({showClose: true,message:'删除失败',type: 'error'});
        });
      },
      zscxclose:function(){
        document.getElementById("zscxclose").click();
      },
      getzscx:function(id){
        this.fileurl=[this.$route.path,id,this.state,this.RecordCode];
        this.$http.get('/api/psf?TableCode=B004&COCode='+id)
          .then(function(res){
            this.zscxitems = res.body.data;
            this.ZsList = this.zscxitems;
          },function(err){
            console.log(err)
          })
      },

      noiseShowMsgFromChild(msg,pages){
        this.ZsList = msg;
        this.ZsCurrentPages = pages
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

  .modal-body .form-group {
    width: 50%;
    margin-bottom: 10px;
    float: left;
  }
  .modal-body .form-group label{
    width:107px;
  }
  .ml0 .form-group{
    margin-left:0px;
  }

  .modal-body #NoFloat .form-group{
    float: none;
    width: 100%;
  }

  .modal-body #NoFloat .form-group label{
    width: 150px;
  }

  .modal-body #NoFloat .form-group input{
    width: 300px;
  }
</style>
