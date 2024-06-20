import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const SocialModal = ({ setIsModalOpen }) => {
  const user = useContext(AuthContext).user;
  const [ loading, setLoading ] = useState(false);
  const [ responseMsg, setResponseMsg ] = useState('Loading...');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    twitterUrl: '',
    facebookUrl: '',
    instagramUrl: ''
  });

  const [errors, setErrors] = useState({
    twitterUrl: '',
    facebookUrl: '',
    instagramUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    const twitterPattern = /^https:\/\/(www\.)?twitter\.com\/([a-zA-Z0-9_]{1,15})$/;
    const facebookPattern = /^https:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9\.]{5,}$/;
    const instagramPattern = /^https:\/\/(www\.)?instagram\.com\/([a-zA-Z0-9_\.]{1,30})$/;

    let valid = true;
    let errors = {};

    if (!twitterPattern.test(formData.twitterUrl)) {
      valid = false;
      errors.twitterUrl = 'Invalid Twitter URL';
    }

    if (!facebookPattern.test(formData.facebookUrl)) {
      valid = false;
      errors.facebookUrl = 'Invalid Facebook URL';
    }

    if (!instagramPattern.test(formData.instagramUrl)) {
      valid = false;
      errors.instagramUrl = 'Invalid Instagram URL';
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      // Form is valid, perform the submit action
      setLoading(true);
      const social = await axios.post('/api/socials', {...formData, userId: user.id});

      if (social.status === 200) {
        setResponseMsg('Socials added successfully');
      } else {
        setResponseMsg('Could not save socials. Please try again.');
      }

      setTimeout(() => {
        setLoading(false);
        setIsModalOpen(false);
      }, 1000);
    }
  };

  return (
    <div>
      { !loading && 
      <form onSubmit={handleSubmit} className='modal-form'> 
      <div>
        <label htmlFor="twitterUrl">Twitter URL</label>
        <input
          type="text"
          id="twitterUrl"
          name="twitterUrl"
          value={formData.twitterUrl}
          onChange={handleChange}
        />
        {errors.twitterUrl && <div className="error">{errors.twitterUrl}</div>}
      </div>
      <div>
        <label htmlFor="facebookUrl">Facebook URL</label>
        <input
          type="text"
          id="facebookUrl"
          name="facebookUrl"
          value={formData.facebookUrl}
          onChange={handleChange}
        />
        {errors.facebookUrl && <div className="error">{errors.facebookUrl}</div>}
      </div>
      <div>
        <label htmlFor="instagramUrl">Instagram URL</label>
        <input
          type="text"
          id="instagramUrl"
          name="instagramUrl"
          value={formData.instagramUrl}
          onChange={handleChange}
        />
        {errors.instagramUrl && <div className="error">{errors.instagramUrl}</div>}
      </div>
      <button type="submit">Submit</button>
      </form> 
      }

      { loading && 
      <div className='modal-form'>{ responseMsg }</div> 
      }
    </div>
  );
};

export default SocialModal;
