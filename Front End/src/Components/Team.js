import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

function Team(props){
    return(
        <div className="team">
		<h1>Meet Group-28</h1>
			<Container>
			<Row>
				<Col sm={6} lg={3}  >
					<div className="member">
						<div>
							<img src= {require("../Images/bhavesh.jpeg")} alt="avatar"/>
							<h3>Bhavesh Suneja</h3>
							<h4>IoT Developer</h4>
							<p>BTCSE-D<br/>180102203<br/>1000010693<br/></p>
							<div>
							<a href="https://github.com/EliteWarrior315/" target="_blank" rel="noopener noreferrer">
							<FontAwesomeIcon icon={['fab', 'github']} className="team-icon" size="2x" color="white"/>
							</a>
							<a href="https://www.linkedin.com/in/bhaveshsuneja/" target="_blank" rel="noopener noreferrer">
    						<FontAwesomeIcon icon={['fab', 'linkedin']} className="team-icon" size="2x" color="#0e76a8"/>
							</a>
							<a href="https://twitter.com/bhavesh_suneja/" target="_blank" rel="noopener noreferrer">
							<FontAwesomeIcon icon={['fab', 'twitter']}  className="team-icon" size="2x" color="#1da1f2"/>
							</a>
							</div>
						</div>
					</div>
				</Col>
				<Col sm={6} lg={3}  >
					<div className="member">
						<div>
							<img src= {require("../Images/kovid.jpeg")} alt="avatar"/>
							<h3>Kovid Sharma</h3>
							<h4>ML Engineer</h4>
							<p>BTCSE-D<br/>180102253<br/>1000011512<br/></p>
							<div>
							<a href="https://github.com/kovid112m/" target="_blank" rel="noopener noreferrer">
							<FontAwesomeIcon icon={['fab', 'github']} className="team-icon" size="2x" color="white"/>
							</a>
							<a href="https://www.linkedin.com/in/kovidsharma112/" target="_blank" rel="noopener noreferrer">
    						<FontAwesomeIcon icon={['fab', 'linkedin']} className="team-icon" size="2x" color="#0e76a8"/>
							</a>
							<a href="mailto:kovidsharma1862000@gmail.com" target="_blank" rel="noopener noreferrer">
    						<FontAwesomeIcon icon={faEnvelope}  className="team-icon" size="2x" color="#ffa700"/>
							</a>
							</div>
						</div>
					</div>
				</Col>
				<Col sm={6} lg={3}  >
					<div className="member">
						<div>
							<img src= {require("../Images/rajat.jpeg")} alt="avatar"/>
							<h3>Rajat Semwal</h3>
							<h4>Backend Developer</h4>
							<p>BTCSE-D<br/>180102233<br/>1000010732<br/></p>
							<div>
							<a href="https://github.com/rajatsemwal/"target="_blank" rel="noopener noreferrer">
							<FontAwesomeIcon icon={['fab', 'github']} className="team-icon" size="2x" color="white"/>
							</a>
							<a href="https://www.linkedin.com/in/rajatsemwal/"target="_blank" rel="noopener noreferrer">
    						<FontAwesomeIcon icon={['fab', 'linkedin']} className="team-icon" size="2x" color="#0e76a8"/>
							</a>
							<a href="https://instagram.com/skadoosh.03/" target="_blank" rel="noopener noreferrer">
							<FontAwesomeIcon icon={['fab', 'instagram']} className="team-icon" size="2x" color="#C13584"/>
							</a>
							</div>
						</div>
					</div>
				</Col>
				<Col sm={6} lg={3}  >
					<div className="member">
						<div>
							<img src= {require("../Images/shobhit.jpeg")} alt="avatar"/>
							<h3>Shobhit Jain</h3>
							<h4>Frontend Developer</h4>
							<p>BTCSE-D<br/>180102220<br/>1000010546<br/></p>
							<div>
							<a href="https://github.com/Shobhitjain123/" target="_blank" rel="noopener noreferrer">
							<FontAwesomeIcon icon={['fab', 'github']} className="team-icon" size="2x" color="white"/>
							</a>
							<a href="https://www.linkedin.com/in/shobhit-jain-530a42174//" target="_blank" rel="noopener noreferrer">
    						<FontAwesomeIcon icon={['fab', 'linkedin']} className="team-icon" size="2x" color="#0e76a8"/>
							</a>
							<a href="https://www.facebook.com/shobhit.jain.716/" target="_blank" rel="noopener noreferrer">
							<FontAwesomeIcon icon={['fab', 'facebook']} className="team-icon" size="2x" color="#4267B2"/>
							</a>
							</div>
						</div>
					</div>
				</Col>
			</Row>
			<Row>
				<Col>
					<h1>About intelliMausam</h1>
					<div className="project-about">
						
						<div>intelliMausam is an AIoT based weather station developed as a major project for the fulfilment of Bachelor of Technology Degree in Computer Science and Engineering. A weather station is described as an instrument or device, which provides us with information about the weather in our neighbouring environment.</div>

						<div>Integrating modern technologies of IoT and Artificial Intelligence allowed us to develop an affordable and portable weather station that, not only follows Industry 4.0 standards but also has more potential than a traditional Weather Station.</div>

						<div>intelliMausam studies various environmental parameters, generates a weather forecast and displays the current weather conditions and the forecast on this website. Instead of displaying, the data can be sent as telemetry to various platforms or devices, where connected actuators can perform various actions as per the user's requirements.</div>
					</div>
				</Col>
			</Row>
			</Container>
        </div>
    )
}

export default Team;