
/*
 * GET home page.
 */
var classInfo = require('../script')

exports.insert = function(req, res){
	var klass = req.param("klass");
	console.log(classInfo);
	for(var key in classInfo) {
		console.log(classInfo[key].name, klass);
		if(classInfo[key].name == klass) {
			  res.render('form', { classInfo: classInfo[key] });
			  return;
		}
	}
};