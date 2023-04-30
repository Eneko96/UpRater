#!/bin/bash
set -e

echo "Initializing the replica set"
kubectl exec mongo-0 -- mongo --eval "rs.initiate({_id: 'rs0', version: 1, members: [{_id: 0, host: 'mongo-0.mongo.default.svc.cluster.local:27017'}, {_id: 1, host: 'mongo-1.mongo.default.svc.cluster.local:27017'}, {_id: 2, host: 'mongo-2.mongo.default.svc.cluster.local:27017'}]})"
echo "Replica set initialized"
