///////////////////////////////////////
// Lecture: Hoisting

// calculateAge(1965);
// //retirement(1990);

// function calculateAge(year){
//     console.log(2016 - year);
// };

// var retirement = function(year){
//     console.log(65 - (2016 - year));
// }

// //variables
// console.log(age);
// var age = 23;
// console.log(age);

// function food() {
//     var age = 65;
//     console.log(age);
// }
// food();
// console.log(age);


///////////////////////////////////////
// Lecture: Scoping


// First scoping example

  
// var a = 'Hello!';
// first();

// function first() {
//     var b = 'Hi!';
//     second();

//     function second() {
//         var c = 'Hey!';
//         console.log(a + b + c);
//     }
// }




// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
*/



///////////////////////////////////////
// Lecture: The this keyword

//console.log(this);
function calculateAge(year) {
    console.log(2016-year);
    console.log(this);
}

var john = {
    name: 'John',
    yearOfBirth: 1990,
    calculateAge: function() {
        console.log(this);
        console.log(2020 - this.yearOfBirth);
         /*
        function innerFunction(){
            console.log(this);
        }
        innerFunction(); */
    }
}

john.calculateAge();

var Mike = {
    name: 'Mike',
    yearOfBirth: 1978
}


Mike.calculateAge = john.calculateAge;
Mike.calculateAge();
