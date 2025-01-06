import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import icons from "@/constants/icons";

export default function Search() {
  const path = usePathname();
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState(params.query);

  const debounceSearch = useDebouncedCallback(
    (text: string) => router.setParams({ query: text }),
    500
  );

  function handleSearch(text: string) {
    setSearch(text);
    debounceSearch(text);
  }

  return (
    <View className="flex-row items-center justify-between w-full px-4 rounded-lg bg-accent-100 border border-primary-100 mt-5 py-2">
      <View className="flex-1 flex-row items-center justify-start z-50">
        <Image source={icons.search} className="size-5" />
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Search for anything"
          className="text-sm font-rubik text-black-300 ml-2 flex-1"
        />
      </View>

      <TouchableOpacity>
        <Image source={icons.filter} className="size-5" />
      </TouchableOpacity>
    </View>
  );
}
