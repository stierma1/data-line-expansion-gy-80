
//require("babel-polyfill")

function vapor(args, dataSources){
  dataSources.get("creationMap").set(args.name, args.source, args, "flip-z-axis");
}

module.exports = function(args, dataSources){
  var name = args.name;

  var dataSource = dataSources.get(args.source);

  var newSource = dataSource.map(function(vector){
    var newVector = vector.concat([]);
    newVector[2] *= -1;
    return newVector;
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
  dataSources.get("translations").set("flip-z-axis", module.exports);
}
