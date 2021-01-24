const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');

// Write Headers
writeStream.write(`Title,Link,Date \n`);

var url = "https://somethinghitme.com";
request(url, (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);

    $('.article').each((i, el) => {
      const title = $(el)
        .find('h3')
        .text()
        .replace(/\s\s+/g, '');
      const link = $(el)
        .find('a')
        .attr('href');
      const date = $(el)
        .find('small')
        .text()
        .replace(/,/, '');

      // Write Row To CSV
      writeStream.write(`${title}, ${url + link}, ${date} \n`);
    });

    console.log('Scraping Done...');
  }
});