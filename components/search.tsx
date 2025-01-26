import { View , Text, TextInput, TouchableOpacity} from 'react-native';
import React, { useState } from 'react'; 
import { router, useLocalSearchParams, usePathname } from 'expo-router';
import { icons } from 'lucide-react-native';
import{useDebouncedCallback} from "use-debounce";


const Search = () => {
    const path = usePathname();
    const params = useLocalSearchParams<{ query?: string}>();
    const [search, setSearch] = useState(params.query);

    const debouncedSearch = useDebouncedCallback((text:string)=> router.setParams({query: text}), 500);

    const handleSearch = (text: string) => {
        setSearch(text);
        debouncedSearch(text);
    }

    return (
        <View className='mr-5 ml-4'>
             <View className = "flex flex-row items-center justify-between w-full px-5 rounded-3xl bg-accent-100 border border-primary-100 mt-5 py-1">
           <View className="flex-1 flex flex-row items-center jusify-start z-50">
           <icons.Search size={22} color="#660000" style={{marginTop: 0}}/>
           <TextInput 
                value={search}
                onChangeText = {handleSearch}
                placeholder="Search for anything"
                className="text-sm font-rubik text-black-default ml-2 flex-1 mt-1"
           />
           </View>

           <TouchableOpacity>
           <icons.SlidersHorizontal size={22} color="#660000"/>
           </TouchableOpacity>
        </View>
        </View>
       
    )
}
export default Search


