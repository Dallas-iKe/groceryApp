import { FaPlus } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';

const AddItem = ({ newItem, setNewItem, handleSubmit }) => {
    const inputRef = useRef();
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/users');
                const result = await res.json();
                setFilterData(result);
            } catch (err) {
                console.error('Failed to fetch users:', err);
            }
        };

        fetchData();
    }, []);

    const handleFilter = (value) => {
        const lowerCaseValue = value.toLowerCase();
        const filtered = filterData.filter(f => f.name.toLowerCase().includes(lowerCaseValue));
        setData(filtered);

        setShowSuggestions(value.length > 0);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setNewItem(value);
        handleFilter(value);
    };

    return (
        <div>
            <form className='addForm' onSubmit={handleSubmit}>
                <label htmlFor='addItem'>Add Item</label>
                <input
                    autoFocus
                    ref={inputRef}
                    id='addItem'
                    type='text'
                    placeholder='Add Item'
                    required
                    value={newItem}
                    onChange={handleInputChange}
                />
                <button
                    type='submit'
                    aria-label='Add Item'
                    onClick={() => inputRef.current.focus()}
                >
                    <FaPlus />
                </button>
            </form>

            {showSuggestions && (
                <ul className='suggestions'>
                    {data.map((item) => (
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AddItem;
