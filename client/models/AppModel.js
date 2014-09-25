// App.js - Defines a backbone model class for the whole app.
var AppModel = Backbone.Model.extend({

  initialize: function(params){
  if (sessionStorage.length > 0){
    console.log(JSON.parse(sessionStorage['currentSong']));
    this.set('currentSong', new SongModel(JSON.parse(sessionStorage['currentSong'])));
    this.set('songQueue', new SongQueue(JSON.parse(sessionStorage['songQueue'])));
  }
    this.set('currentSong', new SongModel());
    this.set('songQueue', new SongQueue());
       /* Note that 'this' is passed as the third argument. That third argument is
    the context. The 'play' handler will always be bound to that context we pass in.
    In this example, we're binding it to the App. This is helpful because otherwise
    the 'this' we use that's actually in the funciton (this.set('currentSong', song)) would
    end up refering to the window. That's just what happens with all JS events. The handlers end up
    getting called from the window (unless we override it, as we do here). */

      params.library.on('enqueue', function(song){

      this.get('songQueue').add(song);
      this.set('lastAdded',song);
      sessionStorage.setItem('songQueue',JSON.stringify(this.get('songQueue')));
    }, this);

    params.library.on('play', function(song){
      this.set('currentSong', this.get('songQueue').at(0));
      sessionStorage.setItem('currentSong',JSON.stringify(this.get('currentSong')));
    }, this);


    params.library.on('playNext', function(song){
      console.log(this.get('songQueue'));
      this.get('songQueue').remove(this.get('songQueue').at(0));
      this.set('currentSong', this.get('songQueue').at(0));
           // this.set('currentSong', this.get('songQueue').at(0));
      sessionStorage.setItem('currentSong',JSON.stringify(this.get('currentSong')));


   }, this);

      this.get('songQueue').on('dequeue', function(song){
      this.get('songQueue').remove(song);
    }, this);
  }

});
