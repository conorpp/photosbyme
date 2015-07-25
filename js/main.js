function reduce(numerator,denominator){
  var gcd = function gcd(a,b){
    return b ? gcd(b, a%b) : a;
  };
  gcd = gcd(numerator,denominator);
  return [numerator/gcd, denominator/gcd];
}

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

.controller('AppCtrl', [ '$scope' , '$http', function($scope, $http) {
      var self = this;
        self.message = "The app routing is working!";
        console.log('wow it works')
    $http.get('/images/dir.json')
    .then(function(res){
        
        $scope.tags = res.data.children;
        $scope.pics = [];
        console.log($scope.tags);
        for (i in $scope.tags)
        {
            var split = $scope.tags[i].name.split('_')
            $scope.pics.push({
                                name: $scope.tags[i].name,
                                tag: split[1],
                                rank: parseInt(split[0])
                            }); 
        }
        console.log($scope.pics)
        readyfunc();
    });
}])

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
            var self = this;
            EXIF.getData(this, function(){
                self.exif = EXIF.getAllTags(this);
                console.log(self.exif, n);
                var spec = '';

                if (self.exif['ISOSpeedRatings'])
                {
                    spec +=  'ISO' + self.exif['ISOSpeedRatings'];
                }
                if (self.exif['ShutterSpeedValue'])
                {
                    var ss = self.exif['ShutterSpeedValue'];
                    ss = ((Math.pow(2, ss))+ 0.5)|0;
                    ss = ' 1/'+ss+'s ';
                    spec +=  '' + ss;
                }

                if (self.exif['ApertureValue'])
                {
                    var av = self.exif['ApertureValue'];
                    var cd = Math.pow( 1.4142, av);
                    spec += ' F' + Math.round(cd* 10)/10;
                    console.log(av);
                }

                if (self.exif['Flash'])
                {
                  if ( self.exif['Flash'].indexOf('Flash fired') != -1)
                  {
                      spec += ' Flash-fired';
                  }
                  else
                  {

                      spec += ' No-flash';
                  }
                }

                $('#imspec'+n).text(spec);
            });
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
//                $('#image-list').append('<img src="'+path+num+'.jpg" >');
            }
        }
    }

    $(document).on('scroll',checkimgs);
    checkimgs();

};
