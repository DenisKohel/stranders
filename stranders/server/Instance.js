import nengi from "nengi"
import {Chat} from "../common/messages.js"
import instanceHookAPI from "./instanceHookAPI.js"
import nengiConfig from "../common/nengiConfig.js"

export default class Instance extends nengi.Instance{
    constructor(port){
        super(nengiConfig, { port: port })
        instanceHookAPI(this)
        this.on('connect', ({ client, callback }) => {
            /* client init logic & state can go here */
            callback({ accepted: true, text: 'Welcome!' })
            this.message(new Chat('hello'), client)

            this.on('disconnect', client => {
                // disconnected
            })
        })
    }
}