const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
require("dotenv").config();

const authRouter=require("./routes/authRoutes");
const booksRouter = require('./routes/books');

const cors=require("cors");

const app=express();
const PORT=process.env.PORT|| 5000;
const DATABASE_URL=process.env.DATABASE_URL;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1/auth",authRouter);
app.use("/api/v1/books",booksRouter);

mongoose.connect(DATABASE_URL).then(()=>{
    console.log("MONGO DB CONNECTED SUCCESSFULLY");
    app.listen(PORT,()=>{
        console.log(`Server running on port:${PORT}`);

    })
})
.catch(error=>{
    console.error("Mongodb connection error",error);
    process.exit(1);
})



