export const isValidToken = () => {
  let tokenExpiry = Number(localStorage.getItem('expires'));
  return new Date(tokenExpiry) > new Date();
};

export const getToken = () => localStorage.getItem('userToken') || '';

interface IRequestOptions {
  method?: string;
  headers?: HeadersInit;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
}

const customHeaders = {
  'X-JWT-Token': getToken(),
  'Content-Type': 'application/json'
};

// const isTokenNearExpiry = () => {
//   if (localStorage.getItem('expires') === null) {
//     return false;
//   }
//   const tokenExpiry = Number(localStorage.getItem('expires'));

//   const minutesToExpiry = moment(tokenExpiry).diff(new Date(), 'minutes');

//   return minutesToExpiry <= 15;
// };

export const fetchWithToken = (url: string, options?: IRequestOptions) => {
  const requestOptions: IRequestOptions = {
    headers: { ...customHeaders }
  };
  if (options) {
    const { method = 'GET', headers, body } = options;
    requestOptions.body = body;
    requestOptions.method = method;
    requestOptions.headers = { ...requestOptions.headers, ...headers };
  }
  //   if (isTokenNearExpiry()) {
  //     console.log('Token near expiry');
  //     reFetchToken().then(() => {
  //       return fetch(url, requestOptions);
  //     });
  //   }
  return fetch(url, requestOptions);
};

// const reFetchToken = () => {
//   return new Promise(async (res, rej) => {
//     await fetch('/refresh', { headers: customHeaders })
//       .then((response) => response.json())
//       .then((json) => {
//         localStorage.setItem('userToken', json.token);
//         localStorage.setItem('expires', json.expires);
//         res(json);
//       });
//   });
// };
