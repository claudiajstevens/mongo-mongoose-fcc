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


  /*Modify the findEditThenSave function to find a person by _id (use any of the above methods) with the parameter personId as search key. Add "hamburger" to the list of the person's favoriteFoods (you can use Array.push()). Then - inside the find callback - save() the updated Person.

Note: This may be tricky, if in your Schema, you declared favoriteFoods as an Array, without specifying the type (i.e. [String]). In that case, favoriteFoods defaults to Mixed type, and you have to manually mark it as edited using document.markModified('edited-field'). See our Mongoose article.*/
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function(err, person){
    if(err){
      return console.error(err);
    }
    
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  });
};

/*Modify the findAndUpdate function to find a person by Name and set the person's age to 20. Use the function parameter personName as the search key.

Note: You should return the updated document. To do that, you need to pass the options document { new: true } as the 3rd argument to findOneAndUpdate(). By default, these methods return the unmodified object.*/
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOne({name: personName}, function(err, person){
    if(err){
      return console.error(err);
    }

    person.age = ageToSet;
    person.save((err, updatedPerson) => {
      if(err){
        return console.log(err);
      }
      done(null, updatedPerson, {new: true});
    })
  });
};

/*Modify the removeById function to delete one person by the person's _id. You should use one of the methods findByIdAndRemove() or findOneAndRemove().*/
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function(err, person){
    if(err){
      return console.error(err);
    }
    done(null, person);
  });
};

/*Modify the removeManyPeople function to delete all the people whose name is within the variable nameToRemove, using Model.remove(). Pass it to a query document with the name field set, and a callback.

Note: The Model.remove() doesn’t return the deleted document, but a JSON object containing the outcome of the operation, and the number of items affected. Don’t forget to pass it to the done() callback, since we use it in tests.*/
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, function(err, removedData){
    if(err){
      return console.error(err);
    }
    done(null, removedData);
  });
};


/*Modify the queryChain function to find people who like the food specified by the variable named foodToSearch. Sort them by name, limit the results to two documents, and hide their age. Chain .find(), .sort(), .limit(), .select(), and then .exec(). Pass the done(err, data) callback to exec().*/
const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
    .sort({name: 'asc'})
    .limit(2)
    .select({"age":0})
    .exec(function(err, data){
    if(err){
      return console.error(err);
    }
    done(null, data);
  });
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
