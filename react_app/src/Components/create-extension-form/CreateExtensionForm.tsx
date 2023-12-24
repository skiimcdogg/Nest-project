import React, { useState } from "react";
import "./CreateExtensionForm.css";
import apiHandler from "../../services/apiHandler";

type CreateExtensionFormState = {
  code: string;
  extensionName: string;
};

function CreateExtensionForm() {
  const [formFields, setFormFields] = useState<CreateExtensionFormState>({
    code: "",
    extensionName: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      formFields.code.trim() === "" ||
      formFields.extensionName.trim() === ""
    ) {
      alert("Please fill out all the fields");
      return;
    }

    apiHandler
      .createExtension(formFields)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error during creation process", error);
      });

    setFormFields({ code: "", extensionName: "" });
  };

  return (
    <div className="creation-form">
      <form className="creation-form__form" onSubmit={handleSubmit}>
        <label htmlFor="code">Code</label>
        <input
          type="text"
          id="code"
          name="code"
          value={formFields.code}
          onChange={handleInputChange}
        />
        <label htmlFor="extension">Set Name</label>
        <input
          type="text"
          id="extension"
          name="extensionName"
          value={formFields.extensionName}
          onChange={handleInputChange}
        />

        <button type="submit">Create Extension</button>
      </form>
      <p className="creation-form__infos">
        Some examples of extensions you can create (code and set name):{" "}
      </p>
      <p className="creation-form__infos">
        "neo": "Kamigawa: Neon Dynasty", "snc": "Streets of New Capenna", "vow":
        "Innistrad: Crimson Vow", "iko", "Ikoria: Lair of Behemoths", "sta":
        "Strixhaven Mystical Archive"
      </p>
      <p>Please re-run the database script after adding a new extension !</p>
    </div>
  );
}

export default CreateExtensionForm;
