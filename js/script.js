'use strict';

document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById('popup'); // всплывающее окно
    const closeButton = document.getElementById('closePopup'); // кнопка закрытия всплывающего окна
    const form = document.getElementById('bookingForm'); // форма внутри попапа

    // 1. Динамический вывод карточек тегов
    //const cardList = document.querySelector('.tours__list1');
    
    /* Моковые данные */
    /*const cardsData = [
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
    }*/

        //Задание 6.
        const cardList = document.querySelector('.tours__list1');
        const apiUrl = 'data.json';

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
        // Загрузка данных с сервера
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data); // Данные
                console.log(typeof (data)); // Тип полученных данных

                // for (const item in data) {
                //     const card = data[item];

                //     const cardElement = createCard(card.link, card.icon, card.iconAlt, card.iconWidth, card.iconHeight, card.title, card.description);
                //     cardList.insertAdjacentHTML('beforeend', cardElement);
                // }

                data.forEach(item => {
                    const cardElement = createCard(item.iconUrl, item.iconAlt, item.iconWidth, item.iconHeight, item.title, item.description, item.price);
                    cardList.insertAdjacentHTML('beforeend', cardElement);
                });
            })
            .catch(error => {
                console.error('Ошибка при загрузке данных:', error);
            });






    // 2. Обработка кнопок "Забронировать" с использованием делегирования событий
    if (cardList != null) {
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
    }

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
                const dateInput = form.elements.date.value;
                const [day, month, year] = dateInput.split('-');
                const isoDate = `${year}-${month}-${day}`;
                // Собираем данные формы
                const formData = {
                    tour: form.elements.tour.value,
                    date: isoDate,
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

    function fillFormFromLocalStorage() {
        const savedData = localStorage.getItem('bookingData');
if (savedData) {
    const formData = JSON.parse(savedData);
            const form = document.getElementById('bookingForm');
    
            form.elements.tour.value = formData.tour || '';
            
            // Конвертируем дату из YYYY-MM-DD обратно в DD-MM-YYYY для отображения
            if (formData.date) {
                const [year, month, day] = formData.date.split('-');
                form.elements.date.value = `${day}-${month}-${year}`;
            } else {
                form.elements.date.value = '';
            }
            
            form.elements.adults.value = formData.adults || '';
            form.elements.children.value = formData.children || '';
            form.elements.lastName.value = formData.lastName || '';
            form.elements.phone.value = formData.phone || '';
            form.elements.email.value = formData.email || '';
        }
    }
    
    // Вызываем функцию при открытии попапа
    document.querySelectorAll('.tours__book-button').forEach(button => {
        button.addEventListener('click', fillFormFromLocalStorage);
    });

    localStorage.removeItem('bookingData'); // Удаляет только данные формы


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

    // Карусель (слайдер)
    const guidesSlider = new Swiper('.guides-slider', {
        slidesPerView: 3, // Показывать по два слайда
        spaceBetween: 450, // Уменьшите расстояние между слайдами для лучшего отображения
        initialSlide: 1,       // Начальный слайд (первый)
        loop: true, // Бесконечная прокрутка
        centeredSlides: true, // Отключите центрирование, чтобы слайды не обрезались
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });
    });
