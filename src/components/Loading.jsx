import React from "react";

const Loading = () => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black" />

        <p className="text-lg font-medium text-gray-700">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loading;