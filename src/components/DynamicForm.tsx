import React, { useState , useEffect} from 'react';
import { TextField, FormControl, RadioGroup, FormControlLabel, Radio, Select, MenuItem, Button, Card, CardContent, Typography , InputLabel, CardActions} from '@mui/material';

interface FormField {
  id: number;
  name: string;
  fieldType: string; // Ensure these match your fieldData
  minLength?: number;
  maxLength?: number;
  defaultValue: string;
  required: boolean;
  listOfValues?: string[]; // Only for LIST and RADIO types
}

interface FormState {
  [key: string]: string;
}

const DynamicForm: React.FC<{ fields: FormField[] }> = ({ fields }) => {
  const initialState: FormState = fields.reduce((acc: FormState, field) => {
    acc[field.name] = field.defaultValue;
    return acc;
  }, {} as FormState);
  const [formState, setFormState] = useState<FormState>(initialState);
  const [show , setShow] = useState<boolean>(false)
  useEffect(() => {
    if (show) {
      console.log('Form Submitted', formState, show);
      // Any other actions you want to perform after show is set to true
    }
  }, [show]);

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await setShow(true)
    console.log('Form Submitted', formState , show);
    // Add your submit logic here (e.g., API call)
  };

  const renderInput = (field: FormField) => {
    switch (field.fieldType) {
      case 'TEXT':
        return (
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            id={field.fieldType}
            name={field.name}
            label={field.name}
            value={formState[field.name]}
            onChange={handleChange}
            required={field.required}
          />
        );
      case 'LIST':
        return (
          <FormControl fullWidth margin="normal">
            <label id={`${field.name}-label`}>{field.name}</label>
            <Select
              labelId={`${field.name}-label`}
              value={formState[field.name]}
              onChange={handleChange}
              id={field.fieldType}
              label={field.name}
              name={field.name}
              required={field.required}
            >
              {field.listOfValues?.map(value => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case 'RADIO':
        return (
          <FormControl component="fieldset" margin="normal">
            <RadioGroup name={field.name} id={field.fieldType} value={formState[field.name]} onChange={handleChange}>
              {field.listOfValues?.map(value => (
                <FormControlLabel key={value} value={value} control={<Radio />} label={value} />
              ))}
            </RadioGroup>
          </FormControl>
        );
      default:
        return null;
    }
  };

  return (
    <div>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Dynamic Signup Form
          </Typography>
        
            {fields.map(field => renderInput(field))}
            <Button type="submit" onClick={handleSubmit} variant="contained" color="primary" style={{ marginTop: '20px' }}>
              Submit
            </Button>
       
        </CardContent>
        <CardActions>
        <div>{show ? JSON.stringify(formState) : "No data yet"}</div>
        </CardActions>
      </Card>
      <br/>
    </div>
    </div>
  );
};

export default DynamicForm;
