document.addEventListener("DOMContentLoaded", function () {
  const deck = document.getElementById("deck");
  const shuffleBtn = document.getElementById("shuffle");
  const resetBtn = document.getElementById("reset");
  const wonDiv = document.getElementById("won");

  let cards = [...deck.children];
  let cardholders = document.querySelectorAll(".placed");
  let shuffledCards = [];

  function shuffle() {
    wonDiv.style.display = "none";
    shuffledCards = cards.slice().sort(() => Math.random() - 0.5);
    updateDeck();
  }

  function updateDeck() {
    deck.innerHTML = "";
    shuffledCards.forEach((card, index) => {
      card.id = index;
      card.setAttribute("draggable", "true");
      card.addEventListener("dragstart", handleDragStart);
      deck.appendChild(card);
    });
    handleDragDrop();
  }

  function handleDragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.id);
  }

  function handleDragDrop() {
    cardholders.forEach((cardholder) => {
      cardholder.addEventListener("dragover", (e) => {
        e.preventDefault();
      });

      cardholder.addEventListener("drop", (e) => {
        e.preventDefault();
        const cardId = e.dataTransfer.getData("text/plain");
        const draggedCard = document.getElementById(cardId);
        const currentCardholderId = cardholder.id;

        if (isValidMove(draggedCard, currentCardholderId)) {
          cardholder.appendChild(draggedCard);
          checkWin();
        }
      });
    });
  }

  function isValidMove(card, cardholderId) {
    const suit = card.src.substring(card.src.lastIndexOf("/") + 1, card.src.lastIndexOf("."));
    return cardholderId === suit;
  }

  function checkWin() {
    const allCardsPlaced = Array.from(cardholders).every((cardholder) => cardholder.children.length === 1);

    if (allCardsPlaced) {
      wonDiv.style.display = "block";
    }
  }

  shuffleBtn.addEventListener("click", shuffle);
  resetBtn.addEventListener("click", () => {
    shuffle();
    wonDiv.style.display = "none";
  });

  shuffle();
});

