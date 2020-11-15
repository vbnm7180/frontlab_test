//Запрос данных с API при открытии страницы
window.onload = function() {
    //Ajax запрос к API
    var oAJAX = new XMLHttpRequest;
    oAJAX.open("GET", "https://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture", true);
    oAJAX.onreadystatechange = function() {
        //Если данные обработаны и статус ответа сервера 200
        if (oAJAX.readyState == 4 && oAJAX.status == 200) {
            //Обрабатываем ответ формата json
            var data = JSON.parse(oAJAX.responseText);
            var users = data.results;
            //Для каждого пользователя
            for (user of users) {
                //Создаем обертку, содержащую элемент списка и popup
                var item = document.createElement("div");
                item.className = "list__block";
                //Добавляем верстку элемента списка
                item.innerHTML = "<div class=\"list__item\"><img class=\"item__image\" src=\"" + user.picture.medium + "\"><div class=\"item__name\">" + user.name.title.toUpperCase() + " " + user.name.first.toUpperCase() + " " + user.name.last.toUpperCase() + "</div></div>";
                //Добавляем верстку popup
                item.innerHTML = item.innerHTML + "<div class=\"popup\"><div class=\"popup__header\"><img src=\"images/cancel.svg\" class=\"exit\"></div><div class=\"popup__content\"><img src=\"" + user.picture.large + "\" class=\"popup__image\"><div class=\"popup__info\"><div class=\"popup__street\">STREET: " + user.location.street.toUpperCase() + "</div><div class=\"popup__city\">CITY: " + user.location.city.toUpperCase() + "</div><div class=\"popup__state\">STATE: " + user.location.state.toUpperCase() + "</div><div class=\"popup__mail\">EMAIL: " + user.email + "</div><div class=\"popup__phone\">PHONE: " + user.phone + "</div></div></div></div>";
                //Добавляем весь элемент в список 
                document.querySelector(".list__container").appendChild(item);
            }

        }
    }
    oAJAX.send();
}

//Открытие popup при нажатии на элемент спсика
document.querySelector(".list__container").addEventListener('click', function(e) {
    if (e.target.closest(".list__item")) {
        e.target.closest(".list__item").nextSibling.style.display = "block";
    }
});

//Закрытие popup при нажатии на кнопку выхода
document.querySelector(".list__container").addEventListener('click', function(e) {
    if (e.target.className == 'exit') {
        e.target.closest(".popup").style.display = "none";
    }
});

//Кнопка сортировки
document.querySelector(".sort__btn").addEventListener('click', function() {
    //Получаем псевдомассив NodeList
    var list = document.querySelectorAll(".list__block");
    //Преобразуем NodeList в массив
    list = Array.from(list);
    //Если в select выбрана сортировка по алфавиту
    if (document.querySelector(".sort__types").value == "1") {
        //Сортируем массив с .list__block по тексту в алфавитном порядке
        list.sort(function(a, b) {
            if (a.firstChild.textContent > b.firstChild.textContent) return 1;
            else return -1;
        });
    }
    // Если в select выбрана сортировка против алфавита
    else {
        //Сортируем массив с .list__block по тексту в обратном порядке
        list.sort(function(a, b) {
            if (a.firstChild.textContent < b.firstChild.textContent) return 1;
            else return -1;
        });
    }
    //Удаляем все элемены списка
    var list__container = document.querySelector(".list__container").innerHTML;
    list__container = "";
    //Добавляем отсортированные элементы списка
    for (item of list) {
        document.querySelector(".list__container").appendChild(item);
    }
});