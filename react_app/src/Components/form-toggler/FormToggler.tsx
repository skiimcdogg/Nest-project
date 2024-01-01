import { useState } from "react";
import CreateExtensionForm from "../create-extension-form/CreateExtensionForm";
import "./FormToggler.css";

function FormToggler() {
  const [showCreateExtensionForm, setShowCreateExtensionForm] =
    useState<boolean>(false);

  return (
    <div className="form-toggler">
      <button
        className="form-toggler__button--show-form"
        onClick={() => setShowCreateExtensionForm((prev) => !prev)}
      >
        {showCreateExtensionForm ? "Hide Creation Form" : "Show Creation Form"}
      </button>
      <div
        className={`form-toggler__creation-form-component ${
          showCreateExtensionForm ? "visible" : ""
        }`}
      >
        <CreateExtensionForm />
      </div>
    </div>
  );
}

export default FormToggler;
