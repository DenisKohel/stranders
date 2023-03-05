import nengi from "nengi"
import {Chat,Identity} from "../common/messages.js"
import nengiConfig from "../common/nengiConfig.js"
import Instance from './Instance';
import * as Entities from "../common/entities.js"


export class GameServer{
constructor(){
    const border = this.border = {width: 5760, height:3240}
    const instance = this.instance = new Instance(8079)
    this.entities = instance.entities.array
    this.generateWorld()

    instance.on("connect",({client})=>{
        let player = new Entities.Player()
        player.x = Math.random()*border.width
        player.y = Math.random()*border.height
        player.x = 100
        player.y = 100
        client.view = {
            x: player.x,
            y: player.y,
            halfWidth: border.width,
            halfHeight: border.height
        }

        client.player = player
        player.client = client
        instance.addEntity(player)
        instance.message(new Identity(client.player.nid,border),client)
    })
    instance.on("disconnect",(client)=>{
        
       instance.removeEntity(client.player) // TODO: Make toRemove list and remove entities in update loop
    })
    instance.on("command::PlayerInput",({command,client,tick})=>{
        client.player.control.dir = {x:command.dirX,y:command.dirY}
    client.player.delta = command.delta
                })
    instance.on("command::Rotation",({command,client,tick})=>{client.player.rotation = command.rotation})

}
update(){
    this.instance.emitCommands()
    for (let entity of this.entities){entity.update()}
    this.instance.clients.forEach(client => {
        client.view.x = client.player.x
        client.view.y = client.player.y
    })
    this.instance.update()
    
}

generateWorld(){
    for (let i = 0;i < 40; i++){
    let x = Math.random()*this.border.width
    let y = Math.random()*this.border.height
    let tree = new Entities.Tree()
    tree.x = x;tree.y = y
    this.instance.addEntity(tree)}
}

}


