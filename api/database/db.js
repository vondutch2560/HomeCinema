const mongoose = require('mongoose')

const con = mongoose.connect(
  'mongodb+srv://vondutch2560:Vonmg931407612@mongocluster-fpyaf.gcp.mongodb.net/jap_vid?retryWrites=true&w=majority',
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) console.err(err)
    console.log('Connected Atlas MongoDB successfully')
  }
)

module.exports = con
