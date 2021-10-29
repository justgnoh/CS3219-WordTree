## Build docker images
```
Run 'docker-compose build' at the directory where docker-compose files reside
Make sure images are created
```

## Start kubernetes on Docker desktop
```
Run the following commands in order:

kubectl apply -f 1-namespace.yaml
kubectl apply -f 2-deployment.yaml
kubectl apply -f 3-service.yaml

For backend services, you can just connect directly to localhost:<nodePortNum for your service> (refer to 3-service.yaml) like how you did for docker-compose
-----For backend services testing, can just stop here----

//set up nginx ingress controller -- set up api gateway
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.0.4/deploy/static/provider/cloud/deploy.yaml

//check if ingress controller is running
kubectl get pods -n ingress-nginx \
  -l app.kubernetes.io/name=ingress-nginx --watch

kubectl apply -f 4-ingress.yaml

kubectl apply -f 5-hpa.yml
```