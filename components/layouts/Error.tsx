import {useContext, useEffect, useState} from "react";
import {UIContext} from "../../context/ui";
import {Box, Typography, Button} from "@mui/material";
import styles from "./Error.module.css";

const Error = () => {
    const {errorMessage, cleanErrorMessage} = useContext(UIContext);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(!!errorMessage);

        const timeoutId = setTimeout(() => {
            cleanErrorMessage();
            setIsVisible(false);
        }, 4000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [errorMessage]);

    return (
        isVisible &&
        <Box className={`${styles.errorMessagePaper} ${styles.show}`}>
            <Typography fontWeight={'bold'}>{errorMessage}</Typography>
            {/*<Button onClick={cleanErrorMessage}>X</Button>*/}
        </Box>
    );
};

export default Error;
