import Backbone from 'backbone';

var Pet = Backbone.Model.extend({
  defaults: {
    name: "Avvo",
    age: 5,
    breed: "Husky",
    vaccinated: false
  },
  initialize: function(options) {
    console.log("Created new pet with options " + this.options);
  },
  toggleComplete: function() {
    var newStatus = !(this.get('complete'));
    this.set('complete', newStatus);
    this.save();
  }
});


export default Pet;
