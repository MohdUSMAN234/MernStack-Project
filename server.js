require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./router/auth-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const adminRoute = require("./router/admin-router")
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");


//lets tackle cors
const corsOptions = {
   origin: "http://localhost:5173",
   methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
   credentials: true,

};
app.use(cors(corsOptions));


//to get the json data in express file
app.use(express.json());

// Mount the Router: To use the router in your main Express app, you can "mount" it at a specific URL prefix
app.use("/api/auth", router);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);

app.use("/api/admin", adminRoute)

app.use(errorMiddleware);

const PORT = 5000;
connectDb().then(() => {
 app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
   });

});

