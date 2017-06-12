import Backbone from 'backbone';

import Pet from 'app/models/pet';

var PetList = Backbone.Collection.extend({
  model: Pet,
  url: 'https://github.com/AdaGold/pets_api',

  parse: function(data) {
    return data.pets;
  }
});

export default PetList;
