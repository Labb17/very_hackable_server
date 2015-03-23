var fs = require('fs');
var http = require('http');
var url = require('url');

function handleReq(req, res) {
	var query = url.parse(req.url, true).query;

	if (query.status) {
		fs.writeFile('data/' + query.username, JSON.stringify(query));
		res.writeHead(200, {"Content-Type": "text/plain"});
		res.write('successful write.');
		res.end();
	} else {
	
		fs.readFile('data/' + query.username, function (err, filecontent) {
			if (err) {
				console.log(err);
				fs.readFile('index.html', function (err, filecontent) {
					res.writeHead(200, {"Content-Type": "text/html"});
					res.write(filecontent);
					res.end();
				});
				return;
			}
			res.writeHead(200, {"Content-Type": "text/plain"});
			res.write(filecontent);
			console.log(req);
			res.end();
		});

	}
}

http.createServer(handleReq).listen(80, '0.0.0.0');

console.log('Server running at port 80.');

