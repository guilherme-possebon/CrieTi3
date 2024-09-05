let grades: number[] = [70, 80, 65, 40, 80];
function calculaMedia(grades: number[]) {
  let soma: number = 0;

  for (let i = 0; i < grades.length; i++) {
    soma += grades[i];
  }

  let media: number = soma / grades.length;
  return media;
}
console.log("A media é: " + calculaMedia(grades));
