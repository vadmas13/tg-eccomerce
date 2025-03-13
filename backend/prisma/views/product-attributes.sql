DROP VIEW IF EXISTS product_attributes;

CREATE VIEW product_attributes AS
SELECT 
    (SELECT id FROM product LIMIT 1) AS product_id,
    MIN(LEAST(price, COALESCE(discounted_price, price))) AS min_price,
    MAX(GREATEST(price, COALESCE(discounted_price, price))) AS max_price
FROM 
    product;