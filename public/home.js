var userID = null;

window.addEventListener('load', 
    function() {
        firebase.auth().onAuthStateChanged(firebaseUser => {
            var username = document.getElementById('navTxt1');

            if(firebaseUser) {
                console.log(firebaseUser);                
                username.textContent = " " + firebase.auth().currentUser.email;
                userID = firebase.auth().currentUser.uid;
            } else {
                console.log("Not logged in");
                username.textContent = " Login/Sign Up";
            }
        });
    }, false);

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

    writeUserData(userID, name.value);

    //Revert input to default & deselect
    name.value = "+ Add to-do item...";
    name.blur();

    //Returning false to not make page refresh
    return false;
}

Task.prototype.complete = function(){
    this.completed = true;
    console.log("complete!");
}

Task.prototype.save = function(){
    //Save Function
}

var List = function(name){
    this.name = name;
}

List.prototype.save = function(){
    //Save Function
}

function writeUserData(userID, taskMessage) {
    var taskKey = firebase.database().ref().child('tasks').push().key;

    firebase.database().ref('users/' + userID + '/Tasks/' + taskKey).set({
        taskMessage: taskMessage/*,
        taskList: currentList*/
    });
}

/*function getTasks(){
    firebase.database().ref('/users/' + userID + '/').once('value').then(function(snapshot) {
        var taskList = snapshot.val().username;
    });
}*/