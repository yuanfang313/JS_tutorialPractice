/***********************************
 CONDING CHALLENGE 1
 */
console.log("Hello world!")
var massMark = 60; // kg
var heightMark = 1.75; // meter

var massJohn = 70;
var heightJohn = 1.80;

function calBMI(mass, height){
  var BMI;
  BMI = mass/ (height * height);
  return BMI
}

var BMI_Mark = calBMI(massMark, heightMark);
var BMI_John = calBMI(massJohn, heightJohn);

var BMI_M_higher = BMI_Mark > BMI_John;

// if(BMI_Mark > BMI_John){
//   BMI_M_higher = true;
// } else {
//   BMI_M_higher = false;
// }

console.log(`Mark's BMI is higher than John's. ${BMI_M_higher}`);  

/***********************************
 CONDING CHALLENGE 2
 */

// var game1_Jhon = 89;
// var game2_Jhon = 120;
// var game3_Jhon = 103;

// var game1_Mike = 116;
// var game2_Mike = 94;
// var game3_Mike = 123;

var John = {
  game1: 89,
  game2: 120,
  game3: 103
}

var Mike = {
  game1: 116,
  game2: 94,
  game3: 123
}

var Marry = {
  game1: 97,
  game2: 134,
  game3: 105
}

function avgScores(game1, game2, game3){
  var scores = (game1 + game2 + game3)/3;
  return scores;
}

var avgJohn = avgScores(John.game1, John.game2, John.game3);
//console.log(`John's average score is ${avgJohn}.`);

var avgMike = avgScores(Mike.game1, Mike.game2, Mike.game3);
var avgMarry = avgScores(Marry.game1, Marry.game2, Marry.game3);

var avgArray = [avgJohn, avgMike, avgMarry];

avgArray.sort(function(x,y){
  return y-x
});

console.log(avgArray);
if(avgArray[0] === avgJohn){
console.log(`John is the winner, and his average score is ${avgJohn}`);
} else if (avgArray[0] === avgMike) {
console.log(`Mike is the winner, and his average score is ${avgMike}`);
} else {
console.log(`Mike is the winner, and his average score is ${avgMarry}`);
}

/***********************************
 CONDING CHALLENGE 3
 */

var tip = function(bill){
  switch(true){
    case bill < 50:
      return bill*0.2;
    case bill >= 50 && bill < 200:
      return bill*0.15;
    case bill >= 200:
      return bill*0.1;
    default:
  }
}

var tipArray = [tip(124), tip(48), tip(268)];
console.log(tipArray);

var amount = function(bill){
  var paid = tip(bill) + bill;
  return paid;
}

var amountArray = [amount(124), amount(48), amount(268)];
console.log(amountArray);

/***********************************
 CONDING CHALLENGE 4
 */

 var John = {
   fullName: "John Smith",
   mass: 60,
   height: 1.7,
   calBMI: function(){
     this.BMI = this.mass/ (this.height * this.height);
     return this.BMI;
   }
 };

 var Mike = {
  fullName: "Mike Smith",
  mass: 70,
  height: 1.81,
  calBMI: function(){
    this.BMI = this.mass/ (this.height * this.height);
    return this.BMI
  } 
};

John.calBMI();
Mike.calBMI();
console.log(John.BMI, Mike.BMI);
console.log(John, Mike);









