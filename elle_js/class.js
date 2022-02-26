'use strict';

// Class : template
// Object : instance of a class
// ES6에 들어와 생긴 Class. 이전에는 Object만으로 진행 


// 1. Class basic
class Person {
    // constructor
    constructor(name,age) {
        this.name = name;
        this.age = age;
    }

    // method
    speak(){
        console.log(`${this.name}: hello`);
    }
}

const paul = new Person('paul', 20);
console.log(paul.name);

paul.speak();


// 2. getter and setter
class User {
    constructor(firstName, lastName, age){
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }

    get age(){
        return this._age;
    }

    set age(value){
        this._age = value < 0 ? 0 : value;
    }

}

const user1 = new User('steve', 'jobs', -23);
console.log(user1.age);


// 3. private & public 
// 최근에 추가된 문법, 지원되지 않는 브라우저도 많음 
class Experiment {
    publicField = 2;
    #privateField = 0;
}

const experiment = new Experiment();
console.log(experiment.publicField);
console.log(experiment.privateField);


// 4. static properties and methods
// 최근에 추가된 문법, 지원되지 않는 브라우저도 많음 

class Article {
    static token = "dfjk1j2kjfiekf";
    constructor(articleNumber){
        this.articleNumber = articleNumber;
    }   

    static printToken(){
        console.log(Article.token);
    }
}

const article1 = new Article(1);
console.log(article1.articleNumber);
console.log(Article.token);
Article.printToken();

// 5. Inheritance

class Shape {
  constructor(width, height, color){
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw(){
    console.log(`drawing ${this.color} color of`)
  }

  getArea(){
    return this.width * this.height;
  }

}

class Rectangle extends Shape {}
class Triangle extends Shape {
  draw(){
    super.draw();
    console.log(`it's triangle`);
  }
  getArea(){
    return this.width * this.height / 2;
  }
}

const rectangle = new Rectangle(20, 20, 'blue');
const triangle = new Triangle(20, 20, 'yellow');

rectangle.draw();
triangle.draw();
console.log(rectangle.getArea());
console.log(triangle.getArea());

// 4. Class checking: instanceOf
console.log(rectangle instanceof Rectangle);