# 🎟️ BookMyEvent – Event Booking System

BookMyEvent is a simple PHP and MySQL-based event booking system where users can register, browse upcoming events, and book tickets seamlessly.

---
For Guide Click This 👇

[![Watch the video](https://img.youtube.com/vi/Ucmay1b0Jmg/0.jpg)](https://www.youtube.com/watch?v=Ucmay1b0Jmg)

## 🚀 Features

- 🔐 User registration & login  
- 📅 Event listing with images and details  
- 🎫 Booking system with seat selection  
- 🧾 View and manage user bookings  
- 📱 Responsive design using HTML/CSS and JavaScript  

---

## 🧰 Tech Stack

- **Frontend**: HTML, CSS, JavaScript  
- **Backend**: PHP  
- **Database**: MySQL  

---

## 📂 Project Structure

```
htdocs/
├── booking.php
├── confirmation.php
├── index.php
├── login.php
├── myBookings.php
├── register.php
│
├── css/
│   └── styles.css
│
├── js/
│   └── script.js
│
├── php/
│   ├── config.php
│   ├── login.php
│   ├── register.php
│   ├── book.php
│   ├── get_events.php
│   ├── get_bookings.php
│   ├── cancel_booking.php
│   └── logout.php
```

---

## 💾 How to Run (Using XAMPP)

### 1. 🧑‍💻 Install XAMPP

If you don’t already have it:

- Download from: [https://www.apachefriends.org/index.html](https://www.apachefriends.org/index.html)
- Install XAMPP and start **Apache** and **MySQL** from the XAMPP control panel.

---

### 2. Download Zip Files [2 Options]
#### Option 1 📥 Direct Link (Paste in URL box)
```bash
https://github.com/rachit9876/booking.system/archive/refs/heads/main.zip
```
#### OR
#### Option 2 📥 Clone the Repository [Cmd/Terminal]

##### 🖥️ For **Windows** (PowerShell or Git Bash):
```bash
git clone https://github.com/rachit9876/booking.system.git
cd booking.system
explorer .
```

##### 🍎 For **macOS**:
```bash
git clone https://github.com/rachit9876/booking.system.git
cd booking.system
open .
```

##### 🐧 For **Linux** (Ubuntu/GNOME):
```bash
git clone https://github.com/rachit9876/booking.system.git
cd booking.system
xdg-open .
```


#### Copy the project folder into your `htdocs` directory of xampp, typically located at:

- Windows: `C:\xampp\htdocs`
- macOS/Linux: `/Applications/XAMPP/htdocs`

---

### 3. 🧱 Set Up the Database

- Open `XAMPP` and start `Apache` and `MySQL` from the XAMPP control panel.
- Open **phpMyAdmin** by visiting: `http://localhost/phpmyadmin/`
  
  [Click Here To Direct Start](http://localhost/phpmyadmin/)
- Create a new database by running the below 
- Run the SQL script below in the `SQL` tab of [http://localhost/phpmyadmin/](http://localhost/phpmyadmin/) :

```sql
CREATE DATABASE bookmyevent;
USE bookmyevent;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    venue VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(255) NOT NULL,
    seats_available INT NOT NULL
);

CREATE TABLE bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    seats TEXT NOT NULL,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (event_id) REFERENCES events(id)
);

-- Sample Events
INSERT INTO events (title, date, venue, price, image, seats_available) VALUES
('Ed Sheeran Live Concert', '2025-03-15', 'Madison Square Garden, NY', 120, 'https://i.postimg.cc/NGVqXswf/97b67038-f926-4676-be88-ebf94cb5c7d5-1802151-TABLET-LANDSCAPE-LARGE-16-9.webp', 100),
('UFC 300 - Championship Fight', '2025-04-10', 'T-Mobile Arena, Las Vegas', 250, 'https://i.postimg.cc/c4bbjXJx/OIP.jpg', 50),
('The Lion King - Broadway Show', '2025-05-05', 'Broadway Theatre, NYC', 80, 'https://i.postimg.cc/sxS4N9HX/image.jpg', 200),
('Formula 1 Grand Prix', '2025-06-20', 'Circuit de Monaco', 300, 'https://i.postimg.cc/XJ55jNf1/OIP.jpg', 500);
```

---


### 4. 🌐 Access the App

Open your browser and go to: 

```
http://localhost/booking.system/
```
- OR [Click Me](http://localhost/booking.system/)
---

### 5. ⚙️ Configure the Project [Optional]

- Open `php/config.php` and update your MySQL credentials:

```php
<?php
$host = 'localhost';
$db = 'bookmyevent';
$user = 'root';
$pass = ''; // Default for XAMPP is an empty password
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
```

---


## 🙌 Contributing

Feel free to fork the repo, suggest improvements, and submit pull requests!

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

---
