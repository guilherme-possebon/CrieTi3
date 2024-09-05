function makePerson(
  // parametros
  name2: string,
  age2: number,
  email2?: string
): {
  // tipando
  name: string;
  age: number;
  email?: string;
} {
  return {
    name: name2,
    age: age2,
    email: email2,
  };
}
let persons: { name: string; age: number; email?: string }[] = [];
persons.push(makePerson("Eduardo", 43, "email"));
persons.push(makePerson("bastiani", 123));
