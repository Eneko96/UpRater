cd __tests__ 
mongoimport --host localhost --port 27017 --db test --collection users --file users.json --jsonArray
mongoimport --host localhost --port 27017 --db test --collection rates --file rates.json --jsonArray
mongoimport --host localhost --port 27017 --db test --collection profiles --file profiles.json --jsonArray
