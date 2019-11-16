const getGdprText = (req, res, db) => {
  return db.select('*').from('gdpr_text')
    .then(data => res.json(data))
    .catch(err => res.status(400).json('unable to get gdpr text from database\n' + err));
};