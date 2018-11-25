const {ccclass, property} = cc._decorator;

import Health from "Gameplay/Health";

@ccclass
export default class NewClass extends cc.Component {
    @property(Health)
    health: Health = null;

    bar: cc.ProgressBar = null;

    onLoad () {
    	this.bar = this.getComponent(cc.ProgressBar);
    }

    update () {
    	if (!this.health)
    		return;
    	
    	this.bar.progress = this.health.getProgress();
    }
}
