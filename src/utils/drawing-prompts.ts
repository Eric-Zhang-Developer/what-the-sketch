import { PromptCategory } from "./types";

type Prompt = { name: string; category: PromptCategory };

export const DRAWING_PROMPTS: Prompt[] = [
  // ===================================
  // -------- Animals (50) --------
  // ===================================

  // Common Pets & Domestic
  { name: "Cat", category: "Animals" },
  { name: "Dog", category: "Animals" },
  { name: "Fish", category: "Animals" },
  { name: "Bird", category: "Animals" },
  { name: "Mouse", category: "Animals" },
  { name: "Rabbit", category: "Animals" },
  { name: "Turtle", category: "Animals" },

  // Farm Animals
  { name: "Horse", category: "Animals" },
  { name: "Pig", category: "Animals" },
  { name: "Cow", category: "Animals" },
  { name: "Sheep", category: "Animals" },
  { name: "Chicken", category: "Animals" },
  { name: "Duck", category: "Animals" },
  { name: "Goat", category: "Animals" },

  // Wild & Forest
  { name: "Bear", category: "Animals" },
  { name: "Tiger", category: "Animals" },
  { name: "Lion", category: "Animals" },
  { name: "Fox", category: "Animals" },
  { name: "Wolf", category: "Animals" },
  { name: "Deer", category: "Animals" },
  { name: "Bat", category: "Animals" },
  { name: "Owl", category: "Animals" },
  { name: "Squirrel", category: "Animals" },
  { name: "Monkey", category: "Animals" },

  // Jungle, Safari & Exotic
  { name: "Elephant", category: "Animals" },
  { name: "Giraffe", category: "Animals" },
  { name: "Zebra", category: "Animals" },
  { name: "Panda", category: "Animals" },
  { name: "Kangaroo", category: "Animals" },
  { name: "Hippo", category: "Animals" },
  { name: "Rhino", category: "Animals" },
  { name: "Crocodile", category: "Animals" },
  { name: "Camel", category: "Animals" },
  { name: "Koala", category: "Animals" },
  { name: "Flamingo", category: "Animals" },
  { name: "Gorilla", category: "Animals" },
  { name: "Penguin", category: "Animals" },
  { name: "Snake", category: "Animals" },

  // Sea & Marine
  { name: "Whale", category: "Animals" },
  { name: "Shark", category: "Animals" },
  { name: "Dolphin", category: "Animals" },
  { name: "Octopus", category: "Animals" },
  { name: "Crab", category: "Animals" },
  { name: "Jellyfish", category: "Animals" },
  { name: "Starfish", category: "Animals" },

  // Insects, Amphibians & Small
  { name: "Butterfly", category: "Animals" },
  { name: "Bee", category: "Animals" },
  { name: "Spider", category: "Animals" },
  { name: "Snail", category: "Animals" },
  { name: "Frog", category: "Animals" },

  // ===================================
  // -------- Food & Drink (50) --------
  // ===================================

  // Fruits & Vegetables
  { name: "Apple", category: "Food" },
  { name: "Banana", category: "Food" },
  { name: "Grapes", category: "Food" },
  { name: "Watermelon", category: "Food" },
  { name: "Strawberry", category: "Food" },
  { name: "Pineapple", category: "Food" },
  { name: "Cherry", category: "Food" },
  { name: "Lemon", category: "Food" },
  { name: "Pear", category: "Food" },
  { name: "Peach", category: "Food" },
  { name: "Carrot", category: "Food" },
  { name: "Corn", category: "Food" },
  { name: "Mushroom", category: "Food" },
  { name: "Pumpkin", category: "Food" },

  // Fast Food & Savory
  { name: "Pizza", category: "Food" },
  { name: "Burger", category: "Food" },
  { name: "Hot Dog", category: "Food" },
  { name: "Taco", category: "Food" },
  { name: "French Fries", category: "Food" },
  { name: "Sandwich", category: "Food" },
  { name: "Sushi", category: "Food" },
  { name: "Spaghetti", category: "Food" },
  { name: "Chicken Leg", category: "Food" },
  { name: "Pretzel", category: "Food" },
  { name: "Steak", category: "Food" },

  // Sweets, Desserts & Baked Goods
  { name: "Ice Cream Cone", category: "Food" },
  { name: "Donut", category: "Food" },
  { name: "Cookie", category: "Food" },
  { name: "Cupcake", category: "Food" },
  { name: "Cake", category: "Food" },
  { name: "Chocolate Bar", category: "Food" },
  { name: "Lollipop", category: "Food" },
  { name: "Pie", category: "Food" },
  { name: "Pancake", category: "Food" },
  { name: "Waffle", category: "Food" },
  { name: "Croissant", category: "Food" },
  { name: "Muffin", category: "Food" },

  // Drinks
  { name: "Coffee Cup", category: "Food" },
  { name: "Soda Can", category: "Food" },
  { name: "Milk Carton", category: "Food" },
  { name: "Juice Box", category: "Food" },
  { name: "Tea Cup", category: "Food" },
  { name: "Water Bottle", category: "Food" },

  // Staples & Snacks
  { name: "Egg", category: "Food" },
  { name: "Bread", category: "Food" },
  { name: "Cheese", category: "Food" },
  { name: "Toast", category: "Food" },
  { name: "Butter", category: "Food" },
  { name: "Popcorn", category: "Food" },
  { name: "Bacon", category: "Food" },

  // ===================================
  // -------- Objects (45) --------
  // ===================================

  // Household Objects
  { name: "House", category: "Objects" },
  { name: "Chair", category: "Objects" },
  { name: "Table", category: "Objects" },
  { name: "Key", category: "Objects" },
  { name: "Bed", category: "Objects" },
  { name: "Lamp", category: "Objects" },
  { name: "Door", category: "Objects" },
  { name: "Book", category: "Objects" },
  { name: "Scissors", category: "Objects" },
  { name: "Clock", category: "Objects" },
  { name: "Spoon", category: "Objects" },
  { name: "Fork", category: "Objects" },
  { name: "Television", category: "Objects" },
  { name: "Sofa", category: "Objects" },
  { name: "Lightbulb", category: "Objects" },

  // Transportation
  { name: "Car", category: "Objects" },
  { name: "Bicycle", category: "Objects" },
  { name: "Boat", category: "Objects" },
  { name: "Airplane", category: "Objects" },
  { name: "Train", category: "Objects" },
  { name: "Bus", category: "Objects" },
  { name: "Helicopter", category: "Objects" },
  { name: "Rocket", category: "Objects" },
  { name: "Motorcycle", category: "Objects" },
  { name: "Sailboat", category: "Objects" },

  // Clothing
  { name: "Hat", category: "Objects" },
  { name: "T-shirt", category: "Objects" },
  { name: "Sock", category: "Objects" },
  { name: "Shoe", category: "Objects" },
  { name: "Pants", category: "Objects" },
  { name: "Dress", category: "Objects" },
  { name: "Glasses", category: "Objects" },
  { name: "Watch", category: "Objects" },
  { name: "Scarf", category: "Objects" },
  { name: "Glove", category: "Objects" },

  // Miscellaneous
  { name: "Heart", category: "Objects" },
  { name: "Smiley Face", category: "Objects" },
  { name: "Guitar", category: "Objects" },
  { name: "Computer", category: "Objects" },
  { name: "Bridge", category: "Objects" },
  { name: "Sword", category: "Objects" },
  { name: "Shield", category: "Objects" },
  { name: "Crown", category: "Objects" },
  { name: "Money Bag", category: "Objects" },
  { name: "Ghost", category: "Objects" },

  // ===================================
  // -------- Nature (30) --------
  // ===================================

  { name: "Tree", category: "Nature" },
  { name: "Sun", category: "Nature" },
  { name: "Moon", category: "Nature" },
  { name: "Star", category: "Nature" },
  { name: "Cloud", category: "Nature" },
  { name: "Flower", category: "Nature" },
  { name: "Mountain", category: "Nature" },
  { name: "Rainbow", category: "Nature" },
  { name: "Lightning Bolt", category: "Nature" },
  { name: "Leaf", category: "Nature" },
  { name: "Volcano", category: "Nature" },
  { name: "River", category: "Nature" },
  { name: "Snowflake", category: "Nature" },
  { name: "Mushroom", category: "Nature" },
  { name: "Wave", category: "Nature" },
  { name: "Raindrop", category: "Nature" },
  { name: "Fire", category: "Nature" },
  { name: "Cactus", category: "Nature" },
  { name: "Grass", category: "Nature" },
  { name: "Rock", category: "Nature" },
  { name: "Ocean", category: "Nature" },
  { name: "Pond", category: "Nature" },
  { name: "Sand", category: "Nature" },
  { name: "Acorn", category: "Nature" },
  { name: "Pine Cone", category: "Nature" },
  { name: "Crystal", category: "Nature" },
  { name: "Palm Tree", category: "Nature" },
  { name: "Tulip", category: "Nature" },
  { name: "Coral", category: "Nature" },
  { name: "Feather", category: "Nature" },

  // ===================================
  // -------- Geography (50) --------
  // ===================================

  // Landmarks
  { name: "Eiffel Tower", category: "Geography" },
  { name: "Statue of Liberty", category: "Geography" },
  { name: "Pyramids of Giza", category: "Geography" },
  { name: "Big Ben", category: "Geography" },
  { name: "Leaning Tower of Pisa", category: "Geography" },
  { name: "Great Wall of China", category: "Geography" },
  { name: "Colosseum", category: "Geography" },
  { name: "Sydney Opera House", category: "Geography" },
  { name: "Mount Everest", category: "Geography" },
  { name: "Golden Gate Bridge", category: "Geography" },
  { name: "Hollywood Sign", category: "Geography" },
  { name: "The White House", category: "Geography" },
  { name: "Stonehenge", category: "Geography" },
  { name: "Empire State Building", category: "Geography" },
  { name: "Mount Rushmore", category: "Geography" },
  { name: "Christ the Redeemer", category: "Geography" },
  { name: "Sphinx", category: "Geography" },
  { name: "Easter Island Head", category: "Geography" },

  // Countries and States
  { name: "Italy", category: "Geography" },
  { name: "United States", category: "Geography" },
  { name: "Africa", category: "Geography" },
  { name: "Australia", category: "Geography" },
  { name: "South America", category: "Geography" },
  { name: "Texas", category: "Geography" },
  { name: "Florida", category: "Geography" },
  { name: "Japan", category: "Geography" },
  { name: "Russia", category: "Geography" },
  { name: "Germany", category: "Geography" },
  { name: "China", category: "Geography" },
  { name: "United Kingdom", category: "Geography" },
  { name: "California", category: "Geography" },

  // General Geography & Nature
  { name: "Globe", category: "Geography" },
  { name: "Volcano", category: "Geography" },
  { name: "Desert", category: "Geography" },
  { name: "Island", category: "Geography" },
  { name: "Waterfall", category: "Geography" },
  { name: "Jungle", category: "Geography" },
  { name: "Iceberg", category: "Geography" },
  { name: "Canyon", category: "Geography" },
  { name: "Cave", category: "Geography" },
  { name: "Oasis", category: "Geography" },
  { name: "Swamp", category: "Geography" },
  { name: "Tornado", category: "Geography" },
  { name: "Earthquake", category: "Geography" },
  { name: "Tsunami", category: "Geography" },

  // Tools & Concepts
  { name: "Compass", category: "Geography" },
  { name: "Treasure Map", category: "Geography" },
  { name: "Flag", category: "Geography" },
  { name: "Passport", category: "Geography" },
  { name: "North Pole", category: "Geography" },
];
