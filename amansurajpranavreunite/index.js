firebase.auth().onAuthStateChanged(firebaseUser => {



  const hideLogout = document.getElementById('hideLogout');
  const btnReunite = document.getElementsByClassName('btnReunite');
  if(firebaseUser){

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


    hideLogout.classList.remove('hide');
    const btnLogout = document.getElementById('btnLogout');
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
            for(var i=0; i<btnReunite.length; i++){
              btnReunite[i].addEventListener('click', e=> {
              window.location="page1.html";
    });}
  }
  else{
  hideLogout.classList.add('hide');
  for(var i=0; i<btnReunite.length; i++){
    btnReunite[i].addEventListener('click', e=> {
      window.location="login.html";
    });}
  }
});
