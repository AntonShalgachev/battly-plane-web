// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import {PlaneData} from "Global/GameData/PlaneData";
import {OptionsData} from "Global/GameData/OptionsData";

const {ccclass, property} = cc._decorator;

@ccclass
export class GameData extends cc.Component {

    @property
    playerID: string = "Demo";

    @property
    playerCash: number = 1400;

    @property
    missionCheckPoints: Array<number> = [0, 0, 0];

    @property(PlaneData)
    planeData: PlaneData = null;

    @property(OptionsData)
    optionsData: OptionsData = null;
}
