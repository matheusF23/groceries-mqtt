const mqtt = require('mqtt')

const app = require('./app')

const response_topic = 'groceries-response'
const request_topic = 'groceries-request'

const client = mqtt.connect('mqtt://test.mosquitto.org')

client.on('connect', () => {
  console.log("Conectado ao broker MQTT")
  client.subscribe(response_topic, (err) => {
    if (err) {
      console.error(err)
    }
  })
})

client.on("message", (topic, message) => {
  if (topic === response_topic) {
    try {
      
      const msg = message.toString().trim()
      const request = app(msg)

      if (msg.split('-|-')[0] === 'ERROR' || request === 'finished') {
        client.end()
      }

      client.publish(request_topic, request, { qos: 2 })
    } catch (e) {
      console.error(e)
    }
  }
})
