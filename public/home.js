window.addEventListener('load', 
    function() {
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