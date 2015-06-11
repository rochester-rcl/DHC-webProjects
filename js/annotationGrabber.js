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
    
    var time = hours+":"+minutes+":"+seconds;
    
    return time;
};


function appendHTML(selector,text,start){
    var appendTo = $(selector).append('<span href="#" id="sceneChangeMark"><span #id="sceneChangeText">' + text + '&nbsp' + start.toHHMMSS() + '</span><br /><span id="sceneChangeTimeSec">'+ start +'</span></span><br />');
    return appendTo;
    };


// The Program
$(document).ready( function() {
    
var $timeLog = $('#timeLogButton');
    
$timeLog.on("click", function (e) {
    var $getTimecode = popcorn.currentTime();
    var $footnoteEnd = $getTimecode + 1;
    var $target = $('#videoNote').attr('id');
    $.ajax({
        url: 'php/pdoConnect.php',
        type: 'post',
        cache: 'false',
        data: {'action': 'getTimecode', 'timecode': $getTimecode, 'filmName': 'Hugo', 'markerType': 'Scene Change', 'start': $getTimecode, 'end': $footnoteEnd, 'text': 'Scene Change', 'target': $target },
        success: function(json) {
                if (json) {
                    console.log(json);
                    $.each(json, function(i, item) {
                        
                            var $start = item.start;
                            var $end = item.end;
                            var $text = item.text;
                            var $markerType = item.markerType;

                            popcorn.footnote({
                                start: $start,
                                end: $end,
                                text: $text + '&nbsp;' + '|' + '&nbsp',
                                target: $target 
                            });
                        
                            if ($markerType === 'Scene Change') {
                         
                                    appendHTML('#sceneChangeMarkers',$text,$start);

                            }

                    });
                    
                    $('#sceneChangeMarkers').on('click', '#sceneChangeMark', function () {
                                     
                                       
                                        var $timeSec = $(this).find('#sceneChangeTimeSec').text();
                                        console.log($timeSec);
                                        popcorn.currentTime($timeSec);
                                        
                                    });
                }
            },
        error: function(xhr, desc, err) {
        console.log(xhr);
        console.log("Details: " + desc + "\nError:" + err);
        }
    });
    e.preventDefault();
});
});