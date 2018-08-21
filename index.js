firebase.auth().onAuthStateChanged(firebaseUser => {
  const hide = document.getElementById('hide');
  if(firebaseUser){
    hide.classList.remove('hide');
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

  }
  else{
    hide.classList.add('hide');
  }
});
