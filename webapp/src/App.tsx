import React from "react";
import homeLogo from "./assets/home-logo.png";

function App() {
  return (
    <div>
      <div className="mx-auto max-w-lg text-center">
        <div className="mt-24">
          <img className="h-36 inline-block" src={homeLogo} alt="dMedia Manager" />
          <span className="sr-only">dMedia Manager</span>
        </div>
        <div className="mt-16">
          <button
            type="button"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Connect Your Wallet
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
