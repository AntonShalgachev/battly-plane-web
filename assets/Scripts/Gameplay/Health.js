// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

import MathHelper from 'MathHelper.js';

cc.Class({
    extends: cc.Component,

    properties: {
        maxHealth: {
            default: 100.0
        }
    },

    takeDamage (damage) {
        setHealth(this.health - damage);
    },

    setHealth (health) {
        this.health = MathHelper.clamp(health, 0.0, this.maxHealth);
    },

    start () {
        this.health = this.maxHealth;
    },
});
