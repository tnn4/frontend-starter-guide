// import React from 'react';
import * as React from 'react';

/*
class App extends React.Component {
    render() {
        return (
            <div>Welcome to React!</div>
        );
    }
}

export default App;
*/

function MyButton() {
  return (
    <button>
      I'm a button
    </button>
  );
}
  
export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}