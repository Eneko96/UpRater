#!/bin/bash

wait_for_mongo() {
  local container_name="$1"
  local retries=20
  local wait_time=5

  for i in $(seq 1 "$retries"); do
    if docker exec "$container_name" mongo --quiet --eval "db.runCommand({ping: 1})" > /dev/null 2>&1; then
      return 0
    else
      echo "Waiting for MongoDB in container ($container_name) to be available..."
      sleep "$wait_time"
    fi
  done

  echo "MongoDB is still not available after $((retries * wait_time)) seconds, exiting."
  exit 1
}


# as we want to create and set our replica set, we need to wait for the mongo container to be up and running
# so we wait for 5 seconds

# then we execute the rs-init.sh script which will create the replica set and set the primary

docker-compose -f docker-compose.mdb.dev.yml up -d

sleep 7

docker exec mongo1 /scripts/rs-init.sh

if [ "$1" = "true" ]; then
  wait_for_mongo "mongo1"

  docker exec -it mongo1 bash -c "chmod +x /scripts/migrate.sh && /scripts/migrate.sh"
fi
