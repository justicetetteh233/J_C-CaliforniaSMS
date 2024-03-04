import React, { useCallback, useState } from 'react';
import '../App.css';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function DatabaseBackupAndRestore() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const onDrop = useCallback(acceptedFiles => {
        setSelectedFile(acceptedFiles[0]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const backup = () => {
        axios.post('http://localhost:8000/api/backup/')
            .then(response => {
                alert("Backup successful");
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const restore = () => {
        if (!selectedFile) {
            alert("Please select a file to restore.");
            return;
        }

        setUploading(true);

        const formData = new FormData();
        formData.append('backupFile', selectedFile);

        axios.post('http://localhost:8000/api/restore/', formData)
            .then(response => {
                alert("Restore successful");
                setUploading(false);
            })
            .catch(error => {
                console.error('There was an error!', error);
                setUploading(false);
            });
    }

    return (
        <Box sx={{'& > :not(style)': {m: 1}}}>
            <Button variant="contained" onClick={backup}>
                Backup
            </Button>
            <div {...getRootProps()} className={`dropzone ${isDragActive ? 'drag-active' : ''}`}>
                <input {...getInputProps()} />
                <label>
                    {
                        isDragActive ?
                            <p>Drop the files here ...</p> :
                            <p>Drag 'n' drop some files here, or click to select files</p>
                    }
                </label>
            </div>
            <Button variant="contained" onClick={restore} disabled={uploading}>
                {uploading ? <CircularProgress size={24}/> : 'Restore'}
            </Button>
        </Box>
    );
}

export default DatabaseBackupAndRestore;