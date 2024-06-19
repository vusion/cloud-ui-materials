let i = 10
const fs = require('fs');
const path = require('path');
const pkgUrl = path.resolve(process.cwd(),"./package.json")
const pkg = require(pkgUrl)
module.exports = function (source, map, data) {
  source= source.replace(/<template>([\s\S]*)<\/template>/g, function (match, p1) {
   return  `<template><div class="${pkg.name}"> ${p1}</div></template>`
  })
  
    return source
  }