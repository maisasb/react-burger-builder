export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
};

export const checkValidity = (value, rules) => {

    let isValid = true;
    let message = '';

    if (rules.required){
        isValid = value.trim() !== '';
        if (!isValid){
            message = 'This field is required';

        }
    }

    if (rules.minLength && isValid) {
        isValid = value.length >= rules.minLength;
        if (!isValid){
            message = 'Min length is '+ rules.minLength;
        }
    }

    if (rules.maxLength && isValid) {
        isValid = value.length <= rules.maxLength;
        if (!isValid){
            message = 'Max length is '+ rules.maxLength;
        }
    }

    if (rules.isEmail && isValid){
        var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        isValid = re.test(value);
        if (!isValid){
            message = 'Email is wrong';
        }

    }

    return {isValid: isValid, message: message};
}