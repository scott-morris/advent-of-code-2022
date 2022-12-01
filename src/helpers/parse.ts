export function parseStringArray (input: RawInput, delimiter = ""): Input.StringArray {
    return Array.isArray(input) ? input : input.split(delimiter);
}

export function parseNumberArray (input: RawInput, delimiter = ""): Input.NumberArray {
    const arr = Array.isArray(input) ? input : input.split(delimiter);
    return arr.map((value: string | number) => typeof value === "number" ? value : parseInt(value, 10));
}

export function parseStringMatrix(input: RawInput, delimiter = ""): Input.StringMatrix {
    const rows = Array.isArray(input) ? input : input.split('\n');
    return rows.map((row) => parseStringArray(row, delimiter));
}

export function parseNumberMatrix(input: RawInput, delimiter = ""): Input.NumberMatrix {
    const rows = Array.isArray(input) ? input : input.split('\n');
    return rows.map((row) => parseNumberArray(row, delimiter));
}