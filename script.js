$(document).ready(function() {
  // nice use of a game object
  var game = {
    cards: ["http://img3.wikia.nocookie.net/__cb20140705214625/worldsgreatestheroes/images/8/84/Optimus-Prime.jpg",
      "http://img3.wikia.nocookie.net/__cb20140705214625/worldsgreatestheroes/images/8/84/Optimus-Prime.jpg",
      "https://upload.wikimedia.org/wikipedia/en/7/7f/Megatron.jpg",
      "https://upload.wikimedia.org/wikipedia/en/7/7f/Megatron.jpg",
      "https://upload.wikimedia.org/wikipedia/en/8/85/Starscream.jpg",
      "https://upload.wikimedia.org/wikipedia/en/8/85/Starscream.jpg",
      "http://img1.wikia.nocookie.net/__cb20060816201257/transformers/images/2/25/Ironhideg1guido.jpg",
      "http://img1.wikia.nocookie.net/__cb20060816201257/transformers/images/2/25/Ironhideg1guido.jpg",
      "http://orig06.deviantart.net/0445/f/2007/246/b/f/i_am_soundwave____by_fargnay.jpg",
      "http://orig06.deviantart.net/0445/f/2007/246/b/f/i_am_soundwave____by_fargnay.jpg",
      "http://orig02.deviantart.net/1580/f/2009/231/1/d/grimlock_colored_by_stridersyd.jpg",
      "http://orig02.deviantart.net/1580/f/2009/231/1/d/grimlock_colored_by_stridersyd.jpg",
    ],
    init: function() {
      game.shuffle();
    },
    // shuffle cards using for loop, by using random number, store current index #
    shuffle: function() {
      var random = 0;
      var temp = 0;
      for (i = 1; i < game.cards.length; i++) {
        random = Math.round(Math.random() * i);
        temp = game.cards[i];
        game.cards[i] = game.cards[random];
        game.cards[random] = temp;
      }
      game.assignCards();
      console.log(game.cards);
    },
    //assign cards a number using data dash
    assignCards: function() {
      $('.card').each(function(index) {
        $(this).attr('data-card-value', game.cards[index]);
      });
      game.clickHandlers();
    },
    clickHandlers: function() {
      $('.card').on('click', function() {
        $(this).html('<img src =' + $(this).data('cardValue') + '></img>').addClass('selected');
        game.checkMatch();
      });
      $('#playButton').on('click', function(){
        location.reload();
        playSound('http://www.transformersmovie.thetfcog.com/sounds/autobots%20transform%20and%20roll%20out.mp3');
      });
    },
    //How to check if cards match using data tag
    checkMatch: function() {
      if ($('.selected').length === 2) {
        // this method is really long. I'd break some of these sections out into
        //other methods and call them here for readability.
        if ($('.selected').first().data('cardValue') == $('.selected').last().data('cardValue')) {
          $('.selected').each(function() {
            // this the use of each necessary twice here?
            $(this).each(function() {
              playSound('http://www.hasbro.com/common/audio/transformers/tranforb.wav')
            }).animate({
              opacity: 0
            }).removeClass('unmatched');
          });
          // remove selected cards if they do not match
          // I don't think this comment above reflects what's happening.
          // This is not if they don't match, this is if they DO match.
          $('.selected').each(function() {
            $(this).removeClass('selected');
          });
          game.checkWin();
        } else {
          setTimeout(function() {
            $('.selected').each(function() {
              $(this).html('').removeClass('selected');
            });
          }, 500);
        }
      }
    },
    checkWin: function() {
      if ($('.unmatched').length === 0) {
        $('.container').html('<h1>You Win!</h1>');
      }
    }
  };
  game.init();
});

function playSound(url) {
  $(".selected").html("<embed src='" + url + "' hidden=true autostart=true loop=false>");
}
