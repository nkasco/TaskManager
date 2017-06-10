window.addEventListener('load', 
    function() {
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser) {
                getAllListItems();
            }
        });
    }, false);

function getAllListItems(){
    var tasksRef = database.ref('users/' + userID + '/Tasks/').once('value').then(function(snapshot) {;
        listCompletedItems();
        snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        
        addListItem(childData);
        });
    });
}