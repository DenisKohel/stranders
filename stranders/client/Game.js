import nengiConfig from "../common/nengiConfig.js"
import nengi from "nengi"
import { Client } from "./Client.js"
import * as Graphs from "./graphs.js"
import { Display } from './Display.js';
import Input from "./Input.js";
import { PlayerInput, Rotation } from "../common/commands.js";
import { Camera } from "./Camera.js";
import { Player } from './graphs.js';
import { Joystick } from './Joystick';

export class Game{
constructor(){
   // this.joystick1 = new Joystick()

    const graphs = this.graphs = []
    this.graphsToDelete = []
    const client = this.client = new Client({port: 8079})
    
    this.camera = new Camera()
    this.player;let playerID = 0
    client.on("message::Identity",(data)=>{playerID = data.nid
    this.camera.setBorder(data.borderWidth,data.borderHeight)})
    client.on("create",(data)=>{let graph = new Graphs[data.protocol.name](data)
    if(data.nid == playerID){this.player = graph
        this.camera.setFollowing(this.player.entity)
    } 
    this.addGraph(graph)
    }) 
    client.on("update",(data)=>{let graph = graphs[data.nid]
    graph.entity[data.prop] = data.value})
    client.on("delete",(nid)=>{this.graphsToDelete[nid] = this.graphs[nid]})
  
    Display.current.renderer.view.onmousemove = ()=>{
        if(!this.player){return}{
        let mouse = Display.current.mouse
            let x = mouse.x - this.player.x
            let y = mouse.y - this.player.y
            
            let rotation = Math.atan2(y,x)
            this.client.addCommand(new Rotation(rotation))
            
         }
    }
    /* Display.current.renderer.view.onpointerdown = ()=>{
        console.log("pointed")
    } */
    
    
}
update(delta){
    this.client.readNetworkAndEmit()
    
if (Input.current.checkChange() == true){
    this.dir = getPlayerInputDir()
    this.client.addCommand(new PlayerInput(this.dir,delta))}
//if(this.joystick1.dir.x || this.joystick1.dir.y){console.log(this.joystick1.angle.now)}
    
    this.camera.update()
    for (let i in this.graphs){this.graphs[i].update(delta,this.camera)}
    predictPlayer(this.player)
    
    for (let nid in this.graphsToDelete){delete this.graphs[nid]
    console.log("deleted " + this.graphsToDelete[nid])}

    
    this.client.update()
}
addGraph(graph){
    this.graphs[graph.entity.nid] = graph
}
}

function getPlayerInputDir(){
    let keys = Input.current.keys
    let moveX = keys.D.down - keys.A.down
    let moveY = keys.S.down - keys.W.down
    let hypotenuse = Math.sqrt(moveX*moveX + moveY*moveY)
    let dir = {x: moveX / hypotenuse || 0, y: moveY / hypotenuse || 0}
    return dir
}

function predictPlayer(player){
    if(!player){return}
    let mouse = Display.current.mouse
    let x = mouse.x - player.x
    let y = mouse.y - player.y
    player.rotation = Math.atan2(y,x)
}