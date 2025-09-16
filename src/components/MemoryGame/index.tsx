import { cn } from "../../utils";

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

  //

  // Components to build:
  // Cards

  return (
    <div className="grid grid-cols-4 gap-2">
      {images.length > 0 &&
        images.map((card) => <Card image={card} isVisible={true} key={card} />)}
    </div>
  );
}

export default MemoryGame;

function Card({ image, isVisible }: { image: string; isVisible?: boolean }) {
  return (
    <div className={cn("w-32 h-32 relative")}>
      <img
        src={image}
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
