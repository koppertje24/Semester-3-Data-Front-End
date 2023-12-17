import React, { useEffect, useState } from 'react';

function App() {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const wsClient = new WebSocket('ws://localhost:8080/ws');

    wsClient.onopen = () => {
      console.log('Connected to server');
      setWs(wsClient);
    };

    wsClient.onclose = () => {
      console.log('Disconnected from server');
    };

    wsClient.onmessage = e => {
      console.log(`Received: ${e.data}`);
    };

    return () => {
      wsClient.close();
    };
  }, []);

  return (
    <div className="App">
      <h1>Console Logs</h1>
      {/* Display logs here */}
    </div>
  );
}

export default App;
