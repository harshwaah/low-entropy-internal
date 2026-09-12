/**
 * Cognitive Activities Service Implementation
 * Owned by: Contributor 3 (Cognitive Lead)
 * Version: v0.7.0 - Cognitive Activities Foundation
 */

import {
  ActivityCategory,
  CognitiveActivityMeta,
  ActivityProgressSummary,
  MemoryCardItem,
  MemoryMatchDifficulty,
  RoutineScenario,
  RecognitionScene,
} from '../types';

export interface ICognitiveService {
  getCategories(): ActivityCategory[];
  getAllActivities(): CognitiveActivityMeta[];
  getRecommendedActivity(): CognitiveActivityMeta;
  getProgressSummary(): ActivityProgressSummary;
  getMemoryMatchDeck(difficulty?: MemoryMatchDifficulty): MemoryCardItem[];
  getRoutineScenarios(): RoutineScenario[];
  getRecognitionScenes(): RecognitionScene[];
}

class CognitiveServiceImpl implements ICognitiveService {
  private categories: ActivityCategory[] = [
    {
      id: 'memory_matching',
      title: 'Memory & Matching',
      tagline: 'Gentle card pairing',
      description: 'Strengthen recall and pattern recognition with comforting, familiar everyday items.',
      iconName: 'Sparkles',
      colorTheme: {
        bg: 'bg-emerald-50',
        lightBg: 'bg-emerald-100/60',
        border: 'border-emerald-200',
        text: 'text-emerald-900',
        badgeBg: 'bg-emerald-200/70 text-emerald-900',
      },
      activitiesCount: 1,
    },
    {
      id: 'routine_sequencing',
      title: 'Daily Routines',
      tagline: 'What comes next?',
      description: 'Follow reassuring episodic steps from morning tea to watering garden flowers.',
      iconName: 'ListOrdered',
      colorTheme: {
        bg: 'bg-amber-50',
        lightBg: 'bg-amber-100/60',
        border: 'border-amber-200',
        text: 'text-amber-900',
        badgeBg: 'bg-amber-200/70 text-amber-900',
      },
      activitiesCount: 1,
    },
    {
      id: 'visual_recognition',
      title: 'Mindful Observation',
      tagline: 'Find the object',
      description: 'Explore calm, illustrated household corners to discover nostalgic personal treasures.',
      iconName: 'Search',
      colorTheme: {
        bg: 'bg-blue-50',
        lightBg: 'bg-blue-100/60',
        border: 'border-blue-200',
        text: 'text-blue-900',
        badgeBg: 'bg-blue-200/70 text-blue-900',
      },
      activitiesCount: 1,
    },
  ];

  private activities: CognitiveActivityMeta[] = [
    {
      id: 'find-the-object',
      categoryId: 'visual_recognition',
      title: 'Find The Object',
      subtitle: 'Spot comforting items in cozy rooms',
      description: 'Take your time looking around the kitchen, veranda, and living room to find everyday favorites with gentle companion hints.',
      href: '/patient/activities/find-the-object',
      iconName: 'Eye',
      estimatedMinutes: '5 minutes',
      difficultyLabel: 'Relaxing & Scenic',
      encouragementPrompt: 'Can you help me spot a few cozy items in this warm room?',
      badgeLabel: 'Featured Game',
      themeColor: '#2563EB',
      isCompletedToday: false,
    },
    {
      id: 'quick-pick-trail',
      categoryId: 'visual_recognition',
      title: 'Quick Pick Trail',
      subtitle: 'Little questions. Big confidence.',
      description: 'Guide your cute friend to collect apples with the right answers in a calm, adaptive trail adventure.',
      href: '/patient/activities/quick-pick-trail',
      iconName: 'Sparkles',
      estimatedMinutes: '4-6 minutes',
      difficultyLabel: 'Calm & Adaptive',
      encouragementPrompt: 'Let’s give your brain a little workout with your cute friend today!',
      badgeLabel: 'Apple Trail',
      themeColor: '#2C5545',
      isCompletedToday: false,
    },
    {
      id: 'memory-trail',
      categoryId: 'memory_matching',
      title: 'My Memory Trail',
      subtitle: 'A gentle walk through your life memories',
      description: 'Revisit childhood home, school, market, and family memories through photos, voice, and comforting questions.',
      href: '/patient/activities/memory-trail',
      iconName: 'Sparkles',
      estimatedMinutes: '5-8 minutes',
      difficultyLabel: 'Warm & Autobiographical',
      encouragementPrompt: 'Let’s take a gentle walk through your cherished life memories today.',
      badgeLabel: 'Life Memories',
      themeColor: '#2C5545',
      isCompletedToday: false,
    },
    {
      id: 'memory-match',
      categoryId: 'memory_matching',
      title: 'Memory Match',
      subtitle: 'Gentle pair matching with familiar treasures',
      description: 'Turn over cards to pair up fragrant marigolds, steaming chai, sweet mangoes, and brass bells. No timers, no rush.',
      href: '/patient/activities/memory-match',
      iconName: 'Sparkles',
      estimatedMinutes: '3-5 minutes',
      difficultyLabel: 'Calm & Easy',
      encouragementPrompt: 'Would you like to match some comforting pictures together today?',
      badgeLabel: 'Floral Match',
      themeColor: '#4A8B71',
      isCompletedToday: false,
    },
    {
      id: 'what-comes-next',
      categoryId: 'routine_sequencing',
      title: 'What Comes Next?',
      subtitle: 'Follow soothing daily life rhythms',
      description: 'From brewing morning chai to relaxing at sunset, pick the next natural step in a peaceful day.',
      href: '/patient/activities/what-comes-next',
      iconName: 'ListOrdered',
      estimatedMinutes: '4-6 minutes',
      difficultyLabel: 'Intuitive & Guided',
      encouragementPrompt: 'Let’s trace through a soothing daily routine together, step by step.',
      badgeLabel: 'Daily Routine',
      themeColor: '#D97706',
      isCompletedToday: false,
    },
  ];

  getCategories(): ActivityCategory[] {
    return this.categories;
  }

  getAllActivities(): CognitiveActivityMeta[] {
    return this.activities;
  }

  getRecommendedActivity(): CognitiveActivityMeta {
    return this.activities[0]; // Find The Object as primary featured recommendation
  }

  getProgressSummary(): ActivityProgressSummary {
    return {
      activitiesCompletedToday: 2,
      totalAvailable: 3,
      mindfulMinutesSpent: 8,
      positiveAffirmation: 'Wonderful curiosity today, Meera! Your mind is glowing bright.',
      streakDays: 4,
    };
  }

  getMemoryMatchDeck(difficulty: MemoryMatchDifficulty = 'gentle'): MemoryCardItem[] {
    // Cultural and nostalgic items familiar to an Indian elder
    const cardPool = [
      {
        pairId: 'chai',
        title: 'Garam Chai',
        subtitle: 'Hot Spiced Tea',
        symbol: '☕',
        description: 'A comforting brass glass of hot ginger chai',
      },
      {
        pairId: 'marigold',
        title: 'Genda Phool',
        subtitle: 'Marigold Blossom',
        symbol: '🌼',
        description: 'Bright golden marigold garland from the morning pooja',
      },
      {
        pairId: 'peacock',
        title: 'Mor Pankh',
        subtitle: 'Peacock Feather',
        symbol: '🪶',
        description: 'An auspicious iridescent peacock feather',
      },
      {
        pairId: 'mango',
        title: 'Meetha Aam',
        subtitle: 'Sweet Mango',
        symbol: '🥭',
        description: 'A ripe and juicy golden Alphonso mango',
      },
      {
        pairId: 'diya',
        title: 'Pooja Diya',
        subtitle: 'Brass Oil Lamp',
        symbol: '🪔',
        description: 'A warm glowing clay diya bringing peace to the home',
      },
      {
        pairId: 'radio',
        title: 'Vintage Radio',
        subtitle: 'Oldies Radio',
        symbol: '📻',
        description: 'Playing classic Kishore Kumar and Lata Mangeshkar melodies',
      },
    ];

    // Select pairs depending on difficulty (gentle = 3 pairs / 6 cards, standard = 4 pairs / 8 cards)
    const pairCount = difficulty === 'gentle' ? 3 : 4;
    const selectedPool = cardPool.slice(0, pairCount);

    const fullDeck: MemoryCardItem[] = [];
    selectedPool.forEach((item, index) => {
      fullDeck.push({
        id: `${item.pairId}-card-a`,
        pairId: item.pairId,
        title: item.title,
        subtitle: item.subtitle,
        symbol: item.symbol,
        description: item.description,
        isFlipped: false,
        isMatched: false,
      });
      fullDeck.push({
        id: `${item.pairId}-card-b`,
        pairId: item.pairId,
        title: item.title,
        subtitle: item.subtitle,
        symbol: item.symbol,
        description: item.description,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Deterministic or pseudo-random gentle shuffle
    return fullDeck.sort(() => Math.random() - 0.5);
  }

  getRoutineScenarios(): RoutineScenario[] {
    return [
      {
        id: 'scenario-morning-tea',
        title: 'The Morning Sunshine Ritual',
        theme: 'Morning Awakenings',
        storyDescription: 'The sun is softly rising over the trees, and the birds are chirping outside the window.',
        sequenceSteps: [
          {
            id: 's1-step1',
            order: 1,
            title: 'Wake Up to Sunlight',
            detail: 'Stretching gently and opening the bedroom curtains',
            symbol: '🌅',
            isCompleted: true,
          },
          {
            id: 's1-step2',
            order: 2,
            title: 'Wash Face & Brush Teeth',
            detail: 'Cool refreshing water and morning freshness',
            symbol: '🪥',
            isCompleted: true,
          },
        ],
        missingStepPrompt: 'After waking up and freshening up, what delicious routine comes next?',
        options: [
          {
            id: 's1-opt-breakfast',
            title: 'Warm Breakfast & Morning Chai',
            detail: 'A fresh bowl of poha or toast with a warm cup of cardamom chai.',
            symbol: '🥣',
            isCorrect: true,
            affirmation: 'Splendid! A warm breakfast and fresh chai gently energizes you for the day!',
            gentleNudge: 'Breakfast and warm tea is the perfect way to begin the morning.',
          },
          {
            id: 's1-opt-sleep',
            title: 'Put on Nightclothes & Go to Sleep',
            detail: 'Pulling the warm blanket over your head for the night.',
            symbol: '🌙',
            isCorrect: false,
            affirmation: 'A cozy sleep is wonderful at night, but in the bright morning, we love to eat breakfast first!',
            gentleNudge: 'The sun is just coming up! Let’s think about what gives us morning energy.',
          },
        ],
      },
      {
        id: 'scenario-chai-making',
        title: 'Brewing Afternoon Masala Chai',
        theme: 'Comforting Kitchen Rituals',
        storyDescription: 'Around four o’clock in the afternoon, the aroma of spices warms the whole home.',
        sequenceSteps: [
          {
            id: 's2-step1',
            order: 1,
            title: 'Boil Fresh Water in Saucepan',
            detail: 'Setting the pan on the stove with fresh clean water',
            symbol: '🫖',
            isCompleted: true,
          },
          {
            id: 's2-step2',
            order: 2,
            title: 'Add Fresh Ginger & Tea Leaves',
            detail: 'Crushed ginger root and fragrant Assam tea leaves',
            symbol: '🌿',
            isCompleted: true,
          },
        ],
        missingStepPrompt: 'The tea has simmered with milk into a rich golden amber. What do we do next?',
        options: [
          {
            id: 's2-opt-pour',
            title: 'Strain & Pour into Your Favorite Cup',
            detail: 'Pouring the hot, fragrant tea through a brass strainer into your cup.',
            symbol: '☕',
            isCorrect: true,
            affirmation: 'Delightful! Your hot chai is poured and ready to sip with a crunchy biscuit!',
            gentleNudge: 'Pouring the chai into your favorite cup completes this cozy tea time.',
          },
          {
            id: 's2-opt-sweep',
            title: 'Go Sweep the Muddy Garden Path',
            detail: 'Leaving the hot tea on the stove and stepping out in the dirt.',
            symbol: '🧹',
            isCorrect: false,
            affirmation: 'Gardening is lovely, but let’s first enjoy this delicious hot tea while it’s warm!',
            gentleNudge: 'The tea is hot and ready in the pan. Let’s pour it into a cup to drink!',
          },
        ],
      },
      {
        id: 'scenario-gardening',
        title: 'Tending to the Balcony Garden',
        theme: 'Nature & Greenery',
        storyDescription: 'The afternoon breeze is gentle, and the potted plants on the veranda are waiting for care.',
        sequenceSteps: [
          {
            id: 's3-step1',
            order: 1,
            title: 'Step onto the Veranda',
            detail: 'Enjoying the fresh air and sweet smell of earth',
            symbol: '🪴',
            isCompleted: true,
          },
          {
            id: 's3-step2',
            order: 2,
            title: 'Fill the Watering Can',
            detail: 'Gathering fresh cool water from the garden tap',
            symbol: '🚰',
            isCompleted: true,
          },
        ],
        missingStepPrompt: 'With the watering can full of cool water, what shall we do next?',
        options: [
          {
            id: 's3-opt-water',
            title: 'Water the Sacred Tulsi & Flowers',
            detail: 'Gently sprinkling water over the green leaves and fragrant marigolds.',
            symbol: '💧',
            isCorrect: true,
            affirmation: 'Wonderful! The Tulsi and flowers look so happy and green with fresh water!',
            gentleNudge: 'Giving fresh water to the thirsty plants keeps the balcony blooming.',
          },
          {
            id: 's3-opt-coat',
            title: 'Put on a Heavy Winter Woolen Coat',
            detail: 'Wearing a thick wool jacket in the pleasant warm garden.',
            symbol: '🧥',
            isCorrect: false,
            affirmation: 'A heavy coat is for freezing winter! In our pleasant garden, watering the plants is just right.',
            gentleNudge: 'We are holding a watering can! Let’s pour water on the plants.',
          },
        ],
      },
      {
        id: 'scenario-evening-rest',
        title: 'Peaceful Evening Wind-Down',
        theme: 'Evening Calm',
        storyDescription: 'The stars are emerging in the twilight sky, and the home is quiet and serene.',
        sequenceSteps: [
          {
            id: 's4-step1',
            order: 1,
            title: 'Watch the Balcony Sunset',
            detail: 'The sky turns soft shades of rose, orange, and purple',
            symbol: '🌆',
            isCompleted: true,
          },
          {
            id: 's4-step2',
            order: 2,
            title: 'Listen to Calming Sitar Melodies',
            detail: 'Gentle, soothing instrumental music fills the room',
            symbol: '🎶',
            isCompleted: true,
          },
        ],
        missingStepPrompt: 'With the home peaceful and night drawing near, what is the best next step?',
        options: [
          {
            id: 's4-opt-sleep',
            title: 'Rest in Bed with a Cozy Blanket',
            detail: 'Laying your head on a soft pillow for peaceful dreams.',
            symbol: '🛏️',
            isCorrect: true,
            affirmation: 'Sweet dreams, Meera! A restful sleep brings peace and bright energy for tomorrow.',
            gentleNudge: 'Tucking into a soft bed is the most peaceful ending to a lovely day.',
          },
          {
            id: 's4-opt-run',
            title: 'Go for a Fast Running Sprint',
            detail: 'Running as fast as you can in the dark midnight streets.',
            symbol: '🏃',
            isCorrect: false,
            affirmation: 'Nighttime is for calmness and gentle rest, not running in the dark!',
            gentleNudge: 'The moon is out and we feel relaxed. Let’s rest in our warm bed.',
          },
        ],
      },
    ];
  }

  getRecognitionScenes(): RecognitionScene[] {
    return [
      {
        id: 'scene-kitchen',
        title: 'Dadi’s Cozy Chai Corner',
        roomName: 'The Kitchen Counter',
        sceneTheme: 'Warm Spices & Teatime',
        atmosphereDescription: 'Sunlight streams onto a marble counter with polished brass utensils and fragrant tea.',
        sceneBgClass: 'from-amber-50/80 via-orange-50/50 to-stone-50',
        sceneAccentClass: 'border-amber-200 text-amber-900',
        objectsToFind: [
          {
            id: 'k-item-chai-glass',
            name: 'Brass Chai Glass',
            symbol: '☕',
            clue: 'A warm, gleaming glass of hot spiced chai resting on a coaster.',
            locationHint: 'Look near the center of the kitchen counter.',
            xPercent: 48,
            yPercent: 46,
            sizeClass: 'text-5xl',
            isFound: false,
          },
          {
            id: 'k-item-spoon',
            name: 'Silver Spoon',
            symbol: '🥄',
            clue: 'Used to stir sweetness and crushed cardamom into the tea.',
            locationHint: 'Resting beside the ceramic sugar bowl on the right side.',
            xPercent: 78,
            yPercent: 62,
            sizeClass: 'text-4xl',
            isFound: false,
          },
          {
            id: 'k-item-teapot',
            name: 'Copper Teapot',
            symbol: '🫖',
            clue: 'A sturdy teapot holding fresh piping-hot brew.',
            locationHint: 'On the left shelf near the spice tins.',
            xPercent: 20,
            yPercent: 32,
            sizeClass: 'text-5xl',
            isFound: false,
          },
          {
            id: 'k-item-mango',
            name: 'Golden Mango',
            symbol: '🥭',
            clue: 'A sweet, fragrant Alphonso mango in the fruit basket.',
            locationHint: 'Inside the woven wicker basket toward the lower left.',
            xPercent: 24,
            yPercent: 72,
            sizeClass: 'text-5xl',
            isFound: false,
          },
        ],
        decorativeElements: [
          { id: 'dec-1', name: 'Spice Box', symbol: '🫙', xPercent: 12, yPercent: 18, sizeClass: 'text-3xl', label: 'Spices' },
          { id: 'dec-2', name: 'Window Sun', symbol: '☀️', xPercent: 86, yPercent: 14, sizeClass: 'text-4xl', label: 'Sunlight' },
          { id: 'dec-3', name: 'Clay Pot', symbol: '🏺', xPercent: 72, yPercent: 28, sizeClass: 'text-4xl', label: 'Matka' },
          { id: 'dec-4', name: 'Bread Toast', symbol: '🍞', xPercent: 52, yPercent: 76, sizeClass: 'text-3xl', label: 'Rusk' },
        ],
      },
      {
        id: 'scene-veranda',
        title: 'The Sunny Veranda & Courtyard',
        roomName: 'The Veranda Garden',
        sceneTheme: 'Fresh Blossoms & Birds',
        atmosphereDescription: 'A breeze stirs the green leaves while pleasant morning birds sing softly.',
        sceneBgClass: 'from-emerald-50/80 via-teal-50/50 to-stone-50',
        sceneAccentClass: 'border-emerald-200 text-emerald-900',
        objectsToFind: [
          {
            id: 'v-item-marigold',
            name: 'Marigold Garland',
            symbol: '🌼',
            clue: 'A string of vibrant golden and saffron blossoms.',
            locationHint: 'Draped gently along the wooden veranda railing on the right.',
            xPercent: 75,
            yPercent: 35,
            sizeClass: 'text-5xl',
            isFound: false,
          },
          {
            id: 'v-item-parrot',
            name: 'Singing Green Parrot',
            symbol: '🦜',
            clue: 'A playful green parrot with a cheerful red beak.',
            locationHint: 'Perched happily atop the flowering tree branch in the upper left.',
            xPercent: 22,
            yPercent: 20,
            sizeClass: 'text-5xl',
            isFound: false,
          },
          {
            id: 'v-item-glasses',
            name: 'Reading Glasses',
            symbol: '👓',
            clue: 'Your favorite comfortable reading spectacles.',
            locationHint: 'Lying open on the wooden side table near the center.',
            xPercent: 52,
            yPercent: 60,
            sizeClass: 'text-4xl',
            isFound: false,
          },
          {
            id: 'v-item-bell',
            name: 'Brass Pooja Bell',
            symbol: '🔔',
            clue: 'A sweet-ringing brass bell with a warm golden shine.',
            locationHint: 'Near the little marble altar shelf on the lower right.',
            xPercent: 82,
            yPercent: 74,
            sizeClass: 'text-4xl',
            isFound: false,
          },
        ],
        decorativeElements: [
          { id: 'dec-v1', name: 'Tulsi Plant', symbol: '🪴', xPercent: 18, yPercent: 68, sizeClass: 'text-5xl', label: 'Tulsi' },
          { id: 'dec-v2', name: 'Wicker Chair', symbol: '🪑', xPercent: 44, yPercent: 42, sizeClass: 'text-4xl', label: 'Armchair' },
          { id: 'dec-v3', name: 'Butterfly', symbol: '🦋', xPercent: 62, yPercent: 22, sizeClass: 'text-3xl', label: 'Butterfly' },
        ],
      },
      {
        id: 'scene-living-room',
        title: 'The Nostalgic Reading Nook',
        roomName: 'Living Room Corner',
        sceneTheme: 'Memories & Melodies',
        atmosphereDescription: 'A comfortable velvet armchair surrounded by warm books, family memories, and soothing light.',
        sceneBgClass: 'from-purple-50/80 via-rose-50/50 to-stone-50',
        sceneAccentClass: 'border-purple-200 text-purple-900',
        objectsToFind: [
          {
            id: 'lr-item-radio',
            name: 'Classic Vintage Radio',
            symbol: '📻',
            clue: 'An old-fashioned wooden dial radio for nostalgic songs.',
            locationHint: 'Resting on the wooden corner shelf on the left.',
            xPercent: 20,
            yPercent: 40,
            sizeClass: 'text-5xl',
            isFound: false,
          },
          {
            id: 'lr-item-frame',
            name: 'Family Photo Frame',
            symbol: '🖼️',
            clue: 'A framed picture of smiling children and grandchildren.',
            locationHint: 'Hanging on the warm wall above the mantelpiece.',
            xPercent: 50,
            yPercent: 22,
            sizeClass: 'text-5xl',
            isFound: false,
          },
          {
            id: 'lr-item-diya',
            name: 'Warm Pooja Diya',
            symbol: '🪔',
            clue: 'A glowing brass diya casting a soft peaceful flame.',
            locationHint: 'Placed gently on the brass tray toward the lower right.',
            xPercent: 76,
            yPercent: 68,
            sizeClass: 'text-4xl',
            isFound: false,
          },
          {
            id: 'lr-item-shawl',
            name: 'Kashmiri Shawl',
            symbol: '🧣',
            clue: 'A soft, embroidered woolen shawl to keep cozy.',
            locationHint: 'Draped over the armrest of the comfortable chair.',
            xPercent: 42,
            yPercent: 72,
            sizeClass: 'text-4xl',
            isFound: false,
          },
        ],
        decorativeElements: [
          { id: 'dec-l1', name: 'Bookshelf', symbol: '📚', xPercent: 82, yPercent: 28, sizeClass: 'text-4xl', label: 'Books' },
          { id: 'dec-l2', name: 'Lamp', symbol: '🛋️', xPercent: 48, yPercent: 50, sizeClass: 'text-5xl', label: 'Comfort' },
          { id: 'dec-l3', name: 'Incense', symbol: '🪷', xPercent: 70, yPercent: 42, sizeClass: 'text-3xl', label: 'Lotus' },
        ],
      },
    ];
  }
}

export const cognitiveService: ICognitiveService = new CognitiveServiceImpl();
