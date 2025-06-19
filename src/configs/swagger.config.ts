import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "VirtuBuild Application API",
      version: "1.0.0",
      description: "API documentation for VirtuBuild backend services",
      contact: {
        name: "Patrick Policarpio",
      },
    },
    servers: [
      {
        url: "http://localhost:9000/api",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        SigninCredentials: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              description: "User email address",
            },
            password: {
              type: "string",
              description: "User password",
            },
          },
        },
        SignupData: {
          type: "object",
          required: ["firstName", "lastName", "email", "password"],
          properties: {
            firstName: {
              type: "string",
              description: "User first name",
            },
            middleName: {
              type: "string",
              description: "User middle name (optional)",
            },
            lastName: {
              type: "string",
              description: "User last name",
            },
            email: {
              type: "string",
              format: "email",
              description: "User email address",
            },
            password: {
              type: "string",
              description: "User password",
            },
          },
        },
        UserRole: {
          type: "object",
          required: ["name"],
          properties: {
            name: {
              type: "string",
              description: "Role name",
            },
            isEnabled: {
              type: "boolean",
              description: "Whether the role is enabled",
              default: true,
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Error message",
            },
            status: {
              type: "number",
              description: "HTTP status code",
            },
          },
        },
        SuccessResponse: {
          type: "object",
          properties: {
            data: {
              type: "object",
              description: "Response data",
            },
            message: {
              type: "string",
              description: "Success message",
            },
          },
        },
      },
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/modules/**/*.ts"],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

export const swaggerUiOptions = {
  explorer: true,
  customCss: ".swagger-ui .topbar { display: none }",
  customSiteTitle: "VirtuBuild Web Application API Documentation",
};

export { swaggerSpec, swaggerUi };
