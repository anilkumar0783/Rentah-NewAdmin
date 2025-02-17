import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, TextField, Typography } from '@mui/material';
import { ScaleLoader } from 'react-spinners';

const EditModal = ({ open, onClose, onConfirm, listing }) => {
    const [editedListing, setEditedListing] = useState(listing || {});
    const [isLoading, setIsLoading] = useState(false); // Manage loading state

    useEffect(() => {
        setEditedListing(listing); // Reset the form when listing changes
    }, [listing]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedListing({ ...editedListing, [name]: value });
    };

    const handleSubmit = async () => {
        setIsLoading(true); // Trigger loading state
        await onConfirm(editedListing); // Pass the updated listing to the parent component
        setIsLoading(false); // Reset loading state
        onClose(); // Close the modal
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'fixed',
                    top: '5%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    bgcolor: "#e1f9fc",
                    padding: '30px',
                    borderRadius: '20px 20px 20px 20px',
                    boxShadow: 24,
                    width: '90%',
                    maxWidth: '500px',
                    animation: open ? 'slide-up 0.5s ease-out' : 'none', // Slide-up animation
                    overflowY: 'auto', // Enable vertical scrolling
                    maxHeight: '90vh',
                    '&::-webkit-scrollbar': {
                        display: 'none', // Hide the scrollbar
                    },
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Edit Listing
                </Typography>

                <TextField
                    label="Title"
                    name="title"
                    value={editedListing?.title || ''}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    size="large"
                    sx={{
                        borderRadius: '5px', // Rounded corners
                        backgroundColor: '#fafafa', // Light background for better visibility
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '5px', // Ensure the input itself has rounded corners
                            '&:hover fieldset': {
                                borderColor: '#5ceacf', // Highlight color on hover
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#5ceacf', // Focused state border color
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: '#888', // Label color
                            '&.Mui-focused': {
                                color: '#5ceacf', // Focused label color
                            },
                        },

                    }}
                />

                <TextField
                    label="Description"
                    name="description"
                    value={editedListing?.description || ''}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    size="large"
                    multiline
                    minRows={4} 
                    sx={{
                        borderRadius: '5px', // Rounded corners
                        backgroundColor: '#fafafa', // Light background for better visibility
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '5px', // Ensure the input itself has rounded corners
                            '&:hover fieldset': {
                                borderColor: '#5ceacf', // Highlight color on hover
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#5ceacf', // Focused state border color
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: '#888', // Label color
                            '&.Mui-focused': {
                                color: '#5ceacf', // Focused label color
                            },
                        },

                    }}
                />

                <TextField
                    label="Username"
                    name="userName"
                    value={editedListing?.userName || ''}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    size="large"
                    sx={{
                        borderRadius: '5px',
                        backgroundColor: '#fafafa',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '5px',
                            '&:hover fieldset': {
                                borderColor: '#5ceacf',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#5ceacf',
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: '#888',
                            '&.Mui-focused': {
                                color: '#5ceacf',
                            },
                        },

                    }}
                />

                <TextField
                    label="Location"
                    name="location"
                    value={editedListing?.location || ''}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    size="large"
                    sx={{
                        borderRadius: '5px',
                        backgroundColor: '#fafafa',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '5px',
                            '&:hover fieldset': {
                                borderColor: '#5ceacf',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#5ceacf',
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: '#888',
                            '&.Mui-focused': {
                                color: '#5ceacf',
                            },
                        },

                    }}
                />

                <TextField
                    label="Price"
                    name="budget"
                    value={editedListing?.budget || ''}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    size="large"
                    sx={{
                        borderRadius: '5px',
                        backgroundColor: '#fafafa',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '5px',
                            '&:hover fieldset': {
                                borderColor: '#5ceacf',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#5ceacf',
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: '#888',
                            '&.Mui-focused': {
                                color: '#5ceacf',
                            },
                        },

                    }}
                />

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px', mt: 3 }}>
                    <Button
                        onClick={onClose}
                        variant="contained"
                        sx={{
                            bgcolor: '#fff',
                            color: '#000',
                            borderRadius: '12px',
                            padding: '8px 20px',
                            textTransform: 'none', // Avoid uppercasing the text
                            '&:hover': {
                                bgcolor: '#e3e3e3', // Light grey hover effect
                            },
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        sx={{
                            bgcolor: '#ff4d4d', // Red background for the confirm button
                            color: '#fff',
                            borderRadius: '12px',
                            padding: '8px 20px',
                            textTransform: 'none', // Avoid uppercasing the text
                            '&:hover': {
                                bgcolor: '#ff1a1a', // Darker red on hover
                            },
                            disabled: {
                                bgcolor: '#c5c5c5', // Disabled button color
                                color: '#f5f5f5', // Disabled text color
                            },
                        }}
                        disabled={isLoading}
                    >
                        Save
                        {isLoading && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                }}
                            >
                                <ScaleLoader color="#ffffff" height={30} width={4} />
                            </Box>
                        )}
                    </Button>
                </Box>

            </Box>
        </Modal>
    );
};

export default EditModal;
