import { ChangeEvent, useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import DatePicker from "react-datepicker";
import {toast} from 'react-toastify'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner'
import "react-datepicker/dist/react-datepicker.css";
import Header from '../components/Header';


function SearchPage() {
  const [startYear, setStartYear] = useState<Date>(new Date());
  const [endYear, setEndYear] = useState<Date>(new Date());
  const [collections, setCollections] = useState([]);
  const [searchquery, setSearchquery] = useState<string>('');
  const [loading, setLoading] = useState(false)

  console.log(endYear.getFullYear())
  console.log(startYear.getFullYear())
  console.log(searchquery)

 
  const updateSearchquery = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchquery(e.target.value);
  }


  const validateSearch = () => {
    if(searchquery === ""){
        toast.error('Kindly Input search word');
        return 0;
    }
    else if(endYear < startYear){
        toast.error('End year can not be earlier than Start year')
        return 0;
    }
    else if(endYear.getFullYear() < 0 || startYear.getFullYear() < 0 || startYear.getFullYear() > new Date().getFullYear() || endYear.getFullYear() > new Date().getFullYear()){
      toast.error('Please Put Year Correctly');
        return 0;
    }
    else{
        console.log("fetch data")
        runSearch();
    }
}

const runSearch = () => {
  let fetchURL = '';
  if(startYear.getFullYear() === null && endYear.getFullYear() === null)
  fetchURL = `https://images-api.nasa.gov/search?q=${searchquery}&media_type=image`;
  else if(startYear.getFullYear() === null)
  fetchURL = `https://images-api.nasa.gov/search?q=${searchquery}&year_end=${endYear.getFullYear()}&media_type=image`;
  else if(endYear.getFullYear() === null)
  fetchURL = `https://images-api.nasa.gov/search?q=${searchquery}&year_start=${startYear.getFullYear()}&media_type=image`;
  else 
  fetchURL = `https://images-api.nasa.gov/search?q=${searchquery}&year_start=${startYear.getFullYear()}&year_end=${endYear.getFullYear()}&media_type=image`;

  setLoading(true)
  axios
      .get(
          fetchURL
      )
      .then(response => {
          console.log(fetchURL)
          setCollections(response.data.collection.items);
          setLoading(false);
      })
      .catch(error => {
          console.log(
          "Encountered an error with fetching and parsing data",
          error
          );
      });
}

 if (loading == true) {
    return(
     <div className='grid h-screen place-items-center'>
      <ColorRing
        visible={true}
        height="100"
        width="100"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#b8c480', '#B2A3B5', '#F4442E', '#51E5FF', '#429EA6']}
        />
     </div>
    )
  }
  

  return (
    <div className="bg-white ">
      <Header />
      <main className='h-screen'>
       
          <div className="relative isolate overflow-hidden bg-gray-900 pt-14 pb-16 sm:pb-20">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2830&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
            alt=""
            className="absolute inset-0 -z-10 h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
            <svg
              className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
              viewBox="0 0 1155 678"
            >
              <path
                fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
                fillOpacity=".2"
                d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
              />
              <defs>
                <linearGradient
                  id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                  x1="1155.49"
                  x2="-78.208"
                  y1=".177"
                  y2="474.645"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#9089FC" />
                  <stop offset={1} stopColor="#FF80B5" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
              <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              </div>
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-4">
                  NASA Image Library
                </h1>
              
                <div className="flex flex-col justify-center">
                  <div className='flex flex-row my-4'>
                 <DatePicker selected={startYear} onChange={(date) => date && setStartYear(date)} showYearPicker dateFormat="yyyy" className='rounded-md w-1/2'/>
                 <DatePicker selected={endYear} onChange={(date) => date && setEndYear(date)} showYearPicker dateFormat="yyyy" className='rounded-md w-1/2'/>
                 </div>
                    <div className="w-full px-2 lg:px-6">
                      <label htmlFor="search" className="sr-only">
                        Search Images
                      </label>
                      <div className="relative text-indigo-200 focus-within:text-gray-400">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                        </div>
      
                        <input
                          id="search"
                          name="search"
                          className="block w-full rounded-md border-0 bg-indigo-400 bg-opacity-25 py-1.5 pl-10 pr-3 text-indigo-100 placeholder:text-indigo-200 focus:bg-white focus:text-gray-900 focus:outline-none focus:ring-0 focus:placeholder:text-gray-400 sm:text-sm sm:leading-6"
                          placeholder="Search Images"
                          type="text"
                          value={searchquery}
                          onChange={updateSearchquery}
                          required
                        />
                      </div>

                      <button
                      type="button"
                      className='rounded-md bg-indigo-400 bg-opacity-25 py-1.5 mt-8 px-8 text-indigo-100 text-center'
                      onClick={validateSearch}
                      >
                      Search
                      </button>
                     
                    </div>              
                </div>
              </div>
            </div>

            {/* Logo cloud */}
            <div className="mx-auto grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
              <img
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/transistor-logo-white.svg"
                alt="Transistor"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/reform-logo-white.svg"
                alt="Reform"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/tuple-logo-white.svg"
                alt="Tuple"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/savvycal-logo-white.svg"
                alt="SavvyCal"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/statamic-logo-white.svg"
                alt="Statamic"
                width={158}
                height={48}
              />
            </div>
          </div>
          <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
            <svg
              className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
              viewBox="0 0 1155 678"
            >
              <path
                fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
                fillOpacity=".2"
                d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
              />
              <defs>
                <linearGradient
                  id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                  x1="1155.49"
                  x2="-78.208"
                  y1=".177"
                  y2="474.645"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#9089FC" />
                  <stop offset={1} stopColor="#FF80B5" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        
        

        <div className='grid grid-cols-1 md:grid-cols-3 mt-16'>

          {
            collections.length > 0 ? 
              collections.map((collection: any, index) => (
                <Link to="/search-results" state = {{data : collection.data[0], jsonURL: collection.href }} 
                key= {index}>
                <img 
                  src={`${collection.links[0].href}?h=248&fit=crop&auto=format`}
                  srcSet={`${collection.links[0].href}?h=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={collection.data[0].title}
                  loading='lazy'
                  className='rounded-lg h-64 my-2'
                />
                </Link>
                
              ))
              : <div></div>  
          }

        </div>

  
      </main>
    </div>
  )
}


export default SearchPage