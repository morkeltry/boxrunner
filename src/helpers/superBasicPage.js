

const htmlPage = contents=>
  `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
   <html lang="en">
    <head>
      <meta http-equiv="content-type" content="text/html; charset=utf-8">
      ${contents.title && `<title>${contents.title}</title>`}
    </head>
    <body>
    ${contents.p &&
      Array
        .from(contents.p)
        .map(content=>
          `<p>${content}</p>\n`
      )}
    ${contents.a &&
      Array
        .from(contents.a)
        .map(content=>
          `<a href="a">${content}</a>\n`
      )}
    </body>
   </html>
  ` ;

module.exports = (req, res, known)=> {
  const ip = known.ip || req.ip;
  const url = known.url || req.originalUrl;

  res.type('application/text');
  res.status(200);
  res.send( htmlPage({
    p: [`${ip} not whitelisted.`, 'Click the link if it looks safe!'],
    a: url
  }));
}
