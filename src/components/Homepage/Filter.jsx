import { useState } from 'react'
const menu = [
    { submenu: 'Programming', id: 1 },
    { submenu: 'Mathematica', id: 2 },
    { submenu: 'Web Development', id: 3 },
    { submenu: 'Machine Learning', id: 4 },
]

const menuItems = menu.map(menu =>
    <button className="list-none flex" key={menu.id}>
        {menu.submenu}
    </button>
);




export default function Filter() {
    const [menu1, setMenu1] = useState(false);

    function DropdownManageStateEnter() {
        setMenu1(true)
    }
    function DropdownManageStateLeave() {
        setMenu1(false)
    }
    return (
        <div>
            <button onMouseEnter={DropdownManageStateEnter} className="flex bg-orange-300">
                <p className=" ">Categories</p>
                <i className="bi bi-chevron-double-down"></i>
            </button>
            <div onMouseLeave={DropdownManageStateLeave} className={`${menu1 ? '' : 'hidden'}`}>
                {menuItems}
            </div>
        </div>
    )
}