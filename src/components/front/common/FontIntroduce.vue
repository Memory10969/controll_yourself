<template>
  <el-row>
    <el-col :span="6" v-for="card in cardList" :key="card" :offset="2">
      <el-card :body-style="{ padding: '0px' }">
        <img :src="card.img" class="image" height="200px">
        <div style="padding: 14px;">
          <span>{{card.intro}}</span>
          <div class="bottom clearfix">
            <!-- <time class="time">{{ currentDate }}</time> -->
            <el-button type="text" class="button">操作按钮</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
export default {
    data(){
        return{
            cardList:[
                {intro:'这是一段描述',img:require('./images/水库.jpg')},
                {intro:'这还是一段描述',img:require('./images/水库2.jpg')},
                {intro:'这是一段描述',img:require('./images/水库.jpg')},
                {intro:'这还是一段描述',img:require('./images/水库2.jpg')},
                {intro:'这是一段描述',img:require('./images/水库.jpg')},
                {intro:'这还是一段描述',img:require('./images/水库2.jpg')},
            ]
        }
    }
};
</script>
<style scoped>
.el-card{
    margin-bottom:50px
}
</style>


