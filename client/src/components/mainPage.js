import React, { useState, useEffect } from 'react';
import Controllers from '../controllers';
import { Link } from "react-router-dom";
import './components.css'

const MainPage = () => {
    const entryObj = {
        itemName: "",
        stock: 0,
        packages: 0,
        orders: 0
    };

    const [entry, setEntry] = useState(entryObj);
    const [submitted, setSubmitted] = useState(false);
    const [toggle, setToggle] = useState(0);
    const [list, setList] = useState([]);
    const [entryId, setEntryId] = useState(-1);
    const [currEntry, setCurrEntry] = useState(null);
    const [editing, setEditing] = useState(false)
    const [deletionComment, setDeletionComment] = useState("")
    const [sendTrash, setSendTrash] = useState(false);

    useEffect(() => {
        getAll();
    }, [toggle]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setEntry({...entry, [name]: value});
    };

    const handleEdit = (e) => {
        const {name, value} = e.target;
        setCurrEntry({...currEntry, [name]: value});
    };
    
    const handleId = e => {
        const id = e.target.value;
        setEntryId(id);
    }

    const handleComment = e => {
        const comment = e.target.value
        setDeletionComment(comment)
    }

    const edit = () => {
        setEditing(true)
        setToggle(4)
    }

    const trashing = () => {
        setSendTrash(true)
        setToggle(5)
    }

    const postEntry = () => {
        let data = {
            itemName: entry.itemName,
            stock: entry.stock,
            packages: entry.packages,
            orders: entry.orders
        };
        Controllers.create(data)
            .then(res => {
                setEntry({
                    itemName: res.data.itemName,
                    stock: res.data.stock,
                    packages: res.data.packages,
                    orders: res.data.orders
                });
                setSubmitted(true)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getAll = () => {
        Controllers.getAll()
            .then(res => {
                setList(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getById = () => {
        Controllers.getById(entryId)
            .then(res => {
                setCurrEntry(res.data)
                console.log(res.data)
                setSubmitted(true)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const update = () => {
        let data = {
            itemName: currEntry.itemName,
            stock: currEntry.stock,
            packages: currEntry.packages,
            orders: currEntry.orders
        };
        Controllers.update(currEntry.id, data)
            .then(res => {
                console.log(res.data)
                setEditing(false)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const trash = () => {
        let comment = {
            comments: deletionComment
        };
        Controllers.trash(currEntry.id, comment)
            .then(res => {
                console.log(res.data)
                setSendTrash(false)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const refresh = () => {
        setEntry(entryObj);
        setSubmitted(false);
        setEditing(false)
        setSendTrash(false)
    }

    const refreshList = () => {
        getAll();
        setEntryId(-1);
        setCurrEntry(null);
        setSubmitted(false);
    }

    return (
        <div>
            <button onClick={() => setToggle(1)}>Create Entry</button>
            <button onClick={() => setToggle(2)}>Get All Entries</button>
            <button onClick={() => setToggle(3)}>Get Entry By Id</button>
            <Link to={"/trash/"}><button className='button'>Trash Can</button></Link>
            {toggle === 1 && <div>{submitted ? (
                <div>
                <h4>You submitted successfully!</h4>
                <button onClick={refresh}>
                    Refresh
                </button>
                </div>
            ) : (
                <div>
                <div>
                    <label>Item Name</label>
                    <input
                    type="text"
                    id="itemName"
                    required
                    value={entry.itemName}
                    onChange={handleChange}
                    name="itemName"
                    />
                </div>
                <div>
                    <label>Stock</label>
                    <input
                    type="text"
                    id="stock"
                    required
                    value={entry.stock}
                    onChange={handleChange}
                    name="stock"
                    />
                </div>
                <div>
                    <label>Packages</label>
                    <input
                    type="text"
                    id="packages"
                    required
                    value={entry.packages}
                    onChange={handleChange}
                    name="packages"
                    />
                </div>
                <div>
                    <label>Orders</label>
                    <input
                    type="text"
                    id="orders"
                    required
                    value={entry.orders}
                    onChange={handleChange}
                    name="orders"
                    />
                </div>
                <button onClick={postEntry}>
                    Submit
                </button>
                </div>
            )}</div>}
            {toggle === 2 && <ul>
                {list && list.map(entry => 
                    <li>
                        <strong style={{color: "red"}}>Id: {entry.id} <br/></strong>
                        Item Name: {entry.itemName} <br/>
                        Stock: {entry.stock} <br/>
                        Packages: {entry.packages} <br/>
                        Orders: {entry.orders} <br/>
                        <br/>
                    </li>
                )}
            </ul>}
            {toggle === 3 && <div>{submitted ? 
                    <div>
                        <ul>
                            {currEntry && 
                            <li>
                                <strong style={{color: "red"}}>Id: {currEntry.id} <br/></strong>
                                Item Name: {currEntry.itemName} <br/>
                                Stock: {currEntry.stock} <br/>
                                Packages: {currEntry.packages} <br/>
                                Orders: {currEntry.orders} <br/>
                                <br/>
                            </li>
                            }
                        </ul>
                        <button onClick={refreshList}>
                            Refresh
                        </button>
                        <button onClick={edit}>
                            Edit
                        </button>
                        <button onClick={trashing}>
                            Send to Trash
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
                <button onClick={getById}>
                    Submit
                </button>
            </div>}</div>}
            {toggle === 4 && <div>{!editing ? 
                <div>
                <h4>You submitted successfully!</h4>
                <button onClick={refresh}>
                    Refresh
                </button>
                <button onClick={()=>setToggle(3)}>
                    Back
                </button>
                </div>
                : 
                <div>
                    <div>
                        <label>Item Name</label>
                        <input
                        type="text"
                        id="itemName"
                        required
                        value={currEntry.itemName}
                        onChange={handleEdit}
                        name="itemName"
                        />
                    </div>
                    <div>
                        <label>Stock</label>
                        <input
                        type="text"
                        id="stock"
                        required
                        value={currEntry.stock}
                        onChange={handleEdit}
                        name="stock"
                        />
                    </div>
                    <div>
                        <label>Packages</label>
                        <input
                        type="text"
                        id="packages"
                        required
                        value={currEntry.packages}
                        onChange={handleEdit}
                        name="packages"
                        />
                    </div>
                    <div>
                        <label>Orders</label>
                        <input
                        type="text"
                        id="orders"
                        required
                        value={currEntry.orders}
                        onChange={handleEdit}
                        name="orders"
                        />
                    </div>
                    <button onClick={update}>
                        Save
                    </button>
                </div>}</div>
            }
            {toggle === 5 && <div>{!sendTrash ? 
                <div>
                <h4>You submitted successfully!</h4>
                <button onClick={refresh}>
                    Refresh
                </button>
                <button onClick={()=>setToggle(3)}>
                    Back
                </button>
                </div>
                : 
                <div>
                    <div>
                        <label>Deletion Comment</label>
                        <input
                        type="text"
                        id="comments"
                        required
                        value={deletionComment}
                        onChange={handleComment}
                        name="comments"
                        />
                    </div>
                    <button onClick={trash}>
                        Trash
                    </button>
                </div>}</div>
            }
        </div>
    );
};

export default MainPage;