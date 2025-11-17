export class SmoothMenuWheel {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.wheel = this.container.querySelector('.popup__wheel');
        this.items = Array.from(this.container.querySelectorAll('.popup__wheel-item'));
        this.totalItems = this.items.length;
        
        // Начальный активный элемент
        this.activeIndex = 0;
        
        this.lastScrollTime = 0;
        this.scrollDelay = 300;
        
        this.init();
    }
    
    init() {
        this.updateItems();
        this.addEventListeners();
    }
    
    addEventListeners() {
        // Скролл мышью
        this.container.addEventListener('wheel', (e) => {
            e.preventDefault();
            
            const now = Date.now();
            if (now - this.lastScrollTime < this.scrollDelay) return;
            
            if (e.deltaY > 0) {
                this.scrollDown();
            } else {
                this.scrollUp();
            }
            
            this.lastScrollTime = now;
        });
        
        // Тач события
        let startY = 0;
        let startTime = 0;
        const minSwipeDistance = 50;
        
        this.container.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
            startTime = Date.now();
        });
        
        this.container.addEventListener('touchend', (e) => {
            const endY = e.changedTouches[0].clientY;
            const endTime = Date.now();
            const diff = startY - endY;
            const timeDiff = endTime - startTime;
            
            if (Math.abs(diff) > minSwipeDistance && timeDiff < 500) {
                const now = Date.now();
                if (now - this.lastScrollTime < this.scrollDelay) return;
                
                if (diff > 0) {
                    this.scrollDown();
                } else {
                    this.scrollUp();
                }
                
                this.lastScrollTime = now;
            }
        });

        // Клавиатура
        document.addEventListener('keydown', (e) => {
            if (!this.container.closest('.popup_is-opened')) return;
            
            const now = Date.now();
            if (now - this.lastScrollTime < this.scrollDelay) return;
            
            switch(e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    this.scrollUp();
                    this.lastScrollTime = now;
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    this.scrollDown();
                    this.lastScrollTime = now;
                    break;
            }
        });  
    }
    
    scrollUp() {
        this.activeIndex = (this.activeIndex - 1 + this.totalItems) % this.totalItems;
        this.updateItems();
    }
    
    scrollDown() {
        this.activeIndex = (this.activeIndex + 1) % this.totalItems;
        this.updateItems();
    }
    
    setActiveIndex(newIndex) {
        this.activeIndex = newIndex;
        this.updateItems();
    }
    
    updateItems() {
        this.items.forEach((item, index) => {
            item.classList.remove('active', 'adjacent-top', 'adjacent-bottom', 'hidden-top', 'hidden-bottom');
            
            // Простая логика: активный и его соседи
            if (index === this.activeIndex) {
                item.classList.add('active');
            } else if (index === (this.activeIndex - 1 + this.totalItems) % this.totalItems) {
                item.classList.add('adjacent-top');
            } else if (index === (this.activeIndex + 1) % this.totalItems) {
                item.classList.add('adjacent-bottom');
            } else if (index === (this.activeIndex - 2 + this.totalItems) % this.totalItems) {
                item.classList.add('hidden-top');
            } else if (index === (this.activeIndex + 2) % this.totalItems) {
                item.classList.add('hidden-bottom');
            }
        });
    }
}
