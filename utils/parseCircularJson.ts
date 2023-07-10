export default function parseCircularJSON(json) {
    const objects = new Map();

    function traverse(obj) {
        if (typeof obj === 'object' && obj !== null) {
            if ('$ref' in obj) {
                // Circular reference encountered, replace with actual object
                return objects.get(obj['$ref']);
            } else {
                for (const key in obj) {
                    obj[key] = traverse(obj[key]);
                }
            }
        } else if (typeof obj === 'string' && /^\d+$/.test(obj)) {
            // Store unique identifier in the objects map
            objects.set(obj, obj);
        }

        return obj;
    }

    const parsedData = JSON.parse(json);
    return traverse(parsedData);
}
