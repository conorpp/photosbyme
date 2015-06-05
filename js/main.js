test = 0;

$(document).ready(function(){

    var initFontSize = $('#scroll').css('font-size').replace('px','');

    var scrollEle= $('#scroll');
    var imgListEle= $('#image-list');
    $(document).on('scroll',function(e){
        test = e;
        var inc = 9;
        var imgListEle= $('#image-list');
        var t = imgListEle.offset().top-40;
        var fs = scrollEle.css('font-size').replace('px','');
        fs = parseInt(fs);
        fs -= inc;
        fs = (t - $(document).scrollTop())/t * initFontSize;
        if (fs <= 0)
        {
            fs = 0; 
        }
        scrollEle.css('font-size',fs+'px');
    });

});
