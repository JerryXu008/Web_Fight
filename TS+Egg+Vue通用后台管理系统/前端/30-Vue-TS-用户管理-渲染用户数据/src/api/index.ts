import Network from './network';
export const registerUser = (data:{})=>Network.post('/register', data);
export const sendCode2Email = (data:{})=>Network.get('/emailcode', data);
export const sendCode2Phone = (data:{})=>Network.get('/smscode', data);
export const loginUser = (data:{})=>Network.post('/login', data);

export const getUsers = ()=>Network.get('/api/v1/users');

