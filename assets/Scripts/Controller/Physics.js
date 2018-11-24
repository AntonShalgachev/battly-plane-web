// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        debugDraw: {
            default: false,
        },
        drawAABB: {
            default: false,
        },
        drawPair: {
            default: false,
        },
        drawCenterOfMass: {
            default: false,
        },
        drawJoint: {
            default: false,
        },
        drawShape: {
            default: false,
        },
    },

    getDebugFlags () {
        let flags = 0;

        if (this.debugDraw) {
            if (this.drawAABB)
                flags |= cc.PhysicsManager.DrawBits.e_aabbBit;
            if (this.drawPair)
                flags |= cc.PhysicsManager.DrawBits.e_pairBit;
            if (this.drawCenterOfMass)
                flags |= cc.PhysicsManager.DrawBits.e_centerOfMassBit;
            if (this.drawJoint)
                flags |= cc.PhysicsManager.DrawBits.e_jointBit;
            if (this.drawShape)
                flags |= cc.PhysicsManager.DrawBits.e_shapeBit;
        }

        return flags;
    },

    onLoad () {
        let physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
        physicsManager.debugDrawFlags = this.getDebugFlags();
        physicsManager.enabledAccumulator = true;
        physicsManager.FIXED_TIME_STEP = 1/30;
        physicsManager.PTM_RATIO = 100;

        let collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true;
        collisionManager.enabledDebugDraw = true;
        collisionManager.enabledDrawBoundingBox = true;
    },
});
