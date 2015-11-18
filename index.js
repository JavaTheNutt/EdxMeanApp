var mongodb = require('mongodb');
/*Port that mongo is listening on*/
var uri = 'mongodb://localhost:27017/example';
/*This connects to the above address and takes a possible error and a possible db handle*/
mongodb.MongoClient.connect(uri, function(error, db) {
	/*If there is an error, log it and exit*/
	if (error) {
		console.log(error);
		process.exit(1);
	}

	db.collection('sample').insert({ x: 1 }, function(error, result) {
		if (error) {
			console.log(error);
			process.exit(1);
		}
		/*If we were to query the database just using find(), a cursor would have been returned rather than the items*/
		db.collection('sample').find().toArray(function(error, docs) {
			if (error) {
				console.log(error);
				process.exit(1);
			}

			console.log('Found docs:');
			docs.forEach(function(doc) {
				console.log(JSON.stringify(doc));
			});
			process.exit(0);
		});
	});
});