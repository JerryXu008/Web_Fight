$(function () {





    /*公共底部处理*/
    $(".footer").load("./../common/footer.html", function () {
        // 当加载的内容被添加之后
        let sc = document.createElement("script");
        sc.src = "./../common/js/footer.js";
        document.body.appendChild(sc);
    });

    /*处理公共的内容区域*/

    // 创建内容区域的滚动
   let mainScroll = new IScroll(".main",{
      mouseWheel:false,
      scrollbars:false,
      probeType:3
   });
  let topHeight = $(".main-top").height()
  let navHeight = $(".header").height()
  let staticOffsetY = topHeight - navHeight;
  mainScroll.on("scroll",function(){
     if(Math.abs(this.y) >= staticOffsetY){
       $(".main-bottom").css({
         position:"fixed",
         left:"0",
         top:Math.abs(this.y) + navHeight
       });
       //底部内容滚动的偏移位 = 当前滚动出去的距离 - 底部固定的距离
       let subContentOffsetY = Math.abs(this.y) - staticOffsetY
      // console.log(subContentOffsetY);
        $(".bottom-content").css({transform:`translateY(${-subContentOffsetY}px)`})


     }
     else if(this.y>=0){
         console.log(">>>>>>>>>>>>>" + this.y);
        $(".bottom-content").css({transform:`translateY(${0}px)`})
  $(".main-bottom").css({
    position:"static",

  });
     }
  else {
    console.log("其他操作");
  }

    if(this.y>0){
     let scale = ($(".main").height()+this.y) / $(".main").height();
      scale = scale * 100;
      $(".main-bg>img").css({width:`${scale}%`});

    }
    else {
      $(".main-bg>img").css({width:'100%'});
    }


});
});
