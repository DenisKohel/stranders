import nengi from "nengi"
import nengiConfig from "../common/nengiConfig.js"


export class Client extends nengi.Client{
    constructor(settings){
    super(nengiConfig)

    let client = this

    client.onConnect(res => {
        client.emit('connected', res)
    })

    client.onClose(() => {
        client.emit('disconnected')
    })

    // turn all network data into events
    client.readNetworkAndEmit = () => {
        const network = client.readNetwork()

        network.messages.forEach(message => {
            client.emit(`message::${message.protocol.name}`, message)
        })

        network.localMessages.forEach(localMessage => {
            client.emit(`message::${localMessage.protocol.name}`, localMessage)
        })

        network.entities.forEach(snapshot => {
            snapshot.createEntities.forEach(entity => {
                client.emit(`create::${entity.protocol.name}`, entity)
                client.emit(`create`, entity)
            })

            snapshot.updateEntities.forEach(update => {
                client.emit(`update`, update)
            })

            snapshot.deleteEntities.forEach(id => {
                client.emit(`delete`, id)
            })
        })

        network.predictionErrors.forEach(predictionErrorFrame => {
            client.emit(`predictionErrorFrame`, predictionErrorFrame)
        })
    }
    
    this.on("message::Chat",(data)=>{console.log(data.text)})
    
    client.connect("ws://localhost:" + settings.port)
}
}