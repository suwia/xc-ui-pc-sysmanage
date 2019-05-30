<template>
  <!-- 编写页面静态部分，即view部分-->
  <div>
    <el-form :model="pageForm" label-width="80px" :rules="pageFormRules" ref="pageForm">
      <el-form-item label="所属站点" prop="siteId">
        <el-select v-model="pageForm.siteId" placeholder="请选择站点">
          <el-option v-for="item in siteList"
                     :key="item.siteId"
                     :label="item.siteName"
                     :value="item.siteId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="模版文件" prop="templateFileId">
        <el-select v-model="pageForm.templateFileId" placeholder="请选择">
          <el-option
            v-for="item in templateFileList"
            :key="item.templateFileId"
            :label="item.templateName"
            :value="item.templateFileId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="模板名称" prop="templateName">
        <el-input v-model="pageForm.templateName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="模板参数" prop="templateParameter">
        <el-input v-model="pageForm.templateParameter" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="addSubmit">提交</el-button>
      <el-button type="primary" @click="go_back">返回</el-button>
    </div>
  </div>
</template>
<script>
  import * as cmsApi from '../api/cms'

  export default {
    data() {
      return {
        //站点列表
        siteList:[],
        //模版列表
        templateFileList:[],
        //新增界面数据
        pageForm: {
          siteId:'',
          templateName:'',
          templateParameter: '',
          templateFileId: ''
        },


        //校验规则
        pageFormRules: {
          siteId:[
            {required: true, message: '请选择站点', trigger: 'blur'}
          ],
          templateFileId:[
            {required: true, message: '请选择模版文件', trigger: 'blur'}
          ],
          templateName: [
            {required: true, message: '请输入模板名称', trigger: 'blur'}
          ],
          templateParameter: [
            {required: true, message: '请输入模板参数', trigger: 'blur'}
          ]
        }

      }
    },
    methods:{

      //提交
      addSubmit(){

        //对表单进行校验，校验通过才提交表单信息
        this.$refs['pageForm'].validate((valid) => {
          if (valid) {

            //表单提交确认框
            this.$confirm('确认提交该页面?', '提示', {}).then(() => {

              cmsApi.template_add(this.pageForm).then((res) => {
                if (res.success) {
                  this.$message({
                    type: 'success',
                    message: '提交成功!'
                  });

                  //提交成功重置表单域
                  this.$refs['pageForm'].resetFields();
                } else if (res.message) {
                  this.$message.error(res.message);
                } else {
                  this.$message.error('提交失败');
                }
              })


            })


          }
        });
      },

      go_back(){
        this.$router.push({
          path: '/cms/template/list', query: {
            page: this.$route.query.page,
            siteId:this.$route.query.siteId
          }
        })
      }

    },

    created: function () {
      //初始化站点列表
      this.siteList = [
        {
          siteId: '5a751fab6abb5044e0d19ea1',
          siteName: '门户主站'
        },
        {
          siteId: '102',
          siteName: '测试站'
        }
      ]
      //模板列表
      this.templateFileList = [
        {
          templateFileId: '5a795bbcdd573c04508f3a59',
          templateName: 'index_banner.html'
        },
        {
          templateFileId: '5a7b9fa5d019f14224087d64',
          templateName: 'test.html'
        }
      ]
    },

    mounted() {

    }
  }
</script>
<style>
  /*样式部分*/
</style>
