import React, {useState, useRef, useEffect} from 'react'
import {useAuth} from '../../context/AuthContext';
import { useStore } from '../../context/StorageContext';

export default function CollectUserData() {

    const graduationYears = Array.from({ length: 10 }, (_, i) => 2023 + i); // Generate an array of graduation years
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('');
    const scrollWrapperRef = useRef(null);
    const {storeUser} = useStore();
    const {user} = useAuth();

    function handleSubmit(){
        if(selectedYear===''||selectedBranch==='')
        {
            alert('Please input both fields')
        }
        else
        {
            storeUser(user.uid,selectedBranch,selectedYear)
        }
    }


    function handleBranchChange(event) {
        setSelectedBranch(event.target.value);
        console.log('Selected branch:', selectedBranch);
    };
    
    function handleYearSelection(year){
        setSelectedYear(year);
        console.log('Selected year:', year);
      };

    
    useEffect(() => {
        const scrollWrapper = scrollWrapperRef.current;
        const listItems = scrollWrapper.querySelectorAll('.scroll-input__item');

        // Find the index of the selected year
        const selectedIndex = graduationYears.indexOf(parseInt(selectedYear));

        // Calculate the scroll position to center the selected year
        const scrollPosition = selectedIndex * listItems[0].offsetHeight - scrollWrapper.offsetHeight / 2 + listItems[0].offsetHeight / 2;

        scrollWrapper.scrollTo({
        top: scrollPosition,
        behavior: 'smooth',
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedYear]);
      

    
  return (
    <div className='collect-user-data-body'>

    <div className='centered-div'>
        <select id="branch" name="branch" onChange={(e)=>handleBranchChange(e)}>
        <option value="">Select branch</option>
        <option value="COMPS">COMPS</option>
        <option value="MECH">MECH</option>
        <option value="ECS">ECS</option>
        <option value="AIDS">AIDS</option>
        </select>

        <div className='text margin-top'>Select expected year of graduation</div>


        <div className="scroll-input">
        <div className="scroll-input__wrapper" ref={scrollWrapperRef}>
            <ul className="scroll-input__list">
            {graduationYears.map((year) => (
                <li
                key={year}
                className={`scroll-input__item ${year === selectedYear ? 'selected' : ''}`}
                onClick={() => handleYearSelection(year)}
                >
                {year}
                </li>
            ))}
            </ul>
        </div>
        </div>
    </div>

    <button className='basic-button' onClick={()=>handleSubmit()}>Proceed</button>

    </div>
  )
}
