import { RestLink } from 'apollo-link-rest'
// import fetch from 'cross-fetch';

// import fetch from 'node-fetch';
// global.Headers = fetch.Headers;

// Create a RestLink for the REST API
// If you are using multiple link types, restLink should go before httpLink,
// as httpLink will swallow any calls that should be routed through rest!
export const restLink = new RestLink({
  endpoints: {
    newsapi: process.env.REACT_APP_RESTAPI_ENDPOINT || '',
  },
  // customFetch: fetch,
  // headers: {
  // 'x-api-key': process.env.REACT_APP_RESTAPI_API_KEY || '',

  // Authorization: `Bearer ${process.env.REACT_APP_RESTAPI_API_KEY || ''}`,
  // 'Content-Type': 'application/json',
  // 'Access-Control-Allow-Origin': '*',
  // 'Access-Control-Allow-Headers':
  // 'Origin, X-Requested-With, Content-Type, Accept',
  // 'Access-Control-Allow-Credentials': 'true',
  // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
  // },
})
