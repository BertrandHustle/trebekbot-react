import React, {useContext} from 'react';
import Button from 'react-bootstrap/Button';

import { questionTotalTime, TimerContext} from '@/App';
import './timer.css'

export default function TimerLight ({ activationPercentage }) {
    const { time } = useContext(TimerContext);

    const buttonStyle = {
        "--bs-btn-padding-y": '1rem',
        "--bs-btn-padding-x": '2rem',
    }
    const variants = {
        activeVariant: 'danger',
        inactiveVariant: 'outline-danger'
    }

    function pickVariant () {
        if (time > questionTotalTime * activationPercentage/100) {
            return variants.activeVariant;
        }
        else {
            return variants.inactiveVariant
        }
    }
    
    return(
        <Button style={buttonStyle} className='rounded-0 timer-light' variant={pickVariant()}></Button>
    )
}

