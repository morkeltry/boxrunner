const basicHtmlPage = require('../helpers/superBasicPage');

module.exports= {
  get : (req, res) => {
    const { params, query, originalUrl, ips, ip } = req;
    // console.log(params, 'params');
    // console.log(query, 'query');
    // console.log(originalUrl, 'originalUrl');
    // console.log(ips, 'ips');
    // console.log(ip, 'ip');
    basicHtmlPage(req, res, {ip, url: originalUrl})
  }

}
