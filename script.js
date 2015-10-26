$(document).ready(function() {
  var app = {
    cards: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6],
    init: function() {
      app.shuffle();
    },
    shuffle: function() {
      var random = 0
      var temp = 0
      for (i = 1; i < app.cards.length; i++) {
        random = Math.round(Math.random() * i);
        temp = app.cards[i]
        app.cards[i] = random;
        app.cards[random] = temp;
      }
      app.assignCards();
      console.log(app.cards);
    }
    assignCards: function() {
      $('.card').each(function(index) {
        $(this).attr('data-card-value', app.cards[index]);
      });
    };
  };
  app.init();
});
