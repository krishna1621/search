import { useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'
import { GEO_API_URL, geoApiOptions } from './Api';

const Search = ( { onSearchChange } ) =>
{
    const [ search, setSearch ] = useState( null );
    const loadOptions = ( inputValue ) =>
    {
        return fetch( `${ GEO_API_URL }/cities?minPopulation=1000&namePrefix=${ inputValue }`, geoApiOptions )
            .then( ( response ) => response.json() )
            .then( ( response ) =>
            {
                return {
                    options: response.data.map( ( city ) =>
                    {
                        return {
                            value: `${ city.latitude } ${ city.longitude }`,
                            label: `${ city.name }, ${ city.countryCode }`,
                        };
                    } ),
                };
            } )
            .catch( ( err ) => console.error( err ) );
    }
    const handleOnChange = ( searchData ) =>
    {
        setSearch( searchData );
        onSearchChange( searchData )
    }
    return (
        <AsyncPaginate
            debounceTimeout={ 1000 }
            value={ search }
            placeholder="Search..."
            onChange={ handleOnChange }
            loadOptions={ loadOptions }
        />
    )
}

export default Search


