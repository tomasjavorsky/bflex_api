const getJobs = (req, res, db) => {
  return db.select('*').from('job_listings')
    .then(data => res.json(data))
    .catch(err => res.status(400).json('unable to get job listings from database\n' + err));
};

const addJob = (req, res, db) => {
  const {job_name, job_description} = req.body;
  console.log("adding job" + job_name + " " + job_description);
  if(job_name === "" || !job_name){
    return res.status(400).json('Job Name cannot be empty');
  }
  db('job_listings')
    .insert({
      job_name: job_name,
      job_description: job_description
    })
    .then(res.json(job_name + " inserted"))
    .catch(err => res.status(400).json('Unable to add job listing\n' + err));
};

const removeJob = (req, res, db) => {
  const{job_id} = req.body;
  if(job_id === "" || !job_id){
    return res.status(400).json('Job id cannot be empty');
  }
  else{
    db('job_listings')
      .where({job_id: job_id})
      .del()
      .then(res.json('Deleted'))
      .catch(err => res.status(400).json('unable to delete job from database\n' + err))
  }
};

module.exports={
  getJobs: getJobs,
  addJob: addJob,
  removeJob: removeJob
};