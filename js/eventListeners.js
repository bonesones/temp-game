let lastKey = "";

let inventory = itemsData;

document.querySelector('#endScreen').addEventListener('click', () => {
	location.reload()
})

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
			if (player.clown) {
				player.clown = false;
				document.querySelector('#clownScreen').style.display = 'none'
				document.querySelector('#characterDialogueBox').style.color = 'black'
			}
			if (player.babkaQuest) {
				document.querySelector('#gameDiv').style.display = 'none'
				document.querySelector('#endScreen').style.display = 'flex'
			}
	
			break
		}
		return
	}
	if (player.watchingReceipt) {
		switch (e.keyCode) {
			case 67: 
				player.watchingReceipt = false
				document.querySelector('#receiptImg').style.display = 'none'
				document.querySelector('#characterDialogueBox').style.display = 'none'
				break;
			case 27: 
				player.watchingReceipt = false
				document.querySelector('#receiptImg').style.display = 'none'
				document.querySelector('#characterDialogueBox').style.display = 'none'
				break;
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
	} else if (e.keyCode === 67) {
		move = "c"
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
			if (!player.interactionAsset) return

			// beginning the conversation
			let dialogue = player.interactionAsset.introDialogue
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
			} else if (player.interactionAsset.name === 'clown') {
				dialogue
			} else {
				dialogue = player.interactionAsset.endDialogue
			}
			if (
				isInInventory("flowers", "frank") ||
				isInInventory("chicken", "john") || 
				isInInventory("apple", "babka")
			) return
			player.interactionAsset.dialogue = dialogue
			keys.w.pressed = false
			keys.s.pressed = false
			keys.a.pressed = false
			keys.d.pressed = false

			

			checkIntroDialogue('babka');
			checkIntroDialogue('frank');
			checkIntroDialogue('john');

			checkForItem('chicken');
			checkForItem('flowers');
			checkForItem('apple');

			if (player.frankIntro && player.interactionAsset.name === "frank" && inventory.flowers) {
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
		case "c":
			if (inventory.receipt) {
				keys.w.pressed = false;
				keys.s.pressed = false;
				keys.a.pressed = false;
				keys.d.pressed = false;
				document.querySelector('#receiptImg').style.display = 'flex';
				player.watchingReceipt = true;
			} else {
				const firstMessage = ['You need to talk to grandma first!'][0]
				document.querySelector('#characterDialogueBox').innerHTML = firstMessage
				document.querySelector('#characterDialogueBox').style.display = 'flex'
				player.watchingReceipt = true
			}
			
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
	} else if (e.keyCode === 67) {
		move = "c"
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
