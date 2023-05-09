// import { cont_addr } from './contractInfo';
//  import { abi } from './contractInfo';
//  import { addr } from './contractInfo';









var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
const Web3 = require('web3');
var fs = require('fs');
var crypto = require('crypto');
var formidable = require('formidable');

const ipfsAPI = require('ipfs-api');
const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})

const res = require('express/lib/response');
    var web3 = new Web3('http://localhost:8545')
//const LocalStorage = require('node-localstorage').LocalStorage,localStorage = new LocalStorage('./scratch');
    var usn;
	var  fname;
    var lname;
    var dob;
    var markscard;
    

    var app = express();
    app.use(session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    }));
    app.use(bodyParser.urlencoded({extended : true}));
    app.use(bodyParser.json());
    app.use(express.static(__dirname + "/static"));

    app.get('/', function(request, response) {
        response.sendFile(path.join(__dirname + '/static/LOGIN1.html'));
    });
    
   









    app.listen(3000);










    const cont_addr = "0x7E04F7599CbeC6Ee23550B91e4117D101c2547b0";
    // const cont_addr = "0x88d35be312DAe20344CAE560784430bBD44360D5";
    const addr = "0xc3e5c4d7a14cabde60da1797df3f4149c611e919";
    const pass = "maa";
    const abi =[
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "f",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "l",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "pass",
                    "type": "string"
                }
            ],
            "name": "adduser",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "allstud",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "u",
                    "type": "string"
                }
            ],
            "name": "getInfo",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getuser",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "u",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "fname",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "lname",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "dob",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "hash",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "ipfs",
                    "type": "string"
                }
            ],
            "name": "store",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];
    
    
    app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);
   
    let alert = require('alert');
    app.post('/university',function(request,response){

        var user = request.body.user;
        var psw = request.body.psw;
        
        if(user==addr && psw==pass)
        {
        
            
            response.render(path.join(__dirname + '/static/university.html'),{name:"successfully loged in"});
        }
        else{
            response.render(path.join(__dirname + '/static/ulogin.html'),{name:"invalid credentials "});
        }
        

        //console.log(user,psw); 
    });
    

    var MyContract = new web3.eth.Contract(abi, cont_addr);
    var acc;



    app.post('/send', function(request, response) {
        usn = request.body.usn;
        fname = request.body.fname;
        lname= request.body.lname;
        dob = request.body.dob;
        var file = request.body.file;
        var filpath = __dirname+"/filefolder/"+file;

        var data = fs.readFileSync(filpath);
        var hash = crypto.createHash('sha256');
        var finhash = hash.update(data).digest('hex');
        console.log(finhash);
        //var ipfspath;
        // async function saveFile(data) {
        //     let ipfs = await ipfsClient();
        
        //     //let data1 = fs.readFileSync(fp)
        //     let options = {
        //         warpWithDirectory: false,
        //         progress: (prog) => console.log(`Saved :${prog}`)
        //     }
        //     let out = await ipfs.add(data,options);
        //     console.log(out.path); 
        //     return out.path; 
            
        // }
        // ipfspath = saveFile(data);
        // console.log("ipfs path        :"+ipfspath);

        let buf = new Buffer(data);

        ipfs.files.add(buf, function (err, file) {
            if (err) {
              console.log(err);
            }
           var  b = file[0].path;
           console.log(file[0].path);
           var results = MyContract.methods.store(usn,fname,lname,dob,finhash,b).send({from:addr}).then(console.log)
           
           response.render(path.join(__dirname + '/static/university.html'),{name:"successfully uploaded"});    
            
          })
        
        
    });

    app.post('/get', function(request, response) {
         var us = request.body.usn;
         var rusn;
         var rfname;
         var rlname;
         var rdob;
         var rmark;
         var rby;
         var ipfspath;

         MyContract.methods.getInfo(us).call({from:addr},function(err,res){
        rusn= res[0];
        rfname = res[1];
        rlname=res[2];
        rdob = res[3];
        rmark = res[4];
        rby = res[5];
        ipfspath = res[6];
        console.log(rusn);
        console.log(rfname);
        console.log(rlname);
        console.log(rdob);
        console.log(rmark);
        console.log(rby);
        console.log(ipfspath);
        response.render(path.join(__dirname + '/static/viewstud.html'),{name:rfname,name1:rlname,no:rusn,dd:rdob,link:ipfspath,by:rby});

        })      
    });


    app.post('/student', function(request, response) {
        var us = request.body.usn;
        acc = request.body.user;
        var psw = request.body.psw;
        var rusn;
        var rfname;
        var rlname;
        var rdob;
        var rmark;
        var rby; 

        MyContract.methods.getInfo(us).call({from:acc},function(err,res){
       rusn= res[0];
       rfname = res[1];
       rlname=res[2];
       rdob = res[3];
       rmark = res[4];
       rby = res[5];
       ipfspath = res[6];
       console.log(rusn);
       console.log(rfname);
       console.log(rlname);
       console.log(rdob);
       console.log(rmark);
       console.log(rby);
       console.log(ipfspath);
       if(rdob==psw)
       {
        response.render(path.join(__dirname + '/static/studenthome.html'),{usn:rusn,name:rfname,name1:rlname,no:rusn,dd:rdob,link:ipfspath,by:rby});
       }
       else{
        response.render(path.join(__dirname + '/static/LOGIN1.html'),{name:"invalid credentials"});
       }
       

       })  
       
   });






    app.post('/reguser', function(request, response) {
       var racc = request.body.eth;
        var fname = request.body.fname;
        var lname= request.body.lname;
        var pass = request.body.pas;
        
        var results = MyContract.methods.adduser(fname,lname,pass).send({from:racc}).then(console.log)
        
        response.render(path.join(__dirname + '/static/reguser.html'),{name:"successfully registered"});
        
    });

    app.post('/verify',function(request,response){
        
        acc = request.body.user;
        var psw = request.body.psw;
        var bpas;
        MyContract.methods.getuser().call({from:acc},function(err,res){
            bpas = res[3];
            console.log(bpas);
            if(bpas==psw){
                response.render(path.join(__dirname + '/static/verifyhome.html'),{name:"successfully loged in"});
            }
            else{
                response.render(path.join(__dirname + '/static/vlogin.html'),{name:"invalid login credentials"});
            }
            
            }) 

        //console.log(user,psw); 
    });


    app.post('/verifydoc',function(request,response){
        
        var usn = request.body.usn;
        var file = request.body.file;
        var filpath = __dirname+"/filefolder/"+file;

        var data = fs.readFileSync(filpath);
        var hash = crypto.createHash('sha256');
        var finhash = hash.update(data).digest('hex');
        console.log(finhash);
        
        MyContract.methods.getInfo(usn).call({from:acc},function(err,res){
            rfname = res[1];
            rlname=res[2];
            rmark = res[4];
            rby = res[5];
            console.log(rmark);
            console.log(rby);
            //response.render(path.join(__dirname + '/static/viewstud.html'),{name:rfname,name1:rlname,no:rusn,dd:rdob,link:rmark,by:rby});
             if(finhash == rmark)
             {
                response.render(path.join(__dirname + '/static/original.html'),{name:rfname,name1:rlname,by:rby});
             } 
             else{
                response.render(path.join(__dirname + '/static/fak.html'));
             }  
            })  

    });









   

















