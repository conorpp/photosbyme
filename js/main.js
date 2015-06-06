test = 0;

$(document).ready(function(){


    //var initFontSize = $('#scroll').css('font-size').replace('px','');

    var scrollEle= $('#scroll');
    var imgListEle= $('#image-list');
    var em = 0;
    var licon = $('#imgjail').find('.spinner');
    $('#imgjail').find('img').each(function(i){
        var img = $(this);
        nlicon = licon.clone();
        var id = 'licon'+i;
        nlicon.attr('id',id);
        $('#image-list').append(img);
        $('#image-list').append(nlicon);
        img.on('load',function(){
            $('#'+id).hide();
        });
    });
    
    var checkimgs = function(e){
        var docscrolltop = $(document).scrollTop();
        var viewheight = isNaN(window.innerHeight) ? window.clientHeight : window.innerHeight;
        var winheight = $(window).height();
        $('img.invis').each(function(){
            var val = $(this).offset().top - docscrolltop ;
            if(val < 300 || docscrolltop + viewheight/2 >= winheight)
        {
            console.log(val,winheight);
            $(this).css('visibility','visible');
            $(this).velocity({opacity:1},{duration:1000});
        }
        });
        test = e;
        var inc = 9;
        var imgListEle= $('#image-list');
        if (docscrolltop > 80)
        {
            $('#myname').css('margin-top','-1em');
        }
        else
        {
            $('#myname').css('margin-top','');
        }
        //var t = imgListEle.offset().top-100;
        //var fs = scrollEle.css('font-size').replace('px','');
        //fs = parseInt(fs);
        //fs -= inc;
        //fs = (t - docscrolltop)/t * initFontSize;
        /*
           if (fs <= 0)
           {
           fs = 0; 
           if (em != -1)
           {
           em = -1;
           }
           }
           else
           {
           if (em != 0)
           {
           em = 0;
           }
           }
           */
    } 

    $(document).on('scroll',checkimgs);
    checkimgs();

});
