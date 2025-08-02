# 🌐 Decentralized Billboard on Aptos

Welcome to my little corner of the blockchain! This is a simple, fully decentralized billboard application built on the **Aptos network**. It was created as a hands-on project to learn the fundamentals of building a full-stack **dApp**, from smart contract to front-end.

> The application allows any user with an Aptos wallet to connect and post a public message for everyone to see.
---
Notice: file "Billboard-Smart_Contract-Aptos_Blockchain" is the smart contract protocol I have run to generate the contract address in file App.tsx
---

### ✨ Features

*   **Wallet Connection**: Connects to the Aptos blockchain using the **Petra wallet**.
*   **On-Chain Data**: All messages are stored directly on the **Aptos Devnet** in a smart contract.
*   **Post Messages**: Connected users can write and publish new messages with a title and content.
*   **Decentralized Viewer**: The message board is public and reads directly from the blockchain, displaying the latest posts in real-time.

---

### 🛠️ How It Works (Tech Stack)

The project is split into two main parts: the **on-chain smart contract** and the **front-end user interface**.

#### Backend: **Move** Smart Contract

The core logic lives in a smart contract written in the **Move language**.

*   `billboard.move`: This module defines the rules of our application.
    *   It uses a `Billboard` **resource struct** to hold a list (`vector`) of `Message` structs.
    *   An `initialize_billboard` function is used once by the contract owner to create the central billboard.
    *   A `public send_message` function allows any user to add a new message to the list.
    *   A `get_all_messages` **view function** allows the front-end to read the list of messages without a transaction fee.

#### Frontend: **React** User Interface

The user-facing application is built with **React** and **TypeScript**.

*   `@aptos-labs/ts-sdk`: The primary TypeScript SDK used to communicate with the Aptos blockchain (e.g., calling the view function and waiting for transactions).
*   `@aptos-labs/wallet-adapter-react`: A set of React components and hooks that make it easy to build a **"Connect Wallet"** feature and submit transactions for users to sign.

---

### 🚀 Getting Started

Want to run this project yourself? Here’s how:

#### Prerequisites
*   **Node.js** and **npm** installed.
*   **Aptos CLI** installed.
*   **Petra Wallet** browser extension.

#### 1. Set Up the Smart Contract
Navigate to the smart contract folder (`billboard`).

*   Create and fund a new Aptos profile:
    ```bash
    aptos init --profile my-billboard
    aptos account fund-with-faucet --profile my-billboard
    ```
*   Compile the module:
    ```bash
    aptos move compile --named-addresses billboard=my-billboard
    ```
*   Deploy it to the blockchain:
    ```bash
    aptos move publish --named-addresses billboard=my-billboard
    ```
*   Initialize the billboard (one-time setup):
    ```bash
    aptos move run --function-id 'ADDRESS_FROM_STEP_2::billboard::initialize_billboard' --args 'u64:10' --profile my-billboard
    ```

#### 2. Set Up the Frontend
Navigate to the React app folder (`billboard-app`).

*   Install all dependencies:
    ```bash
    npm install
    ```
*   **Crucially**, open `src/App.tsx` and replace the placeholder `CONTRACT_ADDRESS` with the actual address from your contract deployment.
*   Start the application:
    ```bash
    npm start
    ```

---

### 🧠 What I Learned

*   Writing, compiling, and deploying a basic **Move smart contract**.
*   The concept of on-chain data storage using **resources**.
*   Connecting a **React front-end** to a wallet and smart contract.
*   Submitting **transactions** and calling **view functions** from TypeScript.
*   Troubleshooting common dApp development issues, like **Move aborts** and **transaction simulation errors**.

---

### 🔮 Future Ideas

*   Add a **"like"** or **upvote** button for messages.
*   Allow users to **edit** or **delete** their own messages.
*   Add **on-chain timestamps** to each post.
*   Implement **pagination** to handle a large number of messages.

Add on-chain timestamps to each post.

Implement pagination to handle a large number of messages.
