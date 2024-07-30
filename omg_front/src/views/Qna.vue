<template>
    <div class="qna">
        <h6>1:1문의</h6>
        <br>
        <br>
        <div class="qna-cont">
                <div class="qna-title">
                    <div class="qna-type">
                        <button class="dropdown-toggle" type="button" @click="toggletype">문의유형</button>
                        <ul class="dropdown-menu" :class="{ show: isDropdownOpen }">
                            <li>
                            <a class="dropdown-item" href="#" @click.prevent="sortList(0)">예매</a>
                            </li>
                            <li>
                            <a class="dropdown-item" href="#" @click.prevent="sortList(1)">이벤트</a>
                            </li>
                            <li>
                            <a class="dropdown-item" href="#" @click.prevent="sortList(2)">멤버십</a>
                            </li>
                        </ul>
                    </div>
                    <input class="title-value" type="text" v-model="qna_title" placeholder="제목을 입력해 주세요.">
                </div>
                    <div class="qna-comt">
                        <input class="comt-value" type="text" v-model="qna_comment" placeholder="내용을 입력해 주세요.">
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
            qna_title:"",
            qna_comment:"",   
        }
    },
    computed: {
        user(){
                return this.$store.state.user;
            }
    },
    methods:{
        async regist(){
            try{
                if(!this.qna_title){
                    this.$swal('제목을 입력하세요.');
                    return;
                } else if(!this.qna_comment){
                    this.$swal('내용을 입력하세요.');
                    return;
                }
                const response = await axios.post(`http://localhost:3000/admin/registqna`,
                    {
                        qna_title:this.qna_title,
                        qna_comment:this.qna_comment
                    });
                const data = response.data;
                console.log("DATA : ",data);
                this.$swal('문의 내용이 등록되었습니다.');
                this.$router.push(`/`);
            }
            catch(error){
                console.error("1:1문의 작성중 오류 발생");
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
    /* width: 90%; */
    display: flex;
    padding: 20px 30px 15px 30px;
    border-bottom: 1px solid lightgray;
}

.qna-type {
    flex: 0.1;
    margin-right: 10px;
}

.dropdown-toggle {
    width: 90px;
    height: 35px;
    border-radius: 5px;
    background-color: ivory;
}

.title-value {
    flex: 4;
    border-radius: 5px;
    border: 1px solid lightgray;
    height: 35px;
    padding: 10px;
}

.qna-comt {
    padding-top: 4%;
    padding-bottom: 40px;
}

.comt-value {
    border: none;
    margin-left: 30px;
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