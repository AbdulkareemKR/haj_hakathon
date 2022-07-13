const express = require('express');
const router = express.Router();
const meals = require('../models/meal');
const cookie = require("cookie-parser")


// define the home page route
router.get('/cart/', function(req, res) {
    const mealId = req.query.id;
    const back = req.query.back;
    cart = getCartCookie(req);

    cart.push(`${mealId}`);
    res.cookie("cart", cart);
    res.redirect(back);
});

router.post('/order/', function(req, res) {
    console.log("body", req.body);
    const mealsId = req.body.mealsId;
    const total = req.body.total;
    cart = getCartCookie(req);
    console.log("mealsId, total", mealsId, total);

    res.cookie("recent-bought", cart);
    res.clearCookie("cart");
    res.redirect("/");
});

const getCartCookie = (req) => {
    cart = []
    if (req.headers.cookie) {
        let newCart = getAppCookies(req).cart
        if (newCart) { //checking if it is undefined
            array = decodeURIComponent(newCart)
            json = JSON.parse(array.substr(2, array.length));
            cart.push(...json);
        }
    }
    return cart;
}

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