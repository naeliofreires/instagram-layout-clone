const Post = require("../models/Post");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

module.exports = {
  async index(req, res) {
    const posts = await Post.find().sort("-createdAt");

    return res.json(posts);
  },

  async store(req, res) {
    const { author, place, description, hashtags } = req.body;
    const { filename: image } = req.file;

    const [name] = image.split(".");
    const fileName = `${name}.jpg`;

    await sharp(req.file.path) // redimensionando o tamanho da imagem, para não ter sobrecarga na aplicação.
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(path.resolve(req.file.destination, "resized", fileName));

    fs.unlinkSync(req.file.path); // apagando a imagem(original) que esta fora da pasta resized

    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      image: fileName
    });

    req.io.emit("post", post);

    return res.json(post);
  }
};

// para buscar mais dados do file, der um [return res.json(req.file)] e veja todos os atributos
