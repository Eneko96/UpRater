# remove mongo test db
script_dir=$(dirname "$(realpath "$0")")
echo "script_dir: $script_dir"
users=$(cat ../scripts/migrate_data_users.json)
rates=$(cat ../scripts/migrate_data_rates.json)
profiles=$(cat ../scripts/migrate_data_profiles.json)
host=$(docker-compose exec mongo1 mongo --quiet --eval "db.isMaster().primary" | awk -F: '{print $1}')
echo "host: $host"

# migrate data to test db
users=$(echo "$users" | jq '[.[] | ._id = ._id["$oid"]]') 
echo "users: $users"
docker-compose exec -T $host mongo --quiet test --eval "db.users.insert($users)"
rates=$(echo "$rates" | jq '[.[] | .user_from = .user_from["$oid"], .user_to = .user_to["$oid"]]')
docker-compose exec -T $host mongo --quiet test --eval "db.rates.insert($rates)"
profiles=$(echo "$profiles" | jq '[.[] | ._id = ._id["$oid"]]')
docker-compose exec -T $host mongo --quiet test --eval "db.profiles.insert($profiles)"


docker-compose exec -it node_test sh -c "npm run test"


docker-compose exec $host mongo --quiet --eval "db.getSiblingDB('test').dropDatabase()" > /dev/null