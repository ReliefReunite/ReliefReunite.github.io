var foundImage = document.getElementById('foundImage');
//var uploader = document.getElementById('uploader');

foundImage.addEventListener('change', function(e) {
  //get file
var file = e.target.files[0];

//create a storage ref
//firebase.storage().ref('FoundKid/' + file.name);

//upload file
var task = storageRef.child('FoundKid/' + file.name).put(file);

//var task = storageRef.put(file);

//update progress bar
/*task.on('state_changed',

  function progress(snapshot) {
    var percentage = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
    uploader.value = percentage;

  },

  function error(err) {


  },

  function complete() {


  }




);
*/
// Listen for state changes, errors, and completion of the upload.

// Listen for state changes, errors, and completion of the upload.
task.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  function(snapshot) {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, function(error) {

  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  switch (error.code) {
    case 'storage/unauthorized':
      // User doesn't have permission to access the object
      break;

    case 'storage/canceled':
      // User canceled the upload
      break;

    

    case 'storage/unknown':
      // Unknown error occurred, inspect error.serverResponse
      break;
  }
}, function() {
  // Upload completed successfully, now we can get the download URL
  task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
    console.log('File available at', downloadURL);
    var foundimageURL = downloadURL;
  });
});

});

