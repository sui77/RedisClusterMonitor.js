var net = require('net');

var clusterConfig = [
    ['10.108.30.191', 30001, 'alias 1'],
    ['10.108.30.191', 30002, 'alias 2'],
    ['10.108.30.191', 30003, 'alias 3'],
    ['10.108.30.191', 30004, 'alias 4'],
    ['10.108.30.191', 30005, 'alias 5'],
    ['10.108.30.191', 30006, 'alias 6'],
];

var redisCon = [];

for (n in clusterConfig) {
    console.log('connecting to ' + clusterConfig[n][0] + ':' + clusterConfig[n][1]);
    var redisCon = new net.Socket();
    redisCon.info = clusterConfig[n][0] + ':' + clusterConfig[n][1] + " " + clusterConfig[n][2];
    console.log('connecting to ' + redisCon.info);
    redisCon.connect(clusterConfig[n][1], clusterConfig[n][0]);
    redisCon.write("monitor\r\n");
    redisCon.on("data", function (data) {
        try {
            console.log( "[" + this.info + "] " + data.toString().trim() );
        } catch (e) {
            console.log('Exception: ' + e.toString() );
        }
    });
}