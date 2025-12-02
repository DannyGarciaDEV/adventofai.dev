// Story data structure
const story = {
    start: {
        text: `❄️ As the winter moon rises over the enchanted forest, you find yourself standing at a crossroads covered in sparkling snow. The air is thick with magic, and three paths lie before you:
        
A twisted trail leading deeper into the Whispering Woods, a glowing cave entrance in the Frostpeak Mountains, and a narrow path towards a distant village with smoke rising from chimneys.`,
        choices: [
            { text: "🌲 Enter the Whispering Woods", next: "woods" },
            { text: "💎 Explore the Glowing Cave", next: "cave" },
            { text: "🏡 Head to the Village", next: "village" }
        ]
    },
    woods: {
        text: `The trees seem to lean in as you walk, their snow-laden branches whispering ancient secrets. Suddenly, you spot a magnificent white fox with crystal-blue eyes. It seems to beckon you to follow. Nearby, you notice strange blue mushrooms glowing in the snow.`,
        choices: [
            { text: "🦊 Follow the Mysterious Fox", next: "fox_path" },
            { text: "🍄 Investigate the Glowing Mushrooms", next: "mushroom_path" }
        ]
    },
    cave: {
        text: `The cave walls sparkle with embedded crystals, casting rainbow reflections on the snow. As you venture deeper, you hear both melodious singing and the sound of running water. The path splits between following the ethereal music or investigating the source of water.`,
        choices: [
            { text: "🎵 Follow the Mysterious Song", next: "crystal_singer" },
            { text: "💧 Seek the Hidden Waters", next: "underground_spring" }
        ]
    },
    village: {
        text: `The village appears deserted, yet warm light spills from every window. In the central square, you see an old well with a strange blue glow and a cozy-looking inn with a "Welcomes Travelers" sign.`,
        choices: [
            { text: "⛲ Investigate the Glowing Well", next: "magic_well" },
            { text: "🏪 Enter the Welcoming Inn", next: "winter_inn" }
        ]
    },
    fox_path: {
        text: `The white fox leads you to a hidden grove where the Winter Queen holds court. She offers you a position as her messenger, carrying winter magic throughout the realm.
        
"Join us," she says, her voice like falling snow, "and become part of winter's eternal dance."`,
        ending: true,
        endingType: "✨ Magical Ending: The Winter Messenger",
        text_continue: `You accept the Winter Queen's offer, becoming a magical messenger of winter. Now you travel the world on winter winds, spreading frost and wonder wherever you go.`
    },
    mushroom_path: {
        text: `The mushrooms respond to your touch, releasing spores that swirl around you like stardust. You find yourself slowly transforming, becoming one with the winter forest's magic.`,
        ending: true,
        endingType: "🍄 Mysterious Ending: Forest Guardian",
        text_continue: `You become a guardian spirit of the winter woods, watching over its mysteries through endless snowy seasons. The forest's magic is now your magic.`
    },
    crystal_singer: {
        text: `You discover a chamber where a crystal maiden sings to the cave's heart, maintaining the balance of winter magic. She teaches you her song, passing on an ancient responsibility.`,
        ending: true,
        endingType: "🎵 Harmonious Ending: The Winter's Song",
        text_continue: `You learn the sacred winter songs, becoming a keeper of seasonal harmony. Your voice now helps guide the turning of the seasons.`
    },
    underground_spring: {
        text: `The underground spring reveals itself as a portal to the realm of frost giants. They recognize your bravery and offer you a chance to learn their ancient winter crafts.`,
        ending: true,
        endingType: "❄️ Epic Ending: Frost Giant Apprentice",
        text_continue: `You begin your apprenticeship with the frost giants, learning to craft wonders from ice and snow. Your creations will become winter legends.`
    },
    magic_well: {
        text: `Peering into the well, you're drawn into a world of eternal winter magic, where the boundaries between seasons blur and time flows like snowflakes.`,
        ending: true,
        endingType: "💫 Mystical Ending: Between the Seasons",
        text_continue: `You become a traveler between seasonal realms, helping maintain the delicate balance between winter and other seasons.`
    },
    winter_inn: {
        text: `The inn is filled with magical travelers from across the winter realms. They welcome you as one of their own, sharing stories and secrets of their magical trades.`,
        ending: true,
        endingType: "🏮 Cozy Ending: Winter Wanderer",
        text_continue: `You find a home among the magical travelers, sharing tales of winter wonders and embarking on new adventures with each snowfall.`
    }
};

// Game state
let currentScene = 'start';

// DOM elements
const storyText = document.getElementById('story-text');
const choicesContainer = document.getElementById('choices');
const restartButton = document.getElementById('restart');

// Initialize the game
function initGame() {
    showScene('start');
}

// Show a scene
function showScene(sceneId) {
    currentScene = sceneId;
    const scene = story[sceneId];
    
    // Create story text with fade effect
    storyText.className = 'fade-in';
    storyText.innerHTML = scene.text;
    
    // If it's an ending, add the ending type and continuation
    if (scene.ending) {
        storyText.innerHTML += `\n\n${scene.endingType}\n\n${scene.text_continue}`;
    }
    
    // Clear and update choices
    choicesContainer.innerHTML = '';
    
    if (scene.choices) {
        scene.choices.forEach(choice => {
            const button = document.createElement('button');
            button.textContent = choice.text;
            button.addEventListener('click', () => {
                showScene(choice.next);
            });
            choicesContainer.appendChild(button);
        });
    }
    
    // Show/hide restart button
    restartButton.style.display = scene.ending ? 'block' : 'none';
}

// Restart game handler
restartButton.addEventListener('click', () => {
    showScene('start');
});

// Initialize the game when the page loads
window.addEventListener('load', initGame);