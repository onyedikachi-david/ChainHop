# Boxpay and ChainHop Projects 
  
 Documentation for "ChainHop" and "BoxPay" DApp 
  
 ## Introduction 
"ChainHop" is a decentralised application that allows anyone to search for transactions on any Blockchain, be it testnet or mainnet, while Boxpay allows anyone to send withdrawable erc20 using gasless transactions, and native coins. its deployed on severally Blockchains. it makes use of chainlink price feeds.


 This document explains how to use the "ChainHop" and "Boxpay" DApp, including the features, user interface, and how to interact with the Binance blockchain. 
 ## Features 
 The "ChainHop" and "Boxpay" DApp has the following features: 
  
 - Send a (BEP-20) token. 
 - Redeem a (BEP-20) token using a gasless transaction. 
 - Withdraw a (BEP-20) token sent to someone using a gasless transaction.. 
 - Search for and view transaction details of any Blockchain on on place. Cool 👍 right?

## Video speaks

[ChainHop Demo](https://youtu.be/jW24X3_OtIM)

[Boxpay Demo](https://youtu.be/Ic4tC5nf0E8)

  
 ## Related 
  
 Here are some related projects 
  
 ### Boxpay
  It lives on its own space. link below
 
 [Github Link to Codebase](https://github.com/onyedikachi-david/box-pay) 
 
 ## Tools used
  
 ### NodeReal 
  
 As a high-speed blockchain infrastructure solution, NodeReal strives to provide an instant and easy-access service to every developer. 
  
 ### Chainlink
 
 Uses chainlink price feeds.
  
 ## Get Started 
  
 To get started with Bquesti, simply follow these steps: 
  
 - Clone the repository from GitHub: 
  
 ```http 
   git clone https://github.com/onyedikachi-david/client 
  
 ``` 
  
 - Install the necessary dependencies: 
  
 ```bash 

  
 yarn  i or pnpm i
 ``` 
  

  
  
  
 ## Tech Stack 
  
 Boxpay and ChainHop are built using the following technologies: 
  
 **Client:** NextJs, RainBowKit, TailwindCSS, Wagmi,  
  
 **Server:** Node, Solidity, Binance Blockchain, ChainlinkPricefeeds 
  
  

  
 ## Running Tests 
  
 To run tests, run the following command 
  
 ```bash 
   cd backend 
   yarn run backend 
 ``` 
  
  
 ## Reach out 
  
 For more info, email davidanyatonwu@gmail.com 

  
  
 ## Roadmap 
  
 - Make use of Chainlink Automation to automatically refund if withdrawal isn't made for sometime 
 - for the ChainHop dapp, make a more beautiful UX
  
  
 ## License 
  
 [MIT](https://choosealicense.com/licenses/mit/) 
  
  
 ## Environment Variables 
  
 To run this project, you will need to add the following environment variables to your .env file 
  
  
  
 `OPENZEPPLINEDEFENDERKEY` 
  
 `NNODEREAL_API` 
  
  
 ## Demo 
  
 there's deploment issues duth Boxpay for now. ChainHop works fine.
  
 [Demo Website chainhop](https://chainhop.vercel.app/)
  [Demo Website Boxpay]()
