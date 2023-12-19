import React, { useEffect, useState } from 'react';
import AppStomp from './AppStomp';

function App() {

  // test
  const [bids, setBids] = useState([0]);
 
  //map the first 5 bids
  const firstBids = bids.map((item) => {
    return (
      <div>
        <p> {item}</p>
      </div>
    );
  });

  useEffect(() => {
    // test
    const ws = new WebSocket("wss://ws.bitstamp.net");

    const apiCall = {
      event: "bts:subscribe",
      data: { channel: "order_book_btcusd" },
    };
    
    ws.onopen = (event) => {
      ws.send(JSON.stringify(apiCall));
    };
  
    ws.onmessage = function (event) {
      const json = JSON.parse(event.data);
      try {
        if ((json.event = "data")) {
          setBids(json.data.bids.slice(0, 5));
        }
      } catch (err) {
        console.log(err);
      }
    };


    return () => {
      
    };
  }, []);

  return (
    <div className="App">
      <div>
        <AppStomp />
      </div>
      <div>
      <h3> Test WebSocket connection to wss://ws.bitstamp.net from a tetoriol </h3>
        {firstBids}
      </div>;
    </div>
  );
}

export default App;
