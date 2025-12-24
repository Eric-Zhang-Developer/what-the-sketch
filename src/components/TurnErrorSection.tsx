import { useGameStore } from "@/store/gameStore";
export default function TurnErrorSection() {
  const errorMessage = useGameStore((state) => state.errorMessage);
  return (
    <>
      <div>Error</div>
      <p>{errorMessage}</p>
    </>
  );
}
