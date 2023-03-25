const express = require("express");
const mongoose = require("mongoose");
const morgan =require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const errorHandler = require("./middleware/error")

//import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const jobTypeRoute = require("./routes/jobsTypeRoutes");
const jobRoute = require("./routes/jobsRoutes");


//database connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,

}).then(()=>{
    console.log("Connected to database");
})
.catch((err) => console.log(err));

//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json({limit: "5mb"}));
app.use(bodyParser.urlencoded({
    limit: "5mb",
    extended: true
}));

app.use(cookieParser());
app.use(cors());

//Routes middleware
// app.get('/', (req, res)=>{

//     res.send("Hello from node js");
// })
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', jobTypeRoute);
app.use('/api', jobRoute);
//error middleware

app.use(errorHandler);

//port
const port = process.env.PORT || 8000

app.listen(port, ()=> {
    console.log(`Server running on port${port}`);
});