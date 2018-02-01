/**
 * MyInterface
 * @constructor
 */
 
function MyInterface()
{
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */

MyInterface.prototype.init = function(application)
{
	CGFinterface.prototype.init.call(this, application);
	
	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui
	
	this.gui = new dat.GUI();
	this.gui.add(this.scene, 'Pausa');	
	
	var group = this.gui.addFolder("Luzes");
	group.open();
	group.add(this.scene, 'luz1');
	group.add(this.scene, 'luz2');
	group.add(this.scene, 'luz3');
	group.add(this.scene, 'luz4');
	group.add(this.scene, 'luz5');
	group.add(this.scene, 'luz6');
	
	this.gui.add(this.scene, 'AparenciaDrone', { MetalizadoFrente: 0, Metalizado: 1, Azul: 2, Vermelho: 3, Verde: 4, Preto: 5});
	
	this.gui.add(this.scene, 'AparenciaParedeEsq', { ComJanela: 0, SemJanela: 1});
	
	this.gui.add(this.scene, 'speedHelices', 0.1, 2.0);
	
	this.gui.add(this.scene, 'planeSpeed', 0.5, 4);
	
	this.gui.add(this.scene, 'volume', 0, 1);

	return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */

MyInterface.prototype.processKeyDown = function(event)
{
	 CGFinterface.prototype.processKeyDown.call(this,event);
	 
	 switch (event.keyCode)
	 {
	 	case (87): // 'W'
	 	case (119): // 'w'
	 	{
	 		this.scene.drone.movingFront = true;
	 		break;
	 	}
	 	
		case (83): // 'S'
		case (115): // 's'
		{
			this.scene.drone.movingBack = true;
			break;
		}
		
		case (65): // 'A'
		case (97): // 'a'
		{
			this.scene.drone.rotatingLeft = true;
			break;
		}

		case (68): // 'D'
		case (100): // 'd'
		{
			this.scene.drone.rotatingRight = true;
			break;
		}
		
		case (73): // 'I'
		case (105): // 'i'
		{
			this.scene.drone.goingUp = true;
			break;
		}
		
		case (74): // 'J'
		case (106): // 'j'
		{
			this.scene.drone.goingDown = true;
			break;
		}
		
		case (80): // 'P'
		case (112): // 'p'
		{
			this.scene.drone.hookUp = true;
			break;
		}
		
		case (76): // 'L'
		case (108): // 'l'
		{
			this.scene.drone.hookDown = true;
			break;
		}
	 }
};

MyInterface.prototype.processKeyUp = function(event)
{
	 CGFinterface.prototype.processKeyUp.call(this,event);
	 
	 switch (event.keyCode)
	 {
	 	case (87): // 'W'
	 	case (119): // 'w'
	 	{
	 		this.scene.drone.movingFront = false;
	 		break;
	 	}
	 	
		case (83): // 'S'
		case (115): // 's'
		{
			this.scene.drone.movingBack = false;
			break;
		}
		
		case (65): // 'A'
		case (97): // 'a'
		{
			this.scene.drone.rotatingLeft = false;
			break;
		}

		case (68): // 'D'
		case (100): // 'd'
		{
			this.scene.drone.rotatingRight = false;
			break;
		}
		
		case (73): // 'I'
		case (105): // 'i'
		{
			this.scene.drone.goingUp = false;
			break;
		}
		
		case (74): // 'J'
		case (106): // 'j'
		{
			this.scene.drone.goingDown = false;
			break;
		}
		
		case (80): // 'P'
		case (112): // 'p'
		{
			this.scene.drone.hookUp = false;
			break;
		}
		
		case (76): // 'L'
		case (108): // 'l'
		{
			this.scene.drone.hookDown = false;
			break;
		}
	 }
};
