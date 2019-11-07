// set the start position of the cursor outside the screen
let clientX = -100;
let clientY = -100;

const initCursor = () => {
	// add listener to track the current mouse position
	document.addEventListener("mousemove", e => {
		clientX = e.clientX;
		clientY = e.clientY;
	});

	// use requestAnimationFrame() for smooth performance
	const render = () => {
		requestAnimationFrame(render);
	}
	requestAnimationFrame(render);
}

initCursor();

let lastX = 0;
let lastY = 0;
let onLink = false;
let showCursor = false;
let onRightSide = true;
let group;

const initCanvas = () => {
	const canvas = document.querySelector(".cursor--canvas");
	const shapeBounds = {
		width: 75,
		height: 75
	};
	paper.setup(canvas);
	const strokeColor = "#EDBFC6";
	const strokeWidth = 1;

	// base shape
	const radius = 30;
	const polygon = new paper.Path.Circle(
		new paper.Point(0, 0),
		radius
	);	
	polygon.strokeColor = strokeColor;
	polygon.strokeWidth = strokeWidth;

	// triangle pointer
	const pointer = new paper.Path.RegularPolygon(
		new paper.Point(5, 3),
		3,
		10);
	pointer.fillColor = strokeColor;
	pointer.rotate(90);

	// star center
	const compass1 = new paper.Path.Ellipse(
		new paper.Point(-18, 0),
		new paper.Size(36, 3));
	const compass2 = compass1.clone().rotate(90);
	const compass3 = new paper.Path.Ellipse(
		new paper.Point(-9, 0),
		new paper.Size(18, 3));
	compass3.rotate(45);
	const compass4 = compass3.clone().rotate(90);

	compass1.fillColor = strokeColor;
	compass2.fillColor = strokeColor;
	compass3.fillColor = strokeColor;
	compass4.fillColor = strokeColor;

	group = new paper.Group([polygon, pointer, compass1, compass2, compass3, compass4]);
	group.applyMatrix = false;

	// function for linear interpolation of values 
	const lerp = (a, b, n) => {
		return (1 - n) * a + n * b;
	};

	// the draw loop of Paper.js
	paper.view.onFrame = event => {
		// using linear interpolation, the circle will move 0.2 (20%)
		// of the distance between its current position and the mouse 
		// corrdinates per frame
		lastX = lerp(lastX, clientX, 0.2);
		lastY = lerp(lastY, clientY, 0.2);
		group.position = new paper.Point(lastX, lastY);

		if (onLink && polygon.bounds.width > 30) {
			// scale down the shape & hide details
			polygon.scale(.92);
			pointer.fillColor.alpha -= 0.1;
			compass1.fillColor.alpha -= 0.1;
			compass2.fillColor.alpha -= 0.1;
			compass3.fillColor.alpha -= 0.1;
			compass4.fillColor.alpha -= 0.1;
		} else if (!onLink && polygon.bounds.width < shapeBounds.width) {
			// scale up the shape & draw details
			polygon.scale(1.08);
			pointer.fillColor.alpha += 0.1;
			compass1.fillColor.alpha += 0.1;
			compass2.fillColor.alpha += 0.1;
			compass3.fillColor.alpha += 0.1;
			compass4.fillColor.alpha += 0.1;
		}

		if (lastX < window.innerWidth / 2 && onRightSide) {
			console.log("move the pointer to the left");
			// group.rotate(180);
		} else if (lastX >= window.innerWidth / 2 && !onRightSide) {
			console.log("move the pointer to the right");
			// group.rotate(180);
		}
	}
}

initCanvas();

const initHovers = () => {
	const handleMouseEnter = e => {
    	onLink = true;
	};

	// reset onLink when the mouse leaves
	const handleMouseLeave = () => {
		onLink = false;
	}

	const handleMouseMove = e => {
		onRightSide = e.clientX >= window.innerWidth / 2;
	}

	// add event listeners to all link items
	const linkItems = document.querySelectorAll(".link");
	linkItems.forEach(item => {
		item.addEventListener("mouseenter", handleMouseEnter);
		item.addEventListener("mouseleave", handleMouseLeave);
	})

	const page = document.querySelector(".page");
	page.addEventListener("mousemove", handleMouseMove);
}

initHovers();

