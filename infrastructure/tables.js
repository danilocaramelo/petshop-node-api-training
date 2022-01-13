const connection = require("./connection");

class Tables {
  init(conecction) {
    this.conecction = connection;

    this.criarAtendimentos();
    this.criarPets();
  }

  criarAtendimentos() {
    const sql =
      "CREATE TABLE IF NOT EXISTS atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(11) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, data datetime NOT NULL, dataCriacao datetime NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))";
    this.conecction.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log("tabela atendimentos criada com sucesso");
      }
    });
  }

  criarPets() {
    const query =
      "CREATE TABLE IF NOT EXISTS Pets (id int NOT NULL AUTO_INCREMENT, nome varchar(50), imagem varchar(200), PRIMARY KEY (id))";
    this.conecction.query(query, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Tabela Pets criada com sucesso");
      }
    });
  }
}

module.exports = new Tables();
