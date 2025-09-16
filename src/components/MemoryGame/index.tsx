import { useMemo, useState } from "react";
import { cn } from "../../utils";
import { shuffle } from "lodash";
import { isObjectInArray } from "../../utils/object";

export type CardType = { id: string; image: string };

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

  // Functions:
  // handle card click that takes the card uuid and handles the matching

  const randomizedCards = useMemo(() => {
    // make pairs for all the images

    const fullset = [...images, ...images].map((image) => ({
      id: self.crypto.randomUUID(),
      image,
    }));

    return shuffle(fullset);
  }, [images]);

  const [clickedCards, setClickedCards] = useState<CardType[]>([]);
  const handleCardClick = (clickedCard: CardType) => {
    // cases to account for:
    // there are no clicked cards
    // there is one clicked card
    console.log("card", clickedCard);
    console.log(
      "is object in array",
      isObjectInArray({ array: clickedCards, id: clickedCard.id })
    );
    setClickedCards((prev) =>
      isObjectInArray({ array: prev, id: clickedCard.id })
        ? prev.filter((card) => card.id !== clickedCard.id)
        : [...prev, clickedCard]
    );
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

  return (
    <div className="grid grid-cols-4 gap-2">
      {randomizedCards.length > 0 &&
        randomizedCards.map((card) => (
          <Card
            card={card}
            isVisible={isObjectInArray({ array: clickedCards, id: card.id })}
            key={card.id}
            handleCardClick={handleCardClick}
          />
        ))}
    </div>
  );
}

export default MemoryGame;

function Card({
  card,
  isVisible,
  handleCardClick,
}: {
  card: CardType;
  isVisible?: boolean;
  handleCardClick: (card: CardType) => void;
}) {
  return (
    <div
      className={cn("w-32 h-32 relative")}
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
          isVisible ? "hidden" : ""
        )}
      ></div>
    </div>
  );
}
