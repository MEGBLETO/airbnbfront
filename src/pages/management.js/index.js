import React from "react";
import Navigation from "../../components/Navigation";
import WithAuth from "../../HOC/WithAuth";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
    </div>
  );
};

export default WithAuth(Index);
