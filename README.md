# Store API

This project is a Node.js-based API for managing a store, utilizing technologies such as Sequelize, PostgreSQL, Hapi framework, Stripe, and Amazon S3 for file storage.

## Database Design

### Products

- id (Primary Key)
- product_name
- category_id (Foreign Key referencing Categories)
- brand_id (Foreign Key referencing Brands)
- price
- stock_quantity
- average_rating (calculated field, average of all product ratings)
- created_at
- updated_at

### Categories

- id (Primary Key)
- category_name
- created_at
- updated_at

### Brands

- id (Primary Key)
- brand_name
- country_of_origin
- created_at
- updated_at

### Customers

- user_id (Primary Key)
- customer_name
- email
- phone_number
- address
- created_at
- updated_at

### Orders

- id (Primary Key)
- customer_id (Foreign Key referencing Customers)
- order_date
- total_amount
- voucher_id (Foreign Key referencing Vouchers, nullable)
- created_at
- updated_at

### OrderDetails

- id (Primary Key)
- order_id (Foreign Key referencing Orders)
- product_id (Foreign Key referencing Products)
- quantity
- unit_price
- created_at
- updated_at

### Feedback

- id (Primary Key)
- product_id (Foreign Key referencing Products)
- user_id (Foreign Key referencing Users)
- feedback_text
- rating
- created_at
- updated_at

### Users

- id (Primary Key)
- username
- email
- password
- user_type (enum: user, admin)
- created_at
- updated_at

### Vouchers

- id (Primary Key)
- discount_percent
- expiry_date
- created_at
- updated_at

### FileUpload

- id (Primary Key)
- content_type
- file_name
- is_s3
- is_verify
- public_url
- key
- created_at
- updated_at

## Installation

```bash
npm init -y
yarn add pg pg-hstore sequelize hapi dotenv cors nodemon sequelize-cli inflection
npm install eslint-config-airbnb eslint-config-airbnb-base eslint-plugin-prettier prettier
npx sequelize init
sequelize migration:generate --name create-table-Users
