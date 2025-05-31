import "./App.css";
import ChatComponent from "./components/ChatComponent";
import { SnackbarProvider } from "./context/SnackbarContext";

function App() {
  return (
    <SnackbarProvider>
      <div className="max-w-screen-lg mx-auto bg-gray-100 shadow-md">
        <ChatComponent />
      </div>
    </SnackbarProvider>
  );
}

export default App;
