import React, {useState} from 'react'
import { useStore } from '../../context/StorageContext';

export default function Filter() {
    const [branch, setBranch] = useState('');
    const {getFilteredItems} = useStore();

  return (
    <div className='flex'>
    <select className='filter' value={branch} 
    onChange={(e) => {
    setBranch(e.target.value)
    getFilteredItems(e.target.value)
    }}>
            <option value="">Select branch</option>
            <option value="COMPS">COMPS</option>
            <option value="MECH">MECH</option>
            <option value="ECS">ECS</option>
            <option value="AIDS">AIDS</option>
    </select>
    </div>
  )
}
