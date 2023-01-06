const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const port = 3000;

// Exptress app
const app = express();

// Connect to database
const dbURI = 'mongodb+srv://Riya:Riya7299@cluster0.1rltxmb.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => app.listen(port, () => console.log(`server is running on port ${port}`)))
    .catch(err => console.log(err));

// Register view engine
app.set('view engine', 'ejs');

// Middleware
app.use(morgan('dev'));

// Static files
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true}));

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