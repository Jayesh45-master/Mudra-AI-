// Centralized game data for difficulty scaling and hints

export const quizQuestions = [
  // ============================================
  // EASY LEVEL (Alphabets, Numbers, Days, Months) - 20 items
  // ============================================
  { id: 'e1', imageSrc: '/signs/A.png', options: ['A', 'S', 'T', 'E'], correct: 'A', difficulty: 'easy', hint: "Thumb rests against the side of the index finger, fist closed." },
  { id: 'e2', imageSrc: '/signs/B.png', options: ['F', 'B', 'P', 'D'], correct: 'B', difficulty: 'easy', hint: "All fingers straight up, thumb tucked inward." },
  { id: 'e3', imageSrc: '/signs/C.png', options: ['C', 'O', 'G', 'Q'], correct: 'C', difficulty: 'easy', hint: "Hand forms a C shape." },
  { id: 'e4', imageSrc: '/signs/D.png', options: ['B', 'D', 'P', 'F'], correct: 'D', difficulty: 'easy', hint: "Index finger points up, other fingers curl into a circle." },
  { id: 'e5', imageSrc: '/signs/E.png', options: ['S', 'A', 'E', 'M'], correct: 'E', difficulty: 'easy', hint: "Fingers curled back to touch the thumb." },
  { id: 'e6', imageSrc: '/signs/F.png', options: ['E', 'F', 'T', 'W'], correct: 'F', difficulty: 'easy', hint: "Index and thumb touching, other fingers spread out." },
  { id: 'e7', imageSrc: '/signs/H.png', options: ['G', 'H', 'U', 'N'], correct: 'H', difficulty: 'easy', hint: "Index and middle fingers point sideways." },
  { id: 'e8', imageSrc: '/signs/I.png', options: ['J', 'I', 'Y', 'T'], correct: 'I', difficulty: 'easy', hint: "Pinky finger points straight up." },
  { id: 'e9', imageSrc: '/signs/L.png', options: ['J', 'Y', 'L', 'I'], correct: 'L', difficulty: 'easy', hint: "Index finger and thumb form an L shape." },
  { id: 'e10', imageSrc: '/signs/V.png', options: ['U', 'V', 'K', 'R'], correct: 'V', difficulty: 'easy', hint: "Index and middle finger up and spread apart like a V." },
  
  { id: 'e11', imageSrc: '/signs/1.png', options: ['1', '2', 'I', 'L'], correct: '1', difficulty: 'easy', hint: "One finger pointing up." },
  { id: 'e12', imageSrc: '/signs/2.png', options: ['V', '2', '3', 'U'], correct: '2', difficulty: 'easy', hint: "Two fingers pointing up." },
  { id: 'e13', imageSrc: '/signs/3.png', options: ['4', 'W', '3', '6'], correct: '3', difficulty: 'easy', hint: "Thumb, index, and middle fingers extended." },
  { id: 'e14', imageSrc: '/signs/5.png', options: ['4', '5', 'High-Five', 'Stop'], correct: '5', difficulty: 'easy', hint: "All five fingers extended outward." },
  { id: 'e15', imageSrc: '/signs/9.png', options: ['F', '6', '8', '9'], correct: '9', difficulty: 'easy', hint: "Index finger and thumb touching, forming a circle." },

  { id: 'e16', imageSrc: '/signs/Monday.png', options: ['Monday', 'March', 'Morning', 'May'], correct: 'Monday', difficulty: 'easy', hint: "Hand forms an M and moves in a small circle." },
  { id: 'e17', imageSrc: '/signs/Friday.png', options: ['Friday', 'February', 'Four', 'Food'], correct: 'Friday', difficulty: 'easy', hint: "Hand forms an F and moves in a small circle." },
  { id: 'e18', imageSrc: '/signs/January.png', options: ['June', 'July', 'January', 'Jacket'], correct: 'January', difficulty: 'easy', hint: "Fingerspell J-A-N." },
  { id: 'e19', imageSrc: '/signs/March.png', options: ['May', 'Monday', 'March', 'Mother'], correct: 'March', difficulty: 'easy', hint: "Fingerspell M-A-R-C-H." },
  { id: 'e20', imageSrc: '/signs/December.png', options: ['December', 'Doctor', 'Dog', 'Date'], correct: 'December', difficulty: 'easy', hint: "Fingerspell D-E-C." },


  // ============================================
  // MEDIUM LEVEL (Words, Greetings, Emergency) - 20 items
  // ============================================
  { id: 'm1', imageSrc: '/signs/Hello.png', word: 'Hello', options: ['Goodbye', 'Hello', 'Thank You', 'Please'], correct: 'Hello', difficulty: 'medium', hint: "A salute-like motion outward from the forehead." },
  { id: 'm2', imageSrc: '/signs/Morning.png', word: 'Good Morning', options: ['Good Night', 'Good Morning', 'Hello', 'Eat'], correct: 'Good Morning', difficulty: 'medium', hint: "One hand mimics the sun rising over the opposite arm." },
  { id: 'm3', imageSrc: '/signs/Night.png', word: 'Good Night', options: ['Sleep', 'Good Morning', 'Good Night', 'Tired'], correct: 'Good Night', difficulty: 'medium', hint: "Hands cup together and move downwards like the sun setting." },
  
  { id: 'm4', imageSrc: '/signs/Fire.png', word: 'Fire', options: ['Hot', 'Fire', 'Burn', 'Danger'], correct: 'Fire', difficulty: 'medium', hint: "Fingers wiggle upward imitating flames." },
  { id: 'm5', imageSrc: '/signs/Police.png', word: 'Police', options: ['Doctor', 'Police', 'Security', 'Ambulance'], correct: 'Police', difficulty: 'medium', hint: "Hand taps the chest simulating a badge." },
  { id: 'm6', imageSrc: '/signs/Ambulance.png', word: 'Ambulance', options: ['Emergency', 'Doctor', 'Hospital', 'Ambulance'], correct: 'Ambulance', difficulty: 'medium', hint: "Hands rotate above head imitating sirens." },
  { id: 'm7', imageSrc: '/signs/Emergency.png', word: 'Emergency', options: ['Pain', 'Danger', 'Emergency', 'Fire'], correct: 'Emergency', difficulty: 'medium', hint: "Shaking an 'E' handshape forcefully." },
  
  { id: 'm8', imageSrc: '/signs/Doctor.png', word: 'Doctor', options: ['Nurse', 'Hospital', 'Doctor', 'Medicine'], correct: 'Doctor', difficulty: 'medium', hint: "Fingers tap on the wrist as if checking a pulse." },
  { id: 'm9', imageSrc: '/signs/Hospital.png', word: 'Hospital', options: ['House', 'Doctor', 'Hospital', 'School'], correct: 'Hospital', difficulty: 'medium', hint: "Fingers draw an 'H' on the upper arm." },
  { id: 'm10', imageSrc: '/signs/Medicine.png', word: 'Medicine', options: ['Pills', 'Water', 'Medicine', 'Doctor'], correct: 'Medicine', difficulty: 'medium', hint: "Middle finger rubs the center of the opposite palm." },
  { id: 'm11', imageSrc: '/signs/Pain.png', word: 'Pain', options: ['Sick', 'Pain', 'Injury', 'Headache'], correct: 'Pain', difficulty: 'medium', hint: "Index fingers point at each other forcefully where it hurts." },
  
  { id: 'm12', imageSrc: '/signs/Water.jpg', word: 'Water', options: ['Milk', 'Juice', 'Water', 'Drink'], correct: 'Water', difficulty: 'medium', hint: "Index, middle, and ring fingers up (forming 'W') tapped on the chin." },
  { id: 'm13', imageSrc: '/signs/Book.png', word: 'Book', options: ['Paper', 'Pen', 'Book', 'Read'], correct: 'Book', difficulty: 'medium', hint: "Palms open up, like opening a physical object." },
  { id: 'm14', imageSrc: '/signs/School.png', word: 'School', options: ['Home', 'School', 'Teacher', 'Learn'], correct: 'School', difficulty: 'medium', hint: "Clapping hands horizontally, simulating a teacher's clap." },
  { id: 'm15', imageSrc: '/signs/Teacher.png', word: 'Teacher', options: ['Student', 'Principal', 'Teacher', 'School'], correct: 'Teacher', difficulty: 'medium', hint: "Pulling information from the head and handing it out." },
  { id: 'm16', imageSrc: '/signs/home.png', word: 'Home', options: ['House', 'Home', 'Roof', 'Sleep'], correct: 'Home', difficulty: 'medium', hint: "Hand moves from mouth to cheek." },

  { id: 'm17', imageSrc: '/signs/Drink.png', word: 'Drink', options: ['Eat', 'Drink', 'Water', 'Thirsty'], correct: 'Drink', difficulty: 'medium', hint: "Imitate holding a cup and taking a sip." },
  { id: 'm18', imageSrc: '/signs/Eat.png', word: 'Eat', options: ['Food', 'Hungry', 'Eat', 'Drink'], correct: 'Eat', difficulty: 'medium', hint: "Fingers bundled together tapping the lips." },
  { id: 'm19', imageSrc: '/signs/Sleep.png', word: 'Sleep', options: ['Bed', 'Dream', 'Night', 'Sleep'], correct: 'Sleep', difficulty: 'medium', hint: "Hand draws down over the face." },
  { id: 'm20', imageSrc: '/signs/Walk.png', word: 'Walk', options: ['Run', 'Walk', 'Go', 'Travel'], correct: 'Walk', difficulty: 'medium', hint: "Hands mimic the movement of feet walking." },


  // ============================================
  // HARD LEVEL (Sentences / Complex Phrases) - 20 items
  // ============================================
  { id: 'h1', imageSrc: '/signs/Thankyou.png', phrase: 'Thank You', options: ['Excuse Me', 'Sorry', 'You\'re Welcome', 'Thank You'], correct: 'Thank You', difficulty: 'hard', hint: "Hand moves outward from the chin in a gracious motion." },
  { id: 'h2', imageSrc: '/signs/Help.png', phrase: 'I need help', options: ['Love', 'I need help', 'Stop immediately', 'Wait for me'], correct: 'I need help', difficulty: 'hard', hint: "One hand rests on the other flat palm, pushing upward." },
  { id: 'h3', imageSrc: '/signs/Yes.png', phrase: 'Yes, that is correct', options: ['Yes, that is correct', 'No, I disagree', 'Maybe tomorrow', 'Please wait here'], correct: 'Yes, that is correct', difficulty: 'hard', hint: "A closed fist nodding up and down." },
  { id: 'h4', imageSrc: '/signs/No.png', phrase: 'No', options: ['Yes', 'No', 'Stop', 'Wait'], correct: 'No', difficulty: 'hard', hint: "Index, middle finger, and thumb snapping together." },
  { id: 'h5', imageSrc: '/signs/Please.png', phrase: 'Please help me', options: ['Excuse Me', 'Please help me', 'Thank You very much', 'I am Sorry'], correct: 'Please help me', difficulty: 'hard', hint: "Flat hand rubbing in a circle on the chest." },
  { id: 'h6', imageSrc: '/signs/Sorry.png', phrase: 'I am so sorry', options: ['Excuse Me', 'Please forgive me', 'I am so sorry', 'Help me please'], correct: 'I am so sorry', difficulty: 'hard', hint: "A closed fist rubbing in a circle on the chest." },
  
  { id: 'h7', imageSrc: '/signs/How.png', phrase: 'How are you?', options: ['What is your name?', 'Where are you?', 'How are you?', 'Are you okay?'], correct: 'How are you?', difficulty: 'hard', hint: "Both hands roll outward from the chest." },
  { id: 'h8', imageSrc: '/signs/Name.png', phrase: 'What is your name?', options: ['How old are you?', 'Where do you live?', 'What is your name?', 'Nice to meet you.'], correct: 'What is your name?', difficulty: 'hard', hint: "Two fingers tap over two fingers of the other hand." },
  { id: 'h9', imageSrc: '/signs/Where do.png', phrase: 'Where do you live?', options: ['Where is the bathroom?', 'Where do you live?', 'What are you doing?', 'Where are you from?'], correct: 'Where do you live?', difficulty: 'hard', hint: "Index fingers point and shake side to side." },
  { id: 'h10', imageSrc: '/signs/Nice to meet you.jpeg', phrase: 'Nice to meet you', options: ['See you later', 'Nice to meet you', 'How are you doing?', 'Good Afternoon'], correct: 'Nice to meet you', difficulty: 'hard', hint: "Flat palms slide against each other, then two index fingers meet." },
  
  { id: 'h11', imageSrc: '/signs/Fine.png', phrase: 'I am doing fine', options: ['I am sick', 'I am hungry', 'I am doing fine', 'I am tired'], correct: 'I am doing fine', difficulty: 'hard', hint: "Thumb touches the chest with fingers spread open." },
  { id: 'h12', imageSrc: '/signs/Call.png', phrase: 'Call the police', options: ['Call the doctor', 'Call the police', 'Emergency!', 'Help me'], correct: 'Call the police', difficulty: 'hard', hint: "Hand mimics a telephone shape brought to the ear." },
  { id: 'h13', imageSrc: '/signs/Be Careful.png', phrase: 'Be extremely careful', options: ['Watch your step', 'Be extremely careful', 'Go away quickly', 'Stop the car'], correct: 'Be extremely careful', difficulty: 'hard', hint: "Two 'K' handshapes tapping on top of each other." },
  { id: 'h14', imageSrc: '/signs/Right.png', phrase: 'Turn to the right', options: ['Turn to the left', 'Go straight forward', 'Turn to the right', 'Stop right there'], correct: 'Turn to the right', difficulty: 'hard', hint: "Hand moves outward to the right side." },
  { id: 'h15', imageSrc: '/signs/Left.png', phrase: 'Turn to the left', options: ['Turn to the left', 'Turn to the right', 'Reverse', 'Wait there'], correct: 'Turn to the left', difficulty: 'hard', hint: "Hand moves outward to the left side." },
  
  { id: 'h16', imageSrc: '/signs/How Much.png', phrase: 'How much does it cost?', options: ['Where is it?', 'How much does it cost?', 'Can I buy it?', 'Is it free?'], correct: 'How much does it cost?', difficulty: 'hard', hint: "Fingers rubbing together simulating money." },
  { id: 'h17', imageSrc: '/signs/food.png', phrase: 'I am very hungry', options: ['I want water', 'I am very tired', 'I am very hungry', 'Where is the restaurant?'], correct: 'I am very hungry', difficulty: 'hard', hint: "Fingers clustered together aiming toward mouth." },
  { id: 'h18', imageSrc: '/signs/Goodbye.png', phrase: 'See you later!', options: ['What time is it?', 'See you later!', 'Hello there', 'Wait for me'], correct: 'See you later!', difficulty: 'hard', hint: "Traditional wave of the hand outward." },
  { id: 'h19', imageSrc: '/signs/Your Welcome.png', phrase: 'You are welcome', options: ['Thank You', 'You are welcome', 'Excuse Me', 'No problem'], correct: 'You are welcome', difficulty: 'hard', hint: "A sweeping motion bringing the arm down from the chest." },
  { id: 'h20', imageSrc: '/signs/Excuse me.png', phrase: 'Excuse me for a moment', options: ['I am sorry', 'Excuse me for a moment', 'Where is the exit?', 'Please repeat that'], correct: 'Excuse me for a moment', difficulty: 'hard', hint: "Fingers sweep across the opposing flat palm." }
];

export const mockCameraTargets = [
  {
    target: 'A',
    en: "Make a fist and rest your thumb against the side of your index finger.",
    hi: "एक मुट्ठी बनाएं और अपने अंगूठे को अपनी तर्जनी (index finger) के किनारे पर रखें।"
  },
  {
    target: 'B',
    en: "Keep all fingers straight up securely and tuck your thumb inward across your palm.",
    hi: "सभी उंगलियों को सीधा ऊपर रखें और अपने अंगूठे को हथेली के अंदर की ओर मोड़ें।"
  },
  {
    target: 'C',
    en: "Curve your hand to form the shape of the letter C.",
    hi: "अपने हाथ को मोड़कर 'C' अक्षर का आकार बनाएं।"
  },
  {
    target: 'D',
    en: "Point your index finger straight up, and curl your other fingers into a circle touching your thumb.",
    hi: "अपनी तर्जनी को सीधा ऊपर की ओर इशारा करें, और अन्य उंगलियों को मोड़कर अंगूठे से मिलाते हुए गोल बनाएं।"
  },
  {
    target: 'L',
    en: "Extend your index finger and thumb to form an L shape, curl the rest.",
    hi: "अपनी तर्जनी और अंगूठे को फैलाकर 'L' का आकार बनाएं, बाकी उंगलियों को मोड़ लें।"
  },
  {
    target: 'V',
    en: "Point your index and middle finger up and spread them apart like a V.",
    hi: "अपनी तर्जनी और मध्यमा उंगली को ऊपर की ओर इशारा करें और उन्हें 'V' की तरह अलग-अलग फैलाएं।"
  },
  {
    target: 'Y',
    en: "Extend only your thumb and pinky finger outward, keep the middle fingers curled in.",
    hi: "केवल अपने अंगूठे और छोटी उंगली (pinky) को बाहर की ओर फैलाएं, बीच की उंगलियों को मोड़ कर रखें।"
  }
];
