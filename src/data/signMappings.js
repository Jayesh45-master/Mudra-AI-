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
  { text: 'Morning', image: '/signs/Morning.png' },
  { text: 'Night', image: '/signs/Night.png' },
  { text: 'How', image: '/signs/How.png' },
  { text: 'Welcome', image: '/signs/Welcome.png' }
];

export const commonPhrasesData = [
  { text: 'Thank You', image: '/signs/Thankyou.png' },
  { text: 'Help', image: '/signs/Help.png' },
  { text: 'Yes', image: '/signs/Yes.png' },
  { text: 'No', image: '/signs/No.png' },
  { text: 'Please', image: '/signs/Please.png' },
  { text: 'Sorry', image: '/signs/Sorry.png' }
];

export const healthcareData = [
  { text: 'Doctor', image: '/signs/Doctor.png' },
  { text: 'Hospital', image: '/signs/Hospital.png' },
  { text: 'Medicine', image: '/signs/Medicine.png' },
  { text: 'Pain', image: '/signs/Pain.png' },
  { text: 'Ambulance', image: '/signs/Ambulance.png' }
];

export const educationData = [
  { text: 'School', image: '/signs/School.png' },
  { text: 'Teacher', image: '/signs/Teacher.png' },
  { text: 'Book', image: '/signs/Book.png' },
  { text: 'Read', image: '/signs/Read.png' },
  { text: 'Homework', image: '/signs/Homework.png' }
];

export const emergencyData = [
  { text: 'Fire', image: '/signs/Fire.png' },
  { text: 'Police', image: '/signs/Police.png' },
  { text: 'Emergency', image: '/signs/Emergency.png' },
  { text: 'Call', image: '/signs/Call.png' }
];
