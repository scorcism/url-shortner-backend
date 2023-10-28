# Commands to create deployment and service

```bash
vim Deployment.yml
```

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: url-shortner-deploy
spec:
  replicas: 2
  selector:
    matchLabels:
      app: shortner
  template:
    metadata:
      labels:
        app: shortner
    spec:
      containers:
        - name: url-shortner
          image: scor32k/url_shortner:v2
          ports:
            - containerPort: 5000  # Application port
```

```md
# Deployment Explanation

Labels: The identifiers used by the service to discover and connect to the pods. They will be attached to the pods.

Selector: Selects the container with a matching name that must be identical to the label name.
```

```bash
vim Service.yml
```

```yml
apiVersion: v1
kind: Service
metadata:
  name: url-shortner-service
spec:
  type: NodePort
  selector:
    app: shortner
  ports:
    - port: 3500 
      targetPort: 5000 
      nodePort: 30007 
```

```md
# Service ports explanation

## port
This is the port exposed by the Service itself. Requests coming to the cluster on this port will be forwarded to the Service's target port.

## targetPort
The port on which the Service will forward traffic to the Pods 

## nodePort
Define the static port on each Node in the cluster where the Service can be accessed from outside the cluster.

```

```bash
kubectl apply -f Deployment.yml
kubectl deploy -f Service.yml 
```

```bash
minikube ip
curl -v http://192.168.39.173:30007/
```