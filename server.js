const express = require('express');
const app = express();
const meal_router = require('./routers/meal_router');
const nunjucks = require('nunjucks');
const cookieParser = require("cookie-parser")
const bodyParser = require('body-parser');



nunjucks.configure('./views', {
    autoescape: true,
    express: app
});

// app.use(cookieParser())
// app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', meal_router);
// app.use('/sales/', sales_router);

// app.use(express.static(path.join(__dirname, '../punpm root -gblic')));
app.use(express.static("public"));



app.listen(process.env.PORT || 3000, function() {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});