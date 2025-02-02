import Sidebar from "./components/Sidebar";
import BottomBar from "./components/BottomBar";
import Header from "./components/Header";
import Notes from "./components/Notes";

export default function HomePage() {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <Notes />
        <BottomBar />
      </div>
    </div>
  );
}
