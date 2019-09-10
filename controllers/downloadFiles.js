const getFiles = (req, res, db) => {
  return db.select('*').from('download_files')
    .then(data => res.json(data))
    .catch(err => res.status(400).json('unable to get files from database\n' + err));
};

const addFile = (req, res, db) => {
  const {file_name, file_description, file_link} = req.body;
  console.log("adding file" + file_name + " " + file_description);
  if(file_name === "" || !file_name){
    return res.status(400).json('file Name cannot be empty');
  }
  db('download_files')
    .insert({
      file_name: file_name,
      file_description: file_description,
      file_link: file_link
    })
    .then(res.json(file_name + " inserted"))
    .catch(err => res.status(400).json('Unable to add file\n' + err));
};

const removeFile = (req, res, db) => {
  const{file_id} = req.body;
  if(file_id === "" || !file_id){
    return res.status(400).json('file id cannot be empty');
  }
  else{
    db('download_files')
      .where({file_id: file_id})
      .del()
      .then(res.json('Deleted'))
      .catch(err => res.status(400).json('unable to delete file from database\n' + err))
  }
};

const adjustFileOrder = (req,res,db) => {
  const {file_id, increase} = req.body;
  if(increase){
    db('download_files')
      .where('file_id', '=', file_id)
      .increment('file_order', 1)
      .then(res.json('File order increased'))
      .catch(err => res.status(400).json('Unable to update file order\n' + err))
  }else{
    db('download_files')
      .where('file_id', '=', file_id)
      .decrement('file_order', 1)
      .then(res.json('File order decreased'))
      .catch(err => res.status(400).json('Unable to update file order\n' + err))
  }
};

module.exports={
  getFiles: getFiles,
  addFile: addFile,
  removeFile: removeFile,
  adjustFileOrder: adjustFileOrder,
};