import { Box, Input, Typography } from '@mui/material'
import { useField } from 'formik'
import React from 'react'

const InputField = ({name, label}) => {
    const [field, {error}] = useField(name)

    return (
         <Box mb={.5}>
            <Input
                sx={{
                    bgcolor: '#fff',
                    color: 'primary.main',
                    p: .7,
                    px: 1.5,
                    borderRadius: '0px',
                    borderTopRightRadius: '5px',
                    borderTopLeftRadius: '5px',
                }}
                label={label}
                placeholder={label}
                {...field}
                type={label}
                error={!!error}
                fullWidth
            />
            {error && <Typography variant="caption" color="error" mx={.5}>{error}</Typography>}
        </Box>
    )
}

export default InputField