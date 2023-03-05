import { Display } from './Display';
class Graph extends PIXI.Container{
    constructor(data){
        super()
        this.entity = data
        this.x = this.entity.x
        this.y = this.entity.y
        this.scale.set(this.entity.scale,this.entity.scale)
        this.rotation = this.entity.rotation
        this.pivot.set(0.5,0.5)
        
        
    }
    update(delta,camera){
    
        this.x = this.entity.x - camera.x + Display.current.width/2
        this.y = this.entity.y - camera.y + Display.current.height/2
        this.rotation = this.entity.rotation
        /* this.x = this.entity.x
        this.y = this.entity.y */
    }
} 

class Sprite{
    constructor(link){
        let sprite = PIXI.Sprite.from(link)
        sprite.anchor.set(0.5,0.5)
        return sprite
    }
}

export class Player extends Graph{
    constructor(data){
        super(data)
        this.sprite = new Sprite("./client/assets/player.png")
        this.addChild(this.sprite)
        console.log(this)
    }
}

export class Tree extends Graph{
    constructor(data){
        super(data)
        let sprites = ["./client/assets/tree.png","./client/assets/tree1.png"]
        this.sprite = new Sprite(sprites[this.entity.nid % sprites.length])
        this.addChild(this.sprite)
    }
}