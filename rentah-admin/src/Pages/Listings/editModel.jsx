import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, Typography, Stack, Chip } from '@mui/material';
import { ScaleLoader } from 'react-spinners';

const EditModal = ({ open, onClose, onConfirm, listing }) => {
    const [editedListing, setEditedListing] = useState(listing || {});
    const [isLoading, setIsLoading] = useState(false); // Manage loading state
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState([]);
    const [tags, setTags] = useState([]);
    const [singleTags, setSingleTags] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [location, setLocation] = useState('');
    const [subCategoryData, setSubCategoryData] = useState([]); // Placeholder for subcategory data

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

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleSubCategoryChange = (e) => {
        const selectedSubCategory = e.target.value;
        setSubCategory((prev) => [...prev, selectedSubCategory]);
    };

    const handleRemoveSubCategory = (subCategoryToRemove) => {
        setSubCategory((prev) => prev.filter(sub => sub !== subCategoryToRemove));
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags((prev) => prev.filter(tag => tag !== tagToRemove));
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

                <FormControl fullWidth margin="normal" variant="outlined"
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
                >
                    <InputLabel>Type</InputLabel>
                    <Select
                        value={editedListing?.type || ''}
                        onChange={(e) => setEditedListing({ ...editedListing, type: e.target.value })}
                        label="Type"
                    >
                        <MenuItem value="">Select Type</MenuItem>
                        <MenuItem value="4">Hour</MenuItem>
                        <MenuItem value="0">Day</MenuItem>
                        <MenuItem value="1">Week</MenuItem>
                        <MenuItem value="6">Year</MenuItem>
                        <MenuItem value="2">Month</MenuItem>
                        <MenuItem value="3">For Sell</MenuItem>
                        <MenuItem value="5">Custom</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal" variant="outlined"
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
                >
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={editedListing?.category}
                        onChange={handleCategoryChange}
                        label="Category"
                    >
                        <MenuItem value="Goods">Goods</MenuItem>
                        <MenuItem value="Services">Services</MenuItem>
                        <MenuItem value="Spaces">Spaces</MenuItem>
                    </Select>
                </FormControl>

                {/* Subcategory Selection */}
                <FormControl fullWidth margin="normal" variant="outlined"
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
                >
                    <InputLabel>Sub Category</InputLabel>
                    <Select
                        value={editedListing?.subCategory}
                        onChange={handleSubCategoryChange}
                        label="Sub Category"
                    >
                        <MenuItem value="">Select Sub Category</MenuItem>
                        {subCategoryData.map((sub, index) => (
                            <MenuItem key={index} value={sub.subCategoryName}>{sub.subCategoryName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Subcategory Chips */}
                <Stack direction="row" spacing={1} flexWrap="wrap">
                    {subCategory.map((sub, index) => (
                        <Chip
                            key={index}
                            label={sub}
                            onDelete={() => handleRemoveSubCategory(sub)}
                        />
                    ))}
                </Stack>

                {/* Tags Section */}
                <TextField
                    label="Add Tags"
                    name="tags"
                    value={editedListing?.singleTags||""}
                    onChange={(e) => setSingleTags(e.target.value)}
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
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && singleTags) {
                            setTags((prev) => [...prev, singleTags]);
                            setSingleTags('');
                        }
                    }}
                />

                <Stack direction="row" spacing={1} flexWrap="wrap">
                    {tags.map((tag, index) => (
                        <Chip
                            key={index}
                            label={tag}
                            onDelete={() => handleRemoveTag(tag)}
                        />
                    ))}
                </Stack>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px', mt: 3 }}>
                    <Button
                        onClick={onClose}
                        variant="contained"
                        sx={{
                            bgcolor: '#fff',
                            color: '#000',
                            borderRadius: '12px',
                            padding: '8px 20px',
                            textTransform: 'none',
                            '&:hover': {
                                bgcolor: '#e3e3e3',
                            },
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        sx={{
                            bgcolor: '#ff4d4d',
                            color: '#fff',
                            borderRadius: '12px',
                            padding: '8px 20px',
                            textTransform: 'none',
                            '&:hover': {
                                bgcolor: '#ff1a1a',
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
