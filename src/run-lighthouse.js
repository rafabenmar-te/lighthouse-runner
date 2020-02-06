const lh = require('lighthouse');
const fs = require('fs');
const minimist = require('minimist');

const args = minimist(process.argv, {
    alias: {
        'port': 'cdpPort',
        'host': 'cdpHost',
        'url': 'url',
        'o': 'output'
    },
    default: {
        cdpPort: 9222,
        cdpHost: 'localhost',
        url: 'https://news.google.com',
        output: 'result.json'
    }
});

function writeResultToDisk(result) {
    const jsonResult = JSON.stringify(result);
    fs.writeFileSync(args.output, jsonResult);
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