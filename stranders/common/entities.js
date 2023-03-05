import * as Comps from "./components.js"
import nengi from "nengi"
class Entity{
    constructor(data){
        this.x = 100
        this.y = 100
        this.rotation = 0
        this.scale = 6
        this.delta = 0
        Object.assign(this,data) // TODO: change to variables

        //this.comps = []
        this.updateComps = [{update:function(){return}}]
    }
    update(){for(let i in this.updateComps){this.updateComps[i].update(this)}}
    addComp(component,data){
    let comp = new component(data,this)
    this[comp.name] = comp
    }
}

export class Player extends Entity{
    constructor(){
        super({})
        this.control = {dir:{x:0,y:0}}
        this.addComp(Comps.Physics,{speed: 1000})
    }
}
Player.protocol = {x:{type: nengi.Number, interp: true},
y:{type: nengi.Number, interp: true},
rotation:{type: nengi.RotationFloat32, interp: true},
scale:{type: nengi.Number, interp: true},
}

export class Tree extends Entity{
    constructor(){
        super({scale:7 + Math.random()*3,rotation:Math.random()*Math.PI*2})
    }
}
Tree.protocol = {x:{type: nengi.Number, interp: true},
y:{type: nengi.Number, interp: true},
rotation:{type: nengi.RotationFloat32, interp: true},
scale:{type: nengi.Number, interp: true},
}