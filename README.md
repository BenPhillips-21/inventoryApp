Basic Express App that archives information about important maps and their cartographers.

Why maps? Because I like them :) 

Link: https://inventoryapp-production-f038.up.railway.app/catalog/maps

    **Features**
    Routing: Defines the URLs and HTTP methods that the application will respond to, directing incoming requests to the appropriate handler functions or middleware.
    Middleware: Functions that have access to the request and response objects and can perform tasks such as parsing request bodies, validating input data, handling errors, and more. They are executed sequentially in the order they are defined.
    Template Engines: Used to dynamically generate HTML content by combining data from the server with pre-defined HTML templates. Template engines like Pug/Jade or EJS allow for the creation of reusable and modular views.
    Data Storage and Retrieval: Involves interacting with databases to store and retrieve application data. Libraries like Mongoose for MongoDB or Sequelize for SQL databases provide an interface for working with databases in Node.js.
    Validation and Sanitization: Ensures that user input data is valid and safe to use by validating against predefined rules and sanitizing to prevent malicious input. Express-validator is a popular middleware for validating and sanitizing request data.
    Error Handling: Involves handling errors that occur during the execution of the application, including synchronous errors within route handlers and asynchronous errors in promises or async/await functions. Proper error handling ensures graceful degradation and informative error messages.
    Static File Serving: Allows the application to serve static files (e.g., HTML, CSS, JavaScript, images) to clients. Express's express.static() middleware is commonly used to serve static assets from a specified directory.
    RESTful API Design: Follows the principles of Representational State Transfer (REST) to design APIs that are scalable, stateless, and follow a uniform interface.
