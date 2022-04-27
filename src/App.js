import CallList from "./pages/CallList";
function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <div className="w-full bg-blue-800 h-10 flex items-center px-8">
          <a className="uppercase text-xl text-white font-bold hover:text-green-500" href="/">
            call center
          </a>
        </div>
      </header>
      <CallList />
    </div>
  );
}

export default App;
