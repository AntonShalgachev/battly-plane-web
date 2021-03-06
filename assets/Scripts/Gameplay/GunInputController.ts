const {ccclass, property} = cc._decorator;

import InputController from "InputController";
import ProjectileShooter from "ProjectileShooter";
import ScoreController from "ScoreController";

@ccclass
export default class GunInputController extends cc.Component {
	@property(ProjectileShooter)
	shooter: ProjectileShooter = null;
	@property
	actionKey: number = 0;

    onLoad () {
        cc.systemEvent.on(ScoreController.EVENT_GAME_OVER, () => {
            this.enabled = false;
            this.setWeaponActive(false);
        });
        
    	cc.systemEvent.on(InputController.EVENT_KEY_DOWN, this.onKeyDown, this);
    	cc.systemEvent.on(InputController.EVENT_KEY_UP, this.onKeyUp, this);
    }

    onDestroy () {
    	cc.systemEvent.off(InputController.EVENT_KEY_DOWN, this.onKeyDown, this);
    	cc.systemEvent.off(InputController.EVENT_KEY_UP, this.onKeyUp, this);
    }

    start () {
    	this.setWeaponActive(false);
    }

    isActionKey (code: number) {
    	return code == this.actionKey;
    }

    onKeyDown (e: cc.Event.EventKeyboard) {
    	if (this.isActionKey(e.keyCode) && this.enabled) {
    		this.setWeaponActive(true);
    	}
    }

    onKeyUp (e: cc.Event.EventKeyboard) {
    	if (this.isActionKey(e.keyCode) && this.enabled) {
    		this.setWeaponActive(false);
    	}
    }

    setWeaponActive(isActive: boolean) {
        if (this.shooter)
    	    this.shooter.weaponActive = isActive;
    }
}
