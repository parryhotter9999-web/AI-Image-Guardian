export function Button({
    text,
    icon = "",
    variant = "primary",
    id = ""
}) {

    const button = document.createElement("button");

    button.className = `btn btn-${variant}`;

    if (id) button.id = id;

    button.innerHTML = `
        <span class="btn-icon">${icon}</span>
        <span>${text}</span>
    `;

    return button;

}