import React from 'react';
import { motion } from 'framer-motion';

function Threedot() {
    const loadingContainer = {
        width: '100%',
        textAlign: 'center',
        height: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    const loadingCircle = {
        display: 'block',
        width: '0.5rem',
        height: '0.5rem',
        backgroundColor: 'white',
        borderRadius: '0.25rem',
        margin: '0.25rem'
    };

    const loadingContainerVariants = {
        start: {
            transition: {
                staggerChildren: 0.15
            }
        },
        end: {
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const loadingCircleVariants = {
        start: {
            y: '0%'
        },
        end: {
            y: '100%'
        }
    };

    const loadingCircleTransition = {
        duration: 1,
        repeat: Infinity,
        ease: 'circInOut'
    };

    return (
        <motion.div
            style={loadingContainer}
            variants={loadingContainerVariants}
            initial="start"
            animate="end"
        >
            <motion.span
                style={loadingCircle}
                variants={loadingCircleVariants}
                transition={loadingCircleTransition}
            ></motion.span>
            <motion.span
                style={loadingCircle}
                variants={loadingCircleVariants}
                transition={loadingCircleTransition}
            ></motion.span>
            <motion.span
                style={loadingCircle}
                variants={loadingCircleVariants}
                transition={loadingCircleTransition}
            ></motion.span>
        </motion.div>
    );
}

export default Threedot;
