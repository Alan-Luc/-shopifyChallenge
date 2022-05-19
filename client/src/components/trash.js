import React, { useState, useEffect } from 'react';
import Controllers from '../controllers';
import { Link } from "react-router-dom";

const Trash = () => {
    const [list, setList] = useState([]);
    const [entryId, setEntryId] = useState(-1);
    const [toggle, setToggle] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [currEntry, setCurrEntry] = useState(null);
    const [editing, setEditing] = useState(false)

    useEffect(() => {
        viewTrash();
    }, [toggle]);

    const handleId = e => {
        const id = e.target.value;
        setEntryId(id);
    }

    const refreshList = () => {
        viewTrash();
        setEntryId(-1);
        setCurrEntry(null);
        setSubmitted(false);
    }

    const viewTrash = () => {
        Controllers.viewTrash()
            .then(res => {
                setList(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const viewTrashById = () => {
        Controllers.viewTrashById(entryId)
            .then(res => {
                setCurrEntry(res.data)
                console.log(res.data)
                setSubmitted(true)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const undoTrash = () => {
        Controllers.undoTrash(currEntry.id)
            .then(res => {
                console.log(res.data)
                setEditing(false)
                setToggle(1)
                refreshList()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const deleteAll = () => {
        Controllers.deleteAll()
            .then(res => {
                console.log(res.data)
                refreshList()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const deleteById = () => {
        Controllers.deleteById(currEntry.id)
            .then(res => {
                console.log(res.data)
                setEditing(false)
                setToggle(1)
                refreshList()
            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <div>
            <button onClick={() => setToggle(1)}>View All</button>
            <button onClick={() => setToggle(2)}>Get Trashed Entry By Id</button>
            <button onClick={deleteAll}>Permanently Delete All Trashed Entries</button>
            <Link to={"/"}><button className='button'>Back to Inventory</button></Link>
            {toggle === 1 && <ul>
                {list && list.map(entry => 
                    <li>
                        <strong style={{color: "red"}}>Id: {entry.id} <br/></strong>
                        Item Name: {entry.itemName} <br/>
                        Comments: {entry.comments} <br/>
                        <br/>
                    </li>
                )}
            </ul>}
            {toggle === 2 && <div>{submitted ? 
                    <div>
                        <ul>
                            {currEntry && 
                            <li>
                                <strong style={{color: "red"}}>Id: {currEntry.id} <br/></strong>
                                Item Name: {currEntry.itemName} <br/>
                                Comments: {currEntry.comments} <br/>
                                <br/>
                            </li>
                            }
                        </ul>
                        <button onClick={refreshList}>
                            Refresh
                        </button>
                        <button onClick={undoTrash}>
                            Restore
                        </button>
                        <button onClick={deleteById}>
                            Delete This Specific Entry
                        </button>
                    </div> : <div>
                <div>
                    <label>Id</label>
                    <input
                    type="text"
                    id="id"
                    required
                    value={entryId}
                    onChange={handleId}
                    name="itemName"
                    />
                </div>
                <button onClick={viewTrashById}>
                    Submit
                </button>
            </div>}</div>}
        </div>
    )
}

export default Trash;