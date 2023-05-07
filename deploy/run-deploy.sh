#!/bin/bash

echo "Initializing kubernetes cluster"

# Create the replica set
kubectl apply -f services/mongodb-svc.yml
kubectl apply -f deployments/mongodb-statefulset.yml
echo "Waiting for the pods to be ready"
kubectl wait --for=condition=Ready --timeout=300s pod -l app=mongo
sleep 30
echo "Initializing the replica set"
kubectl exec mongo-0 -- mongo --eval "rs.initiate({_id: 'rs0', version: 1, members: [{_id: 0, host: 'mongo-0.mongo.default.svc.cluster.local:27017'}, {_id: 1, host: 'mongo-1.mongo.default.svc.cluster.local:27017'}, {_id: 2, host: 'mongo-2.mongo.default.svc.cluster.local:27017'}]})"
echo "Replica set initialized"

# Create the config server
kubectl apply -f services/cohere-svc.yml
kubectl apply -f services/main-svc.yml
kubectl apply -f services/rabbit-svc.yml
kubectl apply -f services/ui-svc.yml

# Create volumes
kubectl apply -f volumes/volumes.yml

# Create the deployments
kubectl apply -f deployments/cohere-deploy.yml
kubectl apply -f deployments/main-deploy.yml
kubectl apply -f deployments/rabbit-deploy.yml
kubectl apply -f deployments/ui-deploy.yml


