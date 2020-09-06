const ipV4 = /\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}/

const whitelisted= [
  /^https:\/\/riot.im\/app\//
]

// whitelisted.forEach((url, idx, source)=> {
//     source.push(`/https:\/\//`);
//     source.push(`/http:\/\//`);
//     source.push(`/\//`);
// });

console.log(whitelisted.map(str=>`'${str}'`));

module.exports = url=> whitelisted.includes(url);


//UNFINISHED don't  have time!!!
