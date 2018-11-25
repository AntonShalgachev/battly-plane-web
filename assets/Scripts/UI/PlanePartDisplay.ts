// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import {SkillBarBehavior} from "UI/Behaviors/SkillBarBehavior";
import {PlanePartTypes} from "Global/GlobalHandler";
import {PlaneUpdateBehavior} from "UI/Behaviors/PlaneUpdateBehavior";
import * as GlobalHandler from "Global/GlobalHandler";

const {ccclass, property} = cc._decorator;

@ccclass
export class PlanePartDisplay extends cc.Component {

    @property(cc.Label)
    priceLabel: cc.Label = null;
    @property(SkillBarBehavior)
    skillBar: SkillBarBehavior = null;
    @property
    partType: PlanePartTypes = PlanePartTypes.none;
	@property(cc.Prefab)
    updateMenu: cc.Prefab = null;
    @property(cc.Node)
    menuUINode: cc.Node = null;

    private menuInst: cc.Node = null;

    onLoad(){
    	if(this.updateMenu != null && this.menuUINode != null){
    		this.menuInst = cc.instantiate(this.updateMenu);
    		this.menuInst.parent = this.menuUINode;
    	}
    	cc.systemEvent.on(GlobalHandler.GlobalHandler.EVENT_UPDATE_DATA, this.readGlobalData, this);
    }

    start(){
    	this.readGlobalData();
    }

    openMenu(){
    	if(this.menuInst == null){
    		return;
    	}

    	if(!this.menuInst.active){
    		let update = this.menuInst.getComponent(PlaneUpdateBehavior);
    		if(update != null){
    			update.setType(this.partType);
    		}
    		this.menuInst.active = true;
    	}
    }

    public readGlobalData(){
		let data = GlobalHandler.GlobalHandler.getInstance().getPlanePartData(this.partType); 
    	if(data != null){
	    	if(this.priceLabel != null){
	    		this.priceLabel.string = PlaneUpdateBehavior.getNextPrice(data).toString();
	    	}
	    	if(this.skillBar != null){
	    		this.skillBar.setMaxLvl(data.maxLvl);
    			this.skillBar.setLvl(data.currentLvl);
	    	}
	    }
    }
}
