echo "script_dir: $script_dir"
echo "ls: $(ls)"
mongoimport --host localhost --port 27017 --db test --collection users --file /__tests__/migrate_data_users.json --jsonArray
mongoimport --host localhost --port 27017 --db test --collection rates --file /__tests__/migrate_data_rates.json --jsonArray
mongoimport --host localhost --port 27017 --db test --collection profiles --file /__tests__/migrate_data_profiles.json --jsonArray