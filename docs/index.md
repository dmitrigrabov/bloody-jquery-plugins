# ADK REST API Reference

> Version 2.3.0.

## Operations

> Reference for 21 operations, grouped by tag.

## Other

- [Health](health-GET.md) — `GET` `/health`
- [Version](version-GET.md) — `GET` `/version`
- [List Apps](listApps-GET.md) — `GET` `/list-apps`
- [Get Adk App Info](apps-appName-appInfo-GET.md) — `GET` `/apps/{app_name}/app-info`
- [Get Session](apps-appName-users-userId-sessions-sessionId-GET.md) — `GET` `/apps/{app_name}/users/{user_id}/sessions/{session_id}`
- [Create Session With Id](apps-appName-users-userId-sessions-sessionId-POST.md) — `POST` `/apps/{app_name}/users/{user_id}/sessions/{session_id}`
- [Delete Session](apps-appName-users-userId-sessions-sessionId-DELETE.md) — `DELETE` `/apps/{app_name}/users/{user_id}/sessions/{session_id}`
- [Update Session](apps-appName-users-userId-sessions-sessionId-PATCH.md) — `PATCH` `/apps/{app_name}/users/{user_id}/sessions/{session_id}`
- [List Sessions](apps-appName-users-userId-sessions-GET.md) — `GET` `/apps/{app_name}/users/{user_id}/sessions`
- [Create Session](apps-appName-users-userId-sessions-POST.md) — `POST` `/apps/{app_name}/users/{user_id}/sessions`
- [Get Artifact Version Metadata](apps-appName-users-userId-sessions-sessionId-artifacts-artifactName-versions-versionId-metadata-GET.md) — `GET` `/apps/{app_name}/users/{user_id}/sessions/{session_id}/artifacts/{artifact_name}/versions/{version_id}/metadata`
- [List Artifact Versions Metadata](apps-appName-users-userId-sessions-sessionId-artifacts-artifactName-versions-metadata-GET.md) — `GET` `/apps/{app_name}/users/{user_id}/sessions/{session_id}/artifacts/{artifact_name}/versions/metadata`
- [Save Artifact](apps-appName-users-userId-sessions-sessionId-artifacts-POST.md) — `POST` `/apps/{app_name}/users/{user_id}/sessions/{session_id}/artifacts`
- [List Artifact Names](apps-appName-users-userId-sessions-sessionId-artifacts-GET.md) — `GET` `/apps/{app_name}/users/{user_id}/sessions/{session_id}/artifacts`
- [Load Artifact Version](apps-appName-users-userId-sessions-sessionId-artifacts-artifactName-versions-versionId-GET.md) — `GET` `/apps/{app_name}/users/{user_id}/sessions/{session_id}/artifacts/{artifact_name}/versions/{version_id}`
- [List Artifact Versions](apps-appName-users-userId-sessions-sessionId-artifacts-artifactName-versions-GET.md) — `GET` `/apps/{app_name}/users/{user_id}/sessions/{session_id}/artifacts/{artifact_name}/versions`
- [Load Artifact](apps-appName-users-userId-sessions-sessionId-artifacts-artifactName-GET.md) — `GET` `/apps/{app_name}/users/{user_id}/sessions/{session_id}/artifacts/{artifact_name}`
- [Delete Artifact](apps-appName-users-userId-sessions-sessionId-artifacts-artifactName-DELETE.md) — `DELETE` `/apps/{app_name}/users/{user_id}/sessions/{session_id}/artifacts/{artifact_name}`
- [Patch Memory](apps-appName-users-userId-memory-PATCH.md) — `PATCH` `/apps/{app_name}/users/{user_id}/memory`
- [Run Agent](run-POST.md) — `POST` `/run`
- [Run Agent Sse](runSse-POST.md) — `POST` `/run_sse`