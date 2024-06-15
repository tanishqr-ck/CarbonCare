# CarbonCare :A Decentralized carbon credit marketplace



## Overview

This Trading Platform for carbon credits is based on decentralized web technology. “CarbonCare”  is decentralized carbon credit marketplace backed with Dfinity ICP Blockchain. 

Users can trade the carbon credits based on their carbon emissions and help protect their net profits at the same time. 

This opens a whole new industry that can work for credit generation and gives a great boost to renewable sector to structure their production in such a way so as to make core and non-core income that can reflect on their balance sheets. 

This project provides functionalities of issuing tickets to companies through their internet identity after satisfying criteria of lesser emissions and then these companies can mint carbon credits equal to the ticket size . These carbon credits can be sold or kept with the issuer itself in de-materialized form. 

In case these credits are available for buying, the buyer can buy these credits using raptor tokens and then redeem them for increasing industrial output. 

The project also features a discuss section which can be used by the companies to discuss various issues comprising pricing, ticket size and buying-selling convenience(uses Disqus) . This project also has an AI assistant which is powered by Chatbase.



##  Requirements and Setup 

1. #### Requirements 

- Linux Environment(WSL2 on windows) 
- DFX – Local simulation of actual blockchain 
- Nodejs 
- VS Code (Or Any other editor) 
- Motoko Extensions 
- React

2. #### Configuration and Installation 

If the OS is Windows,we need to install WSL2 and install any linux distro(We will use Ubuntu).  

1.Install npm to install node and other dependencies.            

 `$ sudo apt install npm nodejs` 

2. Ensure whether npm is properly installed on the system. 
3. Install dfx(DFINITY command-line execution environment) 

`$ sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"` 

Once dfx environment have been succesfully installed, we are ready to make our project. 

CarbonCare DApp can be created by:                            

`$ dfx new carboncare` 

4. Install dependiencies, run: 

`$npm install <dependencies>`  -         to install all dependencies. 

5. Start local simulation of ICP by : 

`$dfx start` 

6. Deploy the code into the canisters after development:  
`$dfx deploy` 

7. Now fire up the frontend by : 
`$npm start` 

We are now ready to interact with the DApp . We will take this forward in the way , a user will normally react the platform. 



##   Internet Identity 

Internet Identity revolves around how individuals establish and authenticate their identities on the internet to securely access digital services. It primarily involves two key components: authentication and authorization. 

 As soon as we open our project we are redirected to internet identity for identification. Get an internet identity to proceed.



## Get Ticket to mint credit

Carbon credits can not be minted directly as the issuing company must be eligible for minting credits and has gained approval from concerned authority that the carbon emission by the respective company is less and is net carbon positive. 

In this application, tickets serve as a form of license that grants companies the authority to issue carbon credits. These tickets essentially act as a mechanism to authenticate and validate the legitimacy of the carbon credits being issued within the app. The term "pegged nature" refers to the fact that these tickets are firmly anchored or linked to a tangible source, ensuring their credibility and reliability. 

(You can get your principal id by:-

`$dfx identity get-principal`)

This can be done by:-

`$  dfx canister call carbonCare\_backend issueTicket '(100)'` -  This gives 100 credit 

ticket to the user.

If a malicious user tries to mint carbon credits with ticket or the ticket value is not equal to the listing number , It is immediately prohibited from doing so. 



##  ‘Raptor’ Token

Raptor Coin (RPT) is a tradable token built on the Internet Computer Dfinity Blockchain (ICP). Designed with a focus on decentralization and pseudonymity, Raptor Coin can be used for a variety of purposes, including as a medium of exchange, for holding equity in Decentralized Autonomous Organizations (DAOs), and for the exchange of services. The token leverages the unique features of the Internet Computer blockchain, including orthogonal persistence, to create a robust and efficient decentralized application (DApp). 

In this project this token is used to trade carbon credits. 

These issued tokens can then be used to trade carbon credits. These can be issued as:- 

`$  CANISTER\_PUBLIC\_KEY="principal \"$( \dfx canister id carbonCare\_backend )\""` 

`$ dfx canister call carbonCare\_backend transfer "($CANISTER\_PUBLIC\_KEY, 500\_000\_000)"` 



## Tweaks

Since the application does not allow repurchasing of credits we need to mint from backend so that the buy functionality appears and we can carry out the transaction .

By  implementing  the  functionality  to  mint  carbon  credits  from  the  backend,  the  carbon  credit marketplace application enhances its capability to meet user demand, facilitate transactions, and support sustainable  initiatives  effectively.  This  backend-driven  approach  ensures  flexibility,  control,  and compliance while enabling seamless user interactions within the platform. 

These tweaks can be done as :- 

Screenshots:- 

`$ dfx canister call carbonCare\_backend mint "("Elxsi","100")"` 

Then to list this we use: 

`$ dfx canister call carbonCare\_backend listItem '(principal "dxfxs-weaaa-aaaaa- qaapa-cai",3)'` 



## Trade

You can now trade the credits.





