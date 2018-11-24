const {ccclass, property} = cc._decorator;

import InputController from "Controller/InputController";
import ProjectileShooter from "Gameplay/ProjectileShooter";

@ccclass
export default class GunInputController extends cc.Component {
	@property(ProjectileShooter)
	shooter: ProjectileShooter = null;
	@property
	actionKey: number = 0;

    onLoad () {
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
    	if (this.isActionKey(e.keyCode)) {
    		this.setWeaponActive(true);
    	}
    }

    onKeyUp (e: cc.Event.EventKeyboard) {
    	if (this.isActionKey(e.keyCode)) {
    		this.setWeaponActive(false);
    	}
    }

    setWeaponActive(isActive: boolean) {
    	this.shooter.weaponActive = isActive;
    }
}
