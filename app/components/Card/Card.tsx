import { HTMLAttributes, PropsWithChildren, ReactNode } from "react";

export const Day = {
    a: "A Day",
    b:  "B Day"
} as const;

export type TDay = typeof Day[keyof typeof Day];

interface CardProps extends PropsWithChildren<HTMLAttributes<HTMLDivElement>>{
  title: string;
  cardText?: string;
  unit?: string;
  dayType?: TDay;
}

export const Card = ({ title, unit, cardText, dayType, ...props }: CardProps) => {
  const dayLetter = !!cardText && cardText === Day.a? 'A' : 'B';
  
  return <div 
    className='min-h-60 bg-slate-600 p-4 rounded-lg shadow-md shadow-slate-600/60 h-full flex flex-col justify-items-start gap-8' 
    {...(props.id && {id: props.id})} 
  >
    {dayType && <h3 className={`self-end text-6xl ${dayType === Day.a? 'text-green-300': 'text-purple-400'}`}>{dayType.toUpperCase()}</h3>}
    <h2 className='text-4xl pb-4'>
      {title}
    </h2>
    {cardText && 
      <p className="text-cyan-500 text-2xl">
        {cardText} {unit?<span className="text-base">{unit}</span> : ''}
      </p>}
    { props.children }
  </div>;
};