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

export interface ISerializable {
	// Some key for saved data
	getID() : string;
	// Return string to save node data
	save()  : string;
	// Parse string to init node
	load(arg: string);
}

function IsISerializable(object: any): object is ISerializable {
    let res = (
    	object.getID !== undefined &&
    	object.save  !== undefined &&
    	object.load  !== undefined
    );
    return res;
}

@ccclass
export class Storage {
	private constructor(){}

	public static gameSave(){
    	Storage.loopISerializables(Storage.trySaveNode);
	}

	public static gameLoad(){
    	Storage.loopISerializables(Storage.tryLoadNode);
	}

	public static clear() {
		cc.log("Clearing local storage");
		cc.warn(cc.sys.localStorage);
		cc.sys.localStorage.clear();
	}

	private static loopISerializables(callback: (node: cc._BaseNode) => void){
		let root = cc.director.getScene();
		if(root != null){
			root.walk(callback, null);
		}
	}

	private static trySaveNode(node: cc._BaseNode){
		let cmps = node.getComponents(cc.Component);
		for(let cmp of cmps){
			if(IsISerializable(cmp)){
				//let userData = JSON.stringify(cmp.save());
				cc.sys.localStorage.setItem(cmp.getID(), cmp.save());
			}
		}
	}

	private static tryLoadNode(node: cc._BaseNode){
		let cmps = node.getComponents(cc.Component);
		for(let cmp of cmps){
			if(IsISerializable(cmp)){
				let userData = cc.sys.localStorage.getItem(cmp.getID());
				cc.sys.localStorage
				cmp.load(userData);
			}
		}
	}		
}
