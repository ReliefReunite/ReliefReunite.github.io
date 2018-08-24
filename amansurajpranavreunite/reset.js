const btnReset = document.getElementById('reset-button');

btnReset.addEventListener('click', e=> {
  var auth = firebase.auth();
  //var emailAddress = email;
  const emailAddress = document.getElementById('email').value;
  auth.sendPasswordResetEmail(emailAddress).then(function() {
    swal({
      icon: "success",
      title: "Email Sent!",
      text: "Please Check your email to Reset your Password",
      button: "OK",
      closeOnClickOutside: false
    })
  }).catch(function(error) {
    console.log(error);
    swal({
      icon: "error",
      title: "Oops!",
      text: "It looks like this user does not exist",
      button: "OK",
      closeOnClickOutside: false
    })
  });
})
