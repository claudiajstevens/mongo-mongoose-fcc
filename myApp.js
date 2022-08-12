require('dotenv').config();
const mongoose = require('mongoose');
const mySecret = process.env['MONGO_URI']

mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology: true });


//Now, create a model called Person from the personSchema.
let personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
})

let Person = mongoose.model('Person', personSchema);;

/*Within the createAndSavePerson function, create a document instance using the Person model constructor you built before. Pass to the constructor an object having the fields name, age, and favoriteFoods. Their types must conform to the ones in the personSchema. Then, call the method document.save() on the returned document instance. Pass to it a callback using the Node convention. This is a common pattern; all the following CRUD methods take a callback function like this as the last argument.*/
const createAndSavePerson = (done) => {
  let claudia = new Person({
    name: 'Claudia',
    age: 26,
    favoriteFoods: ['Ice cream', 'Waffles']
  });
  
  claudia.save(function(err, data) {
    if(err){
      return console.error(err);
    }
    done(null , data);
  });
  
};

let arrayOfPeople = [
  {name: 'Miranda', age: 27, favoriteFoods: ['Mac N Cheese']},
  {name: 'Nick', age: 29, favoriteFoods: ['Cheese', 'Sun Flower Seeds']},
  {name: 'Julia', age: 28, favoriteFoods: ['In N Out', 'Jack in the Box']}
]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, people){
    if(err){
      return console.error(err);
    }
    done(null, people);
  });
};

/*Modify the findPeopleByName function to find all the people having a given name, using Model.find() -> [Person]

Use the function argument personName as the search key.*/
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, person){
    if(err){
      return console.error(err);
    }
    done(null, person);
  });
};

/*Modify the findOneByFood function to find just one person which has a certain food in the person's favorites, using Model.findOne() -> Person. Use the function argument food as search key.*/
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, data){
    if(err){
      return console.error(err);
    }
    done(null, data);
  });
};

/*Modify the findPersonById to find the only person having a given _id, using Model.findById() -> Person. Use the function argument personId as the search key.*/
const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, data){
    if(err){
      return console.error(err);
    }
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
