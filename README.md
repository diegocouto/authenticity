# Authenticity [![Build Status](https://travis-ci.org/diegocouto/authenticity.svg?branch=master)](https://travis-ci.org/diegocouto/authenticity)

A lightweight application to guarantee files authenticity. 

![homepage](https://cloud.githubusercontent.com/assets/1069623/9945615/ae2332b2-5d64-11e5-8f15-aaedf52eb517.png)

It acts like a central repository of files, which can be uploaded only from valid sources through its API and are available publicly when the correct file key is used.

[Follow me on Twitter](https://twitter.com/diegocouto).

## Getting Started

Before installing, it's recommended that you be sure that you have at least Node.js v0.12.

### Install

1. Clone this repo into your local environment.
2. Run `npm install` from the app directory.
3. To execute the tests, run `make test`.
4. `node bin/www`

### Configurations

Default options (**config/default.json**):

```json
{
  "File": {
    "multer": {
      "dest": "uploads/",
      "limits": {
        "fileSize": 10485760
      }
    },
    
    "types": ["application/pdf", "image/jpeg", "image/png", "image/tiff"]
  }
}
```

### API Usage

**Creating a new file**

POST: `/api/v1/files`

| Parameters |  Type  | Required |
| ---------- | :----: | :------: |
| token_key  | string |   true   |
| file_key   | string |   true   |
| file       | file   |   true   |
| description| text   |   false  |

**Requesting file info**

GET: `/api/v1/files/:file_key`

```json
{
    "id": 1,
    "description": null,
    "key": "file_key",
    "path": "path/to/the/file.pdf",
    "md5Digest": "0acda6a8d205ba80edfc8e8d92044aba",
    "sha1Digest": "e292f0b08df083e13c444f43c5d4efa0a3ad1712",
    "createdAt": "2015-09-16T20:24:01.366Z",
    "updatedAt": "2015-09-16T20:24:01.366Z"
}
```

## License

Authenticity is [MIT licensed](https://opensource.org/licenses/MIT). Enjoy!

