var net = require('net');

var client = new net.Socket();
// for increment test
var i=0;
// for Ready flag
var f=0; 

function connect_(){
	// Server IP and Port configuration
	client.connect(5000, '192.168.10.250', function() {
		console.log('Connected');
		f=1;
	});
}

// Send data every second
setInterval(function send_(){
	if(f==1){
		i++;
		client.write(i.toString());
	}
}, 1000);

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
	f=0;
	connect_();
});
