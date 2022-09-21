// Libraries

// Dependencies

// Private

const MAX_LENGTH = String(Number.MAX_SAFE_INTEGER).length;

// Public

export default function isNumber (input: string | number): boolean {
    if (typeof input === 'number') { 
        return true;
    }

    if (typeof input !== 'string') { return false; }
    if (input.length > MAX_LENGTH) { return false; }
    
    const num = Number(input);
    return !isNaN(num);
}