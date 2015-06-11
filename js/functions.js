
//Global Functions

//Set up a prototype for the String class to convert seconds (float) to HHMMSS format for display
String.prototype.toHHMMSS = function() {
    var sec_num = parseFloat(this, 10);
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
    var appendTo = $(selector).append('<span href="#" id="sceneChangeMark"><span #id="sceneChangeText">' + text + '&nbsp' + start.toHHMMSS() + '</span><br /><span id="sceneChangeTimeSec">'+ start +'</span></span><br />');
    return appendTo;
    };

