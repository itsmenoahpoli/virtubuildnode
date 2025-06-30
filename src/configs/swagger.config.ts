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
        User: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "User ID",
            },
            userRoleId: {
              type: "integer",
              description: "User role ID",
            },
            firstName: {
              type: "string",
              description: "User first name",
            },
            middleName: {
              type: "string",
              description: "User middle name",
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
              description: "User password (encrypted)",
            },
            isEnabled: {
              type: "boolean",
              description: "Whether the user is enabled",
              default: false,
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "User creation timestamp",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "User last update timestamp",
            },
            deletedAt: {
              type: "string",
              format: "date-time",
              description: "User deletion timestamp (for soft deletes)",
            },
          },
        },
        UserData: {
          type: "object",
          required: [
            "firstName",
            "middleName",
            "lastName",
            "email",
            "password",
          ],
          properties: {
            firstName: {
              type: "string",
              description: "User first name",
            },
            middleName: {
              type: "string",
              description: "User middle name",
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
            isEnabled: {
              type: "boolean",
              description: "Whether the user is enabled",
              default: false,
            },
          },
        },
        UpdateUserData: {
          type: "object",
          properties: {
            firstName: {
              type: "string",
              description: "User first name",
            },
            middleName: {
              type: "string",
              description: "User middle name",
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
            isEnabled: {
              type: "boolean",
              description: "Whether the user is enabled",
            },
          },
        },
        Quiz: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "Quiz ID",
            },
            instructor_id: {
              type: "integer",
              description: "ID of the instructor who created the quiz",
            },
            title: {
              type: "string",
              description: "Title of the quiz",
            },
            description: {
              type: "string",
              description: "Description of the quiz",
            },
            questions: {
              type: "array",
              items: {
                type: "object",
                required: ["question", "type", "correct_answer"],
                properties: {
                  question: {
                    type: "string",
                    description: "The question text",
                  },
                  type: {
                    type: "string",
                    enum: ["enumeration", "multiple_choices"],
                    description: "Type of question",
                  },
                  correct_answer: {
                    type: "string",
                    description: "The correct answer",
                  },
                  choices: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        choice: {
                          type: "string",
                          enum: ["a", "b", "c", "d"],
                          description: "Multiple choice option",
                        },
                      },
                    },
                    description:
                      "Multiple choice options (only for multiple_choices type)",
                  },
                },
              },
              description: "Array of quiz questions",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Quiz creation timestamp",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Quiz last update timestamp",
            },
            deletedAt: {
              type: "string",
              format: "date-time",
              description: "Quiz deletion timestamp (for soft deletes)",
            },
          },
        },
        Assessment: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "Assessment ID",
            },
            instructor_id: {
              type: "integer",
              description: "ID of the instructor who created the assessment",
            },
            title: {
              type: "string",
              description: "Title of the assessment",
            },
            description: {
              type: "string",
              description: "Description of the assessment",
            },
            questions: {
              type: "array",
              items: {
                type: "object",
                required: ["question", "type", "correct_answer"],
                properties: {
                  question: {
                    type: "string",
                    description: "The question text",
                  },
                  type: {
                    type: "string",
                    enum: ["enumeration", "multiple_choices"],
                    description: "Type of question",
                  },
                  correct_answer: {
                    type: "string",
                    description: "The correct answer",
                  },
                  choices: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        choice: {
                          type: "string",
                          enum: ["a", "b", "c", "d"],
                          description: "Multiple choice option",
                        },
                      },
                    },
                    description:
                      "Multiple choice options (only for multiple_choices type)",
                  },
                },
              },
              description: "Array of assessment questions",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Assessment creation timestamp",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Assessment last update timestamp",
            },
            deletedAt: {
              type: "string",
              format: "date-time",
              description: "Assessment deletion timestamp (for soft deletes)",
            },
          },
        },
        QuizSubmission: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "Submission ID",
            },
            student_id: {
              type: "integer",
              description: "ID of the student who submitted the quiz",
            },
            quiz_id: {
              type: "integer",
              description: "ID of the quiz that was submitted",
            },
            answers: {
              type: "array",
              items: {
                type: "object",
                required: ["question_index", "student_answer", "is_correct"],
                properties: {
                  question_index: {
                    type: "integer",
                    description: "Index of the question (0-based)",
                  },
                  student_answer: {
                    type: "string",
                    description: "Student's answer to the question",
                  },
                  is_correct: {
                    type: "boolean",
                    description: "Whether the answer is correct",
                  },
                },
              },
              description: "Array of student answers with correctness",
            },
            score: {
              type: "number",
              format: "float",
              description: "Percentage score (0-100)",
            },
            is_submitted: {
              type: "boolean",
              description: "Whether the quiz has been submitted",
              default: false,
            },
            submitted_at: {
              type: "string",
              format: "date-time",
              description: "Timestamp when the quiz was submitted",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Submission creation timestamp",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Submission last update timestamp",
            },
            deletedAt: {
              type: "string",
              format: "date-time",
              description: "Submission deletion timestamp (for soft deletes)",
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
