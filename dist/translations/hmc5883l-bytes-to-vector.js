
//require("babel-polyfill")
var RX = require("rx");
var hmc5883lBytes2Vec = require("hmc5883l-bytes-to-vector");

function vapor(args, dataSources) {
  dataSources.get("creationMap").set(args.name, args.source, args, "hmc5883l-bytes-to-vector");
}

module.exports = function (args, dataSources) {
  var name = args.name;

  var dataSource = dataSources.get(args.source);

  var newSource = dataSource.map(function (data) {
    return hmc5883lBytes2Vec(data);
  }).publish().refCount();

  vapor(args, dataSources);
  dataSources.set(args.name, newSource);
};

module.exports.vapor = vapor;

module.exports.getArguments = function _callee(prompt, dataSources) {
  var name, source;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _context.next = 2;
        return regeneratorRuntime.awrap(prompt("What name will you give this new instance?\n"));

      case 2:
        name = _context.sent;
        _context.next = 5;
        return regeneratorRuntime.awrap(prompt("What will this be subscribing to?\n"));

      case 5:
        source = _context.sent;
        return _context.abrupt("return", {
          name: name,
          source: source
        });

      case 7:
      case "end":
        return _context.stop();
    }
  }, null, this);
};

module.exports.initialize = function (dataSources) {
  dataSources.get("translations").set("hmc5883l-bytes-to-vector", module.exports);
};