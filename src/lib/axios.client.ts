// src/lib/axios.client.ts
import axios from 'axios';
import { track } from './rum';


const api = axios.create();


api.interceptors.request.use(cfg => { (cfg as any).__t0 = performance.now(); return cfg; });
api.interceptors.response.use(
res => {
track({ kind:'api', url: res.config.url, status: res.status, dt: performance.now() - (res.config as any).__t0 });
return res;
},
err => {
const c = err.config||{};
track({ kind:'api', url: c.url, status: err?.response?.status ?? 0, error:true, dt: performance.now() - (c as any).__t0 });
return Promise.reject(err);
}
);


export default api;