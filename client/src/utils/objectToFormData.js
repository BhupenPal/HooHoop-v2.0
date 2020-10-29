const objectToFormData = (obj) => {
    let formData = new FormData();
    Object.keys(obj).forEach((key) => {
        if (Array.isArray(obj[key])) {
            const arrayKey = `${key}`;
            obj[key].forEach(v => {
                formData.append(arrayKey, v);
            });
        } else{
            formData.append(key, obj[key]);
        }
     //   formData.append(key,);
    })
    return formData;
}

export default objectToFormData;