export const alphabetData = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => ({
  text: letter,
  image: `/signs/${letter}.png`
}));

export const numbersData = '0123456789'.split('').map(num => ({
  text: num,
  image: `/signs/${num}.png`
}));

export const daysData = [
  { text: 'Monday', image: '/signs/Monday.png' },
  { text: 'Tuesday', image: '/signs/Tuesday.png' },
  { text: 'Wednesday', image: '/signs/Wednesday.png' },
  { text: 'Thursday', image: '/signs/Thursday.png' },
  { text: 'Friday', image: '/signs/Friday.png' },
  { text: 'Saturday', image: '/signs/Saturday.png' },
  { text: 'Sunday', image: '/signs/Sunday.png' }
];

export const monthsData = [
  { text: 'January', image: '/signs/January.png' },
  { text: 'February', image: '/signs/February.png' },
  { text: 'March', image: '/signs/March.png' },
  { text: 'April', image: '/signs/April.png' },
  { text: 'May', image: '/signs/May.png' },
  { text: 'June', image: '/signs/June.png' },
  { text: 'July', image: '/signs/July.png' },
  { text: 'August', image: '/signs/August.png' },
  { text: 'September', image: '/signs/September.png' },
  { text: 'October', image: '/signs/October.png' },
  { text: 'November', image: '/signs/November.png' },
  { text: 'December', image: '/signs/December.png' }
];

export const greetingsData = [
  { text: 'Hello', image: '/signs/Hello.png' },
  { text: 'Good Morning', image: '/signs/Morning.png' },
  { text: 'Good Night', image: '/signs/Night.png' },
  { text: 'Good Afternoon', image: '/signs/Afternoon.png' },
  { text: 'Goodbye', image: '/signs/Goodbye.png' },
  { text: 'Welcome', image: '/signs/Welcome.png' },
  { text: 'Nice to Meet You', image: '/signs/Nice to meet you.jpeg' },
  { text: 'Meet', image: '/signs/Meet.jpeg' },
  { text: 'Nice', image: '/signs/Nice.png' },
  { text: 'How', image: '/signs/How.png' },
  { text: 'Thank You', image: '/signs/Thankyou.png' },
  { text: 'Your Welcome', image: '/signs/Your Welcome.png' },
  { text: 'Excuse Me', image: '/signs/Excuse me.png' }
];

export const commonPhrasesData = [
  { text: 'Yes', image: '/signs/Yes.png' },
  { text: 'No', image: '/signs/No.png' },
  { text: 'Please', image: '/signs/Please.png' },
  { text: 'Sorry', image: '/signs/Sorry.png' },
  { text: 'Help', image: '/signs/Help.png' },
  { text: 'Fine', image: '/signs/Fine.png' },
  { text: 'Good', image: '/signs/Good.png' },
  { text: 'How Much', image: '/signs/How Much.png' },
  { text: 'Be Careful', image: '/signs/Be Careful.png' },
  { text: 'Left', image: '/signs/Left.png' },
  { text: 'Right', image: '/signs/Right.png' },
  { text: 'Name', image: '/signs/Name.png' },
  { text: 'Where Do', image: '/signs/Where do.png' },
  { text: 'Where', image: '/signs/Where.jpeg' },
  { text: 'What', image: '/signs/What.png' },
  { text: 'All Done', image: '/signs/Alldone.png' },
  { text: 'More', image: '/signs/More.png' },
  { text: 'Correct', image: '/signs/Correct.png' }
];

export const healthcareData = [
  { text: 'Doctor', image: '/signs/Doctor.png' },
  { text: 'Hospital', image: '/signs/Hospital.png' },
  { text: 'Medicine', image: '/signs/Medicine.png' },
  { text: 'Pain', image: '/signs/Pain.png' },
  { text: 'Ambulance', image: '/signs/Ambulance.png' },
  { text: 'Nurse', image: '/signs/Nurse.png' },
  { text: 'Injection', image: '/signs/Injection.png' },
  { text: 'Infection', image: '/signs/Infection.png' },
  { text: 'Bandage', image: '/signs/Bandage.png' },
  { text: 'Broken Bone', image: '/signs/Broken Bone.png' },
  { text: 'Headache', image: '/signs/Headache.png' },
  { text: 'Cough', image: '/signs/Cough.png' },
  { text: 'Sore Throat', image: '/signs/Sore Throat.png' },
  { text: 'Hearing Aid', image: '/signs/Hearing Aid.png' },
  { text: 'Specialist', image: '/signs/Specialist.png' },
  { text: 'Vomit', image: '/signs/Vomit.jpeg' },
  { text: 'Teeth', image: '/signs/Teeth.jpeg' },
  { text: 'Tongue', image: '/signs/Tongue.jpeg' }
];

export const educationData = [
  { text: 'School', image: '/signs/School.png' },
  { text: 'Teacher', image: '/signs/Teacher.png' },
  { text: 'Student', image: '/signs/Student.png' },
  { text: 'Book', image: '/signs/Book.png' },
  { text: 'Read', image: '/signs/Read.png' },
  { text: 'Homework', image: '/signs/Homework.png' },
  { text: 'Dictionary', image: '/signs/Dictionary.png' },
  { text: 'Pen', image: '/signs/Pen.png' },
  { text: 'Paper', image: '/signs/Paper.png' },
  { text: 'Test', image: '/signs/Test.png' },
  { text: 'Draw', image: '/signs/Draw.png' },
  { text: 'Spectacles', image: '/signs/Spectacles.png' },
  { text: 'Share', image: '/signs/Share.png' },
  { text: 'Find', image: '/signs/Find.png' },
  { text: 'Start', image: '/signs/Start.png' },
  { text: 'First', image: '/signs/First.png' }
];

export const emergencyData = [
  { text: 'Fire', image: '/signs/Fire.png' },
  { text: 'Police', image: '/signs/Police.png' },
  { text: 'Emergency', image: '/signs/Emergency.png' },
  { text: 'Call', image: '/signs/Call.png' },
  { text: 'Danger (Be Careful)', image: '/signs/Be Careful.png' }
];

export const familyData = [
  { text: 'Family', image: '/signs/family.jpeg' },
  { text: 'Mother', image: '/signs/Mother.png' },
  { text: 'Father', image: '/signs/Father.png' },
  { text: 'Mom', image: '/signs/mom.jpeg' },
  { text: 'Dad', image: '/signs/Dad.jpeg' },
  { text: 'Brother', image: '/signs/Brother.png' },
  { text: 'Sister', image: '/signs/Sister.jpeg' },
  { text: 'Grandfather', image: '/signs/Grandfather.jpeg' },
  { text: 'Grandmother', image: '/signs/Grandmother.jpeg' },
  { text: 'Friend', image: '/signs/Friend.png' },
  { text: 'Friends', image: '/signs/Friends.png' }
];

export const actionsData = [
  { text: 'Eat', image: '/signs/Eat.png' },
  { text: 'Drink', image: '/signs/Drink.png' },
  { text: 'Sleep', image: '/signs/Sleep.png' },
  { text: 'Walk', image: '/signs/Walk.png' },
  { text: 'Go', image: '/signs/Go.png' },
  { text: 'Come', image: '/signs/Come.png' },
  { text: 'Drive', image: '/signs/Drive.png' },
  { text: 'Dance', image: '/signs/Dance.jpeg' },
  { text: 'Sing', image: '/signs/Sing.jpeg' },
  { text: 'Open', image: '/signs/Open.png' },
  { text: 'Close', image: '/signs/Close.png' },
  { text: 'Live', image: '/signs/Live.png' },
  { text: 'Remember', image: '/signs/Remember.jpeg' },
  { text: 'Lifting', image: '/signs/Lifting.jpeg' },
  { text: 'Over', image: '/signs/Over.jpeg' }
];

export const emotionsData = [
  { text: 'Anger', image: '/signs/Anger.jpeg' },
  { text: 'Anxious', image: '/signs/Anxious.jpeg' },
  { text: 'Ashamed', image: '/signs/Ashamed.jpeg' },
  { text: 'Cheerful', image: '/signs/Cheerfull.jpeg' },
  { text: 'Dreamy', image: '/signs/Dreamy.jpeg' },
  { text: 'Excited', image: '/signs/Excited.jpeg' },
  { text: 'Gloomy', image: '/signs/Gloomy.jpeg' },
  { text: 'Grateful', image: '/signs/Greetfull.jpeg' },
  { text: 'Relaxed', image: '/signs/Relaxed.jpeg' },
  { text: 'Satisfied', image: '/signs/Satisfied.jpeg' },
  { text: 'Scared', image: '/signs/Scared.jpeg' }
];

export const travelData = [
  { text: 'Airplane', image: '/signs/Airplane.png' },
  { text: 'Bus', image: '/signs/Bus.png' },
  { text: 'Train', image: '/signs/Train.png' },
  { text: 'Travel', image: '/signs/Travel.png' },
  { text: 'Map', image: '/signs/Map.png' },
  { text: 'Bag', image: '/signs/Bag.png' },
  { text: 'Along', image: '/signs/Along.png' },
  { text: 'Bathroom', image: '/signs/Bathroom.png' }
];

export const objectsData = [
  { text: 'Food', image: '/signs/food.png' },
  { text: 'Water', image: '/signs/Water.jpg' },
  { text: 'Home', image: '/signs/home.png' },
  { text: 'Money', image: '/signs/Money.png' },
  { text: 'Bottle', image: '/signs/Bottle.jpeg' },
  { text: 'Chocolate', image: '/signs/Choclate.jpeg' },
  { text: 'Gloves', image: '/signs/Gloves.jpeg' }
];

export const pronounsData = [
  { text: 'I', image: '/signs/I.png' },
  { text: 'You', image: '/signs/You.png' },
  { text: 'Me', image: '/signs/me.jpeg' },
  { text: 'My', image: '/signs/My.png' },
  { text: 'Your', image: '/signs/Your.png' },
  { text: 'We', image: '/signs/We.jpeg' },
  { text: 'They', image: '/signs/They.jpeg' },
  { text: 'She', image: '/signs/She.jpeg' },
  { text: 'Everyone', image: '/signs/Everyone.jpeg' },
  { text: 'This', image: '/signs/This.jpeg' },
  { text: 'That', image: '/signs/That.jpeg' },
  { text: 'These', image: '/signs/These.jpeg' },
  { text: 'You All', image: '/signs/You all.jpeg' },
  { text: 'Am', image: '/signs/Am.png' },
  { text: 'Is', image: '/signs/Is.png' },
  { text: 'Are', image: '/signs/Are.png' },
  { text: 'Can', image: '/signs/Can.png' }
];
