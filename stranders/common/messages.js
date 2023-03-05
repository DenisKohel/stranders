import nengi from "nengi"
export class Chat{
    constructor(text){
        this.text = text
    }
}
Chat.protocol = {text: nengi.String}

export class Identity{
    constructor(nid,border){
        this.nid = nid
        this.borderWidth = border.width
        this.borderHeight = border.height
    }
}
Identity.protocol = {nid: nengi.Number,
borderWidth: nengi.Number,
borderHeight: nengi.Number}

