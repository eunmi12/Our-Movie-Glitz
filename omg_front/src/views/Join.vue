<template>
    <div class="join">
        <div class="join_wrap">
            <form @submit.prevent="onsubmitForm">
                <div class="join_title">
                    <h1 class="title">회원가입</h1>
                    <p class="sub_tit">회원이 되어 다양한 영화를 즐겨보세요!</p>
                </div>
                    <div class="join_list">
                        <div class="user_id">
                            <div class="id_title">
                                <h3>아이디</h3>
                            </div>
                            <div class="id_input">
                                <input type="text" id="user_id" v-model="user_id" minlength="6" maxlength="20" placeholder="아이디 입력(6~20자)">
                                <button class="id_check" type="button" @click="id_check">중복 확인</button>
                            </div>
                            <div v-if="errors.user_id" class="error" hidden>{{ errors.user_id }}</div>
                        </div>
                        <div class="user_pwd">
                            <div class="pwd_title">
                                <h3>비밀번호</h3>
                            </div>
                            <div class="pwd_input">
                                <input type="password" id="user_pwd" v-model="user_pwd" minlength="8" maxlength="20" placeholder="비밀번호 입력(문자, 숫자, 특수문자 포함 8~20자)">
                            </div>
                            <div v-if="errors.user_pwd" class="error" hidden>{{ errors.user_pwd }}</div>
                        </div>
                        <div class="user_pwd">
                            <div class="pwd_title">
                                <h3>비밀번호 확인</h3>
                            </div>
                            <div class="pwd_input">
                                <input type="password" id="user_pwd2" v-model="user_pwd2" minlength="8" maxlength="20"  placeholder="비밀번호 재입력">
                                <button class="pwd_check" type="button" @click="pwd_check">중복 확인</button>
                            </div>
                            <div v-if="errors.user_pwd2" class="error" hidden>{{ errors.user_pwd2 }}</div>
                        </div>
                        <div class="user_name">
                            <div class="name_title">
                                <h3>이름</h3>
                            </div>
                            <div class="name_input">
                                <input type="text" id="user_name" v-model="user_name" placeholder="이름">
                            </div>
                            <div v-if="errors.user_name" class="error" hidden>{{ errors.user_name }}</div>
                        </div>
                        <div class="user_phone">
                            <div class="phone_title">
                                <h3>핸드폰번호</h3>
                            </div>
                            <div class="phone_input">
                                <select name="number1" v-model="number1" id="number1">
                                    <option value="010">010</option>
                                    <option value="011">011</option>
                                    <option value="012">012</option>
                                </select>
                                <span style="font-size: 20px;"> - </span>
                                <input type="text" name="number2" v-model="number2"  id="number2" maxlength="4">
                                <span style="font-size: 20px;"> - </span>
                                <input type="text" name="number3" v-model="number3" id="number3" maxlength="4">
                            </div>
                            <div v-if="errors.phone" class="error" hidden>{{ errors.phone }}</div>
                        </div>
                        <div class="user_gender">
                            <div class="gender_title">
                                <h3>성별</h3>
                            </div>
                            <div class="gender_input">
                                <label for="men" style="padding-right: 20px; font-size: 16px;">
                                    <input type="radio" v-model="gender" id="men" name="gender" value="M">남자
                                </label>
                                <label for="women">
                                    <input type="radio" v-model="gender" id="women" name="gender" value="F">여자
                                </label>
                            </div>
                            <div v-if="errors.gender" class="error" hidden>{{ errors.gender }}</div>  
                        </div>
                        <div class="user_age">
                            <div class="age_title">
                                <h3>생년월일</h3>
                            </div>
                            <div class="age_input">
                                <input type="date" v-model="user_age" id="age_name">
                            </div>
                            <div v-if="errors.user_age" class="error" hidden>{{ errors.user_age }}</div>  
                        </div>
                    </div>
                <div class="join_btn">
                    <button type="submit" name="clear" id="clear">회원가입</button>
                    <button type="button" name="exit" id="exit" @click="exit" >취소</button>
                </div>
            </form>
        </div>
        
    </div>
    
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            user_id: '',
            user_pwd: '',
            user_pwd2: '',
            user_name: '',
            number1: '010',
            number2: '',
            number3: '',
            gender: '',
            user_age: '',
            errors : {},

        };
    },
    methods: {
        validateForm() {
            this.errors = {};

            //아이디 유효성 검사
            if(!this.user_id) {
                this.errors.email = '아이디를 입력해 주세요';
                this.$swal(this.errors.email);
                return false;
            } else if(this.user_id.length < 6 || this.user_id.length > 20){
                this.errors.user_id = '아이디는 6~20자 사이여야 합니다.';
                this.$swal(this.errors.user_id);
                return false;
            }

            //비밀번호 유효성 검사
            if(!this.user_pwd){
                this.errors.user_pwd = '비밀번호를 입력해 주세요';
                this.$swal(this.errors.user_pwd);
                return false;
            } else {
                const user_pwd = this.user_pwd;
                if(user_pwd.length < 8 || user_pwd.length > 20){
                    this.$swal(this.errors.user_pwd);
                    return false;
                }
                const hasUpperCase = /[A-Z]/.test(user_pwd);
                const hasLowerCase = /[a-z]/.test(user_pwd);
                const hasNumbers = /\d/.test(user_pwd);
                const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(user_pwd);
                const typesCount = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecial].filter(Boolean).length;
                if (typesCount < 3) {
                    this.errors.user_pwd = '비밀번호는 영문 대소문자, 숫자, 특수문자 중 세 가지 이상을 포함해야 합니다.';
                    this.$swal(this.errors.user_pwd);
                    return false;
                }
            }

             // 비밀번호 확인 유효성 검사
             if (this.user_pwd !== this.user_pwd2) {
                this.errors.user_pwd2 = '비밀번호가 일치하지 않습니다.';
                this.$swal(this.errors.user_pwd2);
                return false;
            }

            // 이름 유효성 검사
            if (!this.user_name) {
                this.errors.user_name = '이름을 입력해 주세요.';
                this.$swal(this.errors.user_name);
                return false;
            }

            // 전화번호 유효성 검사
            if (!this.number2 || !this.number3) {
                this.errors.phone = '휴대전화번호를 입력해 주세요.';
                this.$swal(this.errors.phone);
                return false;
            }

            // 성별 유효성 검사
            if (!this.gender) {
                this.errors.gender = '성별을 선택해 주세요.';
                this.$swal(this.errors.gender);
                return false;
            }

            // 생년월일 유효성 검사
            if (!this.user_age) {
                this.errors.user_age = '생년월일을 입력해 주세요.';
                this.$swal(this.errors.user_age);
                return false;
            }

            return true;

        },  
        async id_check(){
            if(this.user_id.length < 6 || this.user_id.length > 20){
                this.$swal("아이디는 6~20자 사이여야 합니다.");
                return;
            }
            const user_id = this.user_id;

            try{
                const response = await axios.post('http://localhost:3000/auth/id_check', {user_id});

                if(response.data.exists){
                    this.$swal('이미 존재하는 아이디입니다.');
                } else {
                    this.$swal('사용 가능한 아이디입니다.');
                }
            } catch(error){
                console.error('아이디 확인 중 오류가 발생했습니다.', error);
                this.$swal('아이디 확인 중 오류가 발생했습니다. 다시 시도해주세요.');
            }
        },
        pwd_check(){
            const pwd = this.user_pwd;
            const pwdcheck = this.user_pwd2;

            if(pwd !== pwdcheck){
                this.$swal('비밀번호가 일치하지 않습니다.');
                return;
            }

            if (pwd.length < 8 || pwd.length > 20) {
                this.$swal('비밀번호는 8~20자 사이여야 합니다.');
                return;
            }

            const hasUpperCase = /[A-Z]/.test(pwd);
            const hasLowerCase = /[a-z]/.test(pwd);
            const hasNumbers = /\d/.test(pwd);
            const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);

            const typesCount = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecial].filter(Boolean).length;

            if (typesCount < 3) {
                this.$swal('비밀번호는 영문 대소문자, 숫자, 특수문자 중 세 가지 이상을 포함해야 합니다.');
                return;
            }

            this.$swal('비밀번호가 일치합니다.');
        },
        async onsubmitForm(){
            if (!this.validateForm()) {
                return;
            }

            const data = {
                user_id: this.user_id,
                user_pwd: this.user_pwd,
                user_name: this.user_name,
                user_phone: `${this.number1}-${this.number2}-${this.number3}`,
                user_gender: this.gender,
                user_age: this.user_age,
            };
            console.log("data : ----> ", data);

            try{
                const response = await axios.post(`http://localhost:3000/auth/join`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
                });
                
                console.log("response.data : ---->", response.data);
                this.$swal('회원 가입을 축하드립니다.');
                this.$router.push({ path: '/login'});
            }catch(error){
                console.error('폼 제출 중 오류 발생', error);
            }
        },
        exit(){
            if (Object.values(this.$data).some(field => field)) {
                if (confirm("회원가입을 취소하시겠습니까?")) {
                    this.$router.push({ path: "/" });
                }
            } else {
                this.$router.push({ path: "/" });
            }
        }
    }
}
</script>
<style scoped>
.join{
    width: 100%;
    height: 100%;
    margin-top: 80px;
}
.join .join_wrap{
    width: 43%;
    min-width: 820px;
    height: 80%;
    /* box-shadow: 1px 1px 5px rgba(142, 142, 142, 0.5); */
    box-shadow: 1px 1px 5px rgba(240, 238, 218, 1);
    margin: 0 auto;
    border: 1px solid #ccc;
    border-radius: 10px;
}

/* title */
.join_wrap .join_title{
    width: 80%;
    padding-top: 70px;
    padding-bottom: 20px;
    margin: 0 auto;
}
.join_title .title{
    font-size: 30px;
    text-align: left;
    font-weight: bold;
}
.join_title .sub_tit{
    font-size: 18px;
    margin-top: 15px;
    text-align: left;
}

/* join_list */

.join_wrap .join_list{
    width: 100%;
    padding-bottom: 30px;
}
.user_id, .user_pwd, .user_name, .user_phone, .user_gender, .user_age{
    width: 80%;
    margin: 0 auto;
}

/* h3 title */
.id_title, .pwd_title, .name_title, .phone_title, .gender_title, .age_title{
    margin-top: 30px;
    border-bottom: 1px solid #ccc;
    text-align: left;
}
h3{
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: bold;
}
.id_input, .pwd_input, .name_input, .phone_input, .gender_input, .age_input{
    margin-top: 10px;
    height: 30px;
    text-align: left;
}

/* input */
#user_id, #user_pwd, #user_pwd2, #user_name{
    width: 500px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 10px;
}
.id_check, .pwd_check{
    width: 130px;
    height: 30px;
    font-size: 18px;
    border: 0px;
    background: #f0eeda;
    border-radius: 5px;
    margin-left: 10px;
    color: #2f2e2e;
    font-weight: blod;
}
/* phone */
#number1{
    width: 60px;
    height: 30px;
    border: 1px solid #ccc;
    font-size: 16px;
    text-align: right;
    border-radius: 5px;
    margin-right: 5px;
}
#number2, #number3{
    height: 30px;
    width: 100px;
    font-size: 16px;
    border: 1px solid #ccc;
    text-align: center;
    border-radius: 5px;
    margin-left: 5px;
    margin-right: 5px;
}
option{
    text-align: center
}

#age_name{
    width: 200px;
    height: 30px;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ccc;
}
#men, #women{
    margin-right: 10px;
}

.join_btn{
    text-align: center;
    margin: 20px;
}

#clear{
    width: 120px;
    height: 35px;
    font-size: 18px;
    margin: 0 20px;
    border-radius: 5px;
    cursor: pointer;
    border: 0;
    background-color:#f0eeda;
    color:black;
    border-radius: 5px;
    border: 1px solid #f0eeda;
}
#clear:hover{
    width: 120px;
    height: 35px;
    font-size: 18px;
    margin: 0 20px;
    border-radius: 5px;
    cursor: pointer;
    border: 0;
    background-color:#ffffff;
    color:#3fced3;
    border-radius: 5px;
    border: 1px solid;
    box-shadow: 1px 1px 5px rgba(97, 242, 255, 0.5);
}
#exit{
    width: 120px;
    height: 35px;
    font-size: 18px;
    margin: 0 20px;
    border-radius: 5px;
    cursor: pointer;
    border: 0;
    background-color: #d0d0d0;
    color: white;
}
#exit:hover{
    width: 120px;
    height: 35px;
    font-size: 18px;
    margin: 0 20px;
    border-radius: 5px;
    cursor: pointer;
    border: 0;
    background-color: #ff5151;
    color: rgb(0, 0, 0);
}
</style>