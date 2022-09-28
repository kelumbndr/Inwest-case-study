# Inwest-case-study

### For the time being I have added both backend and front end to same repository

For Banckend switch to the folder **INWEST-BACKEND**

1. You will need node js installed (I'm using **node v14.18.1**)

     https://nodejs.org/en/download/

 2. Within folder INWEST-BACKEND run the command **npm install**
	```sh
	npm install
	```
 3. After installing the packages simply run **node .\transaction-api.js**
 You can also run the backend using **nodemon .\transaction-api.js**. For this you ned to have node monitor installed **npm i -g nodemon**
	```sh
	node .\transaction-api.js
	```
	OR
	```sh
	npm i -g nodemon
	nodemon .\transaction-api.js
	```
Import the **postman** request collection via following link.

https://www.getpostman.com/collections/3ff28e1aa3e167972a18

For Frontend switch to the folder **INWEST-FRONTEND** (Sorry I moved with default angular 14, hope it is ok)

1. You will need node js installed (I'm using **node v14.18.1**)

     https://nodejs.org/en/download/

 2. Within folder INWEST-FRONTEND run the command **npm install**
	```sh
	npm install
	```
3. After installing the packages simply run **ionic serve**

Note that I have not added any proxies for now. You need to change a variable **url** within **TransferDataService** to point to the node js backend. I have
added default values. So if nothing goes wrong you needn't look in to this.
