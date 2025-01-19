# Coupon System Frontend

## Overview

The Coupon System Frontend is a web application developed using React, TypeScript, and Vite. It serves as the user interface for the Coupon System, enabling companies to manage coupons and customers to view and redeem them. This frontend interacts seamlessly with the [Coupon System Backend](https://github.com/Mentzer1/Coupon-system-backend) to provide a cohesive user experience.

## Features

### Administrator Dashboard
- Manage company profiles.
- Create, update, and delete companies and customers.

### Company Dashboard
- Create, update, and delete coupons.

### Customer Interface
- Browse available coupons.
- Purchase coupons.
- View purchase history.

### Responsive Design
- Optimized for various devices and screen sizes.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Superset of JavaScript that adds static typing.
- **Vite**: Next-generation frontend tooling for fast builds.
- **ESLint**: Linting utility for maintaining code quality.

## Getting Started

### Prerequisites

- **Node.js**: Ensure Node.js is installed on your system.
- **npm or Yarn**: Package manager for installing dependencies.

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Mentzer1/Coupon-system-frontend.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd Coupon-system-frontend
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

4. **Configure environment variables**:
   - Create a `.env` file in the root directory.
   - Add the following variables:

     ```env
     VITE_BACKEND_URL=http://localhost:8080
     ```

     Replace `http://localhost:8080` with the actual URL of your backend service.

5. **Run the application**:

   ```bash
   npm run dev
   ```

   or

   ```bash
   yarn dev
   ```

6. **Access the application**:
   - Open your browser and navigate to `http://localhost:3000`.

## Usage

- **Company Users**:
  - Log in to access the company dashboard.
  - Manage coupons and view analytics.
- **Customers**:
  - Browse available coupons without logging in.
  - Sign up or log in to redeem coupons and view your history.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

This project is built upon modern web development technologies to provide a fast and responsive user experience for managing and redeeming coupons.
