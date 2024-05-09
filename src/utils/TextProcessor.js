export function parseTextToArray(text) {
    const lines = text.split("\n");
    return lines.reduce((acc, line, index) => {
        const words = line.split(/\s+/).filter(Boolean);
        acc.push(...words);
        if (index < lines.length - 1) {
            acc.push("Enter");
        }
        return acc;
    }, []);
}
