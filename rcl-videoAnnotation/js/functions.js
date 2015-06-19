
//Global Functions

//Set up a prototype for the String class to convert seconds (float) to HHMMSS format for display
String.prototype.toHHMMSS = function() {
    var sec_num = parseInt(this, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
     if (seconds < 10) {
        seconds = "0" + seconds;
    }
    var time = hours + ":" + minutes + ":" + seconds;
    return time;
};

function appendHTML(selector,text,start){
    $(selector).append('<div href="#" class="sceneChangeMark"><div class="sceneChangeText">' + text + '&nbsp' + start.toHHMMSS() + '</div><div class="sceneChangeTimeSec">'+ start +'</div></div>');
    return this;
    };

function changeHTML(selector,text,start){
    $(selector).html('<h4 class="recentMarker">Most Recent Marker Selected: &nbsp;</h2><div href="#" class="sceneChangeMark"><div class="sceneChangeText">' + text + '&nbsp' + start.toHHMMSS() + '</div><div class="sceneChangeTimeSec">'+ start +'</div></div>');
    return this;
    };

function iteratorCallback(i,selector,sliceMin,sliceMax) {
    return function() {
        $(selector).hide();
        $(selector).slice(sliceMin,sliceMax).show();
        
        };
    };


function addPagination(selector,maxResults){
    
    var $maxNoOfResults = maxResults;
                    var $totalResults = $(selector).length;
                    
                    var $totalPages = Math.ceil($totalResults / $maxNoOfResults);
                    
                    $(selector).hide();
    
                    console.log('Total pages'+' '+$totalPages);

                    for (i=0; i < $totalPages; i++) {
                        var $pageOne = i + 1;
                        $pageButton = '#page-' + i + '-button';
                        if(i === 0) {
                            
                            console.log('Should be first loop');
                            $('.markerSelectButtons').append('<a id="page-'+i+'-button">Page '+$pageOne+'</a>');
                             $('.markerSelectButtons').on('click', '#page-'+i+'-button', iteratorCallback(i,selector,0,$maxNoOfResults));
                               
                        }

                        if (i > 0) {
                            $tempNo = i + 1;
                            $sliceMax = $tempNo * $maxNoOfResults;
                            $sliceMin = $sliceMax - ($maxNoOfResults);
                            
                            $('.page-'+i).css('display', 'none');
                            console.log('Should be loop'+' '+i);
                            console.log($sliceMin, $sliceMax);
                            $('.markerSelectButtons').append('<a id="page-'+i+'-button">Page '+$pageOne+'</a>');
                            $('.markerSelectButtons').on('click', '#page-'+i+'-button', iteratorCallback(i,selector,$sliceMin,$sliceMax));

                            }
                       };
              
    return this;
    }
   
    
    
//Popcorn functions



function scrubMode(selector) {
    popcorn.on( "timeupdate", function() {
            var time = popcorn.currentTime();
            
            var selectorTime = $('.sceneChangeTimeSec').text();
            
            if ($('.sceneChangeTimeSec:contains('+time+')')){
                console.log(time);
                $('.sceneChangeTimeSec:contains('+time+')').css({'color': 'red'});
                }
            
        });

};

function timeScrubbing(selector1,selector2) {
       $(selector1).on('click', selector2, function () {
            var $timeSec = $(this).find('.sceneChangeTimeSec').text();
            console.log($timeSec);
            popcorn.currentTime($timeSec);

            });
                return this;
};

function addFootnote(start,end,text,target){
    popcorn.footnote({
                                start: start,
                                end: end,
                                text: text + '&nbsp;' + '|' + '&nbsp',
                                target: target 
                            });
}

function markerHighlight(start,end,text,i) {
    
     popcorn.code({
                    start: start,
                    end: end,
                    onStart: function() {
                                    var $tempNo = i + 1;
                                    changeHTML('#markersDiv2',text,start);
                                    $('.sceneChangeMark:nth-child('+$tempNo+')').css({'color': 'red'});
                                   },
                    onEnd: function() {
                                    $('.sceneChangeMark').css({'color': '#000'});
                                   } 
                             });

}
     
    
    




