# 📄 Document Generation Flow

This document describes the architecture and logic behind the **document generation flow** in our application. It is intended to serve as onboarding material for new developers, and as a reference guide for future maintenance.

---

## 🧩 High-Level Overview

The document generation process is built around the following key components:

1. **`DocumentGenerationPage`** — the main page that orchestrates the flow, renders forms, stepper, loader, and final results.
2. **`GenerateDocumentProvider`** — a context provider that holds the state machine for form steps, generated output, and submission lifecycle.
3. **`useGenerateDocumentFlow`** — a custom hook that encapsulates business logic for navigating through the stepper and handling validation.
4. **UI Components** — `DynamicForm`, `Stepper`, `DocumentGenerationLoader`, and modals for success/error handling.
5. **`generateDocumentAction`** — a server action that generates the actual document (HTML + PDF).

---

## 📌 DocumentGenerationPage

**File:** `DocumentGenerationPage.tsx`

This is the entry point for the document generation UI.

- Displays the **Stepper** with steps defined in `FORM_STEPS` (per document type and language).
- Renders a **DynamicForm** for the active step.
- Shows a **Loader** when the document is being generated.
- On the `result` step:

  - Displays a live preview of the generated document (HTML rendered inside an `iframe`).
  - Provides a link to download the generated PDF.

Data comes from two sources:

- `useGenerateDocumentStepper` (context state).
- `useGenerateDocumentFlow` (stepper logic).

---

## 📌 GenerateDocumentProvider

**File:** `GenerateDocumentStepper.tsx`

This provider manages the full lifecycle of document generation.

### State managed in context:

- `step` — the current step object (`{ label, key }`).
- `generatedPdfUrl` — URL of the generated PDF file.
- `generatedDocument` — HTML content of the generated document.
- `selectedDocument` — type of document being generated.
- `completedStepIndex` — index of the last completed step.
- `isLoading` — global loading indicator.

### Core responsibilities:

- Integrates **React Hook Form** with **Zod** for form handling and validation.
- Submits data to the server via `generateDocumentAction`.
- Handles server responses:

  - **Success** → saves generated HTML + PDF URL, updates stepper, shows `SuccessModal`.
  - **Failure** → sets form errors, shows `ErrorModal`.

- Clears errors when steps change (to avoid stale error states).

---

## 📌 useGenerateDocumentFlow

**File:** `useDocumetFlow.ts`

Custom hook that encapsulates stepper navigation and form state binding.

### Responsibilities:

- Retrieves `step`, `selectedDocument`, and setters from context.
- Uses `formFieldsSchemas` to dynamically determine which fields to render per step.
- Computes whether the stepper + form should be displayed (`shouldShowFormAndStepper`).

### Methods:

- `handleStepClick(newStepKey)`

  - Moving forward → validates the current step’s fields before proceeding.
  - Moving backward → clears errors and updates step directly.

- `handleFormClearErrors()` → clears all form errors.
- `handleBackStep()` → moves one step back, clearing errors in the process.

### Returns:

- `formFieldsSchema` — schema for the active step.
- `shouldShowFormAndStepper` — flag for conditional rendering.
- Navigation helpers (`handleStepClick`, `handleBackStep`).
- State flags (`isErrorExist`, `isSubmitted`).

---

## 📌 Supporting Configurations

- **`FORM_STEPS`** — step definitions for each document type and language.
- **`DOCUMENT_SCHEMAS`** — Zod schemas for validation.
- **`formFieldsSchemas`** — metadata describing form fields per step (labels, inputs, etc.).

---

## 📌 User Flow

1. User selects a document type and language.
2. `DocumentGenerationPage` is loaded.
3. Stepper and dynamic form are displayed for the first step.
4. On form submission:

   - Validation runs via Zod.
   - Data is sent to the backend (`generateDocumentAction`).
   - Response contains both HTML preview and a PDF URL.

5. On the `result` step:

   - Preview of the document is shown in an `iframe`.
   - User can download the final PDF.

---

## ⚡️ Key Implementation Notes

- **Validation**: strictly handled through Zod schemas. No ad-hoc validations in components.
- **Error Handling**: centralized via `ErrorModal`.
- **Localization**: driven by `lang` (`ua` | `en`). Affects step labels, modals, and messages.
- **Stepper Navigation**: controlled exclusively through `useGenerateDocumentFlow`.
- **Memory Management**: `URL.revokeObjectURL` ensures blob URLs are cleaned up on unmount.

---

## 🚀 Adding a New Document Type

1. Define its Zod schema in `DOCUMENT_SCHEMAS`.
2. Add step definitions to `FORM_STEPS` for both `ua` and `en`.
3. Extend `formFieldsSchemas` with fields for each step.
4. Update `generateDocumentAction` to handle the new document type.
5. That’s it — the UI will automatically integrate the new type.

---

## ✅ Summary

- `DocumentGenerationPage` — orchestrates UI rendering.
- `GenerateDocumentProvider` — holds state and submission lifecycle.
- `useGenerateDocumentFlow` — manages stepper navigation and form validation flow.
- `generateDocumentAction` — server-side document generation.
- **Configuration-driven** — adding documents is schema + config only, no core logic changes required.

This design ensures **separation of concerns**, **scalability**, and **ease of onboarding** for new contributors. {"updates":[{"pattern":".\*","multiple":false,"replacement":"# Document Generation Flow\n\nThis document provides an in-depth explanation of how the document generation feature is designed and implemented in the project. It is intended for developers who want to understand, maintain, or extend the flow.\n\n---\n\n## High-Level Overview\n\nThe document generation flow allows a user to:\n1. Select a document type.\n2. Complete a step-by-step form with dynamic validation.\n3. Submit the form and trigger a server-side action that generates both an HTML preview and a PDF document.\n4. Review the generated document and download the PDF.\n\n---\n\n## Core Components\n\n### 1. DocumentGenerationPage\n- Acts as the main entry point for the flow.\n- Responsible for:\n - Rendering the Stepper for navigation between steps.\n - Displaying the DynamicForm fields.\n - Showing loaders during document generation.\n - Displaying the final preview and download link.\n\n### 2. Context: GenerateDocumentProvider\n- Centralized state management using React Context.\n- Responsibilities:\n - Tracking the current step (step).\n - Storing the generated document HTML (generatedDocument) and PDF URL (generatedPdfUrl).\n - Handling submission logic (onSubmit) including server action calls.\n - Managing step progression and error handling.\n\n### 3. Hook: useGenerateDocumetFlow\n- Encapsulates UI-driven logic for the stepper.\n- Responsibilities:\n - Resolving the correct form schema for the current step.\n - Managing navigation between steps (including validation).\n - Handling back navigation and error clearing.\n\n### 4. Form Management\n- Implemented with react-hook-form and validated using Zod schemas.\n- Each document type provides its own schema (DOCUMENT_SCHEMAS).\n- Stepper progression is tightly coupled with validation results.\n\n### 5. Server Action: generateDocumentAction\n- Runs on the server.\n- Responsibilities:\n - Accepts the selected document type, form data, language, and user.\n - Generates the document in both HTML and PDF formats.\n - Returns the generated assets back to the client.\n\n---\n\n## Flow Diagram\n\n### User Journey Flowchart\nmermaid\nflowchart TD\n A[User selects document type] --> B[Dynamic form with steps]\n B -->|Completes step| C[Validation with Zod + react-hook-form]\n C -->|Valid| D[Submit form]\n C -->|Invalid| B\n D --> E[Server Action: generateDocumentAction]\n E -->|Success| F[Generated HTML + PDF URL returned]\n F --> G[Preview HTML in iframe]\n F --> H[Provide PDF download link]\n\n\n### Architecture Diagram\nmermaid\ngraph LR\n UI[DocumentGenerationPage]\n Provider[GenerateDocumentProvider]\n Hook[useGenerateDocumetFlow]\n Form[DynamicForm + Stepper]\n Server[generateDocumentAction]\n\n UI --> Provider\n Provider --> Hook\n Provider --> Form\n Hook --> Form\n Form --> Server\n Server --> Provider\n Provider --> UI\n\n\n---\n\n## Example Stepper Workflow\n1. Initial Step: User starts on the person step.\n2. Validation: Form fields are validated via Zod.\n3. Next Step: User proceeds to the next step only if the current step passes validation.\n4. Submission: On the final step, data is submitted to the server.\n5. Generation: Server returns generated HTML (preview) and PDF (download).\n6. Result Step: User sees a preview and can download the PDF.\n\n---\n\n## Error Handling\n- Errors during form validation are highlighted inline via react-hook-form.\n- Server-side errors trigger a modal (ErrorModal).\n- Success is confirmed with a modal (SuccessModal).\n\n---\n\n## Extension Guidelines\n\n### Adding a New Document Type\n1. Schema: Add validation schema to DOCUMENT_SCHEMAS.\n2. Steps: Define form steps in FORM_STEPS.\n3. Fields: Define input fields in formFieldsSchemas.\n4. Server Action: Update generateDocumentAction to handle the new type.\n5. UI: The flow automatically adapts when the new document type is provided.\n\n### Best Practices\n- Always keep schemas in sync with backend requirements.\n- Ensure each step is independent and validates only its own fields.\n- Clean up object URLs when previews are no longer needed.\n\n---\n\n## Key Takeaways\n- The flow is modular: Context manages state, hooks manage logic, and components manage rendering.\n- Validation is strict and step-driven, preventing incomplete submissions.\n- The system is extensible, allowing new document types to be added with minimal effort."}]}
