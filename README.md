# Store API

- This project is a Node.js-based API for managing a store, utilizing technologies such as Sequelize, PostgreSQL, Hapi framework, Stripe, and Amazon S3 for file storage.
- Swagger UI documentation: [localhost:8888/documentation]()
- Swagger json documentation: [localhost:8888/swagger.json]()

## Database Design

### Products

- id (type string uuid, Primary Key)
- category_id (type string uuid, Foreign Key referencing Categories)
- brand_id (type string uuid, Foreign Key referencing Brands)
- product_name (type string)
- price (type float)
- stock_quantity (type int)
- average_rating (type float) (calculated field, average of all product ratings)
- created_at (type datetime)
- updated_at (type datetime)

### Categories

- id (type string uuid, Primary Key)
- category_name (type string)
- created_at (type datetime)
- updated_at (type datetime)

### Brands

- id (type string uuid, Primary Key)
- brand_name (type string)
- country_of_origin (type string)
- created_at (type datetime)
- updated_at (type datetime)

### Orders

- id (type string uuid, Primary Key)
- customer_id (type string uuid, Foreign Key referencing Customers)
- voucher_id (type string uuid, Foreign Key referencing Vouchers, nullable)
- order_date (type datetime)
- total_amount (type float)
- created_at (type datetime)
- updated_at (type datetime)

### OrderDetails

- id (type string uuid, Primary Key)
- order_id (type string uuid, Foreign Key referencing Orders)
- product_id (type string uuid, Foreign Key referencing Products)
- quantity (type int)
- unit_price (type float)
- created_at (type datetime)
- updated_at (type datetime)

### Feedback

- id (type string uuid, Primary Key)
- product_id (type string uuid, Foreign Key referencing Products)
- user_id (type string uuid, Foreign Key referencing Users)
- feedback_text (type text)
- rating (type float)
- created_at (type datetime)
- updated_at (type datetime)

### Users

- id (type string uuid, Primary Key)
- user_role_id (type string uuid,Foreign Key referencing UserRoles)
- username (type string, unique, not null)
- password (type not null)
- is_status (type boolean, default value true)
- created_at (type datetime)
- updated_at (type datetime)

### UserRoles

- id (Primary Key)
- user_role_name (unique, not null)
- created_at (type datetime)
- updated_at (type datetime)

### Customers

- user_id (type string uuid, Primary Key)
- email (type string unique)
- first_name (type string)
- last_name (type string)
- year_of_birth (type int)
- address (type string)
- phone (type string)
- created_at (type datetime)
- updated_at (type datetime)

### Vouchers

- id (type string uuid, Primary Key)
- discount_percent (type float)
- expiry_date (type datetime)
- created_at (type datetime)
- updated_at (type datetime)

### FilesUpload

- id (type string uuid, Primary Key)
- content_type (type string)
- file_name (type string)
- is_s3 (type boolean)
- is_verify (type boolean)
- public_url (type string)
- key (type string)
- created_at (type datetime)
- updated_at (type datetime)

## Installation

```bash
npm init -y
yarn add pg pg-hstore sequelize hapi dotenv cors nodemon sequelize-cli inflection
npm install eslint-config-airbnb eslint-config-airbnb-base eslint-plugin-prettier prettier
npx sequelize init
