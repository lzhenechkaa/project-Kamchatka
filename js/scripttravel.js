'use strict';

document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById('popup'); // всплывающее окно
    const closeButton = document.getElementById('closePopup'); // кнопка закрытия всплывающего окна
    const form = document.getElementById('bookingForm'); // форма внутри попапа

    // Выбираем список экскурсий (.tours__list)
const cardList = document.querySelector('.tours__list');
const apiUrl = 'datatravel.json'; // Используем другой файл данных

// Функция для создания карточки экскурсии
const createCard = (iconUrl, iconAlt, iconWidth, iconHeight, title, description, price) => {
    return `<li class="tours__item">
                <span class="tours__date">${title}</span>
                <p class="tours__description">${description}</p>
                <img class="tours__image" src="${iconUrl}" alt="${iconAlt}" width="${iconWidth}" height="${iconHeight}">
                <p class="tours__price">${price}</p>
                <button class="tours__book-button">Забронировать</button>
            </li>`;
};

// Загрузка данных с сервера
fetch(apiUrl)
    .then(response => response.json())
    .then(datatravel => {
        console.log(datatravel); // Данные
        console.log(typeof datatravel); // Тип полученных данных

        // Проходим по каждому элементу массива данных
        datatravel.forEach(item => {
            const cardElement = createCard(
                item.iconUrl,
                item.iconAlt,
                item.iconWidth,
                item.iconHeight,
                item.title,
                item.description,
                item.price
            );
            // Добавляем карточку в список
            cardList.insertAdjacentHTML('beforeend', cardElement);
        });
    })
    .catch(error => {
        console.error('Ошибка при загрузке данных:', error);
    });

    // 2. Обработка кнопок "Забронировать" с использованием делегирования событий
    cardList.addEventListener('click', (event) => {
        if (event.target.classList.contains('tours__book-button')) {
            console.log('Кнопка "Забронировать" нажата');
            popup.style.display = 'block'; // открываем всплывающее окно
        }
    });

    // Обработчик события клика на кнопку закрытия
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            popup.style.display = 'none'; // закрываем всплывающее окно
            form.reset(); // сбрасываем значения полей ввода в форме
        });
    }

    // Обработчик события отправки формы
    if (form) {
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

    const preloader = document.querySelector('.preloader');
    const content = document.querySelector('.content');
    if (preloader && content) {
        setTimeout(() => {
            // Скрываем прелоадер
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';

            // Показываем контент
            content.style.display = 'block';

            // Удаляем элемент из DOM
            preloader.remove();
        }, 3000); // Задержка 3 секунды
    }
});