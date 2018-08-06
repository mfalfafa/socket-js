var net = require('net');

var client = new net.Socket();
var i=0

function connect_(){
	client.connect(5000, '192.168.10.250', function() {
		console.log('Connected');
	});
}

function ready_(){
	client.on('ready'm function(){
		i++;
		client.write(i.toString());
		setInterval(ready_, 1*1000);
	});
}

connect_();

client.on('data', function(data) {
	console.log('Received: ' + data);
	if(data=='ack'){
		client.write('ok')
		client.destroy(); // kill client after server's response
	}
});

client.on('close', function() {
	console.log('Connection closed');
	connect_();
});