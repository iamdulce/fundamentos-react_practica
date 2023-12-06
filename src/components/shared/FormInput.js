import clsx from "clsx";

import "./FormInput.css";

const FormInput = ({ className, autofocus, label, ...props }) => {
    return (
        <div className={clsx("formInput", className)}>
            <label className="formInput-label">
                <span>{label}</span>
                <input
                    className="formInput-input"
                    autoComplete="off"
                    {...props}
                />
            </label>
        </div>
    );
};

export default FormInput;
