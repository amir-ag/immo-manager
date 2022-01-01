import React from 'react';
import { makeStyles, Paper } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';

export type ImageUploadProps = {
    previewImageUrl?: string | null;
    handleImageChange: (file: File) => void;
};

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
        width: `calc(100% - ${theme.spacing(3)})`,
    },
    previewImg: {
        width: '100%',
        borderRadius: theme.shape.borderRadius,
        marginBottom: theme.spacing(3),
    },
    dropzone: {
        minHeight: '180px',
    },
    dropzoneText: {
        fontSize: theme.typography.body1.fontSize,
    },
}));

const ImageUpload = ({ previewImageUrl, handleImageChange }: ImageUploadProps) => {
    const cssClasses = useStyles();

    return (
        <Paper elevation={3} className={cssClasses.root}>
            {previewImageUrl && (
                <img
                    alt="Preview Image"
                    loading="lazy"
                    src={previewImageUrl}
                    className={cssClasses.previewImg}
                />
            )}
            <DropzoneArea
                classes={{ root: cssClasses.dropzone, text: cssClasses.dropzoneText }}
                filesLimit={1}
                acceptedFiles={['image/*']}
                dropzoneText={'Drag and drop your image here...'}
                onChange={(images) => handleImageChange(images[0])}
            />
        </Paper>
    );
};

export default ImageUpload;
