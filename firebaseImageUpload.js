
firebase.auth().onAuthStateChanged(firebaseUser => {

  const hide = document.getElementById('hideLogout');
if(firebaseUser){
  if(firebaseUser.emailVerified===true){
var foundImage = document.getElementById('foundImage');
var lostImage = document.getElementById('lostImage');
var foundimageURL;
var lostimageURL;
var fileTypeF;
var fileTypeL;
const leadTimestamp = Math.floor(Date.now() / 1000);
const leadTimestampL = Math.floor(Date.now() / 1000);
const btnLogout = document.getElementById('btnLogout');

btnLogout.classList.remove('hide');
//var uploader = document.getElementById('uploader');

/*BEGIN USER GREETING*/
const userPicElement = document.getElementById('user-pic');
const userNameElement = document.getElementById('user-name');

// Returns the signed-in user's profile Pic URL.
function getProfilePicURL(){
  return firebase.auth().currentUser.photoURL || '/assets/images/profile_placeholder.png';
}

// Returns the signed-in user's display name.
function getUserName() {
  return firebase.auth().currentUser.displayName;
}

    // Get the signed-in user's profile pic and name.
    var profilePicUrl = getProfilePicURL();
    var userName = getUserName();

    // Set the user's profile pic and name.
    userPicElement.innerHTML =  `<img src='${profilePicUrl}' id="user-pic">`;
    if(userName === null){
    userNameElement.innerHTML = `<b>Welcome, User</b>`;
    }
    else{
    userNameElement.innerHTML = `<b>Welcome, ${userName}</b>`;
  }
  /*END USER GREETING*/


btnLogout.addEventListener('click', e=> {
        swal({
        icon: "warning",
        title: "Are You Sure?",
        buttons: ["Back", "Log Out!"],
        dangerMode: true,
        closeOnClickOutside: false})
        .then((willDelete) => {
            if(willDelete){
                firebase.auth().signOut();
                window.location="index.html";
            }
            else{

            }
          });
          });

foundImage.addEventListener('change', function(e) {
  //get file
var file = e.target.files[0];

//create a storage ref
//firebase.storage().ref('FoundKid/' + file.name);
//upload file
var task = storageRef.child(`FoundKid/${firebase.auth().currentUser.email}_${leadTimestamp}`).put(file);
fileTypeF = file.name.split('.').pop();
// Listen for state changes, errors, and completion of the upload.
task.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  function(snapshot) {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    document.getElementById('foundProgressBar').innerHTML = `Upload is ${Math.round(progress)}% done`
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
var task = storageRef.child(`LostKid/${firebase.auth().currentUser.email}_${leadTimestampL}`).put(file);
fileTypeL = file.name.split('.').pop();
// Listen for state changes, errors, and completion of the upload.
task.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  function(snapshot) {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    document.getElementById('lostProgressBar').innerHTML = `Upload is ${Math.round(progress)}% done`
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
  document.getElementById('Name').value = firebase.auth().currentUser.displayName;
  document.getElementById('Email').value = firebase.auth().currentUser.email;
document.getElementById('submitFound').addEventListener('click', event => {
  const KidName = document.getElementById('KidName').value;
  const Phone = document.getElementById('Phone').value;
  const Age = document.getElementById('Age').value;
  const IdentificationMark = document.getElementById('IdentificationMark').value;
  const message = document.getElementById('message').value;
  const Success = 'No'
  const FaceToken = 'Null'
  const MatchedUUID = 'Null'

if(Phone != "" && KidName != "" && Name != "" && EmailL!= "" && message!="" && Age!="" && IdentificationMark!="") {
  if(lostimageURL==null){
    swal({
      icon: "error",
      title: "Oops!",
      text: "Please Upload the Image of the person.",
      button: "Upload",
      closeOnClickOutside: false
    });
  }



    firebase.database().ref('Found').once('value', snapshot => {



    firebase.database().ref('Found').push({
      Name: firebase.auth().currentUser.displayName,
      Phone: Phone,
      KidName: KidName,
      fileType: fileTypeF,
      Email: firebase.auth().currentUser.email,
      Age: Age,
      IdentificationMark: IdentificationMarkL,
      Message: message,
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

document.getElementById('NameL').value = firebase.auth().currentUser.displayName;
document.getElementById('EmailL').value = firebase.auth().currentUser.email;

document.getElementById('submitLost').addEventListener('click', event => {
  const KidNameL = document.getElementById('KidNameL').value;
  const PhoneL = document.getElementById('PhoneL').value;
  const AgeL = document.getElementById('AgeL').value;
  const IdentificationMarkL = document.getElementById('IdentificationMarkL').value;
  const messageL = document.getElementById('messageL').value;
  const SuccessL = 'No'
  const FaceTokenL = 'Null'
  const MatchedUUIDL = 'Null'
if(PhoneL != "" && KidNameL != "" && NameL != "" && EmailL!= "" && messageL!="" && AgeL!="" && IdentificationMarkL!="") {
  if(lostimageURL==null){
    swal({
      icon: "error",
      title: "Oops!",
      text: "Please Upload the Image of the person.",
      button: "Upload",
      closeOnClickOutside: false
    });
  }
    firebase.database().ref('Lost').once('value', snapshot => {

      firebase.database().ref('Lost').push({
        Name: firebase.auth().currentUser.displayName,
        Phone: PhoneL,
        KidName: KidNameL,
        fileType: fileTypeL,
        Email: firebase.auth().currentUser.email,
        Age: AgeL,
        IdentificationMark: IdentificationMarkL,
        Message: messageL,
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

}
else{
  const hide = document.getElementById('hide');
  hide.classList.add('hide');
  swal({
    icon: "error",
    title: "Oops!",
    text: "Sorry, You have to Verify your email account before using it!",
    button: "Verify",
    closeOnClickOutside: false
  }).then(function(){
    window.location = "verify-email.html";
  });
}

}

else{
  const hide = document.getElementById('hideLogout');
  hide.classList.add('hide');
  swal({
    icon: "error",
    title: "Oops!",
    text: "Sorry, You have to Sign In to Submit your data!",
    button: "Sign In!",
    closeOnClickOutside: false
  }).then(function(){
    window.location = "login.html";
  });
}

});
