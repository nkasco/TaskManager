window.addEventListener('load', 
    function() {
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser) {
                getCurrentList();
            }
        });
    }, false);

function getCurrentList(){
    //Firebase read operation on page load (only occurs once)

    //Get the current list from Firebase, then get the list items

    var tasksRef = database.ref('users/' + userID + '/Tasks/').once('value').then(function(snapshot) {;
        snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        
        addListItem(childData);
        });
    });
}

var Task = function(){
    //Capture input
    var name = document.getElementById("create");
    this.completed = false;

    //Create checkbox and label
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.style.verticalAlign = "middle";
    checkbox.id = name.value;

    var label = document.createElement("label");
    label.htmlFor = name.value;
    label.className = "strikethrough";
    label.textContent = name.value;

    //Add to new div with ID "todoItem"
    var div = document.createElement("div");
    div.id = "todoItem";
    div.innerHTML = checkbox.outerHTML + label.outerHTML;

    //Add new Task to page
    var todos = document.getElementById("textContent");
    todos.appendChild(div);

    //Update Firebase
    writeUserData(userID, name.value);

    //Revert input to default & deselect
    name.value = "+ Add to-do item...";
    name.blur();

    //Returning false to not make page refresh
    return false;
}