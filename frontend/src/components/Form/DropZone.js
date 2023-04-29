import React, {useEffect} from 'react';
import {useDropzone} from 'react-dropzone';
import {Alert, Box, Grid, LinearProgress, Typography} from "@mui/material";
import update from 'immutability-helper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {v4 as uuidv4} from 'uuid';


const thumb = (state) => {
    return {
        display: 'inline-flex',
        borderRadius: '10px',
        border: '2px solid',
        marginBottom: 8,
        marginRight: 8,
        width: 100,
        height: 100,
        padding: 4,
        boxSizing: 'border-box',
        borderColor: state === 'ERROR' ? 'red' : '#eaeaea'
    }
};

function DropZone({files, setFiles, imageErrors, isLoading}) {
    const {getRootProps, getInputProps} = useDropzone({
        multiple: true,
        accept: {
            'image/*': []
        },
        disabled: isLoading,
        onDrop: acceptedFiles => {
            //max 20 files
            const extraAmount = (Object.keys(files).length + acceptedFiles.length) - 20;
            acceptedFiles.splice(acceptedFiles.length-extraAmount, extraAmount);

            let newFiles = {};
            acceptedFiles.forEach((acceptedFile) => {
                let uuid = uuidv4();
                newFiles[uuid] = {
                    meta: {
                        progressPercentage: 0,
                        state: 'INITIAL',
                        preview: URL.createObjectURL(acceptedFile)
                    },
                    fileData: acceptedFile
                }
            });

            setFiles({...files, ...newFiles});
        }
    });

    useEffect(() => {
        if(imageErrors.length > 0) {
            Object.keys(files).forEach((fileUuid) => {
                setFiles(prevFiles => update(prevFiles, {
                    [fileUuid]: { meta: {
                            progressPercentage: { $set: 0 }
                        }
                    }
                }));
            });
        }
    }, [imageErrors])

    const removeImage = (fileUuid) => {
        setFiles(prevFiles => update(prevFiles,{ $unset: [fileUuid] }));
    }

    const thumbs = () => {

        return Object.keys(files).map((fileUuid) => (
            <Grid item key={files[fileUuid].meta.preview}>
                <Grid container direction={'column'}>
                    <Grid item>
                        {!isLoading &&
                            <IconButton size={'small'} onClick={() => removeImage(fileUuid)} sx={{
                                padding: '3px',
                                top: '15px',
                                backgroundColor: 'error.main',
                                color: 'white',
                                ':hover': {bgcolor: 'red'},
                            }}>
                                <DeleteIcon fontSize="small"/>
                            </IconButton>
                        }
                    </Grid>
                    <Grid item>
                        <div style={thumb(files[fileUuid].meta.state)}>
                            <div className={'dropzone-thumb-inner'}>
                                <img
                                    src={files[fileUuid].meta.preview}
                                    className={'dropzone-thumb-img'}
                                />
                            </div>
                        </div>
                    </Grid>
                    <Grid item>
                        <LinearProgress sx={{mr: 1, borderRadius: '5px'}}  variant="determinate" value={files[fileUuid].meta.progressPercentage}
                                        color={files[fileUuid].meta.progressPercentage === 100 ? "success" : "primary"}/>
                    </Grid>

                </Grid>
            </Grid>
        ))
    };

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => Object.keys(files).forEach(fileUuid => URL.revokeObjectURL(files[fileUuid].meta.preview));
    }, []);

    return (
        <Box>
            <Box className="drop-zone-container">
                <div {...getRootProps({className: 'dropzone'})}>
                    <input {...getInputProps()} />
                    <Typography variant={'body1'} textAlign={'center'} color={'gray'}>Drag images here, or click to select files.</Typography>
                </div>
            </Box>
            <Typography variant={'subtitle2'} color={'gray'} textAlign={'right'}>Max image size 10MB.</Typography>
            <Typography variant={'subtitle2'} color={'gray'} textAlign={'right'}>Max 20 images.</Typography>

            <Grid container sx={{mb: 2}}>
                {thumbs()}
            </Grid>

            {imageErrors.length > 0 && (
                <Alert severity="error" sx={{mt: 1}}>
                    {imageErrors.map((item, i) => {
                        return <Typography variant={'body1'} key={i}>{item}</Typography>;
                    })}
                </Alert>
            )}
        </Box>

    );
}

export default DropZone
