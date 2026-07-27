---
type: operation
title: "Delete Session"
operationId: "delete_session_apps__app_name__users__user_id__sessions__session_id__delete"
method: DELETE
path: "/apps/{app_name}/users/{user_id}/sessions/{session_id}"
---

# Delete Session

`DELETE` `/apps/{app_name}/users/{user_id}/sessions/{session_id}`

## Path parameters

**app_name** `string` required _App Name_

**user_id** `string` required _User Id_

**session_id** `string` required _Session Id_

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