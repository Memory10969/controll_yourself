<template>
    <div class="wrapper">
        <div class="headList">
            <font-header></font-header>
        </div>
        <div class="pictures">
            <pictures></pictures>
        </div>
        <div class="introduce">
            <introduce></introduce>
        </div>
        <div class="footer">
            <foot></foot>
        </div>
    </div>
</template>
<script>
import fontHeader from './FontHeader.vue'
import pictures from './FontPicture.vue'
import introduce from './FontIntroduce.vue'
import foot from './FontFooter.vue'
export default {
    data(){
        return{

        }
    },
    components:{
        fontHeader,
        pictures,
        introduce,
        foot
    }
}
</script>
<style scoped>
.wrapper{
    background-color: rgb(1, 21, 44);
}
.pictures{
    width: 1200px;
    height: 500px;
    margin:0px auto;
    margin-top: 50px;
}
.introduce{
    width: 1000px;

    margin: 0px auto
}
</style>
