const express = require('express');
const router = express.Router();
const meals = require('../models/meal_db');
const prevMeals = require('../models/meal');
const multer = require("multer");

const storage = multer.diskStorage({
    destination: "public/images/", //path to upload
    filename: (req, file, callback) => { //filename template
        callback(null, `${Date.now()}_${file.originalname}`)
    }
})
const upload = multer({ storage: storage })


// define the home page route
router.get('/', function(req, res) {
    console.log(meals.getMealAVGRating(3));
    let uniqueItems = [...new Set(toNumbers(getCookieItem(req, "recent-bought")))];
    let data = {
        page: "index",
        meals: meals.getAllMeals(),
        cart: toNumbers(getCookieItem(req, "cart")),
        ratings: meals.getAllAVGRating(),
        recentBought: uniqueItems,
    }
    res.render("index.njk", data);
});

router.get('/detail/:mealId', function(req, res) {

    const id = req.params.mealId;
    console.log("reviws",
        meals.getMealReviews(id));
    console.log("reviws",
        meals.getMealReviews(id).length);
    let data = {
        page: "detail",
        meal: prevMeals.getMealById(id),
        meals: prevMeals.getAllMeals(),
        rating: meals.getMealAVGRating(id),
        reviews: meals.getMealReviews(id),
        cart: toNumbers(getCookieItem(req, "cart")),
    }
    res.render("detail.njk", data);
});

router.route('/:mealId/reviews').get(async function(req, res) {
    const meal_id = req.params.mealId;
    const reviews = meals.getMealReviews(meal_id);
    console.log(reviews);
    res.json(reviews);

}).post(upload.single('photo'), function(req, res, next) {
    try {
        console.log("wasalna");
        req.body.image = req.file.filename;
        req.body.date = new Date().yyyymmdd();
        newReview = req.body;
        newReview.rating = parseInt(newReview.rating);
        newReview.meal_id = parseInt(newReview.meal_id);
        console.log(newReview);


        meals.addMealReview(newReview);
        res.redirect(`/detail/${newReview.meal_id}`);
    } catch (e) {
        console.log("error: " + e);
    }

});





Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();
    let time = formatAMPM(this);
    return [this.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd
    ].join('/') + " " + time;
};


function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}















const getCookieItem = (req, item) => {
    items = []
    if (req.headers.cookie) {
        let newCart = getAppCookies(req)[item]

        if (newCart) { //checking if it is undefined
            array = decodeURIComponent(newCart)
            json = JSON.parse(array.substr(2, array.length));
            items.push(...json);
        }
    }
    return items;
}


const toNumbers = arr => arr.map(Number);


const getAppCookies = (req) => {
    // We extract the raw cookies from the request headers
    const rawCookies = req.headers.cookie.split('; ');
    // rawCookies = ['myapp=secretcookie, 'analytics_cookie=beacon;']

    const parsedCookies = {};
    rawCookies.forEach(rawCookie => {
        const parsedCookie = rawCookie.split('=');
        // parsedCookie = ['myapp', 'secretcookie'], ['analytics_cookie', 'beacon']
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });
    return parsedCookies;
};

module.exports = router;