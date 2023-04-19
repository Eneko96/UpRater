# bin/bash

# This script is used to migrate data to the new rate database on cold start

# This script is called from the Dockerfile
echo "Migrating data from $HOST"

mongoimport --host dbrs/mongo1:27017,mongo2:27017,mongo3:27017 --db uprater --collection users --file /scripts/migrate_data_users.json --jsonArray
mongoimport --host dbrs/mongo1:27017,mongo2:27017,mongo3:27017 --db uprater --collection rates --file /scripts/migrate_data_rates.json --jsonArray




