// Constants
var degToRad = Math.PI / 180.0;
var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;
var BOARD_RATIO = BOARD_WIDTH / BOARD_HEIGHT;
var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene()
{
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application)
{
	// Audio
	this.volume = 0.1;
	
	this.snd = new Audio("../resources/sound/Jazz.mp3");
	this.snd.volume = this.volume;
	this.snd.play();
	
	// Initialization
	CGFscene.prototype.init.call(this, application);

	this.initCameras();

	this.initLights();
	
	this.enableTextures(true);

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	// Object Declaration

	this.axis = new CGFaxis(this);

	this.table = new MyTable(this,0,1,0,1);
	
	this.wall = new Plane(this);
	
	this.leftWall = new MyQuad(this, -0.5,1.5,-0.5,1.5);
	
	this.leftWall2 = new MyQuad(this, 0,1,0,1);
	
	this.floor = new MyQuad(this, 0, 10, 0, 12);
	
	this.boardA = new Plane(this, BOARD_A_DIVISIONS, BOARD_RATIO, false);
	 
	this.boardB = new Plane(this, BOARD_B_DIVISIONS, BOARD_RATIO, true);
	
	this.sphere = new MySemiSphere(this, 16, 4);

	this.clock = new MyClock(this, 64, 2);
	
	this.drone = new MyDrone(this, 7.5, 12, 7.5);
	
	this.curve = new MyCurve(this);
	
	this.sswg = new MySemiSphereWithGround(this, 20, 20);
	
	this.cwt = new MyCylinderWithTops(this,3,6);
	
	this.box = new MyBox(this, 12,7.6, 15);
	
	this.globe = new MyGlobe(this);
	
	this.landingSite = new MyLandingSite(this, 22, 7.31, 16);
	
	this.lamp = new MyLamp(this);
	
	this.cylinder = new MyCylinderWithTops(this, 20,20);
	
	this.car = new MyCar(this, 9, 0.5 ,5);
	
	this.plane = new MyPlane(this,12,1,4);
	
	// Materials
	
	this.materialDefault = new CGFappearance(this);
	
	this.materialA = new CGFappearance(this);

	this.materialB = new CGFappearance(this);
	
	this.tableAppearance = new CGFappearance(this);
	
	this.floorAppearance = new CGFappearance(this);
	
	this.windowAppearance = new CGFappearance(this);
	
	this.slidesAppearance = new CGFappearance(this);
	
	this.boardAppearance = new CGFappearance(this);
	
	this.clockAppearance = new CGFappearance(this);
	
	this.bottomBlackDroneAppearance = new CGFappearance(this);
	
	this.lightMetalDroneAppearance = new CGFappearance(this);
	
	this.lightMetalWithFrontDroneAppearance = new CGFappearance(this);
	
	this.darkMetalDroneAppearance = new CGFappearance(this);
	
	this.lightBlueMetalDroneAppearance = new CGFappearance(this);
	
	this.darkBlueMetalDroneAppearance = new CGFappearance(this);
	
	this.redMetalDroneAppearance = new CGFappearance(this);
	
	this.whiteMetalDroneAppearance = new CGFappearance(this);
	
	this.greenTextureDroneAppearance = new CGFappearance(this);
	
	this.greyTextureDroneAppearance = new CGFappearance(this);
	
	this.blackDroneAppearance = new CGFappearance(this);
	
	this.boxAppearance = new CGFappearance(this);
	
	this.boxHookedAppearance = new CGFappearance(this);
	
	this.hookBoxAppearance = new CGFappearance(this);
	
	this.worldMapAppearance1 = new CGFappearance(this);
	
	this.worldMapAppearance2 = new CGFappearance(this);
	
	this.worldMapAppearance3 = new CGFappearance(this);

	this.woodAppearance = new CGFappearance(this);
	
	this.blackAppearance = new CGFappearance(this);
	
	this.landingSiteAppearance = new CGFappearance(this);
	
	this.tableLegsMaterial = new CGFappearance(this);
	
	this.lampAppearance = new CGFappearance(this);
	
	this.wallAppearance = new CGFappearance(this);
	
	this.stoneAppearance = new CGFappearance(this);
	
	this.carFrontTopAppearance = new CGFappearance(this);
	
	this.carFrontAppearance = new CGFappearance(this);
	
	this.carBackAppearance = new CGFappearance(this);
	
	this.carRedAppearance = new CGFappearance(this);
	
	this.carWheelsAppearance = new CGFappearance(this);
	
	this.currentWallAppearance = new CGFappearance(this);
	
	this.initTextures();

	// Clock
	this.setUpdatePeriod(10);

	// GUI
	this.luz1 = true;
	this.luz2 = true;
	this.luz3 = true;
	this.luz4 = true;
	this.luz5 = true;
	this.luz6 = true;
	
	/* Ordem das Appearances -> Cilindros do Meio; Cilindros Pontas; Centro; Hélices; Pernas */
	this.droneBlueMetalAppearance = [this.lightBlueMetalDroneAppearance, this.lightBlueMetalDroneAppearance, this.darkBlueMetalDroneAppearance, this.darkBlueMetalDroneAppearance, this.bottomBlackDroneAppearance];
	this.droneDarkWithFrontAppearance = [this.lightMetalDroneAppearance, this.lightMetalDroneAppearance, this.lightMetalWithFrontDroneAppearance, this.darkMetalDroneAppearance, this.bottomBlackDroneAppearance];
	this.droneDarkAppearance = [this.lightMetalDroneAppearance, this.lightMetalDroneAppearance, this.lightMetalDroneAppearance, this.darkMetalDroneAppearance, this.bottomBlackDroneAppearance];
	this.droneRedAppearance = [this.whiteMetalDroneAppearance, this.whiteMetalDroneAppearance, this.redMetalDroneAppearance, this.redMetalDroneAppearance, this.bottomBlackDroneAppearance];
	this.droneGreenAppearance = [this.whiteMetalDroneAppearance, this.whiteMetalDroneAppearance, this.greenTextureDroneAppearance, this.greenTextureDroneAppearance, this.bottomBlackDroneAppearance];
	this.dronePurpleAppearance = [this.greyTextureDroneAppearance, this.greyTextureDroneAppearance, this.greyTextureDroneAppearance, this.blackDroneAppearance, this.bottomBlackDroneAppearance];
	this.droneAppearanceList = [this.droneDarkWithFrontAppearance, this.droneDarkAppearance, this.droneBlueMetalAppearance, this.droneRedAppearance, this.droneGreenAppearance, this.dronePurpleAppearance];
	
	this.wallAppearanceList = [this.windowAppearance, this.wallAppearance];
	
	// Control Variables
	
	this.leftWallChangeAppearance = false;
	this.pauseScene = false;
	
	this.AparenciaDrone = 0;
	this.AparenciaParedeEsq = 0;
	
	this.speedHelices = 1;
	this.planeSpeed = 1;
	
	// Hook Control
	this.hooked = false;
	this.landed = false;
};

LightingScene.prototype.initCameras = function()
{
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function()
{
	this.setGlobalAmbientLight(0.5,0.5,0.5, 1.0);
	
	this.lights[0].setPosition(4, 8, 1, 1);
	this.lights[0].setVisible(true); 
	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular( 1, 1, 0, 1.0);
	this.lights[0].enable();
	
	this.lights[1].setPosition(10.5, 8, 1.0, 1.0);
	this.lights[1].setVisible(true); 
	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();
	
	this.lights[2].setPosition(10.5, 8, 5.0, 1.0);
	this.lights[2].setVisible(true);
	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setSpecular( 1, 1, 1, 1.0);
	this.lights[2].setConstantAttenuation(0);
	this.lights[2].setLinearAttenuation(1);
	this.lights[2].enable();
	
	this.lights[3].setPosition(4, 8, 5.0, 1.0);
	this.lights[3].setVisible(true);
	this.lights[3].setConstantAttenuation(0);
	this.lights[3].setQuadraticAttenuation(1);
	this.lights[3].enable();
	
	this.lights[4].setPosition(0.1, 4, 7.5, 1);
	this.lights[4].setVisible(true);
	this.lights[4].setAmbient(0, 0, 0, 1);
	this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[4].enable();
	
	this.lights[5].setPosition(7.5, 8, 7.5, 1);
	this.lights[5].setVisible(true);
	this.lights[5].setAmbient(0, 0, 0, 1);
	this.lights[5].setDiffuse(0.5,0.5,0.5,1);
	this.lights[5].enable();
};

LightingScene.prototype.initTextures = function()
{
	this.materialA.setAmbient(0.3,0.3,0.3,1);
	this.materialA.setDiffuse(0.6,0.6,0.6,1);
	this.materialA.setSpecular(0,0.2,0.8,1);	
	this.materialA.setShininess(120);
	
	this.materialB.setAmbient(0.3,0.3,0.3,1);
	this.materialB.setDiffuse(0.6,0.6,0.6,1);
	this.materialB.setSpecular(0.8,0.8,0.8,1);	
	this.materialB.setShininess(120);
	
	this.tableAppearance.setAmbient(0.3,0.3,0.3,1);
	this.tableAppearance.setDiffuse(0.8,0.8,0.8,1);
	this.tableAppearance.setSpecular(0.1,0.1,0.1,1);	
	this.tableAppearance.setShininess(20);
	this.tableAppearance.loadTexture("../resources/images/table3.jpg");
	
	this.floorAppearance.setAmbient(0.3,0.3,0.3,1);
	this.floorAppearance.setDiffuse(0.8,0.8,0.8,1);
	this.floorAppearance.setSpecular(0.1,0.1,0.1,1);	
	this.floorAppearance.setShininess(20);
	this.floorAppearance.loadTexture("../resources/images/wood2.jpg");
	
	this.windowAppearance.setAmbient(0.3,0.3,0.3,1);
	this.windowAppearance.setDiffuse(0.8,0.8,0.8,1);
	this.windowAppearance.setSpecular(0.1,0.1,0.1,1);	
	this.windowAppearance.setShininess(20);
	this.windowAppearance.loadTexture("../resources/images/window.png");
	this.windowAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");
	
	this.slidesAppearance.setAmbient(0.3,0.3,0.3,1);
	this.slidesAppearance.setDiffuse(0.8,0.8,0.8,1);
	this.slidesAppearance.setSpecular(0.1,0.1,0.1,1);	
	this.slidesAppearance.setShininess(20);
	this.slidesAppearance.loadTexture("../resources/images/slides.png");
	this.slidesAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");
	
	this.boardAppearance.setAmbient(0.3,0.3,0.3,1);
	this.boardAppearance.setSpecular(0.1,0.1,0.1,1);
	this.boardAppearance.setSpecular(0.5,0.5,0.5,1);	
	this.boardAppearance.setShininess(100);
	this.boardAppearance.loadTexture("../resources/images/board.png");
	this.boardAppearance.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");
	
	this.clockAppearance.setAmbient(0.3,0.3,0.3,1);
	this.clockAppearance.setSpecular(0.1,0.1,0.1,1);
	this.clockAppearance.setSpecular(0.5,0.5,0.5,1);	
	this.clockAppearance.setShininess(100);
	this.clockAppearance.loadTexture("../resources/images/clock.png");
	
	this.bottomBlackDroneAppearance.setAmbient(0.3,0.3,0.3,1);
	this.bottomBlackDroneAppearance.setSpecular(0.1,0.1,0.1,1);
	this.bottomBlackDroneAppearance.setSpecular(0.5,0.5,0.5,1);	
	this.bottomBlackDroneAppearance.setShininess(100);
	this.bottomBlackDroneAppearance.loadTexture("../resources/images/bottom.jpg");
	
	this.lightMetalDroneAppearance.setAmbient(0.3,0.3,0.3,1);
	this.lightMetalDroneAppearance.setSpecular(0.1,0.1,0.1,1);
	this.lightMetalDroneAppearance.setSpecular(0.5,0.5,0.5,1);	
	this.lightMetalDroneAppearance.setShininess(100);
	this.lightMetalDroneAppearance.loadTexture("../resources/images/lightMetal.jpg");
	
	this.lightMetalWithFrontDroneAppearance.setAmbient(0.3,0.3,0.3,1);
	this.lightMetalWithFrontDroneAppearance.setSpecular(0.1,0.1,0.1,1);
	this.lightMetalWithFrontDroneAppearance.setSpecular(0.5,0.5,0.5,1);	
	this.lightMetalWithFrontDroneAppearance.setShininess(100);
	this.lightMetalWithFrontDroneAppearance.loadTexture("../resources/images/lightMetalWithWindow.jpg");
	
	this.darkMetalDroneAppearance.setAmbient(0.3,0.3,0.3,1);
	this.darkMetalDroneAppearance.setSpecular(0.1,0.1,0.1,1);
	this.darkMetalDroneAppearance.setSpecular(0.5,0.5,0.5,1);	
	this.darkMetalDroneAppearance.setShininess(100);
	this.darkMetalDroneAppearance.loadTexture("../resources/images/darkMetal.jpg");
	
	this.lightBlueMetalDroneAppearance.setAmbient(0.3,0.3,0.3,1);
	this.lightBlueMetalDroneAppearance.setSpecular(0.1,0.1,0.1,1);
	this.lightBlueMetalDroneAppearance.setSpecular(0.5,0.5,0.5,1);	
	this.lightBlueMetalDroneAppearance.setShininess(100);
	this.lightBlueMetalDroneAppearance.loadTexture("../resources/images/lightBlue.jpg");
	
	this.darkBlueMetalDroneAppearance.setAmbient(0.3,0.3,0.3,1);
	this.darkBlueMetalDroneAppearance.setSpecular(0.1,0.1,0.1,1);
	this.darkBlueMetalDroneAppearance.setSpecular(0.5,0.5,0.5,1);	
	this.darkBlueMetalDroneAppearance.setShininess(100);
	this.darkBlueMetalDroneAppearance.loadTexture("../resources/images/darkBlue.jpg");
	
	this.redMetalDroneAppearance.setAmbient(0.3,0.3,0.3,1);
	this.redMetalDroneAppearance.setSpecular(0.1,0.1,0.1,1);
	this.redMetalDroneAppearance.setSpecular(0.5,0.5,0.5,1);	
	this.redMetalDroneAppearance.setShininess(100);
	this.redMetalDroneAppearance.loadTexture("../resources/images/redMetal.png");
	
	this.whiteMetalDroneAppearance.setAmbient(0.3,0.3,0.3,1);
	this.whiteMetalDroneAppearance.setSpecular(0.1,0.1,0.1,1);
	this.whiteMetalDroneAppearance.setSpecular(0.5,0.5,0.5,1);	
	this.whiteMetalDroneAppearance.setShininess(100);
	this.whiteMetalDroneAppearance.loadTexture("../resources/images/whiteMetal.jpg");
	
	this.greenTextureDroneAppearance.setAmbient(0.3,0.3,0.3,1);
	this.greenTextureDroneAppearance.setSpecular(0.1,0.1,0.1,1);
	this.greenTextureDroneAppearance.setSpecular(0.5,0.5,0.5,1);	
	this.greenTextureDroneAppearance.setShininess(100);
	this.greenTextureDroneAppearance.loadTexture("../resources/images/greenTexture.png");
	
	this.greyTextureDroneAppearance.setAmbient(0.3,0.3,0.3,1);
	this.greyTextureDroneAppearance.setSpecular(0.1,0.1,0.1,1);
	this.greyTextureDroneAppearance.setSpecular(0.5,0.5,0.5,1);	
	this.greyTextureDroneAppearance.setShininess(100);
	this.greyTextureDroneAppearance.loadTexture("../resources/images/greyTexture.png");
	
	this.blackDroneAppearance.setAmbient(0.3,0.3,0.3,1);
	this.blackDroneAppearance.setSpecular(0.1,0.1,0.1,1);
	this.blackDroneAppearance.setSpecular(0.5,0.5,0.5,1);	
	this.blackDroneAppearance.setShininess(100);
	this.blackDroneAppearance.loadTexture("../resources/images/blackTexture.jpg");
	
	this.boxAppearance.setAmbient(0.3,0.3,0.3,1);
	this.boxAppearance.setSpecular(0.1,0.1,0.1,1);
	this.boxAppearance.setSpecular(0.5,0.5,0.5,1);	
	this.boxAppearance.setShininess(100);
	this.boxAppearance.loadTexture("../resources/images/box.png");	
	
	this.boxHookedAppearance.setAmbient(0.3,0.3,0.3,1);
	this.boxHookedAppearance.setSpecular(0.1,0.1,0.1,1);
	this.boxHookedAppearance.setSpecular(0.5,0.5,0.5,1);	
	this.boxHookedAppearance.setShininess(100);
	this.boxHookedAppearance.loadTexture("../resources/images/boxRed.jpg");	
	
	this.hookBoxAppearance.setAmbient(0.3,0.3,0.3,1);
	this.hookBoxAppearance.setSpecular(0.1,0.1,0.1,1);
	this.hookBoxAppearance.setSpecular(0.5,0.5,0.5,1);	
	this.hookBoxAppearance.setShininess(100);
	this.hookBoxAppearance.loadTexture("../resources/images/darkBrown.jpg");
	
	this.worldMapAppearance1.setAmbient(0.3,0.3,0.3,1);
	this.worldMapAppearance1.setSpecular(0.1,0.1,0.1,1);
	this.worldMapAppearance1.setSpecular(0.5,0.5,0.5,1);	
	this.worldMapAppearance1.setShininess(100);
	this.worldMapAppearance1.loadTexture("../resources/images/worldmap1.jpg");	
	
	this.worldMapAppearance2.setAmbient(0.3,0.3,0.3,1);
	this.worldMapAppearance2.setSpecular(0.1,0.1,0.1,1);
	this.worldMapAppearance2.setSpecular(0.5,0.5,0.5,1);	
	this.worldMapAppearance2.setShininess(100);
	this.worldMapAppearance2.loadTexture("../resources/images/worldmap3.jpg");
	
	this.woodAppearance.setAmbient(0.3,0.3,0.3,1);
	this.woodAppearance.setSpecular(0.1,0.1,0.1,1);
	this.woodAppearance.setSpecular(0.5,0.5,0.5,1);	
	this.woodAppearance.setShininess(100);
	this.woodAppearance.loadTexture("../resources/images/table2.jpg");
	
	this.blackAppearance.setAmbient(0.3,0.3,0.3,1);
	this.blackAppearance.setSpecular(0.1,0.1,0.1,1);
	this.blackAppearance.setSpecular(0.5,0.5,0.5,1);	
	this.blackAppearance.setShininess(100);
	this.blackAppearance.loadTexture("../resources/images/black.png");

	this.landingSiteAppearance.setAmbient(1,1,1,1);
	this.landingSiteAppearance.setDiffuse(0.8,0.8,0.8,1);
	this.landingSiteAppearance.setSpecular(0.5,0.5,0.5,1);	
	this.landingSiteAppearance.setShininess(100);
	this.landingSiteAppearance.loadTexture("../resources/images/heli.jpg");
	
	this.tableLegsMaterial.setAmbient(0.1,0.1,0.1,1);
	this.tableLegsMaterial.setDiffuse(0.9,0.9,0.9,1);
	this.tableLegsMaterial.setSpecular(0.8, 0.8, 0.8,1);	
	this.tableLegsMaterial.setShininess(10);
	
	this.lampAppearance.setAmbient(1,1,1,1);
	this.lampAppearance.setDiffuse(0.8,0.8,0.8,1);
	this.lampAppearance.setSpecular(0.5,0.5,0.5,1);	
	this.lampAppearance.setShininess(100);
	this.lampAppearance.loadTexture("../resources/images/lamp.jpg");
	
	this.wallAppearance.setAmbient(1,1,1,1);
	this.wallAppearance.setDiffuse(0.8,0.8,0.8,1);
	this.wallAppearance.setSpecular(0.5,0.5,0.5,1);	
	this.wallAppearance.setShininess(100);
	this.wallAppearance.loadTexture("../resources/images/wall.jpg");
	
	this.stoneAppearance.setAmbient(1,1,1,1);
	this.stoneAppearance.setDiffuse(0.8,0.8,0.8,1);
	this.stoneAppearance.setSpecular(0.5,0.5,0.5,1);	
	this.stoneAppearance.setShininess(100);
	this.stoneAppearance.loadTexture("../resources/images/stone.jpg");
	
	this.carFrontAppearance.setAmbient(1,1,1,1);
	this.carFrontAppearance.setDiffuse(0.8,0.8,0.8,1);
	this.carFrontAppearance.setSpecular(0.5,0.5,0.5,1);	
	this.carFrontAppearance.setShininess(100);
	this.carFrontAppearance.loadTexture("../resources/images/carFront.jpg");
	
	this.carFrontTopAppearance.setAmbient(1,1,1,1);
	this.carFrontTopAppearance.setDiffuse(0.8,0.8,0.8,1);
	this.carFrontTopAppearance.setSpecular(0.5,0.5,0.5,1);	
	this.carFrontTopAppearance.setShininess(100);
	this.carFrontTopAppearance.loadTexture("../resources/images/carFrontTop.jpg");
	
	this.carRedAppearance.setAmbient(1,1,1,1);
	this.carRedAppearance.setDiffuse(0.8,0.8,0.8,1);
	this.carRedAppearance.setSpecular(0.5,0.5,0.5,1);	
	this.carRedAppearance.setShininess(100);
	this.carRedAppearance.loadTexture("../resources/images/red.png");
	
	this.carBackAppearance.setAmbient(1,1,1,1);
	this.carBackAppearance.setDiffuse(0.8,0.8,0.8,1);
	this.carBackAppearance.setSpecular(0.5,0.5,0.5,1);	
	this.carBackAppearance.setShininess(100);
	this.carBackAppearance.loadTexture("../resources/images/carBack.jpg");
	
	this.carWheelsAppearance.setAmbient(1,1,1,1);
	this.carWheelsAppearance.setDiffuse(0.8,0.8,0.8,1);
	this.carWheelsAppearance.setSpecular(0.5,0.5,0.5,1);	
	this.carWheelsAppearance.setShininess(100);
	this.carWheelsAppearance.loadTexture("../resources/images/wheel.gif");
};

LightingScene.prototype.updateLights = function()
{
	for (var i = 0; i < this.lights.length; i++)
	{
		if(this['luz' + (i + 1)])
			this.lights[i].enable();
		else
			this.lights[i].disable();
		this.lights[i].update();
	}
};

LightingScene.prototype.updateWallAppearance = function()
{
	if(this.AparenciaParedeEsq == 0)
		this.leftWallChangeAppearance = false;
	else
		this.leftWallChangeAppearance = true;
	this.currentWallAppearance = this.wallAppearanceList[this.AparenciaParedeEsq];
};

LightingScene.prototype.update = function(currTime)
{
	this.clock.update(currTime, this.pauseScene);
	this.drone.update(currTime);
	this.globe.update(currTime);
	this.car.update(currTime);
	this.plane.update(currTime);
	this.snd.volume = this.volume;
	
	this.updateWallAppearance();
	this.updateDroneAppearance();
	
	// Hook and Box
	
	this.distanceBoxHook =
		Math.sqrt(
				(this.drone.getHookPositionX() - this.box.getPositionX()) * (this.drone.getHookPositionX() - this.box.getPositionX()) + 
				(this.drone.getHookPositionY() - this.box.getPositionY()) * (this.drone.getHookPositionY() - this.box.getPositionY()) + 
				(this.drone.getHookPositionZ() - this.box.getPositionZ()) * (this.drone.getHookPositionZ() - this.box.getPositionZ())
				);
	
	if((this.distanceBoxHook < 0.3) && (!this.landed))
	{
		this.hooked = true;
	}
	
	if(this.hooked)
	{
		this.box.posX = this.drone.getHookPositionX();
		this.box.posY = this.drone.getHookPositionY();
		this.box.posZ = this.drone.getHookPositionZ();
	}
	
	// Box and LandingSite
	this.distanceBoxLanding =
		Math.sqrt(
				(this.landingSite.getPositionX() - this.box.getPositionX()) * (this.landingSite.getPositionX() - this.box.getPositionX()) + 
				(this.landingSite.getPositionY() - this.box.getPositionY()) * (this.landingSite.getPositionY() - this.box.getPositionY()) + 
				(this.landingSite.getPositionZ() - this.box.getPositionZ()) * (this.landingSite.getPositionZ() - this.box.getPositionZ())
				);
	
	if(this.distanceBoxLanding < 0.3)
	{
		this.landed = true;
		this.hooked = false;
	}
	
	if(this.landed)
	{
		this.box.posX = this.landingSite.getPositionX();
		this.box.posY = this.landingSite.getPositionY();
		this.box.posZ = this.landingSite.getPositionZ();
	}
};

LightingScene.prototype.Pausa = function ()
{  
	this.pauseScene = !this.pauseScene;
};

LightingScene.prototype.updateDroneAppearance = function()
{
	this.drone.updateAppearance(this.AparenciaDrone);
};

LightingScene.prototype.display = function()
{
	// Axis and initialization
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	this.updateProjectionMatrix();
	this.loadIdentity();

	this.applyViewMatrix();
	this.updateLights();
	this.axis.display();
	this.materialDefault.apply();
	
	// Floor
	this.floorAppearance.apply();
	
	this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		this.floor.display();
	this.popMatrix();
	
	// Left Wall
	this.currentWallAppearance.apply();
	
	this.pushMatrix();
		this.translate(0, 4, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 0.2);
		if(this.leftWallChangeAppearance)
			this.leftWall2.display();
		else
			this.leftWall.display();
	this.popMatrix();

	// Plane Wall
	this.wallAppearance.apply();
	
	this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);
		this.wall.display();
	this.popMatrix();
	
	// First Table
	this.pushMatrix();
		this.translate(5, 0, 8);
		this.table.display();
	this.popMatrix();

	// Second Table
	this.pushMatrix();
		this.translate(12, 0, 8);
		this.table.display();
	this.popMatrix();

	// Board A
	this.pushMatrix();
		this.translate(4, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		this.slidesAppearance.apply();
		this.boardA.display();
	this.popMatrix();

	// Board B
	this.pushMatrix();
		this.translate(10.5, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		this.boardAppearance.apply();
		this.boardB.display();
	this.popMatrix();
	
	// Lamp
	this.pushMatrix();
		this.translate(7.5, 8, 7.5);
		this.lamp.display();
	this.popMatrix();

	// Clock
	this.pushMatrix();
		this.translate(7.25, 7.2, 0.2);
		this.scale(0.6,0.6,0.2);
		this.clock.display();
	this.popMatrix();
	
	this.updateDroneAppearance();
	
	
	// Coluna Direita
	this.stoneAppearance.apply();
	
	this.pushMatrix();
		 this.translate(14.5,8/2,0.5);
		 this.scale(1/2,8,1/2);
		 this.rotate(-90 * degToRad, 1, 0, 0);
		 this.translate(0,0,0.5);
		 this.cylinder.display();
	this.popMatrix();
	
	// Coluna Esquerda
	this.pushMatrix();
		 this.translate(0.5,8/2,14.5);
		 this.scale(1/2,8,1/2);
		 this.rotate(-90 * degToRad, 1, 0, 0);
		 this.translate(0,0,0.5);
		 this.cylinder.display();
	this.popMatrix();
	
	// Coluna Meio
	this.pushMatrix();
		 this.translate(0.5,8/2,0.5);
		 this.scale(1/2,8,1/2);
		 this.rotate(-90 * degToRad, 1, 0, 0);
		 this.translate(0,0,0.5);
		 this.cylinder.display();
	this.popMatrix();
	
	// Drone
	this.pushMatrix();
		this.scale(1/2,1/2,1/2);
		this.drone.display();
	this.popMatrix();
	
	// Box
	this.pushMatrix();
		this.scale(1/2,1/2,1/2);
		this.box.display();
	this.popMatrix();
	
	// Globe
	this.pushMatrix();
	this.translate(13, 4.7, 7.5);
	this.scale(1/2,1/2,1/2);
	this.globe.display();
	this.popMatrix();
	
	// Landing Site
	this.pushMatrix();
		this.scale(1/2,1/2,1/2);
		this.landingSite.display();
	this.popMatrix();
	
	// Car
	this.pushMatrix();
		this.scale(1/2,1/2,1/2);
		this.car.display();
	this.popMatrix();

	// Plane
	this.pushMatrix();
		this.plane.display();
	this.popMatrix();
	
	//ei2023@fe.up.pt
};
