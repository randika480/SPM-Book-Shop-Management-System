import React, { useState } from "react";
import TopSelling from "./TopSelling";
import AllSales from "./AllSales";

const SalesComponent = () => {
  const [openAllSales, setOpenAllSales] = useState(true);

  return (
    <div className="w-full h-auto  bg-white">
      <div className="pt-8">{openAllSales && <AllSales />}</div>
    </div>
  );
};

export default SalesComponent;
