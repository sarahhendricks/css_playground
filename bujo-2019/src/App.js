import React, { useEffect } from 'react';
import './App.css';
import Pinterest from "./util.js";

const App = () => {
  useEffect(() => {
    Pinterest.login(() => console.log("Calling login callback"));
  //   fetch("https://api.pinterest.com/v1/boards/daisyinaglass/may-inspo/pins",
  //    { mode: 'no-cors' })
  //     .then(res => res.json())
  //     .then(
  //       result => console.log(result)
  //     )
  //   .catch(() => console.log("Well something went wrong."))
  })
  return (
    <div className="App">
      <header className="App-header">


      {/* <a href="https://www.pinterest.com/daisyinaglass/february-inspo/"
   data-pin-do="embedBoard"
   data-pin-board-width="1200"
   data-pin-scale-height="3025"
   data-pin-scale-width="92">
</a>
      <a href="https://www.pinterest.com/daisyinaglass/march-inspo/"
   data-pin-do="embedBoard"
   data-pin-board-width="1200"
   data-pin-scale-height="3025"
   data-pin-scale-width="92">
</a>
      <a href="https://www.pinterest.com/daisyinaglass/april-inspo/"
   data-pin-do="embedBoard"
   data-pin-board-width="1200"
   data-pin-scale-height="3025"
   data-pin-scale-width="92">
</a>
        <a href="https://www.pinterest.com/daisyinaglass/may-inspo/"
   data-pin-do="embedBoard"
   data-pin-board-width="1200"
   data-pin-scale-height="3025"
   data-pin-scale-width="92">
</a>
<a href="https://www.pinterest.com/daisyinaglass/june-inspo/"
   data-pin-do="embedBoard"
   data-pin-board-width="1200"
   data-pin-scale-height="3025"
   data-pin-scale-width="92">
</a>
<a href="https://www.pinterest.com/daisyinaglass/july-inspo/"
   data-pin-do="embedBoard"
   data-pin-board-width="1200"
   data-pin-scale-height="3025"
   data-pin-scale-width="92">
</a>
<a href="https://www.pinterest.com/daisyinaglass/august-inspo/"
   data-pin-do="embedBoard"
   data-pin-board-width="1200"
   data-pin-scale-height="3025"
   data-pin-scale-width="92">
</a>
<a href="https://www.pinterest.com/daisyinaglass/september-inspo/"
   data-pin-do="embedBoard"
   data-pin-board-width="1200"
   data-pin-scale-height="3025"
   data-pin-scale-width="92">
</a>
<a href="https://www.pinterest.com/daisyinaglass/october-inspo/"
   data-pin-do="embedBoard"
   data-pin-board-width="1200"
   data-pin-scale-height="3025"
   data-pin-scale-width="92">
</a>
<a href="https://www.pinterest.com/daisyinaglass/november-inspo/"
   data-pin-do="embedBoard"
   data-pin-board-width="1200"
   data-pin-scale-height="3025"
   data-pin-scale-width="92">
</a>
<a href="https://www.pinterest.com/daisyinaglass/december-inspo/"
   data-pin-do="embedBoard"
   data-pin-board-width="1200"
   data-pin-scale-height="3025"
   data-pin-scale-width="92">
</a> */}
      </header>
    </div>
  );
}

export default App;
