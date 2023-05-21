mongoimport --host localhost --port 27017 --db test --collection users --file migrate_data_users.json --jsonArray &&
mongoimport --host localhost --port 27017 --db test --collection rates --file migrate_data_rates.json --jsonArray &&
mongoimport --host localhost --port 27017 --db test --collection profiles --file migrate_data_profiles.json --jsonArray