#!/bin/bash


# as we want to create and set our replica set, we need to wait for the mongo container to be up and running
# so we wait for 5 seconds

# then we execute the rs-init.sh script which will create the replica set and set the primary

docker-compose -f docker-compose.mdb.dev.yml up -d

sleep 7

docker exec mongo1 /scripts/rs-init.sh