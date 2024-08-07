<template>
    <div class="event">
        <div class="event_wrap">
            <div class="event_title">
                <h1 class="title"> 이 벤 트 등 록 </h1>
            </div>
        <form>
            <div class="event_content">
                <div class="event_list_right">
                    <div class="event_detail">
                        <div class="event_detail_title">
                           <div class="title_wrap"><span>이벤트 제목:</span></div>
                           <input class="title_text" type="text" v-model="event_title">
                        </div>
                    </div>
                    
                    <div class="event_detail">
                        <div class="event_detail_title">
                            <div class="date_wrap"><span>이벤트 시작 날짜:</span></div>
                                <input type="date" id="event_startdate" v-model="event_startdate">
                                <div class="date_wrap"><span>이벤트 종료 날짜:</span></div>
                                <input type="date" id="event_enddate" v-model="event_enddate">          
                        </div>
                    </div>
                    <div class="event_img">
                        이벤트 이미지1 :
                        <input type="file" id="event_image" accept="image/*" @change="uploadFile($event.target.files, 0)">
                    </div>
                    <div class="event_img">
                        이벤트 이미지2 :
                        <input type="file" id="event_image" accept="image/*" @change="uploadFile($event.target.files, 1)">
                    </div>
                    <!-- <div class="event_detail">
                        <div class="comment_title"><span>상세 설명</span></div>
                        <textarea rows="8" id="event_comment"></textarea>
                    </div> -->
                </div>
            </div>
            <div class="button_wrap">
                <button type="button" class="insertbtn" @click="insertEvent">이벤트 등록</button>
                <button type="button" class="exit" @click="exit">취소</button>
            </div>
        </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {

    data() {
        return {
            event_title:'',
            event_startdate:'',
            event_enddate:'',

            event_img1:'',
            event_img2:'',
        };
    },

    methods:{
        async uploadFile(file, type){
            let name = "";

            if(file){
                name = file[0].name;
                console.log("name",name);
            } else{
                return;
            }

            const formData = new FormData(); //FormData가 키-값 쌍으로 multipart/form-data 형식 서버에 전송

            formData.append('img',file[0]);

            for(let key of formData.keys()){
                console.log(key,':',formData.get(key));
            }
            try{
                const res = await axios.post('http://localhost:3000/admin/upload_img', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                if(res.data.message === 'success'){
                    this.$swal('이미지 등록 성공');
                    if(type === 0){
                        this.event_img1 = name;
                        console.log('event_img1', this.event_img1);
                    } else if(type === 1){
                        this.event_img2 = name;
                        console.log('event_img2', this.event_img2);
                    }
                } else {
                    throw new Error('이미지 업로드 실패');
                }
            }catch(error){
                console.log('error',error);
                this.$swal('이미지 등록 실패');
            }

        },
        async insertEvent(){
            try{
                if(!this.event_title){
                    this.$swal('이벤트 제목을 작성해주세요.');
                    return;
                } else if(!this.event_startdate){
                    this.$swal('이벤트 시작일을 등록해주세요.');
                    return;
                } else if(!this.event_enddate){
                    this.$swal('이벤트 종료일 등록해주세요.');
                    return;
                } 
                const response = await axios.post(`http://localhost:3000/admin/createevent`,{
                    event_title : this.event_title,
                    event_startdate : this.event_startdate,
                    event_enddate : this.event_enddate,
                    event_img1 : this.event_img1,
                    event_img2 : this.event_img2
                });
                const data = response.data;
                console.log("data잘가나확인용",data);
                console.log('data.message======:',data.message);
                if(data.message === 'success'){
                    Swal.fire({
                        title:'이벤트이 등록 되었습니다.',
                        icon:'success',
                        confirmButtonText: '확인'
                    }).then(()=>{
                        this.$router.push(`/admin/eventlist`);
                    });
                }else{
                    this.$swal('이벤트 등록 실패함');
                }
            }
            catch(error){
                this.$swal('이벤트 등록에 실패했습니다.'); 
                console.error('이벤트 등록 실패',error);
            }
        },
        exit(){
            this.$router.push(`/admin/eventlist`);
        },
        //제대로 값 받는지 확인용
        submit() {
            alert('시작'+this.event_enddate+'종료'+this.event_startdate+'이미지1'+this.event_img1+'이미지2'+this.event_img2+'제목'+this.event_title);
            console.log("Selected event number:", this.event_event_no);
        },

    }
}
</script>

<style scoped>
*{
    color:#4b4b4b;
}
.event{
    width:100%;
    height: 100%;
    margin: 0 auto;
    margin-top: 100px;
}
.event_wrap{
    padding-bottom: 70px;
    padding-top:70px;
}
.event_img{
    margin-top:20px ;
}
.event .event_wrap{
    width: 70%;
    min-width: 1000px;
    height: 80%;
    margin:0 auto;
    border: 1px solid #ccc;
    border-radius: 10px 
}
.event_wrap .title{
    width:80%;
    /* padding-top: 70px; */
    margin: 0 auto;
    /* background-color: bisque; */
}
.event_wrap .event_content{
    display: flex;
}
.event_title .title{
    text-align: center;
    font-size:65px;
}
/*event_content*/ 
.event_detail_title{
    margin-top:50px ;
    font-size: 20px;
    padding-bottom: 5px;
}
.event_list_right {
  width: 100%;
  padding: 10px;
  padding-left:50px;
  padding-right:50px;
  padding-top: 20px;
}
.event_detail {
    font-size:20px;
    padding-bottom: 15px;
}
.title_wrap{
    width:160px;
    display: inline-block;
}
.title_text{
    width: 80%;
}

.searchbtn{
    margin-left: 10px;
    border:none;
    background-color: rgba(240, 238, 218, 1);
    width:60px;
    border-radius: 5px;
}
.date_wrap{
    width: 17%;
    display: inline-block;
}
#event_startdate{
    margin-right: 10px;
    width: 31%;
}
#event_enddate{
    width: 31%;
}
#event_image{
    width: 25%;
}
/*event_comment*/
.comment_title{
    border-top:1px solid #ccc;
    padding-top:15px;
}
.event_detail textarea{
    width:100%;
    resize: none;
}
/*button*/
.button_wrap{
    text-align: center;
    margin-top:35px;
}
.insertbtn{
    font-size: 28px;
    width:160px;
    padding: 5px;
    margin: 5px;
    background-color:#f0eeda;
    border-radius: 5px;
    border: 1px solid #f0eeda;
}
.insertbtn:hover{
    font-size: 28px;
    width:160px;
    padding: 5px;
    margin: 5px;
    background-color: #ffffff;
    color: #32851e;
    border-radius: 5px;
    border: 1px solid;
    box-shadow: 0 4px 8px rgba(23, 88, 42, 0.5);
}
.exit{
    font-size: 28px;
    width:130px;
    padding: 5px;
    margin: 5px;
    background-color:#e7e7e7;
    border-radius: 5px;
    border: 1px solid #f0eeda;
}
.exit:hover{
    font-size: 28px;
    width:130px;
    padding: 5px;
    margin: 5px;
    background-color:#ffffff;
    border-radius: 5px;
    color: #ff5252;
    border: 1px solid #f0eeda;
    box-shadow: 0 4px 8px rgba(199, 199, 199, 0.5);
}
</style>