<template>
    <div class="join_main" style="margin: 20px; padding: 20px; position: relative;">
        <div class="join_wrap">
            <div class="main_title">
                <h2>회원가입</h2>
            </div>
            <div class="join_list" style="text-align: left;">
                <form action="#" method="post">   
                    <div class="form_group">
                        <div class="form_left">
                            <span>&nbsp;&nbsp;&nbsp;아이디</span>
                        </div>
                        <div class="form_right">&nbsp;&nbsp;
                            <input type="text" id="userid" name="userid">
                        </div>                        
                    </div>   
                    <div class="form_group">
                        <div class="form_left">
                            <span>&nbsp;&nbsp;&nbsp;비밀번호</span>
                        </div>
                        <div class="form_right">&nbsp;&nbsp;
                            <input type="password" id="password1" name="password1">
                            <span class="confirm">(영문 대소문자/숫자/특수문자 중 3가지 이상 조합,8~20자)</span>
                        </div>                        
                    </div>                    
                    <div class="form_group">
                        <div class="form_left">
                            <span>&nbsp;&nbsp;&nbsp;비밀번호 확인</span>
                        </div>
                        <div class="form_right">&nbsp;&nbsp;
                            <input type="password" id="password2" name="password2">
                            <button type="button" class="btn_confirm1">비밀번호확인</button>
                        </div>                        
                    </div>                    
                    <div class="form_group">
                        <div class="form_left">
                            <span>&nbsp;&nbsp;&nbsp;이름</span>
                        </div>
                        <div class="form_right">&nbsp;&nbsp;
                            <input type="text" id="username" name="username">
                        </div>                        
                    </div>                 
                    <div class="form_group">
                        <div class="form_left">
                            <span>&nbsp;&nbsp;&nbsp;성별</span>
                        </div>
                        <div class="form_right">&nbsp;&nbsp;
                            <input type="radio" id="sex" name="man" value='M' > 남자 &nbsp;&nbsp;
                            <input type="radio" id="sex" name="woman" value='F'> 여자
                        </div>                        
                    </div>
                    <div class="form_group">
                        <div class="form_left">
                            <span>&nbsp;&nbsp;&nbsp;휴대전화번호</span>
                        </div>
                        <div class="form_right">&nbsp;&nbsp;
                            <select name="number1" id="number1">
                                <option value="010">010</option>
                                <option value="011">011</option>
                                <option value="012">012</option>
                            </select>
                            <span> - </span>
                            <input type="text" name="number2" id="number2">
                            <span> - </span>
                            <input type="text" name="number3" id="number3">
                        </div>                        
                    </div>                  
                </form>
            </div>
            <div class="join_btn">
                <button type="button" name="clear" id="clear">회원가입</button>
                <button type="button" name="exit" id="exit">수정취소</button>
            </div>
        </div>        
    </div>
</template>
<!-- <script>
export default {
    data() {
        return {
            sampleData: ''
        };
    }
}
</script> -->
<style>

</style>