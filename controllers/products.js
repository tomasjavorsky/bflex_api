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
  //eg: <endpoint>/products?category=Stavebná chémia
  //eg: <endpoint>/products?searchKeyword=roksorova tyc
  const product_category = req.query.category;
  const product_searchKeyword = req.query.searchKeyword;

  switch(getSpecificity(product_category, product_searchKeyword)){
    case "category":{
        return db('product_data')
          .select('*')
          .where({product_category: product_category})
          .orderBy('product_order', 'desc')
          .then(data => res.json(data))
          .catch(err => res.status(400).json('unable to get products from database\n' + err));
      }
    case "search":{
      return db('product_data')
      .select('*')
        .where(function(){
          this
            .whereRaw('LOWER(product_name) LIKE ?',['%'+product_searchKeyword.toLowerCase()+'%'])
            .orWhereRaw('LOWER(product_tags) LIKE ?',['%'+product_searchKeyword.toLowerCase()+'%'])
        })
          .orderBy('product_id', 'desc')
          .then(data => res.json(data))
          .catch(err => res.status(400).json('unable to get products from database\n' + err));
      }
    default:{
      return db('product_data')
        .select('*')
        .limit(7)
        .orderBy('product_id', 'desc')
        .then(data => res.json(data))
        .catch(err => res.status(400).json('unable to get products from database\n' + err));
    }
  }
};

const getSpecificity = (category, searchKeyword) => {
  if((category && category !== "") && (!searchKeyword || searchKeyword === "")){return "category";}
  if((searchKeyword && searchKeyword !== "") && (!category || category === "")){return "search";}
  return "default";
};

const removeProduct = (req, res, db) => {
  const {product_id} = req.body;
  if(product_id === "" || !product_id){
    return res.status(400).json('Product ID cannot be empty');
  }
  db("product_data")
    .where({product_id: product_id})
    .del()
    .then(res.json('Product Deleted'))
    .catch(err => res.status(400).json('unable to delete product from database\n' + err))
};

const adjustProductOrder = (req,res,db) => {
  const {product_id, increase} = req.body;
  if(increase){
    db('product_data')
      .where('product_id', '=', product_id)
      .increment('product_order', 1)
      .then(res.json('Product order increased'))
      .catch(err => res.status(400).json('unable to update product order\n' + err))
  }else{
    db('product_data')
      .where('product_id', '=', product_id)
      .decrement('product_order', 1)
      .then(res.json('Product order decreased'))
      .catch(err => res.status(400).json('unable to update product order\n' + err))
  }
};

const getEachCategoryImages = (req,res,db) => {

  db.raw("select distinct on (category_id) category_id, category_name, product_image from product_data full outer join product_categories on product_data.product_category = product_categories.category_name")
    .then(data => res.json(data))
    .catch(err => res.status(400).json('unable to get category images from database\n' + err));
};

module.exports={
  addProduct: addProduct,
  getProducts: getProducts,
  removeProduct: removeProduct,
  adjustProductOrder: adjustProductOrder,
  getEachCategoryImages: getEachCategoryImages,
};