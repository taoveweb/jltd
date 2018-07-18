import * as React from 'react';
import { Slider } from 'antd';
 

 class JltSlider extends React.Component{

    render() {
        return (
            <Slider {...this.props}/>
        )
    }
}

export default JltSlider;