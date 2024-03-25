const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    // finding all categories
    const categories = await Category.findAll({ include: [{ model: Product }] });
    res.status(200).json(categories);
  } catch (err) {
    // for handling errors
    res.status(500).json({ message: 'not found!' });
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    // finding the category with the matching ID
    const category = await Category.findByPk(req.params.id, { include: [{ model: Product }] });

    // error message 
    if (!category) {
      res.status(404).json({ message: 'id not found' });
      return;
    }

    res.status(200).json(category);
  } catch (err) {
    // handling errors
    res.status(500).json({ message: 'not found!' });
  }
});

router.post('/',async (req, res) => {
  // create a new category
  try {
    // create new category using the request body data
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    // error message 
    res.status(400).json({ message: 'creation failed' });
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    // updating cateogry with matching ids 
    const updated = await Category.update(req.body, { where: { id: req.params.id } });

    
    // error message or the updated data
    !updated[0] ? res.status(404).json({ message: 'id not found' }) : res.status(200).json(updated);
  } catch (err) {
    // errors
    res.status(500).json({ message: 'update failed' });
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleted = await Category.destroy({ where: { id: req.params.id } });

//errors
    !deleted ? res.status(404).json({ message: 'id not found' }) : res.status(200).json(deleted);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
