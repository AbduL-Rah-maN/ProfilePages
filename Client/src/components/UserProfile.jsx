import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom'; 
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Avatar
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import "@fortawesome/fontawesome-free/css/all.min.css";



export function Profile() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const [profile, setProfile] = useState({
    name: "",
    headline: "",
    location: "",
    email: "",
    phone: "",
    about: "",
    experience: [],
    education: [],
    skills: [],
    socials: {
      github: "",
      linkedin: "",
    },
    resume: "",
    appliedJobs: []
  });

  const { id } = useParams(); // This will get the ID from the URL
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State to hold any error message

  // Fetch profile when the component is mounted
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Using `id` from URL params instead of localStorage
        const res = await axios.get(`http://localhost:5000/api/users/${id}`);
        setProfile(res.data.data);
      } catch (error) {
        console.error("Fetch error:", error.message);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProfile();
    } else {
      setError("Invalid User ID");
      setLoading(false);
    }
  }, [id]); // Dependency on `id` means this will re-run if the `id` changes

  const handleTabChange = (_, newValue) => setTab(newValue);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (platform, value) => {
    setProfile((prev) => ({
      ...prev,
      socials: { ...prev.socials, [platform]: value },
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExp = [...profile.experience];
    updatedExp[index][field] = value;
    setProfile((prev) => ({ ...prev, experience: updatedExp }));
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEdu = [...profile.education];
    updatedEdu[index][field] = value;
    setProfile((prev) => ({ ...prev, education: updatedEdu }));
  };

  const handleJobChange = (index, field, value) => {
    const updatedJobs = [...profile.appliedJobs];
    updatedJobs[index][field] = value;
    setProfile((prev) => ({ ...prev, appliedJobs: updatedJobs }));
  };

  const addExperience = () => {
    setProfile((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        { title: "", company: "", period: "", description: "" },
      ],
    }));
  };

  const addEducation = () => {
    setProfile((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { degree: "", institution: "", period: "", grade: "" },
      ],
    }));
  };

  const addJob = () => {
    setProfile((prev) => ({
      ...prev,
      appliedJobs: [
        ...prev.appliedJobs,
        { title: "", company: "", status: "" },
      ],
    }));
  };

  const removeExperience = (index) => {
    setProfile((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const removeEducation = (index) => {
    setProfile((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const removeJob = (index) => {
    setProfile((prev) => ({
      ...prev,
      appliedJobs: prev.appliedJobs.filter((_, i) => i !== index),
    }));
  };

  const addSkill = () => {
    setProfile((prev) => ({ ...prev, skills: [...prev.skills, ""] }));
  };

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...profile.skills];
    updatedSkills[index] = value;
    setProfile((prev) => ({ ...prev, skills: updatedSkills }));
  };

  const removeSkill = (index) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const res = await axios.put(`http://localhost:5000/api/users/${userId}`, profile);
      if (res.status === 200) {
        console.log("Profile updated successfully");
        setOpen(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to save the profile. Please try again.");
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white text-gray-800 font-sans">
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700">{profile.name.split(' ')[0]} Profile</h1>
          <nav className="space-x-4 text-blue-600">
            <a href="#about" className="hover:underline">About</a>
            <a href="#experience" className="hover:underline">Experience</a>
            <a href="#education" className="hover:underline">Education</a>
            <a href="#skills" className="hover:underline">Skills</a>
            <a href="#jobs" className="hover:underline">Applied Jobs</a>
          </nav>
        </div>
      </header>

      
      <section className="max-w-6xl mx-auto mt-10 bg-white rounded-2xl shadow-lg p-8 flex justify-around md:flex-row items-center gap-6 animate-fade-in">
        <div className="relative inline-block"> 
               <Avatar
                sx={{ width: 150, height: 150, fontSize: 60 }}
                className="border-4 border-blue-100"
              >
                {profile.name.split(' ').map(n => n[0]).join('')}
              </Avatar>
          <IconButton
            onClick={handleOpen}
            size="small"
              sx={{
                position: 'absolute',
                bottom: 6,
                right: 8,
                backgroundColor: 'black',
                color: 'white',
                '&:hover': {
                backgroundColor: '#1d4ed8',
                color: 'black'
              },
            }}
          >
            <Add fontSize="small" />
          </IconButton>
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-900">{profile.name}</h2>
          <p className="text-blue-700 text-lg mt-1">{profile.headline}</p>
          <div className="mt-2 flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2 text-gray-700">
              <i className="fas fa-envelope text-sm"></i>
              <span>{profile.email}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <i className="fas fa-phone text-sm"></i>
              <span>{profile.phone}</span>
            </div>
          </div>
          <div className="mt-2 space-x-4 text-xl text-blue-600">
            {profile.socials && profile.socials.linkedin && (
              <a href={profile.socials.linkedin} target="_blank" className="hover:text-blue-800">
                <i className="fab fa-linkedin"></i>
              </a>
            )}
            {profile.socials && profile.socials.github && (
              <a href={profile.socials.github} target="_blank" className="hover:text-black hover:scale-100 transition-transform duration-200">
                <i className="fab fa-github"></i>
              </a>
            )}
          </div>

        </div>
      </section>

      
      <section id="about" className="max-w-6xl mx-auto mt-6 p-6 bg-white rounded-xl shadow animate-fade-in">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-blue-800 mb-3">About Me</h3>
          <Button
            startIcon={<Edit fontSize="small" />}
            onClick={() => {
              handleOpen();
              setTab(0);
            }}
            size="small"
            sx={{
              color: "blue.600",
              '&:hover': { backgroundColor: "blue.50" }
            }}
          >
            Edit
          </Button>
        </div>
        <p className="text-gray-700 leading-relaxed">{profile.about}</p>
      </section>

      
      <section id="experience" className="max-w-6xl mx-auto mt-6 p-6 bg-white rounded-xl shadow animate-fade-in">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-blue-800 mb-4">Experience</h3>
          <Button
            startIcon={<Edit fontSize="small" />}
            onClick={() => {
              handleOpen();
              setTab(1);
            }}
            size="small"
            sx={{
              color: "blue.600",
              '&:hover': { backgroundColor: "blue.50" }
            }}
          >
            Edit
          </Button>
        </div>
        <div className="border-l-4 border-blue-500 pl-6 space-y-6">
          {profile.experience.map((exp, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold">{exp.title} @ {exp.company}</h4>
              <p className="text-sm text-gray-500">{exp.period}</p>
              <ul className="list-disc ml-5 text-gray-700 mt-1">
                {exp.description.split("\n").map((desc, idx) => (
                  <li key={idx}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      
      <section id="education" className="max-w-6xl mx-auto mt-6 p-6 bg-white rounded-xl shadow animate-fade-in">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-blue-800 mb-4">Education</h3>
          <Button
            startIcon={<Edit fontSize="small" />}
            onClick={() => {
              handleOpen();
              setTab(4); 
            }}
            size="small"
            sx={{
              color: "blue.600",
              '&:hover': { backgroundColor: "blue.50" }
            }}
          >
            Edit
          </Button>
        </div>
        <div className="border-l-4 border-blue-500 pl-6 space-y-6">
          {profile.education.map((edu, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold">{edu.degree}</h4>
              <p className="text-gray-700">{edu.institution}</p>
              <p className="text-sm text-gray-500">{edu.period}</p>
              <p className="text-gray-700">Grade: {edu.grade}</p>
            </div>
          ))}
        </div>
      </section>


      <section id="skills" className="max-w-6xl mx-auto mt-6 p-6 bg-white rounded-xl shadow animate-fade-in">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-blue-800 mb-4">Skills</h3>
          <Button
            startIcon={<Edit fontSize="small" />}
            onClick={() => {
              handleOpen();
              setTab(2);
            }}
            size="small"
            sx={{
              color: "blue.600",
              '&:hover': { backgroundColor: "blue.50" }
            }}
          >
            Edit
          </Button>
        </div>
        <div className="flex flex-wrap gap-3">
          {profile.skills.map((skill, index) => (
            <span key={index} className="bg-blue-200 text-blue-900 px-4 py-1 rounded-full text-sm font-medium">
              {skill}
            </span>
          ))}
        </div>
      </section>

      
      <section id="resume" className="max-w-6xl mx-auto mt-6 p-6 bg-white rounded-xl shadow animate-fade-in">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-blue-800 mb-4">Resume</h3>
          <Button
            startIcon={<Edit fontSize="small" />}
            onClick={() => {
              handleOpen();
              setTab(5); 
            }}
            size="small"
            sx={{
              color: "blue.600",
              '&:hover': { backgroundColor: "blue.50" }
            }}
          >
            Edit
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <i className="fas fa-file-pdf text-red-500 text-2xl"></i>
          <a href={profile.resume} target="_blank" className="text-blue-600 hover:underline">
            Download Resume
          </a>
        </div>
      </section>

      
      <section id="jobs" className="max-w-6xl mx-auto mt-6 mb-10 p-6 bg-white rounded-xl shadow animate-fade-in">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-blue-800 mb-4">Applied Jobs</h3>
          <Button
            startIcon={<Edit fontSize="small" />}
            onClick={() => {
              handleOpen();
              setTab(6);
            }}
            size="small"
            sx={{
              color: "blue.600",
              '&:hover': { backgroundColor: "blue.50" }
            }}
          >
            Edit
          </Button>
        </div>
        <div className="space-y-4">
          {profile.appliedJobs.map((job, index) => (
            <div key={index} className="border-b pb-4">
              <h4 className="text-lg font-semibold">{job.title}</h4>
              <p className="text-gray-700">{job.company}</p>
              <p className="text-sm text-gray-500">Status: {job.status}</p>
            </div>
          ))}
        </div>
      </section>

      
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            maxWidth: 600,
            height: "80vh",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
            overflowX: "auto",
            "@media (max-width:500px)": {
              maxWidth: "80vw",
              p: 2,
            },
          }}
        >
          <Typography variant="h6" mb={2}>
            Edit Profile
          </Typography>

          <Tabs 
            value={tab} 
            onChange={handleTabChange} 
            variant="scrollable" 
            scrollButtons="auto" 
            allowScrollButtonsMobile
          >
            <Tab label="Profile" />
            <Tab label="Experience" />
            <Tab label="Skills" />
            <Tab label="Socials" />
            <Tab label="Education" />
            <Tab label="Resume" />
            <Tab label="Applied Jobs" />
          </Tabs>

          
          {tab === 0 && (
            <Box mt={2}>
              <TextField fullWidth label="Name" name="name" value={profile.name} onChange={handleChange} margin="normal" />
              <TextField fullWidth label="Headline" name="headline" value={profile.headline} onChange={handleChange} margin="normal" />
              <TextField fullWidth label="Location" name="location" value={profile.location} onChange={handleChange} margin="normal" />
              <TextField fullWidth label="Email" name="email" value={profile.email} onChange={handleChange} margin="normal" />
              <TextField fullWidth label="Phone" name="phone" value={profile.phone} onChange={handleChange} margin="normal" />
              <TextField fullWidth label="About" name="about" value={profile.about} onChange={handleChange} margin="normal" multiline rows={4} />
            </Box>
          )}

          
          {tab === 1 && (
            <Box mt={2}>
              {profile.experience.map((exp, index) => (
                <div key={index}>
                  <TextField fullWidth label="Title" value={exp.title} onChange={(e) => handleExperienceChange(index, "title", e.target.value)} margin="normal" />
                  <TextField fullWidth label="Company" value={exp.company} onChange={(e) => handleExperienceChange(index, "company", e.target.value)} margin="normal" />
                  <TextField fullWidth label="Period" value={exp.period} onChange={(e) => handleExperienceChange(index, "period", e.target.value)} margin="normal" />
                  <TextField fullWidth label="Description" value={exp.description} onChange={(e) => handleExperienceChange(index, "description", e.target.value)} margin="normal" multiline rows={3} />
                  <Button startIcon={<Delete />} onClick={() => removeExperience(index)} color="error">
                    Remove
                  </Button>
                </div>
              ))}
              <Button startIcon={<Add />} onClick={addExperience}>Add Experience</Button>
            </Box>
          )}

          
          {tab === 2 && (
            <Box mt={2}>
              {profile.skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-2">
                  <TextField
                    fullWidth
                    label="Skill"
                    value={skill}
                    onChange={(e) => handleSkillChange(index, e.target.value)}
                    margin="normal"
                  />
                  <IconButton onClick={() => removeSkill(index)} color="error">
                    <Delete />
                  </IconButton>
                </div>
              ))}
              <Button startIcon={<Add />} onClick={addSkill}>Add Skill</Button>
            </Box>
          )}

          
          {tab === 3 && (
            <Box mt={2}>
              <TextField fullWidth label="LinkedIn" value={profile.socials.linkedin} onChange={(e) => handleSocialChange("linkedin", e.target.value)} margin="normal" />
              <TextField fullWidth label="GitHub" value={profile.socials.github} onChange={(e) => handleSocialChange("github", e.target.value)} margin="normal" />
            </Box>
          )}

          
          {tab === 4 && (
            <Box mt={2}>
              {profile.education.map((edu, index) => (
                <div key={index}>
                  <TextField fullWidth label="Degree" value={edu.degree} onChange={(e) => handleEducationChange(index, "degree", e.target.value)} margin="normal" />
                  <TextField fullWidth label="Institution" value={edu.institution} onChange={(e) => handleEducationChange(index, "institution", e.target.value)} margin="normal" />
                  <TextField fullWidth label="Period" value={edu.period} onChange={(e) => handleEducationChange(index, "period", e.target.value)} margin="normal" />
                  <TextField fullWidth label="Grade" value={edu.grade} onChange={(e) => handleEducationChange(index, "grade", e.target.value)} margin="normal" />
                  <Button startIcon={<Delete />} onClick={() => removeEducation(index)} color="error">
                    Remove
                  </Button>
                </div>
              ))}
              <Button startIcon={<Add />} onClick={addEducation}>Add Education</Button>
            </Box>
          )}

          
          {tab === 5 && (
            <Box mt={2}>
              <TextField 
                fullWidth 
                label="Resume URL" 
                name="resume" 
                value={profile.resume} 
                onChange={handleChange} 
                margin="normal" 
              />
            </Box>
          )}

          
          {tab === 6 && (
            <Box mt={2}>
              {profile.appliedJobs.map((job, index) => (
                <div key={index}>
                  <TextField fullWidth label="Job Title" value={job.title} onChange={(e) => handleJobChange(index, "title", e.target.value)} margin="normal" />
                  <TextField fullWidth label="Company" value={job.company} onChange={(e) => handleJobChange(index, "company", e.target.value)} margin="normal" />
                  <TextField fullWidth label="Status" value={job.status} onChange={(e) => handleJobChange(index, "status", e.target.value)} margin="normal" />
                  <Button startIcon={<Delete />} onClick={() => removeJob(index)} color="error">
                    Remove
                  </Button>
                </div>
              ))}
              <Button startIcon={<Add />} onClick={addJob}>Add Job</Button>
            </Box>
          )}

          <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="outlined" onClick={handleClose}>Cancel</Button>
            <Button variant="contained" onClick={handleSave} sx={{ backgroundColor: "#2563eb" }}>Save Changes</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}