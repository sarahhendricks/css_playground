// set the start position of the cursor outside the screen
let clientX = -100;
let clientY = -100;
const innerCursor = document.querySelector(".cursor--small");

const initCursor = () => {
	// add listener to track the current mouse position
	document.addEventListener("mousemove", e => {
		clientX = e.clientX;
		clientY = e.clientY;
	});

	// transform the innerCursor to the current mouse position
	// use requestAnimationFrame() for smooth performance
	const render = () => {
		innerCursor.style.transform = `translate(${clientX}px, ${clientY}px)`;
		requestAnimationFrame(render);
	}
	requestAnimationFrame(render);
}

initCursor();

let lastX = 0;
let lastY = 0;
let isStuck = false;
let showCursor = false;
let group, stuckX, stuckY, fillOuterCursor;

const initCanvas = () => {
	const canvas = document.querySelector(".cursor--canvas");
	const shapeBounds = {
		width: 75,
		height: 75
	};
	paper.setup(canvas);
	const strokeColor = "rgba(225, 0, 0, 0.5)";
	const strokeWidth = 1;
	const segments = 8;
	const radius = 15;

	// base shape
	const polygon = new paper.Path.RegularPolygon(
		new paper.Point(0, 0),
		segments,
		radius
	);	
	polygon.strokeColor = strokeColor;
	polygon.strokeWidth = strokeWidth;
	polygon.smooth();
	group = new paper.Group([polygon]);
	group.applyMatrix = false;

	// function for linear interpolation of values (???)
	const lerp = (a, b, n) => {
		return (1 - n) * a + n * b;
	};

	// function to map a value from one range to another range (???)
	const map = (value, in_min, in_max, out_min, out_max) => {
		return (
			((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min);
	};

	// the draw loop of Paper.js
	paper.view.onFrame = event => {
		// using linear interpolation, the circle will move 0.2 (20%)
		// of the distance between its current position and the mouse 
		// corrdinates per frame
		if (!isStuck) {
			lastX = lerp(lastX, clientX, 0.2);
			lastY = lerp(lastY, clientY, 0.2);
			group.position = new paper.Point(lastX, lastY);
		} else if (isStuck) {
			lastX = lerp(lastX, stuckX, 0.2);
			lastY = lerp(lastY, stuckY, 0.2);
			group.position = new paper.Point(lastX, lastY);
		}

		if (isStuck && polygon.bounds.width < shapeBounds.width) {
			// scale up the shape
			polygon.scale(1.08);
		} else if (!isStuck && polygon.bounds.width > 30) {
			// scale down the shape
			const scaleDown = 0.92;
			polygon.scale(scaleDown);
		}
	}
}

initCanvas();


const initHovers = () => {
	// find the center of the link element
	const handleMouseEnter = e => {
		const navItem = e.currentTarget;
		const navItemBox = navItem.getBoundingClientRect();
		stuckX = Math.round(navItemBox.left + navItemBox.width / 2);
    	stuckY = Math.round(navItemBox.top + navItemBox.height / 2);
    	isStuck = true;
	};

	// reset isStuck when the mouse leaves
	const handleMouseLeave = () => {
		isStuck = false;
	}

	// add event listeners to all items
	const linkItems = document.querySelectorAll(".link");
	linkItems.forEach(item => {
		item.addEventListener("mouseenter", handleMouseEnter);
		item.addEventListener("mouseleave", handleMouseLeave);
	})
}

initHovers();


