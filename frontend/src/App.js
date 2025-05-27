import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  CardMedia, 
  Grid,
  TextField,
  Button,
  Paper,
  CircularProgress
} from '@mui/material';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    image: null
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/requests`);
      setRequests(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching requests:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('body', formData.body);
      if (formData.image) {
        data.append('image', formData.image);
      }

      await axios.post(`${API_URL}/api/requests`, data);
      
      // Reset form
      setFormData({
        title: '',
        body: '',
        image: null
      });
      
      // Refresh requests
      fetchRequests();
      setSubmitting(false);
    } catch (error) {
      console.error('Error creating request:', error);
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        GetHelp
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Crear nueva solicitud
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Título"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            margin="normal"
          />
          
          <TextField
            fullWidth
            label="Descripción"
            name="body"
            value={formData.body}
            onChange={handleInputChange}
            required
            multiline
            rows={4}
            margin="normal"
          />
          
          <Box sx={{ mt: 2, mb: 2 }}>
            <input
              accept="image/*"
              id="image-upload"
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="image-upload">
              <Button variant="outlined" component="span">
                Subir imagen (opcional)
              </Button>
            </label>
            {formData.image && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Imagen seleccionada: {formData.image.name}
              </Typography>
            )}
          </Box>
          
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            disabled={submitting}
            sx={{ mt: 2 }}
          >
            {submitting ? <CircularProgress size={24} /> : 'Enviar solicitud'}
          </Button>
        </Box>
      </Paper>
      
      <Typography variant="h5" component="h2" gutterBottom>
        Solicitudes recientes
      </Typography>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : requests.length === 0 ? (
        <Typography variant="body1" align="center" sx={{ my: 4 }}>
          No hay solicitudes disponibles.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {requests.map((request) => (
            <Grid item xs={12} key={request._id}>
              <Card>
                {request.imageUrl && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={`${API_URL}${request.imageUrl}`}
                    alt={request.title}
                    sx={{ objectFit: 'contain' }}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {request.title}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {request.body}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(request.createdAt).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default App;
