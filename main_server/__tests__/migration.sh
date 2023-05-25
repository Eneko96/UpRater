echo "ls $(ls)"
cat /__tests__/users.json
cat users.json
cd __tests__
echo "ls x2 $(ls)"
mongoimport --host localhost --port 27017 --db test --collection users --file /__tests__/users.json --jsonArray
mongoimport --host localhost --port 27017 --db test --collection rates --file /__tests__/rates.json --jsonArray
mongoimport --host localhost --port 27017 --db test --collection profiles --file profiles.json --jsonArray
