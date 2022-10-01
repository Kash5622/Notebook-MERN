const mongoose= require('mongoose'); //Import mongoose
const mongoURI="mongodb://localhost:27017/inotebook?directConnection=true" // connecting string in mongoose

// connect to mongo db function
const connectToMongo =()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("connect to mongo succeccfully")
    })
}

module.exports = connectToMongo;    // export mongo db