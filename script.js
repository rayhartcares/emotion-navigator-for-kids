document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.querySelector('.app-container');
    const stages = document.querySelectorAll('.stage');

    // Stage Elements
    const introStage = document.getElementById('intro-stage');
    const emotionSelectStage = document.getElementById('emotion-select-stage');
    const whyDoStage = document.getElementById('why-do-stage');
    const copingStage = document.getElementById('coping-stage');
    const finalActionStage = document.getElementById('final-action-stage');

    // Buttons
    const startFeelingsBtn = document.getElementById('start-feelings-btn');
    const emotionButtons = document.querySelectorAll('.emotion-btn');
    const nextCopingBtn = document.getElementById('next-coping-btn');
    const backToEmotionsBtn = document.getElementById('back-to-emotions-btn');
    const chooseNextActionBtn = document.getElementById('choose-next-action-btn');
    const backToWhyDoBtn = document.getElementById('back-to-why-do-btn');
    const finalActionButtons = document.querySelectorAll('.action-btn');

    // Dynamic Text Elements
    const currentEmotionPrompt = document.getElementById('current-emotion-prompt');
    const whyEmotionDisplay = document.getElementById('why-emotion-display');
    const whatDoEmotionDisplay = document.getElementById('what-do-emotion-display');
    const copingIntroPrompt = document.getElementById('coping-intro-prompt');
    const copingSuggestionText = document.getElementById('coping-suggestion-text');

    // Input/Choice Elements for Stage 3
    const reasonsCheckboxesContainer = document.getElementById('reasons-checkboxes');
    const actionsCheckboxesContainer = document.getElementById('actions-checkboxes');
    const otherReasonCheckbox = document.getElementById('other-reason-checkbox');
    const whyFeelingOtherTextarea = document.getElementById('why-feeling-other');
    const otherActionCheckbox = document.getElementById('other-action-checkbox');
    const whatDoOtherTextarea = document.getElementById('what-do-other');
    const copingOptionsContainer = document.querySelector('.coping-options');


    let selectedEmotion = '';
    let teacherName = "Ms. Rayhart"; // Customize your teacher's name here!

    // --- Data: Reasons & Actions for each Emotion ---
    const emotionContextData = {
        'happy': {
            reasons: [
                "I played with my friends", "Someone was kind to me", "I learned something new",
                "I achieved a goal", "I spent time with my family", "I helped someone"
            ],
            actions: [
                "Smile a lot", "Share my joy with others", "Play more",
                "Keep it to myself", "Laugh", "Hug someone"
            ]
        },
        'sad': {
            reasons: [
                "I miss someone", "Something didn't go my way", "I felt left out",
                "Someone was unkind", "I lost something important", "I didn't get what I wanted"
            ],
            actions: [
                "Cry", "Hide or be alone", "Talk to someone",
                "Draw or write", "Listen to music", "Watch TV/screen"
            ]
        },
        'angry': {
            reasons: [
                "Someone wasn't fair", "My plans changed unexpectedly", "I felt misunderstood",
                "I had to wait a long time", "Someone took my stuff", "I felt controlled"
            ],
            actions: [
                "Yell or scream", "Hit or throw something (like a pillow)", "Talk to a grown-up",
                "Take deep breaths", "Go to my room", "Punch something (like a cushion)"
            ]
        },
        'scared': {
            reasons: [
                "I saw something spooky", "I'm worried about something new", "I heard a loud noise",
                "I'm afraid of the dark", "I feel unsafe", "I'm worried about what might happen"
            ],
            actions: [
                "Hide", "Run away", "Ask for a hug",
                "Tell a grown-up", "Close my eyes", "Make myself small"
            ]
        },
        'excited': {
            reasons: [
                "Something fun is happening soon", "I got a new toy/game", "I'm going on a trip",
                "I'm seeing someone I love", "I achieved something I worked hard for", "I'm doing something I love"
            ],
            actions: [
                "Jump around", "Talk very fast", "Tell everyone",
                "Smile a lot", "Can't sit still", "Plan what to do next"
            ]
        },
        'calm': {
            reasons: [
                "I'm feeling peaceful", "I finished a task", "I spent time in nature",
                "I listened to quiet music", "I had a warm bath", "I just woke up rested"
            ],
            actions: [
                "Breathe slowly", "Feel relaxed", "Sit quietly",
                "Read a book", "Draw or color calmly", "Cuddle with a pet"
            ]
        },
        'frustrated': {
            reasons: [
                "Something is too hard", "I can't figure it out", "Things aren't going my way",
                "I'm stuck on a task", "Someone isn't listening to me", "I feel helpless"
            ],
            actions: [
                "Sigh a lot", "Give up", "Try harder",
                "Ask for help", "Take a break", "Get angry"
            ]
        },
        'shy': {
            reasons: [
                "I'm in a new place", "I don't know many people", "I feel nervous to speak",
                "I'm worried about what others think", "I don't want to be noticed", "I feel unsure"
            ],
            actions: [
                "Hide behind a grown-up", "Speak softly", "Avoid eye contact",
                "Stay quiet", "Play alone", "Blush"
            ]
        },
        'confused': {
            reasons: [
                "I don't understand something", "The instructions are unclear", "Something unexpected happened",
                "I have too many thoughts", "I don't know what to do next", "Things don't make sense"
            ],
            actions: [
                "Ask questions", "Try to figure it out", "Feel stuck",
                "Look for clues", "Feel overwhelmed", "Get a headache"
            ]
        },
        'proud': {
            reasons: [
                "I did something difficult", "I finished a big project", "I helped someone important",
                "I got good marks/feedback", "I learned a new skill", "I did my best"
            ],
            actions: [
                "Smile big", "Tell others about it", "Feel strong",
                "Want to do it again", "Feel confident", "Celebrate"
            ]
        },
        'lonely': {
            reasons: [
                "I don't have anyone to play with", "My friends are busy", "I miss someone far away",
                "I feel left out by others", "I want company", "I'm by myself for a long time"
            ],
            actions: [
                "Feel sad", "Watch TV/screens", "Call someone",
                "Play alone", "Think about friends", "Try to find someone"
            ]
        },
        'disappointed': {
            reasons: [
                "My plans didn't work out", "I didn't get what I hoped for", "Someone let me down",
                "I didn't win/succeed", "Something I looked forward to was cancelled", "Things aren't fair"
            ],
            actions: [
                "Feel sad", "Feel frustrated", "Give up",
                "Try to understand why", "Cry", "Want to try again"
            ]
        }
    };

    // --- Data: Coping Mechanisms (Scientifically Supported) ---
    // Each emotion now has its distinct strategies.
    const emotionCopingStrategies = {
        'happy': [
            { title: "Share Your Joy", description: "Tell someone how happy you feel! Sharing makes joy even bigger. Call a friend or tell a family member." },
            { title: "Savor the Moment", description: "Close your eyes and remember exactly what made you happy. Feel it fully! What did you see, hear, smell, feel?" },
            { title: "Creative Expression", description: "Draw, sing, dance, or write about your happy feelings! Let your joy shine through art or movement." }
        ],
        'sad': [
            { title: "Talk to a Trusted Grown-Up", description: "Find a parent, teacher, or friend and tell them what's making you feel sad. Sharing helps feelings feel lighter. It's brave to ask for help." },
            { title: "Journal Your Thoughts", description: "Write down or draw about why you're sad. Getting your feelings out on paper can help you understand them better." },
            { title: "Comfort Activity", description: "Do something comforting: hug a stuffed animal, listen to gentle music, or wrap yourself in a cozy blanket. Be kind to yourself." }
        ],
        'angry': [
            { title: "Deep Belly Breaths", description: "Take 5 slow, deep breaths. Breathe in through your nose like you're smelling a flower (count to 4), hold (count to 4), and breathe out through your mouth like you're blowing out a candle (count to 4). Repeat." },
            { title: "Move Your Body Safely", description: "Jump up and down, run in place, or squeeze a stress ball. Get the angry energy out in a safe, controlled way without hurting anyone or anything." },
            { title: "Use Your Words", description: "Instead of yelling or hitting, try to use clear words to explain what's making you angry and what you need. Practice saying 'I feel angry because...'." }
        ],
        'scared': [
            { title: "Grounding Exercise (5-4-3-2-1)", description: "Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. This helps you feel present and safe." },
            { title: "Create a Safety Plan", description: "Think about what would make you feel safer. Can you turn on a light? Call someone? Plan your next steps to feel more secure." },
            { title: "Face a Small Fear (with support)", description: "If it's a small fear, try facing it a little bit at a time, with a trusted grown-up by your side. You are brave!" }
        ],
        'excited': [
            { title: "Channel Your Energy", description: "Use your excitement for something active and positive! Play a game, build something, or help with a task that uses your energy." },
            { title: "Share Your Enthusiasm", description: "Tell someone about what you're excited about! Sharing your happy anticipation can make it even more fun for everyone." },
            { title: "Plan for Fun", description: "Think about how you'll enjoy what you're excited for. Planning can make the anticipation even better and help manage big energy." }
        ],
        'calm': [
            { title: "Mindful Moment", description: "Notice what calm feels like in your body. How does your breathing feel? What sounds do you hear? Savor this peaceful feeling and remember it." },
            { title: "Gentle Stretching", description: "Slowly stretch your arms, legs, or back. Feel your muscles relax even more into this calm state. No need to push, just enjoy." },
            { title: "Share Calmness", description: "Can you help someone else feel calm too? Sometimes reading a quiet story, drawing together, or just being gentle can spread peaceful feelings." }
        ],
        'frustrated': [
            { title: "Take a Brain Break", description: "Step away from the frustrating task for a few minutes. Do something else completely (like a quick stretch), then come back to it with fresh eyes." },
            { title: "Ask for a Hint", description: "It's okay to ask for help! See if a grown-up or friend can give you a small hint or explain it in a different way without doing it for you." },
            { title: "Problem-Solving Steps", description: "What's the problem? What are 3 different ways you could try to solve it? Which one will you try first? Keep trying!" }
        ],
        'shy': [
            { title: "Practice a Small Step", description: "If you want to join in, try just smiling at someone, or saying 'hi' quietly first. Small, brave steps are great! You don't have to be loud to be noticed." },
            { title: "Find a Shared Interest", description: "Look for someone doing something you like. Maybe you can join in that activity without needing to talk too much at first. Let your actions speak." },
            { title: "Comfort Item/Spot", description: "Hold a special toy, wear a cozy sweater, or find a safe, quiet corner that makes you feel brave and comfortable. This can give you confidence." }
        ],
        'confused': [
            { title: "Ask Questions Clearly", description: "It's okay not to understand everything. Ask a grown-up or friend to explain it in a different way or use simpler words. Don't be afraid to say 'I don't get it yet!'" },
            { title: "Break It Down", description: "If something feels too confusing, try to break it into smaller, easier parts. What's the very first tiny piece you understand?" },
            { title: "Visualize or Draw It Out", description: "Sometimes drawing out what's confusing, or imagining it in your mind, can help clear things up. See if you can map it out." }
        ],
        'proud': [
            { title: "Acknowledge Your Effort", description: "Think about all the hard work, practice, and perseverance you put in to feel proud. You truly earned this amazing feeling!" },
            { title: "Share Your Achievement", description: "Tell someone about what makes you proud. It's wonderful to share your successes and let others celebrate with you!" },
            { title: "Set a New Goal", description: "Feeling proud is a great energy boost! What's the next cool thing you want to try, learn, or achieve? Keep that momentum going!" }
        ],
        'lonely': [
            { title: "Reach Out to a Friend/Family", description: "Think of a friend, cousin, or family member you haven't talked to recently. Send them a message or ask a grown-up if you can call them or arrange a visit." },
            { title: "Find a Shared Activity", description: "Are there activities or hobbies you enjoy? Maybe you can find a club, class, or online group where others like to do that too. You might find new friends!" },
            { title: "Connect with Nature or Pets", description: "Sometimes spending time outside, observing plants and animals, or playing with a pet can help you feel connected to the world around you and less alone." }
        ],
        'disappointed': [
            { title: "Acknowledge the Feeling", description: "It's okay to feel disappointed. Give yourself a moment to feel it without judgment. It's a normal and human feeling when things don't go as hoped." },
            { title: "Learn from the Experience", description: "What can you learn from this situation? Is there something you can do differently next time, or a new way to look at what happened? Every experience teaches us something." },
            { title: "Set a New (Small) Goal", description: "If a plan didn't work out, try setting a new, smaller, achievable goal. This can help you feel in control and hopeful again, even if it's a tiny step forward." }
        ]
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

    function createCheckbox(idPrefix, value, text, name, container) {
        const label = document.createElement('label');
        label.classList.add('checkbox-container');
        label.innerHTML = `
            <input type="checkbox" id="${idPrefix}-${value.replace(/\s+/g, '-').toLowerCase()}" name="${name}" value="${value}">
            ${text}
            <span class="checkmark"></span>
        `;
        container.appendChild(label);
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

            // Clear and populate checkboxes for reasons
            reasonsCheckboxesContainer.innerHTML = '';
            emotionContextData[selectedEmotion].reasons.forEach(reason => {
                createCheckbox('reason', reason, reason, 'reasons', reasonsCheckboxesContainer);
            });
            whyFeelingOtherTextarea.value = '';
            whyFeelingOtherTextarea.style.display = 'none';
            otherReasonCheckbox.checked = false;

            // Clear and populate checkboxes for actions
            actionsCheckboxesContainer.innerHTML = '';
            emotionContextData[selectedEmotion].actions.forEach(action => {
                createCheckbox('action', action, action, 'actions', actionsCheckboxesContainer);
            });
            whatDoOtherTextarea.value = '';
            whatDoOtherTextarea.style.display = 'none';
            otherActionCheckbox.checked = false;


            showStage(whyDoStage);
        });
    });

    // Toggle "Other" textareas visibility
    otherReasonCheckbox.addEventListener('change', () => {
        whyFeelingOtherTextarea.style.display = otherReasonCheckbox.checked ? 'block' : 'none';
        if (!otherReasonCheckbox.checked) whyFeelingOtherTextarea.value = ''; // Clear if hidden
    });

    otherActionCheckbox.addEventListener('change', () => {
        whatDoOtherTextarea.style.display = otherActionCheckbox.checked ? 'block' : 'none';
        if (!otherActionCheckbox.checked) whatDoOtherTextarea.value = ''; // Clear if hidden
    });

    nextCopingBtn.addEventListener('click', () => {
        // Gather selected reasons
        const selectedReasons = Array.from(document.querySelectorAll('#reasons-checkboxes input[name="reasons"]:checked'))
                                     .map(cb => cb.value);
        if (otherReasonCheckbox.checked && whyFeelingOtherTextarea.value.trim() !== '') {
            selectedReasons.push(whyFeelingOtherTextarea.value.trim());
        }

        // Gather selected actions
        const selectedActions = Array.from(document.querySelectorAll('#actions-checkboxes input[name="actions"]:checked'))
                                    .map(cb => cb.value);
        if (otherActionCheckbox.checked && whatDoOtherTextarea.value.trim() !== '') {
            selectedActions.push(whatDoOtherTextarea.value.trim());
        }

        // --- Coping Mechanism Logic ---
        let suggestions = [];
        const emotionText = selectedEmotion.charAt(0).toUpperCase() + selectedEmotion.slice(1); // Capitalize first letter

        if (emotionCopingStrategies[selectedEmotion]) {
            suggestions = [...emotionCopingStrategies[selectedEmotion]];
            copingIntroPrompt.textContent = `Feeling ${emotionText} is okay! Here are some ideas to help you feel better:`;
            copingSuggestionText.textContent = `These are helpful ways to manage ${selectedEmotion} feelings. Which one feels right for you?`;
        } else {
            // Fallback if an emotion somehow doesn't have specific strategies (shouldn't happen with our data)
            suggestions = emotionCopingStrategies['happy']; // Default to general positive
            copingIntroPrompt.textContent = `Sometimes feelings are tricky! Here are some general ideas that can help:`;
            copingSuggestionText.textContent = `You can try these activities to help you feel more balanced.`;
        }

        // --- Refine suggestions based on 'What do you usually do?' (simple keyword check) ---
        // We'll add general helpful coping mechanisms if the child identifies negative actions
        const negativeActionKeywords = ['yell', 'scream', 'hit', 'break', 'punch', 'throw', 'hide', 'run away', 'shut down', 'cry a lot', 'kick', 'bite'];
        const hasNegativeAction = selectedActions.some(action =>
            negativeActionKeywords.some(keyword => action.toLowerCase().includes(keyword))
        );

        if (hasNegativeAction) {
             // Add some basic regulation/communication tips if negative actions are identified
             const specificRegulationTips = [
                 { title: "Ask for Help", description: "If you usually lash out or hide, remember it's brave to ask for help from an adult. They want to support you." },
                 { title: "Use Your Words Clearly", description: "Instead of hitting or yelling, try to explain what you need or how you feel using words, even if it's hard." },
                 { title: "Take Space Safely", description: "If you feel like you might break something, take a few steps back from the situation. Give yourself a little space to cool down in a safe spot." }
             ];
             specificRegulationTips.forEach(tip => {
                 if (!suggestions.some(s => s.title === tip.title)) { // Avoid duplicates
                     suggestions.unshift(tip); // Add to the beginning
                 }
             });
            copingIntroPrompt.textContent = `It sounds like you might be doing things that don't always help you feel better. Let's find some new ways!`;
            copingSuggestionText.textContent = `These ideas are here to help you feel strong and calm. Remember, it's brave to try new things!`;
        }


        // Display 3-4 suggestions (can be adjusted)
        // Shuffle to get a random selection each time, then pick from the top
        suggestions.sort(() => 0.5 - Math.random());
        const displayedSuggestions = suggestions.slice(0, 4); // Display up to 4 coping strategies

        copingOptionsContainer.innerHTML = ''; // Clear previous options
        if (displayedSuggestions.length === 0 && suggestions.length > 0) { // Fallback if slice result empty (e.g., if less than 4 options)
             suggestions.slice(0, suggestions.length).forEach(coping => {
                 addCopingCard(coping);
             });
        } else if (displayedSuggestions.length > 0) {
            displayedSuggestions.forEach(coping => {
                addCopingCard(coping);
            });
        } else { // Truly no suggestions (shouldn't happen with our data)
             copingOptionsContainer.innerHTML = `<p>No specific coping strategies found for this emotion right now. But remember, taking a deep breath and talking to a grown-up are always great ideas!</p>`;
        }


        showStage(copingStage);
    });

    function addCopingCard(coping) {
        const card = document.createElement('div');
        card.classList.add('coping-option-card');
        card.innerHTML = `
            <h3>${coping.title}</h3>
            <p>${coping.description}</p>
        `;
        copingOptionsContainer.appendChild(card);
    }

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
                // Also reset all checkboxes and textareas
                document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
                document.querySelectorAll('textarea').forEach(ta => ta.value = '');
                whyFeelingOtherTextarea.style.display = 'none';
                whatDoOtherTextarea.style.display = 'none';
                emotionButtons.forEach(btn => btn.classList.remove('selected'));
                showStage(introStage);
            } else if (action === 'talk-to-adult') {
                alert("That's a super brave choice! Talking to a grown-up can really help. Find someone you trust and share your feelings with them.");
                showStage(introStage); // Loop back to start after advice
            } else if (action === 'play-game') {
                alert("Fantastic! Taking a break to play is a wonderful way to feel better. Go have some fun!");
                showStage(introStage); // Loop back to start after advice
            } else if (action === 'try-another-coping') {
                // Re-run the logic to generate new coping suggestions, keeping context
                nextCopingBtn.click();
            }
        });
    });

    // Initial load: show the intro stage
    showStage(introStage);
});
