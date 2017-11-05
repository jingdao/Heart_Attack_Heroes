var http = require('http'); // create an http server to handle requests and response 
var heart_rate_data = [];
var data_max_size = 300;
var patients = [
['Clark Kent',115,120,'Paralyzed by kryptonite','severe'],
['Bruce Wayne',150,52,'Low blood pressure','moderate'],
['Tony Stark',120,90,'Critical injuries','severe'],
['Peter Parker',100,80,'Bitten by a harmless spider','mild'],
];
http.createServer(function (req, res) { // sending a response header of 200 OK 
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.writeHead(200, {'Content-Type': 'text/plain'});
	if (req.url.startsWith('/ecg')) {
		res.end(heart_rate_data.toString()); // use port 8080 
	} else if (req.url.startsWith('/patients')) {
		for (i=0;i<patients.length;i++) {
			patients[i][1] += Math.floor(Math.random() * 5 - 2);
			patients[i][2] += Math.floor(Math.random() * 5 - 2);
		}
		res.end(JSON.stringify(patients)); // use port 8080 
	}
}).listen(8080);

//get the heart rate data from sensor
http.createServer(function (req, res) {
	if (req.url.startsWith('/ecg?')) {
	data = req.url.substring(5,req.url.length).split(',');
	heart_rate_data.push.apply(heart_rate_data,data);
	heart_rate_data.splice(0,heart_rate_data.length - data_max_size);
	} else if (req.url.startsWith('/patients?')) {
		data = req.url.substring(10,req.url.length).split(',');
		new_patient = [decodeURI(data[0]),100,100,data[1],data[2]];
		patients.push(new_patient);
	}
	res.writeHead(200, {'Content-Type': 'text/plain'})
	res.end('Received data\n')
}).listen(8081);

console.log('Server running on port 8080.');
