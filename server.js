const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const connectDB = require("./config/db");

const app = express();

// Swagger Docs
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Rest API JS",
      description: "API Information",
      contact: {
        name: "Cool",
      },
      servers: ["http://localhost:5000"],
    },
  },
  apis: ["./routes/api/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(
  express.json({
    extended: false,
  })
);

// Connect Database
connectDB();

app.get("/", (req, res) => res.send("API Running"));

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
