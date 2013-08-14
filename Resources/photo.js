var phWindow = Ti.UI.currentWindow;

var dialog = Ti.UI.createOptionDialog({
	title:"Select image source",
	options:['Camera', 'Photo Gallery', 'Cancel'],
	cancel:2
});

var phButn = Ti.UI.createButton({
	title:"Select"
});

if(Ti.Platform.osname == "iphone"){
	phWindow.leftNavButton = saveBtn;
	phWindow.rightNavButton = phButn;
}else{
	phButn.right = 20;
	phButn.top = 20;
	phWindow.add(phButn);
	
	saveBtn.left = 20;
	saveBtn.top = 20;
	phWindow.add(saveBtn);
}




var binButn = Ti.UI.createButton({
	width:25,
	height:25,
	right:25,
	bottom:25,
	title:"bin",
	zIndex:2,
	visible:false
});

scrollableVw = Ti.UI.createScrollableView({
	left:17,
	top:15,
	width:phWindow.width - 14,
	height: phWindow.height - 25,
	views: [],
	currentPage:0,
	zIndex:1
});



scrollableVw.addEventListener("scroll", function(e){
	
})

phButn.addEventListener("click", function(e){
	dialog.show();
})

dialog.addEventListener("click", function(e){
	Ti.API.info("Your selection:" + e.index);
	
	if(e.index==0){
		Ti.Media.showCamera({
			success:function(){
				var img = e.media;
				if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO){
					var imgVw = Ti.UI.createImageView({
						image:img,
						top:0,
						left:0,
						height:337,
						width:286
					});
					scrollableVw.addView(imgVw);
				}
				
			},
			error:function(){
				var alert = Ti.UI.createAlertDialog({
					title:"Camera Alert"
				});
				if(error.code == Ti.Media.NO_CAMERA){
					alert.setMessage("Device does not have a camera");
				}else{
					alert.setMessage("Unexpected Error" + error.code);
				}
				alert.show();
			},
			cancel:function(){
				
			},
			allowImageEditing:true,
			saveToPhotoGallery:false
		});
	}else if(e.index==1){
		Ti.Media.openPhotoGallery({
			success:function(){
				var img = e.media;
				var imgVw = Ti.UI.createImageView({
					image:img,
					top:0,
					left:0,
					height:337,
					width:286
				});
				scrollableVw.addView(imgVw);
			},
			cancel:function(){}
		});
	}else{
		
	}
});

var saveBtn = Ti.UI.createButton({
	title:"Save",
	zIndex:2
});

saveBtn.addEventListener("click", function(e){
	var media = scrollableVw.toImage();
	
	var dir = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "photos");
	
	if(!dir.exists()){
		dir.createDirectory();
	}
	
	var fileName = 'photo- ' + scrollableVw.currentPage.toString() + '.png';
	
	writeFile = Ti.Filesystem.getFile(dir.nativePath, fileName);
	writeFile.write(media);
	
	alert(fileName + " saved to " + dir.nativePath);
	
	var _imgFile = Ti.Filesystem.getFile(dir.nativePath, fileName);
	
	if(!_imgFile.exists()) {
		Ti.API.info("ERROR: File " +fileName+ " in directory " + dir.nativePath + " does not exist");
	}else{
		Ti.API.info("File: " +fileName+ " in directory " + dir.nativePath + " exists");
	}
	
});

binButn.addEventListener("click", function(e){
	var phDir = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "photos");
	
	var fileNm = 'photo-' + scrollableVw.currentPage.toString() + '.png';
	
	var imgFile = Ti.Filesystem.getFile(phDir.nativePath, fileNm);
	
	if(imgFile.exists()){
		imgFile.deleteFile();
		alert('File ' +fileNm+ ' has been deleted');
	}
});

phWindow.add(binButn);
phWindow.add(scrollableVw);


//phWindow.rightNavButton = phButn;
