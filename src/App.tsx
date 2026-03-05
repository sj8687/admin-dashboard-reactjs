import "./index.css";
import "./App.css";
import DashboardLayout from "./Layouts/DashboardLayout";
import { ThemeProvider } from "./components/ui/DarkmodeToggle";

export default function App() {
  return (
    <>
      <ThemeProvider>
        <DashboardLayout />
      </ThemeProvider>
    </>
  )
}
