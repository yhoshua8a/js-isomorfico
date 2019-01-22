import express from 'express';

const routes = express.Router();

routes.get('/', (req, res, next)=>{
    res.render('index', {
        title:'To do list',
        description:'to do list isomorfico'
    });
 });



export default routes;