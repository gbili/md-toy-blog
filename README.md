# Stackive Server : Document Service

## :pushpin: Header for subsequent authentified requests
Once you got the response, use the token to authentify your reqeusts by adding it to your request headers.
Add the `Authorization` key to your request header with the `Bearer` + token as a value, like this:
```
Authorisation: Bearer <yourtoken>
```

In this example:
```
Authorisation: Bearer p8Jhb4ciOiJIUzI1NiJ9.eyJhdiQiOjlsImV4cCM6kTU2Nzc3NzEyM30.IhxdGN9GLRjBnB4sdxF1OXQZWhEWgGDrUaSr7uCqzlq
```

See [auth service](https://bitbucket.org/usrpath/stackive-server-user)

## :closed_lock_with_key: Document Service (JWT token in header required)

Creating documents requires users to be logged in. Therefore you will need to [get a JWT token first][stackive-server-user-jwt] by logging in to the *user service*. Once you have the JWT, add it to your request header.

**Steps**:
1. Get JWT
2. Upload some files to the `stackive-server-file` and keep their `UUID`'s
3. Create a document object on the front, as well as some `UUID`
   - The only requirement is that for each user, no two documents have the same `name`
4. Save it to `stackive-server-document` using:
   - `saveDocument`
   - `saveDocuments`
5. Retrieve saved documents from logged in user:
   - `getUserDocumentsStartingWithString`
   - `getUserDocumentsByUUID`

### 4. :closed_lock_with_key: Request (save document)
#### Header
```
Authorisation: Bearer p8Jhb4ciOiJIUzI1NiJ9.eyJhdiQiOjlsImV4cCM6kTU2Nzc3NzEyM30.IhxdGN9GLRjBnB4sdxF1OXQZWhEWgGDrUaSr7uCqzlq
```

#### Body
```graphql
mutation {
    saveDocuments(input: {
        documents: [
            {
                UUID: "01d1a6e2-2790-4d12-8078-360944442",
                name: "Phone Bill from Salt 2019",
                isStacked: false,
                files: [
                    {
                        UUID: "21d1a6e2-2790-4d12-8078-3609551asdff",
                    },
                    {
                        UUID: "31d1a6e2-2790-4d12-8078-360955qwerer",
                    }
                ],
            },
            {
                UUID: "01d1a6e2-2790-4d12-8078-3609551444443",
                name: "Handwritten note about the meaning of gene mutation",
                isStacked: true,
                files: [
                    {
                        UUID: "21d1a6e2-2790-4d12-8078-360958888",
                    },
                                {
                        UUID: "31d1a6e2-2790-4d12-8078-360955q0000r",
                    }
                ],
            },
        ]
    }) {
        UUID
    }
}
```

### :pushpin: Response (success)
```json
{
    "data": {
        "saveDocuments": [
            {
                "UUID": "01d1a6e2-2790-4d12-8078-360944442"
            },
            {
                "UUID": "01d1a6e2-2790-4d12-8078-3609551444443"
            }
        ]
    }
}
```

### Response (error)
```json
{
    "errors": [
        {
            "message": "Name \"The art of life the art 5\" already taken by \"01d1a6e2-2790-4d12-8078-360944442\", name duplicates are not allowed (this is a conceptual requirement, not a technical one, can be changed removing UNIQUE constraint in db)",
            "locations": [
                {
                    "line": 2,
                    "column": 5
                }
            ],
            "path": [
                "saveDocuments"
            ],
            "extensions": {
                "code": "INTERNAL_SERVER_ERROR",
                "exception": {
                    "stacktrace": [
                        "Error: Name \"The art of life the art 5\" already taken by \"01d1a6e2-2790-4d12-8078-360944442\", name duplicates are not allowed (this is a conceptual requirement, not a technical one, can be changed removing UNIQUE constraint in db)",
                        "    at dbDocumentsWithSameName.map.d (/Users/g/Documents/workspace/Javascript/graphql/stackive-server-document/src/models/DocumentModel.js:165:15)",
                        "    at Array.map (<anonymous>)",
                        "    at Function.map [as saveDocument] (/Users/g/Documents/workspace/Javascript/graphql/stackive-server-document/src/models/DocumentModel.js:163:56)",
                        "    at processTicksAndRejections (internal/process/next_tick.js:81:5)"
                    ]
                }
            }
        }
    ],
    "data": null
}
```

## 5. :closed_lock_with_key: Request (get user documents)
Once you have saved a few documents with their names, you can start reading them with either:
1. `getUserDocumentsByUUID`: get documents in UUIDList, where you get the UUIDList from for example the tag service
2. `getUserDocumentsStartingWithString`: document search by name

The data you can get from `documents` is:
- `UUID`
- `isStacked`
- `isTrashed`
- `dateModified`
- `files` is an array of file UUIDs from the [file service][file service]:
  - `UUID` which allows you to get the download URL `dlUrl` from the [file service][file-service]
  - `position` is the position of the file in the document (like the page number) it is redundant info since you can infer it from the file position in the `files` array..

### 5.1 User Documents by UUID
`getUserDocumentsByUUID`: get documents in UUIDList, where you get the UUIDList from for example the tag service. The normal process is to upload a fiew files through the [file service][file-service]. Then you get a set of files UUIDs. These file UUIDs are to be associated to the new document being created. You create a document UUID and set its attributes then save it to the document service with `saveDocument`. These documents UUIDs can be used here to retrieve their data.

Once you have saved the documents, you will most often not want to save the UUIDs in the client. So how do you know which UUIDs to fetch? The normal way is by associating them to a set of tags chosen by the user ([tag service][tag-service]). Once the association saved, then you will let the user filter the documents shown to him by a set of tags. Since you have a mapping from `tag` to `entity` (where the entity is a `document`) in the [tag service][tag-service], you will be able to retrieve the list of document UUIDs matching the tag set. Once you have them, you can retrieve the actual documents from the [document service][document-service].

### :closed_lock_with_key: Request
#### Header
Use the JWT token auth header, see above
#### Body
```graphql
query {
    getUserDocumentsByUUID(input: {
        UUIDList: ["01d1a6e2-2790-4d12-8078-360944442",
                "01d1a6e2-2790-4d12-8078-3609551444443",]
    }) {
        UUID,
        name,
        files {
            UUID
        }
    }
}
```

### Response
```json
{
    "data": {
        "getUserDocumentsByUUID": [
            {
                "UUID": "01d1a6e2-2790-4d12-8078-360944442",
                "name": "The art of life the art 5",
                "files": [
                    {
                        "UUID": "21d1a6e2-2790-4d12-8078-3609551asdff"
                        "position": 0,
                    },
                    {
                        "UUID": "31d1a6e2-2790-4d12-8078-360955qwerer"
                        "position": 1,
                    }
                ]
            },
            {
                "UUID": "01d1a6e2-2790-4d12-8078-3609551444443",
                "name": "The art of life the art 6",
                "files": [
                    {
                        "UUID": "21d1a6e2-2790-4d12-8078-360958888"
                        "position": 0,
                    },
                    {
                        "UUID": "31d1a6e2-2790-4d12-8078-360955q0000r"
                        "position": 1,
                    }
                ]
            }
        ]
    }
}
```

### 5.1 User documents matching string
When the tag system is not enough, you may want to search the document by its `name`. This is what `getUserDocumentsStartingWithString` is for. You can search the set of documents that match the `string`.

### 5.2 :closed_lock_with_key: Request
#### Header
Use the JWT token auth header, see above

#### Body
To get a set of files from their IDs, you can do:
```graphql
query {
    getUserDocumentsStartingWithString(input: {
        string: "The",
    }) {
        UUID,
        name,
        files {
            UUID
        }
    }
}
```
### :pushpin: Response
```json
{
    "data": {
        "getUserDocumentsStartingWithString": [
            {
                "UUID": "01d1a6e2-2790-4d12-8078-360944442",
                "name": "The art of life the art 5",
                "files": [
                    {
                        "UUID": "21d1a6e2-2790-4d12-8078-3609551asdff"
                    },
                    {
                        "UUID": "31d1a6e2-2790-4d12-8078-360955qwerer"
                    }
                ]
            },
            {
                "UUID": "01d1a6e2-2790-4d12-8078-36095513kki9",
                "name": "The art of life the art",
                "files": [
                    {
                        "UUID": "21d1a6e2-2790-4d12-8078-3609551asdff"
                    },
                    {
                        "UUID": "31d1a6e2-2790-4d12-8078-360955qwerer"
                    }
                ]
            },
            {
                "UUID": "01d1a6e2-2790-4d12-8078-360955144444",
                "name": "The art of life the art 4",
                "files": [
                    {
                        "UUID": "21d1a6e2-2790-4d12-8078-360958888"
                    },
                    {
                        "UUID": "31d1a6e2-2790-4d12-8078-360955q0000r"
                    }
                ]
            },
            {
                "UUID": "01d1a6e2-2790-4d12-8078-3609551444443",
                "name": "The art of life the art 6",
                "files": [
                    {
                        "UUID": "21d1a6e2-2790-4d12-8078-360958888"
                    },
                    {
                        "UUID": "31d1a6e2-2790-4d12-8078-360955q0000r"
                    }
                ]
            },
            {
                "UUID": "01d1a6e2-2790-4d12-8078-360955199999",
                "name": "The art of life the art 2",
                "files": [
                    {
                        "UUID": "21d1a6e2-2790-4d12-8078-360958888"
                    },
                    {
                        "UUID": "31d1a6e2-2790-4d12-8078-360955q0000r"
                    }
                ]
            },
            {
                "UUID": "01d1a6e2-2790-4d12-8078-3609555555",
                "name": "The art of life the art 3",
                "files": [
                    {
                        "UUID": "21d1a6e2-2790-4d12-8078-3609551asdff"
                    },
                    {
                        "UUID": "31d1a6e2-2790-4d12-8078-360955qwerer"
                    }
                ]
            },
            {
                "UUID": "17d1a6e2-2790-4d12-8078-3609551f7ccd",
                "name": "The art of life",
                "files": [
                    {
                        "UUID": "17d1a6e2-2790-4d12-8078-3609551f7cce"
                    }
                ]
            }
        ]
    }
}
```

# Steps
1. Register
   - **Front**:
     - Fill in register form
     - onClick: _stackive_:`registerUser`
   - **Back**:
     - Send email validation link
2. Login
   - **Front**:
     - Fill in login form with either email or username
     - onClick: _stackive_:`loginUserWithEmail` | `loginUserWithUsername`
       - Save JWT token locally for following requests
   - **Back**:
     - Validate credentials
     - Generate JWT token
3. All following requests need Authorization: provide the generated JWT
4. List documents
5. Take picture
   - **Front**:
     - Load camera
     - Save file to gallery
6. Take picture decision
   - **Front**:
     - Accept and add more pictures in same doc?
     - Retake picture?
     - Accept and move to document creation
7. Document creation (using set of pictures previously taken with camera)
   1. Files creation and upload
      - **Front**:
        - Upload files:
          - _stackive_:`generateUploadableFiles`
          - `ulUrl` do a `PUT` `multipart/form-data`
          - _stackive_:`markUploadedFiles` if upload to ulUrl was successfull
      - **Back**:
        - `generateUploadableFiles`: Store files meta in database and generate signed urls
        - `markUploadedFiles`: update uploadStatus
    2. Document creation with file IDs and user input
       - **Front**:
         - (should the document be created as soon as we enter the screen? and be updated as user completes data? more requests vs. more code reuse)
         - Show _thumbs_ in top background
         - Show _Tags_ input
           - onFocus: _stackive_:`getSuggestedTags`
           - onKeyStroke: _stackive_:`getStringMatchingTags`
           - onSpace: create a chip attaching `{ id: <dbID|null>, name: <string>}`, 
           - onUnfocus: If some tags are not in db save them in db: _stackive_:`createTags`
             - `Tags_to_Document` association is saved at same time as the Document is sent to server (only send tag IDs list)
         - Show _Document Name_ input
         - Show _Stacked switch_ input
         - Show _Reminder_ calendar input
         - onClick: _stackive_:`createDocument`
       - **Back**
         - `getSuggestedTags`: based on some criteria (i.e. "recently used", some "ML" on the file itself etc.)
         - `getStringMatchingTags`: return a list of tags (user specific or global) containing the string in input
         - `createDocument`: save document to db and return ID
           - owner (`Header Authorization: Bearer JWT`),
           - name,
           - fileList,
           - tagList,
           - stacked status,
           - reminder date

[stackive-server-user-jwt](https://bitbucket.org/usrpath/stackive-server-user/src/master/)
[auth-service](https://bitbucket.org/usrpath/stackive-server-user)
[file-service](https://bitbucket.org/usrpath/stackive-server-file)
[tag-service](https://bitbucket.org/usrpath/stackive-server-tag)
