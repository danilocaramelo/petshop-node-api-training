const connection = require("../infrastructure/connection");
const fileUpload = require("../files/uploadFiles");

class Pet {
  add(pet, res) {
    const query = "INSERT INTO Pets SET ?";

    fileUpload(pet.imagem, pet.nome, (error, newPath) => {
      if (error) {
        res.status(400).json({ error });
      } else {
        const newPet = { nome: pet.nome, imagem: newPath };
        connection.query(query, newPet, (error) => {
          if (error) {
            console.log(error);
            res.status(400).json(error);
          } else {
            res.status(200).json(newPet);
          }
        });
      }
    });
  }
}

module.exports = new Pet();
