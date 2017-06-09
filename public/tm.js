var userID = null;
var currentList = null;

window.addEventListener('load', 
    function() {
        firebase.auth().onAuthStateChanged(firebaseUser => {
            var username = document.getElementById('navTxt1');
            
            if(firebaseUser) {
                console.log(firebaseUser);                
                username.textContent = " " + firebase.auth().currentUser.email;
                userID = firebase.auth().currentUser.uid;
                loadLists();
            } else {
                console.log("Not logged in");
                username.textContent = " Login/Sign Up";
            }
        });
    }, false);

function loadLists(){
    var listsRef = database.ref('users/' + userID + '/Lists/').once('value').then(function(snapshot) {;
        snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        
        var leftNav = document.getElementById('leftNav');
        var lastLi = leftNav.lastElementChild;

        var li = document.createElement('li');

        var img = document.createElement('img');
        img.src = "images/list.png";

        var a = document.createElement('a');
        li.appendChild(a);
        a.innerHTML = img.outerHTML + " " + childData.listName;
        a.href = "javascript:;";

        li.addEventListener('click', 
            function(){
                currentList = childData.listName;
                loadList(childData.listName);
                highlightNavItem(a);
            }, false);

        leftNav.lastElementChild.remove();
        leftNav.appendChild(li);
        leftNav.appendChild(lastLi);
        });
    });
}

var toggleNav = function(){
    //Expand or collapse navigation bar (tentative values)
    var nav = document.getElementById("leftNav"); 
    var content = document.getElementById("content");
    var search = document.getElementById("searchli");
    var searchToggle = document.getElementById('searchToggle');

    //In-Progress: Get each <li> from leftNav to remove text from//

    if(nav.style.width == "250px"){
        nav.style.width = "50px";
        content.style.marginLeft = "50px"

        //Hide Search
        search.hidden = true;
        searchToggle.classList.add('hidden');
        if(search.classList != 'hidden'){ search.className = 'hidden'}

    } else if(nav.style.width != "250px"){
        nav.style.width = "250px";
        content.style.marginLeft = "250px"

        //Show Search
        search.hidden = false;
        searchToggle.classList.remove('hidden');
    }

    var navs = [
        "navTxt1",
        "navTxt2",
        "navTxt3",
        "navTxt4",
        "navTxt5",
        "navTxt6"
    ];
    navs.forEach(function(element) {
        var item = document.getElementById(element);
        if (item) {
            item.className=(item.className=='hidden')?'unhidden':'hidden';
        }
    }, this);
}

var toggleSearch = function(){
    var search = document.getElementById("searchli");
    var searchbox = document.getElementById('search');

    if(search){
        if(search.className == 'hidden'){
            search.className = 'unhidden';
            searchbox.focus();
        } else {
            search.className = 'hidden';
            searchbox.blur();
        }
    }
}

//In-Progress: Convert search to filter and add a global search for searching all lists
var Search = function(){
    if(window.location.href.indexOf("index") > -1){
        var query = document.getElementById("search").value.toUpperCase();    //Find search query

        //Gather To-Do Items
        var textContent = document.getElementById("textContent");
        var todoItems = textContent.getElementsByTagName("div");

        //Loop through and match search criteria
        for (i = 0; i < todoItems.length; i++) {
            a = todoItems[i].getElementsByTagName("label")[0];
            if (a.textContent.toUpperCase().indexOf(query) > -1) {
                todoItems[i].style.display = "";
            } else {
                todoItems[i].style.display = "none";
            }
        }
    } else {
        console.log("Global search coming soon");
    }
}

function unhide(divID) {
    var item = document.getElementById(divID);
    if (item) {
        item.className=(item.className=='hidden')?'unhidden':'hidden';
    }
}

function loginUserLink(){
    firebase.auth().onAuthStateChanged(firebaseUser => {
        var user = document.getElementById('login');

        if(firebaseUser) {
            user.href = "user.html";
        } else {
            user.href = "login.html";
        }
    });
}

function loadList(selectedListName){
    var tasksRef = database.ref('users/' + userID + '/Tasks/').once('value').then(function(snapshot) {;
        clearListItems();
        snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        
        if(childData.taskList == selectedListName){
            addListItem(childData);
        }
        });
    });
}

function clearListItems(){
    var contentAreas = ["textContent","contactContent","userContainer"];

    contentAreas.forEach(function(content) {
        if(document.getElementById(content)){
            document.getElementById(content).innerHTML = null;
        }
    }, this);
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
    var contentAreas = ["textContent","contactContent","userContent"];

    contentAreas.forEach(function(content) {
        if(document.getElementById(content)){
            var todos = document.getElementById(content);
            todos.appendChild(div);
        }
    }, this);
}

function highlightNavItem(item){
    //Inactivate current item
    var navItems = document.getElementById('leftNav').getElementsByTagName('a');
    var count = 0;
    while(count < navItems.length){
        if(navItems[count].className == "active"){
            navItems[count].className = null;
        }
        count++;
    }

    //Set selected item as active
    item.className=(item.className=='active')?'':'active';
}

/*
var addResizeEvent = function(object, type, callback) {
    if (object == null || typeof(object) == 'undefined') return;
    if (object.addEventListener) {
        object.addEventListener(type, callback, false);
    } else if (object.attachEvent) {
        object.attachEvent("on" + type, callback);
    } else {
        object["on"+type] = callback;
    }
};

addResizeEvent(window, "resize", function(event) {
  //TODO: Add conditions if size is less than X
  //Minimum height to display nav: 350 (not including search)
  if(window.innerWidth < 960){
      console.log("less than 960");
      //Add adjustment handlers here
  }
});*/