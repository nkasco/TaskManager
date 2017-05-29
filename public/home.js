var userID = null;
var initialTaskLoad = false;

window.addEventListener('load', 
    function() {
        var username = document.getElementById('navTxt1');

        firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser) {
                console.log(firebaseUser);                
                username.textContent = " " + firebase.auth().currentUser.email;
                userID = firebase.auth().currentUser.uid;
                if(initialTaskLoad == false){
                    getCurrentList();
                    initialTaskLoad = true;
                }
            } else {
                console.log("Not logged in");
                username.textContent = " Login/Sign Up";
            }
        });
    }, false);

function getCurrentList(){
    //Firebase read operation
    var tasksRef = database.ref('users/' + userID + '/Tasks/').once('value').then(function(snapshot) {;
        snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        
        addListItem(childData);
        });
    });
}

function addListItem(name){
    //Create checkbox and label
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.style.verticalAlign = "middle";
    checkbox.id = name.taskMessage;

    var label = document.createElement("label");
    label.htmlFor = name.taskMessage;
    label.className = "strikethrough";
    label.textContent = name.taskMessage;

    //Add to new div with ID "todoItem"
    var div = document.createElement("div");
    div.id = "todoItem";
    div.innerHTML = checkbox.outerHTML + label.outerHTML;

    //Add new Task to page
    var todos = document.getElementById("textContent");
    todos.appendChild(div);
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