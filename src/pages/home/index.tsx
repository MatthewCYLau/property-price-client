import { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import CtaButton from '../../components/cta-button2'

const HomePage = (): ReactElement => {
  const navigate = useNavigate()
  return (
    <div className="bg-white dark:bg-gray-900 h-screen flex items-center justify-center">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl dark:text-white">
            Property Price Engine
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Returns smart property offer price
          </p>
          <div className="flex flex-col mt-4 sm:flex-row sm:items-center">
            <CtaButton copy="Login" onClickHandler={() => navigate('/login')} />
            <CtaButton
              copy="Sign up"
              onClickHandler={() => navigate('/sign-up')}
              isPrimaryCta={true}
            />
          </div>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img
            src="https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=940&q=80"
            alt="house"
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  )
}

export default HomePage
