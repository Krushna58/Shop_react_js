import { createContext, useState } from "react";

export const OrderContext = createContext();

function OrderContextProvider(props) {
  let [order, setOrder] = useState([]);    // ✅ Use lowercase `order` for consistency

  console.log(props);
  

  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {props.children}
    </OrderContext.Provider>
  );
}

export default OrderContextProvider;
