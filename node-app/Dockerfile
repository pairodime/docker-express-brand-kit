FROM node

# Install Global Dependencies
RUN npm install pm2 -g
RUN npm install gulp-cli -g
RUN npm install bower -g

# Create app directory
RUN mkdir -p /node-app
WORKDIR /node-app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./src/package*.json /node-app/
RUN npm install --production
# Bower
COPY ./src/public/javascripts/bower.json /node-app/
WORKDIR /node-app/public/javascripts
RUN bower install --allow-root

# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
WORKDIR /node-app
COPY ./src /node-app

EXPOSE 3000
# CMD [ "npm", "start" ]
# Use PM2 for Process Management + Reliability of our Application
CMD ["pm2-runtime", "./bin/www"]