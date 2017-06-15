
### /registries/1/fields/1

### /registries/1/cases/1
```json
{
  "registries": [
    {
      "id": 1,
      "name": "Registry 1",
      "description": "Lorem ipsum dolor",
      "fields": [
        {
          "id": 1,
          "name": "firstName",
          "type": "String",
          "active": true,
          "order": 1
        },
        {
          "id": 2,
          "name": "cnp",
          "type": "String",
          "active": true,
          "order": 2
        },
        {
          "id": 3,
          "name": "lastName",
          "type": "String",
          "active": false,
          "order": 3
        }
      ],
      "cases": [
        {
          "id": 1,
          "firstName": "First name",
          "lastname": "Last name",
          "cnp": 123456,
        },
        {
          "id": 2,
          "firstName": "First name",
          "lastname": "Last name",
          "cnp": 123456,
        }
      ]
    }
  ]
}
```
