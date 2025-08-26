import { ApiError } from "next/dist/server/api-utils";
import { FunctionComponent } from "react";

export const CardError:FunctionComponent<ApiError> = (props) => (
  <div 
    className='text-center bg-slate-600 p-4 rounded-lg shadow-md shadow-slate-600/60 h-full' 
  >
    <h2 className='text-4xl pb-4'>
      Error fetching forecast (status code {props.statusCode})
    </h2>
    <p className="text-cyan-500 text-2xl">{props.message}</p>
    <p className="text-cyan-500 text-2xl">{props.stack}</p>
  </div>
);