const addProduct = (req, res, db) => {
  const {
    product_name,
    product_description,
    product_image,
    product_tags,
    product_columns,
    product_rows,
    product_category
  } = req.body;

  if(product_name === "" || !product_name){
    return res.status(400).json('Product Name cannot be empty');
  }
  if(product_category === "" || !product_category){
    return res.status(400).json('Product Category cannot be empty');
  }


  db("product_data")
    .insert({
      product_name: product_name,
      product_description: product_description,
      product_image: product_image,
      product_tags: product_tags,
      product_columns: product_columns,
      product_rows: product_rows,
      product_category: product_category
    })
    .then(res.json(product_name + "inserted"))
    .catch(err => res.status(400).json("error inserting " + product_name + " \n"+err));
};
const getProducts = (req, res, db) => {
  const product_category = req.query.category;
  if(product_category === "" || !product_category){
    return res.status(400).json('Product Category cannot be empty');
  }
  return db('product_data')
    .select('*')
    //.where({product_category: product_category})
    .then(data => res.json(data))
    .catch(err => res.status(400).json('unable to get products from database\n' + err));
};
module.exports={
  addProduct: addProduct,
  getProducts: getProducts
};