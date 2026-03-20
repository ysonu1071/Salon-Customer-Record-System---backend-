const fs = require('fs');
const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);
const srvName = '_mongodb._tcp.cluster0.4slgzzv.mongodb.net';

dns.resolveSrv(srvName, (err, addresses) => {
  if (err) {
      console.log('Error resolving SRV', err);
      process.exit();
  }
  dns.resolveTxt('cluster0.4slgzzv.mongodb.net', (err, records) => {
    if (err) {
        console.log('Error resolving TXT', err);
        process.exit();
    }
    fs.writeFileSync('srv-result.json', JSON.stringify({addresses, records}, null, 2), 'utf8');
    console.log('Done writing JSON');
  });
});
