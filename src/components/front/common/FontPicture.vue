<template>
  <el-carousel :interval="4000" type="card" height="400px" >
    <el-carousel-item v-for="item in pictures" :key="item">
      <!-- <h3>{{ item }}</h3> -->
      <img :src='item' alt='我是一张轮播图' width="100%" height="100%">
    </el-carousel-item>
  </el-carousel>
</template>
<script>
export default {
    data(){
        return{
            pictures:[require('./images/天空.jpg'),require('./images/水库.jpg'),require('./images/水库2.jpg'),require('./images/铁轨.jpg')]
        }
    }
};
</script>
<style scoped>

</style>
