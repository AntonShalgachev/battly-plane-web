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
export default class TapThruster extends cc.Component {

    @property
    upwardForce: number = 0.0;
    @property
    maxSpeed: number = 0.0;
    @property
    shutdownHeight: number = 0.0;
    @property
    shutdownDuration: number = 0.0;
    @property
    fuelConsumptionPerNewton: number = 0.0;

    body: cc.RigidBody;
    fuelTank: FuelTank;
    cooldown: number;

    pressedKeys: Set<number> = new Set<number>();
    keysDown: number = 0;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    	cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    	cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    onDestroy () {
    	cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    	cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    start () {
    	this.body = this.getComponent(cc.RigidBody);
    }

    isActionKey (code: number) {
    	switch (code) {
    		case cc.macro.KEY.space:
    			return true;
    	}

    	return false;
    }

    onKeyDown (e: cc.Event.EventKeyboard) {
    	if (this.isActionKey(e.keyCode) && !this.pressedKeys.has(e.keyCode)) {
    		this.pressedKeys.add(e.keyCode);
    		this.keysDown++;
    	}
    }

    onKeyUp (e: cc.Event.EventKeyboard) {
    	if (this.isActionKey(e.keyCode)) {
    		this.pressedKeys.delete(e.keyCode);
    		this.keysDown--;
    	}
    }

    update (dt) {
        this.cooldown -= dt;

        if (this.cooldown > 0.0)
            return;

        let speed = this.body.linearVelocity.y;

    	if (this.keysDown > 0 && speed < this.maxSpeed)
    		this.body.applyForceToCenter(cc.v2(0.0, this.upwardForce  * dt), true);

    	let height = this.node.y;
    	if (height > this.shutdownHeight)
    		this.cooldown = this.shutdownDuration;
    }
}
