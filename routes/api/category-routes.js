const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try{
    const categoryData = await Category.findAll({
      include:[{model: Product}]
    });
    res.status(200).json(categoryData);
  } catch (err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try{
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    });

    if(!categoryData){
      res.status(404).json({ message: 'No data found with that ID!'});
      return;
    }
    res.status(200).json(categoryData);
  } catch(err){
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try{
    const categoryData = await Category.create({
      category_name: req.body.category_name
    });
    res.status(200).json(categoryData);
  } catch (err){
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const updatedCategory = await Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where:{
        id: req.params.id
      }
    }
  )
  res.json(updatedCategory);
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const deletedCategory = await Category.destroy({
    where:{
      id: req.params.id
    }
  });
  res.json(deletedCategory);
});

module.exports = router;
