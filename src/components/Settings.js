import React from 'react';

const Settings = (props) => {

    const scaleChange = (data) => {
        props.scaleFoo()
        console.log('Radio changed');
    }

    return (
        <div>
            <div className='tempSettings, contentContainer1'>
                <ul>
                    <li>
                        <input type="radio" name="name" id="one" checked={!props.scale} onChange={scaleChange}/>
                        <label htmlFor="one">Skala Celsjusza</label>
                        <div className="check"></div>
                    </li>

                    <li>
                        <input type="radio" name="name" id="two" checked={props.scale} onChange={scaleChange}/>
                        <label htmlFor="two">Skala Farenheita</label>

                        <div className="check"></div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Settings