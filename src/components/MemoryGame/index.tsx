import { useEffect, useMemo, useState } from "react";
import { cn } from "../../utils";
import { shuffle } from "lodash";
import { isObjectInArray } from "../../utils/object";

export type CardType = { id: string; image: string };
export type FlashCardType = CardType & { type: "correct" | "incorrect" };

function MemoryGame({ images }: { images: string[] }) {
  // 6 image pairs - 12 cards that start "flipped down"
  // User clicks on a card to "flip it up"
  // If the user clicks on a second card that matches the first, both cards stay "flipped up"
  // If the user clicks on a second card that does not match the first, both cards flip back down
  // Game ends when all cards are matched

  // Build the game as a component that takes an array of images

  // State to hold
  // array of clicked cards. Max length of 2.
  // array of cards that are flipped up (matched) (same as the clicked cards)
  // matched pairs

  // Functions:
  // handle card click that takes the card uuid and handles the matching
  const [message, setMessage] = useState("");
  const [totalGuesses, setTotalGuesses] = useState(0);
  const randomizedCards = useMemo(() => {
    // make pairs for all the images

    const fullset = [...images, ...images].map((image) => ({
      id: self.crypto.randomUUID(),
      image,
    }));

    return shuffle(fullset);
  }, [images]);

  const [pairs, setPairs] = useState<CardType[]>([]);
  const [clickedCards, setClickedCards] = useState<CardType[]>([]);
  const [flashCards, setFlashCards] = useState<FlashCardType[]>([]);

  const handleFlash = (
    clickedCards: CardType[],
    type: "correct" | "incorrect"
  ) => {
    setFlashCards((prev) => [
      ...prev,
      ...clickedCards.map((card) => ({ ...card, type })),
    ]);
    setTimeout(() => {
      setFlashCards([]);
    }, 1000);
  };
  const handleCardClick = (clickedCard: CardType) => {
    // cases to account for:
    // there are no clicked cards
    // there is one clicked card

    // handle the delay after guessing wrong and then quickly clicking again before 2 seconds is over

    // if card is already in pairs, do nothing
    if (
      isObjectInArray({ array: pairs, value: clickedCard.image, key: "image" })
    )
      return;

    // if you clicked the same card twice
    if (
      isObjectInArray({ array: clickedCards, key: "id", value: clickedCard.id })
    )
      return;

    if (clickedCards.length === 0) {
      // simply add the card to the clickedCards array
      setClickedCards((prev) => [...prev, clickedCard]);
    } else {
      setClickedCards((prev) => [...prev, clickedCard]);
      // check if the current card matches
      if (
        isObjectInArray({
          array: clickedCards,
          key: "image",
          value: clickedCard.image,
        })
      ) {
        setPairs((prev) => [...prev, clickedCard]);
        handleFlash([...clickedCards, clickedCard], "correct");
      }
      setTotalGuesses((prev) => prev + 1);

      // set the flash
      // for all the clicked cards, set a flash
      handleFlash([...clickedCards, clickedCard], "incorrect");
      // reset the state after a delay
      setTimeout(() => {
        setClickedCards([]);
      }, 1000);
    }

    // setClickedCards((prev) =>
    //   isObjectInArray({ array: prev, id: clickedCard.id })
    //     ? prev.filter((card) => card.id !== clickedCard.id)
    //     : [...prev, clickedCard]
    // );
    // setClickedCards((prev) => {
    //   if (prev.includes(clickedCard)) {
    //     return prev.filter((card) => card !== clickedCard);
    //   } else {
    //     return [...prev, clickedCard];
    //   }
    // });
    // setClickedCards((prev) =>
    //   prev.includes(clickedCard)
    //     ? prev.filter((card) => card !== clickedCard)
    //     : [...prev, clickedCard]
    // );
  };

  const resetGame = () => {
    setPairs([]);
    setClickedCards([]);
    setTotalGuesses(0);
  };

  useEffect(() => {
    if (pairs.length === images.length) {
      setMessage("You won!!!");
      // flash a winning message
      // reset the board after a delay
      setTimeout(() => {
        resetGame();
        setMessage("");
      }, 2000);
    }
  }, [pairs]);

  return (
    <div>
      <div className="grid grid-cols-4 gap-2">
        {randomizedCards.length > 0 &&
          randomizedCards.map((card) => (
            <Card
              card={card}
              isVisible={
                isObjectInArray({
                  array: clickedCards,
                  key: "id",
                  value: card.id,
                }) ||
                isObjectInArray({
                  array: pairs,
                  key: "image",
                  value: card.image,
                })
              }
              key={card.id}
              handleCardClick={handleCardClick}
              flashCard={flashCards.find((c) => c.id === card.id) || null}
            />
          ))}
      </div>
      <footer className="mt-4 flex justify-center gap-4 p-4">
        <p>{message ? message : `Pairs: ${pairs.length}`}</p>
        <p>Total Guesses: {totalGuesses}</p>
      </footer>
    </div>
  );
}

export default MemoryGame;

function Card({
  card,
  isVisible,
  handleCardClick,
  flashCard,
}: {
  card: CardType;
  isVisible?: boolean;
  handleCardClick: (card: CardType) => void;
  flashCard: FlashCardType | null;
}) {
  return (
    <div
      className={cn(
        "w-32 h-32 relative border-4 border-gray-500",
        flashCard?.type === "correct"
          ? "border-green-500"
          : flashCard?.type === "incorrect"
          ? "border-red-500"
          : ""
      )}
      onClick={() => handleCardClick(card)}
    >
      <img
        src={card.image}
        alt="Memory Card"
        className="w-full h-full object-cover"
      />
      <div
        className={cn(
          "absolute inset-0 bg-gray-500",
          //   opacity-75
          isVisible ? "hidden" : ""
        )}
      ></div>
    </div>
  );
}
