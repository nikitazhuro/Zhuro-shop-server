# Pet-project on React - Zhuro shop.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

You can test it here: [https://zhuro-shop-client.web.app/](https://zhuro-shop-client.web.app/).

## Technologies:

### Frontend:

+ react, react-dom, react-router-dom, react-transition-group,
+ mobx,
+ axios,
+ linter - eslint.

Client part was deployed on firebase.

### Backend (node.js):

+ express,
+ jsonwebtoken,
+ bcrypt, cookie-parser, uuid, nodemailer.

Server part was deployed on heroku.

### Project description: 

Ecommerce store. Design based on zara.com.

On the server side, jwt authorization is implemented, email verification is used, passwords pass through the functions available with the bcrypt library. MongoDB is used as the database.

The client part consists of several pages, which you can see further in the screenshots. Separate interfaces for project management are also available for the admin. Mobx is used as the state-manager. Implemented infinite scrolling on the category page using react-transition-group. There is authorization, search, filtering, a list of categories, adding and removing products from the basket.

Main page:

![image](https://user-images.githubusercontent.com/84069087/178158910-b24585b3-57d9-46ae-8832-89df78b6067c.png)

Search page:

![image](https://user-images.githubusercontent.com/84069087/178159115-1b1f1b80-655f-45d2-be41-fed0ddc28639.png)

Caregory page:

![image](https://user-images.githubusercontent.com/84069087/178159006-e9536158-ff6e-4e8c-b8d6-7ffa5637f55a.png)

Good page:

![image](https://user-images.githubusercontent.com/84069087/178159160-bb290a1c-79ad-4120-8b4f-fae470631f00.png)

Basket page:

![image](https://user-images.githubusercontent.com/84069087/178159085-2b93f049-d90a-44dd-bc69-53afa93b3915.png)


The following interfaces are also available for the admin: ability to add and remove categories, ability to add new products, ability to change existing products and add new colors.


![image](https://user-images.githubusercontent.com/84069087/178159320-5d116d95-2d58-4546-8f1a-618acb2738c9.png)
![image](https://user-images.githubusercontent.com/84069087/178159326-a4b6c1ff-2593-49be-ae2c-771447f2ca78.png)
![image](https://user-images.githubusercontent.com/84069087/178159341-cb463ad3-2ae6-425e-8584-f8e8702b70c0.png)


## How to start:

1. Clone server and client repositories (clientRep - [https://github.com/nikitazhuro/Zhuro-shop-client](https://github.com/nikitazhuro/Zhuro-shop-client)),
2. Install all dependencies in server and client directories with: `npm i`,
3. To start server you must create .env file and put next parameters:
   - PORT,
   - MongoDB connetrion url,
   - Server url,
   - Client url,
   - Jwt_access_secret_phrase,
   - Jwt_refresh_secret_phrase,
   - Mail_host,
   - Mail_PORT,
   - User_mail_login,
   - User_mail_password.
4. Run `npm start`,
5. To start client you should run `npm run build` and then `npm start`,
6. Run `http://localhost:8080` in browser.

Use GitHub only for code review.

## Data for authorization:

**You can use admin account to view all the functionality**.

login: `admin`,\
password: `admin`.

**If you would like to create a new account, please put your existing email because site use email verification**.

## Demonstration: 

https://user-images.githubusercontent.com/84069087/178161717-abf95d30-433b-4984-8409-cfbf7f1253ec.mp4
