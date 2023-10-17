import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import QUIRKY from '../../../images/QUIRKY 3.png'

const Signup = () => {
  const [formData, setFormData] = useState({
    account_name: '',
    account_phone: '',
    account_password: '',
  });


  const [countryCodes, setCountryCodes] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerificationPopupOpen, setVerificationPopupOpen] = useState(false);

  const [registrationStatus, setRegistrationStatus] = useState('');


  useEffect(()=>{
    fetch('https://corp.glbpowerplant.com/api/countries')
    .then((response) => response.json())
    .then((data) => {
     console.log(data.data);
     setCountryCodes(data.data);
      
      
    })
    .catch((error) => {
      console.error('Error fetching country codes:', error);
    });

  },[])



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  console.log(formData);
  const handleCountryCodeChange = (e) => {
    setSelectedCountryCode(e.target.value);
  };




  const handleVerificationSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the verification code to your verification API
      const authToken = '1zzVsSMcU13ieDQLRy3g2A7kMMSB9Pgk6dEIcL4HhSpCF31hSVawCM7DBUS37bhR';

      const response = await fetch('https://corp.glbpowerplant.com/api/verifyOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          phone_number: `+${selectedCountryCode}${formData.account_phone}`,
          verification_code: verificationCode || "1111",
        }),
      });

      if (response.ok) {
        setRegistrationStatus('Phone number verified');

        // Close the verification modal and proceed with registration
        setVerificationPopupOpen(false);
      } else {
        const errorData = await response.json();
        console.error('Verification failed:', errorData);
        // Handle verification failure, e.g., display an error message to the user.
        // setVerificationStatus('Phone number verification failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };





  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const completePhoneNumber = `+${selectedCountryCode}${formData.account_phone}`;

      const response = await fetch('https://corp.glbpowerplant.com/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          account_phone: completePhoneNumber, 
        }),
      });
      console.log(response);

      if (response.ok) {
        const responseData = await response.json();
        console.log('Registration successful:', responseData);
        // window.location.href = '/';
      } else {
        const errorData = await response.json();
        console.error('Registration failed:', errorData);
        // Handle registration failure, e.g., display an error message to the user.
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{backgroundColor:'#FBBD0A'}} className=" min-h-screen flex items-center justify-center">
    <div style={{ width: '516px' ,height:"667px",borderRadius:'20.11px'}} className="bg-gray-100 p-8 rounded-lg shadow-md">
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%',alignItems:'center', height: '180px' }}>
  <img style={{ width: '200px', height: '200px' }} src={QUIRKY} alt="" />
</div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          {/* <label htmlFor="account_name" className="block text-gray-700 text-sm font-medium mb-2">
            Name
          </label> */}
          <input
            type="text"
            id="account_name"
            name="account_name"
            placeholder='Name'
            value={formData.account_name}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          {/* <label htmlFor="account_phone" className="block text-gray-700 text-sm font-medium mb-2">
            Mobile Number
          </label> */}
          <div className="flex">
            <select
              name="country_code"
              value={selectedCountryCode}
             
              onChange={handleCountryCodeChange}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            >
              {countryCodes.map((code) => (
                <option key={code.dial_code} value={code.dial_code}>
                  {code.dial_code}
                </option>
              ))}
            </select>
            <input
              type="text"
              id="account_phone"
              name="account_phone"
              placeholder='Phone Number'
              value={formData.account_phone}
              onChange={handleChange}
              className="px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        </div>

     

     


        <div className="mb-4">
          {/* <label htmlFor="account_password" className="block text-gray-700 text-sm font-medium mb-2">
            Password
          </label> */}
          <input
            type="password"
            id="account_password"
            name="account_password"
            placeholder='password'
            value={formData.account_password}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            style={{backgroundColor:'#FBBD0A'}}
            onClick={() => setVerificationPopupOpen(true)}
            className="text-black px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Sign Up
          </button>
        </div>

        {/* ----- */}

        {/* <div className="mt-6">
            <button
              type="button"
              onClick={() => setVerificationModalOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Verify Phone Number
            </button>
          </div> */}
          <div className='mt-5'>
            <Link className='text-black' to='/login'>Already signed Up! please <span className='text-blue-400 text-bold	'>Login</span></Link>
          </div>
      </form>

{/* --------------------- */}
{isVerificationPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Verify Phone Number</h2>
            <form onSubmit={handleVerificationSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Enter verification code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <p>{registrationStatus}</p>
              </div>
              <div className="mt-2">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                >
                  Verify
                </button>
              </div>
            </form>
            <button
              onClick={() => setVerificationPopupOpen(false)}
              className="mt-2 text-blue-500 hover:text-blue-700 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}


{/* =-------------------------- */}

    </div>
  </div>
  );
};

export default Signup;
