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
                                    
                                    appendHTML('.sceneChangeMarkers',$text,$start);
                                    
                   
                                }

                      });

                    timeScrubbing('.sceneChangeMarkers','.sceneChangeMark');
                    addPagination('.sceneChangeMark',25);

                    
                    
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