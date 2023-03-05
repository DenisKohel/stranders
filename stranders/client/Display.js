export class Display extends PIXI.Application{
    constructor(background,width,height){
    Display.current
    if (Display.current){return Display.current}

    super({background: background,width: width,height: height})
    this.width = width
    this.height = height
    this.aspectRatio = this.width/this.height
    PIXI.Renderer.type = PIXI.RENDERER_TYPE.CANVAS
   PIXI.BaseTexture.defaultOptions.scaleMode = PIXI.SCALE_MODES.NEAREST
   PIXI.settings.antialias = false
    this.renderer.view.style.imageRendering = "pixelated"
    this.renderer.view.style.imageRendering = "-moz-crisp-edges"
    this.renderer.view.style.imageRendering = "crisp-edges"

    this.renderer.view.style.position = "absolute"
    this.renderer.view.style.top = "50%"
    this.renderer.view.style.left = "50%"
    this.renderer.view.style.transform = "translate(-50%, -50%)"
    this.renderer.view.style.zIndex = "1"

    document.body.style.overflow = "hidden"
    document.body.style.margin = "0px"
    document.body.style.padding = "0px"

    document.body.appendChild(this.view)
    
    this.resize = function(){
        if(window.innerWidth/window.innerHeight > this.aspectRatio){
            this.resizedWidth = window.innerWidth
            this.resizedHeight = window.innerWidth / this.aspectRatio
        }
        else{
            this.resizedWidth = window.innerHeight * this.aspectRatio
            this.resizedHeight = window.innerHeight
        }
        this.renderer.view.style.width = "" + this.resizedWidth + "px"
        this.renderer.view.style.height = "" + this.resizedHeight + "px"   
    }
    this.resize()
    window.addEventListener("resize",this.resize.bind(this))

   
    this.mouse = this.renderer.events.rootPointerEvent.global
    this.stage.interactive = true
    Display.current= this
    }
    draw(graphs){
        for (let i in graphs){this.stage.addChild(graphs[i])}
    }
    undraw(graphsToDelete){for (let i in graphsToDelete){this.stage.removeChild(graphsToDelete[i])}
}

}