import nengi from 'nengi'
import {Chat,Identity} from "./messages.js"
import { PlayerInput,Rotation } from './commands.js'
import * as Entities from "./entities.js"


const nengiConfig = {
    UPDATE_RATE: 20, 

    ID_BINARY_TYPE: nengi.UInt16,
    TYPE_BINARY_TYPE: nengi.UInt8, 

    ID_PROPERTY_NAME: 'nid',
    TYPE_PROPERTY_NAME: 'ntype', 

    USE_HISTORIAN: true,
    HISTORIAN_TICKS: 40,

    protocols: {
        entities: [
            ["Player",Entities.Player],
            ["Tree",Entities.Tree]
        ],
        localMessages: [],
        messages: [
            ["Chat",Chat],
            ["Identity",Identity]
        ],
        commands: [
            ["PlayerInput",PlayerInput],
            ["Rotation",Rotation]
        ],
        basics: []
    }
}

export default nengiConfig