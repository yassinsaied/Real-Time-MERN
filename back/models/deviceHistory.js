const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DeviceHistorySchema = new mongoose.Schema({
  deviceName: { type: String, required: true },
  currentPower: String,
  totalPowerConsumption: String,
  state: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("DeviceHistory", DeviceHistorySchema);
