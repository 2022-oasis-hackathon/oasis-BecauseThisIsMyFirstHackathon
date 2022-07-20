var express = require("express");
var router = express.Router();

/* GET home page. */
var express = require("express");
var router = express.Router();

router.get("/community", function (req, res, next) {
  res.render("community_s");
});

router.get("/community/north", function (req, res, next) {
  res.render("community_n");
});

router.get("/findPW", function (req, res, next) {
  res.render("findPW");
});

router.get("/journal/add", function (req, res, next) {
  res.render("journal_add");
});

router.get("/journal/checklist", function (req, res, next) {
  res.render("journal_checkList");
});

router.get("/journal/list", function (req, res, next) {
  res.render("journal_list");
});

router.get("/journal", function (req, res, next) {
  res.render("journal_main");
});

router.get("/login", function (req, res, next) {
  res.render("login");
});

router.get("/mypage", function (req, res, next) {
  res.render("mypage");
});

router.get("/register", function (req, res, next) {
  res.render("register");
});

router.get("/write", function (req, res, next) {
  res.render("write");
});

router.get("/", function (req, res, next) {
  res.render("main");
});

router.get("/review", function (req, res, next) {
  res.render("review");
});


module.exports = router;
module.exports = router;
