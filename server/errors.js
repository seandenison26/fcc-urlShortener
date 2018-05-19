
const handleErrors = (err,req,res,next) => {
	if(err) {
	console.log(err.message)
	res.send('There was an error. Please provide an actual http/s url.')
	}
}

module.exports = handleErrors
