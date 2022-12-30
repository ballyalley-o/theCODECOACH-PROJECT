
# theCodeCoach  Project [BACKEND]

\[BACKEND\] support for _**"the CODE COACH Project"**_ application to handle the whole CRUD operations for bootcamps, courses, feedbacks, users, and authentication.

<!--- If we have only one group/collection, then no need for the "ungrouped" heading -->



## Endpoints

* [Bootcamps](#bootcamps)
    1. [Get All Bootcamps](#1-get-all-bootcamps)
    1. [Get a Single Bootcamp](#2-get-a-single-bootcamp)
    1. [Get Bootcamps in Distance](#3-get-bootcamps-in-distance)
    1. [Create New Bootcamp](#4-create-new-bootcamp)
    1. [Update Bootcamp](#5-update-bootcamp)
    1. [Delete Bootcamp](#6-delete-bootcamp)
    1. [Upload Photo](#7-upload-photo)
* [Courses](#courses)
    1. [Get All Courses](#1-get-all-courses)
    1. [Get Courses for Bootcamp](#2-get-courses-for-bootcamp)
    1. [Get a Single Course](#3-get-a-single-course)
    1. [Create New Course](#4-create-new-course)
    1. [Update Course](#5-update-course)
    1. [Delete Courses](#6-delete-courses)
* [Authentication](#authentication)
    1. [Register User](#1-register-user)
    1. [Get Logged in User via Token](#2-get-logged-in-user-via-token)
    1. [Login User](#3-login-user)
    1. [Logout User](#4-logout-user)
    1. [Forgot Password](#5-forgot-password)
    1. [Reset Password](#6-reset-password)
    1. [Update Details](#7-update-details)
    1. [Update Password](#8-update-password)
    1. [[HACKING MONGO]Login User](#9-hacking-mongologin-user)
* [Users](#users)
    1. [Get Users](#1-get-users)
    1. [Get A User](#2-get-a-user)
    1. [Create A User](#3-create-a-user)
    1. [Update A User](#4-update-a-user)
    1. [Delete A User](#5-delete-a-user)
* [Feedbacks](#feedbacks)
    1. [Get All Feedbacks](#1-get-all-feedbacks)
    1. [Get Feedbacks for Bootcamp](#2-get-feedbacks-for-bootcamp)
    1. [Get A Feedback](#3-get-a-feedback)
    1. [Add A Feedback](#4-add-a-feedback)
    1. [Update A Feedback](#5-update-a-feedback)
    1. [Delete A Feedback](#6-delete-a-feedback)
* [Club](#club)
    1. [Posts](#1-posts)

--------



## Bootcamps

Bootcamps CRUD functionality



### 1. Get All Bootcamps


Fetch all bootcamps from database. Includes pagination, filtering, etc


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/bootcamps/
```



### 2. Get a Single Bootcamp


Get single bootcamp by ID


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/bootcamps/
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| averageCost[lte] | 10000 |  |



### 3. Get Bootcamps in Distance


Fetch all bootcamps within req. radius.


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/bootcamps/radius/2013/1000
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| location.city | auckland |  |



### 4. Create New Bootcamp


Add new bootcamp to database. Must be authenticated and must be publisher or admin.


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/bootcamps
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{
        "name": "TEST International-Bootcamp",
		"description": "IBM INTERNATIONAL BOOTCAMP is a full stack JavaScript Bootcamp located in the heart of Auckland that focuses on the technologies you need to get a high paying job as a web developer",
		"website": "https://IBMdev.com",
		"phone": "(111) 111-1111",
		"email": "enroll@IBMdev.com",
		"address": "123 Queen Street, New Llyn, Auckland 1053",
		"careers": [ "Web Development", "IBM Data Science", "Software QA", "UI/UX", "Business", "Back-end", "Dev Ops", "Software QA"],
		"housing": true,
		"jobAssistance": true,
		"jobGuarantee": false,
		"acceptGi": true    
}
```



### 5. Update Bootcamp


Update single bootcamp in database


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/bootcamps/637171e86cca7790a92d5079
```



***Body:***

```js        
{
    "name" : "Jose Mari Chan"
}
```



### 6. Delete Bootcamp


Delete bootcamp from database


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{URL}}/api/v1/bootcamps/5d725a037b292f5f8ceff787
```



### 7. Upload Photo


Uploading photo for bootcamps


***Endpoint:***

```bash
Method: PUT
Type: FORMDATA
URL: {{URL}}/api/v1/bootcamps/5d713995b721c3bb38c1f5d0
```



***Body:***

| Key | Value | Description |
| --- | ------|-------------|
| file
 |  |  |



## Courses

Courses CRUD functionality



### 1. Get All Courses


Fetch all courses from database. Includes pagination, filtering, etc


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/courses
```



### 2. Get Courses for Bootcamp


Get courses populated with Bootcamp details


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/bootcamps/5d725a037b292f5f8ceff787/courses
```



### 3. Get a Single Course


Get single course by ID


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/courses/5d725cb9c4ded7bcb480eaa1
```



### 4. Create New Course


Add new course to database. Must be authenticated and must be publisher or admin.


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/bootcamps/5d725a037b292f5f8ceff787/courses
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{
        "title": "TEST Front End Webby Dev",
		"description": "This course will provide you with all of the essentials to become a successful frontend web developer. You will learn to master HTML, CSS and front end JavaScript, along with tools like Git, VSCode and front end frameworks like Vue",
		"weeks": 12,
		"tuition": 3400,
		"minimumSkill": "intermediate",
		"scholarhipsAvailable": true
}
```



### 5. Update Course


Update single course in database


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/courses/5d725a4a7b292f5f8ceff789
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{
    
}
```



### 6. Delete Courses


Delete courses from database


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{URL}}/api/v1/courses/5d725c84c4ded7bcb480eaa0
```



## Authentication

Routes for user authentication including password and user auth



### 1. Register User


Add User to database with encrypted password


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/auth/register
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{
    "firstName": "Fakey2",
    "lastName": "person",
    "email": "fake2@gmail.com",
    "password": "123456",
    "role": "Student",
    "friends": [],
    "location":"Hamilton, NZ"
}
```



### 2. Get Logged in User via Token



***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{URL}}/api/v1/auth/me
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



### 3. Login User



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/auth/login
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{
    "email":"john@gmail.com",
    "password":"123456"
}
```



### 4. Logout User


Log user out of the database.


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/auth/logout
```



### 5. Forgot Password



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/auth/reset_password/545e201081fca0a9dacbd28eab20cf2fc6d81b3e 
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{
    "email": "john@gmail.com"
}
```



### 6. Reset Password



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/auth/reset_password/545e201081fca0a9dacbd28eab20cf2fc6d81b3e
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{
    "password": "1234567"
}
```



### 7. Update Details


Updating the user's name and email.


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/auth/update_details
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{
    "email": "martin@gmail.com",
    "name": "Martin"
}
```



### 8. Update Password


Updates logged-in user's password.


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/auth/update_password
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{
    "currentPassword": "1234567",
    "newPassword": "123456"
}
```



### 9. [HACKING MONGO]Login User



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/auth/login
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{
    "email":{"$gt":""},
    "password":"123456"
}
```



## Users

Basic CRUD operations for dealing with users' details as Admin.



### 1. Get Users


Get All Users details. for Admin CRUD Operations.


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/users
```



### 2. Get A User


Get a single User's details from the database, for Admin CRUD Operations.


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/users/5d7a514b5d2c12c7449be046
```



### 3. Create A User


Create a single User to the database. restricted to Admin Operations.


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/users
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{
    "firstName": "Tony",
    "lastName": "Montana",
    "email": "mylittlefriend@gmail.com",
    "password": "123456",
    "role": "trainer",
    "friends": [],
    "location":"Miami, Florida, USA"
    
}
```



### 4. Update A User


Update a single User in the database. restricted to only Admins Operations.


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/users/639721016a8116b67bda43b0
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{
    "name": "Tony Montana Jr",
    "email": "mylittlefriends@yahoo.com"
}
```



### 5. Delete A User


Delete a single User from the database. restricted to Admin Operations.



***Endpoint:***

```bash
Method: DELETE
Type: RAW
URL: {{URL}}/api/v1/users/639721016a8116b67bda43b0
```



## Feedbacks

Handling the feedbacks with CRUD operations.



### 1. Get All Feedbacks


Get ALL Feedbacks from the database.


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/feedbacks
```



### 2. Get Feedbacks for Bootcamp


Fetch all reviews for a certain Bootcamp.


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{URL}}/api/v1/bootcamps/63970631b4f4d2f8f646778c/feedbacks
```



### 3. Get A Feedback


Fetch a single Feedback from the database.


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/feedbacks/5d725a037b292f5f8ceff787
```



### 4. Add A Feedback


Leave a Feedback for the bootcamp.


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/bootcamps/5d725a037b292f5f8ceff787/feedbacks
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{
    "title": "Great EXPERIENCE TEST!",
    "body": "Had a bad experience, please dont waste your time enrolling to this bootcamp!",
    "rating": 9
}

```



### 5. Update A Feedback


Update a feedback for the bootcamp


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/feedbacks/63984ee6f7cbe5921546a554
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



### 6. Delete A Feedback


Delete a feedback for the bootcamp. 


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{URL}}/api/v1/feedbacks/63984ee6f7cbe5921546a554
```



## Club



### 1. Posts



***Endpoint:***

```bash
Method: 
Type: 
URL: 
```



---
[Back to top](#thecodecoach--project-backend)

>Generated at 2022-12-22 15:33:38 by [docgen](https://github.com/thedevsaddam/docgen)
