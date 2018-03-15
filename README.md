# docker-express-brand-kit
Docker + NGINX + Node.js + Express + Babel + Gulp + FlexboxGrid + SASS + Lazysizes + Greensock - Brand Stater Kit

REQUIREMENTS
Docker Engine - like Docker for Mac or CentOS

With Root privelages run `docker-compose up` This will spin up a container for NGINX and one for our App. Open your browser to //localhost

If this is used in Production or any publicly available URL - you will more than likly need to update the NGINX defaul.conf file which will now be located on your NGINX container -> /etc/nginx/conf.d/default.conf with the Docker assigned IP of our node-app container

First get the Docker assigned IP of our node-app container

`docker ps` -> get the reference of the container ID
`docker inspect <nodeappContainerIdHere>` -> get the reference of the "IPAddress:" (e.g.: 172.18.0.4)

Now lets go into our NGINX Container and make the configuration edit
`docker exec -it <nginxContainerIdHere> bash`

In order to edit this file you will probably need to download a basic Editor like VIM so run 

`apt-get update`
`apt-get install vim`
`vim /etc/nginx/conf.d/default.conf`

Update
`upstream nodejs-app {
    server <DOCKERASSIGNEDIPADDRESSHERE>:3000 weight=1;
}`

Exit out of the container and restart the NGINX Container Service Gracefully

`docker kill -s HUP <nginxContainerIdHere>`

# EDITING WEB APP FILES

Docker will share files between Docker Host and the Docker Container of our Node App
<location of files - more than likely the /root or /home>/node-app/src/

Changes made here will be shared with the container - so edit to your heart's content and refresh the browser.

Enjoy
