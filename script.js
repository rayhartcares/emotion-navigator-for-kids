document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.querySelector('.app-container');
    const stages = document.querySelectorAll('.stage');

    const introStage = document.getElementById('intro-stage');
    const emotionSelectStage = document.getElementById('emotion-select-stage');
    const whyDoStage = document.getElementById('why-do-stage');
    const copingStage = document.getElementById('coping-stage');
    const finalActionStage = document.getElementById('final-action-stage');

    const startFeelingsBtn = document.getElementById('start-feelings-btn');
    const emotionButtons = document.querySelectorAll('.emotion-btn');
    const currentEmotionPrompt = document.getElementById('current-emotion-prompt');
    const whyEmotionDisplay = document.getElementById('why-emotion-display');
    const whatDoEmotionDisplay = document.getElementById('what-do-emotion-display');
    const whyFeelingTextarea = document.getElementById('why-feeling');
    const whatDoTextarea = document.getElementById('what-do');
    const nextCopingBtn = document.getElementById('next-coping-btn');
    const backToEmotionsBtn = document.getElementById('back-to-emotions-btn');
    const copingIntroPrompt = document.getElementById('coping-intro-prompt');
    const copingSuggestionText = document.getElementById('coping-suggestion-text');
    const copingOptionsContainer = document.querySelector('.coping-options');
    const chooseNextActionBtn = document.getElementById('choose-next-action-btn');
    const backToWhyDoBtn = document.getElementById('back-to-why-do-btn');
    const finalActionButtons = document.querySelectorAll('.action-btn');

    let selectedEmotion = '';
    let teacherName = "[Teacher/Coach Name]"; // You can customize this!

    // --- Data for Coping Mechanisms (Scientifically Supported Placeholder) ---
    const copingMechanisms = {
        positive: [
            { title: "Deep Breathing", description: "Take 5 slow, deep belly breaths. Breathe in through your nose like you're smelling a flower, and out through your mouth like you're blowing out a candle." },
            { title: "Talk to a Trusted Adult", description: "Find a grown-up you trust (like a parent, teacher, or guardian) and tell them how you're feeling. They can help!" },
            { title: "Take a Break / Quiet Time", description: "Sometimes our brains need a break. Go to a quiet place, lie down, or just sit calmly for a few minutes." },
            { title: "Draw or Color", description: "Grab some paper and crayons. Draw how you feel, or just doodle! It can help your feelings move through you." },
            { title: "Listen to Calming Music", description: "Put on some gentle, soft music. Let the rhythm help your body relax and your mind feel peaceful." },
            { title: "Physical Activity", description: "Move your body! Go for a short walk, jump up and down, stretch, or do some jumping jacks. It helps release energy." },
            { title: "Drink Water", description: "Sometimes we forget to drink water! Sip some cool water slowly. It can help you feel refreshed and calm." },
            { title: "Squeeze a Stress Ball", description: "Squeeze and release a stress ball or even just your fists. Feel the tension, then let it go." },
            { title: "Help Someone Else", description: "Doing something kind for someone else can make you feel better too! Maybe help with a chore or share a toy." },
            { title: "Positive Self-Talk", description: "Tell yourself something kind, like 'I am brave' or 'I can do this.' It helps your brain feel stronger." }
        ],
        negative: [ // Coping mechanisms suggested if the child indicates a negative current action
            { title: "Ask for Help", description: "If you usually lash out or hide, remember it's brave to ask for help from an adult. They want to support you." },
            { title: "Use Your Words", description: "Instead of hitting or yelling, try to explain what you need or how you feel using words, even if it's hard." },
            { title: "Take Space", description: "If you feel like you might break something, take a few steps back from the situation. Give yourself a little space to cool down." },
            { title: "Practice Waiting", description: "If you tend to act impulsively, try counting to 10 slowly before doing anything. This gives your brain time to think." }
        ]
    };

    const emotionSpecificCoping = {
        'angry': [copingMechanisms.positive[0], copingMechanisms.positive[5], copingMechanisms.negative[1], copingMechanisms.negative[2]], // Deep Breathing, Physical Activity, Use Your Words, Take Space
        'sad': [copingMechanisms.positive[1], copingMechanisms.positive[3], copingMechanisms.positive[4], copingMechanisms.positive[9]], // Talk to Adult, Draw, Music, Positive Self-Talk
        'anxious': [copingMechanisms.positive[0], copingMechanisms.positive[2], copingMechanisms.positive[6], copingMechanisms.positive[7]], // Deep Breathing, Take a Break, Drink Water, Stress Ball
        'frustrated': [copingMechanisms.positive[0], copingMechanisms.positive[5], copingMechanisms.negative[3]], // Deep Breathing, Physical Activity, Practice Waiting
        // ... you can add more emotion-specific suggestions
    };

    // --- Helper Functions ---
    function showStage(stageToShow) {
        stages.forEach(stage => {
            stage.classList.remove('active');
            stage.style.display = 'none'; // Ensure it's hidden for proper re-display
        });
        stageToShow.style.display = 'block'; // Ensure it's displayed before adding active
        setTimeout(() => { // Add active class after a tiny delay for animation
            stageToShow.classList.add('active');
        }, 10);
        appContainer.scrollTop = 0; // Scroll to top of app container when new stage shows
    }

    function playIntroAudio() {
        // Placeholder for audio. In a real app, you'd have an audio file.
        // const audio = new Audio('intro.mp3');
        // audio.play();
        console.log("Playing intro audio (placeholder)");
    }

    // --- Event Listeners ---
    startFeelingsBtn.addEventListener('click', () => {
        playIntroAudio();
        showStage(emotionSelectStage);
    });

    emotionButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Deselect previous
            emotionButtons.forEach(btn => btn.classList.remove('selected'));
            // Select current
            button.classList.add('selected');
            selectedEmotion = button.dataset.emotion;

            // Update text for next stage
            const emotionText = button.textContent.split(' ')[1]; // Get just the word, e.g., "Happy"
            currentEmotionPrompt.textContent = `You're feeling ${emotionText}!`;
            whyEmotionDisplay.textContent = emotionText;
            whatDoEmotionDisplay.textContent = emotionText;

            // Clear previous inputs for a fresh start
            whyFeelingTextarea.value = '';
            whatDoTextarea.value = '';

            showStage(whyDoStage);
        });
    });

    nextCopingBtn.addEventListener('click', () => {
        const why = whyFeelingTextarea.value.toLowerCase();
        const whatDo = whatDoTextarea.value.toLowerCase();
        let suggestions = [];

        // Prioritize emotion-specific coping if available
        if (emotionSpecificCoping[selectedEmotion]) {
            suggestions = [...emotionSpecificCoping[selectedEmotion]];
        } else {
            // Default to general positive coping if no specific ones
            suggestions = [...copingMechanisms.positive];
        }

        // Add negative coping suggestions if current action indicates it
        // This is a simple keyword check; a real AI would use NLP for better understanding
        const negativeKeywords = ['yell', 'scream', 'hit', 'break', 'hide', 'run away', 'punch', 'throw', 'cry a lot', 'shut down'];
        const hasNegativeAction = negativeKeywords.some(keyword => whatDo.includes(keyword));

        if (hasNegativeAction) {
            copingIntroPrompt.textContent = `It sounds like you might be doing things that don't help you feel better. Let's find some new ways!`;
            copingSuggestionText.textContent = `These ideas are here to help you feel strong and calm. Remember, it's brave to try new things!`;
            // Add general negative coping strategies if applicable, avoiding duplicates
            copingMechanisms.negative.forEach(negCope => {
                if (!suggestions.some(s => s.title === negCope.title)) {
                    suggestions.push(negCope);
                }
            });
        } else {
            copingIntroPrompt.textContent = `Great! Let's find some ways to help you feel [Emotion Name] or move towards feeling happier!`;
            copingIntroPrompt.innerHTML = copingIntroPrompt.innerHTML.replace('[Emotion Name]', selectedEmotion); // Replace placeholder
            copingSuggestionText.textContent = `These are some ideas that many kids find helpful. You can choose what feels right for you!`;
        }

        // Shuffle suggestions and pick a few
        suggestions.sort(() => 0.5 - Math.random());
        const displayedSuggestions = suggestions.slice(0, 3); // Show 3 diverse suggestions

        copingOptionsContainer.innerHTML = ''; // Clear previous options
        displayedSuggestions.forEach(coping => {
            const card = document.createElement('div');
            card.classList.add('coping-option-card');
            card.innerHTML = `
                <h3>${coping.title}</h3>
                <p>${coping.description}</p>
            `;
            copingOptionsContainer.appendChild(card);
        });

        showStage(copingStage);
    });

    backToEmotionsBtn.addEventListener('click', () => {
        showStage(emotionSelectStage);
    });

    chooseNextActionBtn.addEventListener('click', () => {
        showStage(finalActionStage);
    });

    backToWhyDoBtn.addEventListener('click', () => {
        showStage(whyDoStage);
    });

    finalActionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.dataset.action;
            if (action === 'start-over') {
                alert("Great! Let's start a new feelings journey. Remember to check back anytime you need!");
                selectedEmotion = ''; // Reset state
                whyFeelingTextarea.value = '';
                whatDoTextarea.value = '';
                emotionButtons.forEach(btn => btn.classList.remove('selected'));
                showStage(introStage);
            } else if (action === 'talk-to-adult') {
                alert("That's a super brave choice! Talking to a grown-up can really help. Find someone you trust and share your feelings with them.");
                // Maybe offer to loop back to intro or suggest trying a coping mechanism later?
                 showStage(introStage); // For now, loop back to start
            } else if (action === 'play-game') {
                alert("Fantastic! Taking a break to play is a wonderful way to feel better. Go have some fun!");
                 showStage(introStage); // For now, loop back to start
            } else if (action === 'try-another-coping') {
                // This would ideally re-roll suggestions or go back to coping stage
                // For simplicity, let's go back to the coping stage with fresh suggestions
                nextCopingBtn.click(); // Re-run the logic to generate new coping suggestions
            }
        });
    });

    // Initial load: show the intro stage
    showStage(introStage);
});