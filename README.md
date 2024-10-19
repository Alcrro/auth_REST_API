src/
├── entities/              # Core domain entities
│   └── User.js
├── use-cases/             # Business logic (application layer)
│   └── RegisterUser.js
│   └── LoginUser.js
├── interfaces/            # Adapters for external systems (repositories, services)
│   ├── repositories/
│   │   └── MongooseUserRepository.js
│   ├── services/
│   │   └── JwtService.js
├── controllers/           # HTTP Controllers (API Layer)
│   └── UserController.js
├── infrastructure/        # Framework and external service initialization (MongoDB, Express, etc.)
│   └── database.js
│   └── routes.js
└── app.js                 # Main entry point for the application (Express server setup)
