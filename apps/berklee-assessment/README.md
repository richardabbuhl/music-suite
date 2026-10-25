# Berklee Practice Room

A React app for focused practice and self-guided mock tests for Berklee private lesson proficiency levels 1 through 8.

## Run locally

From this folder:

```sh
npm install
npm run dev
```

Create a production build with `npm run build`.

## Features

- Select among levels 1–8 and review the skill areas listed for each level.
- Follow short practice prompts and open the corresponding supporting PDF.
- Mark areas as ready or needing review; progress is saved in this browser.
- Take a self-assessed mock test covering each listed practice area.
- Open the official requirements and level-specific sample-question PDFs.

## Source material and scope

The curriculum overview was prepared from the Berklee exam-requirements index and linked support materials. Those source documents are not included in this repository. To use the in-app PDF links, place materials you are authorized to use in `docs/Berklee-Exam-Requirements/`, keeping the expected filenames. That folder is intentionally ignored by Git.

The app does not reproduce or infer exact test requirements from the source PDFs. Practice prompts and mock-test results are study aids, not official questions or grading, and do not replace course or instructor guidance.

## Project structure

- `src/App.tsx` — practice dashboard, mock-test flow, and progress state
- `src/curriculum.ts` — level-to-skill mapping and source PDF links
- `src/styles.css` — responsive interface styles
- `docs/` — local source materials (not committed)
