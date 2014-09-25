// SongQueueEntryView.js - Defines a backbone view class for the song queue entries.
var SongQueueEntryView = Backbone.View.extend({
    tagName: 'tr',
    className: 'songs',

  template: _.template('<td>(<%= artist %>)</td><td><%= title %></td>'),
  initialize: function(){
    this.render();
  },
  events: {
    'click': function() {
      this.model.dequeue();
    }
  },

  render: function(){
    return this.$el.html(this.template(this.model.attributes));
  }

});
