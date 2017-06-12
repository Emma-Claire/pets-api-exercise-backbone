import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';

import PetView from './pet_view';

var PetListView = Backbone.View.extend({
  initialize: function(options) {
    // Compile a template to be shared between the individual tasks
    this.petTemplate = _.template($('#pet-card-template').html());

    // Keep track of the <ul> element
    this.listElement = this.$('li');

    // We'll keep track of a list of task models and a list
    // of task views.
    this.cardList = [];

    this.model.forEach(function(rawPet) {
      this.addPet(rawPet);
    }, this); // bind `this` so it's available inside forEach

  },

   render: function() {
     // Make sure the list in the DOM is empty
     // before we start appending items
     this.listElement.empty();

     // Loop through the data assigned to this view
     this.cardList.forEach(function(card) {
       // Cause the task to render
       card.render();

       // Add that HTML to our task list
       this.listElement.append(card.$el);
     }, this);

     return this; // enable chained calls
   },

   events: {
     'submit .new-task': 'createTask',
     'click .clear-button': 'clearInput'
   },

   createPet: function(event) {
     event.preventDefault();

     // Get the input data from the form and turn it into a task
     var rawPet = this.getInput();

     // Add the task to our collection
     this.model.add(rawPet);

     // Clear the input form so the user can add another task
     this.clearInput();
   },

   // Turn a raw task into a Task model, add it to our list of tasks,
   // create a card for it, and add that card to our list of cards.
   addPet: function(pet) {
     // Create a card for the new task
     var card = new PetView({
       model: pet,
       template: this.petTemplate
     });

     this.listenTo(card, 'edit', this.editPet);

     // Add the card to our card list
     this.cardList.push(card);
   },

   editPet: function(pet) {
     console.log('in editPet for pet ' + task.get('name'));

     this.setInput(pet);

     task.destroy();
   },

   removePet: function(pet) {
     var filteredList = [];
     this.cardList.forEach(function(card) {
       if (card.model != pet) {
         filteredList.push(card);
       }
     });
     this.cardList = filteredList;
   },

   getInput: function() {
     var pet = {
       name: this.input.name.val(),
       age: this.input.age.val(),
       breed: this.input.breed.val()
     };
     return pet;
   },

   setInput: function(pet) {
     this.input.name.val(pet.get('name'));
     this.input.age.val(pet.get('age'));
     this.input.breed.val(pet.get('breed'));
   },

   clearInput: function(event) {
     console.log("clearInput called!");
     this.input.name.val('');
     this.input.age.val('');
     this.input.breed.val('');
   }
 });

 export default PetListView;
