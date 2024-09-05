let grades: number[] = [70, 80, 65, 40, 80];
let lowerGrade: number = grades[0];
let higherGrade: number = grades[0];
grades.forEach(function (grade) {
  if (lowerGrade > grade) {
    lowerGrade = grade;
  }
  if (higherGrade < grade) {
    higherGrade = grade;
  }
});
console.log("Maior nota: " + higherGrade);
console.log("Menor nota: " + lowerGrade);
