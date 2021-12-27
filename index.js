const customExpress = require("./config/customExpress");
const connection = require("./infrastructure/connection");
const tables = require("./infrastructure/tables");

connection.connect((erro) => {
  if (erro) {
    console.log(erro);
  } else {
    console.log("banco conectado");

    tables.init(connection);
    const app = customExpress();

    app.listen(3000, () => console.log("servidor rodando na porta 3000"));
  }
});
