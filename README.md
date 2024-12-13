Below is a detailed `README.md` for the project, describing its purpose, structure, setup, and how to extend it.

---

# Spectrum Alignment

The **Spectrum Alignment** project is designed to deliver a modular test-taking platform for evaluating individuals on various spectrums (axes) of behavior or personality. Initially, it focuses on a Dungeons & Dragons-inspired alignment system (Morality vs. Order), but the architecture is flexible enough to support additional or entirely different tests with more axes and categories.

## Key Features

- **Config-Driven Tests**: The logic, scoring rules, and interpretation of results are defined in JSON configuration files rather than hardcoded in the application. This approach allows you to easily add or modify tests without changing the core code.
- **Wizard-Style UI**: Users answer questions one at a time with a progress bar and navigation controls. Large sets of questions are managed more intuitively than a single long form.
- **Multiple Categories and Axes**: Questions are divided into categories, each focusing on different behavioral or value-based dimensions. Scores are computed per axis, allowing flexible interpretation.
- **Scalable Architecture**: Designed to handle multiple tests, each with its own configuration and question sets. Over time, you can add more tests or change existing ones by updating configuration and data files.
- **Modular Components**: Reusable hooks and components handle loading data, managing test state, displaying questions, and rendering results. This makes it easier to maintain and extend the code.

## Project Structure

```
spectrum-alignment/
├─ index.html
├─ public/
│  └─ data/
│     └─ tests/
│        └─ dnd_alignment_test/
│           ├─ test_config.json
│           ├─ categories.json
│           ├─ empathy_and_altruism.json
│           ├─ respect_for_rules_and_authority.json
│           ├─ conflict_resolution_style.json
│           ├─ consistency_of_actions_and_beliefs.json
│           └─ social_risk_taking.json
├─ src/
│  ├─ pages/
│  │  ├─ testSelection.jsx          // Select test page
│  │  ├─ testLoader.jsx             // Loads config, then routes to wizard
│  │  ├─ questionWizard.jsx         // Main question wizard flow
│  │  ├─ finalResults.jsx           // Displays final results & charts
│  │  └─ notFound.jsx               // 404 / error handling page
│  ├─ components/
│  │  ├─ question.jsx               // Renders a single question
│  │  ├─ questionPager.jsx          // Navigation controls (Next/Back)
│  │  ├─ categorySection.jsx        // (Optional) If grouping by category
│  │  ├─ progressBar.jsx            // Shows progress through questions
│  │  ├─ axisChart.jsx              // Simple visualization of axes results
│  │  ├─ result.jsx                 // Displays final interpreted result
│  │  └─ axisSummary.jsx            // Summarizes axis scores and classifications
│  ├─ utils/
│  │  ├─ scoreCalculator.js         // Generic scoring based on config
│  │  ├─ configLoader.js            // Loads test configs & categories at runtime
│  │  ├─ dataTransforms.js          // Helpers for data normalization & classification
│  │  └─ constants.js               // Shared constants
│  ├─ hooks/
│  │  ├─ useTestState.js            // Manages current question index & responses
│  │  ├─ useConfig.js               // Loads & caches test config
│  │  └─ useQuestions.js            // Loads & prepares question data
│  ├─ styles/
│  ├─ app.jsx
│  ├─ main.jsx
│  └─ index.css
├─ package.json
└─ vite.config.js
```

### Data Files

- **test_config.json**: Defines axes, scoring rules, how to interpret results, and references `categories.json`.
- **categories.json**: Lists categories of questions, each with a file containing the question data.
- **Question Files (e.g. empathy_and_altruism.json)**: Each file contains a list of questions, their text, and their weights towards different axes.

## Setup & Installation

**Prerequisites:**
- Node.js and npm
- Git (optional, for cloning)

**Steps:**
1. Clone or copy the project into a local directory.
   
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   
4. Open your browser and navigate to `http://localhost:5173` (the default Vite dev server port) to view the application.

**Build & Preview:**
- To create a production build:
  ```bash
  npm run build
  ```
- To preview the production build:
  ```bash
  npm run preview
  ```

## How to Use

1. **Selecting a Test**: On the home page (`/`), select a test (initially just the D&D Alignment Test).
   
2. **Answering Questions**: Navigate through questions using the “Next” and “Back” buttons. The progress bar shows how far along you are.

3. **Submitting and Viewing Results**: Once all questions are answered, submit to see your final alignment. The results page displays scores, interpretations, and classifications based on the defined test configuration.

## Modifying Tests

**To adjust or add a new test**:
1. Create a new folder under `public/data/tests/` with a unique test ID (e.g. `my_new_test`).
2. Add your `test_config.json` and `categories.json`, plus any question files.
3. Update the `testSelection.jsx` to include a button or link to your new test (e.g. `/test/my_new_test`).
4. The code will automatically load the new test’s configuration and questions at runtime.

**To tweak scoring or alignments**:
- Edit `test_config.json` to change axes definitions, scale factors, or interpretation mappings.
- Update classifications to add or remove categories (e.g., from “Good/Neutral/Evil” to something else).
- Adjust `weights` in the question files to influence how answers affect each axis.

## Adding PropTypes

If you prefer strong runtime prop validation or are integrating with a linting rule for prop definitions:
- Import `PropTypes` in each component file.
- Define `.propTypes` according to the expected props for that component (examples provided in previous prompts).

## Future Enhancements

- **Multiple Axes**: Move beyond the two-axis D&D alignment and support 3 or more axes by simply adjusting the `test_config.json`.
- **Charts**: Integrate a real charting library (e.g. `chart.js` or `recharts`) for a more sophisticated data visualization.
- **Accessibility and Internationalization**: Improve accessibility (ARIA labels, keyboard navigation) and consider multiple language support by externalizing text into translation files.

## Troubleshooting

- **Configuration Errors**: If `test_config.json` or `categories.json` is missing or invalid, you’ll see an error on the test loader page.
- **Data Fetch Failures**: Ensure that your test data files are in `public/data/tests/<testId>/` and that file names match what’s referenced in `categories.json`.
- **React/JSX Errors**: Make sure you have the latest React and Vite versions and that your environment supports JSX. If you get linting errors for unused imports (like `React` in newer JSX versions), remove them or adjust ESLint rules.

## License

This project is licensed under the MIT License.
