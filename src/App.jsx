import { Flowbite, FooterComponent } from "flowbite-react";
import NavbarComponent from "./components/NavbarComponent";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <Flowbite>
      <div className="flex flex-col mx-auto">
        <NavbarComponent />
        <div className="flex-grow px-4 lg:m-10 md:px-8">
          <Outlet />
        </div>
        <FooterComponent />
      </div>
    </Flowbite>
  );
}

export default App;
