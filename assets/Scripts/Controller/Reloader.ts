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
export default class NewClass extends cc.Component {

	ctrlModifier: boolean = false;
	shiftModifier: boolean = false;
	altModifier: boolean = false;

    onLoad () {
    	cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    	cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    onDestroy () {
    	cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    	cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    onKeyDown (e: cc.Event.EventKeyboard) {
    	if (e.keyCode == cc.macro.KEY.ctrl)
    		this.ctrlModifier = true;
    	if (e.keyCode == cc.macro.KEY.shift)
    		this.shiftModifier = true;
    	if (e.keyCode == cc.macro.KEY.alt)
    		this.altModifier = true;
    }

    onKeyUp (e: cc.Event.EventKeyboard) {
    	if (e.keyCode == cc.macro.KEY.ctrl)
    		this.ctrlModifier = false;
    	if (e.keyCode == cc.macro.KEY.shift)
    		this.shiftModifier = false;
    	if (e.keyCode == cc.macro.KEY.alt)
    		this.altModifier = false;
    	if (e.keyCode == cc.macro.KEY.r)
    		this.reloadScene();
    }

	reloadScene () {
		cc.director.loadScene(cc.director.getScene().name);
	}

	hasModifiers (ctrl: boolean, shift: boolean, alt: boolean) {
		return (this.ctrlModifier == ctrl) && (this.shiftModifier == shift) && (this.altModifier == alt);
	}
}
