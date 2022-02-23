const fs = require('fs');
const http = require('http');
const url = require('url');

// third party module
const slugify = require('slugify');

// our modules
const replaceFunction = require('./modules/replaceTemplate');
// FILES ---------------------------------------------------------

// blocking way
// const textIn = fs.readFileSync('./txt/input.txt' , 'utf-8');
// console.log(textIn);

// const ourText = `this is how you do it: ${textIn}. \nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt' , ourText);
// console.log('file written!');

//non - blocking way

// fs.readFile('./txt/start.txt','utf-8',(err , data) => {
//     console.log(data);
// });
// console.log('will read file');

//callback hell
// fs.readFile('./txt/start.txt','utf-8' , (err , data1) => {
//     fs.readFile(`./txt/${data1}.txt` , 'utf-8' , (err ,data2) => {
//         // console.log(data2);
//         fs.readFile('./txt/append.txt' , 'utf-8',(err , data3) => {
//             fs.writeFile('./txt/final.txt' , `${data2}\n${data3}` , 'utf-8' , err => {
//                 console.log('file written!!!!');
//             })
//         })
//     })
// })replaceFuction

/////   SERVER -----------------------------------------------------------

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map((ele) => slugify(ele.productName, { lower: true }));                   
console.log(slugs);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //overview
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'content-type': 'text/html',
    });

    const dataHtml = dataObj
      .map((ele) => replaceFunction(tempCard, ele))
      .join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%', dataHtml);
    res.end(output);

    //api
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end(data);

    //products
  } else if (pathname === '/product') {
    res.writeHead(200, {
      'content-type': 'text/html',
    });
    const product = dataObj[query.id];
    const output = replaceFunction(tempProduct, product);
    res.end(output);

    //not found
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
    });
    res.end('PAGE NOT FOUND!');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('listening');
});
