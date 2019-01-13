# Make-It-Work

Make-It-Work built with Express and Mongoose.

List of basic routes :

|Route          |HTTP   |Header(s)|Body             |Description    |
| ------------- | ----- | ------- | --------------- | ------------- |
|`/api/register`    |**POST**|`none`|name:String (**Required**), email:String (**Required**), password:String(**Required**)|Create new user |
|`/api/login`       |**POST**|`none`|email:String (**Required**), password:String(**Required**)|Login User|
|`/api/sigin/google`       |**POST**|`none`|`none`|Login User Using 3rd API|

List of todo routes:

|Route          |HTTP   |Header(s)|Body             |Description    |
| ------------- | ----- | ------- | --------------- | ------------- |
|`/api/todo`    |**GET**|`token`|`none`|Get all the todo that user have (Authenticated User)|
|`/api/todo`    |**POST**|`token`|name:String (**Required**), description:String(**Required**), due_date:Date(**Required**)|Create a todo (Authenticated User)|
|`/api/todo/:id`|**DELETE**|`token`|`none`|Delete a todo (Authenticated User)|
|`/api/todo/:id`|**PUT**|`token`|name:String (**Required**), description:String(**Required**), due_date:Date(**Required**)|Update a todo with new info (Authenticated User)|


### Usage


Make new file `.env` With Template:

```
JWT_SECRET= "INSERT JWT_SECERT HERE"
DBNAME= "INSERT DBNAME HERE"
```

Make sure you have MongooDB,  Node.js and npm installed in your computer, and then run these commands: 

 ```
 $ service mongod start
 $ npm install
 $ npm start
 Or
 $ npm run dev
 ```


Access the API via `http://localhost:3000/api`