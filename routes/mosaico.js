var express = require('express');
var router = express.Router();
var Personaje = require('../models/personaje');

/* GET home page. */
router.get('/', async(req, res) => {
    try{
        const personajes = await Personaje.find({}, 'id name gender image url created');
          
        personajes.forEach(personaje => {
          if(personaje.gender == 'Male'){
            personaje.gender = 'Masculino';
          }
          else if(personaje.gender == 'Female'){
            personaje.gender = 'Femenino';
          }
          else{
            personaje.gender = 'Bicho raro';
          }
          let fecha = new Date(personaje.created);
          let dia = fecha.getDate().toString().padStart(2, '0');
          let mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
          let año = fecha.getFullYear();
          personaje.created = `${dia}/${mes}/${año}`;
        });
  
        res.render('mosaico', {personajes});
      } catch(error){
        console.log(error);
        res.status(500).send(error);
      }
  });

  router.get('/mosaico', function(req, res) {
    res.redirect('/');
  });

  router.get('/lista', async(req, res) =>{
    try{
      const personajes = await Personaje.find({}, 'id name');
      res.render('lista', {personajes});
    } catch(error){
      console.log(error);
      res.status(500).send(error);
    }
  });

  router.get('/personaje/:id', async(req, res) =>{
    const {id} = req.params;
    try{
      const personaje = await Personaje.find({id:id}, 'id name gender image url created');
      let fecha = new Date(personaje[0].created);
          let dia = fecha.getDate().toString().padStart(2, '0');
          let mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
          let año = fecha.getFullYear();
          personaje[0].created = `${dia}/${mes}/${año}`;
      if(personaje[0].gender == 'Male'){
        personaje[0].gender = 'Masculino';
      }
      else if(personaje[0].gender == 'Female'){
        personaje[0].gender = 'Femenino';
      }
      else{
        personaje[0].gender = 'Bicho raro';
      }
      res.render('personaje', {personaje});
    } catch(error){
      console.log(error);
      res.status(500).send(error);
    }
  });

module.exports = router;