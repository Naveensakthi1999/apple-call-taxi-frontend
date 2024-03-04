import '../../assets/scss/mystyle.css';
import * as React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import { IconArrowNarrowRight } from '@tabler/icons-react';
import { Button, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../utils/config';
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

// ==============================|| ManagerOwner Function ||============================== //

function EditLocation() {
    const { id } = useParams()
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: "",
        edit_by:""
    });
    const [errors, setErrors] = useState({});
    axios.defaults.withCredentials = true;
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const result = await axios.get(`${API_BASE_URL}/location/edit_location/${id}`);
            const loactionData = result.data.Result[0];
            setValues((prevValues) => ({
              ...prevValues,
              name: loactionData.name,
            }));
            const verifyResult = await axios.get(`${API_BASE_URL}/verify`);
            if (verifyResult.data.Status) {
              setValues((prevValues) => ({
                ...prevValues,
                edit_by: verifyResult.data.id,
              }));
            }
          } catch (error) {
            console.error(error);
          }
        };
        fetchData();
      }, [id]);

    // Handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm(values);
        if (Object.keys(formErrors).length > 0) {
          setErrors(formErrors);
          return;
        }
            axios.put(`${API_BASE_URL}/location/update_location/`+id, { values })
                .then(result => {
                    if (result.data.Status) {
                        navigate('/master/Location')
                    } else {
                        withReactContent(Swal)
                        .fire({
                          title: result.data.Error
                        });
                    }
                })
                .catch(err => console.log(err))
    }
    // handle reset function
    const handleReset = (e) => {
        e.preventDefault();
        window.location.reload();
    }

    const validateForm = (values) => {
        let errors = {};
        if (!values.name) {
          errors.name = true;
        }
        return errors;
      };
      
    return (
        <MainCard
            title="Edit Location"
            secondary={
                <Link to="/master/Location">
                    <Button variant="contained" color="secondary" endIcon={<IconArrowNarrowRight size={'20px'} />}>
                    Location List
                    </Button>
                </Link>
            }
        >

            {/* INPUT FILED */}
            <form onSubmit={handleSubmit}>
                <div>
                    <div className="row mt-3 mb-3">
                        <div className="col-6 col-sm-12 col-lg-6 d-flex justify-content-end">
                            <TextField id="outlined-basic" label="Location" variant="outlined" className="w-75"
                                onChange={(e) => { setValues({ ...values, name: e.target.value }) }} value={values.name} 
                                error={errors.name}
                                />
                        </div>
                    </div>

                    {/* SUBMIT CANCEL */}
                    <div className="d-flex my-5 justify-content-center">
                        <button type="submit" className="btn mx-1" style={{ backgroundColor: '#5E35B1', color: 'white' }}>
                            Submit
                        </button>
                        <button type="button" className="btn btn-secondary mx-1" onClick={handleReset}>
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </MainCard>
    );
}

export default EditLocation;
