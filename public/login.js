window.addEventListener('load', 
    function() {
        const txtUsername = document.getElementById("txtUsername");
        const txtPassword = document.getElementById("txtPassword");
        const btnLogin = document.getElementById("btnLogin");
        const btnRegister = document.getElementById("btnRegister");

        document.getElementById('loginForm').onkeypress=function(e){
            if(e.keyCode==13){
                btnLogin.click();
            }
        }

        btnLogin.addEventListener("click", e => {
            const email = txtUsername.value;
            const password = txtPassword.value;
            const auth = firebase.auth();
            var invalid = document.getElementById('incorrectLogin');


            const promise = auth.signInWithEmailAndPassword(email, password);
            promise.catch(e => {
                console.log(e.message);
                invalid.textContent = e.message;
                invalid.classList.remove('hidden');
            });
        });

        btnRegister.addEventListener("click", e => {
            const email = txtUsername.value;
            const password = txtPassword.value;
            const auth = firebase.auth();
            var invalid = document.getElementById('incorrectLogin');

            const promise = auth.createUserWithEmailAndPassword(email, password);
            promise.catch(e => {
                console.log(e.message);
                invalid.textContent = e.message;
                invalid.classList.remove('hidden');
            });
        });

        firebase.auth().onAuthStateChanged(firebaseUser => {
            var username = document.getElementById('navTxt1');

            if(firebaseUser) {
                console.log(firebaseUser);
                window.location = "user.html";
                username.textContent = " " + firebase.auth().currentUser.email;
            } else {
                console.log("Not logged in");
                username.textContent = " Login/Sign Up";
            }
        });
}, false);