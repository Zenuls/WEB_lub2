document.addEventListener('DOMContentLoaded', function() {
    // Переключение между разделами
    const menuItems = document.querySelectorAll('.menu li');
    const contentSections = document.querySelectorAll('.content-section');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            
            // Удаляем активный класс у всех пунктов меню
            menuItems.forEach(menuItem => {
                menuItem.classList.remove('active');
            });
            
            // Добавляем активный класс текущему пункту
            this.classList.add('active');
            
            // Скрываем все секции контента
            contentSections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Показываем выбранную секцию
            document.getElementById(sectionId).classList.add('active');
            
            // Обновляем AOS для новых элементов
            setTimeout(() => {
                AOS.refresh();
            }, 300);
        });
    });
    
    // Инициализация демонстрационных элементов
    function initDemoElements() {
        const animations = [
            'fade', 'fade-up', 'fade-down', 'fade-left', 'fade-right',
            'flip-up', 'flip-down', 'flip-left', 'flip-right',
            'slide-up', 'slide-down', 'slide-left', 'slide-right',
            'zoom-in', 'zoom-in-up', 'zoom-in-down', 'zoom-in-left', 'zoom-in-right', 'zoom-out',
            'custom-animation', 'rotate-animation', 'custom-bounce', 'custom-slide'
        ];
        
        const container = document.querySelector('.demo-container');
        if (container) {
            animations.forEach(anim => {
                const el = document.createElement('div');
                el.className = 'demo-item';
                el.setAttribute('data-aos', anim);
                el.textContent = anim;
                container.appendChild(el);
            });
            
            AOS.refresh();
        }
    }
    
    initDemoElements();
});