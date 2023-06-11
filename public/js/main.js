class Deck{
    constructor(deckName, cards, id, thumbnail){
        this.name = deckName;
        this.cards = cards;
        this.colors = id;
        this.thumbnail = thumbnail;
    }
}

function AddDeckToRow(_deck) {
    const row = $(".row");
    var deckName = _deck.name;
    var colors = [
      '<i class="ms ms-w circle" style="background-color: rgb(248, 231, 185);"></i>',
      '<i class="ms ms-u circle" style="background-color: rgb(14, 104, 171);"></i>',
      '<i class="ms ms-b circle" style="background-color: rgb(166, 159, 157);"></i>',
      '<i class="ms ms-r circle" style="background-color: rgb(211, 32, 42);"></i>',
      '<i class="ms ms-g circle" style="background-color: rgb(0, 115, 62);"></i>'
    ];
    var colorID = $("<span>").addClass("deck-color-id position-relative");
    for (color in _deck.colors) {
      if (_deck.colors[color] == true) {
        colorID.append(colors[color]);
      }
    }
  
    const deck = $("<div>").css("flex", "0 0 auto").css("width", "25%").html(`
      <div class="deck-container-thumbnail">
        <a class="deck" href="decks.html">
          <span class="deck-background-image" style="background-image:url(${_deck.thumbnail});></span>
          <span class="deck-information position-relative">
            <span style="display:flex !important;">
              <span style="flex-grow: 1 !important";>
                <span style="display:block !important">
                  <span class="deck-name">${deckName}</span>
                </span>
                <span style="display:block !important">
                  ${colorID.html()}
                </span>
              </span>
            </span>
          </span>
        </a>
      </div>
    `);
    row.append(deck);
  }

var deck1 = new Deck("Random Deck 1", [], [true, false, true, false, false], "https://cards.scryfall.io/art_crop/front/d/6/d66f864b-b1bb-4596-93b8-3b4bfe6b1332.jpg?1547516853");
var deck2 = new Deck("Random Deck 2", [], [false, true, false, false, false], "https://cards.scryfall.io/art_crop/front/3/2/32ad3f87-9f25-455f-9933-3b0b0eaad467.jpg?1562906862");
var deck3 = new Deck("Random Deck 3", [], [true, true, true, true, true], "https://cards.scryfall.io/art_crop/front/f/2/f29ba16f-c8fb-42fe-aabf-87089cb214a7.jpg?1673147852");
var deck4 = new Deck("Random Deck 4", [], [true, false, false, true, true], "https://cards.scryfall.io/art_crop/front/8/b/8bbcfb77-daa1-4ce5-b5f9-48d0a8edbba9.jpg?1592765148");
AddDeckToRow(deck1);
AddDeckToRow(deck2);
AddDeckToRow(deck3);
AddDeckToRow(deck4);