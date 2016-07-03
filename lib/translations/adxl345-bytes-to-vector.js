
//require("babel-polyfill")
var RX = require("rx");
var adxl345Bytes2Vec = require("adxl345-bytes-to-vector");

function vapor(args, dataSources){
  dataSources.get("creationMap").set(args.name, args.source, args, "adxl345-bytes-to-vector");
}

module.exports = function(args, dataSources){
  var name = args.name;

  var dataSource = dataSources.get(args.source);

  var newSource = dataSource.map(function(data){
    return adxl345Bytes2Vec(data);
  })
  .publish()
  .refCount();

  vapor(args, dataSources);
  dataSources.set(args.name, newSource);
}

module.exports.vapor = vapor;

module.exports.getArguments = async function(prompt, dataSources){
  var name = await prompt("What name will you give this new instance?\n");
  var source = await(prompt("What will this be subscribing to?\n"));

  return {
    name:name,
    source:source
  }
}

module.exports.initialize = function(dataSources){
  dataSources.get("translations").set("adxl345-bytes-to-vector", module.exports);
}
