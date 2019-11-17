const getGdprText = (req, res, db) => {
  return db('gdpr').select('*').orderBy('gdpr_id', "desc").limit(1)
    .then(data => res.json(data))
    .catch(err => res.status(400).json('unable to get gdpr text from database\n' + err));
};

const addGdprText = (req, res, db) => {
  const {gdpr_text} = req.body;
  console.log("adding gdpr text");
  db('gdpr')
    .insert({
      gdpr_text: gdpr_text
    })
    .then(res.json("gdpr_text inserted"))
    .catch(err => res.status(400).json('Unable to add gdpr text\n' + err));
};