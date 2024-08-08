<template>
    <div class="review">
        <h6>관람평</h6>
        <br><br>
        <div class="review-cont">
            <div class="review-title">
                <div class="review-type">
                    <button class="dropdown-toggle" type="button" @click="toggleType">{{ selectedTypeText }}</button>
                    <ul class="dropdown-menu" :class="{ show: isDropdownOpen }">
                        <li v-for="(type, i) in typelist" :key="i">
                            <a class="dropdown-item" href="#" @click.prevent="selectType(i)">{{ type }}점</a>
                        </li>
                    </ul>
                </div>
                <div class="title-value">
                        <div>{{ movie.movie_title }}</div>
                </div>
            </div>
            <div class="review-comt">
                <textarea class="comt-value" type="text" v-model="review_comment" placeholder="내용을 입력해 주세요."></textarea>
            </div>
            <div class="review-btn">
                <button class="regist" @click="registt()">등록</button>
                <button class="cancel" @click="cancel()">취소</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            isDropdownOpen: false,
            typelist: [5,4,3,2,1],
            selectedType: null,
            review_comment: "",
            movie: {
                movie_title: '',
                movie_no: ''
            },
        };
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
        re_user_no() {
            return this.user ? this.user.user_no : null;
        },
        selectedTypeText() {
            return this.selectedType !== null ? `${this.typelist[this.selectedType]}점` : '평점';
        }
    },
    methods: {
        toggleType() {
            this.isDropdownOpen = !this.isDropdownOpen;
        },
        selectType(index) { // selectType 메서드 정의
            this.selectedType = index;
            this.isDropdownOpen = false; // 드롭다운 메뉴를 닫습니다.
        },
        async movietitle() {
            const user_no = this.re_user_no; // 수정된 부분
            try {
                const response = await axios.post(`http://localhost:3000/user/reviewtitle`, { user_no });
                this.movie.movie_title = response.data[0].movie_title; // 수정된 부분
                this.movie.movie_no = response.data[0].movie_no; // 수정된 부분

            } catch (error) {
                console.error("영화제목 불러오기 에러 발생", error);
            }
        },
        async registt() {

            console.log("review_user_no:", this.re_user_no);
            console.log("review_movie_no:", this.movie.movie_no);
            try {
                if (!this.review_comment) {
                    this.$swal('내용을 입력하세요.');
                    return;
                } else if (this.selectedType === null) {
                    this.$swal('평점이 없습니다.');
                    return;
                }

                const response = await axios.post(`http://localhost:3000/user/crereview`, {
                    review_rate: this.typelist[this.selectedType],
                    review_comment: this.review_comment,
                    movie_no: this.movie.movie_no, // 수정된 부분
                    user_no: this.re_user_no // 수정된 부분
                });

                const data = response.data;
                console.log("DATA : ", data);
                this.$swal('리뷰 내용이 등록되었습니다.');
                this.$router.push(`/mypagemain/${this.re_user_no}`);
            } catch (error) {
                console.error("리뷰 등록 중 오류 발생", error);
            }
        },
        cancel() {
            this.$router.push(`/mypagemain/${this.user.user_no}`);
        },
    },
    mounted() {
        this.movietitle();
    }
}
</script>

<style scoped>
/* 스타일은 기존과 동일 */
h6 {
  text-align: center;
  font-weight: bold;
  border-bottom: 1px solid lightgray;
  padding-bottom: 15px;
  width: 95%;
  margin: auto;
}

.review-cont {
    margin: auto;
    width: 80%;
    border: 1px solid lightgray;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.review-title {
    margin: auto;
    display: flex;
    padding: 20px 30px 15px 30px;
    border-bottom: 1px solid lightgray;
}

.review-type {
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
    height: 35px;
    padding: 10px;
    box-sizing: border-box;
    margin-left: 630px;
}

.review-comt {
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

.review-btn {
    margin: 15px;
    display: flex;
    justify-content: center;
}

.regist {
    border: 1px solid black;
    margin-right: 10px;
    border-radius: 5px;
    width: 50px;
    height: 30px;
    background-color: ivory;
}

.cancel {
    border: 1px solid black;
    margin-left: 10px;
    border-radius: 5px;
    width: 50px;
    height: 30px;
}
</style>
