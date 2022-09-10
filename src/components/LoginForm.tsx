import React, {useEffect, useState} from 'react'
import { Batch, IconProps, SettingsState, User } from '../interfaces'
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
import { GQL } from '../API/GQL';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import notie from 'notie'

export const LoginForm : React.FC = () => {

    const { t } = useTranslation();

    const btnClasses = 'py-2 mx-8 text-center disabled:bg-gray-200 disabled:cursor-not-allowed bg-primary-600 text-white font-light rounded shadow-lg hover:shadow-xl transition duration-200'

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
    const settingsState = useSelector( (store: RootState) : SettingsState =>  store.settings)
    const batch = useSelector( (store: RootState) : Batch =>  store.batch)
    const user = useSelector( (store: RootState) : User =>  store.auth.user!)
    const navigate = useNavigate()

    const confirmContactMethod = () => {


        GQL.storeUserAnswer({
            user_id: user.id!, 
            batch_id: batch.id,
            answers_quantity: settingsState.values.questions.answersQuantity!,
            answers_ids: batch.questions.map(q => q.userAnswer!),
        })
            .then(({data}) => {
                notie.alert({
                    text: 'мы сообщим',
                    type: 'success',
                })


                navigate("/survey/contact-method/" + methodSelected)
            })

    }

    useEffect(() => { // TODO move this redirect to some global middleware 
        if (!batch.id) navigate('/')
    }, [batch])


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
                                return (<Icon fill={disabled ? '#eee' : colors.primary[500]}/>)
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
                                        className={`inline-flex justify-between items-center px-5 py-2 m-2 w-48 text-gray-500 bg-white rounded-lg cursor-pointer peer-checked:bg-primary-100 peer-checked:text-white ${m.disabled ? 'fill-white bg-gray-100 text-gray-200 cursor-not-allowed' : 'bg-white text-primary-500 border border-color-primary-500 hover:bg-secondary-300 hover:!text-gray-100'} `}>
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
                        className={`${btnClasses} w-48 rounded-xl text-main !bg-primary-100 hover:!bg-primary-500`}
                        onClick={confirmContactMethod}
                    >
                        {t('yes')}
                    </button>
                </div>
                
            </div>
        </div>
    )
}