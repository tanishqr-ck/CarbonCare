import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import Minter from "./Minter";
import Discussion from "./Discussion"
import Gallery from "./Gallery";
import { carbonCare_backend } from "../../../declarations/carbonCare_backend";
import homeImage from "../../assets/home-img.png";
import { BrowserRouter, Link, Switch, Route} from "react-router-dom"
import CURRENT_USER_ID from "../index";
function Header() {
  const [userOwnedGallery, setOwnedGallery] = useState();
  const [listingGallery,setListingGallery]  = useState();
  async function getCredits()
  {
    console.log("getcredits initiated!!!");
    const userCreditIds=await carbonCare_backend.getOwnedCredits(CURRENT_USER_ID);
    console.log("userCreditIds: "+userCreditIds);
    setOwnedGallery(<Gallery title="My Collection" ids={userCreditIds} role="collection"/>);

    const listedCreditIds=await carbonCare_backend.getListedCredits();
    console.log("ListedCreditIds: "+listedCreditIds);
    setListingGallery(<Gallery title="Discover" ids={listedCreditIds} role="discover"/>);
  }

  useEffect(() => {
   getCredits();
  },[]);
  // forceRefresh={true}
  return (
    <BrowserRouter  >
    <div className="app-root-1">
      <header className="Paper-root AppBar-root AppBar-positionStatic AppBar-colorPrimary Paper-elevation4">
        <div className="Toolbar-root Toolbar-regular header-appBar-13 Toolbar-gutters">
          <div className="header-left-4"></div>
          <img className="header-logo-11" src={logo} />
          <div className="header-vertical-9"></div>
          <Link to="/">
          <h5 className="Typography-root header-logo-text">CarbonCare</h5>
          </Link>
          <div className="header-empty-6"></div>
          <div className="header-space-8"></div>
          <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
            <Link to="/discover">
            Discover
            </Link>
          </button>
          <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
            <Link to="/discussion">Discussion</Link>
          </button>
          <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
           <Link to="/minter">Minter</Link> 
          </button>
          <button className="ButtonBase-root Button-root Button-text header-navButtons-3">
            <Link to="/collection">My Credits</Link>
          </button>
        </div>
      </header>
    </div>


    <Switch>
     
      <Route path="/discover">
        {listingGallery}
      </Route >
      <Route path="/minter">
        <Minter/>
      </Route>
      <Route path="/discussion">
        <Discussion/>
        </Route>
      
      <Route path="/collection">
        {userOwnedGallery}
      </Route>
      <Route exact path="/">
      <img className="bottom-space" src={homeImage} width={500} height={500}  />
      </Route>
    </Switch>
    </BrowserRouter>
  );
}

export default Header;
