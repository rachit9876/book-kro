function showBookingModal(movie) {
    closeMovieModal();
    const bookingModal = `
        <div id="booking-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div class="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div class="p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-2xl font-bold">Book Tickets - ${movie.title}</h2>
                        <button id="close-booking-modal" class="text-gray-500 hover:text-gray-700 text-2xl">×</button>
                    </div>
                    
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium mb-2">Select Theater</label>
                            <select id="theater-select" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700">
                                <option>PVR Cinemas - Mall Road</option>
                                <option>INOX - City Center</option>
                                <option>Cinepolis - Downtown</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium mb-2">Select Date</label>
                            <input type="date" id="date-select" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700" min="${new Date().toISOString().split('T')[0]}">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium mb-2">Select Show Time</label>
                            <div class="grid grid-cols-3 gap-2">
                                ${['10:00 AM', '1:30 PM', '4:45 PM', '8:00 PM', '10:30 PM'].map(time => 
                                    `<button class="show-time-btn px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-blue-500 hover:text-white transition-colors" data-time="${time}">${time}</button>`
                                ).join('')}
                            </div>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium mb-2">Number of Tickets</label>
                            <select id="ticket-count" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700">
                                ${[1,2,3,4,5,6,7,8,9,10].map(num => `<option value="${num}">${num}</option>`).join('')}
                            </select>
                        </div>
                        
                        <div class="border-t pt-4">
                            <div class="flex justify-between items-center mb-4">
                                <span class="text-lg font-medium">Total: ₹<span id="total-price">250</span></span>
                            </div>
                            <button id="confirm-booking" class="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors">
                                Confirm Booking
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', bookingModal);
    setupBookingEvents();
}

function setupBookingEvents() {
    document.getElementById('close-booking-modal').addEventListener('click', closeBookingModal);
    document.getElementById('booking-modal').addEventListener('click', (e) => {
        if (e.target.id === 'booking-modal') closeBookingModal();
    });
    
    document.querySelectorAll('.show-time-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.show-time-btn').forEach(b => b.classList.remove('bg-blue-500', 'text-white'));
            e.target.classList.add('bg-blue-500', 'text-white');
        });
    });
    
    document.getElementById('ticket-count').addEventListener('change', updateTotalPrice);
    document.getElementById('confirm-booking').addEventListener('click', confirmBooking);
    
    // Set default date to today
    document.getElementById('date-select').value = new Date().toISOString().split('T')[0];
}

function updateTotalPrice() {
    const ticketCount = document.getElementById('ticket-count').value;
    const pricePerTicket = 250;
    document.getElementById('total-price').textContent = ticketCount * pricePerTicket;
}

function confirmBooking() {
    const theater = document.getElementById('theater-select').value;
    const date = document.getElementById('date-select').value;
    const selectedTime = document.querySelector('.show-time-btn.bg-blue-500')?.dataset.time;
    const ticketCount = document.getElementById('ticket-count').value;
    
    if (!selectedTime) {
        alert('Please select a show time');
        return;
    }
    
    // Save booking to localStorage
    const booking = {
        id: Date.now(),
        theater,
        date,
        time: selectedTime,
        tickets: ticketCount,
        total: ticketCount * 250,
        timestamp: new Date().toISOString()
    };
    
    let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    closeBookingModal();
    showNotification('Booking confirmed! Check your bookings.');
}

function closeBookingModal() {
    const modal = document.getElementById('booking-modal');
    if (modal) modal.remove();
}