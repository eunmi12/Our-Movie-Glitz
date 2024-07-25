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
                        </div>
                        <div class="user_pwd">
                            <div class="pwd_title">
                                <h3>비밀번호</h3>
                            </div>
                            <div class="pwd_input">
                                <input type="password" id="user_pwd" v-model="user_pwd" minlength="8" maxlength="20" placeholder="비밀번호 입력(문자, 숫자, 특수문자 포함 8~20자)">
                            </div>
                        </div>
                        <div class="user_pwd">
                            <div class="pwd_title">
                                <h3>비밀번호 확인</h3>
                            </div>
                            <div class="pwd_input">
                                <input type="password" id="user_pwd2" v-model="user_pwd2" minlength="8" maxlength="20"  placeholder="비밀번호 재입력">
                                <button class="pwd_check" type="button" @click="pwd_check">중복 확인</button>
                            </div>
                        </div>
                        <div class="user_name">
                            <div class="name_title">
                                <h3>이름</h3>
                            </div>
                            <div class="name_input">
                                <input type="text" id="user_name" v-model="user_name" placeholder="이름">
                            </div>
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
                        </div>
                        <div class="user_age">
                            <div class="age_title">
                                <h3>생년월일</h3>
                            </div>
                            <div class="age_input">
                                <input type="date" v-model="user_age" id="age_name">
                            </div>
                        </div>
                    </div>
                <div class="join_btn">
                    <button type="submit" name="clear" id="clear">회원가입</button>
                    <button type="button" name="exit" id="exit" >취소</button>
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

        };
    },
    methods: {
        id_check(){
           
        },
        pwd_check(){

        },
        async onsubmitForm(){

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
                const response = await axios.post(`http://localhost:3000/auth/join`, data, );

                console.log("response.data : ---->", response.data);
            }catch(error){
                console.error('폼 제출 중 오류 발생', error);
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