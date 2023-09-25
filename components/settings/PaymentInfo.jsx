import React from "react";
import { useCollections } from "../../store/useCollections";

const PaymentInfo = () => {
  const { currentPlan, queryInfo } = useCollections();
  console.log({ currentPlan, queryInfo });
  return <div>PaymentInfo</div>;
};

export default PaymentInfo;
