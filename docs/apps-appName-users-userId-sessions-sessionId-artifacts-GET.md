---
type: operation
title: "List Artifact Names"
operationId: "list_artifact_names_apps__app_name__users__user_id__sessions__session_id__artifacts_get"
method: GET
path: "/apps/{app_name}/users/{user_id}/sessions/{session_id}/artifacts"
---

# List Artifact Names

`GET` `/apps/{app_name}/users/{user_id}/sessions/{session_id}/artifacts`

## Path parameters

**app_name** `string` required _App Name_

**user_id** `string` required _User Id_

**session_id** `string` required _Session Id_

## Responses

### `200` — Successful Response

`string[]` _Response List Artifact Names Apps  App Name  Users  User Id  Sessions  Session Id  Artifacts Get_

### `422` — Validation Error

[`HTTPValidationError`](#httpvalidationerror) _HTTPValidationError_

## Referenced types

### HTTPValidationError

`object` _HTTPValidationError_
- **detail** [`ValidationError[]`](#validationerror) _Detail_

### ValidationError

`object` _ValidationError_
- **loc** `union[]` required _Location_
  - `string`
  - `integer`
- **msg** `string` required _Message_
- **type** `string` required _Error Type_
- **input** `unknown` _Input_
- **ctx** `object` _Context_