export const staticSignsDictionary = [
  "0.png", "1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", 
  "A.png", "Afternoon.png", "Airplane.png", "Alldone.png", "Along.png", "Am.png", 
  "Ambulance.png", "Anger.jpeg", "Anxious.jpeg", "April.png", "Are.png", "Ashamed.jpeg", 
  "August.png", "B.png", "Bag.png", "Bandage.png", "Bathroom.png", "Be Careful.png", 
  "Book.png", "Bottle.jpeg", "Broken Bone.png", "Brother.jpeg", "Brother.png", "Bus.png", 
  "C.png", "Call.png", "Can.png", "Cheerfull.jpeg", "Choclate.jpeg", "Close.png", 
  "Come.png", "Correct.png", "Cough.png", "D.png", "Dad.jpeg", "Dance.jpeg", "December.png", 
  "Dictionary.png", "Doctor.png", "Draw.png", "Dreamy.jpeg", "Drink.jpeg", "Drink.png", 
  "Drive.png", "E.png", "Eat.jpeg", "Eat.png", "Emergency.png", "Everyone.jpeg", 
  "Excited.jpeg", "Excuse me.png", "F.png", "Father.png", "February.png", "Find.png", 
  "Fine.png", "Fire.png", "First.png", "Freind.jpeg", "Friday.png", "Friend.png", 
  "Friends.png", "G.png", "Gloomy.jpeg", "Gloves.jpeg", "Go.png", "Good.png", 
  "Goodbye.jpeg", "Goodbye.png", "Grandfather.jpeg", "Grandmother.jpeg", "Greetfull.jpeg", 
  "H.png", "Headache.png", "Hearing Aid.png", "Hello.png", "Help.png", "Homework.png", 
  "Hospital.png", "How Much.png", "How.png", "I.png", "Infection.png", "Injection.png", 
  "Is.png", "J.png", "January.png", "July.png", "June.png", "K.png", "L.png", "Left.png", 
  "Lifting.jpeg", "Live.png", "M.png", "Map.png", "March.png", "May.png", "Medicine.png", 
  "Meet.jpeg", "Monday.png", "Money.png", "More.png", "Morning.png", "Mother.png", 
  "My.png", "N.png", "Name.png", "Nice to meet you.jpeg", "Nice.png", "Night.png", 
  "No.png", "November.png", "Nurse.png", "O.png", "October.png", "Open.png", "Over.jpeg", 
  "P.png", "Pain.png", "Paper.png", "Pen.png", "Please.png", "Police.png", "Q.png", 
  "R.png", "Read.png", "Relaxed.jpeg", "Remember.jpeg", "Right.png", "S.png", "Satisfied.jpeg", 
  "Saturday.png", "Scared.jpeg", "School.png", "September.png", "Share.jpeg", "Share.png", 
  "She.jpeg", "Sing.jpeg", "Sister.jpeg", "Sleep.png", "Sore Throat.png", "Sorry.png", 
  "Specialist.png", "Spectacles.png", "Start.png", "Student.png", "Sunday.png", "T.png", 
  "Teacher.jpeg", "Teacher.png", "Teeth.jpeg", "Test.png", "Thankyou.png", "That.jpeg", 
  "These.jpeg", "They.jpeg", "This.jpeg", "Thursday.png", "Tongue.jpeg", "Train.png", 
  "Travel.png", "Tuesday.png", "U.png", "V.png", "Vomit.jpeg", "W.png", "Walk.png", 
  "Water.jpg", "We.jpeg", "Wednesday.png", "Welcome.png", "What.png", "Where do.png", 
  "Where.jpeg", "X.png", "Y.png", "Yes.png", "You all.jpeg", "You.jpeg", "You.png", 
  "Your Welcome.png", "Your.png", "Z.png", "family.jpeg", "food.png", "home.png", 
  "me.jpeg", "mom.jpeg"
];

// Exhaustive dictionary file lookup helper
export const findSignImage = (textQuery) => {
  const query = textQuery.trim().toLowerCase();
  
  // Custom redirects for synonyms if required
  if (query === 'you are welcome') return `/signs/Your Welcome.png`;

  const match = staticSignsDictionary.find(file => {
    const base = file.replace(/\.(png|jpe?g)$/i, '').toLowerCase();
    return base === query;
  });
  
  return match ? `/signs/${match}` : null;
};
