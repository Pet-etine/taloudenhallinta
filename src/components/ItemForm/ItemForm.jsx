import styles from './ItemForm.module.scss';
import useForm from '../../shared/useform/useform';
import Button from '../../shared/buttons';
import { useNavigate } from 'react-router-dom';

function ItemForm(props) {
    const navigate = useNavigate();

    const submit = () => {
        let storedValues = { ...values };
        storedValues["Form ID"] = storedValues["Form ID"] ? storedValues["Form ID"] : crypto.randomUUID(); // Ensure Form ID exists
        
        console.log("🔍 Debug: Submitting item to main page:", storedValues);
    
        if (props.onItemSubmit) {
            props.onItemSubmit(storedValues);  // ✅ Send data to main page
        } else {
            console.error("❌ Error: onItemSubmit function is missing!");
        }
    
        setValues({ "Form Type": "", "Form ID": "", "Full Name": "", "Editor ID": "" });  // ✅ Clear form after submit
    };
    

    const initialState = props.formData ? props.formData : {
        "Form Type": "",
        "Form ID": "",
        "Full Name": "",
        "Editor ID": ""
    };

    const { values, handleChange, handleSubmit, setValues } = useForm(submit, initialState, false);

    const handleCancel = () => {
        navigate('/');
    };

    const loadData = async () => {
        try {
            const response = await fetch("/data.json");
            if (!response.ok) throw new Error("Failed to load data.json");
    
            const jsonData = await response.json();
            
            if (jsonData.length > 0) {
                const firstItem = jsonData[0]; // Load first item for now
    
                // Use setValues to update the form values
                setValues({
                    "Form Type": firstItem["Form Type"] || "",
                    "Form ID": firstItem["Form ID"] || "",
                    "Full Name": firstItem["Full Name"] || "",
                    "Editor ID": firstItem["Editor ID"] || "",
                });
            }
        } catch (error) {
            console.error("❌ Error loading data.json:", error);
        }
    };
    

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className={styles.itemform}>
                    <div className={styles.itemform_row}>
                        <div>
                            <label htmlFor='formType'>Form Type</label>
                            <input id='formType' type='text' name='Form Type' onChange={handleChange} value={values["Form Type"]} />
                        </div>
                    </div>
                    <div className={styles.itemform_row}>
                        <div>
                            <label htmlFor='formId'>Form ID</label>
                            <input id='formId' type='text' name='Form ID' onChange={handleChange} value={values["Form ID"]} />
                        </div>
                    </div>
                    <div className={styles.itemform_row}>
                        <div>
                            <label htmlFor='fullName'>Full Name</label>
                            <input id='fullName' type='text' name='Full Name' onChange={handleChange} value={values["Full Name"]} />
                        </div>
                    </div>
                    <div className={styles.itemform_row}>
                        <div>
                            <label htmlFor='editorId'>Editor ID</label>
                            <input id='editorId' type='text' name='Editor ID' onChange={handleChange} value={values["Editor ID"]} />
                        </div>
                    </div>
                </div>

                <div className={styles.itemform_row}>
                    <div>
                        <Button onClick={handleCancel}>CANCEL</Button>
                    </div>
                    <div>
                        <Button onClick={loadData} type='button'>
                            LOAD DATA
                        </Button>
                    </div>
                    <div>
                        <Button primary disabled={!values["Form Type"] || !values["Form ID"] || !values["Full Name"] || !values["Editor ID"]} type='submit'>
                            {props.formData ? "SAVE" : "ADD"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ItemForm;