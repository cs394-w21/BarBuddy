import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ type = 'checkbox', name, checked = false, onChange }) => (
  <input type={type} name={name} checked={checked} onChange={onChange} />
);

Checkbox.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
}

export default Checkbox;



/*
export default class CheckBox extends Component {
    render() {
        return(
            <View>
                <CheckBox title={item}/>
            </View>
        )
    }
};
*/