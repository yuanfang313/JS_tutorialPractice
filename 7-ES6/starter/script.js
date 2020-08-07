// lecture: let and const

// // ES5
// var name5 = 'Jane Smith';
// var age5 = 23;
// name5 = 'Jane Miller';
// console.log(name5);

// // ES6
// const name6 = 'Jane Smith';
// let age6 = 23;
// name6 = 'Jane Miller';
// console.log(name6);

// variables declared with "var" in ES5 are function-scoped
// varialbles declared with "let" and "const" in ES6 are block-scoped

// ES5
// function driversLicence5(passedTest) {

//   if(passedTest) {
//     console.log(firstName + 'born in' + yearOfBirth + ', is now officially allowed to drive a car.');
//     var firstName = 'John';
//     var yearOfBirth = 1990;
//   }
//   console.log(firstName + 'born in' + yearOfBirth + ', is now officially allowed to drive a car.');
// }

// driversLicence5(true);

// ES6
// can't define a constant inside a block, and use it outside a block
// function driversLicence6(passedTest) {

//   let firstName;
//   const yearOfBirth = 1990;

//   if(passedTest) {

//   firstName = 'John';
//   }
//   console.log(firstName + 'born in' + yearOfBirth + ', is now officially allowed to drive a car.');
// }

// driversLicence6(true);


// let i = 23;
// for (let i = 0; i < 5; i++) {
//   console.log(i);
// }
// console.log(i);

// lecture: Block and IIFEs
// {
//   const a = 1;
//   let b = 2;
//   var c = 3

// }

//console.log(c);

// lecture: strings

// let firstName = 'john';
// let lastName = 'Smith';
// const yearOfBirth = 1990;

// function calcAge(year) {
//   return 2016 - year;
// }

// // ES5
// console.log('This is'+ firstName + ' ' + lastName + '. He was born in ' + yearOfBirth + '. Today, he is ' + calcAge(yearOfBirth) + ' years old.');

// // ES6
// console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}. Today, he is ${calcAge(yearOfBirth)} years old.`)

// const n = `${firstName} ${lastName}`;

// console.log(n.startsWith('j'));

// // lecture: Arrow functions

// const years = [1990, 1965, 1982, 1937];

// // ES5
// var ages5 = years.map(function(el) {
//   return 2016 - el;
// });

// console.log(ages5);

// // ES6
// let ages6 = years.map(el => 2016 - el);
// console.log(ages6);

// ages6 = years.map((el,index) => `Age element ${index + 1}: ${2016 - el}.`);
// console.log(ages6);

// ages6 = years.map((el, index) => {
//   const now = new Date().getFullYear();
//   const age = now - el;
//   return `Age element ${index + 1}: ${age}.`
// });
// console.log(ages6);

// lecture: Arrow functions 2

// ES5
// var box5 = {
//   color: 'green',
//   position: 1,
//   clickMe: function() {
//     var self = this;
//     document.querySelector('.green').addEventListener('click', function() {
//       var str = 'This is box number ' + self.position + ' and it is ' + self.color;
//       alert(str);
//     });
//   }
// }
// box5.clickMe();

// ES6
// const box6 = {
//   color: 'green',
//   position: 1,
//   clickMe: function() {
//     var self = this;
//     document.querySelector('.green').addEventListener('click', () => {
//       var str = 'This is box number ' + this.position + ' and it is ' + this.color;
//       alert(str);
//     });
//   }
// }

// box6.clickMe();

//ES5
// function Person(name) {
//   this.name = name;
// }

// Person.prototype.myFriends5 = function(friends) {
  
//   var arr = friends.map(function(el){
//     return this.name + ' is friends with ' + el;
//   }.bind(this));

//   console.log(arr);
// }
// var friends = ['Bob', 'Jane', 'Mark'];
// new Person('John').myFriends5(friends);

//ES6
// function Person(name) {
//   this.name = name;
// }

// Person.prototype.myFriends6 = function(friends) {
  
//   var arr = friends.map( el => {
//     return `${this.name} is friends with ${el}`;
//   });

//   console.log(arr);
// }
// var friends = ['Bob', 'Jane', 'Mark'];
// new Person('Mike').myFriends6(friends);

// Lecture: Destructuring

// Lecture: Arrays
 
const boxes = document.querySelectorAll('.box');

const boxesArr6 = Array.from(boxes);
boxesArr6.forEach(cur => cur.style.backgroundColor = 'dodgerblue');
/*
// ES5
for(var i = 0; i < boxes.length; i++) {
  if(boxes[i].className === 'box blue'){
    continue;
  }
  boxes[i].textContent = 'I changed to blue!';
}
*/
// for (const cur of boxesArr6) {
//   if(cur.className.includes('blue')){
//     continue;
//   }
//   cur.textContent = 'I changed to blue!';
// }

// // ES5
// var ages = [12, 17, 8,21, 14, 11];

// var full = ages.map(function(cur){
//  return cur >= 18;
// });
// console.log(full);

// console.log(full.indexOf(true));
// console.log(ages[full.indexOf(true)]);

// // ES6
// console.log(ages.findIndex(cur => cur >= 18));
// console.log(ages.find(cur => cur >= 18));

// Lecture: Spread operator

















