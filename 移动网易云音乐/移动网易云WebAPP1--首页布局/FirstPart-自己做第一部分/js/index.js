$(function () {
    /*公共头部处理*/
    $(".header-center-box>input").focus(function () {

        $(".header").addClass("active");
    });

  $(".header-cancle").click(function () {
    $(".header").removeClass("active");
  });

  $(".header-switch>span").click(function () {
    $(this).addClass("active").siblings().removeClass("active");
    $(".header-switch>i").animate({left: this.offsetLeft}, 100);
  });

  /*公共底部处理*/
  let pageArray = ["home", "video", "me", "friend", "account"];
  $(".footer>ul>li").click(function () {
    // 切换底部图标
    $(this).addClass("active").siblings().removeClass("active");
    let url = $(this).find("img").attr("src");
    url = url.replace("normal", "selected");
    $(this).find("img").attr("src", url);
    $(this).siblings().find("img").forEach(function (oImg) {
      oImg.src = oImg.src.replace("selected", "normal");
    });
    // 切换头部样式
    let currentName = pageArray[$(this).index()];
    $(".header").removeClass().addClass("header "+ currentName);

  });

  /*处理公共的内容区域*/
  // 1.获取SVG路径的长度
  let length = $("#refreshLogo")[0].getTotalLength();
  // 2.默认先隐藏路径
  $("#refreshLogo").css({"stroke-dasharray": length});
  $("#refreshLogo").css({"stroke-dashoffset": length});

  // 3.创建IScroll
  let myScroll = new IScroll('.main', {
    mouseWheel: false,
    scrollbars: false,
    /*
     需要使用iscroll-probe.js才能生效probeType：
     1  滚动不繁忙的时候触发
     2  滚动时每隔一定时间触发
     3  每滚动一像素触发一次
     * */
    probeType: 3,
  });
  // 4.监听滚动
  let logoHeight = $(".pull-down").height();
  let isPullDown = false;
  let isRefresh = false;
  //let bottomHeight = $(".pull-up").height();
  //let maxOffsetY = myScroll.maxScrollY - bottomHeight;
//  let isPullUp = false;

  myScroll.on("scroll", function () {
    if(this.y >= logoHeight){
      if(((this.y - logoHeight) * 3) <= length){
        // console.log("开始执行SVG动画");
        $("#refreshLogo").css({"stroke-dashoffset": length - (this.y - logoHeight) * 3});
      }else{
        // console.log("已经画完了");
        this.minScrollY = 170;
        isPullDown = true;
      }
    }
    //else if(this.y <= maxOffsetY){
    //
    //  // console.log("能够看到上拉加载更多了");
    //  $(".pull-up>p>span").html("松手加载更多");
    //  this.maxScrollY = maxOffsetY;
    //  isPullUp = true;
    //}
  });
  myScroll.on("scrollEnd", function () {
    if(isPullDown && !isRefresh){
      isRefresh = true;
      // 去网络上刷新数据
      refreshDown();
    }
    //else if(isPullUp && !isRefresh){
    //  $(".pull-up>p>span").html("加载中...")
    //  isRefresh = true;
    //  // 去网络上刷新数据
    //  refreshUp();
    //}
  });
  function refreshDown() {
    setTimeout(function () {
      console.log("数据刷新完毕");
      isPullDown = false;
      isRefresh = false;
      myScroll.minScrollY = 0;
      myScroll.scrollTo(0, 0);
      $("#refreshLogo").css({"stroke-dashoffset": length});
    }, 3000);
  }
  //function refreshUp() {
  //  setTimeout(function () {
  //    console.log("数据刷新完毕");
  //    isPullUp = false;
  //    isRefresh = false;
  //    myScroll.maxScrollY = maxOffsetY + bottomHeight;
  //    myScroll.scrollTo(0, myScroll.maxScrollY);
  //  }, 3000);
  //}







  HomeApis.getHomeBanner()
    .then(function (data) {

      let html = template('bannerSlide', data);

      $(".swiper-wrapper").html(html);
      new Swiper ('.swiper-container',{
        autoplay: {
          delay: 1000,
          disableOnInteraction: false,
        },
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          bulletClass: 'my-bullet',
          bulletActiveClass: 'my-bullet-active',
        },
        // 如果内容是从服务器获取的, 请加上这三个配置
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      });


      myScroll.refresh();
    })
    .catch(function (err) {
      console.log(err);
    });
  /*创建首页导航*/
  $(".nav i").html(new Date().getDate());

  /*创建首页分区*/
  HomeApis.getHomeRecommend()
    .then(function (data) {
      data.title = "推荐歌单";
      data.subTitle = "歌单广场";
      data.result.forEach(function (obj) {
        obj.width=216/100;
        obj.playCount = formartNum(obj.playCount);
      });
      let html = template('category', data);
      $(".recommend").html(html);
      $(".recommend .category-title").forEach(function (ele) {
        $clamp(ele, {clamp: 2});
      });
      myScroll.refresh();
    })
    .catch(function (err) {
      console.log(err);
    });

  HomeApis.getHomeExclusive()
    .then(function (data) {
      data.title = "独家放送";
      data.subTitle = "网易出品";
      data.result.forEach(function (obj, index) {
        obj.width=334/100;
        if(index === 2){
          obj.width = 690/100;
        }
      });
      let html = template('category', data);
      $(".exclusive").html(html);
      $(".exclusive .category-title").forEach(function (ele) {
        $clamp(ele, {clamp: 2});
      });
      myScroll.refresh();
    })
    .catch(function (err) {
      console.log(err);
    });

  HomeApis.getHomeAlbum()
    .then(function (data) {
      data.title = "新碟新歌";
      data.subTitle = "更多新碟";
      data.result = data["albums"];
      data.result.forEach(function (obj) {
        obj.artistName = obj.artist.name;
        obj.width=216/100;
      });
      let html = template('category', data);
      $(".album").html(html);
      $(".album .category-title").forEach(function (ele) {
        $clamp(ele, {clamp: 1});
      });
      $(".album .category-singer").forEach(function (ele) {
        $clamp(ele, {clamp: 1});
      });
      myScroll.refresh();
    })
    .catch(function (err) {
      console.log(err);
    });

  HomeApis.getHomeMV()
    .then(function (data) {
      data.title = "推荐MV";
      data.subTitle = "更多MV";
      data.result.forEach(function (obj, index) {
        obj.width=334/100;
      });
      let html = template('category', data);
      $(".mv").html(html);
      $(".mv .category-title").forEach(function (ele) {
        $clamp(ele, {clamp: 1});
      });
      $(".mv .category-singer").forEach(function (ele) {
        $clamp(ele, {clamp: 1});
      });
      myScroll.refresh();
    })
    .catch(function (err) {
      console.log(err);
    });

  HomeApis.getHomeDJ()
    .then(function (data) {
      data.title = "主播电台";
      data.subTitle = "更多主播";
      data.result.forEach(function (obj, index) {
        obj.width=216/100;
      });
      let html = template('category', data);
      $(".dj").html(html);
      $(".dj .category-title").forEach(function (ele) {
        $clamp(ele, {clamp: 2});
      });
      myScroll.refresh();
    })
    .catch(function (err) {
      console.log(err);
    });
  function formartNum(num) {
    let res = 0;
    if(num / 100000000 > 1){
      let temp = num / 100000000 + "";
      if(temp.indexOf(".") === -1){
        res = num / 100000000 + "亿";
      }else{
        res = (num / 100000000).toFixed(1) + "亿";
      }
    }else if(num / 10000 > 1){
      let temp = num / 10000 + "";
      if(temp.indexOf(".") === -1){
        res = num / 10000 + "万";
      }else{
        res = (num / 10000).toFixed(1) + "万";
      }
    }else{
      res = num;
    }
    return res;
  }

  /*
   注意点:
   虽然我们是加载完数据才去刷新的, 但是数据中有图片, 并且高度依赖于图片, 所以哪怕是加载完数据才去刷新计算出来的高度也不对
   所以在企业开发中如果想拿到正确的滚动范围, 必须等到图片也加载完成再去刷新或者直接将高度写死
   * */

   setTimeout(function () {
   console.log(myScroll.maxScrollY);
   myScroll.refresh();
   console.log(myScroll.maxScrollY);
   }, 5000);




  ///*创建推荐歌单*/
  //HomeApis.getHomeRecommend()
  //  .then(function (data) {
  //    // console.log(data);
  //    let html = template('recommendItem', data);
  //    $(".recommend-bottom").html(html);
  //    $(".recommend-title").forEach(function (ele) {
  //      $clamp(ele, {clamp: 2});
  //    });
  //    myScroll.refresh();
  //  })
  //  .catch(function (err) {
  //    console.log(err);
  //  });
  //
  ///*创建独家放送*/
  //HomeApis.getHomeExclusive()
  //  .then(function (data) {
  //    let html = template('exclusiveItem', data);
  //    $(".exclusive-bottom").html(html);
  //    $(".exclusive-title").forEach(function (ele) {
  //      $clamp(ele, {clamp: 2});
  //    });
  //    myScroll.refresh();
  //  })
  //  .catch(function (err) {
  //    console.log(err);
  //  });
  //
  ///*创建新碟新歌区域*/
  //HomeApis.getHomeAlbum()
  //  .then(function (data) {
  //    let html = template('albumItem', data);
  //    $(".album-bottom").html(html);
  //    $(".album-title").forEach(function (ele) {
  //      $clamp(ele, {clamp: 1});
  //    });
  //    myScroll.refresh();
  //  })
  //  .catch(function (err) {
  //    console.log(err);
  //  });
  //
  ///*创建推荐MV区域*/
  //HomeApis.getHomeMV()
  //  .then(function (data) {
  //    let html = template('mvItem', data);
  //    $(".mv-bottom").html(html);
  //    $(".mv-title").forEach(function (ele) {
  //      $clamp(ele, {clamp: 1});
  //    });
  //    myScroll.refresh();
  //  })
  //  .catch(function (err) {
  //    console.log(err);
  //  });
  //
  ///*创建主播电台区域*/
  //HomeApis.getHomeDJ()
  //  .then(function (data) {
  //    let html = template('djItem', data);
  //    $(".dj-bottom").html(html);
  //    $(".dj-title").forEach(function (ele) {
  //      $clamp(ele, {clamp: 1});
  //    });
  //    myScroll.refresh();
  //  })
  //  .catch(function (err) {
  //    console.log(err);
  //  });


});
