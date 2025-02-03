import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";

export default function HomePage() {
  return (
    <div className="flex h-screen text-slate-700 bg-white relative">
      <Sidebar />
      <MainContent />
    </div>
  );
}
