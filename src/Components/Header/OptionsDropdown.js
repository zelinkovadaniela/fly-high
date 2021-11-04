import { useState } from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import './OptionsDropdown.scss'

function OptionsDropdown(props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { itemsList, setSelectedItem, selectedItem, defaultTitle } = props;

  const toggle = () => setDropdownOpen(prevState => !prevState);
  
  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret className='optionsDropdown'>
        {selectedItem ? selectedItem.name : defaultTitle}
      </DropdownToggle>
      <DropdownMenu>
        {itemsList.map((item, index) => (
          <DropdownItem 
            key={index} 
            onClick={() => {
              setSelectedItem(item);
            }}
          >
              {item.name}
          </DropdownItem>
        ))}
        
      </DropdownMenu>
    </Dropdown>
  );
}

export default OptionsDropdown;
