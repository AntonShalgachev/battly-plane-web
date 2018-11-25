const {ccclass, property} = cc._decorator;

@ccclass
export default class Touchable extends cc.Component {
	@property([cc.Component.EventHandler])
	touchStartHandlers: cc.Component.EventHandler[] = [];
	@property([cc.Component.EventHandler])
	touchEndHandlers: cc.Component.EventHandler[] = [];
	@property(cc.Node)
	buttonSprite: cc.Node = null;
	@property
	buttonTargetScale: number = 0.9;
	@property
	transitionDuration: number = 0.05;

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

		if (this.buttonSprite) {
			let scaleAnimation = cc.scaleTo(this.transitionDuration, this.buttonTargetScale);
			this.buttonSprite.runAction(scaleAnimation);
		}
	}

	onTouchEnd () {
		this.invokeCallbacks(this.touchEndHandlers);

		if (this.buttonSprite) {
			let scaleAnimation = cc.scaleTo(this.transitionDuration, 1.0);
			this.buttonSprite.runAction(scaleAnimation);
		}
	}

	invokeCallbacks (callbacks: cc.Component.EventHandler[]) {
		cc.log('Invoking callbacks');
		cc.Component.EventHandler.emitEvents(callbacks);
	}
}
