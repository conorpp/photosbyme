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
    setTimeout(function(){
        readyfunc();
    },10);
})

.directive('imageonload', function() {
    return {
        restrict: 'A',
    link: function(scope, element, attrs) {
        var n = attrs['id'].replace('im','');
        $('#im'+n).hide();
        element[0].onerror = function(im){console.log('')};
        element.bind('load', function() {
            $('#spin'+n).remove();
            $('#im'+n).show();
        });
    }
    };
});

var readyfunc = function(){

    var scrollEle= $('#scroll');
    var imgListEle= $('#image-list');
    var em = 0;
    var licon = $('.spinner');
    $('#image-list').find('img').each(function(i){
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
            num++;
            if (num < 10 && num > 1)
            {
                $('#image-list').append('<img src="'+path+num+'.jpg" >');
            }
        }
    } 

    $(document).on('scroll',checkimgs);
    checkimgs();

};
