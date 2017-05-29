import Vue from 'vue';
import Router from 'vue-router';
/*引入子组件*/
import home from '../components/home.vue';
import login from '../components/login.vue';
import page2 from '../components/page2.vue';
import company from '../components/company.vue';
import pollute from '../components/pollute.vue';
import survey from '../components/survey.vue';
import base from '../components/base.vue';
import solidwaste from '../components/solidwaste.vue'
import exposure from '../components/exposure.vue'
import pcharge from '../components/pcharge.vue'
//基本信息
import basicInformation from '../components/basicInformation.vue';
//产区平面图
import plantFloorPlan from '../components/plantFloorPlan.vue';
//排口信息
import portsInformation from '../components/portsInformation.vue';
//生产概况
import productionOverview from '../components/productionOverview.vue';
//项目信息
import companyNews from '../components/companyNews.vue';
//建设项目审批
import Information from '../components/Information.vue';
//关停并转
import Down from '../components/Down.vue'

//监督性监测数据
import supervise from '../components/supervise.vue';
//自动检测数据
import automatic from '../components/automatic.vue';
//自行监测数据
import voluntarily from '../components/voluntarily.vue';
//排放情况
import situation from '../components/situation.vue'


//环评及验收审批
import acceptance from '../components/acceptance.vue';
//新建验收
import acceptanceNew2 from '../components/acceptanceNew2.vue';
//许可证审批
import license from '../components/license.vue';
//总量减排指标
import totalReduction from '../components/totalReduction.vue';
//治理设施情况
import govern from '../components/govern.vue';
//工艺流程图
import technics from '../components/technics.vue';
//设备停运记录
import offstream from '../components/offstream.vue'
// 设备维修记录
import maintenance from '../components/maintenance.vue'

//危废转移
import transfer from '../components/transfer.vue';
import annual from '../components/annual.vue'

//放射源活动种类和范围
import radioactive from '../components/radioactive.vue';
//台账明细登记
import ledger from '../components/ledger.vue';
//监测仪器
import monitor from '../components/monitor.vue';

//行政处罚界面
import administrative from '../components/administrative.vue';
//信访投诉界面
import complaint from '../components/complaint.vue';
//信访投诉新建界面
import complaintNew from '../components/complaintNew.vue';
//环境应急预案的界面
import emergencyPlan from '../components/emergencyPlan.vue';
//环境应急预案新建的界面
import emergencyPlanNew from '../components/emergencyPlanNew.vue';
//环境监察的界面
import Emonitoring from '../components/Emonitoring.vue';
//环境监察新建界面
import EmonitoringNew from '../components/EmonitoringNew.vue';
//辐射安全管理机构的界面
import radiation from '../components/radiation.vue';
//批量导入
import batchImport from '../components/batchImport.vue';

//排污收费界面
import pollutionCharge from '../components/pollutionCharge.vue';
import report from '../components/report.vue';
import permit from '../components/permit.vue';

import enforcement from '../components/enforcement.vue'

import power from '../components/power.vue'

import powerConfig from '../components/powerConfig.vue'

import dataStatistics from '../components/dataStatistics.vue'

Vue.use(Router);


export default new Router({
    routes: [
        { path: "/", component: home },
        { path: "/home", component: home },
        { path: "/page2", component: page2 },
        {
            path: '/company',
            component: company,
            children: [
                { path: "basicInformation", component: basicInformation },
                { path: "plantFloorPlan", component: plantFloorPlan },
                { path: "portsInformation", component: portsInformation },
                { path: "productionOverview", component: productionOverview },
                { path: "companyNews", component: companyNews },
                { path: "Information", component: Information },
                { path: "Down", component: Down }
            ]
        },
        {
            path: '/pollute',
            component: pollute,
            children: [
                { path: "voluntarily", component: voluntarily },
                { path: "supervise", component: supervise },
                { path: "automatic", component: automatic },
                { path: "situation", component: situation }
            ]
        },
        {
            path: '/survey',
            component: survey,
            children: [
                { path: "acceptance", component: acceptance },
                { path: "acceptanceNew2", component: acceptanceNew2 },
                { path: "license", component: license },
                { path: "totalReduction", component: totalReduction }
            ]
        },
      {
        path: '/base',
        component: base,
        children: [
          { path: "govern", component: govern },
          { path: "technics", component: technics },
          { path: "offstream", component: offstream },
          { path: "maintenance", component: maintenance }
        ]
      },
        {path: '/batchImport', component: batchImport},
        {
            path: '/solidwaste',
            component: solidwaste,
            children: [
                { path: "transfer", component: transfer },
                { path: "annual", component: annual }
            ]
        },
        {
            path: '/exposure',
            component: exposure,
            children: [
                { path: "radioactive", component: radioactive },
                { path: "ledger", component: ledger },
                { path: "monitor", component: monitor },
                { path: "radiation", component: radiation }
            ]
        },
        { path: "/administrative", component: administrative },
        { path: "/complaint", component: complaint },
        { path: "/complaintNew", component: complaintNew },
        { path: "/emergencyPlan", component: emergencyPlan },
        { path: "/emergencyPlanNew", component: emergencyPlanNew },
        { path: "/Emonitoring", component: Emonitoring },
        { path: "/EmonitoringNew", component: EmonitoringNew },
        {
            path: '/pcharge',
            component: pcharge,
            children: [
                { path: "report", component: report },
                { path: "pollutionCharge", component: pollutionCharge },
                { path: "permit", component: permit }
            ]
        },
        { path: "/enforcement", component: enforcement },
        { path: "/power", component: power },
        { path: "/powerConfig", component: powerConfig },
        { path: "/dataStatistics", component: dataStatistics },




        /*默认跳转路由*/
        { path: "/*", redirect: "/home" }
    ]
})
