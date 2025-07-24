function createHeader() {
    return `
        <h1 class="text-3xl font-bold">Book-kro</h1>
        <p class="text-gray-300 mt-2">Your Movie Booking Destination</p>
    `;
}

function renderHeader() {
    document.getElementById('header').innerHTML = createHeader();
}