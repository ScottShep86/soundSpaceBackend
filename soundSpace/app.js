// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

//adds isAuthenticated to routes
/* const {isAuthenticated} = require("./middleware/jwt.middleware") */

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authProducerRoutes = require("./routes/auth.producer.routes")
app.use("/auth", authProducerRoutes)

const producerRoutes = require("./routes/producers.routes")
app.use("/profile", producerRoutes)

const jobRoutes = require("./routes/job.routes")
app.use("/api/jobs", jobRoutes)

const allProducersRoutes = require("./routes/allProducers.routes")
app.use("/api/producers", allProducersRoutes)

const messageRoutes = require("./routes/message.routes")
app.use("/api/messages", messageRoutes)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
