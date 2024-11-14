import express from 'express'
import { connetMongoDB } from './src/config/mongoConfig.js';
const app =express()
const PORT =process.env.PORT || 8000;

// connetMongoDB()

// Router
app.get("/",(res,req)=>{
    console.log("calling")
    res.send("docne")
})


// Listen
connetMongoDB()
.then(()=>{
    app.listen(PORT,(error)=>{
        error
        ? console.log(error)
        :console.log(`server iis running http://localhost:${PORT} `)
    });
})
.catch((error)=> console.error(error));
// app.listen(PORT,(error)=>{
//     error
//     ? console.log(error)
//     :console.log(`server iis running http://localhost:${PORT} `)
// });