<template>
<div id="enterprise" class="col-md-12">
    <el-tabs id="acceptanceTotal" v-model="acceptanceTotal" type="card" @tab-click="tabclick">
      <el-tab-pane label="环境保护环评" name="first">
        <div class="buttons mar">
          <a class="btn btn-primary btn-middle" data-toggle="modal" data-target="#myModal" @click="eiaAdd"> 新建 </a>
          <a class="btn btn-danger" @click="eiaDeleteAll(eiaselect)">批量删除</a>
        </div>
        <div class="modal fade" id="myModal"  v-if="tabfirst" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" v-if="iseiaAdd">环境保护环评(新增页面)</h4>
                <h4 class="modal-title" v-if="iseiaLook">环境保护环评(查看页面)</h4>
                <h4 class="modal-title" v-if="iseiaUpdata">环境保护环评(修改页面)</h4>
              </div>
              <div class="modal-body ml0">
                   <!---->
                 <form @submit.prevent="eiaSubmit">
                    <table id="Environmental" class="table table-bordered text-center">
                        <thead>
                            <tr>
                                <th colspan="5">新增建设项目环境影响评价文件审批信息</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td rowspan="7" width="10%">基本信息</td>
                            </tr>
                            <tr>
                                <td  class="tdwidth" ><span class="pk">*</span>项目名称:</td>
                                <td>
                                    <input type="text" class="form-control" v-model="eiaList.ProjectName" :disabled="iseiaLook">
                                </td>
                                <td  class="tdwidth" >
                                    环境保护管理类别:
                                </td>
                                <td>
                                     <el-radio-group v-model="eiaList.EnvironmentalRegulatoryCategory" v-for="tag in eiaCode1"  :disabled="iseiaLook">
                                        <el-radio :label="tag.Name" size="small" >{{tag.Name}}</el-radio>
                                     </el-radio-group>
                                </td>
                            </tr>
                            <tr>
                                <td class="tdwidth" >建设性质:</td>
                                <td>
                                    <el-radio-group v-model="eiaList.ConstructionCharacter" v-for="tag in eiaCode2" size="small" :disabled="iseiaLook">
                                        <el-radio :label="tag.Name">{{tag.Name}}</el-radio>
                                     </el-radio-group>
                                </td>
                                <td class="tdwidth" >行政区</td>
                                <td>
                                        <el-select v-model="eiaList.RegionName" placeholder="请选择" :disabled="iseiaLook">
                                          <el-option
                                            v-for="item in eiaCode4"
                                            :key="item.Name"
                                            :label="item.Name"
                                            :value="item.Name">
                                          </el-option>
                                        </el-select>
                                </td>

                            </tr>
                            <tr>
                                <td class="tdwidth" >
                                    建设地点:
                                </td>
                                <td>
                                    <input type="text" class="form-control" v-model="eiaList.ConstructionAddress" :disabled="iseiaLook">
                                </td>
                                <td class="tdwidth" >行业类别:</td>
                                <td>
                                     <el-cascader
                                        :props="props"
                                        :options="options2"
                                        :show-all-levels="false"
                                         v-model="selectedOptions1"
                                        :disabled="iseiaLook"
                                        @change="handleChange1"
                                     ></el-cascader>
                                </td>
                            </tr>
                            <tr>
                                <td class="tdwidth" > 建设内容及规模:</td>
                                <td>
                                    <input type="text" class="form-control"  v-model="eiaList.ConstructionScale" :disabled="iseiaLook"></td>
                                <td class="tdwidth" >环保投资（万元）:</td>
                                <td>
                                    <input type="number" class="form-control" v-model="eiaList.EPInvestment" :disabled="iseiaLook"></td>
                            </tr>
                            <tr>
                                <td class="tdwidth" >总投资（万元）:</td>
                                <td>
                                    <input type="number" class="form-control"  v-model="eiaList.TotalInvestment" :disabled="iseiaLook">
                                </td>
                                <td class="tdwidth" >所占比例（%）:</td>
                                <td>
                                    <input type="number" class="form-control"  v-model="eiaList.RATIO" :disabled="iseiaLook">
                                </td>
                            </tr>
                             <tr>
                                <td class="tdwidth" >审批备案号:</td>
                                <td colspan="3">
                                    <input type="number" class="form-control"  v-model="eiaList.ApprovalRecord" :disabled="iseiaLook">
                                </td>
                            </tr>
                            <tr>
                                <td rowspan="2">建设单位</td>
                                <td class="tdwidth" >通讯地址:</td>
                                <td>
                                    <input type="text" class="form-control" v-model="eiaList.ConstructionCommunicateAddr" :disabled="iseiaLook"></td>
                                <td class="tdwidth" >邮政编码:</td>
                                <td>
                                    <input type="text" class="form-control" v-model="eiaList.ConstructionPostalCode" :disabled="iseiaLook"></td>
                            </tr>
                            <tr>
                                <td class="tdwidth" >法人代表:</td>
                                <td>
                                    <input type="text" class="form-control" v-model="eiaList.ConstructionCorporationName" :disabled="iseiaLook"></td>
                                <td class="tdwidth" >联系人:</td>
                                <td>
                                    <input type="text" class="form-control" v-model="eiaList.ConstructionContacts" :disabled="iseiaLook"></td>
                            </tr>
                            <tr>
                                <td rowspan="3">评价单位</td>
                                <td class="tdwidth" >单位名称:</td>
                                <td>
                                    <input type="text" class="form-control" v-model="eiaList.EIACompanyName" :disabled="iseiaLook"></td>
                                <td class="tdwidth" >联系电话:</td>
                                <td>
                                    <input type="text" class="form-control" v-model="eiaList.EIAtelephone" :disabled="iseiaLook"></td>
                            </tr>
                            <tr>
                                <td class="tdwidth" >通讯地址:</td>
                                <td>
                                    <input type="text" class="form-control" v-model="eiaList.EIACommunicateAddr" :disabled="iseiaLook"></td>
                                <td class="tdwidth" >邮政编码:</td>
                                <td>
                                    <input type="text" class="form-control" v-model="eiaList.EIAPostalCode" :disabled="iseiaLook"></td>
                            </tr>
                            <tr>
                                <td class="tdwidth" >证书编号:</td>
                                <td>
                                    <input type="text" class="form-control" v-model="eiaList.EIACertificateNumber" :disabled="iseiaLook"></td>
                                <td class="tdwidth" >评价经费（万元）:</td>
                                <td>
                                    <input type="text" class="form-control" v-model="eiaList.EIAEvaluationfunding" :disabled="iseiaLook"></td>
                            </tr>
                            <tr>
                                <td rowspan="3">审批结果</td>
                                <td class="tdwidth" >批复时间:</td>
                                <td>
                                   <el-date-picker v-model="eiaList.Replytime" type="date" align="right" placeholder="请选择时间" :picker-options="pickerOptions1" :disabled="iseiaLook" required="required"> </el-date-picker>
                                </td>
                                <td class="tdwidth" >环评批复文号:</td>
                                <td><input type="text" class="form-control" v-model="eiaList.ApprNo" :disabled="iseiaLook"></td>
                            </tr>
                            <tr>
                                <td class="tdwidth" >审批部门:</td>
                                <td>
                                     <el-select v-model="eiaList.ApprovalDepartment" placeholder="请选择" :disabled="iseiaLook">
                                          <el-option
                                            v-for="item in eiaCode5"
                                            :key="item.Name"
                                            :label="item.Name"
                                            :value="item.Name">
                                          </el-option>
                                        </el-select>
                                </td>
                                <td class="tdwidth" >是否许可:</td>
                                <td>
                                    <el-radio-group v-model="eiaList.permission" :disabled="iseiaLook">
                                      <el-radio label="是">是</el-radio>
                                      <el-radio label="否">否</el-radio>
                                    </el-radio-group>
                                </td>
                            </tr>
                            <tr>
                                <td class="tdwidth" >批复意见:</td>
                                <td colspan="3"><textarea class="form-control" rows="3" v-model="eiaList.ApprovalComments" :disabled="iseiaLook"></textarea></td>
                            </tr>
                            <tr style="text-align: left;">
                                <td class="text-center"><label>附&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;件:</label></td>
                                <td colspan="4">
                                    <div class="form-group">
                                        <!--新增以及修改 -->
                                        <div v-show="iseiaAdd ||iseiaUpdata">
                                            <uploadFile ref="upload" @end="eiadrawing" @listenState="eialistenstatus" :childUrl="eiaFileurl" :codenum="codeNumber"></uploadFile>
                                            <ul v-if ="iseiaUpdata" class="eiafilesUrl">
                                            <li v-for="item in eiafiles" :id="eiaItems.RecordCode" ><span class="toadded">{{item.FileName}}</span><span class="deltate"  @click="eiadeltaed(item.Path,item.FileName,item.RecordCode)">删除</span></li>
                                            </ul>
                                        </div>
                                        <!--查看-->
                                        <div v-if="iseiaLook">
                                        <ul><li v-for="item in eiafiles">{{item.FileName}}</li></ul>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>

                    </table>
                     <div class="modal-footer" v-if="!iseiaLook">
                            <button type="submit" class="btn btn-primary submit" style="margin-right:50px;" >确定</button>
                            <button id="close" type="button" class="btn btn-default" data-dismiss="modal"  @click="eiaclose">关闭</button>
                    </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane">
          <div class="table-responsive mt15">
            <el-table :data="eiaromance" border style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}" @select-all="eiaselectAll" @select="eiaselectAll" >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="ProjectName" label="项目名称" sortable >
              </el-table-column>
              <el-table-column prop="Type" label="审批类型" sortable >
              </el-table-column>
              <el-table-column prop="RegionName" label="行政区" sortable>
              </el-table-column>
              <el-table-column prop="Replytime" label="批复时间" sortable >
              </el-table-column>
              <el-table-column prop="ConstructionCharacter" label="建设性质" sortable>
              </el-table-column>
              <el-table-column label="附件" sortable width="200">
                   <template scope="props">
                    <el-tag  v-for="tag in props.row.FileInfo" type="primary" class="FileInfo" >
                    <a v-bind:href="'/api/fu?path='+tag.Path+'/'+tag.TrueName">{{tag.FileName}}</a>
                    </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="200">
                <template scope="scope">
                  <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal"
                          @click="eiaLook(scope.$index, scope.row)">查看
                  </button>
                  <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal" @click="eiaUpdata(scope.$index, scope.row)">修改</button>
                  <button  class="btn btn-danger btn-sm" @click="eiaDelete(scope.$index, scope.row)">删除</button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!--污水分页-->
          <page :number="10" :totalLength="eiaItems.length" :getDatas="eiaItems" v-on:listenToChildEvent="eiashowMsgFromChild" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="环境保护验收" name="second">
         <div class="buttons mar">
          <a class="btn btn-primary btn-middle" data-toggle="modal" data-target="#myModalEco" @click="EcoAdd"> 新建 </a>
          <a class="btn btn-danger" @click="EcoDeleteAll(Ecoselect)">批量删除</a>
        </div>
        <div class="modal fade" id="myModalEco" v-if="tabsecond" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" v-if="isEcoAdd">环境保护验收(新增页面)</h4>
                <h4 class="modal-title" v-if="isEcoLook">环境保护验收(查看页面)</h4>
                <h4 class="modal-title" v-if="isEcoUpdata">环境保护验收(修改页面)</h4>
              </div>
              <div class="modal-body ml0">
                   <!---->
                 <form @submit.prevent="EcoSubmit">
                    <table id="Environmental" class="table table-bordered text-center">
                        <thead>
                            <tr>
                                <th colspan="5">新增建设项目竣工环境保护项目验收信息</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td rowspan="8" width="10%">基本信息</td>
                            </tr>
                            <tr>
                                <td  class="tdwidth" ><span class="pk">*</span>建设项目名称(验收申请):</td>
                                <td>
                                    <el-select v-model="EcoList.ProjectName" placeholder="请选择" :disabled="isEcoLook">
                                        <el-option
                                          v-for="item in EcoCode1"
                                          :key="item.label"
                                          :label="item.label"
                                          :value="item.label">
                                        </el-option>
                                    </el-select>
                                </td>
                                <td  class="tdwidth" >
                                    建设项目名称(环评批复):
                                </td>
                                <td>
                                     <input type="text" class="form-control" v-model="EcoList.ProjectName" :disabled="isEcoLook">
                                </td>
                            </tr>
                            <tr>
                                <td class="tdwidth" >建设性质:</td>
                                <td>
                                    <el-radio-group v-model="EcoList.ConstructionCharacter" v-for="tag in EcoCode2" size="small" :disabled="isEcoLook">
                                        <el-radio :label="tag.Name">{{tag.Name}}</el-radio>
                                     </el-radio-group>
                                </td>
                                 <td class="tdwidth" >
                                    建设地点:
                                </td>
                                <td>
                                    <input type="text" class="form-control" v-model="EcoList.ConstructionAddress" :disabled="isEcoLook">
                                </td>
                            </tr>
                            <tr>
                                <td class="tdwidth" >行业类别:</td>
                                <td>
                                      <el-cascader
                                        :props="props"
                                        :options="options2"
                                        :show-all-levels="false"
                                         v-model="selectedOptions"
                                        :disabled="isEcoLook"
                                         @change="handleChange"
                                     ></el-cascader>
                                </td>
                                 <td class="tdwidth" >行政区</td>
                                 <td>
                                        <el-select v-model="EcoList.RegionName" placeholder="请选择" :disabled="isEcoLook">
                                          <el-option
                                            v-for="item in EcoCode4"
                                            :key="item.Name"
                                            :label="item.Name"
                                            :value="item.Name">
                                          </el-option>
                                        </el-select>
                                </td>

                            </tr>
                            <tr>
                                <td class="tdwidth" >环评批复单位:</td>
                                <td>
                                    <input type="text" class="form-control"  v-model="EcoList.EIAApprovalsUnit" :disabled="isEcoLook"></td>
                                <td class="tdwidth" >环评批复文号:</td>
                                <td>
                                    <input type="text" class="form-control" v-model="EcoList.EIAApprNo" :disabled="isEcoLook"></td>
                            </tr>
                            <tr>
                                <td class="tdwidth" >环评批复时间:</td>
                                <td>
                                     <el-date-picker v-model="EcoList.EIAReplytime" type="date" align="right" placeholder="请选择时间" :picker-options="pickerOptions2" :disabled="isEcoLook" > </el-date-picker>
                                </td>
                                <td colspan="2"></td>
                            </tr>
                             <tr>
                                <td class="tdwidth" >竣工验收单位:</td>
                                <td>
                                    <input type="text" class="form-control"  v-model="EcoList.AcceptanceUnit" :disabled="isEcoLook"></td>
                                <td class="tdwidth" >验收时间:</td>
                                <td>
                                     <el-date-picker v-model="EcoList.Receptiontime" type="date" align="right" placeholder="请选择时间" :picker-options="pickerOptions3" :disabled="isEcoLook"> </el-date-picker>
                                </td>
                            </tr>
                            <tr>
                                <td class="tdwidth" >实际总投资:</td>
                                <td>
                                    <input type="number" class="form-control"  v-model="EcoList.TotalInvestment" :disabled="isEcoLook"></td>
                                <td class="tdwidth" >实际环保投资:</td>
                                <td>
                                    <input type="number" class="form-control" v-model="EcoList.EPInvestment" :disabled="isEcoLook"></td>
                            </tr>
                            <tr>
                                <td rowspan="3">建设单位</td>
                                <td class="tdwidth" >建设单位（建设单位）:</td>
                                <td>
                                    <input type="text" class="form-control" v-model="EcoList.ConstructionUnit" :disabled="isEcoLook"></td>
                                <td class="tdwidth" >邮政编码（建设单位）:</td>
                                <td>
                                    <input type="text" class="form-control" v-model="EcoList.ConstructionPostalCode" :disabled="isEcoLook"></td>
                            </tr>
                            <tr>
                                <td class="tdwidth" >法人代表（建设单位）:</td>
                                <td>
                                    <input type="text" class="form-control" v-model="EcoList.ConstructionCorporationName" :disabled="isEcoLook"></td>
                                <td class="tdwidth" >联系人（建设单位）:</td>
                                <td>
                                    <input type="text" class="form-control" v-model="EcoList.ConstructionContacts" :disabled="isEcoLook"></td>
                            </tr>
                             <tr>
                                <td class="tdwidth" >联系电话（建设单位）:</td>
                                <td>
                                    <input type="text" class="form-control" v-model="EcoList.Constructiontelephone" :disabled="isEcoLook"></td>
                                <td class="tdwidth" >通信地址（建设单位）:</td>
                                <td>
                                    <input type="text" class="form-control" v-model="EcoList.ConstructionCommunicateAddr" :disabled="isEcoLook"></td>
                            </tr>
                            <tr>
                                <td rowspan="3">审批结果</td>
                                <td class="tdwidth" >批复时间:</td>
                                <td>
                                   <el-date-picker v-model="EcoList.Replytime" type="date" align="right" placeholder="请选择时间" :picker-options="pickerOptions4" :disabled="isEcoLook"> </el-date-picker>
                                </td>
                                <td class="tdwidth" >环评批复文号:</td>
                                <td><input type="text" class="form-control" v-model="EcoList.ApprNo" :disabled="isEcoLook"></td>
                            </tr>
                            <tr>
                                <td class="tdwidth" >审批部门:</td>
                                <td>
                                     <el-select v-model="EcoList.ApprovalDepartment" placeholder="请选择" :disabled="isEcoLook">
                                          <el-option
                                            v-for="item in EcoCode5"
                                            :key="item.Name"
                                            :label="item.Name"
                                            :value="item.Name">
                                          </el-option>
                                        </el-select>
                                </td>
                                <td class="tdwidth" >是否许可:</td>
                                <td>
                                    <el-radio-group v-model="EcoList.permission" :disabled="isEcoLook">
                                      <el-radio label="是">是</el-radio>
                                      <el-radio label="否">否</el-radio>
                                    </el-radio-group>
                                </td>
                            </tr>
                            <tr>
                                <td class="tdwidth" >批复意见:</td>
                                <td colspan="3"><textarea class="form-control" rows="3" v-model="EcoList.ApprovalComments" :disabled="isEcoLook"></textarea></td>
                            </tr>
                            <tr style="text-align: left;">
                                <td class="text-center"><label>附&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;件:</label></td>
                                <td colspan="4">
                                    <div class="form-group">
                                        <!--新增以及修改 -->
                                        <div v-show="isEcoAdd ||isEcoUpdata">
                                            <uploadFile ref="upload" @end="Ecodrawing" @listenState="Ecolistenstatus" :childUrl="EcoFileurl" :codenum="codeNumber"></uploadFile>
                                            <ul v-if ="isEcoUpdata" class="EcofilesUrl">
                                                <li v-for="item in Ecofiles" :id="EcoItems.RecordCode" ><span class="toadded">{{item.FileName}}</span><span class="deltate"  @click="Ecodeltaed(item.Path,item.FileName,item.RecordCode)">删除</span></li>
                                            </ul>
                                        </div>
                                        <!--查看-->
                                        <div v-if="isEcoLook">
                                        <ul><li v-for="item in Ecofiles">{{item.FileName}}</li></ul>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>

                    </table>
                     <div class="modal-footer" v-if="!isEcoLook">
                            <button type="submit" class="btn btn-primary submit" style="margin-right:50px;" >确定</button>
                            <button id="Ecoclose" type="button" class="btn btn-default" data-dismiss="modal"  @click="Ecoclose">关闭</button>
                    </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane">
          <div class="table-responsive mt15">
            <el-table :data="Ecoromance" border style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}" @select-all="EcoselectAll" @select="EcoselectAll" >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="ProjectName" label="项目名称" sortable >
              </el-table-column>
              <el-table-column prop="Type" label="审批类型" sortable >
              </el-table-column>
              <el-table-column prop="RegionName" label="行政区" sortable>
              </el-table-column>
              <el-table-column prop="Replytime" label="批复时间" sortable >
              </el-table-column>
              <el-table-column prop="ConstructionCharacter" label="建设性质" sortable>
              </el-table-column>
              <el-table-column label="附件" sortable width="200">
                   <template scope="props">
                    <el-tag  v-for="tag in props.row.FileInfo" type="primary" class="FileInfo" >
                    <a v-bind:href="'/api/fu?path='+tag.Path+'/'+tag.TrueName">{{tag.FileName}}</a>
                    </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="200">
                <template scope="scope">
                  <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModalEco"
                          @click="EcoLook(scope.$index, scope.row)">查看
                  </button>
                  <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModalEco" @click="EcoUpdata(scope.$index, scope.row)">修改</button>
                  <button  class="btn btn-danger btn-sm" @click="EcoDelete(scope.$index, scope.row)">删除</button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!--污水分页-->
          <page :number="10" :totalLength="EcoItems.length" :getDatas="EcoItems" v-on:listenToChildEvent="EcoshowMsgFromChild" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="环境保护监测" name="three">
         <div class="buttons mar">
            <a class="btn btn-primary btn-middle" data-toggle="modal" data-target="#myModal03" @click="SulAdd"> 新建 </a>
            <a class="btn btn-danger" @click="SulDeleteAll(Sulselect)">批量删除</a>
        </div>
        <div class="modal fade" id="myModal03" v-if="tabthree" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog " role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" v-if="isSulAdd">环境保护监测(新增页面)</h4>
                        <h4 class="modal-title" v-if="isSulLook">环境保护监测(查看页面)</h4>
                        <h4 class="modal-title" v-if="isSulUpdata">环境保护监测(修改页面)</h4>
                    </div>
                    <form class="form-inline clearfix" @submit.prevent="SulSubmit">
                        <div class="modal-body singleRow ml0">
                                <div class="form-group">
                                    <label ><span class="pk">*</span>项目名称:</label>
                                     <el-select v-model="SulList.ProjectName" placeholder="请选择" :disabled="isSulLook">
                                        <el-option
                                          v-for="item in EcoCode1"
                                          :key="item.label"
                                          :label="item.label"
                                          :value="item.label">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="form-group">
                                    <label >审批类型:</label>
                                    <input type="text" class="form-control" :disabled="isSulLook" v-model="SulList.Type"/>
                                </div>
                                <div class="form-group">
                                     <label >出具日期:</label>
                                     <el-date-picker v-model="SulList.IssuingDate" type="date" align="right" placeholder="请选择时间" :picker-options="pickerOptions5" :disabled="isSulLook" > </el-date-picker>
                                </div>
                                <div class="form-group">
                                    <label >监测目的:</label>
                                    <input type="text" class="form-control" :disabled="isSulLook" v-model="SulList.MonitoringPurposes"/>
                                </div>
                                <div class="form-group">
                                    <label >监测内容:</label>
                                    <input type="text" class="form-control" :disabled="isSulLook" v-model="SulList.MonitoringContent"/>
                                </div>
                                <div class="form-group">
                                    <label >监测结果:</label>
                                    <input type="text" class="form-control" :disabled="isSulLook" v-model="SulList.MonitoringResults"/>
                                </div>
                                <div class="form-group">
                                    <label >附件:</label>
                                    <!--新增以及修改 -->
                                    <div v-show="isSulAdd ||isSulUpdata">
                                        <uploadFile ref="upload" @end="Suldrawing" @listenState="Sullistenstatus" :childUrl="SulFileurl" :codenum="codeNumber"></uploadFile>
                                        <ul v-if ="isSulUpdata" class="SulfilesUrl">
                                            <li v-for="item in Sulfiles" :id="SulItems.RecordCode" ><span class="toadded">{{item.FileName}}</span><span class="deltate"  @click="Suldeltaed(item.Path,item.FileName,item.RecordCode)">删除</span></li>
                                        </ul>
                                    </div>
                                    <!--查看-->
                                    <div v-if="isSulLook">
                                    <ul><li v-for="item in Sulfiles">{{item.FileName}}</li></ul>
                                    </div>
                                </div>
                                注释:<span class="pk">*</span>为必填项

                        </div>
                        <div class="modal-footer" v-if="!isSulLook">
                            <button type="submit" class="btn btn-primary submit" style="margin-right:50px;" >确定</button>
                            <button id="Sulclose" type="button" class="btn btn-default" data-dismiss="modal"  @click="Sulclose">关闭</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="tab-pane">
          <div class="table-responsive mt15">
            <el-table :data="Sulromance" border style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}" @select-all="SulselectAll" @select="SulselectAll" >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="ProjectName" label="项目名称" sortable >
              </el-table-column>
              <el-table-column prop="Type" label="审批类型" sortable >
              </el-table-column>
              <el-table-column prop="RegionName" label="行政区" sortable>
              </el-table-column>
              <el-table-column prop="Replytime" label="批复时间" sortable >
              </el-table-column>
              <el-table-column prop="ConstructionCharacter" label="建设性质" sortable>
              </el-table-column>
              <el-table-column label="附件" sortable width="200">
                   <template scope="props">
                    <el-tag  v-for="tag in props.row.FileInfo" type="primary" class="FileInfo" >
                    <a v-bind:href="'/api/fu?path='+tag.Path+'/'+tag.TrueName">{{tag.FileName}}</a>
                    </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="200">
                <template scope="scope">
                  <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal03"
                          @click="SulLook(scope.$index, scope.row)">查看
                  </button>
                  <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal03" @click="SulUpdata(scope.$index, scope.row)">修改</button>
                  <button  class="btn btn-danger btn-sm" @click="SulDelete(scope.$index, scope.row)">删除</button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!--污水分页-->
          <page :number="10" :totalLength="SulItems.length" :getDatas="SulItems" v-on:listenToChildEvent="SulshowMsgFromChild" />
        </div>
      </el-tab-pane>
    </el-tabs>
</div>
</template>
<script>
import Bus from '../vuex/bus.js';
import page from '../common/page';
import uploadFile from '../common/uploadFile';
  export default {
    data() {
      return {
        acceptanceTotal:'first',
        id:"",
        codeNumber:"", //code
        tabfirst:true,
        tabsecond:false,
        tabthree:false,
        /////////////////////////////环评/////////////////////////////////////
        eiaItems:"",
        eiaromance:"",
        eiacurrentPages:1,
        eiaselect:"", // 获取所有选中的数据
        iseiaAdd: true,//是否是新增
        iseiaLook:false,//是否是查看
        iseiaUpdata:false,//是否是更新
        iseiaChecked:false,//子组件点击上传按钮之后的状态
        eiaIndexNum:"", //点击修改的索引值
        eiaFileurl:[],
        eiastate:'C001',  //企业编号
        eiafiles:"", //修改循环列表
        eiamultipleSelection: [],
        eiaCode1:"",
        eiaCode2:"",
        eiaCode3:"",
        eiaCode4:"",
        eiaCode5:"",
        eiaList: {
            ProjectName:"",
            Type:"",
            EnvironmentalRegulatoryCategory:"",
            ConstructionCharacter:"",
            RegionName:"",
            ConstructionAddress:"",
            AdministrativeCategory:"",
            ConstructionScale:"",
            TotalInvestment:"",
            EPInvestment:"",
            RATIO:"",
            ApprovalRecord:"",
            ConstructionCommunicateAddr:"",
            ConstructionPostalCode:"",
            ConstructionCorporationName:"",
            ConstructionContacts:"",
            EIACompanyName:"",
            EIAtelephone:"",
            EIACommunicateAddr:"",
            EIAPostalCode:"",
            EIACertificateNumber:"",
            EIAEvaluationfunding:"",
            Replytime:"",
            ApprNo:"",
            ApprovalDepartment:"",
            permission:"",
            ApprovalComments:"",
        },
        options2:[],
        props: {
          value: 'label',
          children: 'children'
        },
        eiaDictionary:{},
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        //////////////////////////////验收//////////////////////////////////
        EcoItems:"",
        Ecoromance:"",
        EcocurrentPages:1,
        Ecoselect:"", // 获取所有选中的数据
        isEcoAdd: true,//是否是新增
        isEcoLook:false,//是否是查看
        isEcoUpdata:false,//是否是更新
        isEcoChecked:false,//子组件点击上传按钮之后的状态
        EcoIndexNum:"", //点击修改的索引值
        EcoFileurl:[],
        Ecostate:'C002',  //企业编号
        Ecofiles:"", //修改循环列表
        EcomultipleSelection: [],
        EcoCode1:[],
        EcoCode2:"",
        EcoCode3:"",
        EcoCode4:"",
        EcoCode5:"",
        EcoList: {
            ProjectName:"",
            Type:"",
            ConstructionCharacter:"",
            ConstructionAddress:"",
            IndustryCategory:"",
            RegionName:"",
            EIAApprovalsUnit:"",
            EIAApprNo:"",
            EIAReplytime:"",
            AcceptanceUnit:"",
            Receptiontime:"",
            TotalInvestment:"",
            EPInvestment:"",
            ConstructionUnit:"",
            ConstructionPostalCode:"",
            ConstructionCorporationName:"",
            ConstructionContacts:"",
            Constructiontelephone:"",
            ConstructionCommunicateAddr:"",
            Replytime:"",
            ApprNo:"",
            ApprovalDepartment:"",
            permission:"",
            ApprovalComments:""
        },
        pickerOptions2: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        pickerOptions3: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        pickerOptions4: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        pickerOptions5: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        ///////////////////////////////////////////////////////////////
        SulItems:"",
        Sulromance:"",
        SulcurrentPages:1,
        Sulselect:"", // 获取所有选中的数据
        isSulAdd: true,//是否是新增
        isSulLook:false,//是否是查看
        isSulUpdata:false,//是否是更新
        isSulChecked:false,//子组件点击上传按钮之后的状态
        SulIndexNum:"", //点击修改的索引值
        SulFileurl:[],
        Sulstate:'C003',  //企业编号
        Sulfiles:"", //修改循环列表
        SulmultipleSelection: [],
        SulCode1:[],
        SulCode2:"",
        SulCode3:"",
        SulCode4:"",
        SulCode5:"",
        SulList: {
            ProjectName:"",
            Type:"",
            IssuingDate:"",
            IssuingUnit:"",
            MonitoringPurposes:"",
            MonitoringContent:"",
            MonitoringResults:""
        },
        pickerOptions5: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        selectedOptions: [],
        selectedOptions1: [],
      }
    },
    components:{
        page,
        uploadFile,
    },
    beforeCreate(){},beforeMount(){},mounted(){},
    created(){
        Bus.$on('getTarget', ccc => {
          this.ccc()
        });
        this.CodeDictionary();
        this.eiaNew(this.id);
        this.EcoNew(this.id);
        this.SulNew(this.id);
    },
    beforeUpdate(){
        this.id=sessionStorage.getItem("ID");
    },
    update(){},
    activated(){},
    deactivated(){},
    beforeDestroy(){},
    destroyed(){},
    watch:{
        id(val){
          this.eiaNew(val);
          this.EcoNew(val);
          this.SulNew(val);
        },
       'codenum':function(val){
          this.codenum=val;
       },
       'eiaItems':function(arr){
          this.eiaItems = arr;
       },
      'EcoItems':function(arr){
          this.EcoItems = arr;
       },
       'SulItems':function(arr){
          this.SulItems = arr;
       },
       'eiacurrentPages':function(val){
          this.eiaselect = [];
       },
       'EcocurrentPages':function(val){
          this.Ecoselect = [];
       },
        'SulcurrentPages':function(val){
          this.Sulselect = [];
       }
    },
    methods:{
       /**********
        * [导航切换时更新id]
        * @param 选择的数组
      ************/
       ccc(){
        var id = this.id;
        this.eiaNew(id);
        this.EcoNew(id);
        this.SulNew(id);
       },
      /**********
      * [1.字典编码请求
      * @param  {[string]} id [企业id]
      * @return
      ************/
      CodeDictionary:function(){
         //环评类别
          this.$http.get('/api/ps?TableCode=O016').then(function(res){
              if(res.body.success===true){
                  this.eiaCode1 = res.body.data;
              }
              else{
                this.$message({showClose: true,message:"数据字典请求失败",type: 'error'});
              }
          },function(err){})
          //建设性质
           this.$http.get('/api/ps?TableCode=O015').then(function(res){
              if(res.body.success===true){
                  this.eiaCode2 = res.body.data;
                  this.EcoCode2 = res.body.data;
              }
              else{
                this.$message({showClose: true,message:"数据字典请求失败",type: 'error'});
              }
          },function(err){})
           //行政区域

           this.$http.get('/api/ps?TableCode=O014').then(function(res){
              if(res.body.success===true){
                  this.eiaCode4 = res.body.data;
                  this.EcoCode4 = res.body.data;
              }
              else{
                this.$message({showClose: true,message:"数据字典请求失败",type: 'error'});
              }
          },function(err){})
           //审批部门
           this.$http.get('/api/ps?TableCode=O017').then(function(res){
              if(res.body.success===true){
                  this.eiaCode5 = res.body.data;
                  this.EcoCode5 = res.body.data;
              }
              else{
                this.$message({showClose: true,message:"数据字典请求失败",type: 'error'});
              }
          },function(err){})
          //行业类别
           this.$http.get('/api/ps?UseOrNot=1&TableCode=O013').then(function(res){
              if(res.body.success===true){
                  let Award = res.body.data
                console.log('请求回来的',Award )
                  for(let k  in Award){
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
      init:function(node){
        console.log('node',node)
          var data = this.eiaDictionary[node];
          if(data === undefined){
              return '';
          }
          var arr = [];
          for(let k=0; k<data.length; k++){

              let obj = {};
              obj.label = data[k].IndustryTypeName;
              var s = this.init(data[k].IndustryTypeCode);
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
      /**********
        * [控件自带方法]
        * @param 选择的数组
      ************/
      handleSelectionChange(val) {
        val.forEach(item => {
          this.checkedNames.push(item.RecordCode);
        })
        this.eiamultipleSelection = this.checkedNames.toString();
      },
      /**********
        * [控件自带方法]
        * @param 排序表格
      ************/
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
       /**********
        * [控件自带方法]
        * @param 排序表格
      ************/
      handleSelectionChange(val) {
        this.eiamultipleSelection = val;
      },
       /**********
        * [点击新增时清空数据]
        * @param
      ************/
      eiaAdd:function(){
        this.iseiaAdd = true;
        this.iseiaLook = false;
        this.iseiaUpdata =false;
        this.selectedOptions1 = [];
        this.eiaList = {
            ProjectName:"",
            Type:"",
            EnvironmentalRegulatoryCategory:"",
            ConstructionCharacter:"",
            RegionName:"",
            ConstructionAddress:"",
            AdministrativeCategory:"",
            ConstructionScale:"",
            TotalInvestment:"",
            EPInvestment:"",
            RATIO:"",
            ApprovalRecord:"",
            ConstructionCommunicateAddr:"",
            ConstructionPostalCode:"",
            ConstructionCorporationName:"",
            ConstructionContacts:"",
            EIACompanyName:"",
            EIAtelephone:"",
            EIACommunicateAddr:"",
            EIAPostalCode:"",
            EIACertificateNumber:"",
            EIAEvaluationfunding:"",
            Replytime:"",
            ApprNo:"",
            ApprovalDepartment:"",
            permission:"",
            ApprovalComments:""
        }
        // this.$refs.upload.clearfiles();
      },
      EcoAdd:function(){
          this.isEcoAdd = true;
          this.isEcoLook = false;
          this.isEcoUpdata =false;
          this.selectedOptions = [];
          this.EcoList = {
            ProjectName:"",
            Type:"",
            ConstructionCharacter:"",
            ConstructionAddress:"",
            IndustryCategory:"",
            RegionName:"",
            EIAApprovalsUnit:"",
            EIAApprNo:"",
            EIAReplytime:"",
            AcceptanceUnit:"",
            Receptiontime:"",
            TotalInvestment:"",
            EPInvestment:"",
            ConstructionUnit:"",
            ConstructionPostalCode:"",
            ConstructionCorporationName:"",
            ConstructionContacts:"",
            Constructiontelephone:"",
            ConstructionCommunicateAddr:"",
            Replytime:"",
            ApprNo:"",
            ApprovalDepartment:"",
            permission:"",
            ApprovalComments:""
          }
        // this.$refs.upload.clearfiles();
      },
      SulAdd:function(){
            this.isSulAdd = true;
            this.isSulLook = false;
            this.isSulUpdata =false;
            this.SulList = {
               ProjectName:"",
              Type:"",
              IssuingDate:"",
              IssuingUnit:"",
              MonitoringPurposes:"",
              MonitoringContent:"",
              MonitoringResults:""
            }
        // this.$refs.upload.clearfiles();
      },
      /********
        * [1.查看按钮点击事件
        * @param  {[Number]} index [当前点击行的index]
        * @param  {[row]} row [当前点击行的所有信息]
        * @return
      *********/
      eiaLook:function(index, row){
        this.iseiaAdd = false;
        this.iseiaLook = true;
        this.iseiaUpdata =false;
        this.selectedOptions1 = this.eiaList["AdministrativeCategory"].split(",");
        this.eiafiles=row.FileInfo;
        this.eiaList = row;
      },
      EcoLook:function(index, row){
          this.isEcoAdd = false;
          this.isEcoLook = true;
          this.isEcoUpdata =false;
          this.selectedOptions = this.EcoList["IndustryCategory"].split(",");
          this.Ecofiles=row.FileInfo;
          this.EcoList = row;
      },
      SulLook:function(index, row){
          this.isSulAdd = false;
          this.isSulLook = true;
          this.isSulUpdata =false;
          this.Sulfiles=row.FileInfo;
          this.SulList = row;
      },
      /********
        * [1.修改按钮点击事件
        * @param  {[Number]} index [当前点击行的index]
        * @param  {[row]} row [当前点击行的所有信息]
        * @return
      *********/
      eiaUpdata:function(index, row){
        this.iseiaAdd = false;
        this.iseiaLook = false;
        this.iseiaUpdata =true;
        this.eiaList  = row;
        this.eiafiles = row.FileInfo;
        this.eiaIndexNum=row.RecordCode;
        this.selectedOptions1 = this.eiaList["AdministrativeCategory"].split(",");
        //this.$refs.upload.clearfiles();
      },
      EcoUpdata:function(index, row){
          this.isEcoAdd = false;
          this.isEcoLook = false;
          this.isEcoUpdata =true;
          this.EcoList  = row;
          this.Ecofiles=row.FileInfo;
          this.EcoIndexNum=row.RecordCode;
          this.selectedOptions = this.EcoList["IndustryCategory"].split(",");
          //this.$refs.upload.clearfiles();
      },
      SulUpdata:function(index, row){
          this.isSulAdd = false;
          this.isSulLook = false;
          this.isSulUpdata =true;
          this.SulList  = row;
          this.Sulfiles = row.FileInfo;
          this.SulIndexNum=row.RecordCode;
          //this.$refs.upload.clearfiles();
      },
      /**********
        * [1.页面渲染请求
        * @param  {[string]} id [企业id]
        * @return
      ************/
      eiaNew: function (id){
        this.eiaFileurl=[this.$route.path,id,this.eiastate];
        this.$http.get('/api/psf?TableCode=C001&COCode='+id).then(function(res){
            if(res.body.success===true){
              this.eiaItems = res.body.data;
              this.eiaromance = this.eiaItems;
              var arr = [];
              for(var key in res.body.data){
                var obj = {};
                obj.value = res.body.data[key].ProjectName;
                obj.label = res.body.data[key].ProjectName;
                arr.push(obj)
              }
              this.EcoCode1 = arr;
            }
        },function(err){
        })
      },
      EcoNew: function (id){
        this.EcoFileurl=[this.$route.path,id,this.Ecostate];
        this.$http.get('/api/psf?TableCode=C002&COCode='+id).then(function(res){
            if(res.body.success===true){
            this.EcoItems = res.body.data;
            this.Ecoromance = this.EcoItems;
            }
        },function(err){})

      },
      SulNew: function (id){
        this.SulFileurl=[this.$route.path,id,this.Sulstate];
        this.$http.get('/api/psf?TableCode=C003&COCode='+id).then(function(res){
            if(res.body.success===true){
              this.SulItems = res.body.data;
              this.Sulromance = this.SulItems;
            }
        },function(err){})

      },
      /********
        * [1.新增请求以及修改请求
        * @param  {[number]} event [Code值]
        * @return
      *********/
      eiaSubmit:function(val){
        this.datechange(this.eiaList.Replytime,'Replytime');
        if(this.eiaList.EIAtelephone){
            var n = +this.eiaList.EIAtelephone;
            if(!this.checkPhone(n)){
                this.eiaList.EIAtelephone ="";
                return false;
            }
        }
        this.eiaList["COCode"] = this.id;
        this.eiaList["TableCode"] = 'C001';
        var a = '/api/pi';
        var b = '/api/pu';
        var url = '';
        if (this.iseiaAdd) {
          url = a;
        }
        if(this.iseiaUpdata){
          url = b;
          delete this.eiaList.FileInfo;
        }
        var formData = JSON.stringify(this.eiaList);
        this.$http.post(url, formData, {emulateJSON: true}).then((res) => {
             if (res.body.message === "successful") {
                if(this.iseiaAdd){
                   this.codeNumber=res.body.data[0].RecordCode;
                }
                if(this.iseiaUpdata){
                   this.codeNumber=this.eiaIndexNum;
                }
                if(val&&this.iseiaChecked==true){
                  this.$refs.upload.filePost();
                }
                if(val&&this.iseiaChecked==false){
                  this.eiaclose();
                  this.eiaNew(this.id);
                }
             }
            if(res.body.success===false){
                this.$message({showClose: true,message:res.body.message,type: 'error'});
            }
        },(req) => {
          console.log("提交失败")
        });
      },
      EcoSubmit:function(val){
        this.datechangeECO(this.EcoList.EIAReplytime,'EIAReplytime');
        this.datechangeECO(this.EcoList.Receptiontime,'Receptiontime');
        this.datechangeECO(this.EcoList.Replytime,'Replytime');
        if(this.EcoList.Constructiontelephone){
            var n = +this.EcoList.Constructiontelephone;
            if(!this.checkPhone(n)){
                this.EcoList.Constructiontelephone ="";
                return false;
            }
        }
        this.EcoList["COCode"] = this.id;
        this.EcoList["TableCode"] = 'C002';
        var a = '/api/pi';
        var b = '/api/pu';
        var url = '';
        if (this.isEcoAdd) {
          url = a;
        }
        if(this.isEcoUpdata){
          url = b;
          delete this.EcoList.FileInfo;
        }
        var formData = JSON.stringify(this.EcoList);
        this.$http.post(url, formData, {emulateJSON: true}).then((res) => {
             if (res.body.message === "successful") {
                if(this.isEcoAdd){
                   this.codeNumber=res.body.data[0].RecordCode;
                }
                if(this.isEcoUpdata){
                   this.codeNumber=this.EcoIndexNum;
                }
                if(val&&this.isEcoChecked==true){
                  this.$refs.upload.filePost();
                }
                if(val&&this.isEcoChecked==false){
                  this.Ecoclose();
                  this.EcoNew(this.id);
                }
             }
            if(res.body.success===false){
                this.$message({showClose: true,message:res.body.message,type: 'error'});
            }
        },(req) => {
          console.log("提交失败")
        });
      },
      SulSubmit:function(val){
        this.datechange(this.SulList.Replytime,'Replytime');
        if(this.SulList.Sultelephone){
            var n = +this.SulList.Sultelephone;
            if(!this.checkPhone(n)){
                this.SulList.Sultelephone ="";
                return false;
            }
        }
        this.SulList["COCode"] = this.id;
        this.SulList["TableCode"] = 'C003';
        var a = '/api/pi';
        var b = '/api/pu';
        var url = '';
        if (this.isSulAdd) {
          url = a;
        }
        if(this.isSulUpdata){
          url = b;
          delete this.SulList.FileInfo;
        }
        var formData = JSON.stringify(this.SulList);
        this.$http.post(url, formData, {emulateJSON: true}).then((res) => {
             if (res.body.message === "successful") {
                if(this.isSulAdd){
                   this.codeNumber=res.body.data[0].RecordCode;
                }
                if(this.isSulUpdata){
                   this.codeNumber=this.SulIndexNum;
                }
                if(val&&this.isSulChecked==true){
                  this.$refs.upload.filePost();
                }
                if(val&&this.isSulChecked==false){
                  this.Sulclose();
                  this.SulNew(this.id);
                }
             }
            if(res.body.success===false){
                this.$message({showClose: true,message:res.body.message,type: 'error'});
            }
        },(req) => {
          console.log("提交失败")
        });
      },
      /********
        * [1.子组件点击按成状态改变
        * @param  {[Boolen]} val [值为true]
        * @return
      *********/
      eialistenstatus(val){
          this.iseiaChecked=val;
      },
      Ecolistenstatus(val){
          this.isEcoChecked=val;
      },
      Sullistenstatus(val){
        this.isSulChecked=val;
      },
     /********
        * [1.子组件异步完成，并完成列表渲染和关闭
        * @param
        * @return
      *********/
      eiadrawing(){
         this.eiaclose();
         this.eiaNew(this.id);
         this.iseiaChecked=false;
      },
      Ecodrawing(){
         this.Ecoclose();
         this.EcoNew(this.id);
         this.isEcoChecked=false;
      },
      Suldrawing(){
         this.Sulclose();
         this.SulNew(this.id);
         this.isSulChecked=false;
      },
       /********
        * [1.点击close关闭时
        * @param
        * @return
      *********/
      eiaclose:function(){
         document.getElementById("close").click();
      },
      Ecoclose:function(){
         document.getElementById("Ecoclose").click();
      },
      Sulclose:function(){
         document.getElementById("Sulclose").click();
      },
        /********
        * [1.单行删除
        * @param  {[Number]} index [当前点击行的index]
        * @param  {[row]} row [当前点击行的所有信息]
        * @return
      *********/
      eiaDelete:function(index, row){
          var delId = row.RecordCode;

          this.$http.post('/api/pd', {TableCode: 'C001',COCode: this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
          if (res.body.message === "successful") {
             //独立的删除附件方法 如果有附件
             console.log(row.FileInfo)
             if(row.FileInfo.length>0){
                 this.eiaDel(row.FileInfo[0].RecordCode);
             }
             this.eiaNew(this.id);
        }}, (req) => {
          console.log("删除失败")
        });
      },
      EcoDelete:function(index, row){
          var delId = row.RecordCode;

          this.$http.post('/api/pd', {TableCode: 'C002',COCode: this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
          if (res.body.message === "successful") {
             //独立的删除附件方法 如果有附件
             console.log(row.FileInfo)
             if(row.FileInfo.length>0){
                 this.EcoDel(row.FileInfo[0].RecordCode);
             }
             this.EcoNew(this.id);
        }}, (req) => {
          console.log("删除失败")
        });
      },
      SulDelete:function(index, row){
          var delId = row.RecordCode;
          this.$http.post('/api/pd', {TableCode: 'C003',COCode: this.id,RecordCode: delId}, {emulateJSON: true}).then((res) => {
            if (res.body.message === "successful") {
                    this.SulNew(this.id);
            }
            else{
               this.$message({showClose: true,message:"数据删除失败",type: 'error'});
            }
        }, (req) => {
          console.log("删除失败")
        });
      },
      /********
        * [1.操作栏删除按钮
        * @param  {[String]} adressed [附件的地址]
        * @param  {[String]} named [附件的名字]
        * @param  {[String]} recorded [附件的RecordCode]
        * @return
      *********/
      eiaDel:function(recorded){
         this.$http.post("/api/pd",{TableCode:'M001',COCode:this.id,RecordCode:recorded}).then(function(res){
            if(res.body.success === true){
                  this.$message({showClose: true,message:"数据删除成功",type: 'success'});
            }
            else{
                 this.$message({showClose: true,message:"数据删除失败",type: 'error'});
            }
       },function(err){console.log(err);})
      },
      EcoDel:function(recorded){
         this.$http.post("/api/pd",{TableCode:'M001',COCode:this.id,RecordCode:recorded}).then(function(res){
            if(res.body.success === true){
                  this.$message({showClose: true,message:"数据删除成功",type: 'success'});
            }
            else{
                 this.$message({showClose: true,message:"数据删除失败",type: 'error'});
            }
       },function(err){console.log(err);})
      },
      SulDel:function(recorded){
         this.$http.post("/api/pd",{TableCode:'M001',COCode:this.id,RecordCode:recorded}).then(function(res){
            if(res.body.success === true){
                  this.$message({showClose: true,message:"数据删除成功",type: 'success'});
            }
            else{
                 this.$message({showClose: true,message:"数据删除失败",type: 'error'});
            }
       },function(err){console.log(err);})
      },
       /********
        * [1.修改页附件删除功能
        * @param  {[String]} adressed [附件的地址]
        * @param  {[String]} named [附件的名字]
        * @param  {[String]} recorded [附件的RecordCode]
        * @return
      *********/
      eiadeltaed:function(adressed,named,recorded){
        document.getElementById(recorded).style.display="none";
        this.$http.post("/api/pd",{TableCode:'M001',COCode:this.id,RecordCode:recorded}).then(function(res){
          if(res.body.success===true){
          }
        },function(err){
        })
      },
      Ecodeltaed:function(adressed,named,recorded){
        document.getElementById(recorded).style.display="none";
        this.$http.post("/api/pd",{TableCode:'M001',COCode:this.id,RecordCode:recorded}).then(function(res){
          if(res.body.success===true){
          }
        },function(err){
        })
      },
      Suldeltaed:function(adressed,named,recorded){
        document.getElementById(recorded).style.display="none";
        this.$http.post("/api/pd",{TableCode:'M001',COCode:this.id,RecordCode:recorded}).then(function(res){
          if(res.body.success===true){
          }
        },function(err){
        })
     },
       /********
        * [1.批量删除  给表格绑定一个事件  事件执行这个方法目的是获取 所有勾选的数据
        * @param  {[Array]} selection [全选数组]
        * @return
      *********/
      eiaselectAll(selection){
         this.eiaselect = selection;
      },
      EcoselectAll(selection){
         this.Ecoselect = selection;
      },
      SulselectAll(selection){
         this.Sulselect = selection;
      },

       /********
        * [1.批量删除
        * @param  {[Array]} arr [RecordCode的值]
        * @return
      *********/
      eiaDeleteAll(arr){
           console.log(arr)
           var delId = [];
           var delIdAll = [];
           for(var key in arr){
               delId.push(arr[key].RecordCode);
               if(!(arr[key].FileInfo.length === 0)){
                  delIdAll.push(arr[key].FileInfo[0].RecordCode);
               }
               else{
                 continue;
               }
           }
           if(delId.length === 0){
                this.$message({showClose: true,message:"没有选中数据或者页签发生改变",type: 'error'});
                return false;
           }
           this.$http.post('/api/pd',{TableCode:'C001',COCode:this.id,RecordCode:delId},{emulateJSON:true}).then((res) => {
               if( res.body.message==="successful"){
                  if(delIdAll.length>0){
                     this.eiaDel(delIdAll);
                  }
                     this.eiaNew(this.id);
               }
               if(res.body.success === false){
                    console.log(res.body.message);
                    this.$message({showClose: true,message:"没有选中数据或者页签发生改变",type: 'error'});
               }
            }, (req) => {
                console.log("删除失败")
          });
      },
      EcoDeleteAll(arr){
           console.log(arr)
           var delId = [];
           var delIdAll = [];
           for(var key in arr){
               delId.push(arr[key].RecordCode);
               if(!(arr[key].FileInfo.length === 0)){
                  delIdAll.push(arr[key].FileInfo[0].RecordCode);
               }
               else{
                 continue;
               }
           }
           if(delId.length === 0){
                this.$message({showClose: true,message:"没有选中数据或者页签发生改变",type: 'error'});
                return false;
           }
           this.$http.post('/api/pd',{TableCode:'C002',COCode:this.id,RecordCode:delId},{emulateJSON:true}).then((res) => {
               if( res.body.message==="successful"){
                  if(delIdAll.length>0){
                     this.EcoDel(delIdAll);
                  }
                     this.EcoNew(this.id);
               }
               if(res.body.success === false){
                    console.log(res.body.message);
                    this.$message({showClose: true,message:"没有选中数据或者页签发生改变",type: 'error'});
               }
            }, (req) => {
                console.log("删除失败")
          });
      },
      SulDeleteAll(arr){
           var delId = [];
           var delIdAll = [];
           for(var key in arr){
               delId.push(arr[key].RecordCode);
               if(!(arr[key].FileInfo.length === 0)){
                  delIdAll.push(arr[key].FileInfo[0].RecordCode);
               }
               else{
                 continue;
               }
           }
           if(delId.length === 0){
                this.$message({showClose: true,message:"没有选中数据或者页签发生改变",type: 'error'});
                return false;
           }
           this.$http.post('/api/pd',{TableCode:'C003',COCode:this.id,RecordCode:delId},{emulateJSON:true}).then((res) => {
               if( res.body.message==="successful"){
                  if(delIdAll.length>0){
                     this.SulDel(delIdAll);
                  }
                     this.SulNew(this.id);
               }
               if(res.body.success === false){
                    console.log(res.body.message);
                    this.$message({showClose: true,message:"没有选中数据或者页签发生改变",type: 'error'});
               }
            }, (req) => {
                console.log("删除失败")
          });
      },
      /********
        * [1.分页
        * @param  {[Array]} msg [页数]
        * @return
      *********/
      eiashowMsgFromChild(msg,pages){
          this.eiaromance = msg;
          this.eiacurrentPages = pages;
      },
      EcoshowMsgFromChild(msg,pages){
          this.Ecoromance = msg;
          this.EcocurrentPages = pages;
      },
      SulshowMsgFromChild(msg,pages){
          this.Sulromance = msg;
          this.SulcurrentPages = pages;
      },
      /********
        * [1.日期格式化
        * @param  {[String]} val [事件的值]
        * @param  {[String]} n [格式化时间administrativePenalty对应的值]
        * @return
      *********/
      datechange(val,n){
          if(val){
            var str1 = val.toLocaleString().slice(0,10).toString().replace(/\//g,"-")
            var str2 = str1.split(" ",1)[0].split("-");
            if(str2[1].length<2){
                  str2[1] = "0"+str2[1];
            }
            if(str2[2].length<2){
                  str2[2] = "0"+str2[2];
            }
            this.eiaList[n] = str2.join("-");
          }
      },
      datechangeECO(val,n){
          if(val){
            var str1 = val.toLocaleString().slice(0,10).toString().replace(/\//g,"-")
            var str2 = str1.split(" ",1)[0].split("-");
            if(str2[1].length<2){
                  str2[1] = "0"+str2[1];
            }
            if(str2[2].length<2){
                  str2[2] = "0"+str2[2];
            }
            this.EcoList[n] = str2.join("-");
          }
      },
      datechangeSul(val,n){
        if(val){
            var str1 = val.toLocaleString().slice(0,10).toString().replace(/\//g,"-")
            var str2 = str1.split(" ",1)[0].split("-");
            if(str2[1].length<2){
                  str2[1] = "0"+str2[1];
            }
            if(str2[2].length<2){
                  str2[2] = "0"+str2[2];
            }
            this.EcoList[n] = str2.join("-");
          }
      },
      /********
        * [1.验证手机手机号
        * @param  {[number]} event [手机号值]
        * @return
      *********/
      checkPhone:function(n){
        if((n.toString().length>0)&&(n != 0)){
            if(!(/^1(3|4|5|7|8)\d{9}$/.test(n))){
                this.$message({showClose: true,message:"手机号码有误,请重填",type: 'error'});
                return false;
            }else{
              return n;
            }
         }
         else{
            return true;
         }
      },
      unique : function(arr){
          var res = [];
          var json = {};
          for(var i = 0; i < arr.length; i++){
              if(!json[arr[i]]){
                res.push(arr[i]);
                json[arr[i]] = 1;
              }
          }
        return res;
      },
      tabclick:function(val){
         console.log(val.name);
         if(val.name==='first'){
            this.tabfirst = true;
            this.tabsecond =false;
            this.tabthree =false;
         }
         if(val.name==='second'){
            this.tabfirst = false;
            this.tabsecond =true;
            this.tabthree =false;
         }
         if(val.name==='three'){
            this.tabfirst = false;
            this.tabsecond =false;
            this.tabthree = true;
         }
      },
      handleChange(value) {
          this.EcoList["IndustryCategory"] = value.join(",");
      },
      handleChange1(value) {
          this.eiaList["AdministrativeCategory"] = value.join(",");
      }
    }
  }

</script>
<style scoped>
@media (min-width: 768px){
    .modal-dialog {
        width:800px;
    }
    #myModal03 .modal-dialog{
      width:600px;
    }
}
.el-radio__inner{
  width:14px;
  height: 14px;
}
.modal .el-date-editor.el-input{
  width: auto;
}
.tdwidth{
  width: 120px;
}
</style>
