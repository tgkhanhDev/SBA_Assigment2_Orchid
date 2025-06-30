INSERT INTO roles (role_name) VALUES ('ADMIN');
INSERT INTO roles (role_name) VALUES ('CUSTOMER');

INSERT INTO accounts (account_name, email, password, role_id)
VALUES
    ('John Doe', 'john@example.com', '123', 1),
    ('Jane Smith', 'jane@example.com', '123', 2);

INSERT INTO categories (category_name)
VALUES
    ('Indoor'),
    ('Outdoor');

INSERT INTO orchids (is_natural, orchid_description, orchid_name, orchid_url, price, category_id)
VALUES
    (TRUE, 'A beautiful natural orchid', 'Natural Beauty', 'https://orchid.com/natural1.jpg', 20.0, 1),
    (FALSE, 'An artificial orchid for decoration', 'Plastic Charm', 'https://orchid.com/fake1.jpg', 10.5, 2);

INSERT INTO orders (account_id, order_date, order_status, total_amount)
VALUES
    (1, '2025-06-28', 'PENDING', 40.0),
    (2, '2025-06-29', 'COMPLETED', 21.0);

INSERT INTO order_details (orchid_id, price, quantity, order_id)
VALUES
    (1, 20.0, 2, 1),
    (2, 10.5, 2, 2);
