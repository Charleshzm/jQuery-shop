$(function () {
    //面向对象轮播图
    var slide = {
        stop: false,
        animate: false,
        nextEvent: function () {
            //下一页点击事件
            var next = $('.main .banner .next')
            next.click(function () {
                var animateBox = $('.main .banner .banner-box')
                if (slide.animate) return
                slide.animate = true
                animateBox.animate({
                    left: '-1000px'
                }, 800, function () {
                    //把划过去的元素添加到ul最后
                    $('.banner-box li').eq(0).appendTo(animateBox)
                    //把ul元素的位置回到原位置
                    animateBox.css('left', 0)
                    slide.animate = false
                })
            })
        },
        preveEvent: function () {
            var preve = $('.main .banner .preve')
            preve.click(function () {
                var animateBox = $('.main .banner .banner-box')
                if (slide.animate) return
                slide.animate = true
                animateBox.find('li').last().prependTo(animateBox)
                //把ul的位置向左以动一个宽度 显示当前要显示的li
                animateBox.css('left', '-1000px')
                //利用动画将移到最前的的li滑动过来
                animateBox.animate({
                    left: 0
                }, 800, function () {
                    slide.animate = false
                })
            })
        },
        init: function () {
            setInterval(function () {
                var animateBox = $('.main .banner .banner-box')
                if (slide.stop) return
                if (slide.animate) return
                slide.animate = true
                animateBox.animate({
                    //点击后让ul向左滑动一个宽度
                    left: '-1000px'
                }, 800, function () {
                    //把划过去的元素添加到ul最后
                    $('.banner-box li').eq(0).appendTo(animateBox)
                    //把ul元素的位置回到原位置
                    animateBox.css('left', 0)
                    slide.animate = false
                })
            }, 2000)
            //鼠标移入时动画停止，移出时动画继续
            $('.main .banner').mouseenter(function () {
                slide.stop = true
            })
            $('.main .banner').mouseleave(function () {
                slide.stop = false
            })
            this.nextEvent()
            this.preveEvent()
        }
    }
    slide.init()



    // //轮播图区域
    // //点击右按钮
    // $('.main .banner .next').on('click', function () {
    //     var animateBox = $('.main .banner .banner-box')
    //     if (!animateBox.is(':animated')) {
    //         animateBox.animate({
    //             //点击后让ul向左滑动一个宽度
    //             left: '-1000px'
    //         }, 800, function () {
    //             //把划过去的元素添加到ul最后
    //             $('.banner-box li').eq(0).appendTo(animateBox)
    //             //把ul元素的位置回到原位置
    //             animateBox.css('left', 0)
    //         })
    //     }
    // })

    // //点击左按钮
    // $('.main .banner .preve').on('click', function () {
    //     var animateBox = $('.main .banner .banner-box')
    //     //把要显示li放到ul的最前面
    //     //判断该元素当前是否在执行动画 未执行动画就可以执行下面的动画
    //     if (!animateBox.is(':animated')) {
    //         animateBox.find('li').last().prependTo(animateBox)
    //         //把ul的位置向左以动一个宽度 显示当前要显示的li
    //         animateBox.css('left', '-1000px')
    //         //利用动画将移到最前的的li滑动过来
    //         animateBox.animate({
    //             left: 0
    //         }, 800)
    //     }

    // })

    // //定时器 让图片轮播起来
    // var timer = setInterval(function () {
    //     var animateBox = $('.main .banner .banner-box')
    //     if (!animateBox.is(':animated')) {
    //         animateBox.animate({
    //             //点击后让ul向左滑动一个宽度
    //             left: '-1000px'
    //         }, 800, function () {
    //             //把划过去的元素添加到ul最后
    //             $('.banner-box li').eq(0).appendTo(animateBox)
    //             //把ul元素的位置回到原位置
    //             animateBox.css('left', 0)
    //         })
    //     }
    // }, 3000)

    // //鼠标移入时动画停止，移出时动画继续
    // $('.main .banner').mouseenter(function () {
    //     clearInterval(timer)
    // })
    // $('.main .banner').mouseleave(function () {
    //     clearInterval(timer)
    //     timer = setInterval(function () {
    //         $('.main .banner .next').click()
    //     }, 3000)
    // })

    //酷玩区域点击加载更多
    var indexNumber = 0;
    $('.comeMore').click(function () {
        var self = $(this);
        self.html("正在加载中").removeClass("cl").addClass("loading");
        $.ajax({
            type: "post",
            url: "json/json1.js",
            dataType: "json",
            success: function (response) {
                var data = response[indexNumber]
                console.log(data)
                var element = '';
                for (var i = 0; i < data.length; i++) {
                    element += `
                    <li>
                        <img src="${data[i].img}" alt="">
                        <p class="dscrip">${data[i].text}</p>
                        <p class="user">
                            <span class="fl red">${data[i].price}</span>
                            <span class="fr"><em>3</em><i>3</i></span>
                        </p> 
                    </li>
                    `
                }
                $('.cool-paly .box-list').append(element)
                indexNumber++
                $('.comeMore').html("点击加载更多").removeClass("loading").addClass("cl")
                if (indexNumber >= response.length) {
                    $('.read-more').html("<span class='no-more'>没有更多啦</span>")
                }
            }

        })
    })


})