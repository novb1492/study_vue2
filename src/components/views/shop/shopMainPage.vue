<template>
    <div class="shopMainPage fade-in-box">
        <div class="d-flex flex-column flex-shrink-0 p-3 bg-light sidebar fade-in-box">
            <span class="fs-4" style="text-align: center;">Menu</span>
            <hr>
            <ul class="nav nav-pills flex-column mb-auto ">
                <li class="menuul"><a href="#coffee" @click="changeList('coffee')" ><span  class="menutext">Coffee</span></a></li>
                <li class="menuul"><a href="#cake" @click="changeList('cake')" ><span  class="menutext">Cake</span></a></li>
            </ul>
            <hr>
        </div>
        <div id="productArea">
            <ul v-for="product in this.products" :key="product" >
                <li class="itemArea"> 
                    <div>
                    <a href="#" @click="buyPopUp(product.id)"><img :src="product.imgPath"></a>
                    </div> 
                    <span>{{product.name}}</span>
                    <br>
                    <span >가격</span>: {{product.price}} 
                    <br>
                    <span>수량</span>:{{product.count}}
                </li>
            </ul>
        </div>
        <div id="pageArea">
            <input type="text" id="searchInput"   placeholder="상품 이름을 적어주세요">
            <input type="button" id="searchButton" @click="doSearch" class="btn btn-primary btn-sm" style="margin-left:10px" value="검색">
            <br>
            <div style="margin-top:10px">
                <input type="button" id="beforeButton" @click="changePage(-1)" class="btn btn-primary btn-sm" value="이전">
                <span class="showPage">{{page}}</span>/ <span class="showPage">{{totalPage}}</span>
                <input type="button" id="nextButton" @click="changePage(1)" class="btn btn-primary btn-sm" value="다음">
            </div>
        </div>
    </div>
</template>
<style>
.showPage{margin-left: 10px; margin-right: 10px;}
#pageArea{position: absolute; top: 90%; left: 20%;}
ul{padding-left: 0px; list-style: none;float: left;text-align: center;}
#productArea{position: absolute; top: 100px; left: 200px;}
img{width: 150px;height: 100px;}
.menuul{margin-top: 20px;}
.menutext{color: pink;}
.sidebar{position: absolute;width: 150px;height: 100%;}
</style>
<script>
import * as module from "../../jslib/jslib.js";
export default {
   name :'firstdoor',
   data() {
       return {
           products:[],
           page:1,
           totalPage:1
       }
   },
   methods: {
       changeList(kind){
            this.getProduct(kind,1,"");
            history.pushState(null, null, "/shopMainPage?kind="+kind+"&keyword=&page="+1);
       },
       doSearch(){
            var kind=module.getParam('kind');
            var keyword=document.getElementById('searchInput').value;
            this.getProduct(kind,1,keyword);
            history.pushState(null, null, "/shopMainPage?kind="+kind+"&keyword="+keyword+"&page="+1);
       },
        changePage(num){
            var kind=module.getParam('kind');
            var keyword=module.getParam('keyword');
            var page=module.getParam('page');
            page=(page*1);
            this.getProduct(kind,(page+num),keyword);
            history.pushState(null, null, "/shopMainPage?kind="+kind+"&keyword="+keyword+"&page="+(page+num));
        },
        getProduct(kind,page,keyword){
          module.requestGetToServer('http://localhost:8080/product/select?kind='+kind+'&page='+page+'&keyword='+keyword).then(result=>{
              console.log(result);
              if(!result.flag){
                  alert(result.message);
              }
              if(module.checkEmthy(result.products)){
                  this.totalPage=1;
              }else{
                  this.totalPage=result.totalPage;
              }
              this.products=result.products;
              this.page=page;
              if(page>1){
                module.doOoNotDisabled('beforeButton',false);
              }else{
                module.doOoNotDisabled('beforeButton',true);
              }
              if(page==this.totalPage){
                   module.doOoNotDisabled('nextButton',true);
              }else{
                  module.doOoNotDisabled('nextButton',false);
              }
          });
      },
      buyPopUp(id){
        alert(id);
      }
   },
   created() {
        var kind=module.getParam('kind');
        var keyword=module.getParam('keyword');
        var page=module.getParam('page');
        console.log(kind);
        this.getProduct(kind,page,keyword);
   },
   
}
</script>