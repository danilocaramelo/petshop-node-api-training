const axios = require("axios");
const moment = require("moment");
const connection = require("../infrastructure/connection");

class Appointment {
  add(appointment, res) {
    const creationDate = moment().format("YYYY-MM-DD hh:mm:ss");
    const data = moment(appointment.data, "DD/MM/YYYY").format(
      "YYYY-MM-DD hh:mm:ss"
    );

    const isValidDate = moment(data).isSameOrAfter(creationDate);
    const isValidClient = appointment.cliente.length >= 5;

    const validations = [
      {
        name: "data",
        valid: isValidDate,
        message: "Date must to be later than today's date",
      },
      {
        name: "client",
        valid: isValidClient,
        message: "Client name must have 5 characters at least",
      },
    ];

    const errors = validations.filter((field) => !field.valid);

    if (errors.length) {
      res.status(400).json(errors);
    } else {
      const atendimentoDatado = {
        ...appointment,
        dataCriacao: creationDate,
        data,
      };
      const sql = "INSERT INTO atendimentos SET ?";

      connection.query(sql, atendimentoDatado, (error, result) => {
        if (error) {
          res.status(400).json(error);
        } else {
          res
            .status(201)
            .json({ status: 200, message: "created successfully" });
        }
      });
    }
  }

  list(res) {
    const sql = "SELECT * FROM atendimentos";

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(result);
      }
    });
  }

  searchById(id, res) {
    const sql = `SELECT * FROM atendimentos WHERE id=${id}`;

    connection.query(sql, async (error, result) => {
      const appointment = result[0];
      const cpf = appointment.cliente;
      if (error) {
        res.status(400).json(error);
      } else {
        const { data } = await axios.get(`http://localhost:8082/${cpf}`);
        appointment.cliente = data;
        res.status(200).json(appointment);
      }
    });
  }

  update(id, values, res) {
    if (values.data) {
      values.data = moment(values.data, "DD/MM/YYYY").format(
        "YYYY-MM-DD hh:mm:ss"
      );
    }
    const sql = "UPDATE atendimentos SET ? WHERE id=?";

    connection.query(sql, [values, id], (error, result) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(201).json({ ...values, id });
      }
    });
  }

  delete(id, res) {
    const sql = "DELETE FROM atendimentos WHERE id=?";

    connection.query(sql, id, (error, result) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json({ status: 200, message: "deleted successfully" });
      }
    });
  }
}

module.exports = new Appointment();
