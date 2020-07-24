const mongoose = require('mongoose')

const con = mongoose.connect(
  'mongodb+srv://vondutch2560:Vonmg931407612@mongocluster-fpyaf.gcp.mongodb.net/jap_vid?retryWrites=true&w=majority',
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err) => {
    if (err) console.log(err)
    console.log('Connected successfully')
  }
)

module.exports = con
