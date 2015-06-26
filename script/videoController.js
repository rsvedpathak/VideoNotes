var mainApp = angular.module("mainApp", []);

// Directive
mainApp.directive('videonote', function () {
    return {
        restrict: "E",
        replace: true,
        template: "<div ng-controller='videoController' ng-init='init()'> <video id='videoplayer' controls>  <source id='mp4' src='contents/Marvel Avengers- Age of Ultron - Trailer 3.mp4' type='video/mp4'/> <p>Your user agent does not support the HTML5 Video element.</p> </video> <div class='overlay' id='list'> <div id='overlaylist'> <ul class='container-fluid' style='list-style-type:none'> <li class='row' ng-repeat='noteObj in videoNotes' ng-click='seekVideo(noteObj.timeFrame)'>{{noteObj.description}} <br><span class='time'>{{secondsToTime(noteObj.timeFrame)}}</span> </li> </ul> </div> </div> <button class='overlay btn btn-primary' id='showhidelist' ng-click='showhide()'>Hide</button> </div>",
        link: function (scope, element) {
        }
    }
});

//Controller
mainApp.controller("videoController", function($scope){
    //Variables
    $scope.showhideflag = 1;
    
    //Functions
    $scope.init = function(){
        $scope.videoNotes = [   {"id":"1", "timeFrame":"10", "description":"Motion Picture" },
                                {"id":"2", "timeFrame":"28", "description":"Begining of Ultron" },
                                {"id":"3", "timeFrame":"39", "description":"Marvel Studios" },
                                {"id":"4", "timeFrame":"50", "description":"Ultron Program" },
                                {"id":"5", "timeFrame":"75", "description":"Nick Fury" },
                                {"id":"6", "timeFrame":"80", "description":"Iron Man" },
                                {"id":"7", "timeFrame":"96", "description":"Hulk vs Iron Man" },
                                {"id":"8", "timeFrame":"106", "description":"Final fight" },
                                {"id":"9", "timeFrame":"122", "description":"Vision" }
                            ];
    };
    
    $scope.seekVideo = function(seekTo){
        var video = document.getElementById('videoplayer');
        video.currentTime = seekTo;
    };
    
    $scope.showhide = function() {
        if ($scope.showhideflag) {
            $("#list").animate({width: '0px'}, "slow");
            $("#overlaylist").hide('slow');
            $("#showhidelist").animate({left: '0px'}, "slow");
            $("#showhidelist").text('Show');
            $scope.showhideflag = 0;
        } else {
            $("#list").animate({width: '250px'}, "slow");
            $("#overlaylist").show();
            $("#showhidelist").animate({left: '250px'}, "slow");
            $("#showhidelist").text('Hide');
            $scope.showhideflag = 1;
        }
    };
    
    //Conver seconds in hh:mm:ss format
    $scope.secondsToTime = function (seconds) {
        var h = Math.floor(seconds / 3600);
        var m = Math.floor(seconds % 3600 / 60);
        var s = Math.floor(seconds % 3600 % 60);
        return ((h > 0 ? (h < 10 ? "0" : "") + h + ":" : "")
                + (m > 0 ? (m < 10 ? "0" : "") + m + ":" : "00:")
                + (s < 10 ? "0" : "") + s);
    };
});