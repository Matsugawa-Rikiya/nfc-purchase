DROP TABLE tbl_ticket_purchases;

CREATE TABLE tbl_ticket_purchases (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    ticket_type VARCHAR(255) NOT NULL CHECK (ticket_type IN ('バラ売り', 'セット売り')),
    amount INTEGER NOT NULL,
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
