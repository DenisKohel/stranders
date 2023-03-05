
import { Display } from './Display';
import Input from './Input';
import { Client } from './Client';
import { Game } from './Game';
import { Joystick } from './joystick';

const display = new Display(0x203f29,1920,1080)
const input = new Input()

const game = new Game()


//renderer.init()

let tick = 0
let previous = performance.now()
const loop = function() {
    window.requestAnimationFrame(loop)
    const now = performance.now()
    const delta = (now - previous) / 1000
    previous = now
    tick++

    game.update(delta//, tick, now
        )
    display.draw(game.graphs)
    display.undraw(game.graphsToDelete)
    game.graphsToDelete = []
}

loop()
