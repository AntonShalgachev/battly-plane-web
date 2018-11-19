const {ccclass, property} = cc._decorator;

@ccclass
export default class InputController extends cc.Component {
	static EVENT_KEY_DOWN: string = "InputController.key_down";
	static EVENT_KEY_HOLD: string = "InputController.key_hold";
	static EVENT_KEY_UP: string = "InputController.key_up";

    pressedKeys: Set<number> = new Set<number>();

    onLoad () {
    	cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    	cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    onDestroy () {
    	cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    	cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    onKeyDown (e: cc.Event.EventKeyboard) {
    	if (this.pressedKeys.has(e.keyCode))
    		return;

		this.pressedKeys.add(e.keyCode);
		cc.systemEvent.emit(InputController.EVENT_KEY_DOWN, e);
    }

    onKeyUp (e: cc.Event.EventKeyboard) {
		this.pressedKeys.delete(e.keyCode);
		cc.systemEvent.emit(InputController.EVENT_KEY_UP, e);
    }

    update (dt) {
    	this.pressedKeys.forEach((keyCode: number) => {
    		cc.systemEvent.emit(InputController.EVENT_KEY_HOLD, keyCode);
    	});
    }
}
