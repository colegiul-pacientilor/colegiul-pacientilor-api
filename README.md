# colegiul-pacientilor-api


# User
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

# Group
## Get all groups
### GET /groups
```json
[
 {
   "name": "Group name",
   "description" "Lorem ipsum dolor"
 }
]
```

## Create
### POST /groups
#### Request
```json
{
  "name": "Group name",
  "description" "Lorem ipsum dolor"
}
```
#### Response
```json
{
  "id": 1,
  "name": "Group name",
  "description" "Lorem ipsum dolor"
}
```

## Get group
### POST /groups/1
#### Request
```json
{}
```
#### Response
```json
{
  "id": 1,
  "name": "Group name",
  "description" "Lorem ipsum dolor"
}
```

## Update group
### PUT /groups/1
#### Request
```json
{
  "description": "Another description"
}
```
#### Response
```json
{
  "id": 1,
  "name": "Group name",
  "description" "Lorem ipsum dolor"
}
```
