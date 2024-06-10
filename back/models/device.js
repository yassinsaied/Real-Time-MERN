const mongoose = require("mongoose");

const DeviceSchema = new mongoose.Schema({
  deviceName: String,
  currentPower: String,
  totalPowerConsumption: String,
  state: String,
  date: {
    type: Date,
    default: Date.now,
  },
  history: [{ type: mongoose.Schema.Types.ObjectId, ref: "DeviceHistory" }],
});

module.exports = mongoose.model("Device", DeviceSchema);
