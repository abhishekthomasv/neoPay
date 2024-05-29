# NeoPay

NeoPay is a mockup full-stack web application that provides a seamless experience for transferring of funds securely. It leverages technologies such as ReactJS, Tailwind CSS, MongoDB, ExpressJS, and JWTs to offer a robust and efficient platform for managing transactions.

## Features

- **User Authentication**: Users can sign up and sign in securely to access their accounts.
- **Dashboard**: A centralized hub where users can manage their transactions, view balances, and perform various operations.
- **Payment**: Users can initiate payments to other users within the platform.
- **Payment Confirmation**: Confirmation page ensures secure transactions and provides users with peace of mind.

## Technologies Used

- **Frontend**: ReactJS, Tailwind CSS
- **Backend**: MongoDB, ExpressJS
- **Authentication**: JSON Web Tokens (JWTs)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/abhishekthomasv/neopay.git
```

2. Navigate to the project directory:

```bash
cd neopay
```

3. Navigate to the frontend directory:

```bash
cd frontend
```

4. Install dependencies:

```bash
npm install
```

5. Navigate to the backend directory:

```bash
cd backend
```

6. Install dependencies:

```bash
npm install
```

7. Set up environment variables:

   - Create a `.env` file in the frontend directory.
   - Define the following variables:

   ```plaintext
   VITE_BASE_URL=your_server_base_url
   ```

   - Create a `.env` file in the backend directory.
   - Define the following variables:

   ```plaintext
   URI =  "mongodb+srv://<username>:<password>@beyondthebasics.abcde.mongodb.net/neoPay"
   JWT_SECRET = "YOURJWTSECRETKEY"
   ```

8. Start the development server:

```bash
node index.js
```

9. host the client on localhost:

```bash
npm run dev
```

## Backend API Endpoints

- **POST** `/api/v1/user/signup`: Register a new user.
- **POST** `/api/v1/user/signin`: Authenticate and log in a user.
- **GET** `/api/v1/user/me`: Retrieve current user's data.
- **POST** `/api/v1/account/transfer`: Initiate a payment.
- **GET** `/api/v1/user/bulk`: Filter and retrieve other user's data

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## Acknowledgments

- Special thanks to the developers of ReactJS, Tailwind CSS, MongoDB, ExpressJS, and JWTs for their amazing tools and libraries.

## Authors

- Abhishek Thomas Varghese https://github.com/abhishekthomasv
