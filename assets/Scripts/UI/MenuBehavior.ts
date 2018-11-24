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
export default class MenuBehavior extends cc.Component {

    @property(cc.Button)
    closeButton: cc.Button = null;

    @property(cc.Label)
    titleLabel: cc.Label = null;

    @property
    title: string = 'Заголовок';

	@property
    saveOnClose: boolean = false;

	@property
    pauseOnOpen: boolean = false;

    onLoad(){
    	if(this.closeButton != null){
    		let handler = new cc.Component.EventHandler();
    		handler.target = this.node;
    		// this.name = nodeName<className> -- need to parse this
    		handler.component = 'MenuBehavior';
    		handler.handler = 'closeCallback';
    		this.closeButton.clickEvents.push(handler);
    	}

    	if(this.titleLabel != null){
    		this.titleLabel.string = this.title;
    	}
    }

    public closeCallback(){
    	this.node.active = false;
    }

    public openCallback(){
    	this.node.active = true;
    }
}
