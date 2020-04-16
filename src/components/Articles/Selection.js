import React from 'react';
import {Select} from 'react-materialize';

const Selection =(props)=>{
    
        return(            
            <div className="container">
                <Select value={props.section} onChange={props.onChange} 
                  id="Select-9" multiple={false} 
                  options={{
                    classes: '',
                    dropdownOptions: {
                      alignment: 'left',
                      autoTrigger: true,
                      closeOnClick: true,
                      constrainWidth: true,
                      coverTrigger: true,
                      hover: false,
                      inDuration: 150,
                      onCloseEnd: null,
                      onCloseStart: null,
                      onOpenEnd: null,
                      onOpenStart: null,
                      outDuration: 250
                    }
                  }}
                >
                  <option value="home">Choose the Section</option>
                  <option value="Science">Science</option>
                  <option value="Technology">Technology</option>
                  <option value="Business">Business</option>
                  <option value="World">World</option>
                  <option value="Movies">Movies</option>
                  <option value="Travel">Travel</option>
                </Select>          
            </div>
        );   
}

export default Selection;