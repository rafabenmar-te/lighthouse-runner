const lh = require('lighthouse');
const fs = require('fs');
const minimist = require('minimist');

const args = minimist(process.argv, {
    alias: {
        'port': 'cdpPort',
        'host': 'cdpHost',
        'url': 'url'
    },
    default: {
        cdpPort: 9222,
        cdpHost: 'localhost',
        url: 'https://news.google.com'
    }
});

function writeResultToDisk(result) {
    const jsonResult = JSON.stringify(result);
    if (!fs.existsSync('result')) {
        fs.mkdirSync('result');
    }
    fs.writeFileSync('result/result.json', jsonResult);
}

lh(args.url, {
    port: args.cdpPort,
    hostname: args.cdpHost
}).then(r => {
    writeResultToDisk(r);
    console.log('Success!!!');
}).catch(e => {
    console.error(e);
});