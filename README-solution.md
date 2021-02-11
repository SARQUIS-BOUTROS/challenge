# Instructions APP for deploying

Hello!

This app require
- Docker version 20.10.3 build 48d30b5
- Ports free: 3000 and 3001

After that install Docker
1) git clone https://github.com/SARQUIS-BOUTROS/challenge.git
2) go to /challenge (where docker-compose.yml file)
3) in console: docker-compose build
4) in console: docker-compose up

Docker going to download, deploy and install images and dependencies necessaries.

When the process is finished, you have the next endpoints available
- http://localhost:3000/ : App react 
- http://localhost:3001/docs/ : Swagger Doc about express.js endpoints

When you access to http://localhost:3000/ you'll see:

![](doc/resources/Screenshot%20from%202021-02-11%2013-11-17.png)

There are two options:
- Create a new Order request
- See Order Request

#See Order Request
![](doc/resources/Screenshot%20from%202021-02-11%2013-11-38.png)
In the first time (when docker-compose was ran ) you'll not see anything. 
In this section you can see order request (ordered by update_date) and get more details. Also use filters order request: Search by subject o some status.
There are three status:
- ONGOING: setting for default when order is created
- REJECTED: when order request is rejected
- READY: when order request is completed

example search by status

![](doc/resources/Screenshot%20from%202021-02-11%2013-12-02.png)

example search by subject

![](doc/resources/Screenshot%20from%202021-02-11%2013-12-32.png)


#Create a new Order Request

if you clicked New Order Request

![](doc/resources/Screenshot%20from%202021-02-11%2013-12-57.png)

Subject and body is mandatory

![](doc/resources/Screenshot%20from%202021-02-11%2013-13-34.png)

You can attach pdf's files

![](doc/resources/Screenshot%20from%202021-02-11%2013-14-09.png)

![](doc/resources/Screenshot%20from%202021-02-11%2013-14-30.png)
When you create the new request, you'll se this message
![](doc/resources/Screenshot%20from%202021-02-11%2013-14-47.png)
Hier is the order request's code

#Status Transition
This section is in Order request detail

![](doc/resources/Screenshot%20from%202021-02-11%2013-15-19.png)

You can reject or mark as completed a order request

If the order request does not have a file attachment, button for download pdf file is disabled
Also Reject o mark as completed optio if the order request in this status.
![](doc/resources/Screenshot%20from%202021-02-11%2013-15-38.png)

#Endpoint Information
When you access to http://localhost:3001/docs/ you'll see:
![](doc/resources/Screenshot%20from%202021-02-11%2013-16-58.png)

This are the endpoint that exist in express app.

#Pending Steps :
- Complete inputs and outputs information about endpoints for seeing in swagger.
- Add roles 
- Add session features: The clients could access just create new order request section and administrator could access to whatever section.
 
 
 Bye!