<template>
    <div class="qna">
        <h6>1:1문의</h6>
        <br>
        <br>
        <div class="qna-cont">
                <div class="qna-title">
                    <div class="qna-type">
                        <button class="dropdown-toggle" type="button" @click="toggletype">{{ selectedTypeText }}</button>
                        <ul class="dropdown-menu" :class="{ show: isDropdownOpen }">
                            <li v-for="(type, i) in typelist" :key="i">
                                <a class="dropdown-item" href="#" @click.prevent="selectType(i)">{{ type }}</a>
                            </li>
                        </ul>
                    </div>
                    <input class="title-value" type="text" v-model="qna_title" placeholder="제목을 입력해 주세요.">
                </div>
                    <div class="qna-comt">
                        <textarea class="comt-value" type="text" v-model="qna_comment" placeholder="내용을 입력해 주세요."></textarea>
                    </div>
                <div class="qna-btn">
                    <button class="regist" @click="regist()">등록</button>
                    <button class="cancel" @click="cancel()">취소</button>
                </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return{
            isDropdownOpen: false,
            typelist: ['예매', '이벤트', '멤버십'],
            selectedType: null,
            qna_title: "",
            qna_comment: "",
            qna_type: null
        }
    },
    computed: {
        user(){
            return this.$store.state.user;
        },
        qna_user_no() {
            return this.user ? this.user.user_no : null;
        },
        selectedTypeText() {
            return this.selectedType !== null ? this.typelist[this.selectedType] : '문의유형';
        }
    },
    methods:{
        toggletype() {
            this.isDropdownOpen = !this.isDropdownOpen;
        },
        selectType(i) {
            this.selectedType = i;
            this.qna_type = i;
            console.log("Selected Type Index:", this.selectedType); // 디버깅
            console.log("qna_type:", this.qna_type); // 디버깅
            this.isDropdownOpen = false;
        },
        async regist(){
            console.log("qna_user_no:", this.qna_user_no); // 디버깅
            try{
                if(!this.qna_title){
                    this.$swal('제목을 입력하세요.');
                    return;
                } else if(!this.qna_comment){
                    this.$swal('내용을 입력하세요.');
                    return;
                } else if(this.qna_type === undefined || this.qna_type === null){
                    this.$swal('문의유형을 선택하세요.');
                    return;
                } else if (this.qna_user_no === null) {
                    this.$swal('사용자 정보가 없습니다.');
                    return;
                }
                const response = await axios.post(`http://localhost:3000/admin/registqna`,
                    {
                        qna_title:this.qna_title,
                        qna_comment:this.qna_comment,
                        qna_type:this.qna_type,
                        qna_user_no:this.qna_user_no
                    });
                const data = response.data;
                console.log("DATA : ",data);
                this.$swal('문의 내용이 등록되었습니다.');
                this.$router.push(`/`);
            }
            catch(error){
                console.error("1:1문의 등록 중 오류 발생");
            }
        },
        cancel(){
            this.$router.push(`/`);
        },
    }
}
</script>

<style scoped>

h6 {
  text-align: center;
  font-weight: bold;
  border-bottom: 1px solid lightgray;
  padding-bottom: 15px;
  width: 95%;
  margin: auto;
}

.qna-cont {
    margin: auto;
    width: 80%;
    border: 1px solid lightgray;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.qna-title {
    margin: auto;
    display: flex;
    padding: 20px 30px 15px 30px;
    border-bottom: 1px solid lightgray;
}

.qna-type {
    flex: 1;
    margin-right: 10px;
    position: relative;
}

.dropdown-toggle {
    display: inline-block;
    cursor: pointer;
    width: 90px;
    height: 35px;
    border-radius: 5px;
    background-color: ivory;
    box-sizing: border-box;
    padding: 0 10px;
    position: relative;
}

.dropdown-menu {
  display: none;
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  background-color: ivory;
  width: 90px;
  box-sizing: border-box;
  position: absolute;
  top: 100%;
  left: 0;
}

.dropdown-menu.show {
  display: block;
}

.dropdown-item {
  padding: 10px;
  cursor: pointer;
  text-align: left;
}

.dropdown-item:hover {
  background-color: lightgray;
}

.title-value {
    flex: 8;
    border-radius: 5px;
    border: 1px solid lightgray;
    height: 35px;
    padding: 10px;
    box-sizing: border-box;
}

.qna-comt {
    padding-top: 4%;
    padding-bottom: 40px;
    height: 400px;
}

.comt-value {
    border: none;
    margin-left: 30px;
    width: 90%;
    height: 360px;
    resize: none;
}

.comt-value:focus {
    outline: none;
}

.qna-btn {
    margin: 15px;
    display: flex;
    justify-content: center;
}

.regist {
    margin-right: 10px;
    border-radius: 5px;
    width: 50px;
    height: 30px;
    background-color: ivory;
}

.cancel {
    margin-left: 10px;
    border-radius: 5px;
    width: 50px;
    height: 30px;
}

</style>