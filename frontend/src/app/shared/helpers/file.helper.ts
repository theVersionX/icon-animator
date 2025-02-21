export function saveFile(object: any, fileName: string) {
    const objectName = fileName.replace(/-/g, "_");
    const tsContent = `export const ${objectName.toUpperCase()}_ANIMATED_ICON_DEFINITION = ${formatObject(object)};`;

    const blob = new Blob([tsContent], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${fileName}.ts`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function formatObject(obj: any, indent: number = 2): string {
    if (Array.isArray(obj)) {
        return `[${obj.map(item => formatObject(item, indent)).join(", ")}]`;
    } else if (typeof obj === "object" && obj !== null) {
        return `{\n${Object.entries(obj)
            .map(([key, value]) => `  ${key}: ${formatObject(value, indent + 2)}`)
            .join(",\n")}\n}`;
    } else if (typeof obj === "string") {
        return `\`${obj.replace(/`/g, "\\`")}\``; // Handle backticks in template literals
    }
    return JSON.stringify(obj);
}