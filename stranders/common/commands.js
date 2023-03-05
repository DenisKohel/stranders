import nengi from "nengi"

export class PlayerInput{
    constructor(dir,delta){
       this.dirX = dir.x
       this.dirY = dir.y
        this.delta = delta
    }
}
PlayerInput.protocol = {
    dirX: nengi.Number,
    dirY: nengi.Number,
    delta: nengi.Number
}

export class Rotation{
    constructor(rotation){
      this.rotation = rotation
    }
}
Rotation.protocol = {
    rotation: nengi.RotationFloat32
}