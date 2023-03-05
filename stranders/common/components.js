
export class Physics{
    constructor({speed},that){
        this.name = "phys"
        this.dir = {x:0,y:0}
        
        this.vel = {x:0,y:0}
        this.speed = speed || 10

       that.updateComps.push(this)
    }
    update(that){
        
        this.dir.x = that.control.dir.x
        this.dir.y = that.control.dir.y
        
        this.vel.x = this.dir.x * this.speed * that.delta
        this.vel.y = this.dir.y * this.speed * that.delta
        
        that.x += this.vel.x
        that.y += this.vel.y

    
    }
}