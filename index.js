firebase.auth().onAuthStateChanged(firebaseUser => {
  const hideLogout = document.getElementById('hideLogout');
  const btnReunite = document.getElementsByClassName('btnReunite');
  if(firebaseUser){
    const btnLogout = document.getElementById('btnLogout');
      btnLogout.classList.remove('hide');
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

//Closes the navbar on click
$(function(){
    var navMain = $(".navbar-collapse");
    navMain.on("click", "a:not([data-toggle])", null, function () {
        navMain.collapse('hide');
    });
});

//highlights the nav-items on scroll
var sections = $('section')
  , nav = $('nav')
  , nav_height = nav.outerHeight();

$(window).on('scroll', function () {
  var cur_pos = $(this).scrollTop();

  sections.each(function() {
    var top = $(this).offset().top - nav_height,
        bottom = top + $(this).outerHeight();

    if (cur_pos >= top && cur_pos <= bottom) {
      nav.find('a').removeClass('active');
      sections.removeClass('active');

      $(this).addClass('active');
      nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
    }
  });
});
