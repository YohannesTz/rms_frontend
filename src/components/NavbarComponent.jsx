import React from "react";
import { Navbar, Button } from "flowbite-react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import util from "../util/util.json";

const NavbarComponent = () => {
  let navigate = useNavigate();
  const authData = useAuthStore((state) => state.authData);
  const clearAuthData = useAuthStore((state) => state.removeAuthData);

  const handleSignOut = () => {
    clearAuthData();
    navigate("/");
  };

  const handleSignIn = () => {
    if (authData.role == "client") {
      navigate("/client-view");
    } else if (authData.role == "lord") {
      navigate("/lord-view");
    } else {
      navigate("/get-started");
    }
  };

  return (
    <div className="drop-shadow-md sticky top-0 z-50">
      <Navbar fluid={false}>
        <Navbar.Brand href="/" className="ml-2">
          <img
            src={util.configuration.logoUrl}
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold ">
            {util.configuration.companyName}
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="/">Home</Navbar.Link>
          <Navbar.Link href="/rooms">Rooms</Navbar.Link>
          <Navbar.Link href="/map">Map</Navbar.Link>
          <Navbar.Link href="/contact">Contact</Navbar.Link>
          {authData.authenticated ? (
            <>
              <Navbar.Link href="/" onClick={handleSignOut}>
                SignOut
              </Navbar.Link>
              <Navbar.Link
                href={
                  authData.role === "lord" ? "/lord-view" : "/client-view"
                }
                onClick={handleSignIn}
              >
                SignIn
              </Navbar.Link>
            </>
          ) : (
            <Navbar.Link href="/get-started" onClick={handleSignIn}>
              Get started
            </Navbar.Link>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
