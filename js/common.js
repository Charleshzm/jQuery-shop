// 点击按钮回到网页顶部插件
(function($){
    $.fn.extend({
        "backTop": function(option) {
            //默认参数
            var obj = {
                isBack: true,
                isShow: false,
                offSet: 0,
                position: "right",
                domWidth: 1000,
                speed: 800,
                bottom: 100,
                scrollTop:0
            }
            var ops = $.extend(obj, option)
            var $win = $(window),$dom = $(this)
            var opr = {
                getLeft: function() {
                    var l
                    var ww = $win.width()
                    var wd = $dom.outerWidth()
                    if(ops.position == "left") {
                        l = (ww - ops.domWidth) / 2 - wd - ops.offSet
                    }else if(ops.position == "right") {
                        l = (ww - ops.domWidth) / 2 + ops.domWidth + ops.offSet
                    }
                    console.log(l)
                    
                    return l
                },
                getTop: function() {
                    var t 
                    var wh = $win.height()
                    var hd = $dom.height()
                    t = wh - ops.bottom - hd
                    return t
                },
                setPosition: function() {
                    var L = this.getLeft()
                    var T = this.getTop()                 
                    $dom.css({
                        "left": L + "px",
                        "top": T + "px"
                    })
                },
                init:function() {
                    this.setPosition()
                    $win.scroll(function(){
						if($win.scrollTop()>ops.scrollTop){		
							$dom.show()
						}else{
							$dom.hide()
						}
					})
					$win.resize(function(){
						opr.setPosition()
                    })
                    if(ops.isBack){
						$dom.on("click",function(){
							$("body,html").animate({
								scrollTop:0
							},ops.speed)
						})
                    }
                    if(ops.ifShow){
						$dom.show()
					}else{
						$dom.hide()
					}
                }
            }
            opr.init()
            return $dom
        }
    })
}(jQuery))


$(function() {
    // $(window).scroll(function() {
    //     var scrollTop = $(this).scrollTop()
    //     var self = this
    //     if(scrollTop > 200) {
    //         $('.back-top').css('display', 'block')  
    //     }else {
    //         $('.back-top').css('display', 'none')
    //     }
    // })
    // $('.back-top').click(function() {
    //     $('html, body').animate({
    //         scrollTop: 0
    //     },800)
    // })
    $('.back-top').backTop({
        scrollTop: 100
    })

})


