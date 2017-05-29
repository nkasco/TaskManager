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

    if(search){
        search.className=(search.className=='hidden')?'unhidden':'hidden';
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