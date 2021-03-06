const { exec } = require("child_process");
let app = require('./app');

const port = app.get('port');
const delay = 500;
let triesRemaining = 2;
let nextTry;


const tryToListen = ()=> {
  if (triesRemaining--)
    app.listen(port, () => {
      console.log('App running on port', port);
      triesRemaining = 0;
    })
      .on('error', e=> {
        if (e.code==='EADDRINUSE') {
          console.log(e.message);
          if (triesRemaining)
            console.log(`Trying again in ${delay}ms`)
          else {
            exec(`netstat -tulp |grep ${port} |grep node`, (error, stdout, stderr) => {
              // console.log(stdout.split('\n'));
              stdout = stdout.match(/(\d+)(?:\/node)/)[1];
              console.log('Maybe try:');
              console.log(`  kill -9 ${stdout}`);

              // process.exit();
            });
        }} else
          console.log(e);console.log(e.code);console.log(e.message);
      })
};

const showMd5Sum = ()=> {
  exec('tar -cf - somedir | md5sum')
    .stdout.pipe(process.stdout);;
}

showMd5Sum();
// try once
tryToListen();
// try other times (currently 1, irrespective of triesRemaining)
nextTry = setTimeout (()=>{ nextTry=null; tryToListen(); });

process.on('SIGHUP', () => { console.log("Bye bye!"); process.exit(); })
