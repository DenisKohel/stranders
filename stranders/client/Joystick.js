export class Joystick{
    constructor(){
        const joybutton = this.joybutton = document.createElement("div")
        const joycircle = document.createElement("div")
        
        document.body.appendChild(joycircle)
        document.body.appendChild(joybutton)

        joycircle.style.position = "absolute"
        joycircle.style.top = "75%"
        joycircle.style.left = "25%"
        joycircle.style.transform = "translate(-50%, -50%)"
        joycircle.style.zIndex = "2"
        joycircle.style.borderRadius = "50%";
        joycircle.style.backgroundColor = "transparent";
        joycircle.style.border = "0.25vw solid rgba(128, 128, 128, 0.5)";
        joycircle.style.width = "11vw"
        joycircle.style.height = "11vw"

        joybutton.style.position = "absolute"
        joybutton.style.top = "75%"
        joybutton.style.left = "25%"
        joybutton.style.transform = "translate(-50%, -50%)"
        joybutton.style.zIndex = "1"
        joybutton.style.width = "4vw"
        joybutton.style.height = "4vw"
        joybutton.style.borderRadius = "50%";
        joybutton.style.backgroundColor = "rgba(128, 128, 128, 0.5)";

        joybutton.addEventListener('dragstart', (event) => {
            event.preventDefault()
        })

        joycircle.addEventListener('dragstart', (event) => {
            event.preventDefault()
        })

    let isDragging = false

let maxLength = 90
let initialPos = {x:0,y:0}
let newPos = {x:0,y:0}
let vector = {x:0,y:0}
let length = this.length
let dir = this.dir = {x:0,y:0}

let angle = this.angle = {now:0,previous:0}


    joycircle.addEventListener("pointerdown", function(event) {
        isDragging = true;
    
        initialPos = {x:joybutton.offsetLeft,y:joybutton.offsetTop}
      });
      
      document.addEventListener("pointermove", function(event) {
        if (isDragging) {
          // Move the button based on the pointer position and offset

          newPos.x = event.clientX
          newPos.y = event.clientY

        vector = {x: newPos.x - initialPos.x,y: newPos.y - initialPos.y}
        length = Math.sqrt(vector.x*vector.x + vector.y*vector.y)
        dir.x = vector.x/length || 0
        dir.y = vector.y/length || 0
        this.angle.now = Math.acos(dir.x) || 0
    
        let visualMaxLength = maxLength * window.innerWidth / 1508
        if(length >= visualMaxLength){
            newPos.x = initialPos.x + dir.x * visualMaxLength
            newPos.y = initialPos.y + dir.y * visualMaxLength

        }
        
          joybutton.style.left = newPos.x + "px";
          joybutton.style.top = newPos.y + "px";
        }
      });
      
      document.addEventListener("pointerup", function(event) {
        isDragging = false;

        length = 0
        dir.x = 0
        dir.y = 0
        angle.now = 0
        joybutton.style.left = "25%"
        joybutton.style.top = "75%"
      });

    
    }
}
