import React, {useEffect, useState} from 'react'
import { IconProps } from '../interfaces'
import { 
    TelegramIcon,
    InstagramIcon,
    VKIcon,
    FBIcon,
    PhoneIcon,
    EmailIcon
} from '../images/icons';
import { colors } from '../config/colors';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const LoginForm : React.FC = () => {

    const { t } = useTranslation();

    const btnClasses = 'py-2 mx-8 text-center disabled:bg-gray-600 disabled:cursor-not-allowed bg-primary-100 text-white font-light rounded shadow-lg hover:shadow-xl transition duration-200'

    const communicationMethods = [
        {
            value: 'telegram',
            icon: TelegramIcon,
            disabled: false,
        },
        {
            value: 'vk',
            icon: VKIcon,
            disabled: false,
        },
        {
            value: 'instagram',
            icon: InstagramIcon,
            disabled: true,
        },
        {
            value: 'fb',
            icon: FBIcon,
            disabled: true,
        },
        {
            value: 'phone',
            icon: PhoneIcon,
            disabled: true,
        },
        {
            value: 'email',
            icon: EmailIcon,
            disabled: true,
        },
    ]

    const [methodSelected, setMethodSelected] = useState('')
    const navigate = useNavigate()

    return (
        <div className='text-center mx-auto'>
            <div>
                {t('web__interesting_answers')}
            </div>
            <div>
                <div>{t('web__choose_your_prefered_contact_method')}</div>

                <div className='mt-16'>
                    <ul className="grid gap-6 w-full md:grid-cols-2">
                        {communicationMethods.map((m, index) => {
                            const renderIcon = (Icon: React.FC<IconProps>, disabled: boolean = false) => {
                                return (<Icon fill={disabled ? '#555' : colors.primary[500]}/>)
                            }

                            return (
                                <li
                                    key={index}
                                    title={m.disabled ? t('soon') + '...' : t(m.value)}
                                >
                                    <input
                                        disabled={m.disabled}
                                        type="radio"
                                        id={m.value}
                                        name="communication-method"
                                        value="hosting-small"
                                        className="hidden peer"
                                        required
                                        onChange={() => setMethodSelected(m.value)}
                                    />
                                    <label
                                        htmlFor={m.value}
                                        className={`inline-flex justify-between items-center px-5 py-2 m-2 w-48 text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-primary-500 peer-checked:border-primary-300 peer-checked:text-primary-300 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 ${m.disabled ? 'fill-white bg-gray-200 text-gray-300 cursor-not-allowed hover:bg-gray-300' : 'hover:bg-primary-300 hover:!text-white'} `}>
                                        {renderIcon(m.icon, m.disabled)}
        
                                        <div className="block">
                                            <div className="w-full text-lg font-semibold">{t(`contact_method__${m.value}`)}</div>
                                            <div className="w-full"></div>
                                        </div>
                                    </label>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <div className='mt-16'>
                    <button
                        disabled={methodSelected === ''}
                        className={`${btnClasses} w-48 rounded-xl text-main `}
                        onClick={() => navigate("/survey/contact-method/" + methodSelected)}
                    >
                        {t('yes')}
                    </button>
                </div>
                
            </div>
        </div>
    )
}