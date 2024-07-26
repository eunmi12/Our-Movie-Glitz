<template>
   <div class="login_main">
        <div class="login_wrap">
            <div class="login_list">
                <div class="login_title">
                    <h1>로그인</h1>
                </div>
                <div class="login_menu">
                    
                </div>
                
            </div>
        </div>
   </div>
</template>
<script>
export default {
    data() {
        return {
            sampleData: ''
        };
    }
}
</script>
<style scoped>

.login_main{
    width: 100%;
    height: 100%;
    margin-top: 80px;
}
.login_main .login_wrap{
    width: 80%;
    min-width: 1200px;
    margin: 0 auto;
}
.login_wrap .login_list{
    width: 100%;
    height: 800px;
    background: rgb(189, 190, 189);
}

.login_list .login_title{
    width: 100%;
    border-bottom: 1px solid black;
    padding-top: 10px;
}

</style>