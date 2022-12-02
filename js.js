/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
	document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
	if (!event.target.matches(".dropbtn")) {
		var dropdowns = document.getElementsByClassName("dropdown-content");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains("show")) {
				openDropdown.classList.remove("show");
			}
		}
	}
};
function text() {
	if (hid.style.display !== "none") {
		hid.style.display = "none";
	} else {
		hid.style.display = "block";
	}
}

function comp() {
	if (hid2.style.display !== "none") {
		hid2.style.display = "none";
	} else {
		hid2.style.display = "block";
	}
}

function notes() {
	if (hid20.style.display !== "none") {
		hid20.style.display = "none";
	} else {
		hid20.style.display = "block";
	}
}

function teash() {
	alert("not working");
}
function shtdwn() {
	if (restart.style.display !== "none") {
		restart.style.display = "none";
	} else {
		restart.style.display = "block";
	}
}

function sol() {
	if (hid5.style.display !== "none") {
		hid5.style.display = "none";
	} else {
		hid5.style.display = "block";
	}
}

function chat() {
	if (hid10.style.display !== "none") {
		hid10.style.display = "none";
	} else {
		hid10.style.display = "block";
	}
}

function mine() {
	if (hid400.style.display !== "none") {
		hid400.style.display = "none";
	} else {
		hid400.style.display = "block";
	}
}

function add_local() {
	const display = {};
	display.firstname = document.getElementById("firstname").value;

	window.localStorage.setItem("display", JSON.stringify(display));
}

function show_local() {
	let _display = JSON.parse(localStorage.getItem("display"));
	document.getElementById("firstname").value = _display.firstname;
	document.getElementById("display").value = Object.values(_display);
}

function shutdown() {
	if (ssss.style.display !== "none") {
		ssss.style.display = "none";
	} else {
		ssss.style.display = "block";
	}
}

function changeDivImage() {
	var imgPath = new String();
	imgPath = document.getElementById("cloud").style.backgroundImage;

	if (imgPath == "url(images/blue.gif)" || imgPath == "") {
		document.getElementById("cloud").style.backgroundImage =
			"url(images/green.gif)";
	} else {
		document.getElementById("div1").style.backgroundImage =
			"url(images/blue.gif)";
	}
}

//Define variables
let cells = document.getElementsByClassName("cell"),
	rows = document.getElementsByClassName("row");
(mineCells = []),
	(smiley = document.getElementsByClassName("smiley")[0]),
	(smileyImg = document.getElementById("smileyImage")),
	(flagCounterDisplay = document.getElementsByClassName(
		"flagCounterDisplay"
	)[0]),
	(flagCounter = 10);

//Set flag counter display;
flagCounterDisplay.innerHTML = flagCounter;

//Make blocks and reset button clickable
for (let i = cells.length - 1; i >= 0; i--) {
	cells[i].addEventListener("click", activateCell);
	cells[i].addEventListener("contextmenu", flagCell);
	cells[i].addEventListener("mousedown", faceChangeDown);
	cells[i].addEventListener("mouseup", faceChangeUp);
}
smiley.addEventListener("click", resetGame);

function faceChangeDown(e) {
	//Change smiley face to anticipation face on left click
	if (e.button !== 2 && this.classList.contains("unclicked")) {
		smileyImg.src =
			"https://www.dropbox.com/s/nqtluk6g57j6mx9/anticipation.png?raw=1";
	}
}

//Change anticipation face to smiley face or death face on left click
function faceChangeUp(e) {
	if (e.button !== 2) {
		smileyImg.src = "https://www.dropbox.com/s/pc77oelgik4uamu/smiley.png?raw=1";
		if (this.classList.contains("mine")) {
			smileyImg.src = "https://www.dropbox.com/s/jtxbdhyaxziopof/dead.png?raw=1";
		}
	}
}

//Toggle flag class for cell, add or subtract counter
function flagCell() {
	if (this.classList.contains("flagged")) {
		this.classList.remove("flagged");
		flagCounter < 10 ? flagCounter++ : null;
		flagCounterDisplay.innerHTML = flagCounter;
	} else if (flagCounter > 0) {
		this.classList.add("flagged");
		flagCounter--;
		flagCounterDisplay.innerHTML = flagCounter;
	}
	//Required to stop menu appearing on right click
	return false;
}

//Activate a block
function activateCell() {
	let rowNo = this.parentNode.classList[1],
		colNo = this.getAttribute("data-col");
	//Don't allow click if cell is flagged
	if (!this.classList.contains("flagged")) {
		this.classList.contains("unclicked")
			? this.classList.remove("unclicked")
			: null;
		//End the game if a mine is clicked
		if (this.classList.contains("mine")) {
			for (let i = mineCells.length - 1; i >= 0; i--) {
				cells[mineCells[i]].classList.remove("unclicked");
			}
			for (let i = cells.length - 1; i >= 0; i--) {
				cells[i].classList.add("noClick");
				cells[i].classList.remove("flagged");
			}
		}
		//Clear surrounding cells if cell is empty
		if (this.innerHTML === "" && !this.classList.contains("mine")) {
			clearTouchingCells(rowNo, colNo);
		}
		//Show win message
		if (checkForWin()) {
			setTimeout(function () {
				alert("Congratulations! You won!");
			}, 100);
		}
	}
}

//If a clicked cell is not a mine and has no number then this functions clears out all touching empty cells.
function clearTouchingCells(row, col, touchingCells) {
	row = parseInt(row);
	col = parseInt(col);
	let current = rows[row].children[col];
	(mineCounter = 0), (touchingCells = []), (edgeCells = []);
	//Touching cells will be defined when this function is called by the script and not by a player click
	if (touchingCells !== undefined) {
		touchingCells = [];
	}
	//Adding surrounding cells to an array
	col !== 0 ? touchingCells.push(rows[row].children[col - 1]) : null;
	col !== 7 ? touchingCells.push(rows[row].children[col + 1]) : null;
	if (row !== 7) {
		touchingCells.push(rows[row + 1].children[col]);
		col !== 0 ? touchingCells.push(rows[row + 1].children[col - 1]) : null;
		col !== 7 ? touchingCells.push(rows[row + 1].children[col + 1]) : null;
	}
	if (row !== 0) {
		touchingCells.push(rows[row - 1].children[col]);
		col !== 0 ? touchingCells.push(rows[row - 1].children[col - 1]) : null;
		col !== 7 ? touchingCells.push(rows[row - 1].children[col + 1]) : null;
	}
	//Clear empty cells from surrounding cells array
	for (let i = touchingCells.length - 1; i >= 0; i--) {
		if (
			touchingCells[i] !== undefined &&
			touchingCells[i].innerHTML === "" &&
			!touchingCells[i].classList.contains("mine") &&
			touchingCells[i].classList.contains("unclicked")
		) {
			touchingCells[i].classList.remove("unclicked");
			clearTouchingCells(
				touchingCells[i].parentNode.classList[1],
				touchingCells[i].getAttribute("data-col"),
				touchingCells
			);
		}
		//Add numbered cells to edge cells array
		if (
			touchingCells[i] !== undefined &&
			touchingCells[i].innerHTML !== "" &&
			!touchingCells[i].classList.contains("mine") &&
			touchingCells[i].classList.contains("unclicked")
		) {
			edgeCells.push(touchingCells[i]);
		}
		//Clear edge cells
		for (let k = 0; k < edgeCells.length; k++) {
			edgeCells[k].classList.remove("unclicked");
		}
	}
}

//Reset the game
function resetGame() {
	for (let i = cells.length - 1; i >= 0; i--) {
		smileyImg.src = "https://www.dropbox.com/s/pc77oelgik4uamu/smiley.png?raw=1";
		cells[i].innerHTML = "";
		cells[i].classList.contains("unclicked")
			? null
			: cells[i].classList.add("unclicked");
		cells[i].classList.contains("mine")
			? cells[i].classList.remove("mine")
			: null;
		cells[i].classList.contains("flagged")
			? cells[i].classList.remove("flagged")
			: null;
		cells[i].classList.contains("noClick")
			? cells[i].classList.remove("noClick")
			: null;
		flagCounter = 10;
		flagCounterDisplay.innerHTML = flagCounter;
	}
	createMineCellsArray();
}

//Check that all non mine cells have been cleared
function checkForWin() {
	let win = 0;
	for (let i = cells.length - 1; i >= 0; i--) {
		if (
			!cells[i].classList.contains("mine") &&
			cells[i].classList.contains("unclicked")
		) {
			win++;
		}
	}
	if (win > 0) {
		return false;
	} else {
		return true;
	}
}
//Random number between 0 and number of blocks
function randomNumber() {
	return Math.floor(Math.random() * cells.length);
}

//Create array of mine blocks
function createMineCellsArray() {
	mineCells = [];
	for (let i = 0; i < cells.length; i++) {
		cells[i].classList.contains("mine")
			? cells[i].classList.remove("mine")
			: null;
	}
	for (let i = 0; i < 10; i++) {
		let randomNo = randomNumber();
		mineCells.push(randomNo);
	}
	//Add mine class
	for (let i = 0; i < mineCells.length; i++) {
		cells[mineCells[i]].classList.add("mine");
	}
	//If array has duplicates, recreate the array.
	if (isArrayValid() === false) {
		createMineCellsArray();
	} else {
		addNumbers();
	}
}
createMineCellsArray();

//Check if mine cells array has duplicates
function isArrayValid() {
	let valid = true;
	for (let i = 0; i < mineCells.length; i++) {
		for (let j = 0; j < mineCells.length; j++) {
			if (i !== j) {
				if (mineCells[i] === mineCells[j]) {
					valid = false;
				}
			}
		}
	}
	return valid;
}

//Add indicator numbers to squares
function addNumbers() {
	for (let i = cells.length - 1; i >= 0; i--) {
		let rowNo = parseInt(cells[i].parentNode.classList[1]),
			colNo = parseInt(cells[i].getAttribute("data-col")),
			mineCounter = 0,
			touchingCells = [];
		//Adding surrounding cells to an array
		colNo !== 0 ? touchingCells.push(rows[rowNo].children[colNo - 1]) : null;
		colNo !== 7 ? touchingCells.push(rows[rowNo].children[colNo + 1]) : null;
		if (rowNo !== 7) {
			touchingCells.push(rows[rowNo + 1].children[colNo]);
			colNo !== 0 ? touchingCells.push(rows[rowNo + 1].children[colNo - 1]) : null;
			colNo !== 7 ? touchingCells.push(rows[rowNo + 1].children[colNo + 1]) : null;
		}
		if (rowNo !== 0) {
			touchingCells.push(rows[rowNo - 1].children[colNo]);
			colNo !== 0 ? touchingCells.push(rows[rowNo - 1].children[colNo - 1]) : null;
			colNo !== 7 ? touchingCells.push(rows[rowNo - 1].children[colNo + 1]) : null;
		}
		for (let j = touchingCells.length - 1; j >= 0; j--) {
			if (touchingCells[j].classList.contains("mine")) {
				mineCounter++;
			}
		}
		if (mineCounter > 0 && !cells[i].classList.contains("mine")) {
			mineCounter === 1 ? (cells[i].style.color = "blue") : null;
			mineCounter === 2 ? (cells[i].style.color = "#2F9117") : null;
			mineCounter === 3 ? (cells[i].style.color = "#FD834F") : null;
			mineCounter >= 4 ? (cells[i].style.color = "red") : null;
			cells[i].innerHTML = mineCounter;
		}
	}
}
