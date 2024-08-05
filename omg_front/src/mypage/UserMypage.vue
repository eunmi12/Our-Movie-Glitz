<template>
  <div class="container">
    <div class="title">회원정보 수정</div>
    <div class="update_box">
      <div class="namebox">
        <span class="namebox1">이름</span>
        <span class="namebox2">{{ user.user_name }}</span>
      </div>
      <div class="namebox">
        <span class="namebox1">아이디</span>
        <span class="namebox2">{{ user.user_id }}</span>
      </div>
      <div class="namebox">
        <span class="namebox1">비밀번호</span>
        <input type="password" v-model="newPassword" class="inputbox" placeholder="비밀번호">
      </div>
      <div class="namebox">
        <span class="namebox1">비밀번호 재확인</span>
        <input type="password" v-model="confirmPassword" class="inputbox" placeholder="비밀번호 재확인">
      </div>
      <div class="namebox">
        <span class="namebox1">생년월일</span>
        <span class="namebox2">{{ user.user_age }}</span>
      </div>
      <div class="namebox">
        <span class="namebox1">성별</span>
        <span class="namebox2">{{ user_gender }}</span>
      </div>
      <div class="namebox">
        <span class="namebox1">핸드폰번호</span>
        <span v-if="!isEditingPhone" class="namebox2">{{ user.user_phone }}</span>
        <input v-if="isEditingPhone" type="text" v-model="newPhone" class="inputbox" placeholder="번호를 입력하세요 <'-'포합>">
        <button @click="toggleEditPhone" class="edit-button">
          {{ isEditingPhone ? '저장' : '수정' }}
        </button>
      </div>
      <div class="poham">'-'포함,"저장버튼 꼭 눌러주세요"</div>
    </div>
    <div class="button">
      <button class="ok" @click="updateUserInfo">수정 완료</button>
      <button class="no" @click="gotomainpage">수정 취소</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {
        user_name: '',
        user_id: '',
        user_gender: '',
        user_phone: '',
        user_age: ''
      },
      newPassword: '',
      confirmPassword: '',
      newPhone: '',
      isEditingPhone: false
    };
  },
  computed: {
    users() {
      return this.$store.state.user;
    },
    user_gender() {
      const gender = {
        F: '여자',
        M: '남자'
      }
      return gender[this.user.user_gender];
    }
  },
  methods: {
    gotomainpage() {
      this.$router.push(`/mypagemain/${this.users.user_no}`);
    },
    async userinfo() {
      const user_no = this.$route.params.user_no;
      try {
        const response = await axios.post(`http://localhost:3000/user/mypage/${user_no}`);
        this.user = response.data[0];
        this.newPhone = this.user.user_phone; // 핸드폰 번호 초기화
      } catch (error) {
        console.error("마이페이지 에러 발생", error);
      }
    },
    toggleEditPhone() {
      if (this.isEditingPhone) {
        // 저장 버튼 클릭 시
        this.user.user_phone = this.newPhone;
        this.isEditingPhone = false;
      } else {
        // 수정 버튼 클릭 시
        this.newPhone = ''; // 핸드폰 번호 입력 필드 초기화
        this.isEditingPhone = true;
      }
    },
    async updateUserInfo() {
      if (this.newPassword !== this.confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }

      try {
        const response = await axios.post(`http://localhost:3000/user/update`, {
          user_no: this.users.user_no,
          user_pwd: this.newPassword,
          user_phone: this.user.user_phone // 수정된 핸드폰 번호 저장
        });

        if (response.data.success) {
          alert('회원정보가 성공적으로 수정되었습니다.');
          this.gotomainpage();
        }
      } catch (error) {
        console.error("회원정보 수정 에러 발생", error);
      }
    }
  },
  mounted() {
    this.userinfo();
  }
};
</script>

<style scoped>
/* 기존 스타일은 그대로 유지 */

.container {
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
  width: 100%;
  height: 15%;
  padding-bottom: 10px;
  display: flex;
  align-items: end;
  border-bottom: 3px solid #f0eeda;
  justify-content: center;
  color: #1d1d1d;
  font-size: 25px;
  font-weight: bold;
}

.update_box {
  width: 80%;
  margin: 30px auto;
  padding: 20px;
  border: 1px solid #f0eeda;
  font-size: 18px;
  border-radius: 15px;
  background-color: #fafafa;
}

.namebox {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.namebox1 {
  flex: 1;
  text-align: center;
  background-color: #f0eeda;
  border-radius: 10px;
  padding: 10px;
  margin-right: 10px;
  font-weight: bold;
}

.namebox2 {
  flex: 2;
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
  border: 1px solid #f0eeda;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.inputbox {
  flex: 2;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #f0eeda;
  background-color: #fff;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.button {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.ok, .no {
  padding: 15px 30px;
  border-radius: 10px;
  border: none;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.ok {
  background-color: #4CAF50;
  color: white;
}

.ok:hover {
  background-color: #45a049;
}

.no {
  background-color: rgb(218, 106, 106);
  color: white;
  margin-left: 20px;
}

.no:hover {
  background-color: rgb(200, 90, 90);
}

/* 수정 버튼 스타일 추가 */
.edit-button {
  margin-left: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.edit-button:hover {
  background-color: #0056b3;
}
.poham {
  text-align: center;
}
</style>
