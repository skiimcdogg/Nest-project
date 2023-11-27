import React, { useState } from "react";
import axios from 'axios';

type CreateExtensionFormState = {
    code: string;
    setName: string;
}

function CreateExtensionForm() {
    const [formFields, setFormFields] = useState<CreateExtensionFormState>({
        code: '',
        setName: ''
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormFields(prevState => ({
            ...prevState,
            [name]: value
        }))
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(formFields.code.trim() === '' || formFields.setName.trim() === '') {
            alert('Please fill out all the fields')
            return;
        }

        axios.post('http://localhost:3000/extensions/create', formFields)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error during creation process', error)
            });

        setFormFields({ code: '', setName: ''})
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>

                <input
                type="text"
                name="code"
                value={formFields.code}
                onChange={handleInputChange} 
                />

                <input
                type="text"
                name="extension"
                value={formFields.setName}
                onChange={handleInputChange} 
                />

                <button type="submit">Create Extension</button>
            </form>
            <p>Some examples of extensions you can create (code and set name): </p>
            <p>"neo": "Kamigawa: Neon Dynasty", "snc": "Streets of New Capenna", "vow": "Innistrad: Crimson Vow", "iko", "Ikoria: Lair of Behemoths", "sta": "Strixhaven Mystical Archive"</p>
        </div>
    )
};

export default CreateExtensionForm;