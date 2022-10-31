import {FC} from 'react'
import {Tabs} from 'antd'
import {ArrowLeftOutlined, AppstoreFilled} from '@ant-design/icons'
import style from './Header.module.scss'

const items = [
    {
        label: 'Просмотр',
        key: 'view'
    },
    {
        label: 'Управление',
        key: 'manage'
    }
]

const Header: FC = () => {

    return (
        <header className={style.header} >
            
                <div className={style.headerIconContainer}>
                    <AppstoreFilled className={style.headerIcon}/>
                    <ArrowLeftOutlined className={style.headerIcon} />
                </div>
                
            
            <Tabs
            defaultActiveKey='view'
            items={items}
            />
        </header>
    )
}

export default Header