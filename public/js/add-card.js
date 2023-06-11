
function SearchForCard(){
    
}

var inputElement = $("#input-field");

inputElement.on("input", function() {
    var inputValue = inputElement.val();
    getCard(inputValue);
});

var _liCards = $(".list-of-cards");

var currentCards = [];

function getCard(cardName){
    if (cardName === "") {
        // Handle empty input case
        $(_liCards).empty();
      } else {
        $.ajax({
          url: "https://api.scryfall.com/cards/search",
          data: {
            q: cardName
          },
          success: function(data) {
            currentCards = data.data;
            if (currentCards.length > 5) {
              currentCards = currentCards.slice(0, 5);
            }
            SearchForCardDisplay(currentCards);
          },
          error: function(error) {
            console.error(error);
          }
        });
      }
}

function SearchForCardDisplay(cards){
    $(_liCards).empty();
    cards.forEach(_card => {
        var liCard = $("<li></li>");
        liCard.text(_card.name);
        liCard.attr("id", _card.name.replace(/\s/g, ''));
        liCard.addClass("search-result cursor-pointer");
        $(liCard).click(() => {
            AddCardToDeck(liCard.text());
        });
        _liCards.append(liCard);
    });
}

function AddCardToDeck(_card){
    $(_liCards).empty();

    var linkToPicture = "";
    var type = "";
    var colors = [];
    $.ajax({
        url: "https://api.scryfall.com/cards/search",
        data: {
          q: `!"${_card}"`
        },
        success: function(data) {
            linkToPicture = data.data[0].image_uris.png;
            type = data.data[0].type_line;
            colors = data.data[0].colors;

            $.ajax({
                type: 'POST',
                url: '/updateJson',
                contentType: 'application/json',
                data: JSON.stringify({ card: _card, colors: colors, type: type, image_link: linkToPicture}),
                dataType: 'json',
                success: function(response) {
                  console.log(response);
                  
                    RefreshDeck();
                },
                error: function(xhr, status, error) {
                  console.error(error);
                }
              });
        },
        error: function(error) {
          console.error(error);
        }
      });
}

const listElement = $(".deck-list");
const pointsElement = $(".points");
const cardDisplay = $(".card-displayed");
const deckname = $('.change-deckname');

deckname.on("input", function() {
    $('.deckheader-name').text(deckname.val());
});

var points = 0;

function RefreshDeck(){
    $(listElement).empty();
    $.getJSON("../data.json", function(data) {
        cardDisplay.attr('src', Object.values(data.cards)[0].image);
        $.each(data.cards, function(key, value){
            var liCard = $("<li></li>");
            liCard.text(value.count + " " + key);
            liCard.addClass("card");
            liCard.attr('src', value.image);

            CheckPointList(key);

            $(liCard).hover(function() {
                cardDisplay.attr('src', value.image);
            });

            listElement.append(liCard);
        })
    })
}

function CheckPointList(_card){
    points = 0;
    $.getJSON("../CHLPointList.json", function(data) {
        $.each(data, function(key,value) {
            if(_card === Object.values(data[key])[0]){
                points += Object.values(data[key])[1];
            }
        })
        pointsElement.text(`Points: ${points}/10`);
        if(points > 10){
            pointsElement.text(`Points: ${points}/10 (Too many points)`);
        }
    })
}