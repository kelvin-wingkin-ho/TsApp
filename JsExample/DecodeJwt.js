import jwt from 'jsonwebtoken';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywidXNlcm5hbWUiOiJqb2huX2RvZSIsImlhdCI6MTc3NTA4NzgyMiwiZXhwIjoxNzc1MDkxNDIyfQ.nvwsB-zEHSNyv8cKbJgdGPIjGHZ_pUoX_wm0c_ej4Zk';
const decoded = jwt.decode(token);
console.log(decoded);
