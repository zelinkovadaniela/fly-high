import './OptionsDropdown.scss'

function Checkbox(props) {
  const { checked, setChecked } = props;
  return (
    <div>
      <input className="checkbox" name="checkbox" id="checkbox" type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />
      <label htmlFor="checkbox">Direct flights</label>
    </div>
  );
}

export default Checkbox;
