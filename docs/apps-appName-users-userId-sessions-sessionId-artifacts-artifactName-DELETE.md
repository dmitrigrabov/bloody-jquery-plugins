---
type: operation
title: "Delete Artifact"
operationId: "delete_artifact_apps__app_name__users__user_id__sessions__session_id__artifacts__artifact_name__delete"
method: DELETE
path: "/apps/{app_name}/users/{user_id}/sessions/{session_id}/artifacts/{artifact_name}"
---

# Delete Artifact

`DELETE` `/apps/{app_name}/users/{user_id}/sessions/{session_id}/artifacts/{artifact_name}`

## Path parameters

**app_name** `string` required _App Name_

**user_id** `string` required _User Id_

**session_id** `string` required _Session Id_

**artifact_name** `string` required _Artifact Name_

## Responses

### `200` — Successful Response

`unknown`

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