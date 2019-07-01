const express = require("express");
const multer = require("multer"); // faz o express entender o o corpo da requisão atráves do Multipart Form
const uploadCofig = require("./config/upload");
// Controllers
const PostController = require("./controllers/PostController");
const LikeController = require("./controllers/LikeController");

const routes = new express.Router();
const upload = multer(uploadCofig);

routes.get("/posts", PostController.index);
routes.post("/posts", upload.single("image"), PostController.store);

routes.post("/posts/:id/like", LikeController.store);

module.exports = routes;
