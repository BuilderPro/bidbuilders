# builderpro
General contractor and client communication and bidding tool.

# api

### POST: /signup
input: (valid userTypes: ['general_contractor', 'sub_contractor', 'engineer', 'architect', 'owner'])
```json
{
      "firstname":"Test",
      "lastname":"User",
      "email":"test@bidbuilder.xyz",
      "password":"password",
      "userType":"owner" 
}
```

output:
```json
{
    "userId": "f4fa7709-9189-4cdf-898a-82264bfb6555",
    "email": "test@bidbuilder.xyz",
    "firstname":"Test",
    "lastname":"User",
    "userType": "owner"
}
```

### GET: /project/:projectId
output:
```json
{
    "userId": "f4fa7709-9189-4cdf-898a-82264bfb6555",
    "email": "test@bidbuilder.xyz",
    "firstname":"Test",
    "lastname":"User",
    "userType": "owner"
}
```

### GET: /user/:userId
output:
```json
{
    "userId": "f4fa7709-9189-4cdf-898a-82264bfb6555",
    "email": "test@bidbuilder.xyz",
    "firstname":"Test",
    "lastname":"User",
    "userType": "owner"
}
```

### GET: /bid/:bidId
output:
```json
{
    "userId": "f4fa7709-9189-4cdf-898a-82264bfb6555",
    "email": "test@bidbuilder.xyz",
    "firstname":"Test",
    "lastname":"User",
    "userType": "owner"
}
```
