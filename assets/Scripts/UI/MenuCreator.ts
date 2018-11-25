// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import {MenuBehavior} from "UI/Behaviors/MenuBehavior";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MenuCreator extends cc.Component {

    @property(cc.Prefab)
	menuPrefab: cc.Prefab = null;
	@property(cc.Node)
	menuParentNode: cc.Node = null;

	private menuInst: MenuBehavior = null;

    onLoad(){
    	if(this.menuPrefab != null){
			let menu 		= cc.instantiate(this.menuPrefab);
			if(this.menuParentNode != null)
			{
				menu.parent	= this.menuParentNode;
			}
			else{
				menu.parent = this.node;
			}
			this.menuInst  	= menu.getComponent(MenuBehavior);
			menu.active 	= false;
    	}
    }

    public openMenuCallback(){
    	if(this.menuInst != null){
    		this.menuInst.openCallback();
    	}
    }
}
