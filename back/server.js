const express = require("express");
const mqtt = require("mqtt");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Device = require("./models/device");
const DeviceHistory = require("./models/deviceHistory");
// const deviceRoutes = require("./routes/devices");

dotenv.config();

// Utilisation d'express
const app = express();

const cors = require("cors");
app.use(cors());

// Utilisation d'express.json() et express.urlencoded()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connexion à MongoDB
const mongoUri =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/mqtt_devices";
mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Connexion au broker MQTT
const mqttBrokerUrl = process.env.MQTT_BROKER_URL || "mqtt://localhost";
const mqttClient = mqtt.connect(mqttBrokerUrl);

mqttClient.on("connect", () => {
  console.log("Connected to MQTT broker");
  mqttClient.subscribe("testTech/#", (err) => {
    if (err) {
      console.error("Error subscribing to topic:", err);
    }
  });
});

mqttClient.on("message", async (topic, message) => {
  const deviceData = JSON.parse(message.toString());
  const deviceName = topic.split("/")[1];

  try {
    const device = await Device.findOneAndUpdate(
      { deviceName: deviceName },
      deviceData,
      { upsert: true, new: true }
    );

    const deviceHistory = new DeviceHistory({
      ...deviceData,
    });

    const savedHistory = await deviceHistory.save();

    // Mettre à jour le document Device avec l'ID de l'historique
    device.history.push(savedHistory._id);
    await device.save();

    console.log("Device data and history updated:", device);
  } catch (err) {
    console.error("Error updating device data or history:", err);
  }
});

const deviceRoutes = require("./routes/devices")(mqttClient);
app.use("/devices", deviceRoutes);

// app.get("/", (req, res) => res.send("API RUNING"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
