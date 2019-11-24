const getGdprText = (req, res, db) => {
  db('download_files').select('file_link').where({file_name: 'Podmienky'})
    .then(data => res.json(data))
    .catch(err => res.status(400).json('unable to get gdpr text from database\n' + err));
};

module.exports={
  getGdprText: getGdprText,
};