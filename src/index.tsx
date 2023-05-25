import ReactDOM from "react-dom";

import { App } from "./App";

// import "./i18n";

// ReactDOM.render(
// 	<React.StrictMode>
// 		<App />
// 	</React.StrictMode>,
// 	document.getElementById("root")
// );


type Props = {
  widget: "stats" | "head-to-head";
  entity: "teams" | "player";
  selector: any;
}

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
                <App widget={init.widget} entity={init.entity} />
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

// const app = {
//   render: ({selector, entity, widget}: Props) => {
//     ReactDOM.render(<App widget={widget} entity={entity} />, document.querySelector(selector));
//   },
//   unmount: (selector: any) => {
//     ReactDOM.unmountComponentAtNode(document.querySelector(selector)); 
//   }
// }

export default app;