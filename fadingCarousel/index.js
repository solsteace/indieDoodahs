const ftTopicItem = (nodeValue, nodeInfo) => {
	let value = nodeValue;
	let info = nodeInfo;
	let prev = null
	let next = null
	return {next, prev, value, info};
}

const topicList = (() => {
	let front = null;
	let back = null;
	let lastTraverse = 0;

	const addItem = (nodeValue, nodeInfo) => { // Add to back
		let newNode = ftTopicItem(nodeValue, nodeInfo);
		if(front == null) {
			newNode.next = newNode;
			newNode.prev = newNode;
			front = newNode;
			back = newNode;
		} else {
			newNode.next = back;
			newNode.prev = front;
			front.next = newNode;
			back.prev = newNode;
			back = newNode;
		}
	}

	const getLastMovement = () => lastTraverse;
	const getFront = () => front;

	const traverseRight = () => {
		front = front.next;
		prev = front.next;
		lastTraverse = 1
	}
	
	const traverseLeft = () => {
		front = front.prev;
		prev = front.next;
		lastTraverse = -1
	}

	const peek = () => {
		let temp = front.prev;
		console.log(front.value);
		while(temp != front) {
			console.log(temp.value);
			temp = temp.prev
		}
	}

	return {traverseRight, traverseLeft, addItem, peek, getLastMovement, getFront}
})()

let DATA = [
	[[], "https://images.unsplash.com/photo-1667298132755-b63d296d28ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MjR8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"],
	[[], "https://images.unsplash.com/photo-1670873080835-d02850b1946e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MTN8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"],
	[[], "https://images.unsplash.com/photo-1667382027196-8f5fbe785de8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MjF8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"],
	[[], "https://images.unsplash.com/photo-1637932109718-fa34e979696d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MzV8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"],
	[[], "https://images.unsplash.com/photo-1635683897783-6ed7f64a1129?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mzl8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"],
]

const carouselManager = (() => {
	let displaySize = 2;
	let carouselElem = [];

	[
		"carousel__item1",
		"carousel__item2",
		"carousel__item3",
		"carousel__item4",
		"carousel__item5",
	].forEach((id) => {carouselElem.push(document.getElementById(id));})

	const updateDisplay = () => {
		let direction = topicList.getLastMovement();
		let probe = topicList.getFront().prev.prev;

		if(direction === 0) {
			for(let idx = -displaySize; idx <= displaySize; idx++) {
				carouselElem[idx + displaySize].children[0].src = probe.value;
				probe = probe.next;
			}
		}

		if(direction === -1) {
			let temp = [`${carouselElem[0].classList[0]} ${carouselElem[0].classList[1]}`];
			for(let idx = 0; idx < displaySize*2; idx++) {
				carouselElem[idx].classList = carouselElem[idx + 1].classList;
			}
			carouselElem[4].classList = temp;
		} else if(direction === 1) {
			let temp = [`${carouselElem[4].classList[0]} ${carouselElem[4].classList[1]}`];
			for(let idx = displaySize*2; idx > 0; idx--) {
				carouselElem[idx].classList = carouselElem[idx - 1].classList;
			}
			carouselElem[0].classList = temp;
		}
		
	}

	return {updateDisplay};
})();

function main() {
	DATA.forEach(([imgInfo, imgURL]) => {
		topicList.addItem(imgURL, imgInfo)
	})

	carouselManager.updateDisplay();
	document.getElementById("carousel__controlLeft")
		.addEventListener("click", () => {
			topicList.traverseLeft();
			carouselManager.updateDisplay();
		})
	document.getElementById("carousel__controlRight")
		.addEventListener("click", () => {
			topicList.traverseRight();
			carouselManager.updateDisplay();
		})

	// topicList.peek();
}

main();
