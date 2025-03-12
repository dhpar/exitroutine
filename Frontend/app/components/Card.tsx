import { ReactNode } from "react";

interface CardProps {
  title: string;
  cardText?: string;
  unit?: string;
  children?: ReactNode;
}

export const Card = ({ title, unit, cardText, children }: CardProps) => (
  <div className='text-center bg-slate-600 p-4 rounded-lg shadow-md shadow-slate-600/60 h-full'>
    <h2 className='text-4xl pb-4'>{title}</h2>
    {cardText && <p className="text-cyan-500 text-2xl">{cardText} {unit?<span className="text-base">{unit}</span> : ''}</p>}
    {children}
  </div>
);