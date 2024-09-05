let person: {
  name: string;
  lastName: string;
  age: number;
  email: string;
  phone: {
    ddi: string;
    ddd: string;
    number: string;
    type: string;
  };
  hobbies?: string[];
  allname: Function;
} = {
  name: "ASd",
  lastName: "asdas",
  age: 123,
  email: "asdasdasd",
  phone: {
    ddi: "+55",
    ddd: "51",
    number: "asdasd",
    type: "mobile",
  },
  hobbies: ["asdasd", "asdasdasdasdasd", "asdasdasdwasdw"],
  allname: function () {
    return this.name + " " + this.lastName;
  },
};
console.log(person.allname());
