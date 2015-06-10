

$(document).ready( function() {
    
var $timeLog = $('#timeLogButton');
    
$timeLog.click(function () {
    var $getTimecode = popcorn.currentTime();
    var $footnoteEnd = $getTimecode + 2;
    var $target = $('video').attr('id');
    $.ajax({
        url: 'php/pdoConnect.php',
        type: 'post',
        cache: 'false',
        data: {'action': 'getTimecode', 'timecode': $getTimecode, 'filmName': 'Hugo', 'markerType': 'Scene Change', 'start': $getTimecode, 'end': $footnoteEnd, 'text': 'Scene Change', 'target': $target },
        success: function(data, status) {
                if (data) {
                    console.log(data); 
                }
            },
        error: function(xhr, desc, err) {
        console.log(xhr);
        console.log("Details: " + desc + "\nError:" + err);
        }
    });
})
});