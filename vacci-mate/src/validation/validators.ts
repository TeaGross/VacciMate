export const validators = {
    minValue:
        (min: number, message?: string) =>
        (value: string) => {
            if (!value) {
                return true;
            }
            return +value >= min || message || `Måste vara minst ${min}`;
    },
    notLowerThan:
    (min: number, message: string) =>
    (value?: string) => {
        if (!value) {
            return true;  
        } 
        return +value >= min || message;
    },

    maxValue:
    (max?: string | number, message?: string) =>
    (value?: string) => {
        if (!value || max === undefined || max === '') {
            return true;
        }
        return +value <= +max || message || `Får inte vara större än ${max}`;
    },
    notBeforeToday:
    (message = 'Datumet kan inte vara tidigare än idag') =>
    (value?: string) => {
        if (!value) {
            return true;
        }
        const today = new Date().toISOString().split('T')[0];
        return value >= today || message;
    },
};