<template>
    <footer>
        <div class="footer">
            <p>
                © 2024<br>
                회사소개 | 개인정보처리방침 | 이용약관 | 사업자정보<br>
                대표자 | Our Moive Glitz | 사업자등록번호 | 123-12-12345<br>
                주소 서울특별시 종로구 종로 78 미려빌딩 이젠아카데미컴퓨터학원<br>
                팩스 | 02-123-1234 | 이메일 | ourmoiveglitz@omg.com
            </p>
        </div>
    </footer>
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
.footer{
    text-align: center;
    background: #ccc;
    padding: 20px;
    margin-top: 50px;
    /* 언제든 수정 가능 */
    /* position: relative;
    bottom: 0;
    width: 100%; */
}

p{
    margin-bottom: 0;
}
</style>