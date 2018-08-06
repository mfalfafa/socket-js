var net = require('net');

var client = new net.Socket();

function connect_(){
	client.connect(5000, '192.168.10.250', function() {
		console.log('Connected');
		client.write('Hello, server! Love, Client.');
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