const getProductCategories = (req, res, db) => {
  return db.select('*').from('product_categories')
    .then(data => res.json(data))
    .catch(err => res.status(400).json('unable to get product categories from database\n' + err));
};

const addProductCategory = (req, res, db) => {
  //TODO prepisat
  const {category_name, category_description} = req.body;
  if(category_name === "" || !category_name){
    return res.status(400).json('Category Name cannot be empty');
  }

  db('product_categories')
    .insert({
      category_name: category_name,
      category_description: category_description
    })
    .then(res.json(category_name + " inserted"))
    .catch(err => res.status(400).json('Unable to add product category\n' + err));
};

const removeProductCategory = (req, res, db) => {
  const{category_name} = req.body;
  console.log('api deleting: ' + category_name);
  if(category_name === "" || !category_name){
    return res.status(400).json('Category Name cannot be empty');
  }
  else{
    db('product_categories')
      .where({category_name: category_name})
      .del()
      .then(res.json('Deleted' + category_name))
      .catch(err => res.status(400).json('unable to delete product category from database\n' + err))
  }
};

module.exports={
  getProductCategories: getProductCategories,
  addProductCategory: addProductCategory,
  removeProductCategory: removeProductCategory
};