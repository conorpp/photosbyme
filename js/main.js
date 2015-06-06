test = 0;

$(document).ready(function(){

    //$('#myname').velocity('slideUp', {delay:200, duration:500});

    var initFontSize = $('#scroll').css('font-size').replace('px','');

    var scrollEle= $('#scroll');
    var imgListEle= $('#image-list');
    var em = 0;
    var winheight = $(window).height();
    var licon = $('#imgjail').find('.spinner');
    $('#imgjail').find('img').each(function(i){
        var img = $(this);
        nlicon = licon.clone();
        var id = 'licon'+i;
        nlicon.attr('id',id);
        $('#image-list').append(img);
        $('#image-list').append(nlicon);
        img.on('load',function(){
            setTimeout(function(){
                    $('#'+id).hide();
                    //img.show(1000);
                    console.log('show');
            },2000);
        });
    });


    $(document).on('scroll',function(e){
        var docscrolltop = $(document).scrollTop();
        var viewheight = isNaN(window.innerHeight) ? window.clientHeight : window.innerHeight;
        $('img.invis').each(function(){
            var val = $(this).offset().top - docscrolltop ;
            if(val < 300 || docscrolltop + viewheight/2 >= winheight)
            {
                $(this).css('visibility','visible');
                $(this).velocity({opacity:1},{duration:1000});
            }
        });
        test = e;
        var inc = 9;
        var imgListEle= $('#image-list');
        var t = imgListEle.offset().top-100;
        var fs = scrollEle.css('font-size').replace('px','');
        fs = parseInt(fs);
        fs -= inc;
        fs = (t - docscrolltop)/t * initFontSize;
        if (fs <= 0)
        {
            fs = 0; 
            if (em != -1)
            {
                $('#myname').css('margin-top','-1em');
                em = -1;
            }
        }
        else
        {
            if (em != 0)
            {
                $('#myname').css('margin-top','');
                em = 0;
            }
        }
        scrollEle.css('font-size',fs+'px');
    });

});
