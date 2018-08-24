const emailLogin = document.getElementById('emailLogin');
const passwordLogin = document.getElementById('passwordLogin');
const emailSignUp = document.getElementById('emailSignUp');
const passwordSignUp = document.getElementById('passwordSignUp');
const btnLogin = document.getElementById('btnLogin');
const btnSignUp = document.getElementById('btnSignUp');
const btnLogout = document.getElementById('btnLogout');
const name = document.getElementById('nameSignUp');
var err;
const btnGoogleLogin = document.getElementById('btnGoogleLogin');

    btnLogin.addEventListener('click', e =>{
      if(emailLogin.value!=="" && passwordLogin.value!==""){
        const email = emailLogin.value;
        const pass = passwordLogin.value;
        const auth = firebase.auth();

        const promise = auth.signInWithEmailAndPassword(email, pass);

        promise.catch(e => {
          console.log(e.message);
          if(e.message=="The password is invalid or the user does not have a password"|| "The email address is badly formatted."||"There is no user record corresponding to this identifier. The user may have been deleted.")
          {
            swal({
              icon: "error",
              title: "Oops!",
              text: "Your Email or Password is Invalid. Try Again!",
              button: "OK",
              closeOnClickOutside: false
            });
          }
        });
      }
      else{
        swal({
          icon: "error",
          title: "Oops!",
          text: "Please Enter Your Email and Password. Try Again!",
          button: "OK",
          closeOnClickOutside: false
        });
      }
    });

    btnGoogleLogin.addEventListener('click', e=>{
  var provider = new firebase.auth.GoogleAuthProvider();
  const promise = firebase.auth().signInWithPopup(provider);
  promise.catch(e => {
    console.log(e.message);
    });
  });

    btnSignUp.addEventListener('click', e => {
        if(emailSignUp.value!=="" && name.value!=="" && passwordSignUp.value!==""){
          console.log(name.value);
          const email = emailSignUp.value;
          const pass = passwordSignUp.value;
          const auth = firebase.auth();
          const user = auth.currentUser;
          const promise = auth.createUserWithEmailAndPassword(email, pass).then(function(user) {
          firebase.auth().currentUser.updateProfile({displayName: name.value });
        });

          promise.catch(e => {
            console.log(e.message);
            if(e.message=="Password should be at least 6 characters" || e.message == "The password must be 6 characters long or more."){
              swal({
                icon: "error",
                title: "Oops!",
                text: "Your Password is Weak. Try Again!",
                button: "OK",
                closeOnClickOutside: false
              });
            }
            else if(e.message=="The email address is badly formatted.") {
              swal({
                icon: "error",
                title: "Oops!",
                text: "Please Eneter a Valid Email Address. Try Again!",
                button: "OK",
                closeOnClickOutside: false
              });
            }
            else if(e.message=="The email address is already in use by another account."){
              swal({
                icon: "error",
                title: "Oops!",
                text: "This email address has already been used. Try Again!",
                button: "OK",
                closeOnClickOutside: false
              });
            }
          })
        }
        else{
          swal({
            icon: "error",
            title: "Oops!",
            text: "Please Fill out All the fields!",
            button: "OK",
            closeOnClickOutside: false
          });
        }

    });

    firebase.auth().onAuthStateChanged(firebaseUser => {
          if(firebaseUser){
            if(firebaseUser.emailVerified==false){
              window.location = "verify-email.html";
            }
            else{
              window.location = "page1.html";
            }
          }
       });
