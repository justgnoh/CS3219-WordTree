## Start kubernetes on Docker desktop
```
Run the following commands in order:

kubectl apply -f 1-namespace.yaml
kubectl apply -f 2-deployment.yaml
kubectl apply -f 3-service.yaml

//set up nginx ingress controller
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.0.4/deploy/static/provider/cloud/deploy.yaml

//check if ingress controller is running
kubectl get pods -n ingress-nginx \
  -l app.kubernetes.io/name=ingress-nginx --watch


kubectl apply -f 4-ingress.yaml

```
# Horizontal Pod Autoscaler
```
kubectl apply -f 5-hpa.yml
kubectl get hpa -n <<namespace>>
```