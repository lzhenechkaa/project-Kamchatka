'use strict';

document.addEventListener("DOMContentLoaded", () => {

    const bookButtons = document.querySelectorAll('tourss'); // выбираем все кнопки "Забронировать"
    const popup = document.getElementById('popup'); // всплывающее окно
    const closeButton = document.getElementById('closePopup'); // кнопка закрытия всплывающего окна
    const form = document.getElementById('bookingForm'); // форма внутри попапа

    if (bookButtons.length > 0) { // проверяем существование кнопки в DOM
        console.log('Константа bookButton существует');

        /* 
        *   Алгоритм
        *
        *   1. Начало.
        *   2. Проверка условия: Навешиваем слушатель событий на click страницы и ожидаем нажатие на кнопку "Забронировать".
        *     2.1. Да: Появляется всплывающее окно бронирования, где пользователь будет вводить свои необходимые данные.
        *     2.1.1. Проверка условия: Если нажата кнопка "Закрыть" (крестик) в форме.
        *       2.1.1.1. Да: Закрыть всплывающее окно и сбросить значения полей ввода в форме.
        *       2.1.1.2. Нет: Проверка на заполнение полей формы.
        *     2.1.2. Проверка условия: Заполнение всех полей
        *       2.1.2.1. Все поля заполнены: Обработка данных и отправка формы + сообщение об успешной отправке.
        *       2.1.2.2. Некоторые поля не заполнены: Сообщение об ошибке, попросить заполнить все обязательные поля.
        *     2.2. Нет: Конец.
        *   4. Конец
        * 
        *   Блок-схема: /images/diagram.png
        */
        
        bookButtons.forEach(button => {
            button.addEventListener('click', () => {
                console.log('Кнопка "Забронировать" нажата');
                popup.style.display = 'block'; // открываем всплывающее окно
            });
        });

        // Обработчик события клика на кнопку закрытия
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                popup.style.display = 'none'; // закрываем всплывающее окно
                form.reset(); // сбрасываем значения полей ввода в форме
            });
        }

        // Обработчик события отправки формы
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const inputs = form.querySelectorAll('input[required]'); // находим обязательные поля
            let allFilled = true;

            // Проверка заполнения всех обязательных полей
            inputs.forEach(input => {
                if (!input.value) {
                    allFilled = false; // если хотя бы одно поле не заполнено
                }
            });

            if (allFilled) {
                console.log('Форма успешно отправлена');
                alert('Форма успешно отправлена!');
                popup.style.display = 'none'; // закрываем окно после успешной отправки
                form.reset(); // сбрасываем форму
            } else {
                alert('Пожалуйста, заполните все обязательные поля.'); // сообщение об ошибке
            }
        });

    }
});