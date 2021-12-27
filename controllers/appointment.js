const Appointment = require("../models/appointment");

module.exports = (app) => {
  app.get("/atendimentos", (req, res) => Appointment.list(res));

  app.get("/atendimentos/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Appointment.searchById(id, res);
  });

  app.post("/atendimentos", (req, res) => {
    const atendimento = req.body;
    Appointment.add(atendimento, res);
  });

  app.patch("/atendimentos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const valores = req.body;

    Appointment.update(id, valores, res);
  });

  app.delete("/atendimentos/:id", (req, res) => {
    const id = parseInt(req.params.id);

    Appointment.delete(id, res);
  });
};
