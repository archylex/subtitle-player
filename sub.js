var subs = {};
var player;
var progressBar;

function getSeconds(t) {
	var ts = t.split(":");
	return parseInt(ts[0]) * 3600 + parseInt(ts[1]) * 60 + parseFloat(ts[2]);
}

function getTimeline(t) {
	var hours = parseInt(t / 3600, 10).toString().padStart(2, '0');    
	var minutes = parseInt(t / 60, 10).toString().padStart(2, '0');    
    var seconds = parseInt(t % 60).toString().padStart(2, '0');
    return hours + ":" + minutes + ":" + seconds;
}

$(document).ready(function() {
	player = document.getElementById("iplayer");
	progressBar = document.getElementById("progress"); 
	volumeProgressBas = document.getElementById("volume_progress"); 

	$("input[name='sub_lang']").filter(function() {
		$.get($(this).val(), null, function(data) {
			subs[data["lang"]] = {
				"sub" : data["sub"],
				"checked" : false
			}
			for (var m in subs[data["lang"]]["sub"]) {
				subs[data["lang"]]["sub"][m]["start"] = getSeconds(subs[data["lang"]]["sub"][m]["start"]);
				subs[data["lang"]]["sub"][m]["end"] = getSeconds(subs[data["lang"]]["sub"][m]["end"]);
			}			
		}, "json");		
	});
		
	function updateProgressBar(curTime, length) {
		progressBar.max = length;
		progressBar.value = curTime;
	}
	
	$("#progress").click(function(e) {
		var percent = e.offsetX / this.offsetWidth;
    	player.currentTime = percent * player.duration;
	});

	$("#volume_progress").click(function(e) {
		var percent = e.offsetX / this.offsetWidth;
    	player.volume = percent;
    	volumeProgressBas.max = 100;
		volumeProgressBas.value = percent * 100;
	});

	$("button[name='switch']").click(function() {
		subs[$(this).val()]["checked"] == true ? subs[$(this).val()]["checked"] = false : subs[$(this).val()]["checked"] = true;
	});
	
	$("button[name='play']").click(function() {
		player.play();				
	});

	$("button[name='pause']").click(function() {
		player.pause();
	});

	$("button[name='stop']").click(function() {
		player.pause();
		player.currentTime = 0;
	});

	player.ontimeupdate = function() {
		updateProgressBar(player.currentTime, player.duration);
		$("#time").html(getTimeline(player.currentTime));
		$("#sub").html(""); 		
		var txt = "";		
		for (var k in subs) {
			if (subs[k]["checked"] == true) {
				for (var m in subs[k]["sub"]) {
					if (player.currentTime >= subs[k]["sub"][m]["start"] && player.currentTime <= subs[k]["sub"][m]["end"]) {
						txt += subs[k]["sub"][m]["text"] + "<br>"; 
					}
				}
			}
		}
		$("#sub").html(txt);		
	}
});