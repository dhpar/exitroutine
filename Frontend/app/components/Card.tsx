import { ReactNode } from "react";

interface CardProps {
  title: string;
  value?: number;
  cardText?: string;
  unit?: string;
  children?: ReactNode;
}

export const Card = ({ title, value, unit, cardText, children }: CardProps) => (
  <div className='bg-slate-600 p-4 rounded-lg shadow-md shadow-slate-600/60 text-center'>
    <h2 className='text-xl'>{title}</h2>
    {value && <p><span className="text-cyan-500 text-6xl">{value}</span> <span className="text-base">{unit}</span></p>}
    {cardText && <p className="text-cyan-500 text-base">{cardText}</p>}
    {children}
  </div>
);