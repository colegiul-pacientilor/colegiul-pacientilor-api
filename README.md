# colegiul-pacientilor-api

## Get all users
### GET /users
```json
[
 {
   "firstName": "First Name",
   "lastName" "Last Name
 }
]
```

## Create
### POST /users
#### Request
```json
{
 "firstName": "First Name",
 "lastName" "Last Name
}
```
#### Response
```json
{
 "id": 1,
 "firstName": "First Name",
 "lastName" "Last Name
}
```

## Get user
### POST /users/1
#### Request
```json
{}
```
#### Response
```json
{
 "id": 1,
 "firstName": "First Name",
 "lastName" "Last Name
}
```


## Update user
### PUT /users/1
#### Request
```json
{
  "lastName": "Another Name"
}
```
#### Response
```json
{
 "id": 1,
 "firstName": "First Name",
 "lastName" "Another Name
}
```
