/* global window */
import { message } from 'antd';
import axios from 'axios';

const qs =require('qs');

const jsonp =require( 'jsonp');
const lodash =require('lodash');
const  pathToRegexp:any =require('path-to-regexp');
const YQL:String="";
const CORS:any=[];
const fetch = (options:any) => {
  let { method = 'get', data, fetchType, url } = options;

  const cloneData = lodash.cloneDeep(data);

  try {
    let domin = '';
    if (url.match(/[a-zA-z]+:\/\/[^/]*/)) {
      [domin] = url.match(/[a-zA-z]+:\/\/[^/]*/);
      url = url.slice(domin.length);
    }
    const match = pathToRegexp.parse(url);
    url = pathToRegexp.compile(url)(data);
    for (let item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name];
      }
    }
    url = domin + url;
  } catch (e) {
    message.error(e.message);
  }

  if (fetchType === 'JSONP') {
    return new Promise((resolve, reject) => {
      jsonp(
        url,
        {
          param: `${qs.stringify(data)}&callback`,
          name: `jsonp_${new Date().getTime()}`,
          timeout: 4000,
        },
        (error:any, result:any) => {
          if (error) {
            reject(error);
          }
          resolve({ statusText: 'OK', status: 200, data: result });
        },
      );
    });
  } else if (fetchType === 'YQL') {
    url = `http://query.yahooapis.com/v1/public/yql?q=select * from json where url='${
      options.url
    }?${encodeURIComponent(qs.stringify(options.data))}'&format=json`;
    data = null;
  }

  console.info('request => url: ', url);
  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        params: cloneData,
      });
    case 'delete':
      return axios.delete(url, {
        data: cloneData,
      });
    case 'post':
      return axios.post(url, cloneData);
    case 'put':
      return axios.put(url, cloneData);
    case 'patch':
      return axios.patch(url, cloneData);
    default:
      return axios(options);
  }
};

export default function request(options:any) {
  if (options.url && options.url.indexOf('//') > -1) {
    const origin = `${options.url.split('//')[0]}//${
      options.url.split('//')[1].split('/')[0]
    }`;
    if (window.location.origin !== origin) {
      if (CORS && CORS.indexOf(origin) > -1) {
        options.fetchType = 'CORS';
      } else if (YQL && YQL.indexOf(origin) > -1) {
        options.fetchType = 'YQL';
      } else {
        options.fetchType = 'JSONP';
      }
    }
  }

  return fetch(options)
    .then((response:any) => {
      const { statusText, status }:any = response;
      let data =
        options.fetchType === 'YQL'
          ? response.data.query.results.json
          : response.data;
      if (data instanceof Array) {
        data = {
          list: data,
        };
      }
      return Promise.resolve({
        success: true,
        message: statusText,
        statusCode: status,
        ...data,
      });
    })
    .catch(error => {
      const { response } = error;
      let msg;
      let statusCode;
      if (response && response instanceof Object) {
        const { data, statusText } = response;
        statusCode = response.status;
        msg = data.message || statusText;
      } else {
        statusCode = 600;
        msg = error.message || 'Network Error';
      }

      /* eslint-disable */
      return Promise.reject({ success: false, statusCode, message: msg });
    });
}
