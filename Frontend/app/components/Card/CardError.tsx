export const CardError = ({message}: {message?: string}) => (
  <div 
    className='text-center bg-slate-600 p-4 rounded-lg shadow-md shadow-slate-600/60 h-full' 
  >
    <h2 className='text-4xl pb-4'>
      Ups! There was an error loading this card!
    </h2>
    {message && <p className="text-cyan-500 text-2xl">{message}</p>}
  </div>
);