import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMediaQuery } from 'react-responsive';
import "./Croprecommend.css"

function CropRecommendForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [result, setResult] = useState(""); // State to store the result
  const [isResultVisible, setIsResultVisible] = useState(false); // State to manage visibility
  const isMobile = useMediaQuery({ maxWidth: 920 });
  const onReset = () => {
    setResult("");
    setIsResultVisible(false);
  };
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('country', data.country);
    formData.append('state', data.state);
    formData.append('district', data.district);
    formData.append('zipcode', parseInt(data.zipcode));
    formData.append('phLevel', parseFloat(data.phLevel));
    formData.append('potassiumLevel', parseFloat(data.potassiumLevel));
    formData.append('nitrogenLevel', parseFloat(data.nitrogenLevel));
    formData.append('hydrogenLevel', parseFloat(data.hydrogenLevel));


    // Send FormData to http://localhost:5000/recommend
    fetch('https://us-central1-diseasedet.cloudfunctions.net/recommend_crop', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Recommendation response:', data);
        setResult(data.details); // Store the result in state
        setIsResultVisible(true); // Show the result box
      })
      .catch(error => console.error('Error sending recommendation:', error));
  };

return (
  <div className="" >
  <div className="min-h-screen flex items-center justify-center" >
    {/* Form Section */}
    {!isResultVisible && (
      <div className="container mx-auto"> {/* Remove max-w-screen-lg for full width on smaller screens */}
        <div className="flex mainbox  flex-col items-center justify-center py-4" style={{backgroundColor:"white"}}>
          <h2 className="font-semibold text-xl  text-gray-900">Crop Recommendation Form</h2>
          <p className="text-gray-700 mb-6 w-full">Please fill out all the fields regarding the location and soil data.</p>
        </div>
        <div className="bg-white rounded shadow-lg p-4 px-4 md:px-6"> {/* Adjust padding for smaller screens */}
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2"> {/* Use 2 columns on medium and up */}
            {/* Location Details */}
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="font-medium text-lg">Location Details</h3>
              <p className="mb-4">Please enter your location details</p>
              <p className="mb-4">**Please ensure that you are providing accurate zipcode. If you do not know your Zipcode you can check it at<a className="weblink" href="https://worldpostalcode.com/" target="_blank">this link</a> **</p>
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2"> {/* Use 2 columns on medium and up */}
                {/* Location Inputs */}
                  <div className="md:col-span-5">
                    <label htmlFor="country">Country</label>
                    <input type="text" name="country" id="country" {...register('country', { required: true })} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                    {errors.country && <p className="text-red-600">Country is required.</p>}
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="state">State / Province</label>
                    <input type="text" name="state" id="state" {...register('state', { required: true })} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                    {errors.state && <p className="text-red-600">State is required.</p>}
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="district">District</label>
                    <input type="text" name="district" id="district" {...register('district', { required: true })} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                    {errors.district && <p className="text-red-600">District is required.</p>}
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="zipcode">Zipcode</label>
                    <input type="text" name="zipcode" id="zipcode" {...register('zipcode', { required: true, pattern: /^[1-9]{1}[0-9]{5}$/ })} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                    {errors.zipcode && <p className="text-red-600">Zipcode is required and must be a valid format.</p>}
                  </div>
              </div>
            </div>

            {/* Soil Parameters Heading */}
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="font-medium text-lg">Soil Parameters</h3>
              <p className="mb-4">Please fill in this information with the soil parameters from your soil health card or any recent soil health checkup for a personalized crop recommendation.</p>
              <p className="mb-4">**If you are not a farmer and do not have this information you can get simple soil checkup kits from our marketplace**</p>
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-2"> {/* Use 2 columns on medium and up */}
                {/* Soil Inputs */}
                <div className="md:col-span-5">
                    <label htmlFor="phLevel">pH Level (0-14)</label>
                    <input type="number" name="phLevel" id="phLevel" step="0.01" {...register('phLevel', { required: true, min: 0, max: 14 })} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                    {errors.phLevel && <p className="text-red-600">pH level is required and must be between 0 and 14.</p>}
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="potassiumLevel">Potassium Level</label>
                    <input type="number" step="0.01" name="potassiumLevel" id="potassiumLevel" {...register('potassiumLevel', { required: true })} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                    {errors.potassiumLevel && <p className="text-red-600">Potassium level is required.</p>}
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="nitrogenLevel">Nitrogen Level</label>
                    <input type="number" name="nitrogenLevel" id="nitrogenLevel" step="0.01" {...register('nitrogenLevel', { required: true })} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                    {errors.nitrogenLevel && <p className="text-red-600">Nitrogen level is required.</p>}
                  </div>

                  <div className="md:col-span-5">
                    <label htmlFor="hydrogenLevel">Hydrogen Level</label>
                    <input type="number" name="hydrogenLevel" id="hydrogenLevel" step="0.01" {...register('hydrogenLevel', { required: true })} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                    {errors.hydrogenLevel && <p className="text-red-600">Hydrogen level is required.</p>}
                  </div>
              </div>	
            </div>
            <div style={{width:"100%", }} > {/* className="flex justify-end gap-4 py-4" */}
              <input type="reset" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" />
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-5">Submit</button>
            </div>            
            </form>    
            </div>        
          </div>
            
      
            )}
      {/* Output Section */}
      {isResultVisible && (
        <div className='result-container items-center justify-center h-screen'>
          <div className="result-box rounded shadow-md px-6 md:px-10" style={{backgroundColor:"white"}}>
            <h3 className="font-semibold text-xl text-gray-600">Recommendation Result</h3>
            <div className='flex flex-col md:flex-row items-center justify-between'>
              <div className='flex flex-col items-center md:items-start'>
                {!isMobile && <img className='h-5 rounded-full md:h-10 md:rounded-xl' src="/Avatar.jpeg" alt="Avatar" />}
                <div className='bg-white shadow-2xl rounded-3xl p-4'>
                  <p className="text-left whitespace-pre-wrap text-sm">{result}</p>
                  <p className='text-lg mt-3'>You can buy these at our marketplace: <a style={{color:"blue" }} href="/market">Market</a></p>
                </div>
              </div>
              <br/>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 mb-4 md:mt-0 md:ml-4 " onClick={onReset}>Retry</button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}


export default CropRecommendForm;	  