import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../../declarations/credit/credit.did";
import Button from "./Button";
import CURRENT_USER_ID from "../index";
import { carbonCare_backend } from "../../../declarations/carbonCare_backend";
import PriceLabel from "./PriceLabel";

function Item(props) {
  console.log("Props: " + props.role);
  const [unit, setUnit] = useState();
  const [issAuth, setIssuer] = useState();
  const [owner, setOwner] = useState();
  const [button, setButton] = useState();
  const [priceInput, setPriceInput] = useState();
  const [loaderHidden, setLoaderHidden] = useState(true);
  const [blur, setBlur] = useState();
  const [priceLabel,setPriceLabel]=useState();
  const [shouldDisplay, setDisplay] = useState(true);
  // const [sellStatus,setSellStatus]=useState("");
  const id = props.id;

  const localHost = "http://127.0.0.1:4943/";
  const agent = new HttpAgent({ host: localHost });
  //remove while deploying
  agent.fetchRootKey();
  let CreditActor;
  async function loadCredit() {
    CreditActor = await Actor.createActor(idlFactory, {
      agent,
      canisterId: id,
    });
    const units = await CreditActor.getUnit();
    const own = await CreditActor.getOwner();
    const issAuthor = await CreditActor.getAuth();
    setUnit(units);
    setOwner(own.toString());
    setIssuer(issAuthor);
    console.log("Role: " + props.role);
    if (props.role == "collection") {
      const creditListed = await carbonCare_backend.isListed(id);
      console.log(creditListed);
      if (creditListed) {
        setOwner("CarbonCare");
        setBlur({ filter: "blur(4px)" });
        // setSellStatus("Listed");
      } else {
        setButton(<Button handleClick={handleSell} text={"Sell"} />);
      }
    } else if (props.role == "discover") {
      const originalOwner = await carbonCare_backend.getOriginalOwner(props.id);
      if (originalOwner.toText() != CURRENT_USER_ID.toText()) {
        setButton(<Button handleClick={handleBuy} text={"Buy"} />);
      }
      
         
      const price= await carbonCare_backend.getListedCreditPrice(props.id);
      setPriceLabel(<PriceLabel sellPrice={price.toString()}/>);


    }
  }
  useEffect(() => {
    loadCredit();
  }, []);
  let price;
  function handleSell() {
    console.log("Sell is triggered.");
    setPriceInput(
      <input
        placeholder="Price in RPT coins"
        type="number"
        className="price-input"
        value={price}
        onChange={(e) => (price = e.target.value)}
      />
    );
    setButton(<Button handleClick={sellItem} text={"Confirm"} />);
  }
  async function sellItem() {
    setBlur({ filter: "blur(4px)" });
    setLoaderHidden(false);
    console.log("Confirm clicked");
    console.log("Set Price=" + price);
    const listingResult = await carbonCare_backend.listItem(id, Number(price));
    console.log(listingResult);
    if (listingResult == "Success") {
      const carbonId = await carbonCare_backend.getcarbonCanisterId();
      const transferResult = await CreditActor.transferOwnership(carbonId);
      console.log(transferResult);
    }
    setLoaderHidden(true);
    setButton();
    setPriceInput();
    setOwner("CarbonCare");
    // setSellStatus("Listed");
  }

  async function handleBuy() {
    console.log("Buy was triggered");

    setLoaderHidden(false);
    const sellerId = await carbonCare_backend.getOriginalOwner(props.id);
    const itemPrice = await carbonCare_backend.getListedCreditPrice(props.id);
    console.log("Price:"+itemPrice);
    const result = await carbonCare_backend.transfer(sellerId, itemPrice);
    console.log(sellerId.toString(),itemPrice,result);
    if (result == "Successfully transferred") {
      const transferResult = await carbonCare_backend.completePurchase(
        props.id,
        sellerId,
        CURRENT_USER_ID
      );
      console.log("purchase: " + transferResult);
      setLoaderHidden(true);
      setDisplay(false);
    }
    

  }

  return (
    <div className="disGrid-item"
    style={{ display: shouldDisplay ? "inline" : "none" }}>
      <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
        <img
          className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img"
          src={logo}
          style={blur}
        />
        <div hidden={loaderHidden} className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="disCardContent-root">
          {priceLabel}
          {issAuth && (
            <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom ">
              {issAuth}
              <span className="purple-text"></span>
            </h2>
          )}

          {unit && (
            <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
              {unit}
              <span className="purple-text"></span>
            </h2>
          )}
          {owner && (
            <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
              Owner: {owner}
            </p>
          )}
          {issAuth && (
            <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
              Issuer: {issAuth}
            </p>
          )}

          {priceInput}
          {button}
        </div>
      </div>
    </div>
  );
}
export default Item;
