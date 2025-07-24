document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("eventsContainer")) loadEvents();
  if (document.getElementById("bookingsContainer")) displayUserBookings();

  // Manage login state
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (isLoggedIn) {
    document.getElementById("myBookingsLink").style.display = "inline";
    document.getElementById("logoutBtn").style.display = "inline";
    document.getElementById("loginLink").style.display = "none";
    document.getElementById("registerLink").style.display = "none";
  }
});

function loadEvents() {
  fetch("data/events.json")
    .then(response => response.json())
    .then(data => {
      const eventsContainer = document.getElementById("eventsContainer");
      eventsContainer.innerHTML = "";
      data.events.forEach(event => {
        const eventElement = document.createElement("div");
        eventElement.className = "event-card";
        eventElement.innerHTML = `
          <img src="${event.image}" alt="${event.name}" class="event-img">
          <h3>${event.name}</h3>
          <p><strong>Date:</strong> ${event.date}</p>
          <p><strong>Location:</strong> ${event.location}</p>
          <p><strong>Price:</strong> ₹${event.price}</p>
          <button onclick="redirectToBooking(${event.id})">Book Now</button>
        `;
        eventsContainer.appendChild(eventElement);
      });
    });
}

function redirectToBooking(eventId) {
  if (localStorage.getItem("isLoggedIn") !== "true") {
    alert("Please log in to book tickets!");
    window.location.href = "login.html";
    return;
  }
  localStorage.setItem("selectedEventId", eventId);
  window.location.href = "booking.html";
}

function confirmBooking(e) {
  e.preventDefault();
  const seatInput = document.getElementById("seatsInput").value.trim();
  if (!seatInput) {
    alert("Please enter seat numbers!");
    return;
  }
  const eventId = localStorage.getItem("selectedEventId");
  if (!eventId) {
    alert("No event selected!");
    return;
  }
  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings.push({
    eventId: parseInt(eventId),
    user: localStorage.getItem("currentUser"),
    seats: seatInput.split(",").map(s => s.trim())
  });
  localStorage.setItem("bookings", JSON.stringify(bookings));
  localStorage.removeItem("selectedEventId");
  alert("Booking confirmed!");
  window.location.href = "confirmation.html";
}

function displayUserBookings() {
  const bookingsContainer = document.getElementById("bookingsContainer");
  bookingsContainer.innerHTML = "";
  const user = localStorage.getItem("currentUser");
  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  const userBookings = bookings.filter(booking => booking.user === user);
  
  if (userBookings.length === 0) {
    bookingsContainer.innerHTML = "<p>No bookings found.</p>";
    return;
  }

  fetch("data/events.json")
    .then(response => response.json())
    .then(eventsData => {
      userBookings.forEach(booking => {
        const bookingDiv = document.createElement("div");
        bookingDiv.className = "event-card";
        const event = eventsData.events.find(e => e.id === booking.eventId);
        const eventName = event ? event.name : "Unknown Event";
        
        bookingDiv.innerHTML = `
          <p><strong>Event:</strong> ${eventName}</p>
          <p><strong>Seats:</strong> ${booking.seats.join(", ")}</p>
          <button onclick="cancelBooking(${booking.eventId})">Cancel</button>
        `;
        bookingsContainer.appendChild(bookingDiv);
      });
    });
}

function cancelBooking(eventId) {
  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings = bookings.filter(booking => booking.eventId !== eventId);
  localStorage.setItem("bookings", JSON.stringify(bookings));
  alert("Booking canceled.");
  displayUserBookings();
}

function registerUser() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  if (!name || !email || !password) {
    alert("All fields are required!");
    return;
  }
  const hashedPassword = btoa(password);
  localStorage.setItem("user", JSON.stringify({ name, email, password: hashedPassword }));
  alert("Registration successful! Please log in.");
  window.location.href = "login.html";
}

function loginUser() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (!storedUser || storedUser.email !== email || storedUser.password !== btoa(password)) {
    alert("Invalid email or password!");
    return;
  }
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("currentUser", storedUser.name);
  alert(`Welcome, ${storedUser.name}!`);
  window.location.href = "index.html";
}

function logoutUser() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUser");
  alert("Logged out successfully.");
  window.location.href = "index.html";
}