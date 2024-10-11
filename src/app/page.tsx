// import Image from "next/image";
import Header from "@/app/ui/header";
import UIController from "./ui/ui-controller";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center p-6">
        <UIController />
      </main>
    </>
  );
}
