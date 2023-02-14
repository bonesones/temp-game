let lastKey = "";


window.addEventListener("keydown", (e) => {
	if (player.isInteracting) {
		switch (e.key) {
		  case ' ':
			player.interactionAsset.dialogueIndex++
			
			const { dialogueIndex, dialogue } = player.interactionAsset
			if (dialogueIndex <= dialogue.length - 1) {
				document.querySelector('#characterDialogueBox').innerHTML =
				player.interactionAsset.dialogue[dialogueIndex]
				console.log(dialogue.length)
			  	return
			}

			// finish conversation
			player.isInteracting = false
			player.interactionAsset.dialogueIndex = 0
			document.querySelector('#characterDialogueBox').style.display = 'none'
	
			break
		}
		return
	}

	let move = null;

	if(e.keyCode === 87 || e.keyCode === 38) {
		move = "up";
	} else if (e.keyCode === 65 || e.keyCode === 37) {
		move = "left"
	} else if (e.keyCode === 40 || e.keyCode === 83) {
		move = "down"
	} else if (e.keyCode === 39 || e.keyCode === 68) {
		move = "right"
	} else if (e.keyCode === 32) {
		move = "space"
	}


	switch (move) {
		case "up":
			keys.w.pressed = true;
			lastKey = "w";
			break;
		case "left":
			keys.a.pressed = true;
			lastKey = "a";
			break;

		case "down":
			keys.s.pressed = true;
			lastKey = "s";
			break;

		case "right":
			keys.d.pressed = true;
			lastKey = "d";
			break;

		case "space":
			let inventory = itemsData;
			//const p = portal[i];
			/*
			if (
				player.position.x <= p.position.x + p.width &&
				player.position.x + player.width >= p.position.x &&
				player.position.y + player.height >= p.position.y &&
				player.position.y <= p.position.y + p.height
			) {
				console.log("1");
				p.play();
			
			} */
			if (!player.interactionAsset) return
			const isIntroDialogue = function(character) {
				return !player[`${character}Intro`] && player.interactionAsset.name === character;
			}

			const notInInventory = function(item) {
				console.log(!inventory[`${item}`] && player.interactionAsset.name === item, 'notInInventory')
				return !inventory[`${item}`] && player.interactionAsset.name === item
			}

			const isInInventory = function(item) {
				console.log(inventory[`${item}`], player.interactionAsset.name === item, 'isInInventory')
				return inventory[`${item}`] && player.interactionAsset.name === item
			}

			const isLackOfItem = function(item, character) {
				return !inventory[item] && player.interactionAsset.name === character && player[`${character}Intro`];
			}

			const isQuestDone = function(character) {
				return player[`${character}Quest`] && player.interactionAsset.name === character;
			}

			// beginning the conversation
			let dialogue = player.interactionAsset.introDialogue
			console.log(dialogue)
			if (
				isIntroDialogue("babka") || 
				isIntroDialogue("frank") || 
				isIntroDialogue("john") ||
				notInInventory("flowers") ||
				notInInventory("chicken") ||
				notInInventory("apple")
			) {
				dialogue = player.interactionAsset.introDialogue
			} else if ( 
				isLackOfItem("flowers", "frank") || 
				isLackOfItem("chicken", "john") || 
				(
					isLackOfItem("apple", "babka") || 
					isLackOfItem("milk", "babka") || 
					isLackOfItem("egg", "babka")
				)
			) {
				dialogue = player.interactionAsset.errorDialogue 
			} else if (
				isQuestDone("babka") || 
				isQuestDone("frank") || 
				isQuestDone("john")
			) {
				dialogue = player.interactionAsset.outroDialogue
			} else {
				dialogue = player.interactionAsset.endDialogue
			}
			console.log(dialogue, 'dialogue', player, 'player', inventory, 'inv')
			if (
				isInInventory("flowers") ||
				isInInventory("chicken") || 
				isInInventory("apple")
			) {
				return
			}
			
			player.interactionAsset.dialogue = dialogue
			keys.w.pressed = false
			keys.s.pressed = false
			keys.a.pressed = false
			keys.d.pressed = false
			console.log(player.interactionAsset)
			if (!player.babkaIntro && player.interactionAsset.name === "babka") {
				player.babkaIntro = true
			}
			else if (!player.frankIntro && player.interactionAsset.name === "frank") {
				player.frankIntro = true
			}
			else if (!player.johnIntro && player.interactionAsset.name === "john") {
				player.johnIntro = true
			}
			else if (!inventory.flowers && player.interactionAsset.name === "flowers") {
				inventory.flowers = true
			}
			else if (!inventory.chicken && player.interactionAsset.name === "chicken") {
				inventory.chicken = true
			}
			else if (!inventory.apple && player.interactionAsset.name === "apple") {
				inventory.apple = true
			}
			else if (player.frankIntro && player.interactionAsset.name === "frank" && inventory.flowers) {
				inventory.milk = true
				player.frankQuest = true
			}
			else if (player.babkaIntro && player.interactionAsset.name === "babka" && 
			inventory.egg && inventory.milk && inventory.apple) {
				player.babkaQuest = true
			}
			else if (player.johnIntro && player.interactionAsset.name === "john" && inventory.chicken) {
				inventory.egg = true
				player.johnQuest = true
			} 
			const firstMessage = dialogue[0]
			document.querySelector('#characterDialogueBox').innerHTML = firstMessage
			document.querySelector('#characterDialogueBox').style.display = 'flex'
			player.isInteracting = true

			break;
	}
});

window.addEventListener("keyup", (e) => {

	let move = null;

	if(e.keyCode === 87 || e.keyCode === 38) {
		move = "up";
	} else if (e.keyCode === 65 || e.keyCode === 37) {
		move = "left"
	} else if (e.keyCode === 40 || e.keyCode === 83) {
		move = "down"
	} else if (e.keyCode === 39 || e.keyCode === 68) {
		move = "right"
	} else if (e.keyCode === 32) {
		move = "space"
	}

	switch (move) {
		case "up":
			keys.w.pressed = false;
			break;
		case "left":
			keys.a.pressed = false;
			break;
		case "down":
			keys.s.pressed = false;
			break;
		case "right":
			keys.d.pressed = false;
			break;
	}
});
