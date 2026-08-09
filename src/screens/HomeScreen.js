import { AnalysisEngine } from "../analysis/AnalysisEngine.js";
import { Button } from "../components/ui/Button.js";

export function HomeScreen() {

    console.log("6. HomeScreen() started");

    const screen = document.createElement("main");
    screen.className = "home-screen";

    // Hero Section
    const hero = document.createElement("section");
    hero.className = "hero";

    hero.innerHTML = `
        <div class="logo">🛡️</div>

        <h1>AI Image Guardian</h1>

        <p>
            Detect images that may have been generated or manipulated using Artificial Intelligence.
        </p>
    `;

    // Upload Card
    const uploadCard = document.createElement("section");
    uploadCard.className = "upload-card";

    // Hidden File Input
    const imageInput = document.createElement("input");
    imageInput.type = "file";
    imageInput.accept = "image/*";
    imageInput.hidden = true;
    imageInput.id = "imageInput";

    // Buttons
    const cameraButton = Button({
        text: "Take Photo",
        icon: "📷",
        variant: "primary",
        id: "cameraButton"
    });

    const galleryButton = Button({
        text: "Choose From Gallery",
        icon: "🖼️",
        variant: "secondary",
        id: "galleryButton"
    });

    uploadCard.append(
        imageInput,
        cameraButton,
        galleryButton
    );

    screen.append(
        hero,
        uploadCard
    );

    // Camera Button
    cameraButton.onclick = () => {

        imageInput.setAttribute("capture", "environment");

        imageInput.click();

    };

    // Gallery Button
    galleryButton.onclick = () => {

        imageInput.removeAttribute("capture");

        imageInput.click();

    };

    // Image Selected

        // Image Selected
imageInput.onchange = async (event) => {

    console.log("1️⃣ Image selected");

    const file = event.target.files[0];

    if (!file) return;

    console.log(file);

    try {

        const report = await AnalysisEngine.analyze(file);

        console.log("2️⃣ Analysis complete");
        console.log(report);

        alert(
            `Likelihood: ${report.likelihood}%\n` +
            `Confidence: ${report.confidence}`
        );

    } catch (error) {

        console.error(error);

        alert("Analysis failed. Check the browser console.");

    }

};

console.log("7. HomeScreen() finished");
return screen;


}