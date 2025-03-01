export type Riddle = {
  question: string;
  answer: string;
  hint: string;
  difficulty: 'easy' | 'medium' | 'hard';
};

export const allRiddles: Riddle[] = [
  
  {
    question: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
    answer: "Echo",
    hint: "Sound reflection",
    difficulty: 'easy'
  },
  {
    question: "What has keys but can't open locks?",
    answer: "Piano",
    hint: "Musical instrument",
    difficulty: 'medium'
  },
  {
    question: "The more you take, the more you leave behind. What am I?",
    answer: "Footsteps",
    hint: "Tracks on the ground",
    difficulty: 'medium'
  },
  {
    question: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?",
    answer: "Map",
    hint: "Geographical representation",
    difficulty: 'medium'
  },
  {
    question: "What has to be broken before you can use it?",
    answer: "Egg",
    hint: "Breakfast ingredient",
    difficulty: 'easy'
  },
  {
    question: "The more you remove from me, the bigger I get. What am I?",
    answer: "Hole",
    hint: "Empty space in a surface",
    difficulty: 'medium'
  },
  {
    question: "What comes once in a minute, twice in a moment, but never in a thousand years?",
    answer: "Letter M",
    hint: "Alphabet character",
    difficulty: 'medium'
  },
  {
    question: "I'm tall when I'm young, and I'm short when I'm old. What am I?",
    answer: "Candle",
    hint: "Wax light source",
    difficulty: 'easy'
  },
  {
    question: "What has a heart that doesn't beat?",
    answer: "Artichoke",
    hint: "Edible thistle",
    difficulty: 'hard'
  },
  {
    question: "I have hands, but I cannot clap. What am I?",
    answer: "Clock",
    hint: "Timekeeping device",
    difficulty: 'easy'
  },
  {
    question: "What has one eye but can't see?",
    answer: "Needle",
    hint: "Sewing tool",
    difficulty: 'medium'
  },
  {
    question: "What has an endless supply of letters but starts empty?",
    answer: "Mailbox",
    hint: "Postal container",
    difficulty: 'medium'
  },
  {
    question: "What has a thumb and four fingers but is not alive?",
    answer: "Glove",
    hint: "Hand covering",
    difficulty: 'easy'
  },
  {
    question: "What has legs but doesn't walk?",
    answer: "Table",
    hint: "Furniture piece",
    difficulty: 'easy'
  },
  {
    question: "I fly without wings. I cry without eyes. Wherever I go, darkness follows me. What am I?",
    answer: "Cloud",
    hint: "Weather formation",
    difficulty: 'medium'
  },
  {
    question: "I have teeth but cannot bite. What am I?",
    answer: "Comb",
    hint: "Hair styling tool",
    difficulty: 'easy'
  },
  {
    question: "What can travel around the world while staying in the same place?",
    answer: "Stamp",
    hint: "Postal marking",
    difficulty: 'medium'
  },
  {
    question: "What gets wetter the more it dries?",
    answer: "Towel",
    hint: "Bathroom essential",
    difficulty: 'easy'
  },
  {
    question: "I have branches but no fruit, trunk, or leaves. What am I?",
    answer: "Bank",
    hint: "Financial institution",
    difficulty: 'medium'
  },
  {
    question: "I shave every day, but my beard stays the same. What am I?",
    answer: "Barber",
    hint: "Haircare professional",
    difficulty: 'medium'
  },
  {
    question: "What has a head and a tail but no body?",
    answer: "Coin",
    hint: "Monetary item",
    difficulty: 'easy'
  },
  {
    question: "I'm not alive, but I can grow. I don't have lungs, but I need air. What am I?",
    answer: "Fire",
    hint: "Combustion reaction",
    difficulty: 'medium'
  },
  {
    question: "What has a neck but no head?",
    answer: "Bottle",
    hint: "Liquid container",
    difficulty: 'easy'
  },
  {
    question: "I'm light as a feather, yet the strongest person can't hold me for long. What am I?",
    answer: "Breath",
    hint: "Vital function",
    difficulty: 'hard'
  },
  {
    question: "What can you catch but not throw?",
    answer: "Cold",
    hint: "Common illness",
    difficulty: 'easy'
  },
  {
    question: "What goes up but never comes down?",
    answer: "Age",
    hint: "Time's effect",
    difficulty: 'medium'
  },
  {
    question: "What is full of holes but still holds water?",
    answer: "Sponge",
    hint: "Cleaning tool",
    difficulty: 'easy'
  },
  {
    question: "What can run but never walks, has a mouth but never talks?",
    answer: "River",
    hint: "Natural watercourse",
    difficulty: 'medium'
  },
  {
    question: "What has words but never speaks?",
    answer: "Book",
    hint: "Reading material",
    difficulty: 'easy'
  },
  {
    question: "What is always in front of you but can't be seen?",
    answer: "Future",
    hint: "Time yet to come",
    difficulty: 'hard'
  },
  {
    question: "What belongs to you but others use it more than you do?",
    answer: "Name",
    hint: "Personal identifier",
    difficulty: 'medium'
  },
  {
    question: "What number becomes smaller when you turn it upside down?",
    answer: "9 (becomes 6)",
    hint: "Numerical symmetry",
    difficulty: 'easy'
  },
  {
    question: "I am an odd number. Take away a letter and I become even. What number am I?",
    answer: "Seven (remove 's' to get 'even')",
    hint: "Wordplay with numbers",
    difficulty: 'medium'
  },
  {
    question: "If two's company and three's a crowd, what are four and five?",
    answer: "Nine (4 + 5 = 9)",
    hint: "Simple addition",
    difficulty: 'easy'
  },
  {
    question: "What is the smallest whole number that is equal to seven times the sum of its digits?",
    answer: "21 (2+1=3, 7×3=21)",
    hint: "Digit sum multiplication",
    difficulty: 'hard'
  },
  {
    question: "What has a face and two hands but no arms or legs?",
    answer: "Clock",
    hint: "Timekeeping device",
    difficulty: 'easy'
  },
  {
    question: "What has a bottom at the top?",
    answer: "Leg",
    hint: "Part of the body",
    difficulty: 'easy'
  },
  {
    question: "What has a head, a tail, is brown, and has no legs?",
    answer: "Penny",
    hint: "A coin",
    difficulty: 'easy'
  },
  {
    question: "What has a ring but no finger?",
    answer: "Telephone",
    hint: "Communication device",
    difficulty: 'medium'
  },
  {
    question: "What has a tongue but cannot talk?",
    answer: "Shoe",
    hint: "Worn on feet",
    difficulty: 'easy'
  },
  {
    question: "What has a spine but no bones?",
    answer: "Book",
    hint: "Reading material",
    difficulty: 'easy'
  },
  {
    question: "What has a heart but no other organs?",
    answer: "Deck of cards",
    hint: "Used in games",
    difficulty: 'medium'
  },
  {
    question: "What has a foot but no legs?",
    answer: "Snail",
    hint: "A small creature",
    difficulty: 'easy'
  },
  {
    question: "What has a bark but no bite?",
    answer: "Tree",
    hint: "Found in forests",
    difficulty: 'easy'
  },
    {
      question: "The more you feed me, the bigger I get. But if you give me water, I die. What am I?",
      answer: "Fire",
      hint: "Burning element",
      difficulty: "medium"
    },
    {
      question: "I go up but never come down, except when I pop. What am I?",
      answer: "Balloon",
      hint: "Filled with air",
      difficulty: "easy"
    },
    {
      question: "I have four legs in the morning, two legs at noon, and three legs in the evening. What am I?",
      answer: "Human (crawling as a baby, walking as an adult, using a cane when old)",
      hint: "Stages of life",
      difficulty: "hard"
    },
    {
      question: "I have no life, but I can die. What am I?",
      answer: "Battery",
      hint: "Powers electronic devices",
      difficulty: "medium"
    },
    {
      question: "I am heavy forward but not backward. What am I?",
      answer: "Ton (spelled backward is 'not')",
      hint: "Measurement of weight",
      difficulty: "medium"
    },
    {
      question: "If you drop me, I'm sure to crack, but give me a smile, and I'll smile back. What am I?",
      answer: "Mirror",
      hint: "Reflects images",
      difficulty: "easy"
    },
    {
      question: "I am taken from a mine and shut inside a wooden case, from which I am never released, and yet I am used by almost every person. What am I?",
      answer: "Pencil lead",
      hint: "Writing tool",
      difficulty: "hard"
    },
    {
      question: "You throw away my outside and cook my inside. Then you eat my outside and throw away my inside. What am I?",
      answer: "Corn on the cob",
      hint: "A vegetable",
      difficulty: "medium"
    },
    {
      question: "I can fill a room but take up no space. What am I?",
      answer: "Light",
      hint: "Illuminates darkness",
      difficulty: "easy"
    },
    {
      question: "I have a head, a tail, but no body. What am I?",
      answer: "Coin",
      hint: "Money",
      difficulty: "easy"
    },
    {
      question: "I make two people out of one. What am I?",
      answer: "Mirror",
      hint: "Reflection",
      difficulty: "easy"
    },
    {
      question: "What runs around a house but never moves?",
      answer: "Fence",
      hint: "Boundary",
      difficulty: "easy"
    },
    {
      question: "I have no wings, but I can fly. I have no eyes, but I can cry. What am I?",
      answer: "Cloud",
      hint: "Weather phenomenon",
      difficulty: "medium"
    },
    {
      question: "The more of me you have, the less you see. What am I?",
      answer: "Darkness",
      hint: "Opposite of light",
      difficulty: "medium"
    },
    {
      question: "I have keys but open no locks. I have space but no room. You can enter, but you can't go outside. What am I?",
      answer: "Keyboard",
      hint: "Used for typing",
      difficulty: "medium"
    },
    {
      question: "I am always running but never move. What am I?",
      answer: "Time",
      hint: "Keeps moving forward",
      difficulty: "hard"
    },
    {
      question: "What has a mouth but never eats, and a bed but never sleeps?",
      answer: "River",
      hint: "A flowing water body",
      difficulty: "medium"
    },
    {
      question: "I have ears but cannot hear. What am I?",
      answer: "Corn",
      hint: "A type of grain",
      difficulty: "easy"
    },
    {
      question: "I have eyes but cannot see. I live underground. What am I?",
      answer: "Potato",
      hint: "A root vegetable",
      difficulty: "medium"
    },
    {
      question: "I go through towns and over hills but never move. What am I?",
      answer: "Road",
      hint: "Used for travel",
      difficulty: "easy"
    },
    {
      question: "The more you use me, the thinner I become. What am I?",
      answer: "Pencil",
      hint: "Used for writing",
      difficulty: "medium"
    },
    {
      question: "What gets sharper the more you use it?",
      answer: "Brain",
      hint: "Thinking organ",
      difficulty: "hard"
    },
    {
      question: "What can go up a chimney down but not down a chimney up?",
      answer: "Umbrella",
      hint: "Used for rain",
      difficulty: "hard"
    },
    {
      question: "What can be touched but can’t be seen?",
      answer: "Heartfelt emotions",
      hint: "A feeling",
      difficulty: "medium"
    },
    {
      question: "What comes at night without being called and is lost in the day without being stolen?",
      answer: "Stars",
      hint: "Shines in the sky",
      difficulty: "easy"
    },
    {
      question: "I can be long or short. I can be grown or bought. I can be painted or left bare. What am I?",
      answer: "Nail",
      hint: "On fingers or used in construction",
      difficulty: "medium"
    },
    {
      question: "What has an eye but can't see?",
      answer: "Needle",
      hint: "Used for sewing",
      difficulty: "medium"
    },
    {
      question: "What can be broken but never held?",
      answer: "Promise",
      hint: "A commitment",
      difficulty: "medium"
    },
    {
      question: "What comes once in a minute, twice in a moment, but never in a thousand years?",
      answer: "Letter 'M'",
      hint: "Think of the alphabet",
      difficulty: "medium"
    },
    {
      question: "What is so fragile that saying its name breaks it?",
      answer: "Silence",
      hint: "A quiet state",
      difficulty: "hard"
    },
    {
      question: "What has a face but no eyes?",
      answer: "Clock",
      hint: "Tells time",
      difficulty: "easy"
    },
    {
      question: "The more you share me, the less you have. What am I?",
      answer: "Secret",
      hint: "Kept hidden",
      difficulty: "medium"
    },
      {
        question: "I have no wings, but I can soar. I have no lungs, but I need air. What am I?",
        answer: "Kite",
        hint: "Flies in the sky",
        difficulty: "easy"
      },
      {
        question: "I get sharper the more you use me. What am I?",
        answer: "Pencil",
        hint: "Used for writing",
        difficulty: "medium"
      },
      {
        question: "The more I dry, the wetter I become. What am I?",
        answer: "Towel",
        hint: "Used after a shower",
        difficulty: "easy"
      },
      {
        question: "What has an endless supply of letters but starts empty?",
        answer: "Mailbox",
        hint: "Holds mail",
        difficulty: "medium"
      },
      {
        question: "I can be short, I can be tall. I can be hidden, or I can stand tall. What am I?",
        answer: "Shadow",
        hint: "Changes with the sun",
        difficulty: "medium"
      },
      {
        question: "I run but never walk, have a bed but never sleep. What am I?",
        answer: "River",
        hint: "A flowing body of water",
        difficulty: "medium"
      },
      {
        question: "I can be caught but never thrown. What am I?",
        answer: "Cold",
        hint: "An illness",
        difficulty: "easy"
      },
      {
        question: "I have one eye but cannot see. What am I?",
        answer: "Needle",
        hint: "Used for sewing",
        difficulty: "easy"
      },
      {
        question: "I go up but never come down. What am I?",
        answer: "Age",
        hint: "Effect of time",
        difficulty: "medium"
      },
      {
        question: "What comes in different sizes and is always right?",
        answer: "Angle",
        hint: "A mathematical concept",
        difficulty: "medium"
      },
      {
        question: "What has ears but cannot hear?",
        answer: "Corn",
        hint: "A farm crop",
        difficulty: "easy"
      },
      {
        question: "What starts with an E, ends with an E, but only has one letter?",
        answer: "Envelope",
        hint: "Used for mailing",
        difficulty: "medium"
      },
      {
        question: "I am always on the dinner table, but you never eat me. What am I?",
        answer: "Plate",
        hint: "Holds food",
        difficulty: "easy"
      },
      {
        question: "I can be cracked, played, told, and made. What am I?",
        answer: "Joke",
        hint: "Something funny",
        difficulty: "easy"
      },
      {
        question: "What can fill a room but takes up no space?",
        answer: "Light",
        hint: "Illuminates darkness",
        difficulty: "easy"
      },
      {
        question: "What has a thumb and four fingers but is not alive?",
        answer: "Glove",
        hint: "Worn on hands",
        difficulty: "easy"
      },
      {
        question: "I can be cracked and opened, yet I am not an egg. What am I?",
        answer: "Code",
        hint: "Used in puzzles or programming",
        difficulty: "medium"
      },
      {
        question: "I get shorter the more you use me. What am I?",
        answer: "Pencil",
        hint: "Used for writing",
        difficulty: "medium"
      },
      {
        question: "I have a spine but no bones. What am I?",
        answer: "Book",
        hint: "Used for reading",
        difficulty: "easy"
      },
      {
        question: "What has roots but never grows?",
        answer: "Mountain",
        hint: "Tall land formation",
        difficulty: "medium"
      },
      {
        question: "What has a head, a tail, is brown, and has no legs?",
        answer: "Penny",
        hint: "A type of coin",
        difficulty: "easy"
      },
      {
        question: "The more you pull me, the shorter I become. What am I?",
        answer: "Candle",
        hint: "Melts as it burns",
        difficulty: "easy"
      },
      {
        question: "I start with T, end with T, and have T in me. What am I?",
        answer: "Teapot",
        hint: "Holds a hot beverage",
        difficulty: "medium"
      },
      {
        question: "I have a face, but no eyes, nose, or mouth. What am I?",
        answer: "Clock",
        hint: "Shows time",
        difficulty: "easy"
      },
      {
        question: "I have branches but no leaves, trunk, or fruit. What am I?",
        answer: "Bank",
        hint: "Handles money",
        difficulty: "medium"
      },
      {
        question: "I have four legs but never run. What am I?",
        answer: "Table",
        hint: "Furniture",
        difficulty: "easy"
      },
      {
        question: "What goes up when rain comes down?",
        answer: "Umbrella",
        hint: "Used to stay dry",
        difficulty: "easy"
      },
      {
        question: "What has a bed but never sleeps?",
        answer: "River",
        hint: "Flows with water",
        difficulty: "medium"
      },
      {
        question: "What has a mouth but cannot eat?",
        answer: "Jar",
        hint: "Used for storing things",
        difficulty: "easy"
      },
      {
        question: "What is full of holes but still holds water?",
        answer: "Sponge",
        hint: "Used for cleaning",
        difficulty: "easy"
      },
      {
        question: "I am always running but never move. What am I?",
        answer: "Clock",
        hint: "Measures time",
        difficulty: "easy"
      },
      {
        question: "What has a neck but no head and wears a cap?",
        answer: "Bottle",
        hint: "Holds liquid",
        difficulty: "easy"
      },
  
];

export const metadata = {
  title: "Math Puzzles | Mathsfun",
  description: "Interactive math puzzles for kids",
  openGraph: {
    images: '/og-image.png',
  },
};