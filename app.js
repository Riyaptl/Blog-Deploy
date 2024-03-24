const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const dotenv = require("dotenv");

// Exptress app
dotenv.config()
const app = express();

// Connect to database
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => app.listen(process.env.PORT, () => console.log(`server is running on port ${process.env.PORT}`)))
    .catch(err => console.log(err));

// Register view engine
app.set('view engine', 'ejs');

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true}));

// Static files
app.use(express.static('public'));

// Routes
app.get("/", (req,res) => {
    res.redirect("/blogs")
});

app.get("/about", (req,res) => {
    res.render("about", {title: "About"})
});

app.use("/blogs", blogRoutes);

app.use((req,res) => {
    res.status(404).render("404", {title:"404"})
});