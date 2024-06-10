const mqtt = require("mqtt");
const dotenv = require("dotenv");

// Charger les variables d'environnement à partir du fichier .env
dotenv.config();

const MQTT_BROKER_URL = process.env.MQTT_BROKER_URL || "mqtt://localhost";
const client = mqtt.connect(MQTT_BROKER_URL);

const devices = {
  smartPlug1: { state: "ON" },
  smartPlug2: { state: "ON" },
  smartPlug3: { state: "ON" },
};

client.on("connect", () => {
  console.log("Devices connected to MQTT broker");

  // Souscrire aux topics de commande
  for (const deviceName in devices) {
    const commandTopic = `testTech/${deviceName}/set`;
    client.subscribe(commandTopic, () => {
      console.log(`Subscribed to ${commandTopic}`);
    });
  }

  setInterval(() => {
    for (const deviceName in devices) {
      if (devices[deviceName].state === "ON") {
        const topic = `testTech/${deviceName}`;
        const message = JSON.stringify({
          deviceName: deviceName,
          currentPower: `${Math.floor(Math.random() * 1000)}W`,
          totalPowerConsumption: `${(Math.random() * 100).toFixed(2)}kWh`,
          state: devices[deviceName].state,
        });

        client.publish(topic, message, () => {
          console.log(`Message published to ${topic}: ${message}`);
        });
      }
    }
  }, 5000); // Publie un message toutes les 5 secondes pour chaque dispositif en état 'ON'
});

client.on("message", (topic, message) => {
  const parsedMessage = JSON.parse(message.toString());
  const deviceName = topic.split("/")[1];
  if (parsedMessage.state) {
    devices[deviceName].state = parsedMessage.state;
    console.log(`Device ${deviceName} state updated to ${parsedMessage.state}`);
  }
});
