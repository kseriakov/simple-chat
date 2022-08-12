// Отзывчивая textarea, иконка на удаление введенного текста
let wrTextarea = document.querySelector(".writer__textarea");
let iconDeleteText = document.querySelector('.writer__clear');

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
    wrTextarea.value = '';
    iconDeleteText.style.visibility = "hidden";
    wrTextarea.style.height = "auto";
});

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
            setDeleteMessage(blockForInputMessage.querySelector(".message__delete"), blockForInputMessage);
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
let parentMessageContainer = document.querySelector('.chat__container');
let sendMessageButton = document.querySelector('.writer__send-button');
let messageTemplate = document.querySelector('#chat-message').content;
let writerForm = document.forms.writer__form;

sendMessageButton.addEventListener('click', (evnt) => {
    evnt.preventDefault();
    let newMessage = messageTemplate.cloneNode(true);
    if (!wrTextarea.value) return;
    let messageText = wrTextarea.value;
    newMessage.querySelector('.message__text').textContent = messageText;
    writerForm.before(newMessage);

    wrTextarea.value = '';

    // Получаем вновь добавленное сообщение и вешаем на него иконку
    let newMessageList = writerForm.previousElementSibling.children;
    addDeleteIconForm(newMessageList);
});

