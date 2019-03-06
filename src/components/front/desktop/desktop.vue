<template>
  <div class="backgroud">
    <div class="main">
      <div class="left">
        <div class="userInfo">
          <el-card shadow="hover">
            <div class="headPic">
              <img src alt="头像" width="100px" height="100px">
            </div>
            <div class="info">
               <!-- <el-table :data="">
                 <ElTableColumn label=""></ElTableColumn>
               </el-table> -->
            </div>
          </el-card>
        </div>
        <div class="date">
          <el-date-picker
            v-model="date"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width:250px"
          ></el-date-picker>
        </div>
        <div class="titils"></div>
      </div>
      <div class="right">
        <editor></editor>
      </div>
    </div>
  </div>
</template>
<script>
import editor from "../common/editor.vue";
export default {
  data() {
    return {};
  },
  components: {
    editor
  }
};
</script>
<style scoped>
.background {
  background: url("../common/images/水库.jpg") 1500px 900px;
}
.main {
  border: 1px black solid;
  width: 1200px;
  height: 800px;
  margin: 50px auto;
}
.left,
.right {
  float: left;
  border: 1px black green;
  /* background:red */
}
.left {
  width: 250px;
  height: 100%;
}
.userInfo {
  height: 250px;
  width: 250px;
  /* background: lightblue; */
}
.info ol{
    
}
.headPic {
  width: 100px;
  height: 100px;
  margin: 0px auto;
  border: 1px black solid;
  border-radius: 50%;
  overflow: hidden;
}

.date {
  width: 250px;
  height: 250px;
  background: lightcoral;
}
.titles {
  width: 250px;
}
.right {
  width: 925px;
  height: 100%;
  margin-left: 25px;
}
</style>
