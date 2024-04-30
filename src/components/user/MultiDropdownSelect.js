import DropdownTreeSelect from "react-dropdown-tree-select";
import data from "./data.json";
import './index.css'

const onChange = (currentNode, selectedNodes) => {
    console.log("path::", currentNode.path);
  };
  
  const assignObjectPaths = (obj, stack) => {
    Object.keys(obj).forEach(k => {
      const node = obj[k];
      if (typeof node === "object") {
        node.path = stack ? `${stack}.${k}` : k;
        assignObjectPaths(node, node.path);
      }
    });
  };

const MultiDropdownSelect = () => {
  assignObjectPaths(data);

  return (
    <DropdownTreeSelect
      data={data}
      onChange={onChange}
      className="bootstrap-demo"
    />
  );
};

export default MultiDropdownSelect;
