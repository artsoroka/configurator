## Simple REST server for managing configuration data

Use CURL to save some data: 

``` 
curl -XPUT localhost:8000/myproject/APP_PORT/80
``` 

To retrieve it back run this command  

```
curl localhost:8000/myproject
```

Configurator sends ```json``` by default, but you can get data as ```ENV``` string 

```
curl localhost:8000/myproject.env

```
Now you can create a ```start.sh``` file like this to bootstrapp your application with actual config  

```bash
#!/bin/bash
appEnv=$(curl -XGET localhost:8000/myproj.env); 
if [ -z "$appEnv" ]
then 
    echo "Could not get config "  && exit 1
else 
    echo $appEnv node client.js | bash; 
fi
```
