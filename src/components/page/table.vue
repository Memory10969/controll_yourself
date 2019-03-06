<template>
  <div class="tableWapper">
    <el-row>
      <!-- <el-input v-model="search.moduleName" placeholder="请输入模块名称" size="small"></el-input> -->
      <el-col :span="8">
        <el-input v-model="searchObj.moduleName" placeholder="请输入模块名称" style="width:200px"></el-input>
        <el-button type="primary" plain @click="findByKeywords()">查询</el-button>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" plain @click="addDialog = true">增加</el-button>
      </el-col>
      <el-col :span="8"></el-col>
    </el-row>
    <!-- :default-sort="{porp:'date',order:'descending'}" -->
    <el-table
      :data="tableData"
      border
      max-height="400"
      v-loading="loading"
      element-loading-text="玩命加载中"
    >
      <!-- <el-table-column fixed prop="date" label="日期" sortable width="150"></el-table-column> -->
      <!-- <el-table-column prop="name" label="姓名" width="120"></el-table-column> -->
      <!-- <el-table-column prop="province" label="省份" width="120"></el-table-column> -->
      <!-- <el-table-column prop="city" label="市区" width="120"></el-table-column> -->
      <el-table-column prop="moduleId" label="id"></el-table-column>
      <el-table-column prop="moduleName" label="模块名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="120px">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="load(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="delOne(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-row style="margin-top : 20px">
      <el-col :span="10" :offset="9">
        <div class="block">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pageInfo.pageNum"
            :page-sizes="[5, 10, 20]"
            :page-size.sync="pageInfo.pageSize"
            :total="pageInfo.total"
            layout="total, sizes, prev, pager, next, jumper"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>

    <!-- 增加dialog -->
    <el-dialog title="增加模块" :visible.sync="addDialog">
      <el-form @submit.native.prevent>
        <el-form-item label="模块名称" label-width="100">
          <el-input autocomplete="off" v-model="addObj.moduleName" style="width:300px"></el-input>
        </el-form-item>
        <!-- <el-form-item label="活动区域" label-width="100">
          <el-select placeholder="请选择活动区域" v-model="value">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="add()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改dialog -->
    <el-dialog title="修改模块" :visible.sync="updateDialog">
      <el-form @submit.native.prevent>
        <el-form-item label="模块名称" label-width="100">
          <el-input autocomplete="off" v-model="updateObj.moduleName" style="width:300px"></el-input>
        </el-form-item>
        <!-- <el-form-item label="活动区域" label-width="100">
          <el-select placeholder="请选择活动区域" v-model="value">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateDialog = false">取 消</el-button>
        <el-button type="primary" @click="update()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      tableData: [],
      // table加载
      loading: true,
      // 添加  对话框
      addDialog: false,
      // 修改对话框
      updateDialog: false,
      // 分页对象
      pageInfo: {
        pageNum: 1, // 当前页
        pageSize: 10, // 每页的数量
        total: 1, // 总条数
        pages: 1 // 总页数
      },
      // 增加对象 绑定到组件中
      addObj: {
        moduleId: "",
        moduleName: "",
        moduleIcon: ""
      },
      // 查询对象
      searchObj: {
        moduleId: "",
        moduleName: "",
        moduleIcon: ""
      },
      // 修改对象
      updateObj: {
        moduleId: "",
        moduleName: "",
        moduleIcon: ""
      }
    };
  },

  methods: {
    deleCols(data) {
      if (data.length) {
        data.forEach(baseModule => {
          delete baseModule.baseFunctionList;
        });
      } else {
        delete data.baseFunctionList;
      }
    },
    handleClick(row) {
      console.log(row);
    },
    // 增加
    add() {
      this.$axios
        .post("/api/baseModule/add", this.$qs.stringify(this.addObj))
        .then(response => {
          // console.log(response)
          if (response.data) {
            this.$message({
              type: "success",
              message: "增加成功"
            });
            this.addDialog = false;
            this.findByPage();
          } else {
            this.$message({
              type: "info",
              message: "增加失败"
            });
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.addObj.moduleId = this.moduleName = "";
          // alert(123)
        });
    },
    // 查询所有
    findAll() {
      this.$axios
        .get("/api/baseModule/ajaxList")
        .then(response => {
          console.log(response.data);
          this.list = response.data;
          this.tableData = this.list;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 根据id查询一个,弹出修改对话框
    load(baseModule) {
      this.$axios
        .post("/api/baseModule/load", this.$qs.stringify(baseModule))
        .then(response => {
          console.log(response);
          this.deleCols(response.data)
          this.updateObj = response.data;
          this.updateDialog = true;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 根据id删除一个
    delOne(baseModule) {
      this.$confirm("确定删除?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var id = baseModule.moduleId;
          this.$axios
            .post("/api/baseModule/delOne?moduleId=" + id)
            .then(response => {
              if (response.data) {
                this.$message({
                  type: "success",
                  message: "删除成功"
                });
                this.findByPage();
              } else {
                this.$message({
                  type: "info",
                  message: "删除失败"
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除"
          });
        });
    },
    // 根据关键字查询
    findByKeywords() {
      this.loading = true;
      // alert(this.search.moduleName)
      this.$axios
        .post(
          "/api/baseModule/findByKeywords",
          this.$qs.stringify(this.searchObj)
        )
        .then(response => {
          this.tableData = response.data;
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => (this.loading = false));
    },
    handleSizeChange() {
      this.pageInfo.pageNum = 1;
      this.findByPage();
    },
    handleCurrentChange() {
      this.findByPage();
    },
    findByPage() {
      this.loading = true;
      this.$axios
        .post("/api/baseModule/findByPage", this.$qs.stringify(this.pageInfo)+"&"+this.$qs.stringify(this.searchObj))
        .then(response => {
          // console.log(response.data);
          this.pageInfo.pages = response.data.pages;
          this.pageInfo.total = response.data.total;
          // this.pageInfo.pageNum = response.data.pageNum;
          this.list = response.data.list;
          // this.deleCols(this.tableData)
          //  this.list.forEach(baseModule=>{
          //    delete baseModule.baseFunctionList
          //   //  console.log(baseModule)
          //  })
          this.deleCols(this.list);
          this.tableData = this.list;
          console.log(this.tableData);
        })
        .catch(error => console.log(error))
        .finally(() => (this.loading = false));
    },
    // 修改
    update() {
      console.log(this.$qs.stringify(this.updateObj));
      this.$axios
        .post("/api/baseModule/update", this.$qs.stringify(this.updateObj))
        .then(response => {
          if (response.data) {
            this.$message({
              type: "success",
              message: "修改成功"
            });
            this.updateDialog = false;
            this.findByPage();
          } else {
            this.$message({
              type: "info",
              message: "修改失败"
            });
          }
        })
        .catch(error => console.log(error));
    }
  },

  // 加载页面时自动查询
  created() {
    this.findByPage();
  }
};
</script>
<style  scoped>
.tableWapper {
  float: left;
  width: 1200px;
  margin-left: 30px;
  padding: 20px;
}
.el-table {
  margin-top: 30px;
}
</style>
