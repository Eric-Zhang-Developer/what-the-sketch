import { PromptCategory } from "./types";

type Prompt = { name: string; category: PromptCategory };

export const DRAWING_PROMPTS: Prompt[] = [
  // ===================================
  // -------- Animals (50) --------
  // ===================================

  // Common Pets & Domestic
  { name: "Cat", category: PromptCategory.Animals },
  { name: "Dog", category: PromptCategory.Animals },
  { name: "Fish", category: PromptCategory.Animals },
  { name: "Bird", category: PromptCategory.Animals },
  { name: "Mouse", category: PromptCategory.Animals },
  { name: "Rabbit", category: PromptCategory.Animals },
  { name: "Turtle", category: PromptCategory.Animals },

  // Farm Animals
  { name: "Horse", category: PromptCategory.Animals },
  { name: "Pig", category: PromptCategory.Animals },
  { name: "Cow", category: PromptCategory.Animals },
  { name: "Sheep", category: PromptCategory.Animals },
  { name: "Chicken", category: PromptCategory.Animals },
  { name: "Duck", category: PromptCategory.Animals },
  { name: "Goat", category: PromptCategory.Animals },

  // Wild & Forest
  { name: "Bear", category: PromptCategory.Animals },
  { name: "Tiger", category: PromptCategory.Animals },
  { name: "Lion", category: PromptCategory.Animals },
  { name: "Fox", category: PromptCategory.Animals },
  { name: "Wolf", category: PromptCategory.Animals },
  { name: "Deer", category: PromptCategory.Animals },
  { name: "Bat", category: PromptCategory.Animals },
  { name: "Owl", category: PromptCategory.Animals },
  { name: "Squirrel", category: PromptCategory.Animals },
  { name: "Monkey", category: PromptCategory.Animals },

  // Jungle, Safari & Exotic
  { name: "Elephant", category: PromptCategory.Animals },
  { name: "Giraffe", category: PromptCategory.Animals },
  { name: "Zebra", category: PromptCategory.Animals },
  { name: "Panda", category: PromptCategory.Animals },
  { name: "Kangaroo", category: PromptCategory.Animals },
  { name: "Hippo", category: PromptCategory.Animals },
  { name: "Rhino", category: PromptCategory.Animals },
  { name: "Crocodile", category: PromptCategory.Animals },
  { name: "Camel", category: PromptCategory.Animals },
  { name: "Koala", category: PromptCategory.Animals },
  { name: "Flamingo", category: PromptCategory.Animals },
  { name: "Gorilla", category: PromptCategory.Animals },
  { name: "Penguin", category: PromptCategory.Animals },
  { name: "Snake", category: PromptCategory.Animals },

  // Sea & Marine
  { name: "Whale", category: PromptCategory.Animals },
  { name: "Shark", category: PromptCategory.Animals },
  { name: "Dolphin", category: PromptCategory.Animals },
  { name: "Octopus", category: PromptCategory.Animals },
  { name: "Crab", category: PromptCategory.Animals },
  { name: "Jellyfish", category: PromptCategory.Animals },
  { name: "Starfish", category: PromptCategory.Animals },

  // Insects, Amphibians & Small
  { name: "Butterfly", category: PromptCategory.Animals },
  { name: "Bee", category: PromptCategory.Animals },
  { name: "Spider", category: PromptCategory.Animals },
  { name: "Snail", category: PromptCategory.Animals },
  { name: "Frog", category: PromptCategory.Animals },

  // ===================================
  // -------- Food & Drink (50) --------
  // ===================================

  // Fruits & Vegetables
  { name: "Apple", category: PromptCategory.Food },
  { name: "Banana", category: PromptCategory.Food },
  { name: "Grapes", category: PromptCategory.Food },
  { name: "Watermelon", category: PromptCategory.Food },
  { name: "Strawberry", category: PromptCategory.Food },
  { name: "Pineapple", category: PromptCategory.Food },
  { name: "Cherry", category: PromptCategory.Food },
  { name: "Lemon", category: PromptCategory.Food },
  { name: "Pear", category: PromptCategory.Food },
  { name: "Peach", category: PromptCategory.Food },
  { name: "Carrot", category: PromptCategory.Food },
  { name: "Corn", category: PromptCategory.Food },
  { name: "Mushroom", category: PromptCategory.Food },
  { name: "Pumpkin", category: PromptCategory.Food },

  // Fast Food & Savory
  { name: "Pizza", category: PromptCategory.Food },
  { name: "Burger", category: PromptCategory.Food },
  { name: "Hot Dog", category: PromptCategory.Food },
  { name: "Taco", category: PromptCategory.Food },
  { name: "French Fries", category: PromptCategory.Food },
  { name: "Sandwich", category: PromptCategory.Food },
  { name: "Sushi", category: PromptCategory.Food },
  { name: "Spaghetti", category: PromptCategory.Food },
  { name: "Chicken Leg", category: PromptCategory.Food },
  { name: "Pretzel", category: PromptCategory.Food },
  { name: "Steak", category: PromptCategory.Food },

  // Sweets, Desserts & Baked Goods
  { name: "Ice Cream Cone", category: PromptCategory.Food },
  { name: "Donut", category: PromptCategory.Food },
  { name: "Cookie", category: PromptCategory.Food },
  { name: "Cupcake", category: PromptCategory.Food },
  { name: "Cake", category: PromptCategory.Food },
  { name: "Chocolate Bar", category: PromptCategory.Food },
  { name: "Lollipop", category: PromptCategory.Food },
  { name: "Pie", category: PromptCategory.Food },
  { name: "Pancake", category: PromptCategory.Food },
  { name: "Waffle", category: PromptCategory.Food },
  { name: "Croissant", category: PromptCategory.Food },
  { name: "Muffin", category: PromptCategory.Food },

  // Drinks
  { name: "Coffee Cup", category: PromptCategory.Food },
  { name: "Soda Can", category: PromptCategory.Food },
  { name: "Milk Carton", category: PromptCategory.Food },
  { name: "Juice Box", category: PromptCategory.Food },
  { name: "Tea Cup", category: PromptCategory.Food },
  { name: "Water Bottle", category: PromptCategory.Food },

  // Staples & Snacks
  { name: "Egg", category: PromptCategory.Food },
  { name: "Bread", category: PromptCategory.Food },
  { name: "Cheese", category: PromptCategory.Food },
  { name: "Toast", category: PromptCategory.Food },
  { name: "Butter", category: PromptCategory.Food },
  { name: "Popcorn", category: PromptCategory.Food },
  { name: "Bacon", category: PromptCategory.Food },

  // ===================================
  // -------- Objects (45) --------
  // ===================================

  // Household Objects
  { name: "House", category: PromptCategory.Objects },
  { name: "Chair", category: PromptCategory.Objects },
  { name: "Table", category: PromptCategory.Objects },
  { name: "Key", category: PromptCategory.Objects },
  { name: "Bed", category: PromptCategory.Objects },
  { name: "Lamp", category: PromptCategory.Objects },
  { name: "Door", category: PromptCategory.Objects },
  { name: "Book", category: PromptCategory.Objects },
  { name: "Scissors", category: PromptCategory.Objects },
  { name: "Clock", category: PromptCategory.Objects },
  { name: "Spoon", category: PromptCategory.Objects },
  { name: "Fork", category: PromptCategory.Objects },
  { name: "Television", category: PromptCategory.Objects },
  { name: "Sofa", category: PromptCategory.Objects },
  { name: "Lightbulb", category: PromptCategory.Objects },

  // Transportation
  { name: "Car", category: PromptCategory.Objects },
  { name: "Bicycle", category: PromptCategory.Objects },
  { name: "Boat", category: PromptCategory.Objects },
  { name: "Airplane", category: PromptCategory.Objects },
  { name: "Train", category: PromptCategory.Objects },
  { name: "Bus", category: PromptCategory.Objects },
  { name: "Helicopter", category: PromptCategory.Objects },
  { name: "Rocket", category: PromptCategory.Objects },
  { name: "Motorcycle", category: PromptCategory.Objects },
  { name: "Sailboat", category: PromptCategory.Objects },

  // Clothing
  { name: "Hat", category: PromptCategory.Objects },
  { name: "T-shirt", category: PromptCategory.Objects },
  { name: "Sock", category: PromptCategory.Objects },
  { name: "Shoe", category: PromptCategory.Objects },
  { name: "Pants", category: PromptCategory.Objects },
  { name: "Dress", category: PromptCategory.Objects },
  { name: "Glasses", category: PromptCategory.Objects },
  { name: "Watch", category: PromptCategory.Objects },
  { name: "Scarf", category: PromptCategory.Objects },
  { name: "Glove", category: PromptCategory.Objects },

  // Miscellaneous
  { name: "Heart", category: PromptCategory.Objects },
  { name: "Smiley Face", category: PromptCategory.Objects },
  { name: "Guitar", category: PromptCategory.Objects },
  { name: "Computer", category: PromptCategory.Objects },
  { name: "Bridge", category: PromptCategory.Objects },
  { name: "Sword", category: PromptCategory.Objects },
  { name: "Shield", category: PromptCategory.Objects },
  { name: "Crown", category: PromptCategory.Objects },
  { name: "Money Bag", category: PromptCategory.Objects },
  { name: "Ghost", category: PromptCategory.Objects },

  // ===================================
  // -------- Nature (30) --------
  // ===================================

  { name: "Tree", category: PromptCategory.Nature },
  { name: "Sun", category: PromptCategory.Nature },
  { name: "Moon", category: PromptCategory.Nature },
  { name: "Star", category: PromptCategory.Nature },
  { name: "Cloud", category: PromptCategory.Nature },
  { name: "Flower", category: PromptCategory.Nature },
  { name: "Mountain", category: PromptCategory.Nature },
  { name: "Rainbow", category: PromptCategory.Nature },
  { name: "Lightning Bolt", category: PromptCategory.Nature },
  { name: "Leaf", category: PromptCategory.Nature },
  { name: "Volcano", category: PromptCategory.Nature },
  { name: "River", category: PromptCategory.Nature },
  { name: "Snowflake", category: PromptCategory.Nature },
  { name: "Mushroom", category: PromptCategory.Nature },
  { name: "Wave", category: PromptCategory.Nature },
  { name: "Raindrop", category: PromptCategory.Nature },
  { name: "Fire", category: PromptCategory.Nature },
  { name: "Cactus", category: PromptCategory.Nature },
  { name: "Grass", category: PromptCategory.Nature },
  { name: "Rock", category: PromptCategory.Nature },
  { name: "Ocean", category: PromptCategory.Nature },
  { name: "Pond", category: PromptCategory.Nature },
  { name: "Sand", category: PromptCategory.Nature },
  { name: "Acorn", category: PromptCategory.Nature },
  { name: "Pine Cone", category: PromptCategory.Nature },
  { name: "Crystal", category: PromptCategory.Nature },
  { name: "Palm Tree", category: PromptCategory.Nature },
  { name: "Tulip", category: PromptCategory.Nature },
  { name: "Coral", category: PromptCategory.Nature },
  { name: "Feather", category: PromptCategory.Nature },

  // ===================================
  // -------- Geography (50) --------
  // ===================================

  // Landmarks
  { name: "Eiffel Tower", category: PromptCategory.Geography },
  { name: "Statue of Liberty", category: PromptCategory.Geography },
  { name: "Pyramids of Giza", category: PromptCategory.Geography },
  { name: "Big Ben", category: PromptCategory.Geography },
  { name: "Leaning Tower of Pisa", category: PromptCategory.Geography },
  { name: "Great Wall of China", category: PromptCategory.Geography },
  { name: "Colosseum", category: PromptCategory.Geography },
  { name: "Sydney Opera House", category: PromptCategory.Geography },
  { name: "Mount Everest", category: PromptCategory.Geography },
  { name: "Golden Gate Bridge", category: PromptCategory.Geography },
  { name: "Hollywood Sign", category: PromptCategory.Geography },
  { name: "The White House", category: PromptCategory.Geography },
  { name: "Stonehenge", category: PromptCategory.Geography },
  { name: "Empire State Building", category: PromptCategory.Geography },
  { name: "Mount Rushmore", category: PromptCategory.Geography },
  { name: "Christ the Redeemer", category: PromptCategory.Geography },
  { name: "Sphinx", category: PromptCategory.Geography },
  { name: "Easter Island Head", category: PromptCategory.Geography },

  // Countries and States
  { name: "Italy", category: PromptCategory.Geography },
  { name: "United States", category: PromptCategory.Geography },
  { name: "Africa", category: PromptCategory.Geography },
  { name: "Australia", category: PromptCategory.Geography },
  { name: "South America", category: PromptCategory.Geography },
  { name: "Texas", category: PromptCategory.Geography },
  { name: "Florida", category: PromptCategory.Geography },
  { name: "Japan", category: PromptCategory.Geography },
  { name: "Russia", category: PromptCategory.Geography },
  { name: "Germany", category: PromptCategory.Geography },
  { name: "China", category: PromptCategory.Geography },
  { name: "United Kingdom", category: PromptCategory.Geography },
  { name: "California", category: PromptCategory.Geography },

  // General Geography & Nature
  { name: "Globe", category: PromptCategory.Geography },
  { name: "Volcano", category: PromptCategory.Geography },
  { name: "Desert", category: PromptCategory.Geography },
  { name: "Island", category: PromptCategory.Geography },
  { name: "Waterfall", category: PromptCategory.Geography },
  { name: "Jungle", category: PromptCategory.Geography },
  { name: "Iceberg", category: PromptCategory.Geography },
  { name: "Canyon", category: PromptCategory.Geography },
  { name: "Cave", category: PromptCategory.Geography },
  { name: "Oasis", category: PromptCategory.Geography },
  { name: "Swamp", category: PromptCategory.Geography },
  { name: "Tornado", category: PromptCategory.Geography },
  { name: "Earthquake", category: PromptCategory.Geography },
  { name: "Tsunami", category: PromptCategory.Geography },

  // Tools & Concepts
  { name: "Compass", category: PromptCategory.Geography },
  { name: "Treasure Map", category: PromptCategory.Geography },
  { name: "Flag", category: PromptCategory.Geography },
  { name: "Passport", category: PromptCategory.Geography },
  { name: "North Pole", category: PromptCategory.Geography },
];
