/* Jianyang Zhang CSE 154 Autumn 2014 TA: Clarice Tran
This is the javascript for fifteen.html */

(function (){
	"use strict";
	
	var EMPTY_TOP = 300;  
	var EMPTY_LEFT = 300;
	var NUNBER_ROW_COLLUM = 4;
	var PIXEL_OF_TILE = 100;
	
	// set up all the events handler.
	window.onload = function() {
		document.getElementById("shufflebutton").onclick = shuffle;
		createSquares();
	};
	
	
	// This is the function create the fifteen puzzle on the website, assign numbers 
	// to each of them and assign x/y value to every tile and
	// adjust background image of all the puzzles.
	function createSquares(){
		var index = 1;
		for(var col = 0; col < NUNBER_ROW_COLLUM; col++){   // loop over each collum of puzzle
			for(var row = 0; row < NUNBER_ROW_COLLUM; row++){  // loop over each row of puzzle
				// check if we get to the last piece of tile.
				if(index < NUNBER_ROW_COLLUM * NUNBER_ROW_COLLUM){    
					var square = document.createElement("div");
					square.className = "square";
					var text = document.createTextNode(index);
					square.appendChild(text);
					
					var x = PIXEL_OF_TILE * row; 
					var y = PIXEL_OF_TILE * col;
					
					square.style.left = x + "px"; // assign x value to the square.
					square.style.top = y + "px";  // assign y value to the square.
					
					// adjust the position of background-image.
					square.style.backgroundPosition = "-" + x + "px " + "-" + y + "px";
					
					square.onclick = move;      // call move function when click on a square.
					square.onmouseover = hover; // call hover when mouse is hover on a square.
					square.onmouseout = out;    // call out when mouse is out of a square.
					
					document.getElementById("puzzlearea").appendChild(square);
					index++;  // update the index of square array.
				}
			}
		}
	}
	
	// called when click on a tile, if the tile is movable, it gose to the empty space.
	// if it is not movable, nothing will happen.
	function move(){
		// call checkMobility, check if the tile is movable.
		var canMove = checkMobility(this); 
		// if movable, switch the position of empty space and the clicked tile.
		if(canMove){               
			move_a_piece(this);
		}
	}
	
	// this is a function move the piece of puzzle we clicked on to the empty space.
	function move_a_piece(div){
		// get the x,y value of tile
		var old_top = parseInt(window.getComputedStyle(div).top); 
		var old_left = parseInt(window.getComputedStyle(div).left);
		
		div.style.top = EMPTY_TOP + "px";
		div.style.left = EMPTY_LEFT + "px";
		
		// update the position of empty space.
		EMPTY_TOP = old_top; 
		EMPTY_LEFT = old_left;
	}
	
	// called when mouse hover a tile, change the appearance of a tile if it is
    //	movable: If a tile is movable, the cursor will be a pointer and border and 
	// text in the tile will become red.
	function hover(){
		var canMove = checkMobility(this);
		if(canMove){
			this.className += " hover";
		}
	}
	
	// called when mouse is out of a tile that is movable: set the cursor
	// 	back to normal and set border and text in the tile will be black.
	function out(){
		this.className = "square";
	}
	
	// called when "shuffle" button is clicked. It shuffle the puzzle.
	// and make sure it is in a solvable place.
	function shuffle(){
		for (var i = 0; i < 1000; i++){
			var neighbors = [];
			var squares = document.querySelectorAll("#puzzlearea .square");
			for(var index = 0; index < squares.length; index++){
				var canMove = checkMobility(squares[index]);
				if(canMove){
					neighbors.push(squares[index]);
				}
			}
			var rand_square = neighbors[Math.floor(Math.random() * neighbors.length)];
			move_a_piece(rand_square);
		}
	}
	
	// This function take a "div" as a parameter represent a tile. 
	// return true, when the tile is next to an empty space.
	// return false, when the tile is not next to a empty space.
	function checkMobility(div){
		// get the position of the clicked tile.
		var old_top = parseInt(window.getComputedStyle(div).top);
		var old_left = parseInt(window.getComputedStyle(div).left);
		
		// get the distance between the clicked tile and the empty space
		var dtop = Math.abs(old_top - EMPTY_TOP);
		var dleft = Math.abs(old_left - EMPTY_LEFT);
		
		// check if the distance between empty space and the tile is exactly 
		// the length of the width of a single tile. also they are on the same 
		// row or column, it is movable.
		if(((old_left == EMPTY_LEFT) && (dtop == PIXEL_OF_TILE)) ||
			((old_top == EMPTY_TOP) && (dleft == PIXEL_OF_TILE))){
			return true;
		} else {
			return false;
		}
	}
} )();