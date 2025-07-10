const express = require('express');
const http = require('http');
const {initSocket }  = require("./Socket/SocketConnection")
require('dotenv').config()
const cors = require('cors')
const cookieParser = require("cookie-parser");
const connectToDB = require('./Config/Db');
const morgan = require('morgan');
const path = require('path')
const fs = require('fs')

const app = express();
const port = process.env.PORT || 80


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());



// cors setting
app.use(cors({
    origin:false,
    credentials:true
}))

app.use(morgan('dev'))


const clientBuildPath = path.resolve(__dirname, "./client/build");
console.log(clientBuildPath);

console.log(clientBuildPath);

if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
    
  app.get(/^\/(?!api).*/, (req, res) => {
    const indexHtml = path.join(clientBuildPath, "index.html");
    console.log(indexHtml);  
    
    if (fs.existsSync(indexHtml)) {
      res.sendFile(indexHtml); 
    } else {
      res.status(500).send("index.html not found.");
    }
  });
}


app.get('/',(req,res)=>{
    res.send('your yakyak')
})

app.use('/api/auth/user',require('./Router/User.routes'))
app.use('/api/message/user',require('./Router/Message.routes'))
app.use('/api/services/user',require('./Router/Service.routes'))




// database connection
connectToDB()

const server = http.createServer(app);
initSocket(server)


server.listen(port,()=>{
    console.log(`Live on http://localhost:${port}`);
    
})