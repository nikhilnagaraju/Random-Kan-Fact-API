# Random Kannada Fact API

A simple REST API to fetch random kannada facts.
The APIs are hosted on [Heroku](https://heroku.com) at [https://random-kan-fact.herokuapp.com/](https://random-kan-fact.herokuapp.com) with a remote Mongo hosted on [Mongo Atlas](https://www.mongodb.com/cloud/atlas). Can perform CRUD operations aswell.

Checkout the API demo at [https://kannadafactsapi.firebaseapp.com](https://kannadafactsapi.firebaseapp.com)

- [API Documentation](#api-documentation)
	- [Get random fact](#get-random-fact)
	- [Get an array of facts](#get-an-array-of-facts)
	- [Get fact by id](#get-fact-by-id)
	- [Create a fact](#create-a-fact)
	- [Update fact](#update-fact)
	- [Delete Fact](#delete-fact)
- [API Errors](#api-errors)
- [Development](#development)
	- [Setup](#setup)
	- [Environment config](#environment-config)
- [Notes](#notes)


## API Documentation

The Base url is as below and APIs are RESTful and returns JSON response.

`BASEURL` : `https://random-kan-fact.herokuapp.com`

The example endpoints for all types of operation and example JSON data returned by the API are as below:

#### Fact Object structure
```json
{
    "_id": "string",
    "fact_en": "string",
    "fact_kn": "string",
    "imgurl": "string"
}
```

### Get random fact

The end point will return a singleton JSON object containing a random Kannada fact, a corresponding English translation and a Relevant img url along with a unique `_id` as below. 

| Method | End Point | Params | Description |
|:-----------|:-----------|:---------------|-------------|
| `GET` | `/random` | - | Fetch a random kannada fact |

    https://random-kan-fact.herokuapp.com/random

JSON Response
```json
{
    "_id": "5ead3c5fefee4c5a27aa4fd7",
    "fact_en": "Karnataka witnesses about 12,000 Yakshagana performances every year.",
    "fact_kn": "ಕರ್ನಾಟಕ ರಾಜ್ಯವು ಪ್ರತಿ ವರ್ಷ ಸುಮಾರು 12,000 ಯಕ್ಷಗಾನ ಪ್ರದರ್ಶನಗಳಿಗೆ ಸಾಕ್ಷಿಯಾಗುತ್ತದೆ. ",
    "imgurl": "https://raw.githubusercontent.com/nikhilnagaraju/smplrepo/master/assets/157.jpg"
}
```

### Get an array of facts

The end point returns a JSON array of [`fact` objects](#Fact-Object-structure) with key `facts` and `count` attribute indicating number of objects in `facts` array. The endpoint accepts a optional `count` parmas(`int`) which if not specified is considered as `10`.

| Method | End Point | Params | Description |
|:-----------|:-----------|:---------------|-------------|
| `GET` | `/facts` | `count`: `int` <br>`1<= int <= 20`  | Returns a JSON array object containing random fact objects |

    https://random-kan-fact.herokuapp.com/facts
    https://random-kan-fact.herokuapp.com/facts?count=5

JSON Response
```json
{
    "facts": [
        {
            "_id": "5ead3c5fefee4c5a27aa4fd7",
            "fact_en": "Mirjan Fort was built by Queen Chennabhairadevi of Gersoppa.",
            "fact_kn": "ಗೇರಸೊಪ್ಪದ ರಾಣಿ ಚೆನ್ನಭೈರದೇವಿ ರವರು ಮೀರ್ಜನ್ ಬಂದರುನ್ನು ನಿರ್ಮಿಸಿದರು. ",
            "imgurl": "https://raw.githubusercontent.com/nikhilnagaraju/smplrepo/master/assets/172.jpg"
        },
        {
            "_id": "5ead3c5fefee4c5a27aa5017",
            "fact_en": "Ilakal town of Bagalkot is famous for the 'Ilakal Saree'.",
            "fact_kn": "ಬಾಗಲಕೋಟೆ ಇಳಕಲ್ ಪಟ್ಟಣ ‘ಇಳಕಲ್ ಸೀರೆ'ಗೆ ಹೆಸರುವಾಸಿಯಾಗಿದೆ. ",
            "imgurl": "https://raw.githubusercontent.com/nikhilnagaraju/smplrepo/master/assets/236.jpg"
        },
        {
            "_id": "5ead3c5fefee4c5a27aa4f72",
            "fact_en": "Mysore Paints and Varnish Limited is the sole supplier of Voter's ink in India.",
            "fact_kn": "ಭಾರತದಲ್ಲಿ 'ಮೈಸೂರು ಪೇಂಟ್ಸ್ ಅಂಡ್ ವಾರ್ನಿಶ್ ಲಿಮಿಟೆಡ್' ಮಾತ್ರವೆ ಮತದಾರರ ಶಾಯಿ ಸರಬರಾಜು ಮಾಡುವ ಏಕೈಕ ಘಟಕ. ",
            "imgurl": "https://raw.githubusercontent.com/nikhilnagaraju/smplrepo/master/assets/71.jpg"
        },
        {
            "_id": "5ead3c5fefee4c5a27aa4ff6",
            "fact_en": "Da Ra Bendre is known as Varakavi meaning Gifted Poet.",
            "fact_kn": "ಪ್ರತಿಭಾವಂತ ಕವಿ ದಾ. ರಾ. ಬೇಂದ್ರೆಯನ್ನು ವರಕವಿ ಎಂದು ಕರೆಯಲಾಗುತ್ತದೆ. ",
            "imgurl": "https://raw.githubusercontent.com/nikhilnagaraju/smplrepo/master/assets/203.jpg"
        },
        ...
    ],
    "count": 10
}
```

### Get fact by id

The end point will return a singleton JSON object containing a random Kannada fact, a corresponding English translation and a Relevant img url along with a unique `_id` as below. 

| Method | End Point | Params | Description |
|:-----------|:-----------|:---------------|-------------|
| `GET` | `/facts/<id>` | - | Fetch a fact by id |

    https://random-kan-fact.herokuapp.com/random/5ead3c5fefee4c5a27aa4fd7

JSON Response
```json
{
    "_id": "5ead3c5fefee4c5a27aa4fd7",
    "fact_en": "Karnataka witnesses about 12,000 Yakshagana performances every year.",
    "fact_kn": "ಕರ್ನಾಟಕ ರಾಜ್ಯವು ಪ್ರತಿ ವರ್ಷ ಸುಮಾರು 12,000 ಯಕ್ಷಗಾನ ಪ್ರದರ್ಶನಗಳಿಗೆ ಸಾಕ್ಷಿಯಾಗುತ್ತದೆ. ",
    "imgurl": "https://raw.githubusercontent.com/nikhilnagaraju/smplrepo/master/assets/157.jpg"
}
```

### Create a fact

The Endpoint requires raw JSON containing `fact_kn`, `fact_en` and returns a (fact Object)[#Fact-Object-structure]

| Method  | End Point  | Data | Description |
|:-----------|:-----------|:---------------|-------------|
| `POST` | `/facts` | `fact_kn` *<br>`fact_en` *<br>`imgurl` - optional | Posts a kannada fact document to db |


    https://random-kan-fact.herokuapp.com/facts

JSON Response
```json
{
  "_id": "5ead3c5fefee4c5a27aa4f72",
  "fact_en": "The first power station in Asia was set up in Karnataka at Shivanasamudra in 1902 to produce hydroelectric power.",
  "fact_kn": "ಏಷ್ಯಾದ ಮೊದಲ ಪವರ್ ಸ್ಟೇಷನ್ ಅನ್ನು 1902 ರಲ್ಲಿ ಜಲವಿದ್ಯುತ್ ಶಕ್ತಿ ಉತ್ಪಾದಿಸಲು  ಶಿವನ ಸಮುದ್ರ, ಕರ್ನಾಟಕದಲ್ಲಿ  ಸ್ಥಾಪಿಸಲಾಯಿತು.",
  "imgurl": "https://raw.githubusercontent.com/nikhilnagaraju/smplrepo/master/assets/35.jpg"
}
```

### Update fact
PUT API requires `id` of the document and data. The end point updates a fact document and returns the updated [fact object](#fact-object-structure) on success as below.

| Method | End Point  | Data | Description |
|:-----------|:-----------|:---------------|-------------|
| `PUT` | `/facts/<id>` | `fact_en` *<br>`fact_kn` *<br>`imgurl` - optional | update a fact document with reference to id in DB |


    https://random-kan-fact.herokuapp.com/facts/5ead3c5fefee4c5a27aa4f72

JSON Response
```json
{
  "_id": "5ead3c5fefee4c5a27aa4f72",
  "fact_en": "The first power station in Asia was set up in Karnataka at Shivanasamudra in 1902 to produce hydroelectric power.",
  "fact_kn": "ಏಷ್ಯಾದ ಮೊದಲ ಪವರ್ ಸ್ಟೇಷನ್ ಅನ್ನು 1902 ರಲ್ಲಿ ಜಲವಿದ್ಯುತ್ ಶಕ್ತಿ ಉತ್ಪಾದಿಸಲು  ಶಿವನ ಸಮುದ್ರ, ಕರ್ನಾಟಕದಲ್ಲಿ  ಸ್ಥಾಪಿಸಲಾಯಿತು.",
  "imgurl": "https://raw.githubusercontent.com/nikhilnagaraju/smplrepo/master/assets/35.jpg"
}
```

### Delete fact
End point performs hard delete on DB and would return an object with the deleted fact-id on success.

| Method  | End Point  | params/data | Description |
|:-----------|:-----------|:---------------|-------------|
| `DELETE`| `/facts/<id>` | - | Delete a fact document with reference to id in db |

    http://random-kan-fact.herokuapp.com/facts/5ead3c5fefee4c5a27aa4f72

JSON Response
```json
{
	"removedId": "5ead3c5fefee4c5a27aa4f72"
}
```

### API Errors
* On Invalid `id` for [Get fact by id](#get-fact-by-id), [Update fact](#update-fact), [Delete fact](#delete-fact) a `400` status code with error response is sent as below
```json
{
    "status": "error",
    "message": "Invalid Document ID",
}
```

* For [Get an array of facts](#get-an-array-of-facts), [Get random fact](#get-random-fact) if the DB contains no documents or docs less than the requested `count`, a `400` status code with error response is sent as below
```json
{
    "status": "error",
    "message": "No Data found.",
}
```

* For [Create a fact](#create-a-fact), [Update fact](#update-fact) APIs if the data doesn't contain either of `fact_en`, `fact_kn` attributes an error response with `400` status code is sent.

* For APIs with write operations like [Create a fact](#create-a-fact), [Update fact](#update-fact), [Delete fact](#delete-fact) `write-premission` is disabled in deployment and can be toggled using [Environment config](#environment-config). If disabled, API results a `400` status code with response as below
```json
{
    "status": "error",
    "message": "Access denied for write operation",
}
```

## Development
  * Requires `mongodb` and `node 12+`
  * Install dependancies `npm install`
  * To run server `npm start`
  * To run dev server with watch `npm run serve`
  * To format code `npm run prettify`
  * Run linter `npm run lint` which uses EcmaScript 2017 standard rules.

### Setup

Ensure `mongod` service is started and then restore the `dump` to required mongo host
```sh
mongorestore dump
```
#### Environment config
* App uses `.env` config if the file is present in app-root, else uses the `process.env` variables passed for `node app.js` command
* copy `.env.example` as `.env` file to app-root
```sh
cp .env.example .env
```
* If config config variable are not preset in `.env` file and no `process.env` variables are specified, defaults will be used.

| Config  | Description  | defaults |
|:-----------|:-----------|:---------------|
| `PORT` | Server port  | `8989` |
| `DB_URL` | Mongo DB Connection URL (may contain db user and password) | `mongodb://localhost:27017` |
| `DB_NAME` | DB name  | `factsdb` |
| `WRITE_ALLOWED` | Write permission on APIs<br> Write allowed - `1`<br> Block writes - `0` | `1` |
| `NODE_ENV` | App Mode | `DEV` |


## Notes
-  If in need of better performance or commercially used, host the API and DB in prod environment and don't use this sandox hosted db.
-  If found any bugs with the API report in [issue tracker](https://github.com/nikhilnagaraju/Random-Kan-Fact-API/issues).
-  Licensed under [GNU GPL v3.0](LICENSE).