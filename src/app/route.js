import express from 'express';

const routes = express.Router();

routes.get('/', (req, res, next)=>{
    res.render('index', {
        title:'Home',
        description:'template home'
    });
 });

routes.get('/about', (req, res, next)=>{
   res.render('index', {
       title:'about',
       description:'template about'
   });
});