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
            ReactDOM.render(<App widget={init.widget} entity={init.entity} />, 
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
//   HeadToHead: ({ entity, selector } : Props) => {
//     return {
//       render: () => {
//         ReactDOM.render(<App widget="head-to-head" entity={entity} />, 
//           document.querySelector(selector)
//         );
//       },
//       unmount(){
//         ReactDOM.unmountComponentAtNode(document.querySelector(selector)); 
//       },
//     }
//   },
//   Stats: ({ entity, selector } : Props) => {
//     return {
//       render: () => {
//         ReactDOM.render(<App widget="stats" entity={entity} />, 
//           document.querySelector(selector)
//         );
//       },
//       unmount(){
//         ReactDOM.unmountComponentAtNode(document.querySelector(selector)); 
//       },
//     }
//   },
// }

// const app = {
//   render: ({selector, entity, widget}: Props) => {
//     ReactDOM.render(<App widget={widget} entity={entity} />, document.querySelector(selector));
//   },
//   unmount: (selector: any) => {
//     ReactDOM.unmountComponentAtNode(document.querySelector(selector)); 
//   }
// }

export default app;