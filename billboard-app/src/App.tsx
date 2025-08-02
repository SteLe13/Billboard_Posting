import React, { useEffect, useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import "./App.css";

// --- PASTE YOUR EXISTING CONTRACT ADDRESS HERE ---
const CONTRACT_ADDRESS = "0x4f37664febbe53b3f6f0d8f8d4c572d553708a08c6d3201c764e9b44fb63d9fc";
// --- ---

const aptosConfig = new AptosConfig({ network: Network.DEVNET });
const aptos = new Aptos(aptosConfig);

type Message = {
  title: string;
  content: string;
  author: string;
};

function App() {
  const { connect, disconnect, account, connected, signAndSubmitTransaction } = useWallet();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchMessages = async () => {
    if (!CONTRACT_ADDRESS.startsWith("0x")) return;
    try {
      const response = await aptos.view({
        payload: {
          function: `${CONTRACT_ADDRESS}::billboard::get_all_messages`,
          functionArguments: [CONTRACT_ADDRESS],
        },
      });
      setMessages(response[0] as Message[]);
    } catch (e) {
      setMessages([]);
    }
  };

  const handlePostMessage = async () => {
    if (!account || !CONTRACT_ADDRESS.startsWith("0x")) return;
    setIsLoading(true);

    const transaction = {
      data: {
        function: `${CONTRACT_ADDRESS}::billboard::send_message`,
        functionArguments: [CONTRACT_ADDRESS, newTitle, newContent],
      },
      options: { maxGasAmount: 2000 }
    };

    try {
      const response = await signAndSubmitTransaction(transaction);
      await aptos.waitForTransaction({ transactionHash: response.hash });
      await fetchMessages();
    } catch (error) {
      console.error("Transaction failed:", error);
    } finally {
      setIsLoading(false);
      setNewTitle("");
      setNewContent("");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [account]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Aptos Billboard</h1>
        {!connected ? (
          <button onClick={() => connect("Petra")}>Connect Wallet</button>
        ) : (
          <div>
            <p>Connected: {account?.address.toString().slice(0, 6)}...{account?.address.toString().slice(-4)}</p>
            <button onClick={disconnect}>Disconnect</button>
          </div>
        )}
      </header>

      {connected && (
        <main>
          <h2>Post a New Message</h2>
          <div className="form">
            <input
              type="text"
              placeholder="Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <textarea
              placeholder="Content"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
            ></textarea>
            <button onClick={handlePostMessage} disabled={isLoading || !newTitle || !newContent}>
              {isLoading ? "Posting..." : "Post Message"}
            </button>
          </div>
        </main>
      )}

      <section className="messages">
        <h2>Messages</h2>
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className="message-card">
              <h3>{msg.title}</h3>
              <p>{msg.content}</p>
              <small>By: {msg.author.toString().slice(0, 6)}...{msg.author.toString().slice(-4)}</small>
            </div>
          )).reverse()
        ) : (
          <p>No messages found. Post one to get started!</p>
        )}
      </section>
    </div>
  );
}

export default App;
