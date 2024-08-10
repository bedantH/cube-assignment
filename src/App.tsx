import AppProvider from "./contexts/AppContext";
import CustomerLayout from "./layouts/customer/CustomerLayout";

function App() {
  return (
    <AppProvider>
      <CustomerLayout />
    </AppProvider>
  );
}

export default App;
