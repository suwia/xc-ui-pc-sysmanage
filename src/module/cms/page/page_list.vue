<template>
  <!-- 编写页面静态部分，即view部分-->
  <div>
    <!--查询表单-->
    <el-form :model="param">
      <el-select v-model="param.siteId" placeholder="请选择站点">
        <el-option
          v-for="item in siteList"
          :key="item.siteId"
          :label="item.siteName"
          :value="item.siteId">
        </el-option>
      </el-select>
      页面别名：
      <el-input v-model="param.pageAliase" style="width: 100px"></el-input>
      <el-button type="primary" size="small" @click="query">查询</el-button>
      <router-link class="mui-tab-item" :to="{path:'/cms/page/add/',
          query:{
            page: this.param.page,
            siteId: this.param.siteId
          }
        }">
        <el-button type="primary" size="small">新增页面</el-button>
      </router-link>
    </el-form>
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="pageName" label="页面名称" width="120"></el-table-column>
      <el-table-column prop="pageAliase" label="别名" width="120"></el-table-column>
      <el-table-column prop="pageType" label="页面类型" width="150"></el-table-column>
      <el-table-column prop="pageWebPath" label="访问路径" width="250"></el-table-column>
      <el-table-column prop="pagePhysicalPath" label="物理路径" width="250"></el-table-column>
      <el-table-column prop="pageCreateTime" label="创建时间" width="180"></el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        layout="prev, pager, next, jumper, ->, total"
        :page-size="10"
        :total="total"
        style="float: right"
        :current-page="param.page"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import * as cmsApi from '../api/cms'

  export default {
    data() {
      return {
        param: {
          page:1,
          size:10,
          siteId:0

        },
        total: 0,
        list: [],
        siteList: []
      }
    },
    methods:{
      query:function () {
        cmsApi.page_list(this.param.page, this.param.size, this.param).then((res) => {
          console.log(res);
          this.total = res.queryResult.total;
          this.list = res.queryResult.list;

        })
      },
      handleCurrentChange:function (page) {
        this.param.page = page;
        this.query();
      }
    },

    created() {
      //从路由上获取参数
      this.param.page = Number.parseInt(this.$route.query.page||1);
      this.param.siteId = this.$route.query.siteId||'';

    },

    mounted() {

      //默认页面查询
      this.query();

      //初始化站点列表
      this.siteList = [
        {
          siteId:'5a751fab6abb5044e0d19ea1',
          siteName:'门户主站'
        },
        {
          siteId:'102',
          siteName:'测试站'
        }
      ]
    }
  }
</script>
<style>
  /*样式部分*/
</style>
