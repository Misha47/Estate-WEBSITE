import {Link} from 'react-router-dom'
import { useTranslation } from 'react-i18next'


export function NavBar(){
    const {t} = useTranslation()
    return (
        <nav>
            <ul className="list-reset md:flex md:items-center bg-white">

                <li>
                    <Link to='/' className="text-center block no-underline text-grey-darkest md:border-none p-3 px-5 hover:text-blue-300 duration-500">{t('home')}</Link>
                </li>

                <li>
                    <Link to='/products' className="text-center block no-underline text-grey-darkest md:border-none p-3 px-5 hover:text-blue-300 duration-500">
                    {t('service')}
                    </Link>
                </li>

                <li>
                    <Link to='/about' className="text-center border-t block no-underline text-grey-darkest md:border-none p-3 px-5 hover:text-blue-300 duration-500">
                    {t('about')}
                    </Link>
                </li>

                <li>
                    <Link to='/contact' className="text-center border-t block no-underline text-grey-darkest md:border-none p-3 px-5 hover:text-blue-300 duration-500">
                    {t('contact')}
                    </Link>
                </li>

            </ul>
        </nav>
    )
}
