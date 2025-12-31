import { Loader2 } from "lucide-react";

export default function TurnLoadingSection() {
  return (
    <section className="flex flex-col justify-center items-center gap-4">
      <p className="text-xl">Loading...</p>
      <Loader2 size={60} className="animate-spin"></Loader2>
    </section>
  );
}
