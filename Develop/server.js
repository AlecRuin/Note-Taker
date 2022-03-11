const express = require('express');
const path = require('path');
const NoteData = require("./db/db.json")
const PORT = 3001;
const uuid = require('./helpers/uuid');
const fs = require("fs");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

app.get('/api/notes', (req, res) =>{
    res.json(NoteData)
});
app.get('/notes', (req, res) =>{
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});
/*app.post('/api/notes', (req, res) => {//:params. 
    // Log our request to the terminal
    if (req.body) {
        console.info(`${req.method} request received to save a note`);
        // Log the request body
        console.info(req.body);
        const {title, text}=req.body
        if (title || text){
            const IncomingInfo={title,text}
            IncomingInfo.id=uuid()
            console.log(IncomingInfo)
            res.json("NOTE SAVED!")
            fs.readFile(`./db/db.json`,(err,data)=>{
                if (err){
                    console.log(err)
                }else{
                    var Result = JSON.parse(data)
                    Result.push(IncomingInfo)
                    fs.writeFile(`./db/db.json`, JSON.stringify(Result), (err) =>
                        err ? console.error(err) : console.log("SUCCESS")
                    );
                }
            })
        }else{
            res.json("ERROR. NO TITLE OR TEXT GIVEN")
        }     
    }
});*/
app.post('/api/notes', (req, res) => { 
    req.body.id = uuid();
    NoteData.push(req.body);
    res.json(NoteData);
});

app.delete('/api/notes/:id', (req, res) => {
    if (req.body && req.params.id) {
    console.info(`${req.method} request received to delete a note`);
    console.info(req.params);
    var flag = false
    console.log(NoteData)
    for (var x=0;x<NoteData.length;x++){
        if (NoteData[x].id==req.params.id){
            NoteData.splice(x,1)
            flag=true
        }
    }
    console.log(NoteData)
    if (flag){
        console.log("SUCCESSFULLY DELETE NOTE!")
        res.json("SUCCESS")
    }else{
        res.json("ERROR. COULDNT FIND NOTE WITH CORRECT ID")
    }
    }else{
        res.json("ERROR. MISSING PARAMETERS")
    }
  });

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });