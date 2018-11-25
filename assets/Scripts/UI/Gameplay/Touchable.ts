const {ccclass, property} = cc._decorator;

@ccclass
export default class Touchable extends cc.Component {
	@property([cc.Component.EventHandler])
	touchStartHandlers: cc.Component.EventHandler[] = [];
	@property([cc.Component.EventHandler])
	touchEndHandlers: cc.Component.EventHandler[] = [];
	@property(cc.Node)
	buttonSprite: cc.Node = null;

	onLoad () {
		cc.log(this.node.name, 'onLoad');
		cc.log(cc.Node.EventType.TOUCH_START);
    	this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    	this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    	this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
	}

	onDestroy () {
		cc.log(this.node.name, 'onDestroy');
    	this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    	this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    	this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
	}

	onTouchStart () {
		this.invokeCallbacks(this.touchStartHandlers);
	}

	onTouchEnd () {
		this.invokeCallbacks(this.touchEndHandlers);
	}

	invokeCallbacks (callbacks: cc.Component.EventHandler[]) {
		cc.log('Invoking callbacks');
		cc.Component.EventHandler.emitEvents(callbacks);
	}
}
