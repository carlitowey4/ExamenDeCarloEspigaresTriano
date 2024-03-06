var express = require('express');
var router = express.Router();
const db = require('../models');

router.get('/', async function(req, res) {
  try {
    const personajes = await db.RickYMorty.findAll(); 
    res.render('sqlite', {personajes});
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    res.status(500).json({ error: 'Error interno del servidor' }); 
  }
});

router.post('/', async function(req, res) {
  const { id, name, gender, image, created } = req.body;
  try {
      const existingCharacter = await db.RickYMorty.findOne({ where: { id: id } });
      if (existingCharacter) {
          return res.redirect('/seq');
      } else {
          await db.RickYMorty.create({
              id: id,
              name: name,
              gender: gender,
              image: image,
              created: created
          });
          console.log('Personaje insertado en la base de datos local.');
          res.redirect('/seq');
      }
  } catch (error) {
      console.error('Error al guardar el personaje en la base de datos local:', error);
      res.status(500).json({ error: 'Error interno del servidor' }); 
  }
});

router.delete('/:id', async function(req, res) {
  const { id } = req.params;
  try {
      const deletedCharacter = await db.RickYMorty.delete({ where: { id: id } });
      if (deletedCharacter) {
          console.log('Personaje eliminado de la base de datos local:', deletedCharacter);
          res.sendStatus(200);
      } else {
          console.log('Personaje no encontrado en la base de datos local.');
          res.sendStatus(404);
      }
  } catch (error) {
      console.error('Error al eliminar el personaje de la base de datos local:', error);
      res.status(500).json({ error: 'Error interno del servidor' }); 
  }
});

module.exports = router;