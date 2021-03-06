class Human {
  public name: string;
  public age: number;
  public gender: string;

  constructor(name: string, age: number, gender: string){
    this.name = name;
    this.age = age
    this.gender = gender;
  }
}


const paul = new Human("paul", 31, "male");

const sayHi = (person: Human): string => {
  return `Hello ${person.name}, you are ${person.age} and ${person.gender}!!!`;
};

console.log(sayHi(paul));

export {};