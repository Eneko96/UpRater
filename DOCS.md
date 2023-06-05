# Project documentation

## Persistency

For persistency we use a MongoDB replica set, which has a core DB named Uprater, where we store:
- User auth
- Rates
- Comments
- Reactions
- User profile

Internally, our mongo doesn't have still any auth or roles described

## Main Server

This is the core server and its tasks are:

- Manage Auth
- Write and read to mongo DB
- messaging rabbitMQ

Main server as the accountant of all operations on which the product itself concerns

## Cohere microservice

The main point of cohere microservice is to relieve workload on Main server on any machine learning operation, which are:

- When user creates a rate, a message on the rabbit queue will be sent, and cohere will be subscribed on that queue, will read the message and ponderate the rating message into a sentiment
- As well for a comment, cohere is accountant of pondering a sentiment on the comment regarding the rate, and calculate the fiability rate of the rate itself
- Write and read in MongoDB on any collection related on the tasks it endures 

## Docker compose

Method to wrap all the services we contain: MongoDB, Main server, Cohere, RabbitMQ, Web app

## K8

Method to clusterise our service, and a step forward to deploy our product to the aws cloud

## Cloud deployments

Pending on.
