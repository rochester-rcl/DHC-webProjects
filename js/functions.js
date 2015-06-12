
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
    $(selector).append('<div href="#" class="sceneChangeMark"><div #id="sceneChangeText">' + text + '&nbsp' + start.toHHMMSS() + '</div><br /><div id="sceneChangeTimeSec">'+ start +'</div></div><br />');
    return this;
    };


function addPagination(selector,maxResults){
    
    var $maxNoOfResults = maxResults;
                    var $totalResults = $(selector).length;
                    
                    var $totalPages = Math.ceil($totalResults / $maxNoOfResults);
    
                    console.log('Total pages'+' '+$totalPages);

                    for (i=0; i < $totalPages; i++) {
                        var $pageOne = i + 1;
                        if(i === 0) {
                            $(selector).slice(0,$maxNoOfResults).wrap('<div class="page-'+i+'"></div>');
                            console.log('Should be first loop');
                            $('#markerSelectButtons').append('<a class="page-'+i+'-button">Page '+$pageOne+'</a>');
                            $('#markerSelectButtons').on('click', '.page-'+i+'-button', function() {
                                if ($('.page-'+i).is(':hidden')) {
                                $('.page-'+i).show();
                            } else { $('.page-'+i).hide();
                            }
                            });
                             
                        }

                        if (i > 0) {
                            $tempNo = i + 1;
                            $sliceMax = $tempNo * $maxNoOfResults;
                            $sliceMin = $sliceMax - ($maxNoOfResults + 1);
                            $pageButton = '.page-' + i + '-button';
                            $(selector).slice($sliceMin,$sliceMax).wrap('<div class="page-'+i+'"></div>');
                            $('.page-'+i).css('display', 'none');
                            console.log('Should be loop'+' '+i);
                            console.log($sliceMin, $sliceMax);
                            $('#markerSelectButtons').append('<a class="page-'+i+'-button">Page '+$pageOne+'</a>');
                            $('#markerSelectButtons').on('click', $pageButton, function() { //try to fix this
                                if ($('.page-'+i).is(':hidden')) {
                                $('.page-'+i).show();
                            } else {
                                $('.page-'+i).hide();
                            }
                            
                            });

                        }
                        
                       };
                    
                    
    return this;
    }
    
//Popcorn functions 

function timeScrubbing(selector1,selector2) {
       $(selector1).on('click', selector2, function () {
                                    var $timeSec = $(this).find('#sceneChangeTimeSec').text();
                                    console.log($timeSec);
                                    popcorn.currentTime($timeSec);

                            });
                            return this;
                            }
     
    
    




