const express = require("express")
const exphbs = require("express-handlebars")
const helpers = require("handlebars-helpers")()
const morgan = require("morgan")
const helmet = require("helmet")
const path = require("path")
const handlebarsHelpers = require("./helpers/handlebarsHelpers")
const allHelpers = {
    ...helpers,
    ...handlebarsHelpers
}

var app = express()

// Basic Security - Helmet
app.use(
    helmet({
        contentSecurityPolicy: false
    })
)

// Bodyparser
app.use(express.json({
    limit: "50mb"
})).use(
    express.urlencoded({
        extended: true,
        limit: "250mb"
    })
)

// Public explanation
app.use(express.static(path.join(__dirname, "public")))

// Template Engine
const hbs = exphbs.create({
    extname: "handlebars",
    defaultLayout: "main",
    helpers: allHelpers,
})

app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")
app.set("views", path.join(__dirname, "views"))

// Morgan explanation
app.use(morgan("dev"))

//locals
app.use(async (req, res, next) => {
    next()
})

app.use("/", require("./routers"))

//Error handler function
app.use((err, req, res, next) => {
    const error = app.get("env") === "development" ? err : {}
    const status = err.status || 500
    console.log(err)
    //Respond to client
    res.status(status).json({
        error: {
            message: error.message
        }
    })
    //Respond to ourselves
    console.error(err)
})

app.listen(3000, () => {
    console.log('listening on *:3000');
});