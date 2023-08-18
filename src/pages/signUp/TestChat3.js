import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

function TestChat3() {
  const [checked, setChecked] = useState([false,false,false,false,false,false,false,false,false]);
  const [indeterminate, setIndeterminate] = useState(false);

  const handleCheck = () => {
    if (!checked) {
      setChecked(true);
    } else if (indeterminate) {
      setIndeterminate(false);
    } else {
      setChecked(false);
      setIndeterminate(true);
    }
  };

  return (
    <div>
<FormControlLabel
  label="Parent"
  control={
    <Checkbox
      checked={checked[0] && checked[1]}
      indeterminate={checked[0] !== checked[1]}

    />
  }
/>
<FormControlLabel
        label="Child 2"
        control={<Checkbox checked={checked[0]}  />}
      />
      <FormControlLabel
        label="Child 2"
        control={<Checkbox checked={checked[1]}  />}
      />
      <FormControlLabel
        label="Child 2"
        control={<Checkbox checked={checked[2]}  />}
      />
      <FormControlLabel
        label="Child 2"
        control={<Checkbox checked={checked[3]}  />}
      />
      <FormControlLabel
        label="Child 2"
        control={<Checkbox checked={checked[4]}  />}
      />
      <FormControlLabel
        label="Child 2"
        control={<Checkbox checked={checked[5]}  />}
      />
      <FormControlLabel
        label="Child 2"
        control={<Checkbox checked={checked[6]}  />}
      />
      <FormControlLabel
        label="Child 2"
        control={<Checkbox checked={checked[7]}  />}
      />
      <FormControlLabel
        label="Child 2"
        control={<Checkbox checked={checked[8]}  />}
      />

    </div>
  );
}

export default TestChat3;
