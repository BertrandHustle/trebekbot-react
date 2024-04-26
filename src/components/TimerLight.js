import React, {useContext} from 'react';
import Button from 'react-bootstrap/Button';

import { questionTotalTime, TimerContext} from 'App';

export default function TimerLight ({ activationPercentage }) {
    const { time } = useContext(TimerContext);

    // TODO: move this into .css folder
    const style = {
        "--bs-btn-padding-y": '1rem',
        "--bs-btn-padding-x": '2rem',
        marginLeft: '0.25rem',
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
        <Button className='rounded-0' style={style} variant={pickVariant()}></Button>
    )
}

