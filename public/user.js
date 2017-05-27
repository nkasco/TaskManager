window.addEventListener('load', 
    function() {
        const btnLogout = document.getElementById("btnLogout");

        btnLogout.addEventListener("click", e => {
            firebase.auth().signOut();
        });

        firebase.auth().onAuthStateChanged(firebaseUser => {
            var username = document.getElementById('navTxt1');
            var userHeader = document.getElementById("userHeader");
            
            if(firebaseUser) {
                console.log(firebaseUser);
                var user = firebase.auth().currentUser.email
                username.textContent = " " + user;                
                userHeader.textContent = user;
            } else {
                console.log("Not logged in");
                username.textContent = " Login/Sign Up";
                window.location = "login.html";
            }
        });
    }, false);