import { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Grid
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { GitHub, LinkedIn, Edit } from "@mui/icons-material";
import { profileData as defaultProfileData } from "../data/profileData.js";

export default function ProfilePage( ) {

  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(defaultProfileData);
  const [tab, setTab] = useState(0);

  const handleTabChange = (_, newValue) => setTab(newValue);

  const iconMap = {
    github: <GitHub fontSize="medium" />,
    linkedin: <LinkedIn fontSize="medium" />
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (platform, value) => {
    setProfile((prev) => ({
      ...prev,
      socials: { ...prev.socials, [platform]: value }
    }));
  };

  


  const handleExperienceChange = (index, field, value) => {
    const updatedExp = [...profile.experience];
    updatedExp[index][field] = value;
    setProfile((prev) => ({ ...prev, experience: updatedExp }));
  };

  const addExperience = () => {
    setProfile((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        { title: "", company: "", period: "", description: "" }
      ]
    }));
  };

  const removeExperience = (index) => {
    setProfile((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const addSkill = () => {
    setProfile((prev) => ({ ...prev, skills: [...prev.skills, ""] }));
  };

  const removeSkill = (index) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    onClose(); 
    // 
  };


  return (
    <div className="min-h-screen flex items-center justify-center p-6 profile">
      <div className="w-full max-w-3xl bg-opacity-20 p-6 rounded-2xl shadow-lg backdrop-blur-md bg-gray-400">
        <div className="flex flex-col items-center text-center justify-center relative">
          <IconButton
            onClick={handleOpen}
            className="absolute gap-1 "
            sx={{
              backgroundColor: "#22c55e", 
              color: "blue",
              borderRadius: "12px",
            }}
          >
            Edit Profile <Edit />
          </IconButton>

          <img
            src="/profile.jpg"
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mb-4 shadow-md"
          />
          <h1 className="text-3xl font-bold">{profile.name}</h1>
          <p className="text-lg mt-2">{profile.headline}</p>
          <p className="text-sm text-gray-400 mt-1">{profile.location}</p>
          <p className="mt-6 max-w-xl">{profile.about}</p>

          <a
            href={profile.resumeLink}
            download
            className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-black transition"
          >
            Download Resume
          </a>

          <div className="flex space-x-6 mt-6">
            {Object.entries(profile.socials).map(([platform, link]) => (
              <a
                key={platform}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition"
              >
                {iconMap[platform]}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Experience</h2>
          <div className="space-y-6">
            {profile.experience.map((exp, index) => (
              <div key={index}>
                <h3 className="text-xl font-bold">
                  {exp.title} @ {exp.company}
                </h3>
                <p className="text-sm text-gray-400">{exp.period}</p>
                <p className="mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Education</h2>
          <p className="font-bold">{profile.education.degree}</p>
          <p className="text-sm">
            {profile.education.university} ({profile.education.year})
          </p>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {profile.skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full text-sm shadow"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Editing */}
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
            maxWidth: "90vw",       
            p: 2                    
          }
        }}
      >
        <Typography variant="h6" mb={2}>
          Edit Profile
        </Typography>

        <Tabs value={tab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto" allowScrollButtonsMobile>
          <Tab label="Profile" />
          <Tab label="Experience" />
          <Tab label="Skills" />
          <Tab label="Socials" />
          <Tab label="Achivements" />
        </Tabs>

        {/* Profile Tab */}
        {tab === 0 && (
          <Box mt={2}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={profile.name}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Headline"
              name="headline"
              value={profile.headline}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={profile.location}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="About"
              name="about"
              value={profile.about}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={3}
            />
          </Box>
        )}

        {/* Experience Tab */}
        {tab === 1 && (
          <Box mt={2}>
            {profile.experience.map((exp, index) => (
              <Box key={index} mb={3} sx={{ borderBottom: "1px solid #eee", pb: 2 }}>
                <Grid container spacing={1}>
                  <Grid item xs={11}>
                    <TextField
                      label="Title"
                      fullWidth
                      value={exp.title}
                      onChange={(e) =>
                        handleExperienceChange(index, "title", e.target.value)
                      }
                      margin="dense"
                    />
                    <TextField
                      label="Company"
                      fullWidth
                      value={exp.company}
                      onChange={(e) =>
                        handleExperienceChange(index, "company", e.target.value)
                      }
                      margin="dense"
                    />
                    <TextField
                      label="Period"
                      fullWidth
                      value={exp.period}
                      onChange={(e) =>
                        handleExperienceChange(index, "period", e.target.value)
                      }
                      margin="dense"
                    />
                    <TextField
                      label="Description"
                      fullWidth
                      multiline
                      rows={2}
                      value={exp.description}
                      onChange={(e) =>
                        handleExperienceChange(index, "description", e.target.value)
                      }
                      margin="dense"
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton onClick={() => removeExperience(index)}>
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              </Box>
            ))}
            <Button startIcon={<Add />} onClick={addExperience}>
              Add Experience
            </Button>
          </Box>
        )}

        {/* Skills Tab */}
        {tab === 2 && (
          <Box mt={2}>
            {profile.skills.map((skill, index) => (
              <Grid container spacing={1} key={index} alignItems="center" mb={1}>
                <Grid item xs={11}>
                  <TextField
                    fullWidth
                    value={skill}
                    onChange={(e) => {
                      const updated = [...profile.skills];
                      updated[index] = e.target.value;
                      setProfile((prev) => ({ ...prev, skills: updated }));
                    }}
                  />
                </Grid>
                <Grid item xs={1}>
                  <IconButton onClick={() => removeSkill(index)}>
                    <Delete />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            <Button startIcon={<Add />} onClick={addSkill}>
              Add Skill
            </Button>
          </Box>
        )}

        {/* Socials Tab */}
        {tab === 3 && (
          <Box mt={2}>
            <TextField
              fullWidth
              label="GitHub"
              value={profile.socials.github}
              onChange={(e) => handleSocialChange("github", e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="LinkedIn"
              value={profile.socials.linkedin}
              onChange={(e) => handleSocialChange("linkedin", e.target.value)}
              margin="normal"
            />
          </Box>
        )}

        {/* Save/Cancel */}
        <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>

    </div>
  );
}
