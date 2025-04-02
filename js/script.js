'use strict';

document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById('popup'); // всплывающее окно
    const closeButton = document.getElementById('closePopup'); // кнопка закрытия всплывающего окна
    const form = document.getElementById('bookingForm'); // форма внутри попапа

    // 1. Динамический вывод карточек тегов
    const cardList = document.querySelector('.tours__list1');
    
    /* Моковые данные */
    const cardsData = [
        {
            iconAlt: 'Иконка для экскурсии 1',
            iconUrl: 'images/dolinaeizerov1.jpg',
            iconWidth: 250,
            iconHeight: 250,
            title: 'Прогулка на долину гейзеров - 15.05',
            description: 'Откройте для себя удивительный мир природных чудес, где гейзеры и горячие источники создают уникальный ландшафт, полный захватывающих зрелищ и звуков. Обещаем, будет интересно!',
            price: 'Стоимость: от 1000 руб.'
        },
        {
            iconAlt: 'Иконка для экскурсии 2',
            iconUrl: 'images/kyrilskoeoz1.jpg',
            iconWidth: 250,
            iconHeight: 250,
            title: 'Завораживающая экскурсия на Курильское озеро - 28.05',
            description: 'Погрузитесь в атмосферу спокойствия и красоты, наслаждаясь живописными видами на озеро, окруженное величественными горами и богатой флорой и фауной.',
            price: 'Стоимость: от 1800 руб.'
        },
        {
            iconAlt: 'Иконка для экскурсии 3',
            iconUrl: 'images/avachinskii.jpg',
            iconWidth: 250,
            iconHeight: 250,
            title: 'Пешеходная экскурсия на вулкан Авачинский - 01.06',
            description: 'Присоединяйтесь к захватывающему восхождению на один из самых активных вулканов Камчатки, где вас ждут потрясающие панорамы и уникальные геологические образования.',
            price: 'Стоимость: от 2500 руб.'
        }
    ];
    
    // Функция для создания карточки
    const createCard = (iconUrl, iconAlt, iconWidth, iconHeight, title, description, price) => {
        return `<li class="tours__item">
                    <span class="tours__date">${title}</span>
                    <img class="tours__image" src="${iconUrl}" alt="${iconAlt}" width="${iconWidth}" height="${iconHeight}">
                    <p class="tours__description">${description}</p>
                    <p class="tours__price">${price}</p>
                    <button class="tours__book-button">Забронировать</button>
                    <p class="tours__more-info">
                        <a href="travel.html" class="tours__more-link">Узнать подробнее</a>
                    </p>
                </li>`;
    }

    // Создаем карточки
    for (const cardKey in cardsData) {
        const card = cardsData[cardKey];
        const cardElement = createCard(
            card.iconUrl, 
            card.iconAlt, 
            card.iconWidth, 
            card.iconHeight, 
            card.title, 
            card.description, 
            card.price
        );
        cardList.insertAdjacentHTML('beforeend', cardElement);
    }

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
});
