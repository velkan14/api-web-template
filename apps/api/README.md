# Shop API with HapiJs

Basic setup for HapiJs with Typescript

### Plugins

- Validation ([joi](https://github.com/sideway/joi))
- Database ([knex](https://knexjs.org/))
- Test ([Lab](https://hapi.dev/module/lab/) with [Code](https://hapi.dev/module/code/))

### Database

The database is currently saved in a file using sqlite.

### Endpoints

The api has the follwowing endpoints:

- GET `/api/v1/products` : Lists all the products
- GET `/api/v1/products/{productId}` : Gets the product correpondent to the productId or `400` if not found
- POST `/api/v1/products/{productId}/cartRemoved`: Increments the product `removedFromCart` field

### Develop

To develop the api, run the following command at the root of the project:

```
yarn dev:api
```

This will start the server in ([http://localhost:3000](http://localhost:3000))
