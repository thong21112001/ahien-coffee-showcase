## Safety, Stability & Permission Rules

### 1. Core Stability (Workflow, DTOs & API Responses)

* **Preserve the existing workflow:** Any new code or modifications **must not** alter or break the current application workflow or business logic that is already functioning correctly.
* **Preserve DTOs:** Do **not** modify, add, or remove fields in existing Data Transfer Objects (DTOs) unless the user explicitly requests it. This ensures input data integrity and compatibility.
* **Preserve API responses:** Maintain the current API response structure (response structs/interfaces/schemas). Do not change response formats in a way that could break existing clients or frontend applications.

### 2. Security & Explicit Permissions

* **`.env` file:** **Never** automatically read, modify, or expose any information from the `.env` file. If any task requires access to the `.env` file, stop and ask the user for explicit permission first.
* **Database:** Do **not** execute direct database operations (such as dropping tables, deleting records, or manually modifying data) outside the application's existing repository/service logic. Always request explicit user confirmation before performing any direct database operations.
* **File deletion & external files:** Do **not** delete any files or access, modify, or create files outside the current project workspace unless the user has explicitly granted permission.
