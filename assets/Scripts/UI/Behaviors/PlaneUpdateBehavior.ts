// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import {SkillBarBehavior} from "SkillBarBehavior";
import * as GlobalHandler from "GlobalHandler";
import MathHelper = require("MathHelper");

const {ccclass, property} = cc._decorator;

@ccclass
export class PlaneUpdateBehavior extends cc.Component {

    @property(cc.Label)
    titleLabel: cc.Label 		= null;
    @property(cc.Label)
    descLabel: cc.Label 		= null;
    @property(cc.Label)
    priceLabel: cc.Label 		= null;
    @property(SkillBarBehavior)
    skillBar: SkillBarBehavior 	= null;
    @property(cc.Sprite)
    partIcon: cc.Sprite         = null;

    private partData: GlobalHandler.PlanePartData;
    private partType: GlobalHandler.PlanePartTypes = GlobalHandler.PlanePartTypes.none;

    onLoad(){
    	this.node.active = false;
    }

    onEnable(){
    	this.partData = GlobalHandler.GlobalHandler.getInstance().getPlanePartData(this.partType);
    	if(this.partData != null){
    		this.updateData(this.partData);
    	}
        let icon = GlobalHandler.GlobalHandler.getInstance().getPlanePartIcon(this.partType);
        if(icon != null){
            this.partIcon.spriteFrame = icon;
        }
    }

    public setType(type: GlobalHandler.PlanePartTypes){
    	this.partType = type;
    }

    public updateData(data: GlobalHandler.PlanePartData){
    	if(this.titleLabel != null){
    		this.titleLabel.string = data.name;
    	}
    	if(this.descLabel != null){
    		this.descLabel.string = data.description;
    	}
    	if(this.priceLabel != null){
    		this.priceLabel.string = PlaneUpdateBehavior.getNextPrice(data).toString();
    	}
    	if(this.skillBar != null){
    		this.skillBar.setMaxLvl(data.maxLvl);
    		this.skillBar.setLvl(data.currentLvl);
    	}
    	GlobalHandler.GlobalHandler.getInstance().setPlanePartData(this.partType, data);
    }

    public buySkill(){
    	if(this.partData != null){
	    	let cash = GlobalHandler.GlobalHandler.getInstance().getCash();
			let price = PlaneUpdateBehavior.getNextPrice(this.partData);
	    	if(cash >= price && this.partData.currentLvl < this.partData.maxLvl){
	    		cash -= price;
	    		this.partData.currentLvl++;
	    		this.updateData(this.partData);
	    		GlobalHandler.GlobalHandler.getInstance().setCash(cash);
	    		cc.systemEvent.emit(
	    			GlobalHandler.GlobalHandler.EVENT_UPDATE_DATA,
	    			new cc.Event("", false)
	    		);
	    	}
	    	else{
	    		// TODO show wrong cash msg on label
	    		cc.log("no money - no honey");
	    	}
	    }
    }

    public static getNextPrice(data: GlobalHandler.PlanePartData): number{
    	let price = data.pricePerLvl[MathHelper.clamp(
				data.currentLvl + 1,
				0,
				data.maxLvl
		)];
		if(price == undefined){
			price = 0;
		}
		return price;
    }
}
