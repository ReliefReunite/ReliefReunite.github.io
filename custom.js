/**
 * Writing code to compress image using JIC image compressor
 */
//function we use to convert encoded url form of image data into blob type image data
function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}

function showPreview(){
	//read file object and extract image as encoded url
	file = document.querySelector("input[type=file]").files[0];
	preview = document.querySelector("img");
	reader = new FileReader();
	
	reader.addEventListener("load", function () {
		preview.src = reader.result;
	  }, false);

    reader.readAsDataURL(file);
}

app = angular.module("demoApp",[]);
app.controller('demoController', ['$scope', '$http', function($scope, $http) {
	$scope.compressAndUpload = function(){
		
        src_img = document.querySelector("img");
    	target_img = document.createElement("IMG");
    	target_img.src = jic.compress(src_img,50,'jpg').src;
    	
    	//convert base64 to blob and append to formdata
    	blob = dataURItoBlob(target_img.src);
    	blob.filename="demofile.png";
    	
    	//create form data
    	fd = new FormData();
    	fd.append('demoimage', blob,"demofile.png".replace(/\.[^/.]+$/, ".jpg"));
        
        $http.post("#", fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).success(function(data) {
        	console.log(data);
        	alert("done!");
        }).error(function(error) {
            console.log(error);
        });
	};
	
	
}]);