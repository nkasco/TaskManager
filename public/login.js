window.addEventListener('load', 
    function() {
        const txtUsername = document.getElementById("txtUsername");
        const txtPassword = document.getElementById("txtPassword");
        const btnLogin = document.getElementById("btnLogin");
        const btnRegister = document.getElementById("btnRegister");
        const btnLogout = document.getElementById("btnLogout");

        btnLogin.addEventListener("click", e => {
            const email = txtUsername.value;
            const password = txtPassword.value;
            const auth = firebase.auth();

            const promise = auth.signInWithEmailAndPassword(email, password);
            promise.catch(e => console.log(e.message));
        });

        btnRegister.addEventListener("click", e => {
            const email = txtUsername.value;
            const password = txtPassword.value;
            const auth = firebase.auth();

            const promise = auth.createUserWithEmailAndPassword(email, password);
            promise.catch(e => console.log(e.message));
        });

        btnLogout.addEventListener("click", e => {
            firebase.auth().signOut();
        });

        firebase.auth().onAuthStateChanged(firebaseUser => {
            var username = document.getElementById('navTxt1');

            if(firebaseUser) {
                console.log(firebaseUser);
                btnLogout.classList.remove('hidden');
                username.textContent = " " + firebase.auth().currentUser.email;
            } else {
                console.log("Not logged in");
                btnLogout.classList.add('hidden');
                username.textContent = " Login/Sign Up";
            }
        });
}, false);