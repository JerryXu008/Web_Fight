$(function () {
    // 获取传递过来的歌曲
    let songArray = getSongs();
    let index = 0; // 定义变量记录当前歌曲的索引
    let ids = [];
    songArray.forEach(function (obj) {
        ids.push(obj.id);
    });

    /*公共头部处理*/
    $(".go-back").click(function () {
        window.history.back();
    });

    /*公共底部处理*/
    $(".footer-bottom .list").click(function () {
        // 初始化歌曲里列表头部
        $(".modal-top>p>span").html(`列表循环(${songArray.length})`);
        $(".modal-top .clear-all").click(function () {
            clearSongs();
            window.location.href = "./../home/index.html";
        });

        // 初始化歌曲列表数据
        if($(".modal-midlle>li").length !== songArray.length){
            // 创建歌曲列表
            $(".modal-midlle").html("");
            songArray.forEach(function (obj) {
                ids.push(obj.id);
                let $li = $(`<li>
                        <p>${obj.name} - ${obj.singer}</p>
                        <img src="images/player-it666-close.png" class="delete-song">
                    </li>`);
                $(".modal-midlle").append($li);
            });

            // 监听歌曲列表删除按钮点击
            $(".delete-song").click(function () {
                // 1.删除sessionStorage中的数据
                let delIndex = $(this).parent().index();
                let len = deleteSongByIndex(delIndex);
                // 如果没有歌曲调整到首页
                if(len === 0){
                    $(".modal-top .clear-all").click();
                }
                // 2.删除UI界面上的数据
                $(this).parent().remove();
                // 3.从Swiper中删除对应的slide
                mySwiper.removeSlide(delIndex);
                // 4.从当前保存的数据中删除对应的数据
                songArray.splice(delIndex, 1);
                // 5.更新歌曲列表头部信息
                $(".modal-top>p>span").html(`列表循环(${len})`);
            });
        }
        $(".modal").css({display: "block"});
    });

    $(".footer-bottom .prev").click(function () {
        index--;
        mySwiper.swipeDirection = "prev";
        mySwiper.slideToLoop(index);
    });



    $(".footer-bottom .next").click(function () {
        index++;
        mySwiper.swipeDirection = "next";
        mySwiper.slideToLoop(index);
    });
    $(".modal-bottom").click(function () {
        $(".modal").css({display: "none"});
    });

    /*处理公共的内容区域*/
    let oAudio = document.querySelector("audio");
    // 3.实现默认界面和歌词界面切换
    $(".main-in").click(function () {
        $(this).toggleClass("active");
        if($(this).hasClass("active")){
            getLyric(songArray[index].id);
        }
    });

    // 4.监听播放量按钮点击
    let flag = false;
    $("audio").on("canplay", function () {
        let timeObj = formartTime(oAudio.duration * 1000);
        $(".total-time").text(timeObj.minute + ":" + timeObj.second);
        // 防止多次注册点击事件
        // 注意点: 调整了歌曲当前时间也会触发canplay事件
        if(!flag){
            flag = true;
        }else{
            return;
        }
        $(".play").click(function () {
            if($(this).attr("class").includes("active")){
                $(".detault-top>img").css({transform: "rotate(-30deg);"});
                $(".disc-pic").css({"animation-play-state": "paused"});
                $("audio")[0].pause();
            }else{
                $(".detault-top>img").css({transform: "rotate(0deg);"});
                $(".disc-pic").css({"animation-play-state": "running"});
                $("audio")[0].play();
            }
            $(this).toggleClass("active");
        });
    });

    // 5.获取歌曲信息
    let mySwiper = null;
    MusicApis.getSongDetail(ids.join(","))
        .then(function (data) {
            // console.log(data);
            for(let i = 0; i < data.songs.length; i++){
                let song = data.songs[i];
                songArray[i].picUrl = song.al.picUrl;
                // 1.初始化碟片区域
                let slide = $(`<div class="swiper-slide">
                                    <div class="disc-pic">
                                        <img src="${song.al.picUrl}" alt="">
                                    </div>
                                </div>`);
                $(".swiper-wrapper").append(slide);
                // 2.创建Swiper
                mySwiper = new Swiper ('.swiper-container', {
                    loop: true,
                    // 如果内容是从服务器获取的, 请加上这三个配置
                    observer: true,
                    observeParents: true,
                    observeSlideChildren: true,
                    on: {
                        slideChangeTransitionEnd: function(){
                            /*
                            Swiper.swipeDirection属性用于获取Swiper当前滚动的方向
                            如果是第一次执行, 那么拿到的是: undefined
                            如果是切换到下一屏: 返回的是next
                            如果是切换到上一屏: 返回的是prev
                            console.log("执行了", this.swipeDirection);
                            * */
                            index = this.realIndex;
                            initDefaultInfo(this.realIndex, this.swipeDirection);
                        },
                    },
                });
            }
        })
        .catch(function (err) {
            console.log(err);
        });

    // 根据索引初始化当前歌曲默认信息
    function initDefaultInfo(index, swipeDirection){
        // 1.拿到当前slide对应的歌曲
        let song = songArray[index];
        // 2.初始化头部信息
        $(".header-title").text(song.name);
        $(".header-singer").text(song.singer);
        // 3.初始化对应需要播放的歌曲
        MusicApis.getSongURL(song.id)
            .then(function (data) {
                $("audio").html("");
                for(let i = 0; i < data.data.length; i++){
                    let $sc = $(`<source src="${data.data[i].url}" type="audio/${data.data[i].type}"/>`);
                    $("audio").append($sc);
                }
                // 注意点: 如果更换了需要播放歌曲的地址, 那么必须让audio重新加载才会播放更新之后的歌曲
                $("audio")[0].load();
            })
            .catch(function (err) {
                console.log(err);
            });
        // 4.同步修改播放界面的背景
        $(".main>.bg").css({background: `url("${song.picUrl}") no-repeat center top`});
        if(swipeDirection && !$(".play").hasClass("active")){
            // 5.修改指针的状态
            $(".detault-top>img").css({transform: "rotate(0deg);"});
            $(".disc-pic").css({"animation-play-state": "running"});
            $(".play").toggleClass("active");
        }
    }

    // 6.通过进度条控制歌曲进度
    let musicProgress = new NJProgress($(".progress-bar"), $(".progress-line"), $(".progress-dot"));
    musicProgress.progressClick(function (value) {
        // console.log(value * oAudio.duration);
        oAudio.currentTime = value * oAudio.duration;
    });
    musicProgress.progressMove(false ,function (value) {
        // console.log(value);
        oAudio.currentTime = value * oAudio.duration;
    });
    $("audio").on("timeupdate", function () {
        // 处理当前播放时间
        let timeObj = formartTime(oAudio.currentTime * 1000);
        $(".cur-time").text(timeObj.minute + ":" + timeObj.second);

        // 处理进度条同步
        let value = oAudio.currentTime / oAudio.duration * 100;
        musicProgress.setProgress(value);

        // 处理歌词同步
        let curTime = parseInt(oAudio.currentTime);
        let cur$li = $("#nj_"+curTime);
        if(!cur$li[0])return;
        cur$li.addClass("active").siblings().removeClass("active");
        let curOffset = cur$li[0].lrc.offset;
        if($(".lyric-list")[0].isDrag) return;
        lyricScroll.scrollTo(0, curOffset);
    });

    // 7.通过进度条控制歌曲音量
    let volumeValue = 0.5;
    oAudio.volume = volumeValue;
    let voiceProgress = new NJProgress($(".voice-progress-bar"), $(".voice-progress-line"), $(".voice-progress-dot"));
    voiceProgress.progressClick(function (value) {
        oAudio.volume = value;
        volumeValue = value;
    });
    voiceProgress.progressMove(false ,function (value) {
        oAudio.volume = value;
        volumeValue = value;
    });
    $(".lyric-top>img").click(function (event) {
        if(oAudio.volume === 0){
            oAudio.volume = volumeValue;
            voiceProgress.setProgress(volumeValue * 100);
        }else{
            oAudio.volume = 0;
            voiceProgress.setProgress(0);
        }
        return event.stopPropagation();
    });

    // 8.初始化歌词滚动
    let lyricScroll = new IScroll(".lyric-bottom", {
        mouseWheel: false,
        scrollbars: false,
        probeType: 3,
    });
    lyricScroll.on("scroll", function () {
        $(".lyric-time-line").css({display: "flex"});
        $(".lyric-list")[0].isDrag = true;
        let index = Math.abs(parseInt(this.y / $(".lyric-list>li").eq(0).height()));
        let cur$li = $(".lyric-list>li").eq(index);
        if(!cur$li[0]) return;
        $(".lyric-time-line>span").text(cur$li[0].lrc.timeStr);
        cur$li.addClass("hover").siblings().removeClass("hover");
    });
    lyricScroll.on("scrollEnd", function () {
        $(".lyric-list")[0].isDrag = false;
        $(".lyric-time-line").css({display: "none"});
    });

    // 加载歌曲歌词方法
    function getLyric(id){
        MusicApis.getSongLyric(id)
            .then(function (data) {
                // console.log(data);
                let lyricObj = parseLyric(data.lrc.lyric);
                let index = 0;
                $(".lyric-list").html("");
                for(let key in lyricObj){
                    let $li = $(`<li id="nj_${key}">${lyricObj[key]}</li>`);
                    if(index === 0){
                        $li.addClass("active");
                    }
                    $(".lyric-list").append($li);
                    let li = $li[0];
                    let timeObj = formartTime(key * 1000);
                    li.lrc = {
                        offset: -index * $li.height(),
                        timeStr: timeObj.minute + ":" + timeObj.second
                    };
                    index++;
                }
                lyricScroll.refresh();
                lyricScroll.maxScrollY -= $(".lyric-bottom").height();
            })
            .catch(function (err) {
                console.log(err);
            });
    }




    // 格式化歌词方法
    function parseLyric(lrc) {
        let lyrics = lrc.split("\n");
        // [00:00.000] 作曲 : 林俊杰
        // 1.定义正则表达式提取[00:00.000]
        let reg1 = /\[\d*:\d*\.\d*\]/g;
        // 2.定义正则表达式提取 [00
        let reg2 = /\[\d*/i;
        // 3.定义正则表达式提取 :00
        let reg3 = /\:\d*/i;
        // 4.定义对象保存处理好的歌词
        let lyricObj = {};
        lyrics.forEach(function (lyric) {
            // 1.提取时间
            let timeStr = lyric.match(reg1);
            if(!timeStr){return}
            timeStr = timeStr[0];
            // 2.提取分钟
            let minStr = timeStr.match(reg2)[0].substr(1);
            // 3.提取秒钟
            let secondStr = timeStr.match(reg3)[0].substr(1);
            // 4.合并时间, 将分钟和秒钟都合并为秒钟
            let time = parseInt(minStr) * 60 + parseInt(secondStr);
            // 5.处理歌词
            let text = lyric.replace(reg1, "").trim();
            // 6.保存数据
            lyricObj[time] = text;
        });
        // console.log(lyricObj);
        return lyricObj;
    }
});
