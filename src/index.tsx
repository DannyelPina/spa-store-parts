import React from "react";
import ReactDOM from "react-dom";

import { App } from "./App";

// ReactDOM.render(
// 	<React.StrictMode>
// 		<App />
// 	</React.StrictMode>,
// 	document.getElementById("root")
// );


let init: any = null;

const app = {
  config: (config: any) =>{
      init = config;
  },
  widgets: {
    myWidget: {
      new: () => {
        return {
          render: () => {
            ReactDOM.render(
              <>
                <div style={{backgroundColor: 'red', color: 'white', height: 50, width: '100%'}}>init.stats</div>
                <App />
              </>
				, 
				document.querySelector(init.selector)
			);
          },
          unmount(){
            ReactDOM.unmountComponentAtNode(document.querySelector(init.selector)); 
          },
        }
      }
    }
  }
}

export default app;