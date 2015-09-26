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

### GET: /user/:userId
output:
```json
{
  "userId": "7ec4a91a-5daa-4aee-bc9e-81a97655125d",
  "email": "test@bidbuilder.xyz",
  "firstname": "Test",
  "lastname": "User",
  "userType": "general_contractor"
}
```

### POST: /project
input: 
```json
{
    "parentId": "24736155-fbe0-4473-a6b7-753b3f4c28aa",
    "owner": "f4fa7709-9189-4cdf-898a-82264bfb6555",
    "name": "Carpet in Chamber of Secrets",
    "description": "Lay down carpet in the Chamber of Secrets"
}
```

output:
```json
{
  "projectId": "941d8b1d-b78c-4ae2-beb7-6c1b4e8cbb8e",
  "parentId": "24736155-fbe0-4473-a6b7-753b3f4c28aa",
  "owner": "f4fa7709-9189-4cdf-898a-82264bfb6555",
  "acceptedBid": null,
  "name": "Carpet in Chamber of Secrets",
  "description": "Lay down carpet in the Chamber of Secrets"
}
```

### GET: /project/:projectId
output:
```json
{
  "projectId": "24736155-fbe0-4473-a6b7-753b3f4c28aa",
  "parentId": null,
  "owner": "7ec4a91a-5daa-4aee-bc9e-81a97655125d",
  "acceptedBid": null,
  "name": "Potter Residence",
  "description": "Life Size Hogwarts Replica"
}
```

### POST: /project
input: 
```json
{
    "projectId": "24736155-fbe0-4473-a6b7-753b3f4c28aa",
    "owner": "f4fa7709-9189-4cdf-898a-82264bfb6555",
    "amount": 1000000.50
}
```

output:
```json
{
  "bidId": "a4d3e57d-695d-4add-b4d7-aedd45d3bf11",
  "projectId": "24736155-fbe0-4473-a6b7-753b3f4c28aa",
  "owner": "f4fa7709-9189-4cdf-898a-82264bfb6555",
  "amount": "$1,000,000.50"
}
```

### GET: /project/:projectId/subs 
Returns sub projects of given project
output:
```json
[
  {
    "projectId": "941d8b1d-b78c-4ae2-beb7-6c1b4e8cbb8e",
    "parentId": "24736155-fbe0-4473-a6b7-753b3f4c28aa",
    "owner": "f4fa7709-9189-4cdf-898a-82264bfb6555",
    "acceptedBid": null,
    "name": "Carpet in Chamber of Secrets",
    "description": "Lay down carpet in the Chamber of Secrets"
  },
  {
    "projectId": "cafc22ef-9176-4a46-92c0-d6e3442a417d",
    "parentId": "24736155-fbe0-4473-a6b7-753b3f4c28aa",
    "owner": "f4fa7709-9189-4cdf-898a-82264bfb6555",
    "acceptedBid": null,
    "name": "Drywall in Chamber of Secrets",
    "description": "Put up drywall in the Chamber of Secrets"
  }
]
```

### GET: /bid/:bidId
output:
```json
{
  "bidId": "a4d3e57d-695d-4add-b4d7-aedd45d3bf11",
  "projectId": "24736155-fbe0-4473-a6b7-753b3f4c28aa",
  "owner": "f4fa7709-9189-4cdf-898a-82264bfb6555",
  "amount": "$1,000,000.50"
}
```
