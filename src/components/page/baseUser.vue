<template>
  <div class="tableWapper">
      <span> 我是新的</span>
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
