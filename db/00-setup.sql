CREATE TABLE products (
                          id INT UNSIGNED KEY NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
                          title VARCHAR(255) NOT NULL,
                          price DOUBLE NOT NULL,
                          description TEXT NOT NULL,
                          imageUrl VARCHAR(255) NOT NULL
);