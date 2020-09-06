const { exec } = require("child_process");
const isWhitelisted = require('./whitelist');
// const shouldOverrideIncognito = require('./helpers/overrideIncognito');
const randomToken = require('../helpers/randomToken');
/// assume port 7777
const port = 7777;


const incognito=' --incognito';
const newWindow='';

const addLinkShortener = url=>
  ( url.startsWith('docs.google.com/') || url.startsWith('https://docs.google.com/'))
    ? url+' rebrandly.com'
    : url ;

const processUrl = url=>
addLinkShortener(
  url
    .slice(1)
    .replace('%23','#')
)

const execString = (url, overrideIncognito)=>
  `google-chrome${newWindow}${overrideIncognito ? '' : incognito} ${processUrl(url)}` ;

const getResult = (originalUrl, ip)=> ({
  ip,
  originalUrl,
  isWhitelisted : isWhitelisted(ip)
})

module.exports= {
  get : (req, res) => {
    const { params, query, originalUrl, ips, ip } = req;
    console.log(params, 'params');
    console.log(query, 'query');
    console.log(originalUrl, 'originalUrl');
    console.log(ips, 'ips');
    console.log(ip, 'ip');
    // console.log(req);

    if (originalUrl.match(/^.?127\.0\.0\.1/) || originalUrl.match(/^.?onlySelf/))
      return;

    const result = getResult(originalUrl, ip);
    if (result.isWhitelisted) {
      console.log('I would run ',execString(originalUrl));
      // exec(execString(originalUrl, shouldOverrideIncognito(originalUrl)));
      exec(execString(originalUrl));
    } else {
      console.log(ip,'not whitelisted');
      exec(execString(` 127.0.0.1:${port}/onlySelf${randomToken}.html?${originalUrl}`));

    }
        res.type('application/json');
        res.status(200);
        res.send(result);
  }
}
