const isIntroDialogue = function(character) {
	return !player[`${character}Intro`] && player.interactionAsset.name === character;
}

const notInInventory = function(item) {
    console.log(!inventory[`${item}`] && player.interactionAsset.name === item, 'notInInventory')
    return !inventory[`${item}`] && player.interactionAsset.name === item
}

const isInInventory = function(item, character) {
    console.log(inventory[`${item}`], player.interactionAsset.name === item, !player[`${character}Intro`],'isInInventory')
    return inventory[`${item}`] && player.interactionAsset.name === item || (!player[`${character}Intro`] && player.interactionAsset.name === item)
}

const isLackOfItem = function(item, character) {
    return !inventory[item] && player.interactionAsset.name === character && player[`${character}Intro`];
}

const isQuestDone = function(character) {
    return player[`${character}Quest`] && player.interactionAsset.name === character;
}

function checkIntroDialogue(character) {
    if (!player[`${character}Intro`] && player.interactionAsset.name === character) {
        player[`${character}Intro`] = true;
    }
    if (player.babkaIntro) inventory.receipt = true;
}

function checkForItem(item) {
    if (!inventory[`${item}`] && player.interactionAsset.name === item) {
        inventory[`${item}`] = true
    }
    if (inventory.chicken) chicken.opacity = 0;
    if (player.interactionAsset.name === 'clown') {
        player.isInteracting = true;
        document.querySelector('#clownScreen').style.display = 'flex';
        document.querySelector('#characterDialogueBox').style.color = 'purple'
        player.clown = true;
    }
}