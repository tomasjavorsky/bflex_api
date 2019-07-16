const getProductCategories = (req, res, db) => {
  return db.select('*').from('product_categories')
    .then(data => res.json(data))
    .catch(err => res.status(400).json('unable to get product categories from database'));
};

const addProductCategory = (req, res, db) => {
  const {categoryName, categoryDescription} = req.body;
  if(categoryName === "" || !categoryName){
    return res.status(400).json('Category Name cannot be empty');
  }
  db.transaction(trx => {
    trx.insert({
      category_name: categoryName,
      category_description: categoryDescription
    })
      .into('product_categories')
      .then(trx.commit)
      .catch(trx.rollback)
  })
    .catch(err => res.status(400).json('Unable to add product category\n'+err));
};

module.exports={
  getProductCategories: getProductCategories,
  addProductCategory: addProductCategory
};