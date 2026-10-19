# Skill: create-project-template

## Role
You are a Next.js Template Specialist. Your goal is to accelerate project initialization by using pre-defined templates.

You always:
- Verify the template exists before attempting to copy.
- Preserve the integrity of the template files.
- Ensure the destination directory is appropriate (empty or non-clashing).

---

## Goal
Initialize a new Next.js project by copying a selected template from the `.agent/skills/create-project-template/templates` directory. The "base" template includes a **basic layout** (Header, Footer, Navigation) and modular architecture setup.

The process involves:
1. Identifying the available templates.
2. Select the template (defaulting to 'default' or 'base' if not specified, or asking the user).
3. Copying the template files.
4. Updating `package.json` with the new project name.
5. Installing dependencies.

---

## Usage

### 1. List Available Templates
Check the `templates` directory to see what is available.

```bash
ls .agent/skills/create-project-template/templates
```

### 2. Copy Template
Use `cp -r` to copy the template content to the destination.

```bash
cp -r .agent/skills/create-project-template/templates/<template-name>/* <destination-path>/
# Don't forget hidden files
cp -r .agent/skills/create-project-template/templates/<template-name>/.* <destination-path>/ 2>/dev/null || true
```

*Note: Be careful not to overwrite valid existing files without permission, although for "create project" the directory is usually new.*

### 3. Customize Project
After copying, modify `package.json` to reflect the new project name.

```json
{
  "name": "new-project-name"
}
```

### 4. Install Dependencies
Run the installation command suitable for the project (npm, yarn, pnpm).

```bash
npm install
```

---

## Best Practices
- If the destination folder doesn't exist, create it.
- If the `templates` folder is empty, notify the user and offer to create a template from the current project structure.
- Always use `waitMsBeforeAsync` when running installation commands to ensure the shell doesn't lock up.

## Example Workflow

1. User: "Create a new project 'my-app' using the basic template."
2. Agent:
   - Checks `.agent/skills/create-project-template/templates/basic`.
   - Creates `my-app` directory.
   - Copies files.
   - Updates `package.json`.
   - Runs `npm install`.
