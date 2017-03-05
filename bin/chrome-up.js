#!/usr/bin/env node

const opn = require('opn');
const { createCurrentDomainFromWorkingSpace } = require('./../src/helpers')

const argv = require('yargs').argv;

var domain = createCurrentDomainFromWorkingSpace();
var protocal = 'http'
if (argv.https) {
    protocal = 'https'
}

opn(protocal + '://' + domain, {app: 'chrome'});
