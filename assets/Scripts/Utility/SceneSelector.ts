// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

export enum TransitionEfx {
  None,
  Fade
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class SceneSelector extends cc.Component {

	public gotoScene(event: cc.Event, scene: string){
        //scene: string, efx: TransitionEfx = TransitionEfx.None
        //cc.log("goto scene - " + event);
        //cc.log("goto data - " + scene);
        let canvas = cc.Canvas.instance;
        if(canvas != null){
            let node = canvas.node;
            node.runAction(cc.sequence( 
                cc.fadeOut(1.0),
                cc.callFunc(function () {
                    cc.director.loadScene(scene, function(){
                        let canvas = cc.Canvas.instance;
                        if(canvas != null){
                            let node = canvas.node;
                            node.opacity = 0; 
                            node.runAction(cc.fadeIn(1.0));
                        }
                    })
                })
            ));
        }
        //cc.director.loadScene(scene);
        /*let efx = TransitionEfx.None; 
        switch(efx){
            case TransitionEfx.Fade:
                let canvas = cc.Canvas.instance;
                if(canvas != null){
                    let node = canvas.node;
                    node.runAction(cc.sequence( 
                        cc.fadeOut(1.0),
                        cc.callFunc(function () {
                            cc.director.loadScene(scene, function(){
                                let canvas = cc.Canvas.instance;
                                if(canvas != null){
                                    let node = canvas.node;
                                    node.runAction(cc.fadeIn(1.0));
                                }
                            })
                        })
                    ));
                }
            default:
                cc.director.loadScene(scene);
        }*/
	}

    /*private fadeInOut(dir: boolean, callback: (str: string) => void){
        let canvas = cc.Canvas.instance;
        if(canvas != null){
            if(dir){
                cc.fadeOut(1.0)
            }
            else{
                cc.fadeIn(1.0)
            }
        }
    }*/
}
