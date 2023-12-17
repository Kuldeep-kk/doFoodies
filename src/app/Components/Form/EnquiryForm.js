import React, {useContext, useState} from 'react';
import {AiFillStar} from "react-icons/ai";
import UserContext from "@/context/userContext";
import PageWrapper from "@/app/PageWrapper";
import * as Yup from "yup";
import {Formik} from "formik";
import {addEnq, addFeed} from "@/services/feedbackServices";
import Swal from "sweetalert2";

const EnquiryForm = () => {

    const enquirySchema = Yup.object().shape({
        mobileNo: Yup.number()
            .typeError('Phone number must be a number')
            .integer('Phone number must be an integer')
            .positive('Phone number must be positive')
            .test('is-valid-phone', 'Invalid phone number', (value) => {
                return value.toString().length === 10;
            })
            .required('Phone number is required'),
        msg: Yup.string()
            .required('Feedback is required')
            .min(10, 'Feedback must be at least 10 characters')
            .max(500, 'Feedback cannot exceed 500 characters'),

    })



    const context=useContext(UserContext);
    const [rating,setRating]=useState(null);
    const [hover,setHover]=useState(null);

    const fullName = context.user?.name;
    const namesArray = fullName.split(' ');

    const firstName = namesArray[0];
    const lastName = namesArray.slice(1).join(' ');

    const handleSubmit=async (mobileNo,msg)=>{

        const data={
            name:context.user?.name,
            email:context.user?.email,
            mobile:mobileNo,
            msg:msg,
            userId:context.user?._id,
        }

        const result=await addEnq(data);
        console.log(data);

        await Swal.fire({
            title: "Response Submitted!",
            text: "Your feedback has been submitted.",
            icon: "success"
        });



    }
    return (
<PageWrapper>
        <div>
            <Formik
                initialValues={{
                    mobileNo:context.user?.mobile,
                    msg:'',
                    rating:null

                }}
                validationSchema={enquirySchema}
                onSubmit={values => {
                    handleSubmit(values.mobileNo,values.msg);

                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      isValid,
                      handleChange,
                      handleSubmit,
                      handleReset,

                  }) => (
            <div className={`w-[80%] m-auto`}>
                <div className={`flex flex-row gap-4 mt-8`}>
                    <input
                        className=" shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="inputField"
                        type="text"
                        placeholder="Enter Your First Name"
                        value={firstName}
                        disabled={true}
                    />
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="inputField"
                        type="text"
                        placeholder="Enter Your Last Name (Optional)"
                        value={lastName}
                        disabled={true}

                    />

                </div>
                <div className={`flex flex-row gap-4`}>
                    <input
                        className="mt-4 shadow appearance-none border rounded w-4/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="inputField"
                        type="text"
                        placeholder="Enter Your Email"
                        value={context.user?.email}
                        disabled={true}
                    />


                    <div className={`w-2/6  mt-4 relative `}>
                        <input
                            className="shadow py-2 px-3 w-full appearance-none border rounded  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="inputField"
                            type="tel"
                            name="mobileNo"
                            placeholder="Enter Your Mobile No."
                            value={values.mobileNo}
                            onChange={handleChange}

                        />
                        {touched.mobileNo && errors.mobileNo && (
                            <p className={` absolute  text-xs text-red-500 `}>
                                *{errors.mobileNo}
                            </p>
                        )}
                    </div>
                </div>

                <textarea rows={5}
                          className="mt-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="inputField"
                          placeholder="Write Your Enquiry !!!"
                          name="msg"
                          value={values.msg}
                          onChange={handleChange}
                />
                {touched.msg && errors.msg && (
                    <p className={` absolute  text-xs text-red-500`}>
                        *{errors.msg}
                    </p>
                )}


                <input type="submit" onClick={handleSubmit} value={"Send"} className={`mt-14 md:mt-9 bg-green-400 text-white h-10 w-16 font-semibold rounded shadow-xl hover:scale-110 active:scale-90`}/>


            </div>
                )}
            </Formik>
            
        </div>
</PageWrapper>
    );
};

export default EnquiryForm;