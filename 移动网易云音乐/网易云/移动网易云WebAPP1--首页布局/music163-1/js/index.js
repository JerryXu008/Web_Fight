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
    let bottomHeight = $(".pull-up").height();
    let maxOffsetY = myScroll.maxScrollY - bottomHeight;
    let isPullUp = false;
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
        }else if(this.y <= maxOffsetY){
            // console.log("能够看到上拉加载更多了");
            $(".pull-up>p>span").html("松手加载更多");
            this.maxScrollY = maxOffsetY;
            isPullUp = true;
        }
    });
    myScroll.on("scrollEnd", function () {
        if(isPullDown && !isRefresh){
            isRefresh = true;
            // 去网络上刷新数据
            refreshDown();
        }
        else if(isPullUp && !isRefresh){
            $(".pull-up>p>span").html("加载中...")
            isRefresh = true;
            // 去网络上刷新数据
            refreshUp();
        }
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
    function refreshUp() {
        setTimeout(function () {
            console.log("数据刷新完毕");
            isPullUp = false;
            isRefresh = false;
            myScroll.maxScrollY = maxOffsetY + bottomHeight;
            myScroll.scrollTo(0, myScroll.maxScrollY);
        }, 3000);
    }




    /*创建首页的Banner*/
    let mySwiper = new Swiper ('.swiper-container',{
        autoplay: {
            delay: 1000
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




    HomeApis.getHomeBanner()
        .then(function (data) {
            let html = template('bannerSlide', data);
            $(".swiper-wrapper").html(html);
            myScroll.refresh();
        })
        .catch(function (err) {
            console.log(err);
        });

    /*创建首页导航*/
    $(".nav i").html(new Date().getDate());

    /*创建推荐歌单*/
    HomeApis.getHomeRecommend()
        .then(function (data) {
            // console.log(data);
            let html = template('recommendItem', data);
            $(".recommend-bottom").html(html);
            $(".recommend-title").forEach(function (ele) {
                $clamp(ele, {clamp: 2});
            });
            myScroll.refresh();
        })
        .catch(function (err) {
            console.log(err);
        });

    /*创建独家放送*/
    HomeApis.getHomeExclusive()
        .then(function (data) {
            let html = template('exclusiveItem', data);
            $(".exclusive-bottom").html(html);
            $(".exclusive-title").forEach(function (ele) {
                $clamp(ele, {clamp: 2});
            });
            myScroll.refresh();
        })
        .catch(function (err) {
            console.log(err);
        });

    /*创建新碟新歌区域*/
    HomeApis.getHomeAlbum()
        .then(function (data) {
            let html = template('albumItem', data);
            $(".album-bottom").html(html);
            $(".album-title").forEach(function (ele) {
                $clamp(ele, {clamp: 1});
            });
            myScroll.refresh();
        })
        .catch(function (err) {
            console.log(err);
        });

    /*创建推荐MV区域*/
    HomeApis.getHomeMV()
        .then(function (data) {
            let html = template('mvItem', data);
            $(".mv-bottom").html(html);
            $(".mv-title").forEach(function (ele) {
                $clamp(ele, {clamp: 1});
            });
            myScroll.refresh();
        })
        .catch(function (err) {
            console.log(err);
        });

    /*创建主播电台区域*/
    HomeApis.getHomeDJ()
        .then(function (data) {
            let html = template('djItem', data);
            $(".dj-bottom").html(html);
            $(".dj-title").forEach(function (ele) {
                $clamp(ele, {clamp: 1});
            });
            myScroll.refresh();
        })
        .catch(function (err) {
            console.log(err);
        });
});
