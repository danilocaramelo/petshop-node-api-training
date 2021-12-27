const moment = require("moment");
const connection = require("../infraestrutura/connection");

class Atendimento {
  adiciona(atendimento, res) {
    const dataCriacao = moment().format("YYYY-MM-DD hh:mm:ss");
    const data = moment(atendimento.data, "DD/MM/YYYY").format(
      "YYYY-MM-DD hh:mm:ss"
    );

    const isValidDate = moment(data).isSameOrAfter(dataCriacao);
    const isValidClient = atendimento.cliente.length >= 5;

    const validations = [
      {
        name: "data",
        valid: isValidDate,
        message: "Data deve ser maior ou igual a data atual",
      },
      {
        name: "client",
        valid: isValidClient,
        message: "Nome do cliente deve ter ao menos 5 caracteres",
      },
    ];

    const errors = validations.filter((field) => !field.valid);

    if (errors.length) {
      res.status(400).json(errors);
    } else {
      const atendimentoDatado = {
        ...atendimento,
        dataCriacao,
        data,
      };
      const sql = "INSERT INTO atendimentos SET ?";

      connection.query(sql, atendimentoDatado, (error, result) => {
        if (error) {
          res.status(400).json(error);
        } else {
          res.status(201).json(result);
        }
      });
    }
  }

  lista(res) {
    const sql = "SELECT * FROM atendimentos";

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(result);
      }
    });
  }

  buscaPorId(id, res) {
    const sql = `SELECT * FROM atendimentos WHERE id=${id}`;

    connection.query(sql, (error, result) => {
      const atendimento = result[0];
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(atendimento);
      }
    });
  }
}

module.exports = new Atendimento();
