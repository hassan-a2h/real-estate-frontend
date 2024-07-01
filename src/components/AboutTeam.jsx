import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import team1 from '../assets/img/team-1.jpg';
import team2 from '../assets/img/team-2.jpg';
import team3 from '../assets/img/team-3.jpg';
import team4 from '../assets/img/team-4.jpg';

const AboutTeam = () => {
    const [ agents, setAgents ] = useState({});
    const [ loading, setLoading ] = useState(true);
    const [ agentsErrors, setAgentsErrors ] = useState({});

    useEffect(() => {
      async function fetchAgents() {
        try {
            const agentsData = await axios.get('/api/users/agents');
            if (agentsData.data.length > 0) {
                setAgents(agentsData.data);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            setAgentsErrors(error);
            console.error('Error fetching agents');
            toast.error('Error fetching Agents.');
        }
        
      }
      
      fetchAgents();
    }, []);

    //  Helper functions
    function getImage(index) {
        const images = [ team1, team2, team3, team4 ];
        return images[index % 4 | 0];
    }

  return (        <div className="container-xxl py-5">
    { loading && <div>Loading Agents...</div>}
  { !loading && <div className="container">
      <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{"maxWidth": "600px"}}>
          <h1 className="mb-3">Property Agents</h1>
          <p>Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed rebum vero dolor duo.</p>
      </div>
      <div className="row g-4">
          { agents.map((agent, index) => {
            const social = agent.socialMedia[0];
            return (
            
              <div key={agent._id} className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="team-item rounded overflow-hidden">
                  <div className="position-relative">
                      <img className="img-fluid" src={getImage(index)} alt="" />
                      <div className="position-absolute start-50 top-100 translate-middle d-flex align-items-center">
                          <a target='_blank' className="btn btn-square mx-1" href={social?.facebookUrl} rel="noreferrer"><i className="fab fa-facebook-f"></i></a>
                          <a target='_blank' className="btn btn-square mx-1" href={social?.twitterUrl} rel="noreferrer"><i className="fab fa-twitter"></i></a>
                          <a target='_blank' className="btn btn-square mx-1" href={social?.instagramUrl} rel="noreferrer"><i className="fab fa-instagram"></i></a>
                      </div>
                  </div>
                  <div className="text-center p-4 mt-3">
                      <h5 className="fw-bold mb-0">{agent.name}</h5>
                      <small>Dealer</small>
                  </div>
              </div>
          </div>
          )})}
      </div>
  </div> }
</div>)
};

export default AboutTeam;