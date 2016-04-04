var express = require('express');
var app   = express();
var bodyParser  = require('body-parser');
var morgan  = require('morgan');
var cookieParser    = require('cookie-parser');
var fs    = require('fs');
app.use(bodyParser.json()); 
app.use(morgan('dev')); 
var port=8080;            


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
    res.send(""+a);
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
  "msg_id": "d567989c-1da5-46b2-95c5-43b83d61cd86",
  "_text": "hi",
  "outcomes": [
    {
      "_text": "hi",
      "confidence": 0.546,
      "intent": "greetings",
      "entities": {
        "hello": [
          {
            "value": "hey"
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
				++count;
        result[count]=k.outcomes[0].entities.I_am_fine[b].value;
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
				result[0]="OK";
			}
		}
	}
		if(k.outcomes[0].entities.temperature){
		for(var a=0;a<k.outcomes[0].entities.temperature.length;a++){
			if(k.outcomes[0].entities.temperature[a].value){
				temp=k.outcomes[0].entities.temperature[a].value;
				result[0]="Ac is set to "+temp+" second";
			}
		}
	}

  //save it on cookie
  if(temp==null){
    var a='{"status":"true","data":"'+result+'","duration":'+duration+',"temp":'+temp+',"ac_status":"on"}';
    res.send(JSON.parse('{"status":"true","data":"'+result+'","duration":'+duration+',"temp":'+temp+',"ac_status":"on"}'));
    }
    else{
    //console.log('{"status":"true","data":"'+result+'","duration":'+duration+',"temp":'+temp+',"ac_status","on"}');

    var a='{"status":"true","data":"'+result+'","duration":'+duration+',"temp":'+temp+',"ac_status":"on"}';
    res.send(JSON.parse('{"status":"true","data":"'+result+'","duration":'+duration+',"temp":'+temp+',"ac_status":"on"}'));
 
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

  var ra=JSON.stringify(
/*
    {
  "msg_id": "deb1317c-e67b-417b-a407-08d38175fef0",
  "_text": "send to set ac to thirty minutes",
  "outcomes": [
    {
      "_text": "send to set ac to thirty minutes",
      "confidence": 0.695,
      "intent": "ac",
      "entities": {
        "duration": [{
            "minute": 30,
            "value": 30,
            "unit": "minute",
            "normalized": {
              "value": 1800,
              "unit": "second"
            }
          }
        ]
      }
    }
  ]
}

/*
{
  "msg_id": "1bc39061-d3a5-4fbe-91c0-e8cf2c8b6f53",
  "_text": "is that runs how are you",
  "outcomes": [
    {
      "_text": "is that runs how are you",
      "confidence": 0.689,
      "intent": "greetings",
      "entities": {
        "how_are_you_": [
          {
            "value": "how are you"
          }
        ],
        "I_am_fine": [
          {
            "value": "i am fine"
          }
        ]
      }
    }
  ]
}




{
  "msg_id": "f618841e-43c8-4513-a7fc-a48aa88fb28c",
  "_text": "set temperature to thirty",
  "outcomes": [
    {
      "_text": "set temperature to thirty",
      "confidence": 0.694,
      "intent": "ac",
      "entities": {
        "temperature": [
          {
            "type": "value",
            "value": 12
          }
        ], "how_are_you_": [
          {
            "value": "how are you"
          }
        ],
        "duration": [{
            "minute": 30,
            "value": 30,
            "unit": "minute",
            "normalized": {
              "value": 18000,
              "unit": "second"
            }
          }
        ]
      }
    }
  ]
}
);
*/