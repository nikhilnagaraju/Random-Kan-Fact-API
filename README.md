# Random Kannada Fact API

A simple REST API to fetch random kannada fact.
The API is hosted on [Heroku](https://heroku.com) at [https://random-kan-fact.herokuapp.com/](https://random-kan-fact.herokuapp.com/) with a remote db hosted on [mlab](https://mlab.com).

Checkout the API demo at [http://imnikhil.xyz/api_demo](http://imnikhil.xyz/api_demo).

Random kannada fact with a [json structure](#get-random-fact) can be fetched instantly with this endpoint: 

[https://random-kan-fact.herokuapp.com/random](https://random-kan-fact.herokuapp.com/random)


- [Setup](#setup)
	- [Required Dependencies](#required-dependencies)
- [To Develop or debug](#to-debug-the-api)
- [API overview](#api-overview)
	- [GET random fact](#get-random-fact)
	- [GET an array of random facts](#get-list-of-random-facts)
	- [POST fact](#post-fact)
	- [PUT fact](#put-fact)
	- [DELETE fact](#delete-fact)
- [Note](#note)


## Setup
  Need a remote or local mongodb depolyment. Can use [mlab](http://mlab.com) for free tier, easy remote deployment. Create a local db or a db on mlab and then import the JSON in config dir.

```sh
$ mongoimport  --uri="mongodb://<db_username>:<db_usr_passwd>@<remote path to db>:63367/<db_name>"  --collection <db_collection_name> --file importdb.json --jsonArray
```
Import data to a local db using `mongoimport` command as below, After running ```mongod``` in a new terminal instance.
```sh
$ mongoimport  --uri="mongodb://127.0.0.1:27017/factsdb"  --collection "factslist" --file importdb.json --jsonArray
```

Create a `db.js` file under config directory to export Mongodb/ mlab url OR alternatively use the db.js_example. The file should have a url exported like

```sh
module.exports = {
  url : "mongodb://<mlab_username>:<mlab_user_password>@<hosted mlab domain>:35917/<db_name>"
};
```

An actual working db url/path looks like (can use local path too)

`url : "mongodb://mclient:mclient@ds135917.mlab.com:35917/factsdb"`


## Required Dependencies
  - Express - for server & routing
  - MongoDB - for Database
  - Nodemon - to monitor code changes & build


## To Debug the API
Clone the repo,

 1. `npm install`
 2. `npm start` to compile and run a dev server on [http://localhost:8000](http://localhost:8000). or Alternatively run `node server.js` or use `nodemon server.js`
 3. Make API requests to suitable endpoints using postman or your app and debug.


## API overview

The API is RESTFUL and returns results as JSON. You should always url-encode parameter values when using the API. The examples in this document do *not* url-encode parameter values. The example endpoints for all types of operation and JSON formats returned by the API are as below:

### GET random fact

| End Point | Requires | Description |
|:-----------|:---------------|-------------|
| `/random` | no parameters | Fetch a random kannada fact |

    http://localhost:8000/random
    http://random-kan-fact.herokuapp.com/random

The end point would return a random Kannada fact, a corresponding English translated fact and a relevant img url as JSON object as below.
```sh
{
    "_id": "157",
    "enfact": "Karnataka witnesses about 12,000 Yakshagana performances every year.",
    "knfact": "ಕರ್ನಾಟಕ ರಾಜ್ಯವು ಪ್ರತಿ ವರ್ಷ ಸುಮಾರು 12,000 ಯಕ್ಷಗಾನ ಪ್ರದರ್ಶನಗಳಿಗೆ ಸಾಕ್ಷಿಯಾಗುತ್ತದೆ. ",
    "imgurl": "https://raw.githubusercontent.com/nikhilnagaraju/smplrepo/master/assets/157.jpg"
}
```

### GET list of random facts

| End Point | Requires | Description |
|:-----------|:---------------|-------------|
| `/facts` | no parameters | Returns a JSON array object containing random fact objects |

    http://localhost:8000/facts
    http://random-kan-fact.herokuapp.com/facts

The end point returns a JSON array object with key `randomArray` and contains 10 random Kannada fact objects as below.
```
{
 "randomArray": [
	{
            "_id": "157",
            "enfact": "Karnataka witnesses about 12,000 Yakshagana performances every year.",
            "knfact": "ಕರ್ನಾಟಕ ರಾಜ್ಯವು ಪ್ರತಿ ವರ್ಷ ಸುಮಾರು 12,000 ಯಕ್ಷಗಾನ ಪ್ರದರ್ಶನಗಳಿಗೆ ಸಾಕ್ಷಿಯಾಗುತ್ತದೆ. ",
            "imgurl": "https://raw.githubusercontent.com/nikhilnagaraju/smplrepo/master/assets/157.jpg"
    	},
	{
	    "_id": "254",
	    "enfact": "The first Kannada serial 'Sihikahi' (meaning bittersweet in Kannada) was produced and directed by H N K Murthy.",
	    "knfact": "ಕನ್ನಡದ ಮೊದಲ ಸರಣಿ(ಸೀರಿಯಲ್) “ಸಿಹಿಕಹಿ”ಯನ್ನು ಎಚ್.ಎನ್.ಕೆ ಮೂರ್ತಿ ನಿರ್ಮಿಸಿ, ನಿರ್ದೇಶಿಸಿದರು. ",
	    "imgurl": ""
	  },
		{
	    "_id": "206",
	    "enfact": "Hubli is known as Chota Mumbai",
	    "knfact": "ಹುಬ್ಬಳ್ಳಿಯನ್ನು ಛೋಟಾ ಮುಂಬೈ ಎಂದು ಕರೆಯಲಾಗುತ್ತದೆ ",
	    "imgurl": "https://raw.githubusercontent.com/nikhilnagaraju/smplrepo/master/assets/206.jpg"
	  }
	]
}
```

### POST fact

| End Point  | Requires | Description |
|:-----------|:---------------|-------------|
| `/fact` | `id`,  `knfact`,  `enfact`,  `imgurl` - optional | Posts a kannada fact document to db |


    http://localhost:8000/fact
    http://random-kan-fact.herokuapp.com/fact

The end point would return the posted fact object on success as below, or would return an authorization, redundant error if any.
```sh
{
  "_id": "35",
  "enfact": "The first power station in Asia was set up in Karnataka at Shivanasamudra in 1902 to produce hydroelectric power.",
  "knfact": "ಏಷ್ಯಾದ ಮೊದಲ ಪವರ್ ಸ್ಟೇಷನ್ ಅನ್ನು 1902 ರಲ್ಲಿ ಜಲವಿದ್ಯುತ್ ಶಕ್ತಿ ಉತ್ಪಾದಿಸಲು  ಶಿವನ ಸಮುದ್ರ, ಕರ್ನಾಟಕದಲ್ಲಿ  ಸ್ಥಾಪಿಸಲಾಯಿತು. ",
  "imgurl": "https://raw.githubusercontent.com/nikhilnagaraju/smplrepo/master/assets/35.jpg"
}
```
### PUT fact

| End Point  | Requires | Description |
|:-----------|:---------------|-------------|
| `/fact/<id>` | `knfact`,  `enfact`,  `imgurl` - optional | update a fact document with reference to id in db |


    http://localhost:8000/fact/250
    http://random-kan-fact.herokuapp.com/fact/250

The end point would return the updated fact object on success as below, or would return an error if any.
```
{
	"enfact": "The district of Kodagu has no railway track within it.",
	"knfact": "ಕೊಡಗು ಜಿಲ್ಲೆಯು ಯಾವುದೇ ರೈಲ್ವೆ ಟ್ರ್ಯಾಕ್ ಅನ್ನು ಹೊಂದಿಲ್ಲ. ",
	"imgurl": ""
}
```

### DELETE fact

| End Point  | Requires | Description |
|:-----------|:---------------|-------------|
| `/fact/<id>` | no parameters | delete a fact document with reference to id in db |

    http://localhost:8000/fact/250
    http://random-kan-fact.herokuapp.com/fact/250

The end point would return an object with the deleted fact-id on success as below, or would return an error if any.
```
{
	"fact": "250 deleted"
}
```

## Note
-  *The given example credentials for [mlab](http://mlab.com) have **read-only** permission and hence write operations like `POST`,  `UPDATE`, `DELETE`  wont work, these will return an error object with authorisation error.*
-  If you need better performance or if you are using it for commercial use, host the API and DB in prod environment and don't use this sandox hosted db.
-  If found any bugs with the API report in [issue tracker](https://github.com/nikhilnagaraju/Random-Kan-Fact-API/issues).
-  Licensed under [GNU GPL v3.0](LICENSE).
