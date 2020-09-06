const ipV4 = /\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}/

const whitelisted= [
  '192.168.0.101',
  '192.168.0.103',
  '192.168.0.106',
  // '192.168.0.111',
]

whitelisted.forEach((ip, idx, source)=> {
  if (ip.match(ipV4))
    source.push(`::ffff:${ip}`);
});

module.exports = ip=> whitelisted.includes(ip);
