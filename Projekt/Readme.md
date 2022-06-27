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
afterwards apply all deployment files:<br />
kubectl apply -f ...-deployment.yaml
and then apply all cluster-ip service files:<br />
kubectl apply -f ...-service.yaml
At the end, install nginx-ingress-controller from official kubernetes site, and:<br />
kubectl apply -f ingress-service.yaml

## Effect
* There should be following Ingress routes:
* localhost/ <- reactfrontend
* localhost/apiMongo/animes <- mongoexpress
* localhost/apiMongo/voiceActors <- mongoexpress
* localhost/apiRedis/comments <- redisexpress
