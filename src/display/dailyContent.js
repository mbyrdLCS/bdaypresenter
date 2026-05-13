// Mix of inspirational quotes and clean office-friendly jokes
// 150 entries = repeats roughly every 5 months
const content = [
  // Quotes — teamwork & collaboration
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Talent wins games, but teamwork and intelligence win championships.", author: "Michael Jordan" },
  { text: "None of us is as smart as all of us.", author: "Ken Blanchard" },
  { text: "Coming together is a beginning. Keeping together is progress. Working together is success.", author: "Henry Ford" },
  { text: "Great things in business are never done by one person. They're done by a team.", author: "Steve Jobs" },
  { text: "The strength of the team is each individual member. The strength of each member is the team.", author: "Phil Jackson" },
  { text: "Alone we can do so little; together we can do so much.", author: "Helen Keller" },
  { text: "Teamwork makes the dream work.", author: "John C. Maxwell" },
  { text: "Not finance. Not strategy. Not technology. It is teamwork that remains the ultimate competitive advantage.", author: "Patrick Lencioni" },
  { text: "Two heads are better than one.", author: "Proverb" },
  { text: "Success is best when it's shared.", author: "Howard Schultz" },
  { text: "No one can whistle a symphony. It takes a whole orchestra to play it.", author: "H.E. Luccock" },
  { text: "Individual commitment to a group effort — that is what makes a team work.", author: "Vince Lombardi" },
  { text: "The whole is greater than the sum of its parts.", author: "Aristotle" },
  { text: "Unity is strength. When there is teamwork and collaboration, wonderful things can be achieved.", author: "Mattie Stepanek" },

  // Jokes — clean & office friendly
  { text: "Why don't scientists trust atoms? Because they make up everything.", author: "Office Humor" },
  { text: "I told my boss I needed a raise because three companies were after me. He asked which ones. I said: the gas company, the electric company, and the water company.", author: "Office Humor" },
  { text: "Why did the scarecrow win an award? Because he was outstanding in his field.", author: "Office Humor" },
  { text: "What do you call a factory that makes okay products? A satisfactory.", author: "Office Humor" },
  { text: "I asked my dog what two minus two is. He said nothing.", author: "Office Humor" },
  { text: "Why do cows wear bells? Because their horns don't work.", author: "Office Humor" },
  { text: "What do you call cheese that isn't yours? Nacho cheese.", author: "Office Humor" },
  { text: "I used to hate facial hair, but then it grew on me.", author: "Office Humor" },
  { text: "Why don't eggs tell jokes? They'd crack each other up.", author: "Office Humor" },
  { text: "What do you call a sleeping dinosaur? A dino-snore.", author: "Office Humor" },

  // Quotes — inspiration & growth
  { text: "If I have seen further it is by standing on the shoulders of giants.", author: "Isaac Newton" },
  { text: "Keep your face always toward the sunshine and shadows will fall behind you.", author: "Walt Whitman" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
  { text: "Act as if what you do makes a difference. It does.", author: "William James" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "Your attitude, not your aptitude, will determine your altitude.", author: "Zig Ziglar" },
  { text: "Don't count the days. Make the days count.", author: "Muhammad Ali" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "Be the change you wish to see in the world.", author: "Mahatma Gandhi" },
  { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
  { text: "Opportunities don't happen. You create them.", author: "Chris Grosser" },

  // More jokes
  { text: "Why did the math book look so sad? Because it had too many problems.", author: "Office Humor" },
  { text: "What's a computer's favorite snack? Microchips.", author: "Office Humor" },
  { text: "Why did the calendar go to therapy? It had too many dates.", author: "Office Humor" },
  { text: "I'm reading a book about anti-gravity. It's impossible to put down.", author: "Office Humor" },
  { text: "Why did the bicycle fall over? Because it was two-tired.", author: "Office Humor" },
  { text: "What do you call a snowman with a six-pack? An abdominal snowman.", author: "Office Humor" },
  { text: "Why can't you give Elsa a balloon? Because she'll let it go.", author: "Office Humor" },
  { text: "What do you call a bear with no teeth? A gummy bear.", author: "Office Humor" },
  { text: "I tried to write a joke about clocks but it was too time-consuming.", author: "Office Humor" },
  { text: "Why do programmers prefer dark mode? Because light attracts bugs.", author: "Office Humor" },

  // More inspiration
  { text: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas Edison" },
  { text: "If you want to lift yourself up, lift up someone else.", author: "Booker T. Washington" },
  { text: "The two most important days in your life are the day you are born and the day you find out why.", author: "Mark Twain" },
  { text: "A person who never made a mistake never tried anything new.", author: "Albert Einstein" },
  { text: "Spread love everywhere you go. Let no one ever come to you without leaving happier.", author: "Mother Teresa" },
  { text: "Always remember that you are absolutely unique. Just like everyone else.", author: "Margaret Mead" },
  { text: "Do not go where the path may lead; go instead where there is no path and leave a trail.", author: "Ralph Waldo Emerson" },
  { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
  { text: "In the end, it's not the years in your life that count. It's the life in your years.", author: "Abraham Lincoln" },
  { text: "Life is either a daring adventure or nothing at all.", author: "Helen Keller" },

  // More jokes
  { text: "Why did the coffee file a police report? It got mugged.", author: "Office Humor" },
  { text: "What did the ocean say to the beach? Nothing, it just waved.", author: "Office Humor" },
  { text: "Why did the golfer bring an extra pair of pants? In case he got a hole in one.", author: "Office Humor" },
  { text: "I have a joke about construction, but I'm still working on it.", author: "Office Humor" },
  { text: "What do you get when you cross a computer and a lifeguard? A screensaver.", author: "Office Humor" },
  { text: "What did the janitor say when he jumped out of the closet? Supplies!", author: "Office Humor" },
  { text: "I used to be a banker, but I lost interest.", author: "Office Humor" },
  { text: "What do you call a pig that does karate? A pork chop.", author: "Office Humor" },
  { text: "What do you call an alligator in a vest? An investigator.", author: "Office Humor" },
  { text: "I'm on a seafood diet. I see food and I eat it.", author: "Office Humor" },

  // More wisdom
  { text: "You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose.", author: "Dr. Seuss" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "When you reach the end of your rope, tie a knot in it and hang on.", author: "Franklin D. Roosevelt" },
  { text: "You will face many defeats in life, but never let yourself be defeated.", author: "Maya Angelou" },
  { text: "Never let the fear of striking out keep you from playing the game.", author: "Babe Ruth" },
  { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon" },
  { text: "When everything seems to be going against you, remember that the airplane takes off against the wind, not with it.", author: "Henry Ford" },
  { text: "I find that the harder I work, the more luck I seem to have.", author: "Thomas Jefferson" },
  { text: "Success is not final; failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },

  // More jokes
  { text: "What do you get when you cross a snowman and a vampire? Frostbite.", author: "Office Humor" },
  { text: "Why did the broom win an award? It swept the competition.", author: "Office Humor" },
  { text: "What's the best thing about Switzerland? I don't know, but the flag is a big plus.", author: "Office Humor" },
  { text: "Did you hear about the claustrophobic astronaut? He just needed a little space.", author: "Office Humor" },
  { text: "I would tell you a joke about paper, but it's tear-able.", author: "Office Humor" },
  { text: "Why did the invisible man turn down the job? He couldn't see himself doing it.", author: "Office Humor" },
  { text: "What's a vampire's least favorite meal? A steak.", author: "Office Humor" },
  { text: "I only know 25 letters of the alphabet. I don't know y.", author: "Office Humor" },
  { text: "What did one hat say to the other hat? You stay here, I'll go on ahead.", author: "Office Humor" },
  { text: "Why did the gym close down? It just didn't work out.", author: "Office Humor" },

  // More inspiration
  { text: "All our dreams can come true, if we have the courage to pursue them.", author: "Walt Disney" },
  { text: "Great minds discuss ideas; average minds discuss events; small minds discuss people.", author: "Eleanor Roosevelt" },
  { text: "The mind is everything. What you think you become.", author: "Buddha" },
  { text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin" },
  { text: "Dream big and dare to fail.", author: "Norman Vaughan" },
  { text: "Magic is believing in yourself. If you can make that happen, you can make anything happen.", author: "J.W. von Goethe" },
  { text: "Too many of us are not living our dreams because we are living our fears.", author: "Les Brown" },
  { text: "The starting point of all achievement is desire.", author: "Napoleon Hill" },
  { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
  { text: "I would rather die of passion than of boredom.", author: "Vincent van Gogh" },

  // More jokes
  { text: "What do you call a group of musical whales? An orca-stra.", author: "Office Humor" },
  { text: "Why did the tomato turn red? Because it saw the salad dressing.", author: "Office Humor" },
  { text: "What do you call a sleeping bull? A bulldozer.", author: "Office Humor" },
  { text: "Why did the bank robber take a bath? He wanted to make a clean getaway.", author: "Office Humor" },
  { text: "Why did the student eat his homework? Because the teacher said it was a piece of cake.", author: "Office Humor" },
  { text: "I asked the librarian if they had books about paranoia. She whispered, 'They're right behind you.'", author: "Office Humor" },
  { text: "What do you call a fish without eyes? A fsh.", author: "Office Humor" },
  { text: "Why are ghosts bad liars? Because you can see right through them.", author: "Office Humor" },
  { text: "Why did the stadium get hot after the game? All the fans left.", author: "Office Humor" },
  { text: "What do you call a lazy kangaroo? A pouch potato.", author: "Office Humor" },

  // More wisdom — leadership & work
  { text: "Leadership is not about being in charge. It's about taking care of those in your charge.", author: "Simon Sinek" },
  { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
  { text: "People rarely succeed unless they have fun in what they are doing.", author: "Dale Carnegie" },
  { text: "The most common way people give up their power is by thinking they don't have any.", author: "Alice Walker" },
  { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
  { text: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Anonymous" },
  { text: "If your actions inspire others to dream more, learn more, do more, and become more — you are a leader.", author: "John Quincy Adams" },
  { text: "Do one thing every day that scares you.", author: "Eleanor Roosevelt" },
  { text: "Well done is better than well said.", author: "Benjamin Franklin" },
  { text: "The secret to getting ahead is getting started.", author: "Agatha Christie" },

  // More jokes
  { text: "Why did the employee get fired from the calendar factory? He took a day off.", author: "Office Humor" },
  { text: "What did one wall say to the other wall? I'll meet you at the corner.", author: "Office Humor" },
  { text: "What do you call a pile of cats? A meowtain.", author: "Office Humor" },
  { text: "I told my computer I needed a break. Now it won't stop sending me Kit-Kat ads.", author: "Office Humor" },
  { text: "What do you call a cow on a trampoline? A milkshake.", author: "Office Humor" },
  { text: "Why did the powerpoint presentation cross the road? To get to the other slide.", author: "Office Humor" },
  { text: "How does the moon cut his hair? Eclipse it.", author: "Office Humor" },
  { text: "What do you call a fake noodle? An impasta.", author: "Office Humor" },
  { text: "Why did the chicken join a band? Because it had the drumsticks.", author: "Office Humor" },
  { text: "I told a joke about a pencil once. It was pointless.", author: "Office Humor" },

  // More inspiration
  { text: "Happiness is not something ready-made. It comes from your own actions.", author: "Dalai Lama" },
  { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
  { text: "You only live once, but if you do it right, once is enough.", author: "Mae West" },
  { text: "In three words I can sum up everything I've learned about life: it goes on.", author: "Robert Frost" },
  { text: "To handle yourself, use your head; to handle others, use your heart.", author: "Eleanor Roosevelt" },
  { text: "A friend is someone who knows all about you and still loves you.", author: "Elbert Hubbard" },
  { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", author: "Ralph Waldo Emerson" },
  { text: "Live in the sunshine, swim the sea, drink the wild air.", author: "Ralph Waldo Emerson" },
  { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
  { text: "It's not what you look at that matters, it's what you see.", author: "Henry David Thoreau" },
]

export function getDailyContent() {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const dayOfYear = Math.floor((now - start) / (1000 * 60 * 60 * 24))
  return content[dayOfYear % content.length]
}
