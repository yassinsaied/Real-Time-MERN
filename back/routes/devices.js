const express = require("express");
const router = express.Router();
const Device = require("../models/device");

module.exports = (mqttClient) => {
  const router = express.Router();

  // Endpoint pour récupérer toutes les devices
  router.get("/", async (req, res) => {
    try {
      const devices = await Device.find();
      res.json(devices);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // Endpoint pour récupérer les informations d'un device
  router.get("/:deviceName", async (req, res) => {
    try {
      const device = await Device.findOne({
        deviceName: req.params.deviceName,
      }).populate({
        path: "history",
        options: { sort: { timestamp: -1 } },
      });
      if (!device) {
        return res.status(404).json({ message: "Device not found" });
      }
      res.json(device);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // Endpoint pour changer l'état d'un device
  router.post("/:deviceName/:state", async (req, res) => {
    const state = req.params.state;
    const deviceName = req.params.deviceName;
    const topic = `testTech/${deviceName}/set`;
    const message = JSON.stringify({ state: state });

    mqttClient.publish(topic, message, async (err) => {
      if (err) {
        return res.status(500).send(err);
      }
      try {
        const updatedDevice = await Device.findOneAndUpdate(
          { deviceName: deviceName },
          { state: state },
          { new: true }
        );
        res.status(200).json(updatedDevice);
      } catch (dbErr) {
        res.status(500).json({ message: dbErr.message });
      }
    });
  });

  return router;
};
