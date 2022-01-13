const fs = require("fs");
const pathLibrary = require("path");

module.exports = (path, fileName, createImageCallback) => {
  const validTypes = [".jpg", ".png", ".jpeg"];
  const fileType = pathLibrary.extname(path);
  const newPath = `./assets/images/${fileName}${fileType}`;

  if (validTypes.indexOf(fileType) === -1) {
    const error = "Tipo da imagem é inválido";
    console.log("Tipo inválido");
    createImageCallback(error);
  } else {
    fs.createReadStream(path)
      .pipe(fs.createWriteStream(newPath))
      .on("finish", () => createImageCallback(false, newPath));
  }
};
