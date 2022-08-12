// Отзывчивая textarea, иконка на удаление введенного текста
let wrTextarea = document.querySelector(".writer__textarea");
let iconDeleteText = document.querySelector(".writer__clear");

wrTextarea.addEventListener("input", (evnt) => {
    wrTextarea.style.height = "auto";
    wrTextarea.style.height = wrTextarea.scrollHeight + "px";
    if (wrTextarea.value) {
        iconDeleteText.style.visibility = "visible";
    } else {
        iconDeleteText.style.visibility = "hidden";
    }
});

iconDeleteText.addEventListener("click", (evnt) => {
    deleteTextMessage(evnt);
});

function deleteTextMessage(...args) {
    wrTextarea.value = "";
    iconDeleteText.style.visibility = "hidden";
    wrTextarea.style.height = "auto";
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Удаление сообщений
let messageList = document.querySelectorAll(".message__block.my");
let iconDeleteForm = document.querySelector("#delete-message").content;

addDeleteIconForm(messageList);

//Добавляем иконки удаления сообщений
function addDeleteIconForm(items) {
    for (let item of items) {
        let blockForInputMessage = item;
        // Добавление иконки при наведении на сообщения мыши
        item.addEventListener("mouseenter", (evnt) => {
            let currentForm = iconDeleteForm.cloneNode(true);
            blockForInputMessage.append(currentForm);

            // Обработчик на удаление сообщения
            setDeleteMessage(
                blockForInputMessage.querySelector(".message__delete"),
                blockForInputMessage
            );
        });
        // Удаление иконки при покидании мышью сообщения
        blockForInputMessage.addEventListener("mouseleave", (evnt) => {
            blockForInputMessage.querySelector(".message__delete").remove();
        });
    }
}

function setDeleteMessage(iconElement, messageElement) {
    iconElement.addEventListener("click", (evnt) => {
        // Перед удалением элемента отправляем форму на сервер, пока убрали, чтобы было нагляднее
        // messageElement.querySelector("form").submit();
        messageElement.parentElement.remove();
    });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Добавление сообщений
let parentMessageContainer = document.querySelector(".chat__container");
let sendMessageButton = document.querySelector(".writer__send-button");
let messageTemplate = document.querySelector("#chat-message").content;
let writerForm = document.forms.writer__form;

sendMessageButton.addEventListener("click", (evnt) => {
    evnt.preventDefault();
    let newMessage = messageTemplate.cloneNode(true);
    if (!wrTextarea.value) return;
    let messageText = wrTextarea.value;
    newMessage.querySelector(".message__text").textContent = messageText;
    writerForm.before(newMessage);

    deleteTextMessage(evnt);

    // Получаем вновь добавленное сообщение и вешаем на него иконку
    let newMessageList = writerForm.previousElementSibling.children;
    addDeleteIconForm(newMessageList);
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Делаем бургер меню

let burderBlock = document.querySelector(".search__burger");
let lineBurgerTemp = document.createElement("div");
let container = document.querySelector(".container");

// Присваиваем шаблону стандартный стиль бургера
lineBurgerTemp.classList.add("burger__line");

for (let i of [1, 2, 3]) {
    let lineBurger = lineBurgerTemp.cloneNode(true);
    burderBlock.append(lineBurger);
}

// Добавляем обработчик на клик по бургеру
burderBlock.addEventListener("click", (evnt) => {
    showHideBurgerMenu(evnt);
});

function showHideBurgerMenu(evnt) {
    let i = 0;
    for (let line of burderBlock.children) {
        // Проверяем, если бургер закрыт, то добавляем класс на его закрытие
        if (!line.classList.contains("burger__close")) {
            line.classList.add("burger__close");
            i++;
            switch (i) {
                case 1: {
                    line.style.display = "none";
                    break;
                }
                case 2: {
                    line.style.transform = "rotate(-45deg)";
                    break;
                }
                case 3: {
                    line.style.transform = "rotate(225deg)";
                    break;
                }
            }
        } else {
            line.removeAttribute("style");
            line.classList.remove("burger__close");
        }
        container.classList.toggle("burger__curtain");
    }
}

// Добавили клик вне контейнера для закрытия меню
document.addEventListener("click", (evnt) => {
    // Получаем список всех элементов, на которых распространяются события клика,
    // container в них входить не должен
    let elementslist = evnt.composedPath();
    if (!elementslist.includes(container) && container.classList.contains("burger__curtain")) {
        showHideBurgerMenu(evnt);
    }
});
