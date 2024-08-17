const form = document.querySelector(".feedback-form");

let formData = { email: "", message: "" };

const fillFormField = () => {
    const formDataFromLS = JSON.parse(localStorage.getItem("feedback-form-state"));
    if (formDataFromLS) {
        for (const key in formDataFromLS) {
            if (formDataFromLS.hasOwnProperty(key)) {
                form.elements[key].value = formDataFromLS[key];
                formData[key] = formDataFromLS[key];
            }
        }
    }
};

fillFormField();

const onFormFieldInput = event => {
    event.preventDefault();
    formData[event.target.name] = event.target.value.trim();
    localStorage.setItem("feedback-form-state", JSON.stringify(formData));
};

const onFeedBackFormSubmit = event => {
    event.preventDefault();
    if (!formData.email || !formData.message) {
        alert("Fill please all fields");
        return;
    }
    console.log(formData);
    event.target.reset();
    formData = { email: "", message: "" };
    
};

form.addEventListener("input", onFormFieldInput);
form.addEventListener("submit", onFeedBackFormSubmit);
