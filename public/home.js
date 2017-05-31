var userID = null;

window.addEventListener('load', 
    function() {
        var username = document.getElementById('navTxt1');

        firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser) {
                console.log(firebaseUser);                
                username.textContent = " " + firebase.auth().currentUser.email;
                userID = firebase.auth().currentUser.uid;
                getCurrentList();
            } else {
                console.log("Not logged in");
                username.textContent = " Login/Sign Up";
                window.location = "login.html";
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

    //Update Firebase
    writeUserData(userID, name.value);

    //Revert input to default & deselect
    name.value = "+ Add to-do item...";
    name.blur();

    //Returning false to not make page refresh
    return false;
}

var List = function(name){
    this.name = name;
    var leftNav = document.getElementById('leftNav');

    var li = document.createElement('li');

    var img = document.createElement('img');
    img.src = "images/list.png";

    var a = document.createElement('a');
    li.appendChild(a);
    a.innerHTML = img.outerHTML + " " + name;
    a.href = "#";

    leftNav.appendChild(li);

    //writeListData(userID, name);

    return false;
}

function writeUserData(userID, taskMessage) {
    var taskKey = firebase.database().ref().child('tasks').push().key;

    firebase.database().ref('users/' + userID + '/Tasks/' + taskKey).set({
        taskMessage: taskMessage/*,
        taskList: currentList*/
    });
}

function writeListData(userID, listName){
    var listKey = firebase.database().ref().child('tasks').push().key;

    firebase.database().ref('users/' + userID + '/Tasks/' + listKey).set({
    listName: listName/*,
    taskList: currentList*/
    });   
}