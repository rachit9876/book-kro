// Custom Dropdown Component for Mobile-Friendly UI
class CustomDropdown {
    constructor(element, options = {}) {
        this.element = element;
        this.options = {
            placeholder: options.placeholder || 'Select an option',
            searchable: options.searchable || false,
            maxHeight: options.maxHeight || '200px',
            ...options
        };
        this.isOpen = false;
        this.selectedValue = '';
        this.selectedText = '';
        this.items = [];
        
        this.init();
    }
    
    init() {
        this.parseOriginalSelect();
        this.createCustomDropdown();
        this.bindEvents();
        this.hideOriginalSelect();
    }
    
    parseOriginalSelect() {
        const options = this.element.querySelectorAll('option');
        this.items = Array.from(options)
            .filter(option => option.textContent.trim() !== '')
            .map(option => ({
                value: option.value,
                text: option.textContent.trim(),
                disabled: option.disabled,
                selected: option.selected
            }));
        
        // Set initial selected value
        const selected = this.items.find(item => item.selected);
        if (selected) {
            this.selectedValue = selected.value;
            this.selectedText = selected.text;
        }
    }
    
    createCustomDropdown() {
        const wrapper = document.createElement('div');
        wrapper.className = 'custom-dropdown-wrapper relative';
        
        const dropdown = document.createElement('div');
        dropdown.className = 'custom-dropdown w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors cursor-pointer flex items-center justify-between';
        dropdown.setAttribute('tabindex', '0');
        dropdown.setAttribute('role', 'combobox');
        dropdown.setAttribute('aria-expanded', 'false');
        dropdown.setAttribute('aria-haspopup', 'listbox');
        
        const selectedDisplay = document.createElement('span');
        selectedDisplay.className = 'selected-text text-gray-900 dark:text-white';
        selectedDisplay.textContent = this.selectedText || this.options.placeholder;
        
        const arrow = document.createElement('div');
        arrow.className = 'dropdown-arrow transition-transform duration-200';
        arrow.innerHTML = `
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
        `;
        
        dropdown.appendChild(selectedDisplay);
        dropdown.appendChild(arrow);
        
        const dropdownList = document.createElement('div');
        dropdownList.className = 'dropdown-list absolute top-full left-0 right-0 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl mt-1 shadow-lg z-50 hidden overflow-hidden';
        dropdownList.style.maxHeight = this.options.maxHeight;
        dropdownList.setAttribute('role', 'listbox');
        
        if (this.options.searchable) {
            const searchInput = document.createElement('input');
            searchInput.type = 'text';
            searchInput.className = 'dropdown-search w-full px-3 py-2 border-b border-gray-200 dark:border-gray-600 bg-transparent focus:outline-none';
            searchInput.placeholder = 'Search...';
            dropdownList.appendChild(searchInput);
        }
        
        const itemsContainer = document.createElement('div');
        itemsContainer.className = 'dropdown-items overflow-y-auto';
        itemsContainer.style.maxHeight = this.options.maxHeight;
        
        this.items.forEach((item, index) => {
            if (!item.text || item.text.trim() === '') return; // Skip empty options
            
            const itemElement = document.createElement('div');
            itemElement.className = 'dropdown-item px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors text-gray-900 dark:text-white';
            itemElement.textContent = item.text;
            itemElement.setAttribute('data-value', item.value);
            itemElement.setAttribute('role', 'option');
            itemElement.setAttribute('tabindex', '-1');
            
            if (item.selected) {
                itemElement.classList.add('selected', 'bg-blue-50', 'dark:bg-blue-900', 'text-blue-600', 'dark:text-blue-400');
            }
            
            if (item.disabled) {
                itemElement.classList.add('disabled', 'opacity-50', 'cursor-not-allowed');
                itemElement.classList.remove('hover:bg-gray-100', 'dark:hover:bg-gray-600');
            }
            
            itemsContainer.appendChild(itemElement);
        });
        
        dropdownList.appendChild(itemsContainer);
        
        wrapper.appendChild(dropdown);
        wrapper.appendChild(dropdownList);
        
        // Insert after original select
        this.element.parentNode.insertBefore(wrapper, this.element.nextSibling);
        
        // Store references
        this.dropdown = dropdown;
        this.dropdownList = dropdownList;
        this.selectedDisplay = selectedDisplay;
        this.arrow = arrow;
        this.itemsContainer = itemsContainer;
        this.searchInput = dropdownList.querySelector('.dropdown-search');
    }
    
    bindEvents() {
        // Toggle dropdown
        this.dropdown.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggle();
        });
        
        // Keyboard navigation
        this.dropdown.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    this.toggle();
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    if (!this.isOpen) {
                        this.open();
                    } else {
                        this.navigateItems('down');
                    }
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    if (this.isOpen) {
                        this.navigateItems('up');
                    }
                    break;
                case 'Escape':
                    this.close();
                    break;
            }
        });
        
        // Item selection
        this.itemsContainer.addEventListener('click', (e) => {
            const item = e.target.closest('.dropdown-item');
            if (item && !item.classList.contains('disabled')) {
                this.selectItem(item);
            }
        });
        
        // Search functionality
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                this.filterItems(e.target.value);
            });
            
            this.searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    this.navigateItems('down');
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    this.navigateItems('up');
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    const highlighted = this.itemsContainer.querySelector('.dropdown-item.highlighted');
                    if (highlighted) {
                        this.selectItem(highlighted);
                    }
                }
            });
        }
        
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!this.dropdown.contains(e.target) && !this.dropdownList.contains(e.target)) {
                this.close();
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (this.isOpen) {
                this.adjustPosition();
            }
        });
    }
    
    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }
    
    open() {
        if (this.isOpen) return;
        
        this.isOpen = true;
        this.dropdownList.classList.remove('hidden');
        this.arrow.style.transform = 'rotate(180deg)';
        this.dropdown.setAttribute('aria-expanded', 'true');
        
        // Focus search input if available
        if (this.searchInput) {
            setTimeout(() => this.searchInput.focus(), 100);
        }
        
        this.adjustPosition();
        
        // Add animation
        this.dropdownList.style.opacity = '0';
        this.dropdownList.style.transform = 'translateY(-10px)';
        
        requestAnimationFrame(() => {
            this.dropdownList.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
            this.dropdownList.style.opacity = '1';
            this.dropdownList.style.transform = 'translateY(0)';
        });
    }
    
    close() {
        if (!this.isOpen) return;
        
        this.isOpen = false;
        this.dropdownList.classList.add('hidden');
        this.arrow.style.transform = 'rotate(0deg)';
        this.dropdown.setAttribute('aria-expanded', 'false');
        
        // Remove backdrop on mobile
        if (this.backdrop) {
            this.backdrop.remove();
            this.backdrop = null;
        }
        
        // Clear search
        if (this.searchInput) {
            this.searchInput.value = '';
            this.filterItems('');
        }
        
        // Remove highlights
        this.itemsContainer.querySelectorAll('.dropdown-item.highlighted').forEach(item => {
            item.classList.remove('highlighted');
        });
    }
    
    selectItem(itemElement) {
        const value = itemElement.getAttribute('data-value');
        const text = itemElement.textContent;
        
        // Update selection
        this.selectedValue = value;
        this.selectedText = text;
        this.selectedDisplay.textContent = text;
        
        // Update original select
        this.element.value = value;
        
        // Update visual selection
        this.itemsContainer.querySelectorAll('.dropdown-item.selected').forEach(item => {
            item.classList.remove('selected', 'bg-blue-50', 'dark:bg-blue-900', 'text-blue-600', 'dark:text-blue-400');
        });
        
        itemElement.classList.add('selected', 'bg-blue-50', 'dark:bg-blue-900', 'text-blue-600', 'dark:text-blue-400');
        
        // Trigger change event
        const changeEvent = new Event('change', { bubbles: true });
        this.element.dispatchEvent(changeEvent);
        
        this.close();
    }
    
    navigateItems(direction) {
        const items = Array.from(this.itemsContainer.querySelectorAll('.dropdown-item:not(.disabled):not(.hidden)'));
        if (items.length === 0) return;
        
        const currentHighlighted = this.itemsContainer.querySelector('.dropdown-item.highlighted');
        let newIndex = 0;
        
        if (currentHighlighted) {
            const currentIndex = items.indexOf(currentHighlighted);
            if (direction === 'down') {
                newIndex = (currentIndex + 1) % items.length;
            } else {
                newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
            }
            currentHighlighted.classList.remove('highlighted', 'bg-gray-100', 'dark:bg-gray-600');
        }
        
        const newItem = items[newIndex];
        newItem.classList.add('highlighted', 'bg-gray-100', 'dark:bg-gray-600');
        
        // Scroll into view
        newItem.scrollIntoView({ block: 'nearest' });
    }
    
    filterItems(searchTerm) {
        const items = this.itemsContainer.querySelectorAll('.dropdown-item');
        const term = searchTerm.toLowerCase();
        
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(term)) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    }
    
    adjustPosition() {
        // On mobile, use fixed positioning for better UX
        if (window.innerWidth <= 640) {
            this.dropdownList.style.position = 'fixed';
            this.dropdownList.style.left = '1rem';
            this.dropdownList.style.right = '1rem';
            this.dropdownList.style.bottom = '1rem';
            this.dropdownList.style.top = 'auto';
            this.dropdownList.style.maxHeight = '60vh';
            this.dropdownList.style.zIndex = '9999';
            
            // Add backdrop
            if (!this.backdrop) {
                this.backdrop = document.createElement('div');
                this.backdrop.className = 'dropdown-backdrop fixed inset-0 bg-black bg-opacity-30';
                this.backdrop.style.zIndex = '49';
                this.backdrop.addEventListener('click', () => this.close());
                document.body.appendChild(this.backdrop);
            }
            this.dropdownList.style.zIndex = '50';
        } else {
            // Desktop positioning
            const rect = this.dropdown.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            const spaceAbove = rect.top;
            const dropdownHeight = parseInt(this.options.maxHeight);
            
            this.dropdownList.style.position = 'absolute';
            this.dropdownList.style.left = '0';
            this.dropdownList.style.right = '0';
            this.dropdownList.style.zIndex = '50';
            
            if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
                // Show above
                this.dropdownList.style.top = 'auto';
                this.dropdownList.style.bottom = '100%';
                this.dropdownList.style.marginTop = '0';
                this.dropdownList.style.marginBottom = '4px';
            } else {
                // Show below (default)
                this.dropdownList.style.top = '100%';
                this.dropdownList.style.bottom = 'auto';
                this.dropdownList.style.marginTop = '4px';
                this.dropdownList.style.marginBottom = '0';
            }
        }
    }
    
    hideOriginalSelect() {
        this.element.style.display = 'none';
    }
    
    setValue(value) {
        const item = this.items.find(item => item.value === value);
        if (item) {
            this.selectedValue = value;
            this.selectedText = item.text;
            this.selectedDisplay.textContent = item.text;
            this.element.value = value;
            
            // Update visual selection
            this.itemsContainer.querySelectorAll('.dropdown-item.selected').forEach(item => {
                item.classList.remove('selected', 'bg-blue-50', 'dark:bg-blue-900', 'text-blue-600', 'dark:text-blue-400');
            });
            
            const itemElement = this.itemsContainer.querySelector(`[data-value="${value}"]`);
            if (itemElement) {
                itemElement.classList.add('selected', 'bg-blue-50', 'dark:bg-blue-900', 'text-blue-600', 'dark:text-blue-400');
            }
        }
    }
    
    getValue() {
        return this.selectedValue;
    }
    
    destroy() {
        // Remove backdrop if exists
        if (this.backdrop) {
            this.backdrop.remove();
            this.backdrop = null;
        }
        
        const wrapper = this.dropdown.parentNode;
        if (wrapper) {
            wrapper.remove();
        }
        this.element.style.display = '';
        this.element.customDropdown = null;
    }
}

// Initialize custom dropdowns
function initializeCustomDropdowns() {
    try {
        // Initialize genre filter dropdown
        const genreFilter = document.getElementById('genre-filter');
        if (genreFilter && !genreFilter.customDropdown) {
            genreFilter.customDropdown = new CustomDropdown(genreFilter, {
                placeholder: 'All Genres',
                searchable: false
            });
        }
        
        // Initialize sort filter dropdown
        const sortFilter = document.getElementById('sort-filter');
        if (sortFilter && !sortFilter.customDropdown) {
            sortFilter.customDropdown = new CustomDropdown(sortFilter, {
                placeholder: 'Most Popular',
                searchable: false
            });
        }
        
        // Initialize theater select dropdown
        const theaterSelect = document.getElementById('theater-select');
        if (theaterSelect && !theaterSelect.customDropdown) {
            theaterSelect.customDropdown = new CustomDropdown(theaterSelect, {
                placeholder: 'Choose a theater...',
                searchable: false
            });
        }
    } catch (error) {
        console.error('Error initializing custom dropdowns:', error);
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initializeCustomDropdowns, 200);
    });
} else {
    setTimeout(initializeCustomDropdowns, 200);
}

// Re-initialize when new content is added (for booking modal)
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    // Check if booking modal was added
                    if (node.id === 'booking-modal' || node.querySelector('#booking-modal')) {
                        setTimeout(initializeCustomDropdowns, 200);
                    }
                    // Check if search container was added
                    if (node.id === 'search-container' || node.querySelector('#search-container')) {
                        setTimeout(initializeCustomDropdowns, 200);
                    }
                }
            });
        }
    });
});

observer.observe(document.body, { childList: true, subtree: true });