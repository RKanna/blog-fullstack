import Image from "next/image";
import Card from "./components/Card";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen p-3">
      <div>
        <h1>Recent Blog Posts</h1>
      </div>
      <Card />
    </main>
  );
}

// sm:w-3/4 md:w-1/2 lg:w-1/2 xl:w-1/2
