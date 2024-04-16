# Ley Delivery

Ley Delivery is a delivery management application that allows users to register categories, products, view all orders, and update them efficiently. This project was developed using Node.js, Fastify, Drizzle ORM, Cloudflare's R2, and Vitest.

## Key Features

- **Category and Product Registration:** Users can add new categories and products to the system to organize their delivery items.

- **Order Viewing:** The system allows users to view all received orders, facilitating tracking of the order flow.

- **Order Updating:** Users have the ability to update the status of orders, such as "Preparing", "On the way", and "Delivered", to keep customers informed about the progress of their deliveries.

## Technologies Used

- **Node.js:** JavaScript runtime platform used to build the application's backend.

- **Fastify:** A lightweight and efficient web framework for Node.js, used to handle HTTP routes and provide a robust API.

- **Drizzle ORM:** An object-relational mapping (ORM) library for Node.js, making it easy to interact with the database and manipulate data models.

- **Cloudflare's R2:** An HTTP library for Node.js, used to make efficient and reliable HTTP requests to external services.

- **Vitest:** A testing framework for Node.js, allowing the creation and execution of automated tests to ensure code quality.

## Installation

To run this project locally, follow the steps below:

1. Ensure you have the following prerequisites installed:
   - **Node.js:** Download and install Node.js from [here](https://nodejs.org/).
   - **Docker:** Install Docker from [here](https://www.docker.com/get-started).
   - **Docker Compose:** Install Docker Compose from [here](https://docs.docker.com/compose/install/).


2. Clone this repository to your development environment:

```bash
git clone https://github.com/agleymelo/ley-delivery.git
```

3. Navigate to the project directory:

```bash
cd ley-delivery
```

4. Install project dependencies using npm or yarn:

```bash
npm install
```
or
```bash
yarn install
```

5. Upload a database container using the 
```bash
docker-compose up -d 
```

6. running database migrates to run the migrations just use the command

```bash
yarn migrate
```

7. Configure the necessary environment variables, such as database credentials and other environment-specific settings.

8. Start the development server:

```bash
npm start
```
or

```bash
yarn start
```

9. The server will be running at `http://localhost:3333` by default. You can access this URL in your browser to interact with the application.

## Contribution

Contributions are welcome! If you'd like to contribute to this project, follow these steps:

1. Fork this repository.

2. Create a branch for your feature:

```bash
git checkout -b feature/my-feature
```


3. Make your changes and commit them:
```bash
git commit -m "Add my feature"
```


4. Push to the remote repository:
```bash
git push origin feature/my-feature
```

5. Open a pull request in this repository. Describe your changes and wait for feedback.

## License

This project is licensed under the [MIT License](LICENSE).