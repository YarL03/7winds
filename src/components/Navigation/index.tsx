import { Menu } from 'antd'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import {GoldFilled} from '@ant-design/icons'
import style from './Navigation.module.scss'


const items = [
    {
        label: <Link to="/works">
            <GoldFilled className={style.navIcon}/>
            <span>СМР</span> 
        </Link>,
        key: 'СМР'
    }
]

const Navigation: FC = () => {
    return (
        <div className={style.menuContainer}>
            <Menu
            style={{width: 256}}
            mode="vertical"
            items={items}
            />
        </div>
    )
}

export default Navigation