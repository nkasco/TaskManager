var storedNav;
var toggleNav = function(){
    //Expand or collapse navigation bar (tentative values)
    var nav = document.getElementById("leftNav"); 
    var content = document.getElementById("content");
    var search = document.getElementById("searchli");
    var user = document.getElementById("user");
    var home = document.getElementById("home");

    //In-Progress: Get each <li> from leftNav to remove text from//

    if(nav.style.width == "250px"){
        nav.style.width = "50px";
        content.style.marginLeft = "50px"

        //Hide Search
        search.hidden = true;

    } else if(nav.style.width != "250px"){
        nav.style.width = "250px";
        content.style.marginLeft = "250px"

        //Show Search
        search.hidden = false;
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

    if(search.hidden == true){
        search.hidden = false;
    } else {
        search.hidden = true;
    }
}

var Search = function(){
    var query = document.getElementById("search").value;    //Find search query

    //Gather To-Do Items
    var textContent = document.getElementById("textContent");
    var todoItems = textContent.getElementsByTagName("div");

    //Loop through and match search criteria
    for (i = 0; i < todoItems.length; i++) {
        a = todoItems[i].getElementsByTagName("label")[0];
        if (a.textContent.indexOf(query) > -1) {
            todoItems[i].style.display = "";
        } else {
            todoItems[i].style.display = "none";
        }
    }
}

var Task = function(){
    //Capture input
    var name = document.getElementById("create");
    this.completed = false;

    //Create checkbox and label
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
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

    //Revert input to default
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

function unhide(divID) {
    var item = document.getElementById(divID);
    if (item) {
        item.className=(item.className=='hidden')?'unhidden':'hidden';
    }
}