
# *API Doc*

**Dinners**
----
Returns json data about a single dinner.


* **URL**
    * list all dinners:
    /api/dinners/
    
    * details about single dinner
    /api/dinners/:id/
    <br/>
    

* **Method:**

    `GET`
    <br/>
  

   **Required:**
 
   `id=[integer]`
   <br/>

* **Data Params**

    None
    <br/>

* **Success Response:**

  * **Code:** 200 OK<br/>
    **Content:** 
    ```JSON
    {
    "id": [Integer], #autocreated
    "title": "[String]",
    "description": "[String]",
    "timeCreated": "[DateTime]", #autocreated
    "lastModified": "[DateTime]", #autocreated
    "timePlanned": "[DateTime]",
    "totalCost": [Integer], 
    "seatsCapacity": [Integer],
    "seatsTaken": [Integer],
    "allergies": "[String]"
    }
    ``` 
 
* **Error Response:**

  * **Code:** 404 NOT FOUND<br/>
    **Content:** `{"detail": "Not found."}`

  OR

  * **Code:** 401 UNAUTHORIZED<br/>
    **Content:** `{"detail": "Authentication credentials were not provided."}`
    
<br/>

* **Sample Call:**

  ```javascript
    $.ajax({
        url: "/api/dinners/1/",
        dataType: "json",
        type : "GET",
        headers: {
        "Authorization":"Token 11111111111111111",
        }
        success : function(r) {
            console.log(r);
        }
        error: function(err) {
            console.log('error:' + err)
        }
    });
  ```

<br/><br/>



**Users creation and listing**
----


* **URL**

    /api/users/
    <br/>

* **Method:**

    `POST` for creation
    `GET` for list of users
    <br/>
  
*  **URL Params**

   none 
   <br/>

* **Body**

    ```JSON
    {
        "username": "[String]",
        "password": "[String]"
    }
    ```
    <br/>

* **Success Response:**

  * **Code:** 201 CREATED<br/>
    **Content:** 
    ```JSON
    {
        "id": 1,
        "username": "[String]",
        "email": "",
        "first_name": "",
        "last_name": "",
        "allergies": "",
        "adress": "",
        "is_superuser": false,
        "date_joined": "2021-02-22T14:38:56Z",
        "last_login": null
    }
    ```
<br/>
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST<br/>
    **Content:** `{"username": ["A user with that username already exists."]}`
    
<br/>

* **Sample Call:**

  ```javascript
    $.ajax({
        url: "/api/users/",
        dataType: "json",
        type : "POST",
        data: {
            "username": "[String]",
            "password": "[String]"
        }
        success : function(r) {
            console.log(r);
        }
        error: function(err) {
            console.log('error:' + err)
        }
    });
  ```

<br/><br/>


**Fetching Token**
----
Returns a users token.


* **URL**

    /auth/
    <br/>

* **Method:**

    `POST`
    <br/>
  
*  **URL Params**

   none 
   <br/>

* **Body**

    ```JSON
    {
        "username": "[String]",
        "password": "[String]"
    }
    ```
    <br/>

* **Success Response:**

  * **Code:** 200 OK<br/>
    **Content:** 
    ```JSON
    {
        "token": "[String]",
    }
    ```
    <br/>
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST<br/>
    **Content:** `{"non_field_errors": ["Unable to log in with provided credentials."]`

<br/>

* **Sample Call:**

  ```javascript
    $.ajax({
        url: "/auth/",
        dataType: "json",
        type : "POST",
        data: {
            "username": "[String]",
            "password": "[String]"
        }
        success : function(r) {
            console.log(r);
        }
        error: function(err) {
            console.log('error:' + err)
        }
    });
  ```

<br/><br/>