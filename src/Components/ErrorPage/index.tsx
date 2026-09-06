import React from "react";

const Error: React.FC = () => {
  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl font-bold text-red-500">OOPS!!!</h1>
      <h2 className="text-xl mt-4">Something went wrong!!!</h2>
    </div>
  );
};

export default Error;
