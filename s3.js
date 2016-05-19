function setS3Credentials(data) {

	AWS.config.update(data);
	AWS.config.region = s3region;

}

function testS3() {
	var bucket = new AWS.S3({
		params : {
			Bucket : s3bucket
		}
	});

	var params = {
		Key : "test",
		ContentType : "text/plain",
		Body : new Date().toString()
	};
	bucket.upload(params, function(err, data) {
		if (err)
			alert("can't connect to s3");
		else
			console.log("s3 access granted");
	});
}

function s3Upload(filename, type, data, callback) {
	var bucket = new AWS.S3({
		params : {
			Bucket : s3bucket
		}
	});

	var params = {
		Key : filename,
		ContentType : type,
		Body : data
	};
	bucket.upload(params, function(err, data) {

		if (err)
			alert("can't upload");
		else if (callback)
			callback();
	});
}

function getNow() {
	var now = new Date().toISOString();

	return now;
	// return "" + now.getUTCFullYear() + (now.getUTCMonth() + 1) + now.getUTCDate() + "-" + now.getUTCHours()
	// + now.getUTCMinutes() + now.getUTCSeconds();
}

function s3Backup(filename, type, callback) {

	var bucket = new AWS.S3({
		params : {
			Bucket : s3bucket
		}
	});

	var params = {
		Key : filename + "." + getNow(),
		ContentType : type,
		CopySource : s3bucket + '/' + filename,
	};

	bucket.copyObject(params, function(err, data) {
		if (err)
			alert("can't backup");
		else if (callback)
			callback();
	});
}