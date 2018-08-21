firebase.auth().onAuthStateChanged(firebaseUser => {
  const hideLogout = document.getElementById('hideLogout');
  const btnReunite = document.getElementById('btnReunite');
  if(firebaseUser){
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
    btnReunite.addEventListener('click', e=> {
      window.location="page1.html";
    });
  }
  else{
    btnReunite.addEventListener('click', e=> {
      window.location="login.html";
    });
    hideLogout.classList.add('hide');
  }
});
