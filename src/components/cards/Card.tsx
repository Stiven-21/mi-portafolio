import Image from "next/image";
import React from "react";

interface CardProps {
  titulo: string;
  descripcion: string;
  imagen: string;
  footer: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ titulo, descripcion, imagen, footer }) => {
  return (
    <div className="group select-none relative bg-white rounded-lg shadow-md overflow-hidden w-full hover:scale-105 transition-transform duration-300 ease-in-out">
      <Image
        src={imagen}
        alt={titulo}
        width={300}
        height={200}
        className="w-full h-48 object-cover group-hover:opacity-50 transition-opacity duration-200"
      />
      <div className="absolute bg-slate-950/0 opacity-0 group-hover:opacity-100 inset-0 flex items-center justify-center group-hover:bg-slate-950/50 transition-opacity duration-200">
        <button className="bg-blue-500 hover:bg-blue-700 cursor-pointer select-none text-white font-bold py-2 px-4 rounded hover:scale-105 transition-transform duration-300 ease-in-out">
          Ver Proyecto
        </button>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">{titulo}</h2>
        <p className="text-gray-700">{descripcion}</p>
      </div>
      <div className="border-t p-4">{footer}</div>
    </div>
  );
};

export default Card;
