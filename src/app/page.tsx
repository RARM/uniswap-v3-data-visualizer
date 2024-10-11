// import Image from "next/image";
import Header from "@/app/ui/header";
import UIController from "./ui/ui-controller";
import Visualizer from "./lib/visualizer";

export default function Home() {
  let dataController = new Visualizer();
  
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center p-6">
        <UIController />
        <p>The key variable is: { process.env.SUBGRAPH_KEY }</p>
      </main>
    </>
  );
}
