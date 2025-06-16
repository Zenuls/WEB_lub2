// Инициализация AOS с настройками
AOS.init({
    // Длительность анимации по умолчанию (в миллисекундах)
    duration: 800,

    // Тип плавности анимации (можно использовать любые easing-функции из CSS)
    easing: 'ease-in-out',

    // Будет ли анимация повторяться при скролле туда-обратно
    once: false,

    // Будет ли анимация срабатывать при скролле вверх
    mirror: true,

    // Смещение (в пикселях) от исходного положения триггера
    offset: 100,

    // Отключение AOS на определенных устройствах
    disable: function() {
        // Отключаем на мобильных устройствах
        return window.innerWidth < 768;
    },

    // Начальное состояние AOS (для SSR)
    startEvent: 'DOMContentLoaded'
});

// Обработчики событий AOS
document.addEventListener('aos:in', ({ detail }) => {
    console.log('Элемент появился в зоне видимости:', detail);
});

document.addEventListener('aos:out', ({ detail }) => {
    console.log('Элемент вышел из зоны видимости:', detail);
});
