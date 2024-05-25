const express = require("express");
const app = express();
const cors = require("cors");
const cookieparser = require("cookie-parser");

//dotenv configuration:
const dotenv = require("dotenv");
dotenv.config();

//connection database:
const connectDb = require("./db/config");
connectDb();

//middlewares:
app.use(
  // cors({
  //   credentials: true,
  // })
  cors({
    origin:["https://complaint-m.netlify.app"],
    methods:["POST","GET","PUT","DELETE"],
    credentials:true,
  })
);
// app.use((req, res, next) => {
//       res.setHeader("Access-Control-Allow-Origin", "");
//       res.header(
//           "Access-Control-Allow-Headers",
//           "Origin, X-Requested-with, Content-Type, Accept",
         
//       );
      
//       res.header("Access-Control-Allow-Credentials", "true"); // Allow credentials
     
//       next();
//   });
  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

const complaint = require("./route/complaintRoute");
const admin = require("./route/adminRoute");
app.use("/api/v1/admin", admin);
app.use("/api/v1/user", require("./route/userRoutes"));
app.use("/api/v1/complaint", complaint);

//files upload
app.listen(process.env.PORT, () => {
  console.log(`server is listening ${process.env.PORT}`);
});
