const express = require("express")
const router = express.Router()

const IndexController = require("../controllers")

router.route("/").get(IndexController.indexPage)


module.exports = router