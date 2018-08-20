var foundImage = document.getElementById('foundImage');
var lostImage = document.getElementById('lostImage');
var foundimageURL;
var lostimageURL;
const leadTimestamp = Math.floor(Date.now() / 1000);
const leadTimestampL = Math.floor(Date.now() / 1000);
//var uploader = document.getElementById('uploader');

foundImage.addEventListener('change', function(e) {
  //get file
var file = e.target.files[0];

//create a storage ref
//firebase.storage().ref('FoundKid/' + file.name);

//upload file
var task = storageRef.child(`FoundKid/${leadTimestamp}/${file.name}`).put(file);

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
    foundimageURL = downloadURL;

  });
});

});

//console.log('File available at' + foundimageURL);
lostImage.addEventListener('change', function(e) {
  //get file
var file = e.target.files[0];

//create a storage ref
//firebase.storage().ref('FoundKid/' + file.name);

//upload file
var task = storageRef.child(`LostKid/${leadTimestampL}/${file.name}`).put(file);

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
    lostimageURL = downloadURL;
  });
});

});
const storageService = firebase.storage();
const storageRef = storageService.ref();

document.getElementById('submitFound').addEventListener('click', event => {
  const Name = document.getElementById('Name').value;
  const KidName = document.getElementById('KidName').value;
  const Phone = document.getElementById('Phone').value;
  const Email = document.getElementById('Email').value;
  const Success = 'No'
  const FaceToken = 'Null'
  const MatchedUUID = 'Null'

if(Phone != "" && KidName != "" && Name != "" && EmailL!= "") {
  if(lostimageURL==null){
    swal({
      icon: "error",
      title: "Oops!",
      text: "Please Upload the Image of the person Found",
      button: "Upload",
      closeOnClickOutside: false
    });
  }



    firebase.database().ref('Found').once('value', snapshot => {



    firebase.database().ref('Found').push({
      Name: Name,
      Phone: Phone,
      KidName: KidName,
      Email: Email,
      Success: Success,
      FaceToken: FaceToken,
      MatchedUUID: MatchedUUID,
      foundimageURL: foundimageURL,
      timestamp: leadTimestamp
    });
    swal({
      icon: "success",
      title: "Success",
      text: "Thank you for filling out this form, we will get back to you as soon as possible",
      button: "OK",
      closeOnClickOutside: false
    }).then(function() {
        location.reload();
    });
    $('.contact-form').hide();
    $('.message-sent-success').show();

  }, function(error) {
    console.log(error);
  });
} else {
  swal({
    icon: "error",
    title: "Oops!",
    text: "Please Fill out all the fields",
    button: "Fill out all the Fields!",
    closeOnClickOutside: false
  });
  }
});

document.getElementById('submitLost').addEventListener('click', event => {
  const NameL = document.getElementById('NameL').value;
  const KidNameL = document.getElementById('KidNameL').value;
  const PhoneL = document.getElementById('PhoneL').value;
  const EmailL = document.getElementById('EmailL').value;
  const SuccessL = 'No'
  const FaceTokenL = 'Null'
  const MatchedUUIDL = 'Null'
if(PhoneL != "" && KidNameL != "" && NameL != "" && EmailL!= "") {
  if(lostimageURL==null){
    swal({
      icon: "error",
      title: "Oops!",
      text: "Please Upload the Image of the person Found",
      button: "Upload",
      closeOnClickOutside: false
    });
  }
    firebase.database().ref('Lost').once('value', snapshot => {

      firebase.database().ref('Lost').push({
        Name: NameL,
        Phone: PhoneL,
        KidName: KidNameL,
        Email: EmailL,
        Success: SuccessL,
        FaceToken: FaceTokenL,
        MatchedUUID: MatchedUUIDL,
        lostimageURL: lostimageURL,
        timestamp: leadTimestampL
      });

      swal({
        icon: "success",
        title: "Success",
        text: "Thank you for filling out this form, we will get back to you as soon as possible",
        button: "OK",
        closeOnClickOutside: false
      }).then(function() {
          location.reload();
      });

    }, function(error) {
      console.log(error);
    });
  } else {
    swal({
      icon: "error",
      title: "Oops!",
      text: "Please Fill out all the fields",
      button: "Fill out all the Fields!",
      closeOnClickOutside: false
    });
    }
});
