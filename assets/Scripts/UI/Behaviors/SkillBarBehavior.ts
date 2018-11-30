// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import {TwoStateBehavior} from "TwoStateBehavior";

const {ccclass, property} = cc._decorator;

@ccclass
export class SkillBarBehavior extends cc.Component {

    @property(cc.Prefab)
	cellPrefab: cc.Prefab = null;

    @property
    cellMax: number = 5;

    private currentLvl: number;

    onLoad(){
    	for(let i = 0; i < this.cellMax; i++){
    		let cell = cc.instantiate(this.cellPrefab);
    		cell.parent = this.node;
    	}
    }

    public setLvl(lvl: number){
    	if(lvl > 0 && lvl < this.cellMax){
    		lvl--;
    		let cells = this.getComponentsInChildren(TwoStateBehavior);
    		for(let cell of cells){
	    		if(lvl >= 0){
	    			cell.switchOn();
	    		}
	    		else{
	    			cell.switchOff();
	    		}
	    		lvl--;
	    	}
    	}
    }
    public setMaxLvl(lvl: number){
        if(lvl > 0 && lvl < this.cellMax){
            lvl--;
            let cells = this.getComponentsInChildren(TwoStateBehavior);
            for(let cell of cells){
                if(lvl >= 0){
                    cell.node.active = true;
                }
                else{
                    cell.node.active = false;
                }
                lvl--;
            }
        }
    }
}
