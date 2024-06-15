import React, { useEffect, useState } from "react";
import {useForm } from "react-hook-form"
import { Principal } from "@dfinity/principal";
import { Actor, HttpAgent } from "@dfinity/agent";
import { carbonCare_backend } from "../../../declarations/carbonCare_backend";

import Item from "./Item";
function Minter() {
  
  const{register,handleSubmit}=useForm();
  const [creditPrincipal, setCreditPrincipal] = useState("");
  const [loaderHidden, setLoaderHidden] = useState(true);
  const [status, setStatus]=useState("Minted Successfully ✔");

  async function onSubmit(data)
  {
   setLoaderHidden(false);
   const units= data.units;
   const issAuth = data.issAuth;
   const ticketstatus= await carbonCare_backend.getTicketStatus();
   console.log(typeof(ticketstatus));
   console.log(typeof(units));
   var number = Number(units) ;
   console.log("number"+number);
   console.log("TS"+ticketstatus);
   if(ticketstatus == number && number != 0){
    const newCreditId= await carbonCare_backend.mint(issAuth,units);
    console.log("principal",newCreditId.toText());
    console.log(units);
    console.log(issAuth);
    setCreditPrincipal(newCreditId);
    console.log("______");
    console.log(creditPrincipal);
    console.log("______");
    setLoaderHidden(true);
   }
   else
   {
    setLoaderHidden(true);
    setCreditPrincipal("abc");
    console.log("CP"+creditPrincipal);
   }
   
  }
  
 
  if(creditPrincipal=="")
  {
  return (
    <div className="minter-container">
      <div hidden={loaderHidden} className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h3 className="makeStyles-title-99 Typography-h3 form-Typography-gutterBottom">
        Create Credit
      </h3>
      <form className="makeStyles-form-109" noValidate="" autoComplete="off">
      <h6 className="form-Typography-root makeStyles-subhead-102 form-Typography-subtitle1 form-Typography-gutterBottom">
          Issuing Entity
        </h6>
        <div className="form-FormControl-root form-TextField-root form-FormControl-marginNormal form-FormControl-fullWidth">
          <div className="form-InputBase-root form-OutlinedInput-root form-InputBase-fullWidth form-InputBase-formControl">
            <input
            {...register("issAuth",{required: true})}
              placeholder="XYZ Ltd."
              type="text"
              className="form-InputBase-input form-OutlinedInput-input"
            />
            <fieldset className="PrivateNotchedOutline-root-60 form-OutlinedInput-notchedOutline"></fieldset>
          </div>
        </div>
        <h6 className="form-Typography-root makeStyles-subhead-102 form-Typography-subtitle1 form-Typography-gutterBottom">
          Units
        </h6>
        <div className="form-FormControl-root form-TextField-root form-FormControl-marginNormal form-FormControl-fullWidth">
          <div className="form-InputBase-root form-OutlinedInput-root form-InputBase-fullWidth form-InputBase-formControl">
            <input
            {...register("units",{required: true})}
              placeholder="10"
              type="number"
              className="form-InputBase-input form-OutlinedInput-input"
            />
            <fieldset className="PrivateNotchedOutline-root-60 form-OutlinedInput-notchedOutline"></fieldset>
          </div>
        </div>
        <div className="form-ButtonBase-root form-Chip-root makeStyles-chipBlue-108 form-Chip-clickable">
          <span onClick={handleSubmit(onSubmit)} className="form-Chip-label">Mint Credits</span>
        </div>
      </form>
    </div>
  );
  }
  else if(creditPrincipal=="abc")
  {
    return(
    <div className="minter-container">
    <h3 className="Typography-root makeStyles-title-99 Typography-h3 form-Typography-gutterBottom">
      Invalid Ticket ✘
    </h3>
    
  </div>
  );

  }

  else
  {
    return(
    <div className="minter-container">
    <h3 className="Typography-root makeStyles-title-99 Typography-h3 form-Typography-gutterBottom">
      Minted Successfully ✔
    </h3>
    <div className="horizontal-center">
      <Item id={creditPrincipal.toText()}/>
    </div>
  </div>
  );

  }
}

export default Minter;
