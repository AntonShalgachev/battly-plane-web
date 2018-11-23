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
    return true;
}

@ccclass
export class Storage {
	private constructor(){}

	public static gameSave() {
    	Storage.loopISerializables(Storage.trySaveNode);
	}

	public static gameLoad() {
    	Storage.loopISerializables(Storage.tryLoadNode);
	}

	private static loopISerializables(callback: (Node: cc._BaseNode) => void){
		let root = cc.director.getScene();
		if(root != null){
			root.walk(callback, null);
		}
	}

	private static trySaveNode(Node: cc._BaseNode){
		let cmps = Node.getComponents(cc.Component);
		for(let cmp of cmps){
			if(IsISerializable(cmp)){
				//let userData = JSON.stringify(cmp.save());
				cc.sys.localStorage.setItem(cmp.getID(), cmp.save());
			}
		}
	}

	private static tryLoadNode(Node: cc._BaseNode){
		let cmps = Node.getComponents(cc.Component);
		for(let cmp of cmps){
			if(IsISerializable(cmp)){
				let userData = cc.sys.localStorage.getItem(cmp.getID());
				cmp.load(userData);
			}
		}
	}		
}
