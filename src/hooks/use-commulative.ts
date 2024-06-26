import { useTypedSelector } from "./use-typed-selector";

export const useCummulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    //@ts-ignore
    const { data, order } = state.cells;
    //@ts-ignore
    const orderedCells = order.map((id) => data[id]);
    const showFunc = `
    import _React from 'react';
    import _ReactDOM from 'react-dom'
     var show = (value) => {
       const root = document.querySelector('#root')
       if(typeof value === 'object') {
         if(value.$$typeof && value.props) {
           _ReactDOM.render(value, root)
         }
         else{
           root.innerHTML = JSON.stringify(value);
         }
       }
       else{
         root.innerHTML = value
       }
     };
     `;
    const showFunctionNoop = "var show = () => {}";
    const commulativeCode = [];
    for (let c of orderedCells) {
      if (c.type === "code") {
        if (c.id === cellId) {
          commulativeCode.push(showFunc);
        } else {
          commulativeCode.push(showFunctionNoop);
        }
        commulativeCode.push(c.content);
      }
      if (c.id === cellId) {
        break;
      }
    }
    return commulativeCode;
  }).join("\n");
};
