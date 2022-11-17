INSERT INTO cinema(cinema_id, theaters, capacity_attendance, location, payment_types, website, floor_area, opened, times) values (, 9)
CREATE TABLE movie(
    cinema_id INT AUTO_INCREMENT,
    theaters INT,
    capacity_attendance INT,
    location VARCHAR(255),
    payment_types ENUM('CASH', 'EFTPOS', 'PAYPAL', 'AFTERPAY', 'CREDIT CARD')
    website VARCHAR(55),
    floor_area INT,
    opened DATE,
    times DATETIME,
    PRIMARY KEY(cinema_id)
)

CREATE TABLE movie(
    title VARCHAR(50),
    genre VARCHAR(20),
    director VARCHAR(50),
    release_date DATE,
    PRIMARY KEY(title)
)

CREATE TABLE movie_cinema(
    cinema_id INT,
    theater_number INT,
    title VARCHAR(50),
    times DATETIME,
    release_date DATETIME,
    location VARCHAR(50),
    PRIMARY KEY(cinema_id)
)