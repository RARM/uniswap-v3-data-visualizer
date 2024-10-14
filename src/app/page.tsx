// import Image from "next/image";
import Header from "@/app/ui/header";
import UIController from "./ui/ui-controller";
import Visualizer from "./lib/visualizer";

export default function Home() {
  const dataController = new Visualizer();
  const missingReq = dataController.getMissingRequirements();
  const visualizations = dataController.getVisualizations();
  
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center p-6">
      {missingReq.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg text-black dark:bg-gray-800 dark:text-white">
            <p>There are missing requirements! Maybe a missing key.</p>
            </div>
        </div>
      )}
      <UIController
        sections={visualizations}
      />
      </main>
    </>
  );
}
