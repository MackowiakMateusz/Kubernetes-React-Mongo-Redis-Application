# Project nginx-Ingress-controller Kubernetes MERN stack + Redis Mateusz Maćkowiak
## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Requirements](#requirements)
* [Setup](#setup)
* [Effect](#effect)

## General info
This project was made for University of Gdańsk subject "Cloud Technologies"/"Technologie Chmurowe".

	
## Technologies
Project is created with:
* Docker
* Kubernetes
* Nginx-Ingress-Controller
* MongoDB
* Express.js + Mongoose
* Express.js + RedisClient
* React.js
* Node.js

## Requirements
* 30GB Hard Disc Space
* Docker with kubernetes enabled

## Setup
Enter K8S folder with console that supports linux commands, for example git bash. Check if you are in empty kubectl namespace. If not, switch to empty one. Type:<br />
```
$ kubectl apply -f K8S
```
It should set up whole project automatically.<br />
If it doesn't, propably because of order in which yaml files run, then type in console:<br />
```
$ kubectl delete all --all
```
Then kubectl apply -f name_of_file <br />
every file separately, in according order:<br />
1. kubectl apply -f mongo-pv.yaml
2. kubectl apply -f mongo-pvc.yaml
3. kubectl apply -f redis-config-map.yaml
4. kubectl apply -f mongo-secrets.yaml
5. afterwards apply all deployment and service files:<br />
First there should be deployed both mongo and redis database containers. <br />
Then their cluster-ip services.<br />
Then both mongo nad redis server deployments.<br />
Then both mongo and reds server cluster ip services.<br />
Then client deployment<br />
Then client service<br />
6. At the end, install nginx-ingress-controller from official kubernetes site, and:<br />
kubectl apply -f ingress-service.yaml<br />

6. Alternative
If, ingress doesn't work, change client cluster-ip service to loadbalancer or nodeport service by changing field in .yaml file, and deploy it like that.

## Effect
* There should be following Ingress routes:
* localhost/ <- reactfrontend
* localhost/apiMongo/animes <- mongoexpress
* localhost/apiMongo/voiceActors <- mongoexpress
* localhost/apiRedis/comments <- redisexpress
