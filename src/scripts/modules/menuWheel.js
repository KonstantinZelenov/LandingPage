export class SmoothMenuWheel {
    constructor(containerSelector, options = {}) {
        // Валидация входных данных
        this.container = document.querySelector(containerSelector);
        if (!this.container) throw new Error(`Container not found: ${containerSelector}`);
        
        this.wheel = this.container.querySelector('.wheel__list');
        if (!this.wheel) throw new Error('wheel__list not found');
        
        this.items = Array.from(this.container.querySelectorAll('.wheel__item'));
        if (this.items.length === 0) throw new Error('No wheel__items found');
        
        this.totalItems = this.items.length;
        this.activeIndex = 0;
        
        // Настройки
        this.scrollDelay = options.scrollDelay || 300;
        this.enableKeyboard = options.enableKeyboard !== false;
        this.swipeMinDistance = options.swipeMinDistance || 50;
        this.swipeMaxTime = options.swipeMaxTime || 500;
        
        // Состояние
        this.lastScrollTime = 0;
        this.pendingScroll = false;
        this.startY = 0;
        this.startTime = 0;
        
        // Callback
        this.onChangeCallback = null;
        
        // Кэшированные классы
        this.classes = {
            active: 'active',
            adjacentTop: 'adjacent-top',
            adjacentBottom: 'adjacent-bottom',
            hiddenTop: 'hidden-top',
            hiddenBottom: 'hidden-bottom'
        };
        
        // Привязка контекста для всех обработчиков
        this.handleWheel = this.handleWheel.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        
        this.init();
    }
    
    init() {
        this.updateItems();
        this.addEventListeners();
    }
    
    addEventListeners() {
        this.container.addEventListener('wheel', this.handleWheel, { passive: false });
        this.container.addEventListener('touchstart', this.handleTouchStart, { passive: false });
        this.container.addEventListener('touchend', this.handleTouchEnd);
        this.container.addEventListener('touchmove', this.handleTouchMove, { passive: false });
        
        if (this.enableKeyboard) {
            document.addEventListener('keydown', this.handleKeyDown);
        }
    }
    
    handleWheel(e) {
        e.preventDefault();
        
        if (this.pendingScroll) return;
        
        const now = Date.now();
        if (now - this.lastScrollTime < this.scrollDelay) return;
        
        this.pendingScroll = true;
        
        requestAnimationFrame(() => {
            e.deltaY > 0 ? this.scrollDown() : this.scrollUp();
        });
        
        this.lastScrollTime = now;
        
        setTimeout(() => {
            this.pendingScroll = false;
        }, this.scrollDelay);
    }
    
    handleTouchStart(e) {
        this.startY = e.touches[0].clientY;
        this.startTime = Date.now();
    }
    
    handleTouchEnd(e) {
        const endY = e.changedTouches[0].clientY;
        const endTime = Date.now();
        const diff = this.startY - endY;
        const timeDiff = endTime - this.startTime;
        
        if (Math.abs(diff) > this.swipeMinDistance && timeDiff < this.swipeMaxTime) {
            if (this.pendingScroll) return;
            
            const now = Date.now();
            if (now - this.lastScrollTime < this.scrollDelay) return;
            
            this.pendingScroll = true;
            
            requestAnimationFrame(() => {
                diff > 0 ? this.scrollDown() : this.scrollUp();
            });
            
            this.lastScrollTime = now;
            
            setTimeout(() => {
                this.pendingScroll = false;
            }, this.scrollDelay);
        }
    }
    
    handleTouchMove(e) {
        // Проверяем, находится ли касание внутри колеса
        const isTouchingWheel = e.target.closest('.wheel__list');
        
        if (isTouchingWheel) {
            // Проверяем, можно ли скроллить или нужно заблокировать
            const canScroll = this.wheel.scrollHeight > this.wheel.clientHeight;
            
            if (!canScroll || this.wheel.scrollTop <= 0) {
                e.preventDefault();
            }
        }
    }
    
    handleKeyDown(e) {
        if (!this.container.closest('.popup_is-opened')) return;
        
        if (this.pendingScroll) return;
        
        const now = Date.now();
        if (now - this.lastScrollTime < this.scrollDelay) return;
        
        let shouldScroll = false;
        
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.scrollUp();
            shouldScroll = true;
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.scrollDown();
            shouldScroll = true;
        }
        
        if (shouldScroll) {
            this.pendingScroll = true;
            this.lastScrollTime = now;
            
            setTimeout(() => {
                this.pendingScroll = false;
            }, this.scrollDelay);
        }
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
        if (newIndex < 0 || newIndex >= this.totalItems) {
            console.warn(`Invalid index: ${newIndex}. Must be between 0 and ${this.totalItems - 1}`);
            return;
        }
        
        this.activeIndex = newIndex;
        this.updateItems();
    }
    
    getActiveItem() {
        return this.items[this.activeIndex];
    }
    
    isActive(index) {
        return index === this.activeIndex;
    }
    
    onChange(callback) {
        if (typeof callback === 'function') {
            this.onChangeCallback = callback;
        }
    }
    
    updateItems() {
        this.items.forEach((item, index) => {
            this.resetClasses(item);
            this.addItemClasses(item, index);
        });
        
        // Вызываем callback если есть
        if (this.onChangeCallback) {
            this.onChangeCallback(this.activeIndex, this.getActiveItem());
        }
    }
    
    resetClasses(item) {
        item.classList.remove(
            this.classes.active,
            this.classes.adjacentTop,
            this.classes.adjacentBottom,
            this.classes.hiddenTop,
            this.classes.hiddenBottom
        );
    }
    
    addItemClasses(item, index) {
        const classMap = {
            [this.activeIndex]: this.classes.active,
            [(this.activeIndex - 1 + this.totalItems) % this.totalItems]: this.classes.adjacentTop,
            [(this.activeIndex + 1) % this.totalItems]: this.classes.adjacentBottom,
            [(this.activeIndex - 2 + this.totalItems) % this.totalItems]: this.classes.hiddenTop,
            [(this.activeIndex + 2) % this.totalItems]: this.classes.hiddenBottom,
        };
        
        const className = classMap[index];
        if (className) {
            item.classList.add(className);
        }
    }
    
    destroy() {
        // Удаляем все обработчики событий
        this.container.removeEventListener('wheel', this.handleWheel);
        this.container.removeEventListener('touchstart', this.handleTouchStart);
        this.container.removeEventListener('touchend', this.handleTouchEnd);
        this.container.removeEventListener('touchmove', this.handleTouchMove);
        
        if (this.enableKeyboard) {
            document.removeEventListener('keydown', this.handleKeyDown);
        }
        
        // Очищаем ссылки для сборщика мусора
        this.container = null;
        this.wheel = null;
        this.items = null;
        this.onChangeCallback = null;
    }
}