import { Display } from './Display';
const display = Display.current
export class Camera{
    constructor(){
        this.x = 0
        this.y = 0
        
    }
    update(p){return}
    setBorder(w,h){this.border = {width: w,height: h}}
    setFollowing(entity){this.entity = entity
        this.update = function(){this.x = this.entity.x;this.y = this.entity.y
        this.stayInBounds()
        }
    }
    stayInBounds(){
        if(this.x < 0){this.x = 0}
        else if(this.x > this.border.width){this.x = this.border.width}
        if(this.y < 0){this.y = 0}
        else if(this.y > this.border.height){this.y = this.border.height}
       
    
    }

}