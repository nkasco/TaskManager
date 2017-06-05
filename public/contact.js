window.addEventListener('load', 
    function() {
        var btnSubmit = document.getElementById('btnSubmit');

        btnSubmit.addEventListener('click', e => {
            var name = document.getElementById('contactName').value;
            var email = document.getElementById('contactEmail').value;
            var message = document.getElementById('contactMessage').value;

            alert(name + email + message);
        });
    }, false);