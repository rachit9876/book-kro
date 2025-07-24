function createPagination(currentPage, totalPages, onPageChange) {
    if (totalPages <= 1) return '';
    
    const prevDisabled = currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600';
    const nextDisabled = currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600';
    
    return `
        <div class="flex justify-center items-center space-x-2 mt-8">
            <button 
                id="prev-page" 
                class="px-4 py-2 bg-blue-500 text-white rounded ${prevDisabled}"
                ${currentPage === 1 ? 'disabled' : ''}
            >
                Previous
            </button>
            <span class="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded">
                Page ${currentPage} of ${totalPages}
            </span>
            <button 
                id="next-page" 
                class="px-4 py-2 bg-blue-500 text-white rounded ${nextDisabled}"
                ${currentPage === totalPages ? 'disabled' : ''}
            >
                Next
            </button>
        </div>
    `;
}

function setupPaginationEvents(currentPage, totalPages, onPageChange) {
    document.getElementById('prev-page')?.addEventListener('click', () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    });
    
    document.getElementById('next-page')?.addEventListener('click', () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    });
}