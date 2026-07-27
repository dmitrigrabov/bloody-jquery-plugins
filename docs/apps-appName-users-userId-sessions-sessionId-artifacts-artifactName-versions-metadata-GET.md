---
type: operation
title: "List Artifact Versions Metadata"
operationId: "list_artifact_versions_metadata_apps__app_name__users__user_id__sessions__session_id__artifacts__artifact_name__versions_metadata_get"
method: GET
path: "/apps/{app_name}/users/{user_id}/sessions/{session_id}/artifacts/{artifact_name}/versions/metadata"
---

# List Artifact Versions Metadata

`GET` `/apps/{app_name}/users/{user_id}/sessions/{session_id}/artifacts/{artifact_name}/versions/metadata`

## Path parameters

**app_name** `string` required _App Name_

**user_id** `string` required _User Id_

**session_id** `string` required _Session Id_

**artifact_name** `string` required _Artifact Name_

## Responses

### `200` — Successful Response

[`ArtifactVersion[]`](#artifactversion) _Response List Artifact Versions Metadata Apps  App Name  Users  User Id  Sessions  Session Id  Artifacts  Artifact Name  Versions Metadata Get_

### `422` — Validation Error

[`HTTPValidationError`](#httpvalidationerror) _HTTPValidationError_

## Referenced types

### ArtifactVersion

`object` _ArtifactVersion_ — Metadata describing a specific version of an artifact.
- **version** `integer` required _Version_ — Monotonically increasing identifier for the artifact version.
- **canonicalUri** `string` required _Canonicaluri_ — Canonical URI referencing the persisted artifact payload.
- **customMetadata** `object` _Custommetadata_ — Optional user-supplied metadata stored with the artifact.
- **createTime** `number` _Createtime_ — Unix timestamp (seconds) when the version record was created.
- **mimeType** `string` nullable _Mimetype_ — MIME type when the artifact payload is stored as binary data.

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