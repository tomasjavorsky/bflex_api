const getProductCategories = (req, res, db) => {
  return db.select('*').from('product_categories')
    .then(data => res.json(data))
    .catch(err => res.status(400).json('unable to get product categories from database'));
};

module.exports={
  getProductCategories: getProductCategories
};