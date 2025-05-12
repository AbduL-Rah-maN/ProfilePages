import { useState, useEffect } from "react";
import employeeData from '../data/employeeData.json';
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Grid,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  Avatar,
  Divider,
  Menu,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Alert
} from "@mui/material";
import { 
  Edit, 
  Delete, 
  Add, 
  Email, 
  Phone, 
  Business, 
  DarkMode, 
  Notifications,
  Settings
} from "@mui/icons-material";

export function EmployeeProfile() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [employee, setEmployee] = useState({ createdJobs: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // gets ID from URL

  useEffect(() => {
  const controller = new AbortController();
  const signal = controller.signal;

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/employers/${id}`, { signal });
      if (!response || !response.data || !response.data.data) {
        setError('Employee not found');
        setLoading(false);
        return;
      }
      setEmployee(response.data.data);
    } catch (err) {
      setError('Failed to fetch employee data');
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
    }
  };

  fetchEmployee();

  return () => controller.abort();
}, [id]);

  const handleTabChange = (_, newValue) => setTab(newValue);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSettingsMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSettingsMenuClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee(prev => ({ ...prev, [name]: value }));
  };

  const handleSettingsChange = (setting, value) => {
    setEmployee(prev => ({
      ...prev,
      settings: { ...prev.settings, [setting]: value }
    }));
  };

  const handleJobChange = (index, field, value) => {
    const updatedJobs = [...employee.createdJobs];
    updatedJobs[index][field] = value;
    setEmployee(prev => ({ ...prev, createdJobs: updatedJobs }));
  };

  const addJob = () => {
    setEmployee(prev => ({
      ...prev,
      createdJobs: [
        ...(prev.createdJobs || []),
        { id: Date.now().toString(), title: "", status: "Draft" },
      ],
    }));
  };

  const removeJob = (index) => {
    setEmployee((prev) => ({
      ...prev,
      createdJobs: (prev.createdJobs || []).filter((_, i) => i !== index),
    }));
  };


  const handleSave = async () => {
  try {
    await axios.put(`http://localhost:5000/api/employers/${employee._id}`, employee);
    console.log("Updated employee:", employee);
    setOpen(false);
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};


  if (loading) return <CircularProgress sx={{ display: 'block', margin: '2rem auto' }} />;
  if (error) return <Alert severity="error">{error}</Alert>;



  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 font-sans">
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700">Employee Profile</h1>
          <div className="flex items-center gap-2">
            
            <Button
              variant="contained"
              startIcon={<Edit />}
              onClick={handleOpen}
              sx={{
                backgroundColor: "#2563eb",
                '&:hover': { backgroundColor: "#1d4ed8" }
              }}
            >
              Edit Profile
            </Button>
            <IconButton
              onClick={handleSettingsMenuOpen}
              sx={{
                color: "gray.700",
                border: '1px solid',
                borderColor: "gray.300",
                '&:hover': {
                  backgroundColor: "gray.50",
                  borderColor: "gray.400",
                }
              }}
            >
              <Settings />
          </IconButton>
          </div>
        </div>
      </header>

      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleSettingsMenuClose}
        PaperProps={{
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            minWidth: 220,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem sx={{ pointerEvents: 'none' }}>
          <ListItemText primary="Account Settings" secondary="Quick preferences" />
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Notifications fontSize="small" />
          </ListItemIcon>
          <FormControlLabel
            control={
            <Switch
              checked={employee?.settings?.receiveApplicationEmails || false}
              onChange={(e) => {
                handleSettingsChange("receiveApplicationEmails", e.target.checked);
              }}
              color="primary"
              size="small"
            />
            }
            label="Email Notifications"
            labelPlacement="start"
            sx={{ ml: 0 }}
          />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <DarkMode fontSize="small" />
          </ListItemIcon>
          <FormControlLabel
            control={
              <Switch
                checked={employee?.settings?.darkMode || false}
                onChange={(e) => {
                  handleSettingsChange("darkMode", e.target.checked);
                }}
                color="primary"
                size="small"
              />

            }
            label="Dark Mode"
            labelPlacement="start"
            sx={{ ml: 0 }}
          />
        </MenuItem>
      </Menu>

      
      <section className="max-w-6xl mx-auto mt-8 bg-white rounded-2xl shadow-lg p-8">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={3} className="flex justify-center">
            <div className="relative">
              <Avatar
                sx={{ width: 150, height: 150, fontSize: 60 }}
                className="border-4 border-blue-100"
              >
                {employee.name.split(' ').map(n => n[0]).join('')}
              </Avatar>
              <IconButton
                onClick={handleOpen}
                size="small"
                sx={{
                  position: 'absolute',
                  bottom: 8,
                  right: 8,
                  backgroundColor: '#2563eb',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#1d4ed8',
                  },
                }}
              >
                <Add fontSize="small" />
              </IconButton>
            </div>
          </Grid>
          
          <Grid item xs={12} md={9}>
            <Typography variant="h4" className="font-bold">
              {employee.name}
            </Typography>
            <Typography variant="subtitle1" className="text-blue-600">
              {employee.role.charAt(0).toUpperCase() + employee.role.slice(1)}
            </Typography>
            
            <Divider sx={{ my: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} className="flex items-center">
                <Email className="text-gray-500 mr-2" />
                <Typography>{employee.email}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} className="flex items-center">
                <Phone className="text-gray-500 mr-2" />
                <Typography>{employee.phone}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} className="flex items-center">
                <Business className="text-gray-500 mr-2" />
                <Typography>{employee.company}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </section>

      
      <section className="max-w-6xl mx-auto mt-6 mb-10 p-6 bg-white rounded-xl shadow">
        <Typography variant="h6" className="font-bold text-blue-800 mb-4">
          Created Jobs
        </Typography>
        
       {employee.createdJobs?.length === 0 ? (
        <Typography className="text-gray-500">No jobs created yet</Typography>
        ) : (
          <div className="space-y-4">
            {employee.createdJobs?.map((job, index) => (
              <div key={job.id} className="border-b pb-4 last:border-b-0">
                <div className="flex justify-between items-start">
                  <div>
                    <Typography variant="subtitle1" className="font-medium">
                      {job.title}
                    </Typography>
                    <Typography variant="body2" className="text-gray-500">
                      Status: {job.status}
                    </Typography>
                  </div>
                  <Button
                    startIcon={<Delete />}
                    onClick={() => removeJob(index)}
                    color="error"
                    size="small"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        
        <Button
          startIcon={<Add />}
          onClick={() => {
            handleOpen();
            setTab(1);
          }}
          sx={{ mt: 2 }}
        >
          Add New Job
        </Button>
      </section>

      
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: "80%", md: "700px" },
            maxHeight: "90vh",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" mb={2}>
            Edit Employee Profile
          </Typography>

          <Tabs 
            value={tab} 
            onChange={handleTabChange} 
            variant="scrollable" 
            scrollButtons="auto" 
            allowScrollButtonsMobile
          >
            <Tab label="Basic Info" />
            <Tab label="Settings" />
            
          </Tabs>

          
          {tab === 0 && (
            <Box mt={2}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={employee.name}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={employee.email}
                onChange={handleChange}
                margin="normal"
                type="email"
              />
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={employee.phone}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Company"
                name="company"
                value={employee.company}
                onChange={handleChange}
                margin="normal"
              />            
              <Select
                fullWidth
                label="Role"
                name="role"
                value={employee.role}
                onChange={handleChange}
                margin="dense"
                sx={{ mt: 2, mb: 1 }}
              >
                <MenuItem value="employer">Employer</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="recruiter">Recruiter</MenuItem>
              </Select>
            </Box>
          )}

          
          
          {tab === 1 && (
            <Box mt={2}>
            {employee.createdJobs?.map((job, index) => (
              <div key={job.id}>
                <TextField
                  fullWidth
                  label="Job Title"
                  value={job.title}
                  onChange={(e) => handleJobChange(index, "title", e.target.value)}
                  margin="normal"
                />
                <Button
                  startIcon={<Delete />}
                  onClick={() => removeJob(index)}
                  color="error"
                  size="small"
                  sx={{ mb: 3 }}
                >
                  Remove Job
                </Button>
              </div>
            ))}

              <Button startIcon={<Add />} onClick={addJob}>
                Add New Job
              </Button>
            </Box>
          )}

          <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              sx={{ backgroundColor: "#2563eb" }}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}