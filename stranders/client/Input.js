export default class Input{
    
    constructor(keybinds){
        Input.current
        if (Input.current){return Input.current}
        this.hasChanged = false

        this.keys = keybinds || {
        W:{ code: 87},
        A:{ code: 65},
        S:{ code: 83},
        D:{ code: 68},
        Enter:{ code: 13}
        }

        for (let i in this.keys){this.keys[i].down = false;this.keys[i].pressed = false;this.keys[i].downPrev = false}

        window.addEventListener("keydown",this.inputHandler.bind(this))
        window.addEventListener("keyup",this.inputHandler.bind(this))

        Input.current = this
    }
    inputHandler(event){

        let keybind = Object.entries(this.keys).find(([k, kb]) => kb.code == event.keyCode)
        if (keybind) {
            let i = keybind[0] // W, A, Enter ...
            let key = keybind[1]
            if (event.type == "keydown"){key.down = true}
            else{key.down = false}

            if(key.down != key.downPrev){
            window.dispatchEvent(new CustomEvent(i,{detail:[key.down]}));
            this.hasChanged = true
            }
            key.downPrev = key.down
        
            //window.dispatchEvent(new CustomEvent("input"));
          }
    }
    checkChange(){
        if(this.hasChanged == true){this.hasChanged = false
            return true}
            else{return false}
    }
}