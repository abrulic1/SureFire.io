const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'SureFire.io',
        version: '1.0.0',
        description: 'API documentation using Swagger',
      },
      servers: [
        {
          url: 'http://localhost:5000',
          description: 'Development server',
        },
    ],
    },
    apis: ['./routes/*.js'], // Path to the API route files
};
  
module.exports = { options };