

// var john = {
//   name:'John',
//   yearOfBirth: 1990,
//   job: 'teacher'
// };

// var Person = function(name, yearOfBirth, job){
//   this.name = name;
//   this.yearOfBirth = yearOfBirth;
//   this.job = job;
// }
// Person.prototype.lastName = 'Smith';

// Person.prototype.calculateAge = function(){
//   console.log(2020 - this.yearOfBirth);
// }

// var john = new Person('John', 1990, 'teacher');
// var jane = new Person('Jane', 1969, 'designer');
// var mark = new Person('Mark', 1948, 'retrired');

// john.calculateAge();
// jane.calculateAge();
// mark.calculateAge();

// console.log(john.lastName);
// console.log(jane.lastName);
// console.log(mark.lastName);


//Object.create

// var personProto = {
//   calculateAge: function(){
//     console.log(2020 - yearofBirth);
//   },
//   lastName: 'Smith'
// }

// var john = Object.create(personProto);
// john.name = 'John';
// john.yearofBirth = '1990';
// john.job = 'teacher';

// var jane = Object.create(personProto,
//   {
//     name: {value: 'Jane'},
//     yearofBirth: {value: '1969'},
//     job: {value: 'designer'}
//   });

// var Cube = function(r){
//   this.r = r;
//   };

// Cube.prototype.getV = function(){
//   return this.r * this.r;
// }
// Cube.prototype.getS = function(){
//   return 6 * this.r *this.r;
// }
// var cube = new Cube(3);

// console.log(cube);
// console.log(cube.r);

// var v = cube.getV();
// var s = cube.getS();

// console.log(v);
// console.log(s);


// Primitives vs object

// var a = 23;
// var b = a;
// a = 46
// console.log(a);
// console.log(b);

// var obj1 = {
//   name: 'John',
//   age: '26'
// };
// var obj2 = obj1;
// obj2.age = 30;
// console.log(obj1.age);
// console.log(obj2.age);

// // Functions
// var age = 27;
// var obj = {
//   name: 'Jonas',
//   city: 'Lisbon'
// };

// // when we pass a variable to a function, a simple copy is created
// function change(a, b){
//   a = 30;
//   b.city = 'San Francisco';
// }

// change(age, obj);

// console.log(age);
// console.log(obj.city);

///////////////////////////// passing function as arguments
// first class function
// var years = [1990, 1965, 1937, 2005, 1998];

// function arrayCalc(arr, fn){
//   var arrRes = [];
//   for (var i = 0; i < arr.length; i++){
//     arrRes.push(fn(arr[i]));
//   }
//   return arrRes;
// }

// function calculateAge(el){
//   return 2020 - el;
// }

// function isFullAge(el){
//   return el >=18;
// }

// var ages = arrayCalc(years, calculateAge);
// var fullAges = arrayCalc(ages, isFullAge);
// console.log(ages);
// console.log(fullAges);

///////////////////////////// function return functions

// function animalQuestions(ani){
//   if(ani === 'fish'){
//     return function(fishName){
//       console.log(fishName + ' can swim!');
//     };
//   } else if (ani === 'bird'){
//     return function(birdName){
//       console.log(birdName + ' can fly!');
//     };
//   } else {
//     return function(aniName){
//       console.log('What do you want to know ' + aniName + ' ?');
//     };
//   }
// }

// var fishQuestion = animalQuestions('fish');
// fishQuestion('Jolly fish');

// animalQuestions('bird')('Harry Potter');


///////////////////////////////////////// closures

// function intervewQuestion(job){

//   var a = ", why do you want to be a "
//   return function(name){
//     if(job === 'designer'){
//       console.log(name + a + job + '?' + ' What do you think is UX design?');
//     } else if (job === 'teacher'){
//       console.log(name + a + job + '?' + ' What subject do you want to teach?');
//     } else {
//       console.log(name + ', how are you?');
//     }
//   };
// }



// var questionForDesigner = intervewQuestion('designer');
// questionForDesigner('John');
// var questionForTeacher = intervewQuestion('teacher');
// questionForTeacher('Marry');

///////////////////////////////////////// Bind, Call and Apply

// var john = {
//   name: 'John',
//   age: 26,
//   job: 'teacher',
//   presentation: function(style, timeOfDay){
//     if (style === 'formal'){
//       console.log('Good ' + timeOfDay + ', ladies and gentlemen! I\'m ' + this.name + '. I\'m a ' + this.job + '. I\'m ' + this.age + ' years old.');
//     } else if (style === 'friendly'){
//       console.log('Hey! What\'s up! I\'m ' + this.name + '. I\'m a ' + this.job + '. I\'m ' + this.age + ' years old. Have a nice ' + timeOfDay + '!' );
//     }
//   }
// }

// var emily = {
//   name: 'Emily',
//   age: 23,
//   job: 'designer'
// }

// john.presentation('formal', 'morning');
// john.presentation('friendly', 'night');

// john.presentation.call(john,'formal', 'night');

// // apply() accept an array as input (arguments)
// // bind() accept preset argument
// var emilyFormal = john.presentation.bind(emily, 'formal');

// emilyFormal('night');
// emilyFormal('morning');


//////////////////////////////////////////
//coding challenge7

(function stupidQuizApp(){
  var Question = function(questionDesInput, answerInput_0, answerInput_1, answerInput_2, correctAnswerInput){
    this.questionDes = questionDesInput;
    this.answer = [answerInput_0, answerInput_1, answerInput_2];
    this.correctAnswer = correctAnswerInput;
    }
    
    Question.prototype.display = function(){
      // console.log(this.questionDes + '\n' + this.answer[0] + '\n' + this.answer[1] + '\n' + this.answer[2] )
      console.log(this.questionDes);
      for(var i = 0; i < this.answer.length; i++){
      console.log(this.answer[i]);
      }
    }

    var score = 0;
    Question.prototype.checkAnswer = function(answer){
      if(answer === this.correctAnswer){
        console.log('Your answer is correct!!!');
        score ++;
        console.log('Your score is ' + score);
        console.log('-------------------------');
      } else {
        console.log('Your answer is wrong!!!');
        console.log('Your score is ' + score);
        console.log('-------------------------');
      }
    }

    var q1 = new Question();
    q1.questionDes = '001_Is JS the coolest programming language in the world?';
    q1.answer = ['0: Yes', '1: No', '2: I\'m not sure']
    q1.correctAnswer = 0;
    
    var q2 = new Question();
    q2.questionDes = '002_Who is the most beautiful person in the world?';
    q2.answer = ['0: Me', '1: You', '2: Her'];
    q2.correctAnswer = 0;
    
    var q3 = new Question();
    q3.questionDes = '003_Is it raining now?';
    q3.answer = ['0: Yes', '1: NO', '2: I don\'t know!'];
    q3.correctAnswer = 2;
    
    function nextQuestion(){
      var questions = [q1, q2, q3];
      var index = parseInt(Math.random() * 3); 
      questions[index].display();
      var answer = prompt('Please select the correct answer');
      
      if(answer !== 'exit'){
        questions[index].checkAnswer(parseInt(answer));
        nextQuestion();
      }
      
    }

    nextQuestion();
})();





