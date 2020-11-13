window.onload = function() {
    var oAJAX = new XMLHttpRequest;
    oAJAX.open("GET", "https://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture", true);
    oAJAX.onreadystatechange = function() {
        if (oAJAX.readyState == 4 && oAJAX.status == 200) {
            var data = JSON.parse(oAJAX.responseText);
            var users = data.results;
            console.log(users);
            for (user of users) {
                var item = document.createElement("div");
                item.innerHTML = "<div class=\"list__item\"><img class=\"item__image\" src=\"" + user.picture.medium + "\"><div class=\"item__name\">" + user.name.first + "</div></div>"
                document.querySelector(".list__container").appendChild(item);

            }

        }

    }
    oAJAX.send();
}