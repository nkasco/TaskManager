window.addEventListener('load', 
    function() {
        const btnLogout = document.getElementById("btnLogout");

        btnLogout.addEventListener("click", e => {
            firebase.auth().signOut();
        });

        firebase.auth().onAuthStateChanged(firebaseUser => {
            var userHeader = document.getElementById("userHeader");
            
            if(firebaseUser) {
                var user = firebase.auth().currentUser.email
                userHeader.textContent = user;
            }
        });
    }, false);