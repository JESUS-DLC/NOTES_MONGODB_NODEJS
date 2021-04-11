const mongoose = require('mongoose');

const {CRUDNM_HOST, CRUDNM_DATABASE}=process.env;
const CRUDNM_URI = `mongodb://${CRUDNM_HOST}/${CRUDNM_DATABASE}`

mongoose.connect(CRUDNM_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true

})

.then(function(db){
    console.log(`database is connected`);
})
.catch(function(err){
    console.log(err);
})