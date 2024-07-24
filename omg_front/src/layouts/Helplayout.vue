<template>
  <div>
  <div class="helpheader">
    <h1>&nbsp;&nbsp;고객센터</h1>
  </div>
  <div class="view">
    <div class="helpsidebar">
    <ul class="list">
        <li><a href="http://localhost:8081/help/faq">&bull;FAQ</a></li>
        <li><a href="http://localhost:8081/help/notice">&bull;공지사항</a></li>
        <li><a href="http://localhost:8081/help/qna">&bull;1:1문의</a></li>
    </ul>
    </div> 
  <div class="content">
    <router-view/>
  </div>
  </div>
  </div>
</template>

<script>
export default {

}
</script>

<style  scoped>

.helpheader {
    border-bottom:1px solid lightgray;
    width:80%;
    text-align:left;
    margin:auto;
    padding:80px 0px 30px 0px;
}

.helpsidebar {
    padding-top:50px;
    margin-left:180px;
    flex: 1;
}

.list {
    text-align:left;
    font-size:25px;
    line-height:200%;
}

li {
    width:150px;
}

li:hover {
    background-color:lightgray;
}

.view {
  display: flex;
  width: 40%;
}

.content {
  flex: 1;
}

</style>