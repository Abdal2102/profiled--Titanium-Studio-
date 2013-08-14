var vWindow = Ti.UI.currentWindow;

var vidFilepath = "video/video-test.mp4";

var vButn = Ti.UI.createButton({
	title:"Rec"
});

if (Ti.Platform.osname=="iphone"){
	vWindow.rightNavButton = vButn;
}else{
	vButn.right = 20;
	vButn.top = 20;
	vWindow.add(vButn);
}


function movPlay(){
	var moviVideo = Ti.Media.createVideoPlayer({
		url:videoFilePath,
		width:280,
		height:240,
		top:30,
		left:20,
		backgroungColor:"#000"
	});
	
	vWindow.add(moviVideo);
	moviVideo.play();
}

vButn.addEventListener("click", function(e){
	if (vButn.title == "Rec"){
		Ti.Media.showCamera({
			success:function(){
				var vidContent = e.media;
				movie = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "myMovie.mov");
				movie.write(vidContent);
				vidFilepath = movie.nativePath;
				vButn.title = "Play";
				
			},
			error:function(){
				var alert = Ti.UI.createAlertDialog({title:"Video Alert"});
				
				if (error.code = Ti.Media.NO_CAMERA){
					alert.setMessage("Device has no camera functionality");
				}else{
					alert.setMessage("Unexpected error"+ error.code);
				}
				alert.show();
			},
			cancel:function(){
				
			},
			videoMaximumDuration:30000,
			videoQuality:Ti.Media.QUALITY_HIGH,
			mediaTypes:Ti.Media.MEDIA_TYPE_VIDEO
		});
	}else{
		movPlay();
	}
});

