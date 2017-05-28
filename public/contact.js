window.addEventListener('load', 
    function() {
        var btnSubmit = document.getElementById('btnSubmit');

        btnSubmit.addEventListener('click', e => {
            var name = document.getElementById('contactName').value;
            var email = document.getElementById('contactEmail').value;
            var message = document.getElementById('contactMessage').value;

            alert(name + email + message);
        });

        firebase.auth().onAuthStateChanged(firebaseUser => {
            var username = document.getElementById('navTxt1');
            
            if(firebaseUser) {
                console.log(firebaseUser);                
                username.textContent = " " + firebase.auth().currentUser.email;
            } else {
                console.log("Not logged in");
                username.textContent = " Login/Sign Up";
            }
        });
    }, false);