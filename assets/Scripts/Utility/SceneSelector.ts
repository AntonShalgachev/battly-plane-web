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
export default class SceneSelector extends cc.Component {

	public gotoNext(){

	}

	public gotoPrevious(){

	}

	public gotoByName(name: string){

	}

	private getScene(){
		cc.director.getScene()
	}

	getSceneName: function() {
    //console.log(cc.game._sceneInfos)
    //console.log(cc.director._scene._id)
    var sceneName
    var _sceneInfos = cc.game._sceneInfos
    for (var i = 0; i < _sceneInfos.length; i++) {
        if(_sceneInfos[i].uuid == cc.director._scene._id) {
            sceneName = _sceneInfos[i].url
            sceneName = sceneName.substring(sceneName.lastIndexOf('/')+1).match(/[^\.]+/)[0]
        }

    }

    return sceneName
}
}
