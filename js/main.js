angular.module('pp', ['ngRoute'])

.config(function($routeProvider){
    $routeProvider.when("/",
        {
            templateUrl: "home.html",
            controller: "AppCtrl",
            controllerAs: "app"
        }
        ).when("/contact",
        {
            templateUrl: "contactbio.html"
        })
        ;

})

.controller('AppCtrl', function() {
      var self = this;
        self.message = "The app routing is working!";
    readyfunc();
});

var readyfunc = function(){


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
        $('#image-list').append(nlicon);
        $('#image-list').append(img);
        img.on('load',function(){
            $('#'+id).hide();
        });
    });
    var path='images/links/'
    var checkimgs = function(e){
        var docscrolltop = $(document).scrollTop();
        var viewheight = isNaN(window.innerHeight) ? window.clientHeight : window.innerHeight;
        var winheight = $(window).height();
        var num = $('#image-list').find('img').length;

        if (docscrolltop > 80)
        {
            $('#myname').css('margin-top','-1em');
        }
        else
        {
            $('#myname').css('margin-top','');
        }


        if ((docscrolltop+viewheight)/winheight > 0.91)
        {
            console.log(docscrolltop + viewheight, winheight);
            num++;
            if (num < 12 && num > 1)
            {
                $('#image-list').append('<img src="'+path+num+'.jpg" >');
            }
        }
    } 

    $(document).on('scroll',checkimgs);
    checkimgs();

};
