const getContacts = (req, res, db) => {
  return db.select('*').from('contact_info')
    .then(data => res.json(data))
    .catch(err => res.status(400).json('unable to get contacts database\n' + err));
};

const addContact = (req, res, db) => {
  const {contact_text} = req.body;
  console.log("adding contact" + contact_text);
  db('contact_info')
    .insert({
      contact_text: contact_text
    })
    .then(res.json(contact_text + " inserted"))
    .catch(err => res.status(400).json('Unable to add contact\n' + err));
};

const removeContact = (req, res, db) => {
  const{contact_id} = req.body;
  if(contact_id === "" || !contact_id){
    return res.status(400).json('contact id cannot be empty');
  }
  else{
    db('contact_info')
      .where({contact_id: contact_id})
      .del()
      .then(res.json('Deleted'))
      .catch(err => res.status(400).json('unable to delete contact from database\n' + err))
  }
};

module.exports={
  getContacts: getContacts,
  addContact: addContact,
  removeContact: removeContact
};