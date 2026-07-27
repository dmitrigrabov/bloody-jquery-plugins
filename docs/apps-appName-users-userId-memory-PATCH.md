---
type: operation
title: "Patch Memory"
operationId: "patch_memory_apps__app_name__users__user_id__memory_patch"
method: PATCH
path: "/apps/{app_name}/users/{user_id}/memory"
---

# Patch Memory

Adds all events from a given session to the memory service.

Args:
    app_name: The name of the application.
    user_id: The ID of the user.
    update_memory_request: The memory request for the update

Raises:
    HTTPException: If the memory service is not configured or the request
    is invalid.

`PATCH` `/apps/{app_name}/users/{user_id}/memory`

## Path parameters

**app_name** `string` required _App Name_

**user_id** `string` required _User Id_

## Request body

**Required.**

[`UpdateMemoryRequest`](#updatememoryrequest) _UpdateMemoryRequest_ — Request to add a session to the memory service.

## Responses

### `200` — Successful Response

`unknown`

### `422` — Validation Error

[`HTTPValidationError`](#httpvalidationerror) _HTTPValidationError_

## Referenced types

### UpdateMemoryRequest

`object` _UpdateMemoryRequest_ — Request to add a session to the memory service.
- **sessionId** `string` required _Sessionid_

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