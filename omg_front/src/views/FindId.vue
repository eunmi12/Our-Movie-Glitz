<template>
    <div v-if="isOpen"  class="popup">
        <div class="popup-content">
                <form action="">
                    <div class="form-group">
                        <button type="button" class="right-button2" @click="switchToPasswordModal" >비밀번호 찾기</button>
                        <button type="button" class="left-button2"  >아이디 찾기</button>
                    </div>
                </form>
            <h2>아이디 찾기</h2>
            <form @submit.prevent="checkEmail">
    
                <div class="form-group">
                    <label for="username">이름</label>
                    <input type="text" id="username" v-model="user_name" name="user_name" placeholder="이름" required>
                </div>
                <div class="form-group">
                    <label for="user_tel">전화번호</label>
                    <select name="number1" v-model="number1" id="number1">
                                <option style="text-align: center;" value="010">010</option>
                                <option style="text-align: center;" value="011">011</option>
                                <option style="text-align: center;" value="012">012</option>
                            </select>
                            <span> - </span>
                            <input type="text" name="number2" v-model="number2" maxlength="4" id="number2">
                            <span> - </span>
                            <input type="text" name="number3" v-model="number3" maxlength="4" id="number3">
                    <button type="button" @click="checkEmail">아이디 찾기</button>
                </div>
                <div>
                    <p v-if="user_id " style="text-align: center; height: 80px; line-height: 80px;">{{ user_id }}</p>
                    <p v-else-if="error" style="text-align: center; height: 80px; line-height: 80px;">{{ error }}</p>
                    <!-- <p v-if="error " style="text-align: center; height: 80px; line-height: 80px;">{{ error }}</p>
                    <p v-else-if="user_email" style="text-align: center; height: 80px; line-height: 80px;">{{ user_email }}</p>
                    <p v-else-if="tr_email" style="text-align: center; height: 80px; line-height: 80px;">{{ tr_email }}</p> -->
                </div>
                <div>
                    <button class="close"  @click="goToLogin">로그인</button>
                </div>
                <div>
                    <button class="close" @click="closeModal">취소</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    props: {
        isOpen: {
        type: Boolean,
        required: true,
        },
    },
    data() {
        return {
            user_name: '',
            number1: '010',
            number2: '',
            number3: '',
            user_id: '',
            error: ''
        };
    },
    methods: {
        switchToPasswordModal() {
            this.$emit('switch', 'findPassword');
        },
        async checkEmail(){
            // 이름 및 핸드폰번호로 이메일 찾기
            
            const data = {
                user_name : this.user_name,
                user_phone : `${this.number1}-${this.number2}-${this.number3}`
            };
            
            console.log(data);

            try{
                const response = await axios.post(`http://localhost:3000/auth/findId`, data, {
                    headers: {
                    'Content-Type': 'application/json'
                }
                });
                console.log("response.data",response.data);
               // 응답 데이터가 기대한 형태인지 확인
                
                if (response.data && response.data.user_id) {
                    this.user_id = response.data.user_id;
                    this.error = ''; // 성공 시 에러 메시지 초기화
                } else {
                    throw new Error("일치하는 사용자가 없습니다.");
                }
               
                   
                
            } catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    this.error = error.response.data.message;
                } else {
                    this.error = error.message || "일치하는 사용자가 없습니다.";
                }

                this.user_id = ''; // 에러 발생 시 이메일 초기화
                console.error("Error message:", this.error);
            }
        },
        goToLogin(){
            // 로그인
            this.$store.dispatch('updateUserEmail', this.user_id);
            this.resetForm();
            this.$emit('close');
            this.$router.push({ path: '/login' });
        },
        closeModal() {
            // 모달 닫기 및 폼 초기화
            this.resetForm();
            this.$emit('close');
        },
        resetForm() {
            // 폼 초기화
            this.user_name = '';
            this.number1 = '010';
            this.number2 = '';
            this.number3 = '';
            this.user_id = '';
            this.error = '';
        }
    }
}
</script>
<style scoped>
/* 전반적인 페이지 스타일 */

.popup {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 500px;
}
#number1{
    width: 80px;
    height: 40px;
    font-size: 16px;
    text-align: center;
    border-radius: 5px;
}
#number2, #number3{
    height: 40px;
    width: 80px;
    font-size: 16px;
}



.close {
    /* position: absolute;
    left: 50%; */
    /* transform: translateX(-50%); */
    width: 460px;
    height: 40px;
    bottom: 10px; /* 하단에 배치 */
    font-size: 16px;
    cursor: pointer;
    color: #202627; /* 색상 변경 */
    border: none;
    border-radius: 5px;
    margin-top: 10px;
    /* color: white; */
    background-color: #fdfbe7;
    box-shadow: 2px 2px 5px rgba(183, 183, 183, 0.5);

}

.close:hover,
.close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
}

.popup h2 {
    text-align: center;
    margin-bottom: 20px;
}
.popbox {
    width: 100%;

}

.form-group {
    margin-bottom: 20px;
    overflow: hidden; /* 내부 요소의 오버플로우를 숨김 */
}
.form_right{
    
    text-align: center;
    font-size: 16px;
    height: 40px;
}
.form_right input[type="radio"] {
    width: 15px; /* 라디오 버튼의 가로 크기 */
    height: 15px; /* 라디오 버튼의 세로 크기 */
    border-radius: 50%; /* 원형 모양으로 설정 */
    border: 2px solid #007bff; /* 테두리 스타일 및 색상 설정 */
    outline: none; /* 포커스 상태에서의 외곽선 제거 */
    cursor: pointer; /* 마우스 커서 모양 설정 */
    margin-right: 3px; /* 라디오 버튼 사이의 간격 설정 */
}

.form-group label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
    float: left; /* 왼쪽 정렬 */
    width: 300%; /* 레이블 너비 설정 */
    margin-top: 5px; /* 위 여백 설정 */
}

.form-group input[type="number"] {
    width: 200px; /* 입력 필드 너비 설정 */
    margin-top: 10px; /* 위 여백 설정 */
    margin-right: 15px; /* 우측 여백 설정 */
    padding: 10px; /* 안쪽 여백 설정 */
    border: 1px solid #ccc; /* 테두리 설정 */
    border-radius: 4px; /* 테두리 반경 설정 */
    box-sizing: border-box; /* 요소의 전체 너비에 패딩 및 테두리를 포함하도록 설정 */
    font-size: 16px; /* 폰트 크기 설정 */
    float: center; /* 왼쪽 정렬 */
}

.form-group input[type="text"],
.form-group input[type="email"] {
    width: 450px; /* 입력 필드 너비 설정 */
    height: 50px;
    margin-top: 10px; /* 위 여백 설정 */
    padding: 10px; /* 안쪽 여백 설정 */
    border: 1px solid #ccc; /* 테두리 설정 */
    border-radius: 4px; /* 테두리 반경 설정 */
    /* box-sizing: border-box; 요소의 전체 너비에 패딩 및 테두리를 포함하도록 설정 */
    font-size: 16px; /* 폰트 크기 설정 */
    /* float: left; 왼쪽 정렬 */
}

.form-group input[type="passview"] {
    width: 100%; /* 입력 필드 너비 설정 */
    margin-top: 70px; /* 위 여백 설정 */
    text-align: center;
    padding: 10px; /* 안쪽 여백 설정 */
    border: 1px solid #ffffff; /* 테두리 설정 */
    border-radius: 4px; /* 테두리 반경 설정 */
    box-sizing: border-box; /* 요소의 전체 너비에 패딩 및 테두리를 포함하도록 설정 */
    font-size: 30px; /* 폰트 크기 설정 */
    
}

.form-group button {
    background-color: #fdfbe7;
    /* color: #fff; */
    border: none;
    padding: 15px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 4px;
    float: right; /* 우측 정렬 */
    margin-top: 10px; /* 위 여백 설정 */
    width: 150px; /* 너비 설정 */
    height: 40px;
    line-height: 15px;
}
.form-group button[type="click"] {
    background-color: #fff9b8; /* 배경색 설정 */
    color: #fff; /* 글자색 설정 */
    border: none; /* 테두리 없음 */
    padding: 12px 15px; /* 안쪽 여백 설정 */
    font-size: 14px; /* 폰트 크기 설정 */
    cursor: pointer; /* 마우스 커서 모양 설정 */
    border-radius: 4px; /* 테두리 반경 설정 */
    float:right; /* 우측 정렬 */
    margin-top: 70px; /* 위 여백 설정 */
    width: 100%;
}
.form-group button[type="submit"] {
    background-color: #2e2b2b29;
    color: rgba(0, 0, 0, 0.537);
    border: none;
    padding: 10px 20px;
    font-weight:100;
    font-size: 16px;
    cursor: pointer;
    border-radius: 4px;
    float: right;
    width: 30%; /* 버튼의 너비 설정 */
}
.form-group .left-button {
    float: left; /* 왼쪽 정렬 */
    width: 50%;
    background-color: #f9f193; /* 배경색 설정 */
    margin-top: 0%; /* 위 여백 설정 */
    text-decoration: none; /* 링크 기본 스타일 제거 */
    margin-right: -2px; /* 오른쪽 버튼과 겹치지 않도록 -2px 마진 추가 */
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
}

.form-group .right-button {
    float: right; /* 우측 정렬 */
    width: 50%;
    text-decoration: none; /* 링크 기본 스타일 제거 */
    background-color: #fdfbe7; /* 배경색 설정 */
    margin-top: 0%; /* 위 여백 설정 */
}
.form-group .left-button2 {
    float: left; /* 왼쪽 정렬 */
    width: 50%;
    background-color: #f9f193; /* 배경색 설정 */
    text-decoration: none; /* 링크 기본 스타일 제거 */
    margin-top: 0%; /* 위 여백 설정 */
    margin-right: -2px; /* 오른쪽 버튼과 겹치지 않도록 -2px 마진 추가 */
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
}

.form-group .right-button2 {
    float: right; /* 우측 정렬 */
    width: 50%;
    background-color: #fdfbe7; /* 배경색 설정 */
    margin-top: 0%; /* 위 여백 설정 */
    border-radius: 0 5px 5px 0;
}

.form-group button:hover {
    background-color: #8e8d7f;
}



</style>