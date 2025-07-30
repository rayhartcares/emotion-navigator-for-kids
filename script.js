document.addEventListener('DOMContentLoaded', () => {
    console.log("SCRIPT.JS HAS STARTED LOADING AND EXECUTING!");

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
    const backToIntroBtn = document.getElementById('back-to-intro-btn');

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
    const stage3FeedbackMessage = document.getElementById('stage3-feedback-message');

    // Element for the large emotion emoji in Stage 3
    const largeEmotionEmoji = document.getElementById('large-emotion-emoji');

    // Flash Message Elements
    const whyFlashMessage = document.getElementById('why-flash-message');
    const whatDoFlashMessage = document.getElementById('what-do-flash-message');
    let whyFlashTimeout;
    let whatDoFlashTimeout;

    // NEW Modal Elements
    const customFeedbackModalOverlay = document.getElementById('custom-feedback-modal-overlay');
    const modalFeedbackTitle = document.getElementById('modal-feedback-title');
    const modalFeedbackMessage = document.getElementById('modal-feedback-message');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    let currentModalAction;


    let selectedEmotion = '';
    let teacherName = "Ms. Benne Hart"; // Updated to your preferred name
    const teacherNameDisplay = document.getElementById('teacher-name-display');
    if (teacherNameDisplay) {
        teacherNameDisplay.textContent = teacherName;
    }

    // --- Emotion Emoji Map (for displaying the large emoji) ---
    const emotionEmojiMap = {
        'happy': '😃', 'sad': '😔', 'angry': '😡', 'scared': '😨', 'excited': '🤩',
        'calm': '😌', 'frustrated': '😤', 'shy': '😳', 'confused': '🤔', 'proud': '🥳',
        'lonely': '😢', 'disappointed': '😞'
    };

    // --- Data: Reasons & Actions for each Emotion (Now with icons/emojis!) ---
    const emotionContextData = {
        'happy': {
            reasons: [
                { text: "I played with my friends", icon: "🤝" }, { text: "Someone was kind to me", icon: "💖" },
                { text: "I learned something new", icon: "💡" }, { text: "I achieved a goal", icon: "🏆" },
                { text: "I spent time with my family", icon: "👨‍👩‍👧‍👦" }, { text: "I helped someone", icon: "✨" }
            ],
            actions: [
                { text: "Smile a lot", icon: "😁" }, { text: "Share my joy with others", icon: "📣" },
                { text: "Play more", icon: "🤸" }, { text: "Keep it to myself", icon: "🤫" },
                { text: "Laugh", icon: "😂" }, { text: "Hug someone", icon: "🫂" }
            ]
        },
        'sad': {
            reasons: [
                { text: "I miss someone", icon: "🥺" }, { text: "Something didn't go my way", icon: "👎" },
                { text: "I felt left out", icon: "🚪" }, { text: "Someone was unkind", icon: "💔" },
                { text: "I lost something important", icon: "📉" }, { text: "I didn't get what I wanted", icon: "🎁❌" }
            ],
            actions: [
                { text: "Cry", icon: "💧" }, { text: "Hide or be alone", icon: "👤" },
                { text: "Talk to someone", icon: "🗣️" }, { text: "Draw or write", icon: "✍️" },
                { text: "Listen to music", icon: "🎧" }, { text: "Watch TV/screen", icon: "📺" }
            ]
        },
        'angry': {
            reasons: [
                { text: "Someone wasn't fair", icon: "⚖️" }, { text: "My plans changed unexpectedly", icon: "📅❌" },
                { text: "I felt misunderstood", icon: "❓" }, { text: "I had to wait a long time", icon: "⏳" },
                { text: "Someone took my stuff", icon: " छीन " }, { text: "I felt controlled", icon: "🔗" }
            ],
            actions: [
                { text: "Yell or scream", icon: "😡" }, { text: "Hit or throw something (like a pillow)", icon: "💥" },
                { text: "Talk to a grown-up", icon: "💬" }, { text: "Take deep breaths", icon: "🌬️" },
                { text: "Go to my room", icon: "🚪" }, { text: "Punch something (like a cushion)", icon: "🥊" }
            ]
        },
        'scared': {
            reasons: [
                { text: "I saw something spooky", icon: "👻" }, { text: "I'm worried about something new", icon: "😬" },
                { text: "I heard a loud noise", icon: "🔊" }, { text: "I'm afraid of the dark", icon: "🌑" },
                { text: "I feel unsafe", icon: "⚠️" }, { text: "I'm worried about what might happen", icon: "🔮" }
            ],
            actions: [
                { text: "Hide", icon: "🙈" }, { text: "Run away", icon: "🏃" },
                { text: "Ask for a hug", icon: "🤗" }, { text: "Tell a grown-up", icon: "🗣️" },
                { text: "Close my eyes", icon: "🫣" }, { text: "Make myself small", icon: "🤏" }
            ]
        },
        'excited': {
            reasons: [
                { text: "Something fun is happening soon", icon: "🎉" }, { text: "I got a new toy/game", icon: "🎁" },
                { text: "I'm going on a trip", icon: "✈️" }, { text: "I'm seeing someone I love", icon: "💖" },
                { text: "I achieved something I worked hard for", icon: "🌟" }, { text: "I'm doing something I love", icon: "❤️" }
            ],
            actions: [
                { text: "Jump around", icon: "🤸" }, { text: "Talk very fast", icon: "💨" },
                { text: "Tell everyone", icon: "📣" }, { text: "Smile a lot", icon: "😁" },
                { text: "Can't sit still", icon: " fidgeting " }, { text: "Plan what to do next", icon: "🗓️" }
            ]
        },
        'calm': {
            reasons: [
                { text: "I'm feeling peaceful", icon: "🧘" }, { text: "I finished a task", icon: "✅" },
                { text: "I spent time in nature", icon: "🌳" }, { text: "I listened to quiet music", icon: "🎶" },
                { text: "I had a warm bath", icon: "🛀" }, { text: "I just woke up rested", icon: "🛌" }
            ],
            actions: [
                { text: "Breathe slowly", icon: "🌬️" }, { text: "Feel relaxed", icon: "😌" },
                { text: "Sit quietly", icon: "🪑" }, { text: "Read a book", icon: "📖" },
                { text: "Draw or color calmly", icon: "🖍️" }, { text: "Cuddle with a pet", icon: "🐶" }
            ]
        },
        'frustrated': {
            reasons: [
                { text: "Something is too hard", icon: "🤯" }, { text: "I can't figure it out", icon: "🤔" },
                { text: "Things aren't going my way", icon: "🚫" }, { text: "I'm stuck on a task", icon: "⛓️" },
                { text: "Someone isn't listening to me", icon: "👂❌" }, { text: "I feel helpless", icon: "🤷" }
            ],
            actions: [
                { text: "Sigh a lot", icon: "😮‍💨" }, { text: "Give up", icon: "🏳️" },
                { text: "Try harder", icon: "💪" }, { text: "Ask for help", icon: "🙋" },
                { text: "Take a break", icon: "⏸️" }, { text: "Get angry", icon: "😡" }
            ]
        },
        'shy': {
            reasons: [
                { text: "I'm in a new place", icon: "낯선" }, { text: "I don't know many people", icon: "👥" },
                { text: "I feel nervous to speak", icon: "🤐" }, { text: "I'm worried about what others think", icon: "👀" },
                { text: "I don't want to be noticed", icon: "🔦" }, { text: "I feel unsure", icon: "🤔" }
            ],
            actions: [
                { text: "Hide behind a grown-up", icon: "🧍‍♀️" }, { text: "Speak softly", icon: "🤫" },
                { text: "Avoid eye contact", icon: "↔️" }, { text: "Stay quiet", icon: "🔇" },
                { text: "Play alone", icon: "🧩" }, { text: "Blush", icon: " blushing " }
            ]
        },
        'confused': {
            reasons: [
                { text: "I don't understand something", icon: "🤷" }, { text: "The instructions are unclear", icon: "📜❌" },
                { text: "Something unexpected happened", icon: "🤯" }, { text: "I have too many thoughts", icon: "🤯" },
                { text: "I don't know what to do next", icon: "➡️❓" }, { text: "Things don't make sense", icon: "🤯" }
            ],
            actions: [
                { text: "Ask questions", icon: "❓" }, { text: "Try to figure it out", icon: "🔎" },
                { text: "Feel stuck", icon: "😩" }, { text: "Look for clues", icon: "🔍" },
                { text: "Feel overwhelmed", icon: "😵" }, { text: "Get a headache", icon: "🤕" }
            ]
        },
        'proud': {
            reasons: [
                { text: "I did something difficult", icon: "💪" }, { text: "I finished a big project", icon: "✅" },
                { text: "I helped someone important", icon: "🌟" }, { text: "I got good marks/feedback", icon: "💯" },
                { text: "I learned a new skill", icon: "🧠" }, { text: "I did my best", icon: "🥇" }
            ],
            actions: [
                { text: "Smile big", icon: "😁" }, { text: "Tell others about it", icon: "📣" },
                { text: "Feel strong", icon: "🤩" }, { text: "Want to do it again", icon: "🔁" },
                { text: "Feel confident", icon: "😎" }, { text: "Celebrate", icon: "🥳" }
            ]
        },
        'lonely': {
            reasons: [
                { text: "I don't have anyone to play with", icon: "🚏" }, { text: "My friends are busy", icon: "📞❌" },
                { text: "I miss someone far away", icon: " faraway " }, { text: "I felt left out by others", icon: "🚫" },
                { text: "I want company", icon: "🫂" }, { text: "I'm by myself for a long time", icon: "⏳" }
            ],
            actions: [
                { text: "Feel sad", icon: "😔" }, { text: "Watch TV/screens", icon: "📺" },
                { text: "Call someone", icon: "📞" }, { text: "Play alone", icon: "🧩" },
                { text: "Think about friends", icon: "💭" }, { text: "Try to find someone", icon: "🔎" }
            ]
        },
        'disappointed': {
            reasons: [
                { text: "My plans didn't work out", icon: "🗓️❌" }, { text: "I didn't get what I hoped for", icon: "😞" },
                { text: "Someone let me down", icon: "💔" }, { text: "I didn't win/succeed", icon: "🥈" },
                { text: "Something I looked forward to was cancelled", icon: "🚫" }, { text: "Things aren't fair", icon: "⚖️" }
            ],
            actions: [
                { text: "Feel sad", icon: "😔" }, { text: "Feel frustrated", icon: "😤" },
                { text: "Give up", icon: "🏳️" }, { text: "Try to understand why", icon: "🤔" },
                { text: "Cry", icon: "💧" }, { text: "Want to try again", icon: "💪" }
            ]
        }
    };

    // --- Data: Coping Mechanisms (Scientifically Supported) ---
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
            { title: "Face a Small Fear (with support)", description: "If it's a small fear, try facing it a little bit at a time, with a trusted grown-up by your side." }
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
            { title
