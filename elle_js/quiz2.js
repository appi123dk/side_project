// Q1. make a string out of an array
{
  const fruits = ['apple', 'banana', 'orange'];
  const stringFruits = fruits.join(",");
  console.log(stringFruits);
}

// Q2. make an array out of a string
{
  const fruits = '🍎, 🥝, 🍌, 🍒';
  const arrayFruits = fruits.split(",");
  console.log(arrayFruits);
}

// Q3. make this array look like this: [5, 4, 3, 2, 1]
{
  const array = [1, 2, 3, 4, 5];
  const reverseArray = array.reverse()
  console.log(reverseArray);
}

// Q4. make new array without the first two elements
{
  const array = [1, 2, 3, 4, 5];
  // const newArray = array.splice(2,5);
  const newArray = array.slice(2,5);
  console.log(newArray);
}

class Student {
constructor(name, age, enrolled, score) {
  this.name = name;
  this.age = age;
  this.enrolled = enrolled;
  this.score = score;
}
}
const students = [
  new Student('A', 29, true, 45),
  new Student('B', 28, false, 80),
  new Student('C', 30, true, 90),
  new Student('D', 40, false, 66),
  new Student('E', 18, true, 88),
];



// Q5. find a student with the score 90
{
  function printStudentName(student) {
      console.log(`90점 이상인 학생은 ${student.name}입니다.`);
  }
  const searchScore = 90;
  const studentWithScore = students.find(student => student.score === searchScore);   

  console.log(studentWithScore);
  
  // arrStudentsWithScore.forEach(printStudentName);
}

// Q6. make an array of enrolled students
{
  function printStudentName(student) {
      console.log(`등록한 학생은 ${student.name}입니다.`);
  }
  const enrolledStudents = students.filter(student => student.enrolled);   

  enrolledStudents.forEach(printStudentName);
}

// Q7. make an array containing only the students' scores
// result should be: [45, 80, 90, 66, 88]
{
  const scores = students.map(student => student.score);
  // students.forEach(student => scores.push(student.score));
  

  console.log(scores);
}

// Q8. check if there is a student with the score lower than 50
{
  function checkLowerThanFifty(student) {
      if (student.score < 50) {
          return true 
      } else {
          return false
      };
  }

  // console.log(students.some(checkLowerThanFifty));
  const result = students.some(student => student.score < 50);
  console.log(result);

}

// Q9. compute students' average score
{
  const scores = students.map(student => student.score);

  function sum(scores) {
      
      const result = scores.reduce((prev, curr) => {
          return prev + curr;
      }, 0);

      return result;
  }

  function average(scores) {
      const numerator = sum(scores);
      const denominator = scores.length;

      return numerator/denominator;
  }

  console.log(average(scores));
}

// Q10. make a string containing all the scores
// result should be: '45, 80, 90, 66, 88'
{
  // const scores = students.map(student => student.score);
  // console.log(scores.join(', '));

  const result = students
      .map(student => student.score)
      .filter(score => score >= 50)
      .join(', ')

  console.log(result);
}

// Bonus! do Q10 sorted in ascending order
// result should be: '45, 66, 80, 88, 90'
{
  const scores = students
      .map(student => student.score)
      .sort((a, b) => a - b)

  console.log(scores);

}