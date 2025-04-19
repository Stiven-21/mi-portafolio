import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-80 backdrop-blur-sm">
      <div className="text-center text-white">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500 mx-auto mb-4"></div>
        <p className="text-xl font-semibold tracking-wider">Cargando . . .</p>
      </div>
    </div>
  );
}
