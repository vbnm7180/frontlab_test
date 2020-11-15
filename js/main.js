window.onload = function() {
    var oAJAX = new XMLHttpRequest;
    oAJAX.open("GET", "https://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture", true);
    oAJAX.onreadystatechange = function() {
        if (oAJAX.readyState == 4 && oAJAX.status == 200) {
            var data = JSON.parse(oAJAX.responseText);
            var users = data.results;
            for (user of users) {
                var item = document.createElement("div");
                item.className = "list__block";
                item.innerHTML = "<div class=\"list__item\"><img class=\"item__image\" src=\"" + user.picture.medium + "\"><div class=\"item__name\">" + user.name.title.toUpperCase() + " " + user.name.first.toUpperCase() + " " + user.name.last.toUpperCase() + "</div></div>";

                item.innerHTML = item.innerHTML + "<div class=\"popup\"><div class=\"popup__header\"><img src=\"images/cancel.svg\" class=\"exit\"></div><div class=\"popup__content\"><img src=\"" + user.picture.large + "\" class=\"popup__image\"><div class=\"popup__info\"><div class=\"popup__street\">STREET: " + user.location.street.toUpperCase() + "</div><div class=\"popup__city\">CITY: " + user.location.city.toUpperCase() + "</div><div class=\"popup__state\">STATE: " + user.location.state.toUpperCase() + "</div><div class=\"popup__mail\">EMAIL: " + user.email + "</div><div class=\"popup__phone\">PHONE: " + user.phone + "</div></div></div></div>";

                document.querySelector(".list__container").appendChild(item);

            }

        }

    }
    oAJAX.send();



}

document.querySelector(".list__container").addEventListener('click', function(e) {
    if (e.target.closest(".list__item")) {
        e.target.closest(".list__item").nextSibling.style.display = "block";
    }
});

document.querySelector(".list__container").addEventListener('click', function(e) {
    if (e.target.className == 'exit') {
        e.target.closest(".popup").style.display = "none";
    }
});

document.querySelector(".sort__btn").addEventListener('click', function() {
    var list = document.querySelectorAll(".list__block");
    list = Array.from(list);



    if (document.querySelector(".sort__types").value == "1") {
        list.sort(function(a, b) {
            if (a.firstChild.textContent > b.firstChild.textContent) return 1;
            else return -1;
        });
    } else {
        list.sort(function(a, b) {
            if (a.firstChild.textContent < b.firstChild.textContent) return 1;
            else return -1;
        });
    }
    var list__container = document.querySelector(".list__container").innerHTML;
    list__container = "";
    for (item of list) {
        document.querySelector(".list__container").appendChild(item);
    }
});