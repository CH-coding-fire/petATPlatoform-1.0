import React from 'react'
import { Form, Formik } from 'formik';

import { Button } from 'react-bootstrap';
import * as Yup from 'yup';
import FormikControl from './FormikControl';
import classes from './simpleFormTemplate.module.css';
import {
	animalClassesOptions,
	animalClassifier,
} from '../../animalClassification';
import '../../App.css';
import { QueryContext } from '../../Context/QueryContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function Search({ searchQueryHandler }) {
    const navigate = useNavigate();
    const { setQueryContext } = useContext(QueryContext);
    const initialValues = {
                animalClasses: '',
                animalGenera: '',
                animalSpecies: '',
            };
    const validationSchema = Yup.object({
                animalClasses: Yup.string().required('必填'),
            });

    const onSubmit = (query) => {
        console.log('onSubmitting');
        console.log(('FORM DATA: ', query));
        query.option = 'searchAnimalByType'
        setQueryContext(query);
        navigate('/');

    }
    const goLevel3classification = ['rodents'];
    const notGoSpeciesNameForm = ['others', 'plants', 'birds'];

                return (
                    <div className="d-flex justify-content-center ">
                        <div className="border border-2 p-3 d-flex justify-content-center flex-wrap shadow rounded ">
                            <div className={classes['App']}>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={onSubmit}
                                >
                                    {(formik) => {
                                        // console.log('FORMIK PROPS', formik);
                                        // console.log('values', formik.values);

                                        const { values } = formik;
                                        const resetLevel2OrAbove = () => {
                                            // console.log('hi');
                                            values.animalGenera = '';
                                            values.animalSpecies = '';
                                        };
                                        const resetLevel3 = () => {
                                            values.animalSpecies = '';
                                        };

                                        return (
                                            <Form>
                                                <div className="d-flex justify-content-center">
                                                    <h1>搜索</h1>
                                                </div>
                                                <FormikControl
                                                    control="select"
                                                    label="動物種類*"
                                                    name="animalClasses"
                                                    options={animalClassesOptions}
                                                    onBlur={resetLevel2OrAbove}
                                                />
                                                {values.animalClasses &&
                                                    !notGoSpeciesNameForm.includes(
                                                        //*e.g. the entered value is included in the array,
                                                        //*then return true, and!true = false, overall will be false and not be shown
                                                        //* so return true, !true, =false, so the list will not be showed

                                                        values.animalClasses
                                                    ) && (
                                                        <FormikControl
                                                            control="select"
                                                            label="動物種類 - 第2層"
                                                            name="animalGenera"
                                                            options={animalClassifier(values.animalClasses)}
                                                            onBlur={resetLevel3}
                                                        />
                                                    )}
                                                {values.animalGenera &&
                                                    goLevel3classification.includes(values.animalGenera) && (
                                                        <FormikControl
                                                            control="select"
                                                            label="動物種類 - 第3層"
                                                            name="animalSpecies"
                                                            options={animalClassifier(values.animalGenera)}
                                                        />
                                                    )}
                                                <div className="d-flex justify-content-center">
                                                    <Button type="submit">提交</Button>
                                                </div>
                                            </Form>
                                        );
                                    }}
                                </Formik>
                            </div>
                        </div>
                    </div>
                );
            }





export default Search