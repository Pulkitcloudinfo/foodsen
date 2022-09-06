#/bin/bash
cd /var/www/html/nfoodsenso
sudo npm install --force
killall node
 forever start -c "sudo npm start" ./