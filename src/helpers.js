const path = require('path');
const variable = require('./variable')
const os = require('os');
const argv = require('yargs').argv;

const getCurrentDevWorkingDir = function() {
    // create regex to delete dev directory path
    var re_sep = path.sep;
    if (re_sep == '\\') {
        re_sep = '\\\\'
    }
    var re = new RegExp(".+?" + variable.development.directory + re_sep,"g")

    // replace it and extract as array
    return segments = process.cwd().replace(re, '').split(path.sep)
}

const getLanIP = function() {
    //$ref https://stackoverflow.com/a/10756441/1162506
    //@ref http://nodejs.org/api/os.html#os_os_networkinterfaces
    var interfaces = os.networkInterfaces()
    var addresses = []
    for (var k in interfaces) {
        for (var k2 in interfaces[k]) {
            var address = interfaces[k][k2]
            if (address.family === 'IPv4' && !address.internal) {
                addresses.push(address.address)
            }
        }
    }

    return addresses
}

const createCurrentDomainFromWorkingSpace = function() {

    // get properly ip
    var ips = getLanIP();
    var ip = '127.0.0.1'
    if (ips.length > 0) {
        ip = ips[0]
    }


    var domain = "";
    var segments = getCurrentDevWorkingDir();
    var i = segments.length-1;
    for(;i >=0; i--) {
        domain += segments[i] + '.'
    }
    domain += ip + '.'

    if (argv.xip) {
        domain += 'xip.io'
    } else {
        domain += 'nip.io'
    }

    return domain
}

module.exports = {
    getCurrentDevWorkingDir,
    createCurrentDomainFromWorkingSpace,
    getLanIP
}

