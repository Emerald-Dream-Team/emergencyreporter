# Emergency Management System

## Overview

The Emergency Management System is a web-based application designed to facilitate real-time communication and information sharing during emergency situations. It consists of two main components: the Admin Panel and the Guest Interface. The system allows administrators to update emergency information and remove emergencies. Guests can access real-time emergency information.

## Components

### 1. Admin Panel

#### Features

- **Update Emergency:** Admins can update the emergency type and evacuation area in real-time.
- **Remove Emergency:** Admins can clear the current emergency information.

#### Usage

1. Access the Admin Panel by providing the correct password.
2. Update emergency information.
3. Remove the current emergency when necessary.

### 2. Guest Interface

#### Features

- **Real-time Emergency Information:** Guests can view real-time updates on the current emergency type and evacuation area.

#### Usage

1. Access the Guest Interface to stay informed about the current emergency.

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Communication:** Socket.IO for real-time bidirectional event-based communication
- **Styling:** Responsive design for optimal user experience

## Setup

1. Clone the project repository.
2. Install dependencies using `npm install`.
3. Run the server using `node server/app.js`.
4. Access the Admin Panel and Guest Interface through their respective URLs.

## Dependencies

- [Socket.IO](https://socket.io/): A JavaScript library for real-time web applications.
- [Express](https://expressjs.com/): Web application framework for Node.js.

## Project Structure

- **`public` folder:** Contains static files for the Guest Interface.
- **`admin` folder:** Contains static files for the Admin Panel.
- **`server/app.js`:** Node.js server file.

## Developers

- [Arnav Kakani](https://github.com/Cabrothers) and [Alex Liao](https://github.com/alexliao95311)

## Notes

- Customize the project as needed for your specific use case.
- Ensure secure practices for password handling and user authentication.
- Make sure to handle sensitive information securely, especially in a production environment.

Feel free to enhance and modify the documentation based on your project's specific details and requirements.
