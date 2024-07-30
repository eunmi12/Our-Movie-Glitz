<template>
    <div class="admin">
        <adminpage-sidebar/>
        <div class="adminmain">
            <span>관리자님, 환영합니다!</span>
        </div>
        
    </div>
</template>
<script>
// import axios from "axios";
import AdminpageSidebar from "../layouts/AdminpageSidebar.vue";
export default {
    components: {
        AdminpageSidebar,
    },
}
</script>
<style scoped>
.admin{
    display: flex;
}
.adminmain {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    font-size:40px;
}
</style>