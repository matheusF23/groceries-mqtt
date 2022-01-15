const mqtt = require('mqtt')

const app = require('./app')

const response_topic = 'groceries-response'
const request_topic = 'groceries-request'

const server = mqtt.connect('mqtt://test.mosquitto.org')

server.on('connect', () => {
  console.log("Conectado ao broker MQTT")
  server.publish(response_topic, 'WELCOME', { qos: 2, retain: true })

  server.subscribe(request_topic, (err) => {
    if (err) {
      console.error(err)
    }
  })
})

server.on("message", (topic, message) => {
  if (topic === request_topic) {
    try {
      const msg = message.toString().trim()
      console.log(`[x] Mensagem recebida: ${msg}`)

      const response = app(msg)

      server.publish(response_topic, response, { qos: 2 })
    } catch (e) {
      console.error(e)
    }
  }
})