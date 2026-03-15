# The Retirement Gold Planner

The Retirement Gold Planner is a high-accessibility financial tool designed for Technex 26. It simplifies complex mutual fund concepts through an intuitive, interactive interface while strictly adhering to HDFC Mutual Fund's educational and regulatory guidelines.

### 📺 Watch the Demo
[![Retirement Gold Planner Demo](https://img.youtube.com/vi/6YQjxX9mJ6A/0.jpg)](https://www.youtube.com/watch?v=6YQjxX9mJ6A)
*Click the image above to watch the localized voice assistant and accessibility features in action.*

---

### 🛠️ Technical Stack
The application is built with a focus on speed, cross-platform accessibility, and low-latency interaction.

* **Frontend Framework:** React.js / Next.js (for optimized performance and SEO).
* **Voice Engine:** Browser-native **Web Speech API** (SpeechSynthesis and SpeechRecognition) for zero-latency localized assistance.
* **Styling & UI:** Tailwind CSS for a responsive, WCAG-compliant design (AA standard).
* **State Management:** React Context API for managing real-time calculations and user preferences.
* **Form Handling:** React Hook Form with integrated ARIA labels for screen reader compatibility.

---

### 🧮 3-Step Mandatory Framework
Our calculator implements the industry-standard formulas required for retirement planning:
1. **Inflate Expenses:** Calculates future lifestyle costs based on user-editable inflation.
2. **Calculate Corpus:** Determines the target fund using the Present Value of Annuity formula.
3. **Determine SIP:** Calculates the required monthly investment to reach that corpus.

### ♿ Accessibility & Inclusion
* **Multi-Lingual Voice Assistant:** Real-time speech synthesis for 6 Indian languages (English, Hindi, Marathi, Tamil, Urdu, and Bengali).
* **Universal Design:** One-click voice buttons next to every input field for visually impaired users.
* **WCAG 2.1 AA Compliance:** Full keyboard navigation support and ARIA-compliant UI.

### ⚖️ Regulatory Compliance
* **Mandatory Disclaimer:** Full regulatory text included.
* **Brand Fidelity:** Strictly utilizes the HDFC palette: Blue (#224c87), Red (#da3832), and Grey (#919090).
* **Educational Focus:** Free from prohibited growth arrows or predictive "guarantee" language.

### 🔊 How to Experience the Localized Voice Assistant
Our tool uses the browser's native **Web Speech API** for maximum accessibility. To hear the assistant in regional languages (Hindi, Tamil, Bengali, etc.), please ensure the corresponding voice packs are installed on your device:

**For Windows 10/11:**
1. Go to **Settings > Time & Language > Speech**.
2. Under **Manage voices**, click **Add voices**.
3. Search for "Hindi" (or your preferred language) and click **Add**.

**For Android/iOS:**
Most modern mobile devices have Indian regional voice packs pre-installed. The app will automatically detect and use them.

> **Note:** If a specific voice pack is missing, the assistant will fallback to the system's default English voice to ensure continuous accessibility.
