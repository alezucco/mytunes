// SongQueueView.js - Defines a backbone view class for the song queue.
var SongQueueView = Backbone.View.extend({

  tagName: "table",

  initialize: function() {
    console.log('Initializing queue view');
    this.render();
    this.collection.on('add', function(){
    this.render();
    }, this);
    this.collection.on('remove', function(){
    this.render();
    }, this);
  },
  // events:{
  //   'change:lastAdded':function(){
  //     return new SongQueueEntryView(model:this.get('lastAdded'));
  //   }
  // },


  render: function() {
    this.$el.children().detach();
    this.$el.html('<th>Song Queue</th>').append(

      this.collection.map(function(song){
        return new SongQueueEntryView({model: song}).render();
      })
    );
  }

});
