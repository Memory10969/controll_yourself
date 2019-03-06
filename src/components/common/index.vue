<template>
   <el-container>
        <el-header>Header</el-header>
        <el-container>
            <el-aside width="200px">Aside</el-aside>
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {
    data(){
        return{

        }
    }
}
</script>
<style>
.el-header{
    background: "red";
}
.el-aside{
      background-color: "blue";
}
.el-main{
      background-color: "green";
}
</style>

