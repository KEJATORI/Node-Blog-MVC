const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const { eventNames } = require('./models/blog');

// express app
const app = express();

// mongo url
const dbURI = 'mongodb+srv://kejatori:kejatori1399@cluster0.jpd4b.mongodb.net/node-blog?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        console.log('Listening');
        app.listen(process.env.PORT || 8000);
    })
    .catch((err) => {
        console.log(err);
    });
    

// register view engine
app.set('view engine', 'ejs');

// express static files & dev middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

// home  page
app.get('/', (req, res) => {
    res.redirect('/blogs');
})

// about page
app.get('/about', (req, res) => {
    res.render("about", {title: 'About'});
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render("404", {title: '404'});
});