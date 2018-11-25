// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export class TwoStateBehavior extends cc.Component {

    @property(cc.Color)
    stateOff: cc.Color = cc.Color.WHITE;

    @property(cc.Color)
    stateOn: cc.Color = cc.Color.BLACK;

    onLoad(){
    	this.node.color = this.stateOff;
    }

    public switchState(){
    	if(this.node.color == this.stateOff){
    		this.node.color = this.stateOn;
    	}
    	else{
    		this.node.color = this.stateOff
    	}
    }

    public switchOn(){
        this.node.color = this.stateOn;
    }

    public switchOff(){
        this.node.color = this.stateOff;
    }
}
