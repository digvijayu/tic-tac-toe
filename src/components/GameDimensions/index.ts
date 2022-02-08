const MAX_WIDTH = 500, 
	MAX_HEIGHT = 500;

let gameDimensionUniqueInstance: Readonly<GameDimensions>;	

// A singleton object
class GameDimensions {
	readonly width: number = window.innerWidth > MAX_WIDTH ? MAX_WIDTH : window.innerWidth;
	readonly height: number = window.innerHeight > MAX_HEIGHT ? MAX_HEIGHT : window.innerHeight;
	
	constructor() {
		if(gameDimensionUniqueInstance){
			throw "An instance of Game Dimensions exists already";
		}
	}

	static getInstance() {
		return gameDimensionUniqueInstance;
	}
}

gameDimensionUniqueInstance = Object.freeze(new GameDimensions());
export default gameDimensionUniqueInstance;