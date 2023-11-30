# ReactJS Crypto Wallet

Welcome to the ReactJS Crypto Wallet project! This project allows you to manage your cryptocurrency assets and see the transaction with a user-friendly web interface.

## Table of Contents

- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Features](#features)
- [Usage](#usage)
  - [Running in Docker](#running-in-docker)
- [Folder Structure](#folder-structure)
- [License](#license)

## Getting Started

### **Installation**

To install the Reactjs Crypto Wallet, you need to follow these steps:
```bash
$ git clone https://github.com/bagusgandhi/crypto-wallet-fe.git

$ cd ./crypto-wallet-fe

$ npm install
```

### **Configuration**
Copy the .env.example file to .env.local or .env.production and configure it with your API keys and other environment variables
```bash
# env for local environment
$ cp .env.example .env.local

# env for prod environment
$ cp .env.example .env.production
```

Fill the backend api endpoint
```bash
VITE_API_ENDPOINT="endpoint crypto wallet api"
```
For the backend repository you can check in this link: [Crypto Wallet API](https://github.com/bagusgandhi/crypto-wallet-api)

## Features
- **User Authentication**: Securely log in and manage your wallet with user accounts.
- **Transaction History**: Track your transaction history with detailed information.

## Usage
Start the app for development:
```bash
$ npm run dev
```
The application will be available at http://localhost:5173.

Start the app for production:
```bash
# you need build the app first
$ npm run build

# install pm2
$ npm install pm2 -g

# run pm2
$ pm2-runtime pm2.config.cjs
```
The application will be available at http://localhost:3000.

### Running In Docker
Create .env.production and test running production in localy,before deploy to docker
```bash
$ cp .env.example .env.production
```
After everything is OK, then run the docker compose up
```bash
$ docker composeup -d --build
```

## Folder Struture
```
crypto-wallet-fe/
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── services/
│   ├── services/
│   ├── stores/
│   ├── App.tsx
│   ├── main.tsx
│   └── ...
│
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── ...
```

## License
This project is licensed under the MIT License.
