import { styleText } from 'node:util';

export const logHeaders = (response: Response) => {
    console.group(styleText(['blue'], 'response:'));
    console.log(styleText(['blue'],"type:"), response.type);
    console.log(styleText(['blue'],"url:"), response.url);
    console.log(styleText(['blue'],"status:"), response.status);
    console.log(styleText(['blue'],"ok:"), response.ok);
    console.log(styleText(['blue'],"statusText:"), response.statusText);
    console.log(styleText(['blue'],"headers:"), response.headers);
    console.log(styleText(['blue'],"body:"), response.body);
    console.groupEnd();
}

export const logResponse = (response:unknown) => {
    console.group(styleText(['blue'], 'item:'));
    console.dir(response, {depth: 4});
    // console.log(response);
    console.groupEnd();
}
