//Let's Play Ex1

let x = "Malachi rules";
//alert(x);
console.log(x+"\n");

// -------------------------------- Array of values --------------------------------

/*
Arrays of Objects The above gist has an array of objects. 
Let's write a function that consumes an array of objects and computes the average "age" 
of each object (presume they have an integer "age" attribute). 
Let's do this in 2-5 distinct ways as a way of playing with these ideas. 
How about maximum age? Minimum age? Total age? How about with the fewest characters typed.
*/

let People = [{"age": 33, "name": "Michael"}, {"age": 51, "name": "Christopher"}, {"age": 44, "name": "Jessica"}, {"age": 43, "name": "Matthew"}, {"age": 76, "name": "Ashley"}, {"age": 51, "name": "Jennifer"}, {"age": 46, "name": "Joshua"}, {"age": 58, "name": "Amanda"}, {"age": 50, "name": "Daniel"}, {"age": 49, "name": "David"}, {"age": 57, "name": "James"}, {"age": 51, "name": "Robert"}, {"age": 55, "name": "John"}, {"age": 54, "name": "Joseph"}, {"age": 47, "name": "Andrew"}, {"age": 38, "name": "Ryan"}, {"age": 28, "name": "Brandon"}, {"age": 71, "name": "Jason"}, {"age": 37, "name": "Justin"}, {"age": 41, "name": "Sarah"}, {"age": 35, "name": "William"}, {"age": 35, "name": "Jonathan"}, {"age": 46, "name": "Stephanie"}, {"age": 24, "name": "Brian"}, {"age": 32, "name": "Nicole"}, {"age": 38, "name": "Nicholas"}, {"age": 58, "name": "Anthony"}, {"age": 42, "name": "Heather"}, {"age": 30, "name": "Eric"}, {"age": 38, "name": "Elizabeth"}, {"age": 61, "name": "Adam"}, {"age": 44, "name": "Megan"}, {"age": 59, "name": "Melissa"}, {"age": 58, "name": "Kevin"}, {"age": 57, "name": "Steven"}, {"age": 31, "name": "Thomas"}, {"age": 52, "name": "Timothy"}, {"age": 62, "name": "Christina"}, {"age": 36, "name": "Kyle"}, {"age": 62, "name": "Rachel"}, {"age": 55, "name": "Laura"}, {"age": 26, "name": "Lauren"}, {"age": 49, "name": "Amber"}, {"age": 54, "name": "Brittany"}, {"age": 50, "name": "Danielle"}, {"age": 28, "name": "Richard"}, {"age": 52, "name": "Kimberly"}, {"age": 47, "name": "Jeffrey"}, {"age": 62, "name": "Amy"}, {"age": 50, "name": "Crystal"}, {"age": 35, "name": "Michelle"}, {"age": 61, "name": "Tiffany"}, {"age": 45, "name": "Jeremy"}, {"age": 41, "name": "Benjamin"}, {"age": 42, "name": "Mark"}, {"age": 41, "name": "Emily"}, {"age": 51, "name": "Aaron"}, {"age": 30, "name": "Charles"}, {"age": 74, "name": "Rebecca"}, {"age": 76, "name": "Jacob"}, {"age": 58, "name": "Stephen"}, {"age": 65, "name": "Patrick"}, {"age": 24, "name": "Sean"}, {"age": 8, "name": "Erin"}, {"age": 41, "name": "Zachary"}, {"age": 69, "name": "Jamie"}, {"age": 28, "name": "Kelly"}, {"age": 38, "name": "Samantha"}, {"age": 39, "name": "Nathan"}, {"age": 53, "name": "Sara"}, {"age": 29, "name": "Dustin"}, {"age": 57, "name": "Paul"}, {"age": 67, "name": "Angela"}, {"age": 65, "name": "Tyler"}, {"age": 44, "name": "Scott"}, {"age": 45, "name": "Katherine"}, {"age": 56, "name": "Andrea"}, {"age": 38, "name": "Gregory"}, {"age": 6, "name": "Erica"}, {"age": 6, "name": "Mary"}, {"age": 31, "name": "Travis"}, {"age": 17, "name": "Lisa"}, {"age": 51, "name": "Kenneth"}, {"age": 80, "name": "Bryan"}, {"age": 70, "name": "Lindsey"}, {"age": 46, "name": "Kristen"}, {"age": 32, "name": "Jose"}, {"age": 35, "name": "Alexander"}, {"age": 51, "name": "Jesse"}, {"age": 29, "name": "Katie"}, {"age": 49, "name": "Lindsay"}, {"age": 47, "name": "Shannon"}, {"age": 43, "name": "Vanessa"}, {"age": 44, "name": "Courtney"}, {"age": 55, "name": "Christine"}, {"age": 45, "name": "Alicia"}, {"age": 71, "name": "Cody"}, {"age": 54, "name": "Allison"}, {"age": 51, "name": "Bradley"}, {"age": 73, "name": "Samuel"}]

console.log("Average Age Problem")

function avgAge(arrOfPeople){
    let ages = [];
    for (var i in arrOfPeople){
        ages.push(arrOfPeople[i].age);
    }//for
    sum = 0;
    for(var i in ages){
        sum += ages[i];
    }//for
    console.log("Avg age: " + (sum/ages.length) + "\n");
}

avgAge(People);

console.log("Maximum Age Problem")

function maxAge(arrOfPeople){
    let ages = [];
    var maxAge = 0;
    for (var i in arrOfPeople){
        ages.push(arrOfPeople[i].age);
    }//for
    for (var j in ages){
        if(maxAge < ages[j]){
            maxAge = ages[j];
        }// if
    }//for
    console.log("Max Age: " + maxAge + "\n");
}

maxAge(People);

console.log("Minimum Age Problem")

function minAge(arrOfPeople){
    let ages = [];
    var minAge = 1000;
    for (var i in arrOfPeople){
        ages.push(arrOfPeople[i].age);
    }//for
    for (var j in ages){
        if(minAge > ages[j]){
            minAge = ages[j];
        }// if
    }//for
    console.log("Min Age: " + minAge + "\n");
}

minAge(People);

console.log("Total Age Problem")

function totalAge(arrOfPeople){
    let ages = [];
    for (var i in arrOfPeople){
        ages.push(arrOfPeople[i].age);
    }//for
    sum = 0;
    for(var i in ages){
        sum += ages[i];
    }//for
    console.log("Total age: " + sum + "\n");
}

totalAge(People);

console.log("Minimum Character Problem")

// test to see if can take length of elements
var ageStr = People[0].age.toString().length;
console.log("Length of Person Age: " + ageStr);
console.log("Length of Person Name: " + People[0].name.length);

function minChars(arrPerson){
    
}

/*
function leastChars(arrPeople){
    let personCharLength = [];
    for(var person in People){

    }//for
}
*/