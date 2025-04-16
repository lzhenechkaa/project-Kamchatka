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
            const card = event.target.closest('.tours__item');
            const tourTitle = card.querySelector('.tours__date').textContent;
            
            // Сохраняем название экскурсии в LocalStorage
            localStorage.setItem('selectedTour', tourTitle);
            
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
            // Собираем данные формы
            const formData = {
                tour: form.elements.tour.value,
                date: form.elements.date.value,
                adults: form.elements.adults.value,
                children: form.elements.children.value,
                lastName: form.elements.lastName.value,
                phone: form.elements.phone.value,
                email: form.elements.email.value,
                selectedTour: localStorage.getItem('selectedTour') || ''
            };

            // Сохраняем в LocalStorage
            localStorage.setItem('bookingData', JSON.stringify(formData));
            
            console.log('Форма успешно отправлена и сохранена');
            alert('Форма успешно отправлена! Данные сохранены.');
            popup.style.display = 'none'; // закрываем окно после успешной отправки
            form.reset(); // сбрасываем форму
        } else {
            alert('Пожалуйста, заполните все обязательные поля.'); // сообщение об ошибке
        }
    });
}

// Автозаполнение формы при открытии, если есть сохраненные данные
if (popup) {
    const savedData = localStorage.getItem('bookingData');
    
    if (savedData) {
        const formData = JSON.parse(savedData);
        form.elements.tour.value = formData.tour;
        form.elements.date.value = formData.date;
        form.elements.adults.value = formData.adults;
        form.elements.children.value = formData.children;
        form.elements.lastName.value = formData.lastName;
        form.elements.phone.value = formData.phone;
        form.elements.email.value = formData.email;
    }
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