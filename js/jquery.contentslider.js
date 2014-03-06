(function($){
    $.fn.lbSlider = function(options){
        var options = $.extend({
            leftBtn: '.leftArr',
            rightBtn: '.rightArr',
            autoPlay: false, 
            autoPlayDelay: 1.5,
            speed : 1,
        }, options);

        var make = function(){
            var thisWrap = $(this).parent('div'),
                thisWidth = $(this).width(),
                ul = $(this).children('ul'),
                elem = ul.children('li'),
                elemWidth= ul.children('li').width(),
                allWidth = elemWidth* ul.children('li').length;


             $(this).css('overflow', 'hidden');
             ul.css({
                position : 'relative',
                left : '0px',
                width : allWidth
             });
             elem.css('width', thisWidth);
             ul.children('li').css('float', 'left');


             var leftArrow = $(this).next('div').children('.slider-left')
             .addClass(options.leftBtn);
             var rightArrow = $(this).next('div').children('.slider-right')
             .addClass(options.rightBtn);


             rightArrow.click(function(){
                ul.stop().animate({left: -elemWidth}, (options.speed * 1000));
                setTimeout(function () { 
                    ul.find('li').eq(0).clone().appendTo(ul); 
                    ul.find("li").eq(0).remove();    
                    ul.css({"left":"0px"}); 
                }, (options.speed * 1000) + 50);

             });

            leftArrow.click(function(){   
                ul.find("li").eq(-1).clone().prependTo(ul); 
                ul.css({"left":-elemWidth});    
                ul.stop().animate({left: "0px"}, (options.speed * 1000));
                ul.find("li").eq(-1).remove();
            }); 


            if(options.autoPlay){
                function play(){
                    rightArrow.click();
                    go = setTimeout(function(){
                        play();
                    },options.autoPlayDelay * 1000);
                };
                var go = setTimeout(function(){
                    play();
                },options.autoPlayDelay * 1000);
                
                $(thisWrap).hover(function(){
                    clearTimeout(go);
                },
                function(){
                    go = setTimeout(function(){
                        play();
                    }, options.autoPlayDelay * 1000);
                });
            };

        };

        return this.each(make);
    };
})(jQuery);