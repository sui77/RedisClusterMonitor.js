var listenHttpPort = 80;

var clusterConfig = [
    ['10.108.30.191', 30001, 'blue'],
    ['10.108.30.191', 30002, 'red'],
    ['10.108.30.191', 30003, 'green'],
    ['10.108.30.191', 30004, 'yellow'],
    ['10.108.30.191', 30005, 'white'],
    ['10.108.30.191', 30006, 'purple'],
];


var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var net = require('net');


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(listenHttpPort, function(){});
io.on('connection', function(socket){});



var redisCon = [];
for (n in clusterConfig) {
    var redisCon = new net.Socket();
    redisCon.info = clusterConfig[n];
    redisCon.connect(clusterConfig[n][1], clusterConfig[n][0]);
    redisCon.write("monitor\r\n");
    redisCon.on("data", function (data) {
        try {
            io.emit('msg', {msg: data.toString().replace(/\n/g, '<br>'), 'color': this.info[2] } );
        } catch (e) {
            io.emit('msg', {msg: e.toString(), 'color': this.color } );
        }
    });
}