var express = require('express');
var app   = express();
var bodyParser  = require('body-parser');
var morgan  = require('morgan');
var cookieParser    = require('cookie-parser');
var fs    = require('fs');
app.use(bodyParser.json()); 
app.use(morgan('dev')); 
var port=3000;            


app.use(morgan('dev'));

app.use(bodyParser.urlencoded({           // parse application/x-www-form-urlencoded
  extended: true,
  uploadDir: './meddfiles/temp'
}));

var http      = require('http');
app.get('/api/data',function(req,res){

  fs.readFile('saved.txt',"",function(err,a){
    if(err) throw err;
    if(a)console.log(a);
    res.send(JSON.parse(a));
  })
});

app.post('/api/send',function (req,res) {
  var duration=3000;
    var temp=23;
  //var a=req.body;
   // console.log(a);
  /* 
    var k={
            "msg_id": "deb1317c-e67b-417b-a407-08d38175fef0",
            "_text": "send to set ac to thirty minutes",
            "outcomes":[a]
          }; 
     
          //commend it now
          */
          var k= {
  "msg_id": "4a65dee8-c518-47aa-a211-d6d7eb169c30",
  "_text": "set at freezing point",
  "outcomes": [
    {
      "_text": "set at freezing point",
      "confidence": 0.946,
      "intent": "ac",
      "entities": {
        "default": [
          {
            "value": "0 C"
          }
        ]
      }
    }
  ]
};

      //comment take off
          console.log(k.outcomes[0].entities.how_are_you_);
  //var k=req.body;
	var result=new Array();
var count=0;
console.log(k);
	if(k.outcomes[0].intent=='greetings'){ 
    if(k.outcomes[0].entities.hello){
    for(var a=0;a<k.outcomes[0].entities.hello.length;a++){
      if(k.outcomes[0].entities.hello[a].value){
        //console.log(k.outcomes[0].entities.how_are_you_[a].value);
          result[count]=k.outcomes[0].entities.hello[a].value;
          ++count;
      }
    }
  }
    if(k.outcomes[0].entities.how_are_you_){
		for(var a=0;a<k.outcomes[0].entities.how_are_you_.length;a++){
			if(k.outcomes[0].entities.how_are_you_[a].value){
				//console.log(k.outcomes[0].entities.how_are_you_[a].value);
					result[count]=k.outcomes[0].entities.how_are_you_[a].value;
          ++count;
			}
		}
  }
  if(k.outcomes[0].entities.I_am_fine){
		for(var b=0;b<k.outcomes[0].entities.I_am_fine.length;b++){
			if(k.outcomes[0].entities.I_am_fine[b].value){
				//console.log(k.outcomes[0].entities.I_am_fine[b].value);
        result[count]=k.outcomes[0].entities.I_am_fine[b].value;
			++count;
      }
		}
  } 
			var temp=999;
			var duration=999;
	//console.log('{"status":"true","data":"'+result+'","duration":'+duration+',"temp":'+temp+'}');
	
  res.send(JSON.parse('{"status":"true","data":"'+result+'","duration":'+duration+',"temp":'+temp+',"ac_status":"off"}'));
  var a=JSON.parse('{"status":"true","data":"'+result+'","duration":'+duration+',"temp":'+temp+',"ac_status":"off"}');
	}
	else if (k.outcomes[0].intent=='ac'){
    console.log("take value of ac");
		if(k.outcomes[0].entities.duration){
		for(var a=0;a<k.outcomes[0].entities.duration.length;a++){
			if(k.outcomes[0].entities.duration[a].value){
				duration=k.outcomes[0].entities.duration[a].normalized.value;
				result[0]="Air Conditioner is set for "+duration+" Second";
			}
		}
	}
		if(k.outcomes[0].entities.temperature){
    for(var a=0;a<k.outcomes[0].entities.temperature.length;a++){
      if(k.outcomes[0].entities.temperature[a].value){
        temp=k.outcomes[0].entities.temperature[a].value;
        result[0]="Air Conditioner is set to "+temp+" Celsius";
      }
    }
  }
  if(k.outcomes[0].entities.default){
    for(var a=0;a<k.outcomes[0].entities.default.length;a++){
      if(k.outcomes[0].entities.default[a].value){
        temp=k.outcomes[0].entities.default[a].value;
        result[0]="Air Conditioner is set to "+temp+" Celsius";
      }
    }
  }


  //save it on cookie
  if(temp==null){
    var a=JSON.parse('{"status":"true","data":"'+result+'","duration":'+duration+',"temp":'+temp+',"ac_status":"on"}');
    res.send(JSON.parse('{"status":"true","data":"'+result+'","duration":'+duration+',"temp":'+temp+',"ac_status":"on"}'));
    }
    else{ 
    console.log(result+" -"+duration+"-"+temp);
  var a='{"status":"true","data":"'+result+'","duration":'+duration+',"temp":'+temp+',"ac_status":"off"}';
   // var a=JSON.parse('{"status":"true","data":"'+result+'","duration":'+duration+',"temp":'+temp+',"ac_status":"on"}');
   
    res.send('{"status":"true","data":"'+result+'","duration":'+duration+',"temp":'+temp+',"ac_status":"on"}');
 
    //var s=new Buffer(ss);
    //console.log(ss);
    //var p=ss;
    }
  }
//res.send(a);
  
  var k1=JSON.stringify(a);
  console.log(a);
  console.log(k1);
   fs.writeFile('saved.txt', k1, function(err) {
                    if (err) throw err;
                    console.log('file saved');
                    });

  
//for setup for ac command 

})


app.listen(port);
console.log('Magic happens on port ' + port);

/*

*/